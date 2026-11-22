import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REQUIRED_ENV = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_WRITE_TOKEN",
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "R2_PUBLIC_URL",
] as const;

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing env var: ${key}`);
    process.exit(1);
  }
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!.trim();
const PUBLIC_URL = process.env.R2_PUBLIC_URL!.replace(/\/$/, "");
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET!;

interface SanityDoc {
  _id: string;
  _type: string;
  slug?: { current: string };
  title?: string;
  sector?: string;
  name?: string;
  image?: { asset?: { _ref: string } };
  coverImage?: { asset?: { _ref: string } };
  imageUrl?: string;
  coverImageUrl?: string;
}

function assetRefToUrl(ref: string): { url: string; ext: string } {
  // _ref format: image-{id}-{width}x{height}-{format}
  const parts = ref.replace("image-", "").split("-");
  const ext = parts.pop()!;
  const id = parts.join("-");
  return {
    url: `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}.${ext}`,
    ext,
  };
}

function buildR2Key(doc: SanityDoc, ext: string): string {
  const FOLDER_NAMES: Record<string, string> = {
    product: "products",
    industry: "industries",
    testimonial: "testimonials",
    post: "posts",
  };
  const folder = FOLDER_NAMES[doc._type] || `${doc._type}s`;
  const name =
    doc.slug?.current ||
    doc.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    doc.sector?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    doc.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    doc._id;
  return `${folder}/${name}.${ext}`;
}

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

async function migrateDocType(
  type: string,
  imageField: "image" | "coverImage",
  urlField: "imageUrl" | "coverImageUrl"
): Promise<{ migrated: number; skipped: number; errors: number }> {
  const docs: SanityDoc[] = await sanity.fetch(
    `*[_type == "${type}"]{ _id, _type, slug, title, sector, name, ${imageField}, ${urlField} }`
  );

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const doc of docs) {
    const label =
      doc.slug?.current || doc.title || doc.sector || doc.name || doc._id;

    if (doc[urlField]) {
      console.log(`  [${type}] SKIP (already migrated): ${label}`);
      skipped++;
      continue;
    }

    const assetRef = doc[imageField]?.asset?._ref;
    if (!assetRef) {
      console.log(`  [${type}] SKIP (no image): ${label}`);
      skipped++;
      continue;
    }

    try {
      const { url: sanityUrl, ext } = assetRefToUrl(assetRef);
      const r2Key = buildR2Key(doc, ext);

      // Download from Sanity CDN
      const response = await fetch(sanityUrl);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());

      // Upload to R2
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: r2Key,
          Body: buffer,
          ContentType: CONTENT_TYPES[ext] || "application/octet-stream",
        })
      );

      // Patch Sanity document
      const publicUrl = `${PUBLIC_URL}/${r2Key}`;
      await sanity.patch(doc._id).set({ [urlField]: publicUrl }).commit();

      console.log(`  [${type}] MIGRATED: ${label} -> ${r2Key}`);
      migrated++;
    } catch (err) {
      console.error(`  [${type}] ERROR: ${label} — ${err}`);
      errors++;
    }
  }

  return { migrated, skipped, errors };
}

async function main() {
  console.log("=== Sayaro: Sanity -> R2 Image Migration ===\n");
  console.log(`R2 Bucket: ${BUCKET}`);
  console.log(`R2 Public URL: ${PUBLIC_URL}\n`);

  const types: Array<{
    type: string;
    imageField: "image" | "coverImage";
    urlField: "imageUrl" | "coverImageUrl";
  }> = [
    { type: "product", imageField: "image", urlField: "imageUrl" },
    { type: "industry", imageField: "image", urlField: "imageUrl" },
    { type: "testimonial", imageField: "image", urlField: "imageUrl" },
    { type: "post", imageField: "coverImage", urlField: "coverImageUrl" },
  ];

  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const { type, imageField, urlField } of types) {
    console.log(`\n--- ${type} ---`);
    const result = await migrateDocType(type, imageField, urlField);
    totalMigrated += result.migrated;
    totalSkipped += result.skipped;
    totalErrors += result.errors;
  }

  console.log("\n=== Migration Complete ===");
  console.log(`Migrated: ${totalMigrated}`);
  console.log(`Skipped:  ${totalSkipped}`);
  console.log(`Errors:   ${totalErrors}`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

main();

import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const timestamp = Date.now();
    const key = `${folder}/${safeName}-${timestamp}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    const url = `${PUBLIC_URL}/${key}`;

    return NextResponse.json({ url }, { headers: corsHeaders() });
  } catch (err) {
    console.error("R2 upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || !url.startsWith(PUBLIC_URL)) {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const key = url.replace(`${PUBLIC_URL}/`, "");

    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (err) {
    console.error("R2 delete error:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

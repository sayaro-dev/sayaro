import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/ui/header-2";
import { Footer } from "@/components/sites/resido/Footer";
import { LenisWrapper } from "@/components/sites/resido/LenisWrapper";
import { PageHero } from "@/components/sites/resido/PageHero";
import { PillButton } from "@/components/sites/resido/PillButton";
import { LetsBuildTogether } from "@/components/sites/resido/LetsBuildTogether";
import { ImagePlaceholder } from "@/components/sites/resido/ImagePlaceholder";
import { projects } from "@/components/sites/resido/data";
import { industries } from "@/components/sites/resido/industries";

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relevantProducts = projects.filter((p) =>
    industry.categories.includes(p.category)
  );

  return (
    <LenisWrapper>
      <Header />
      <main>
        <PageHero
          label="Industry"
          title={industry.sector}
          subtitle={industry.description}
        />

        {/* Products for this industry */}
        <section className="py-20">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-[28px] font-medium tracking-tight lg:text-[36px]">
                  Recommended Equipment
                </h2>
                <p className="mt-2 text-neutral-500">
                  {relevantProducts.length} products suited for{" "}
                  {industry.sector.toLowerCase()}
                </p>
              </div>
              <PillButton variant="primary" href="/contact">
                Request a Quote
              </PillButton>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relevantProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/works/${product.slug}`}
                  className="group block rounded-[15px] bg-white p-2 border border-neutral-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex gap-1.5 px-2 pt-2 pb-3">
                    <span className="size-[7px] rounded-full bg-neutral-300" />
                    <span className="size-[7px] rounded-full bg-neutral-300" />
                    <span className="size-[7px] rounded-full bg-neutral-700" />
                  </div>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                    <ImagePlaceholder
                      label={product.title}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="px-2 pt-5 pb-3">
                    <h4 className="font-heading text-lg font-medium tracking-tight">
                      {product.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-neutral-500">
                      {product.year} · {product.location}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-neutral-400 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/works"
                className="font-heading text-sm font-medium text-[#2F6BFF] hover:underline"
              >
                Back to all industries
              </Link>
            </div>
          </div>
        </section>

        <LetsBuildTogether />
      </main>
      <Footer />
    </LenisWrapper>
  );
}

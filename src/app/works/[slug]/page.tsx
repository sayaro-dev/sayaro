import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/ui/header-2";
import { Footer } from "@/components/sites/resido/Footer";
import { LenisWrapper } from "@/components/sites/resido/LenisWrapper";
import { LetsBuildTogether } from "@/components/sites/resido/LetsBuildTogether";
import { PillButton } from "@/components/sites/resido/PillButton";
import { client, urlFor } from "@/lib/sanity";
import { productQuery, productsByCategoryQuery } from "@/lib/sanity-queries";

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product"] { slug }`);
  return products.map((product: any) => ({
    slug: product.slug.current,
  }));
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 mt-0.5"
    >
      <path
        d="M16.667 5L7.5 14.167 3.333 10"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon() {
  return <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-neutral-400" />;
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch(productQuery, { slug });

  if (!product) {
    notFound();
  }

  const relatedProducts = await client.fetch(
    productsByCategoryQuery,
    { category: product.category }
  );

  const fallbackRelated = relatedProducts
    .filter((p: any) => p.slug.current !== slug)
    .slice(0, 2);

  const quickFacts = [
    { label: "Category", value: product.category },
    { label: "Featured", value: product.featured ? "Yes" : "Available" },
  ];

  const applications = product.applications || [];
  const specifications = product.specifications || [];

  return (
    <LenisWrapper>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[#FAFAFA] pb-8 pt-32">
          <div className="mx-auto max-w-[1400px] px-6">
            <Link
              href="/works"
              className="inline-flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <span>&larr;</span> All Products
            </Link>

            <h1 className="mt-6 font-heading text-[40px] font-medium tracking-[-0.04em] lg:text-[60px]">
              {product.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-neutral-500">
              {product.overview}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#2F6BFF] px-4 py-1.5 font-heading text-sm text-white">
                {product.category}
              </span>
              {product.featured && (
                <span className="font-heading text-sm text-neutral-400">
                  Featured Product
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="pt-8 pb-20">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Image + Overview side by side */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left — Product image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-100">
                {product.image ? (
                  <Image
                    src={urlFor(product.image).width(800).height(600).url()}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                    {product.title}
                  </div>
                )}
              </div>

              {/* Right — Overview + Quick facts */}
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-white p-8">
                  <h2 className="font-heading text-2xl font-medium tracking-tight">
                    Overview
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    {product.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl bg-white p-5">
                      <p className="font-heading text-xs uppercase tracking-wider text-neutral-400">
                        {fact.label}
                      </p>
                      <p className="mt-2 font-heading text-base font-medium tracking-tight">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs + Applications — two-column */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Key Specifications */}
              {specifications.length > 0 && (
                <div className="rounded-2xl bg-white p-8">
                  <h3 className="font-heading text-xl font-medium tracking-tight">
                    Key Specifications
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {specifications.map((spec: any) => (
                      <li key={spec.key} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-neutral-700">
                          <strong>{spec.key}:</strong> {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {applications.length > 0 && (
                <div className="rounded-2xl bg-white p-8">
                  <h3 className="font-heading text-xl font-medium tracking-tight">
                    Ideal For
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {applications.map((app: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <DotIcon />
                        <span className="text-sm leading-relaxed text-neutral-600">
                          {app}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Facts if no specs/apps */}
              {product.quickFacts && product.quickFacts.length > 0 && (
                <div className="rounded-2xl bg-white p-8">
                  <h3 className="font-heading text-xl font-medium tracking-tight">
                    Quick Facts
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {product.quickFacts.map((fact: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-neutral-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Inline CTA */}
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-[#FAFAFA] p-10 text-center">
              <h3 className="font-heading text-2xl font-medium tracking-tight">
                Interested in the {product.title}?
              </h3>
              <p className="text-sm text-neutral-500">
                Share your requirements and our team will get back to you.
              </p>
              <PillButton href="/contact" variant="primary">
                Request a Quote
              </PillButton>
            </div>

            {/* Related products */}
            {fallbackRelated.length > 0 && (
              <div className="mt-20">
                <h2 className="font-heading text-2xl font-medium tracking-tight">
                  Related Products
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  {fallbackRelated.map((related: any) => (
                    <Link
                      key={related._id}
                      href={`/works/${related.slug.current}`}
                      className="group"
                    >
                      <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-neutral-100">
                        {related.image ? (
                          <Image
                            src={urlFor(related.image).width(600).height(360).url()}
                            alt={related.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                            {related.title}
                          </div>
                        )}
                      </div>
                      <h4 className="mt-4 font-heading text-xl font-medium tracking-tight">
                        {related.title}
                      </h4>
                      <p className="mt-1 font-heading text-sm text-neutral-500">
                        {related.category}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <LetsBuildTogether />
      </main>

      <Footer />
    </LenisWrapper>
  );
}

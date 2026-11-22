import { Header } from "@/components/ui/header-2";
import { Footer } from "@/components/sites/resido/Footer";
import { LenisWrapper } from "@/components/sites/resido/LenisWrapper";
import { PillButton } from "@/components/sites/resido/PillButton";
import { LetsBuildTogether } from "@/components/sites/resido/LetsBuildTogether";
import { CarouselStacked } from "@/components/ui/carousel-stacked";
import { client } from "@/lib/sanity";
import { industriesQuery } from "@/lib/sanity-queries";

export default async function WorksPage() {
  const industries = await client.fetch(industriesQuery);
  return (
    <LenisWrapper>
      <Header />

      <main>
        <section className="pt-32 pb-20 overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6">
            {/* Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-heading text-[40px] font-medium tracking-[-0.04em] lg:text-[60px]">
                  Industries We Serve
                </h1>
                <p className="mt-4 text-lg text-neutral-500">
                  From academic research to industrial quality control, our
                  instruments support laboratories across every sector.
                </p>
              </div>

              <PillButton variant="primary" href="/contact">
                Request a Quote
              </PillButton>
            </div>
          </div>

          {/* Stacked carousel - full width */}
          <CarouselStacked industries={industries} className="mt-12" />
        </section>

        <LetsBuildTogether />
      </main>

      <Footer />
    </LenisWrapper>
  );
}

"use client";

import { LenisWrapper } from "@/components/sites/resido/LenisWrapper";
import { Header } from "@/components/ui/header-2";
import { Footer } from "@/components/sites/resido/Footer";
import { PageHero } from "@/components/sites/resido/PageHero";
import { ScrollReveal } from "@/components/sites/resido/ScrollReveal";
import { ImagePlaceholder } from "@/components/sites/resido/ImagePlaceholder";
import { LetsBuildTogether } from "@/components/sites/resido/LetsBuildTogether";
import { PillButton } from "@/components/sites/resido/PillButton";

export default function AboutPage() {
  return (
    <LenisWrapper>
      <Header />
      <main>
        <PageHero
          label="About"
          title="Every Laboratory Has a Purpose. We Help It Move Forward."
        />

        {/* Belief + Image — asymmetric two-column */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6">
            <ScrollReveal>
              <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                <div>
                  <p className="font-heading text-[24px] font-medium leading-[1.4] tracking-tight text-[#13171B] lg:text-[36px]">
                    At Sayaro Scientific Instruments, we believe laboratory
                    equipment is more than machinery — it is a part of the
                    process that turns knowledge into results.
                  </p>
                  <p className="mt-8 max-w-lg text-[16px] leading-[1.8] text-neutral-500">
                    We bring together scientific laboratory instruments,
                    practical laboratory solutions, and a growing vision for
                    instrument manufacturing to support the people who work
                    behind science every day.
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-neutral-100">
                  <ImagePlaceholder
                    label="Laboratory workspace"
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Three insight cards */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1400px] px-6">
            <ScrollReveal>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    line: "Behind every experiment is a question.",
                    body: "From educational laboratories taking their first steps to research facilities pushing boundaries.",
                  },
                  {
                    line: "Behind every test is a decision.",
                    body: "From water analysis to pharmaceutical research, every laboratory has its own purpose and challenges.",
                  },
                  {
                    line: "Behind every discovery is a laboratory.",
                    body: "Our approach begins with understanding what your laboratory needs — not simply what we can offer.",
                  },
                ].map((card) => (
                  <div
                    key={card.line}
                    className="rounded-2xl border border-neutral-100 bg-white p-8"
                  >
                    <div className="mb-6 h-[3px] w-10 rounded-full bg-[#2F6BFF]" />
                    <p className="font-heading text-[18px] font-medium leading-snug tracking-tight text-[#13171B] lg:text-[20px]">
                      {card.line}
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.7] text-neutral-500">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Full-width image card with overlay text */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1400px] px-6">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl border border-neutral-100">
                <ImagePlaceholder
                  label="Sayaro manufacturing facility"
                  className="aspect-[21/9] w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-transparent p-8 pt-20 lg:p-12 lg:pt-28">
                  <p className="max-w-2xl font-heading text-[20px] font-medium leading-snug tracking-tight text-[#13171B] lg:text-[28px]">
                    With our expanding range of laboratory instruments, heating
                    equipment, furnaces, and scientific accessories, we make
                    laboratory sourcing more convenient and purposeful.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Two-column: image + text card */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1400px] px-6">
            <ScrollReveal>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-neutral-100">
                  <ImagePlaceholder
                    label="Quality testing process"
                    className="aspect-[4/3] w-full"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl border border-neutral-100 bg-white p-8 lg:p-12">
                  <p className="font-heading text-[22px] font-medium leading-snug tracking-tight text-[#13171B] lg:text-[28px]">
                    From industrial facilities performing critical quality checks
                    to educational labs taking their first steps in
                    experimentation — we understand.
                  </p>
                  <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-neutral-500">
                    That is why our approach begins with understanding what your
                    laboratory needs — not simply what equipment we can offer.
                  </p>
                  <div className="mt-8">
                    <PillButton href="/contact" variant="primary">
                      Get in touch
                    </PillButton>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Ambition pull-quote */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6">
            <ScrollReveal>
              <div className="flex gap-6 lg:gap-10">
                <div className="hidden w-[3px] shrink-0 rounded-full bg-[#2F6BFF] lg:block" />
                <div className="max-w-4xl">
                  <p className="font-heading text-[24px] font-medium leading-[1.35] tracking-tight text-[#13171B] lg:text-[40px]">
                    Our journey is built around one ambition: to become a name
                    laboratories remember not just for the instruments they
                    purchase, but for the confidence they gain in choosing us.
                  </p>
                  <p className="mt-8 font-heading text-[16px] tracking-tight text-neutral-400 lg:text-[18px]">
                    Sayaro Scientific Instruments
                  </p>
                  <p className="font-heading text-[14px] tracking-tight text-neutral-400 lg:text-[16px]">
                    Equipping Laboratories. Enabling Possibilities.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <LetsBuildTogether />
      </main>
      <Footer />
    </LenisWrapper>
  );
}

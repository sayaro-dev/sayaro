"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { urlFor } from "@/lib/sanity";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  image?: any;
  overview?: string;
}

interface ProjectsCarouselProps {
  products: Product[];
}

export function ProjectsCarousel({ products }: ProjectsCarouselProps) {
  // Only duplicate products for carousel effect if we have 4+ items
  // Otherwise it looks like duplicate entries in CMS
  const allProjects = products.length >= 4
    ? [...products, ...products]
    : products;
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "prev" | "next") {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("a")?.offsetWidth ?? 520;
    const scrollAmount = direction === "next" ? cardWidth + 24 : -(cardWidth + 24);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header row — same pattern as Testimonials */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <SectionLabel>Our Products</SectionLabel>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("prev")}
              className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#13171B] transition-colors hover:bg-[#2F6BFF] hover:text-white"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("next")}
              className="flex size-10 items-center justify-center rounded-full bg-[#2F6BFF] text-white transition-opacity hover:opacity-80"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <h2 className="font-heading text-[40px] font-medium tracking-[-0.04em] lg:text-[60px] mx-auto text-center">
            Featured Products
          </h2>

          <p className="ml-auto max-w-[280px] text-sm text-neutral-500 text-right hidden lg:block">
            Explore laboratory equipment across our five core product families.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {allProjects.map((project, i) => (
              <a
                key={`${project._id}-${i}`}
                href={`/works/${project.slug.current}`}
                className="group shrink-0 snap-start"
                style={{ width: "min(520px, 80vw)" }}
              >
                {/* White card wrapper */}
                <div className="rounded-[15px] bg-white p-2 border border-neutral-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]">
                  <div className="flex gap-1.5 px-2 pt-2 pb-3">
                    <span className="size-[7px] rounded-full bg-neutral-300" />
                    <span className="size-[7px] rounded-full bg-neutral-300" />
                    <span className="size-[7px] rounded-full bg-neutral-700" />
                  </div>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                    {project.image ? (
                      <Image
                        src={urlFor(project.image).width(520).height(416).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                        {project.title}
                      </div>
                    )}
                  </div>
                </div>
                {/* Title + meta below card */}
                <div className="mt-4 px-1">
                  <h4 className="font-heading text-xl font-medium tracking-tight">
                    {project.title}
                  </h4>
                  <p className="mt-1 font-heading text-sm text-neutral-500">
                    {project.category}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

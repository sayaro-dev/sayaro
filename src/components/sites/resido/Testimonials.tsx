"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { PillButton } from "./PillButton";
import { AvatarStack } from "./AvatarStack";
function Stars({ count, color = "text-orange-400" }: { count: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  imageUrl?: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  // Only duplicate testimonials for carousel effect if we have 4+ items
  // Otherwise it looks like duplicate entries in CMS
  const allReviews = testimonials.length >= 4
    ? [...testimonials, ...testimonials, ...testimonials]
    : testimonials;
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "prev" | "next") {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector<HTMLElement>("[data-review]")?.offsetWidth ?? 380;
    const amount = direction === "next" ? cardWidth + 24 : -(cardWidth + 24);
    container.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header row — all in one line */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Prev/Next arrows */}
          <div className="flex gap-2 ml-4">
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
            What Our Clients Say
          </h2>

          <PillButton href="/contact" className="ml-auto">
            Request a Quote
            <span className="ml-1 text-lg leading-none">&rsaquo;</span>
          </PillButton>
        </motion.div>

        {/* Cards row — rating card + scrollable review cards */}
        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Rating card — fixed */}
          <div className="shrink-0 w-[260px] rounded-2xl bg-white p-8 flex flex-col justify-between hidden lg:flex">
            <div>
              <Stars count={5} color="text-green-500" />
              <p className="mt-3 text-sm font-medium">
                Trusted by Laboratories
              </p>
              <div className="mt-3 flex items-center gap-2">
                <AvatarStack size={28} />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Research, pharma &amp; industrial labs
              </p>
            </div>
            <div>
              <p className="font-heading text-[72px] font-medium leading-none tracking-tight">
                4.9
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Trusted by Labs<br />Across India
              </p>
            </div>
          </div>

          {/* Scrollable review cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide flex-1"
          >
            {allReviews.map((review, i) => (
              <div
                key={`${review._id}-${i}`}
                data-review
                className="shrink-0 snap-start rounded-2xl bg-white p-8 flex flex-col justify-between"
                style={{ width: "min(380px, 75vw)" }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars count={review.rating || 5} color="text-orange-400" />
                    {review.company && (
                      <span className="text-xs text-neutral-400 font-heading">
                        {review.company}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
                    {review.quote}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  {review.imageUrl ? (
                    <Image
                      src={review.imageUrl}
                      alt={review.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="size-11 rounded-full bg-neutral-200" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-neutral-500">
                      {review.role}
                      {review.company && `, ${review.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

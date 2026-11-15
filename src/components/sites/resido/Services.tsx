"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "./PillButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

const allProducts = [
  {
    title: "Sterilization & Decontamination",
    description:
      "Equipment for laboratory and healthcare sterilization workflows — bucket type, portable, vertical, and horizontal autoclaves, hospital sterilizers, and triple-wall sterilizers.",
    tags: ["Autoclaves", "Sterilizers", "Hospital", "Triple-Wall"],
    href: "/works/vertical-autoclave",
  },
  {
    title: "Life Science & Research",
    description:
      "Incubators and environmental chambers for microbiology, cell culture, BOD testing, and pharmaceutical stability studies.",
    tags: ["BOD Incubator", "Bacteriological", "Stability Chamber"],
    href: "/works/bod-incubator",
  },
  {
    title: "Thermal & Industrial Processing",
    description:
      "High-temperature furnaces and ovens for material testing, ashing, heat treatment, and industrial research applications.",
    tags: ["Muffle Furnace", "Hot Air Oven", "Vacuum Oven"],
    href: "/works/muffle-furnace-1200c",
  },
  {
    title: "Laboratory Safety & Airflow",
    description:
      "Fume hoods, laminar flow cabinets, and biosafety cabinets for contamination-free and safe laboratory environments.",
    tags: ["Fume Hood", "Laminar Flow", "Biosafety Cabinet"],
    href: "/works/fume-hood",
  },
  {
    title: "Thermal Bath & Agitation",
    description:
      "Water baths, oil baths, and shaking water baths for sample incubation, heating, and temperature-controlled agitation.",
    tags: ["Water Bath", "Oil Bath", "Shaking Bath"],
    href: "/works/constant-temperature-water-bath",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="products" className="py-20 scroll-mt-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-heading text-[40px] font-medium tracking-[-0.04em] lg:text-[60px]">
              Our Products
            </h2>
            <PillButton href="/contact">Request a Quote</PillButton>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* Left sidebar */}
          <div className="flex flex-col gap-6 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="rounded-2xl bg-white p-8">
                <div className="flex gap-8">
                  <div>
                    <h3 className="font-heading text-[56px] font-medium tracking-tight">5</h3>
                    <p className="text-sm text-neutral-500">Product Families</p>
                  </div>
                  <div>
                    <h3 className="font-heading text-[56px] font-medium tracking-tight">40+</h3>
                    <p className="text-sm text-neutral-500">Equipment Models</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
            >
              <div className="rounded-2xl bg-white p-8">
                <Stars />
                <p className="mt-4 text-sm font-medium leading-relaxed text-[#13171B]">
                  Sayaro delivers reliable equipment on time. We&apos;ve equipped
                  our entire lab through them — quality and support have been
                  consistently excellent.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-neutral-200 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Yagesh</p>
                    <p className="text-xs text-neutral-500">Director</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <motion.div
            className="lg:self-start"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {allProducts.map((product, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={product.title}
                  className={`border-b border-neutral-200 ${i === 0 ? "border-t" : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex w-full items-center justify-between py-6 cursor-pointer">
                    <h4 className="font-heading text-[22px] lg:text-[26px] font-medium tracking-tight">
                      {product.title}
                    </h4>
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-all hover:bg-[#13171B] hover:text-white"
                      style={{
                        transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 300ms ease",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <a href={product.href} className="flex gap-5 rounded-2xl bg-white p-5 mb-4 transition-opacity hover:opacity-90">
                          <div className="relative h-[140px] w-[200px] shrink-0 overflow-hidden rounded-xl">
                            <ImagePlaceholder label={product.title} className="h-full w-full" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-base leading-relaxed text-neutral-500 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {product.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-heading text-[#13171B]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

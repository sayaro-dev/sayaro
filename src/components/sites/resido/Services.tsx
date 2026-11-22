"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "./PillButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  services: Service[];
}

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

export function Services({ services }: ServicesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (services.length === 0) {
    return null;
  }

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
              What We Offer
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
                    <h3 className="font-heading text-[56px] font-medium tracking-tight">{services.length}</h3>
                    <p className="text-sm text-neutral-500">Services</p>
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
            {services.map((service, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={service._id}
                  className={`border-b border-neutral-200 ${i === 0 ? "border-t" : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex w-full items-center justify-between py-6 cursor-pointer">
                    <h4 className="font-heading text-[22px] lg:text-[26px] font-medium tracking-tight">
                      {service.title}
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
                        <div className="rounded-2xl bg-white p-5 mb-4">
                          <p className="text-base leading-relaxed text-neutral-600">
                            {service.description}
                          </p>
                        </div>
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

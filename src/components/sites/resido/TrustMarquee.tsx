"use client";

import { motion } from "framer-motion";

const brands = [
  "Sterilization",
  "Incubation",
  "Thermal Processing",
  "Laboratory Safety",
  "Thermal Baths",
];

export function TrustMarquee() {
  return (
    <section className="bg-white py-6 mt-6 border-y border-divider">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Top row */}
        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
        >
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {[0, 1].map((set) => (
                <div key={set} className="flex shrink-0 gap-12 pr-12">
                  {brands.map((name) => (
                    <span
                      key={name}
                      className="font-heading font-medium text-xl text-[#13171B] whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

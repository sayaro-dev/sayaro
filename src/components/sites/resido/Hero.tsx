"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PillButton } from "@/components/sites/resido/PillButton";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="w-full bg-[#FAFAFA] px-4 pt-4 lg:px-6 lg:pt-6">
      <div
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#2F6BFF]"
        style={{ minHeight: 600 }}
      >
        {/* Hero background image with slow zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
        >
          <Image
            src="/sites/resido/images/hero.jpg"
            alt="Sayaro laboratory and scientific equipment"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative flex min-h-[600px] flex-col justify-center p-8 lg:h-[calc(100vh-120px)] lg:p-16">
          <motion.div
            className="max-w-[720px]"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="size-2.5 rounded-full bg-white" />
              <span className="text-sm text-white/80">Now accepting equipment enquiries</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[40px] font-medium leading-[1.08] tracking-[-0.04em] text-white lg:text-[72px]"
            >
              Built with Precision.
              <br />
              Designed with Purpose.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[540px] text-base leading-relaxed text-white/70 lg:text-lg"
            >
              Sterilization, incubation, thermal processing, and laboratory
              safety equipment built for precision, reliability, and lasting
              performance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <PillButton href="/contact" variant="secondary">
                Start Your Enquiry
                <span className="ml-1 text-lg leading-none">&rsaquo;</span>
              </PillButton>

              <PillButton href="/works" variant="tertiary">
                View Our Products
              </PillButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

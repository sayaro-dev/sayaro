"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { ImagePlaceholder } from "./ImagePlaceholder";

function ScrollWord({ word, progress }: { word: string; progress: import("framer-motion").MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 1], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

function ScrollRevealText({
  text,
  className,
  colorSplit,
}: {
  text: string;
  className?: string;
  colorSplit?: number;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");
  const splitAt = colorSplit ?? words.length;

  return (
    <h3 ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const wordProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
        return (
          <span key={i} className={i < splitAt ? "text-[#13171B]" : "text-neutral-400"}>
            <ScrollWord word={word} progress={wordProgress} />
          </span>
        );
      })}
    </h3>
  );
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const textCards = [
  {
    title: "Precision Engineering",
    description: "Advanced engineering solutions designed for accuracy, durability, and high operational performance across all laboratory applications.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 3D target base — ellipse for depth */}
        <ellipse cx="50" cy="78" rx="40" ry="10" stroke="currentColor" strokeWidth="2.5" />
        {/* Outer ring */}
        <circle cx="50" cy="62" r="38" stroke="currentColor" strokeWidth="3.5" />
        {/* Middle ring */}
        <circle cx="50" cy="62" r="26" stroke="currentColor" strokeWidth="3" />
        {/* Inner ring */}
        <circle cx="50" cy="62" r="14" stroke="currentColor" strokeWidth="2.5" />
        {/* Bullseye */}
        <circle cx="50" cy="62" r="5" fill="currentColor" />
        {/* Arrow 1 — embedded in target */}
        <line x1="50" y1="62" x2="92" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M88 14 L98 16 L92 26" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="88" y1="14" x2="84" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="88" y1="14" x2="92" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Arrow 2 */}
        <line x1="56" y1="56" x2="96" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M92 24 L102 28 L94 36" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="92" y1="24" x2="88" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="92" y1="24" x2="96" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Arrow 3 */}
        <line x1="60" y1="52" x2="100" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M96 34 L106 38 L98 46" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="96" y1="34" x2="92" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="96" y1="34" x2="100" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Custom Manufacturing",
    description: "Laboratory equipment tailored to your industry-specific requirements — capacity, dimensions, temperature range, and configuration.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left puzzle piece — filled */}
        <path
          d="M16 42 h14 v-4 c0-8 14-8 14 0 v4 h14 v14 h-4 c-8 0-8 14 0 14 h4 v14 h-14 v4 c0 8-14 8-14 0 v-4 h-14 z"
          fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"
        />
        {/* Right puzzle piece — outline only */}
        <path
          d="M58 42 h14 v-4 c0-8 14-8 14 0 v4 h14 v14 h-4 c-8 0-8 14 0 14 h4 v14 h-14 v4 c0 8-14 8-14 0 v-4 h-14 v-14 h4 c8 0 8-14 0-14 h-4 z"
          stroke="currentColor" strokeWidth="3" strokeLinejoin="round"
        />
        {/* Spark lines — emphasis */}
        <line x1="56" y1="32" x2="56" y2="18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="46" y1="34" x2="40" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="66" y1="34" x2="72" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Small dots for extra flair */}
        <circle cx="56" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description: "Strict quality control procedures ensuring reliable performance and consistent product standards across every instrument we deliver.",
    icon: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clipboard board */}
        <rect x="14" y="22" width="58" height="82" rx="6" stroke="currentColor" strokeWidth="3.5" />
        {/* Clipboard clip */}
        <rect x="28" y="14" width="30" height="16" rx="5" stroke="currentColor" strokeWidth="3" />
        <circle cx="43" cy="22" r="3" fill="currentColor" />
        {/* Text lines on clipboard */}
        <line x1="28" y1="46" x2="58" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="66" x2="50" y2="66" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="76" x2="54" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="86" x2="44" y2="86" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hand */}
        <path d="M78 52 C74 56 72 60 72 64 C72 68 74 74 76 80 C78 86 80 92 84 96 C88 100 94 100 98 96 C102 92 104 86 102 80 C100 74 96 68 94 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Thumb */}
        <path d="M78 52 C80 50 82 50 84 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Fingers wrapping */}
        <path d="M72 64 C70 66 70 70 72 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Pen */}
        <line x1="82" y1="48" x2="68" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Pen tip */}
        <path d="M68 88 L64 96 L72 92" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Pen top */}
        <circle cx="83" cy="46" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-sayaro" className="py-20 scroll-mt-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <ScrollRevealText
            text="We combine precision engineering, custom manufacturing, and strict quality assurance to deliver laboratory equipment you can rely on."
            className="max-w-3xl font-heading text-[24px] font-medium leading-tight tracking-tight lg:text-[40px]"
            colorSplit={6}
          />
          <h2 className="shrink-0 font-heading text-[40px] lg:text-[60px] font-medium tracking-[-0.04em]">
            Why Sayaro
          </h2>
        </motion.div>

        {/* Row 1 — 3 text cards with large illustration icons */}
        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {textCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="flex h-full min-h-[360px] flex-col rounded-2xl bg-white border border-neutral-100 p-8">
                <div className="flex flex-1 items-center justify-center text-[#13171B]">
                  {card.icon}
                </div>
                <div className="mt-auto pt-6">
                  <h4 className="font-heading text-[20px] font-medium tracking-tight">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 — 2 image cards with overlay text */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <div className="relative overflow-hidden rounded-2xl h-[320px] lg:h-[380px] border border-neutral-100">
              <ImagePlaceholder label="Experienced Team" className="h-full w-full" />
              <div className="absolute bottom-0 left-0 p-8 z-10">
                <h4 className="font-heading text-[22px] font-medium tracking-tight text-[#13171B]">
                  Experienced Team
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 max-w-sm">
                  Skilled professionals with deep expertise in laboratory
                  engineering, manufacturing, and scientific infrastructure
                  solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <div className="relative overflow-hidden rounded-2xl h-[320px] lg:h-[380px] border border-neutral-100">
              <ImagePlaceholder label="End-to-End Support" className="h-full w-full" />
              <div className="absolute bottom-0 left-0 p-8 z-10">
                <h4 className="font-heading text-[22px] font-medium tracking-tight text-[#13171B]">
                  End-to-End Support
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 max-w-sm">
                  From design and fabrication to installation and ongoing
                  support — complete laboratory solutions under one roof.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

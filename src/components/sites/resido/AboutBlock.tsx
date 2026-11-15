"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  className,
}: {
  target: number;
  suffix: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  const animate = useCallback(() => {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div ref={ref} className={className ?? "font-heading text-[48px] lg:text-[60px] font-medium tracking-tight leading-none"}>
      {value.toLocaleString()}
      {suffix}
    </div>
  );
}

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

const counters = [
  { target: 5, suffix: "", desc: "Core product\nfamilies" },
  { target: 40, suffix: "+", desc: "Equipment models\nacross all families" },
  { target: 5, suffix: "", desc: "Service stages from\ndesign to support" },
] as const;

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

export function AboutBlock() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mt-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
          <motion.div
            className="lg:w-[45%] flex flex-col"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex items-center gap-6">
              <blockquote className="font-heading text-[18px] lg:text-[22px] font-medium tracking-tight leading-snug">
                &ldquo;Precision equipment configured around your
                laboratory&apos;s requirements.&rdquo;
              </blockquote>
              <div className="h-16 w-px bg-neutral-300 shrink-0" />
              <div className="flex items-center gap-3 shrink-0">
                <div className="size-12 rounded-full bg-neutral-200" />
                <div>
                  <p className="font-heading text-sm font-medium">Yagesh</p>
                  <p className="text-xs text-neutral-500">Director, Sayaro</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-1 flex-col gap-5">
              {counters.map((c) => (
                <div key={c.desc} className="rounded-xl bg-white p-6 flex flex-1 items-center gap-6">
                  <div className="shrink-0">
                    <AnimatedCounter
                      target={c.target}
                      suffix={c.suffix}
                      className="font-heading text-[40px] lg:text-[48px] font-medium tracking-tight leading-none"
                    />
                  </div>
                  <p className="text-base text-neutral-500">{c.desc.replace(/\n/g, " ")}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:w-[55%] flex"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex-1 rounded-2xl bg-white p-8 lg:p-10 flex flex-col justify-center">
              <ScrollRevealText
                text="We supply laboratory and scientific equipment focused on quality and reliability. Our work spans sterilization, incubation, thermal processing, safety, and thermal baths."
                className="font-heading text-[28px] lg:text-[42px] font-medium tracking-tight leading-[1.15]"
                colorSplit={11}
              />

              <div className="mt-8 flex items-center gap-6">
                <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-[#2F6BFF]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-260 -260 520 520"
                    aria-hidden="true"
                    className="h-[60px] w-auto text-[#2F6BFF]"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M-5.66 -0.00 L-95.66 90.00 L0.00 185.66 L95.66 90.00 L5.66 -0.00 L95.66 -90.00 L0.00 -185.66 L-95.66 -90.00 Z M4.00 -9.66 L4.00 -170.34 L84.34 -90.00 Z M-84.34 -90.00 L-4.00 -170.34 L-4.00 -9.66 Z M84.34 90.00 L4.00 170.34 L4.00 9.66 Z M-84.34 90.00 L-4.00 9.66 L-4.00 170.34 Z M0.00 255.66 L255.66 0.00 L0.00 -255.66 L-255.66 0.00 Z M0.00 244.34 L-244.34 0.00 L0.00 -244.34 L244.34 0.00 Z"
                    />
                  </svg>
                </div>
                <p className="text-neutral-500 text-[15px] leading-relaxed">
                  We work with laboratories to understand their requirements and
                  recommend the right equipment for their applications.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

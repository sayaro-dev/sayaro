"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillButton } from "./PillButton";

const faqs = [
  {
    question: "How do I enquire about a product?",
    answer:
      "Select the relevant product category and share your application, required capacity, operating range, and quantity through the enquiry form. Our team will review and follow up.",
  },
  {
    question: "Can I request a specific capacity or configuration?",
    answer:
      "Yes. Share your required dimensions, capacity, and operating conditions. The Sayaro team can confirm which options are available for the selected product.",
  },
  {
    question: "Can I request product specifications or datasheets?",
    answer:
      "Yes. Mention the product or model in your enquiry and request the relevant technical details or datasheet. We will share available specification documents.",
  },
  {
    question: "Do you support installation?",
    answer:
      "Contact the team for details on installation, commissioning, and after-sales support scope for your specific equipment and location.",
  },
  {
    question: "What is the typical lead time for equipment?",
    answer:
      "Lead times vary by product and configuration. Standard models typically ship within 2–4 weeks. Custom configurations may require 4–8 weeks. We confirm timelines at the time of order.",
  },
];

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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        {/* Left column */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h3 className="font-heading text-[28px] font-medium tracking-tight leading-tight lg:text-[36px]">
            Frequently Asked
            <br />
            Questions
          </h3>
          <p className="mt-4 text-sm text-neutral-500">
            Questions? We have answers. Here&apos;s what you need to know about
            working with us.
          </p>

          <p className="mt-auto pt-10 text-sm text-neutral-500">
            Need to ask something else?
          </p>

          <div className="mt-4 rounded-2xl bg-white p-6">
            <div className="size-14 rounded-full bg-neutral-200" />
            <p className="mt-4 font-heading text-sm font-medium">
              Hi, I&apos;m Yagesh, Director of Sayaro.
            </p>
            <p className="text-sm text-neutral-500">Reach out anytime.</p>
            <div className="mt-4">
              <PillButton href="/contact" variant="primary">
                Ask Questions
                <span className="ml-1 text-lg leading-none">&rsaquo;</span>
              </PillButton>
            </div>
          </div>
        </motion.div>

        {/* Right column — Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="mb-3 rounded-2xl bg-white"
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between p-6"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <h6 className="text-left font-heading text-lg font-medium tracking-tight pr-4">
                    {faq.question}
                  </h6>
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#13171B] text-white transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-neutral-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

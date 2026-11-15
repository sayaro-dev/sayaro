"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PillButton } from "./PillButton";

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 mt-0.5 text-white/70"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function LetsBuildTogether() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const inputClasses =
    "w-full border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/20";

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-6">
      <div className="relative">
        {/* Blue background card */}
        <div className="rounded-[24px] bg-[#2F6BFF] px-8 py-12 lg:px-12 lg:py-16 lg:min-h-[520px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — heading + bullets + contact card */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h2 className="font-heading text-[36px] lg:text-[48px] font-medium tracking-tight leading-tight text-white">
                Let&apos;s Find the Right Equipment.
              </h2>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm text-white/80">
                    Share your requirements.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm text-white/80">
                    Response within 24 hours.
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <div className="rounded-2xl bg-white p-6 max-w-[320px]">
                  <div className="size-12 rounded-full bg-neutral-200" />
                  <p className="mt-3 font-heading text-sm font-medium">
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
              </div>
            </motion.div>

            {/* Right — spacer on mobile, form card overlaps on desktop */}
            <div className="lg:hidden">
              {/* Form for mobile — inside the blue card */}
              <div className="rounded-2xl bg-white p-6">
                <h3 className="font-heading text-xl font-medium tracking-tight">
                  Have an equipment requirement?
                </h3>
                <p className="text-sm text-neutral-500 mt-1 mb-5">
                  We&apos;ll review and get back to you.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                    <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Equipment Requirement</label>
                    <textarea placeholder="Tell us what you need..." value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className={inputClasses} />
                  </div>
                  <PillButton type="submit" variant="primary" className="w-full">Send Enquiry</PillButton>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Form card — floating on desktop */}
        <motion.div
          className="hidden lg:block absolute top-8 right-8 w-[440px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="font-heading text-2xl font-medium tracking-tight">
              Have an equipment requirement?
            </h3>
            <p className="text-neutral-500 mt-1 text-sm">
              Let&apos;s get started
            </p>
            <p className="text-sm text-neutral-400 mt-2 mb-6">
              We&apos;ll schedule a call to discuss your needs and send a proposal.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Equipment Requirement</label>
                <textarea
                  placeholder="Tell us the product, application, capacity, and quantity you need..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  className={inputClasses}
                />
              </div>
              <PillButton type="submit" variant="primary" className="w-full">
                Send Enquiry
              </PillButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

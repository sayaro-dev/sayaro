"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/works" },
  { label: "Why Sayaro", href: "/#why-sayaro" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "IM", href: "https://www.indiamart.com/thermalscientificinstruments" },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="shrink-0">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-260 -260 520 520"
                aria-hidden="true"
                className="h-[56px] lg:h-[72px] w-auto text-[#13171B]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M-5.66 -0.00 L-95.66 90.00 L0.00 185.66 L95.66 90.00 L5.66 -0.00 L95.66 -90.00 L0.00 -185.66 L-95.66 -90.00 Z M4.00 -9.66 L4.00 -170.34 L84.34 -90.00 Z M-84.34 -90.00 L-4.00 -170.34 L-4.00 -9.66 Z M84.34 90.00 L4.00 170.34 L4.00 9.66 Z M-84.34 90.00 L-4.00 9.66 L-4.00 170.34 Z M0.00 255.66 L255.66 0.00 L0.00 -255.66 L-255.66 0.00 Z M0.00 244.34 L-244.34 0.00 L0.00 -244.34 L244.34 0.00 Z"
                />
              </svg>
              <span className="font-heading text-[48px] lg:text-[64px] font-medium tracking-tight leading-none">
                Sayaro
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm text-neutral-400">Navigation</span>
            <ul className="flex flex-wrap gap-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-heading text-[15px] tracking-tight hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm text-neutral-400">Socials</span>
            <ul className="flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-[15px] tracking-tight hover:opacity-70 transition-opacity"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <hr className="my-6 border-t border-neutral-200" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="flex flex-col gap-3 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <span>Chennai, India</span>
          <span>&copy;2026 Sayaro. All rights reserved.</span>
          <div className="flex gap-4">
            <Link
              href="/legal/privacy-policy"
              className="font-heading text-sm text-neutral-400 transition-colors hover:text-[#13171B]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-use"
              className="font-heading text-sm text-neutral-400 transition-colors hover:text-[#13171B]"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

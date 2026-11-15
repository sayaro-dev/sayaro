"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";

const links = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/works" },
  { label: "Why Sayaro", href: "/#why-sayaro" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    letters: "IM",
    href: "https://www.indiamart.com/thermalscientificinstruments",
  },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto mt-4 w-full rounded-2xl border bg-[#FAFAFA] px-4 shadow-sm transition-all duration-500 ease-out",
        scrolled && !open
          ? "max-w-[1100px] border-neutral-200/60 bg-[#FAFAFA]/80 shadow-md backdrop-blur-lg md:top-4"
          : "max-w-[1400px] border-neutral-200"
      )}
    >
      <nav
        className={cn(
          "flex w-full items-center justify-between transition-all duration-500 ease-out",
          scrolled ? "h-[56px] px-4" : "h-[72px] px-6"
        )}
      >
        <Link
          href="/"
          aria-label="SAYARO"
          className="flex items-center gap-2.5 text-[#13171B]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-260 -260 520 520"
            aria-hidden="true"
            className="w-auto"
            style={{
              height: scrolled ? 32 : 40,
              transition: "height 500ms ease-out",
            }}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M-5.66 -0.00 L-95.66 90.00 L0.00 185.66 L95.66 90.00 L5.66 -0.00 L95.66 -90.00 L0.00 -185.66 L-95.66 -90.00 Z M4.00 -9.66 L4.00 -170.34 L84.34 -90.00 Z M-84.34 -90.00 L-4.00 -170.34 L-4.00 -9.66 Z M84.34 90.00 L4.00 170.34 L4.00 9.66 Z M-84.34 90.00 L-4.00 9.66 L-4.00 170.34 Z M0.00 255.66 L255.66 0.00 L0.00 -255.66 L-255.66 0.00 Z M0.00 244.34 L-244.34 0.00 L0.00 -244.34 L244.34 0.00 Z"
            />
          </svg>
          <span className="font-heading text-2xl font-semibold tracking-tight">
            Sayaro
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              className="rounded-lg px-4 py-2 font-heading text-base font-medium text-neutral-700 transition-colors hover:bg-[#13171B] hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y bg-white/95 backdrop-blur-lg md:hidden",
          scrolled ? "top-[56px]" : "top-[72px]",
          open ? "block" : "hidden"
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4"
          )}
        >
          <div className="grid gap-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                className="rounded-lg px-5 py-4 font-heading text-lg font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p className="text-sm text-neutral-500">
                Stay Updated on Our Latest Equipment
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-[220px] rounded-full border border-neutral-200 px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <button className="rounded-full bg-[#2F6BFF] px-5 py-2.5 font-heading text-sm font-medium text-white transition-opacity hover:opacity-80">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a
                href="mailto:thermalscientific2021@gmail.com"
                className="font-heading transition-opacity hover:opacity-60"
              >
                thermalscientific2021@gmail.com
              </a>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading transition-opacity hover:opacity-60"
                  >
                    {social.letters}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

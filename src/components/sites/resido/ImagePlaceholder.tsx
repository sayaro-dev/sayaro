import { cn } from "@/lib/utils";

type Variant = "default" | "compact";

interface ImagePlaceholderProps {
  label?: string;
  variant?: Variant;
  className?: string;
}

export function ImagePlaceholder({
  label,
  variant = "default",
  className,
}: ImagePlaceholderProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-neutral-50",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 12px, oklch(0.92 0 0) 12px, oklch(0.92 0 0) 13px)",
        }}
      />

      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl bg-neutral-100",
          isCompact ? "size-10" : "size-16"
        )}
      >
        <svg
          width={isCompact ? 20 : 28}
          height={isCompact ? 20 : 28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2F6BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 16l5-5 3 3 4-4 8 8" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
      </div>

      {!isCompact && (
        <p className="relative mt-3 px-4 text-center font-heading text-xs leading-snug text-neutral-400">
          {label || "Image coming soon"}
        </p>
      )}
    </div>
  );
}

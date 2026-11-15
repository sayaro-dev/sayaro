"use client";

import { cn } from "@/lib/utils";

interface MenuToggleIconProps extends React.ComponentProps<"svg"> {
  open: boolean;
  duration?: number;
}

export function MenuToggleIcon({
  open,
  duration = 300,
  className,
  ...props
}: MenuToggleIconProps) {
  const style = { transitionDuration: `${duration}ms` };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5", className)}
      {...props}
    >
      <line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        className={cn(
          "origin-center transition-transform",
          open && "translate-y-[4px] rotate-45"
        )}
        style={style}
      />
      <line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        className={cn(
          "origin-center transition-transform",
          open && "-translate-y-[4px] -rotate-45"
        )}
        style={style}
      />
    </svg>
  );
}

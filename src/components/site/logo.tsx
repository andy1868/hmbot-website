"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showText?: boolean;
}

/**
 * HMbot logo — a minimal geometric mark suggesting a camera/vision aperture
 * combined with a forward-moving chevron. Drawn inline so it inherits currentColor.
 */
export function Logo({ className, variant = "dark", showText = true }: LogoProps) {
  const color = variant === "light" ? "#fff" : "oklch(0.18 0.01 60)";
  const accent = "oklch(0.66 0.21 41)";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* outer rounded square */}
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="10"
          stroke={color}
          strokeWidth="2"
          opacity="0.9"
        />
        {/* vision aperture — concentric arcs */}
        <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="2" opacity="0.5" />
        <circle cx="20" cy="20" r="5" stroke={color} strokeWidth="2" />
        {/* forward chevron — accent */}
        <path
          d="M22 16 L26 20 L22 24"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* center dot */}
        <circle cx="20" cy="20" r="1.6" fill={accent} />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ color }}
          >
            HMbot
          </span>
          <span
            className="text-[10px] font-medium tracking-widest opacity-70"
            style={{ color }}
          >
            后马时代
          </span>
        </div>
      )}
    </div>
  );
}

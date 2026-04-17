import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
}

const badgeVariants = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  neutral: "bg-slate-50 text-slate-600 border-slate-200",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full border uppercase tracking-wide
        ${badgeVariants[variant]}
        ${badgeSizes[size]}
      `}
    >
      {children}
    </span>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ActionLink({ to, children, variant = "primary", className = "" }: { to: string; children: ReactNode; variant?: "primary" | "outline"; className?: string }) {
  const classes = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-accent"
    : "border border-border bg-background/30 text-foreground hover:border-primary hover:text-primary";
  return <Link to={to} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-[.18em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${classes} ${className}`}>{children}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>;
}

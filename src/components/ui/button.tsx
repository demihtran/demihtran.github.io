import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
        variant === "primary"
          ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200"
          : "border border-white/15 bg-white/5 text-white hover:border-cyan-300/50 hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

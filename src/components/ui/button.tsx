import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        variant === "primary"
          ? "bg-white text-black hover:bg-white/85"
          : "border border-white/20 bg-black text-white hover:border-white/60 hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

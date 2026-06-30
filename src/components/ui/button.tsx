import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a1b14]",
        variant === "primary"
          ? "bg-[#2a1b14] text-[#f6f1ea] hover:bg-[#3a261c]"
          : "border border-[#2a1b14]/20 bg-transparent text-[#2a1b14] hover:border-[#2a1b14]/60 hover:bg-[#2a1b14]/5",
        className,
      )}
      {...props}
    />
  );
}

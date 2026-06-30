import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

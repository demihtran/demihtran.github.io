import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100",
        className,
      )}
    >
      {children}
    </span>
  );
}

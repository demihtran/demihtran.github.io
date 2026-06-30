import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#2a1b14]/15 bg-[#2a1b14]/5 px-3 py-1 text-xs font-medium text-[#2a1b14]/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

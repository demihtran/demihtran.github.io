import { cn } from "@/lib/utils";

export function Card({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

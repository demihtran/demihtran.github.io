import { cn } from "@/lib/utils";

export function Card({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 transition duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

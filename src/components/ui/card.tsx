import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[#2a1b14]/12 bg-[#fffaf3]/65 p-6 shadow-[0_24px_80px_rgba(42,27,20,0.06)] transition duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import { navigation } from "@/data/profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f6f1ea]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-[#2a1b14]/10 bg-[#fffaf3]/80 px-4 shadow-[0_18px_60px_rgba(42,27,20,0.08)] sm:px-6">
        <a href="#top" className="group flex items-center gap-3 text-[#2a1b14]">
          <span className="grid size-9 place-items-center rounded-full bg-[#2a1b14] text-xs font-semibold tracking-[-0.03em] text-[#f6f1ea] transition group-hover:scale-105">
            D
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.32em]">DEMI</span>
        </a>
        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#2a1b14]/55 transition hover:bg-[#2a1b14]/5 hover:text-[#2a1b14]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

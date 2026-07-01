import { navigation } from "@/data/profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 py-2 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="text-sm font-semibold uppercase tracking-[0.32em] text-[#2a1b14]">
          DEMI
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-[#2a1b14]/10 bg-[#fffaf3]/70 px-2 py-1 shadow-[0_12px_40px_rgba(42,27,20,0.07)] backdrop-blur-xl md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[#2a1b14]/55 transition hover:bg-[#2a1b14]/5 hover:text-[#2a1b14]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

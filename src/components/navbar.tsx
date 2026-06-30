import { navigation } from "@/data/profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2a1b14]/10 bg-[#f6f1ea]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="text-base font-semibold tracking-[-0.04em] text-[#2a1b14]">
          Demi
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group text-sm text-[#2a1b14]/55 transition hover:text-[#2a1b14]"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] group-hover:bg-[length:100%_1px]">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

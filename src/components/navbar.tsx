import { navigation, profile } from "@/data/profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="group flex items-center gap-3 text-sm font-medium text-white">
          <span className="grid size-9 place-items-center rounded-full border border-white/20 text-xs tracking-tight transition group-hover:border-white/60">
            {profile.initials}
          </span>
          <span className="hidden text-white/70 sm:inline">{profile.role}</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group text-sm text-white/55 transition hover:text-white"
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

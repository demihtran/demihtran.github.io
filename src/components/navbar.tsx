import { Bot } from "lucide-react";
import { navigation, profile } from "@/data/profile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="grid size-9 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
            <Bot className="size-5" />
          </span>
          <span>{profile.name}</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-cyan-200">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

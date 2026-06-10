import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {profile.name}. AI Agent Harness Portfolio.</p>
    </footer>
  );
}

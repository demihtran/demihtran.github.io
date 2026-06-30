import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
      <p>© 2026 {profile.name}. {profile.role}.</p>
    </footer>
  );
}

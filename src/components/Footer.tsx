import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-ink-soft">
          © {new Date().getFullYear()} {profile.name}. Built with React,
          Tailwind & Three.js.
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: `mailto:${profile.email}`, icon: <Mail size={16} />, label: "Email" },
            { href: profile.socials.github, icon: <Github size={16} />, label: "GitHub" },
            { href: profile.socials.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.06] text-ink-soft transition-colors hover:bg-ink hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

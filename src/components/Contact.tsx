import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal } from "./ui";
import { profile } from "../data";

export default function Contact() {
  const channels = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "Connect with me",
      href: profile.socials.linkedin,
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "Gitforsuyash",
      href: profile.socials.github,
    },
    {
      icon: <span className="text-lg leading-none">🤗</span>,
      label: "Hugging Face",
      value: "HugFace4Suyash",
      href: profile.socials.huggingface,
    },
  ];

  return (
    <section id="contact" className="section-pad">
      <Reveal>
        <div className="overflow-hidden rounded-[28px] bg-panel p-8 text-white md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">
                07 — Contact
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                Let&apos;s build something with AI
              </h2>
              <p className="mt-4 max-w-md text-white/60">
                Open to AI Engineer and Product Manager roles, GenAI
                collaborations, and interesting problems. The fastest way to
                reach me is email.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} /> {profile.location}
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Say hello
              </a>
            </div>

            <div className="grid gap-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:-translate-y-0.5 hover:border-white/25"
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-white/10 text-white">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/40">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-white">
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

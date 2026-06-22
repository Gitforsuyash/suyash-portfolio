import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { projects, profile } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A selection of GenAI, RAG, and agentic systems I've designed, scoped, and shipped."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} from="right">
            <div className="frame frame-hover group flex h-full flex-col p-6">
              <div className="mb-5 flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-ink font-display text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/[0.06] text-ink-soft transition-colors group-hover:bg-ink group-hover:text-white"
                    aria-label={`Open ${p.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {p.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="text-sm text-ink-soft">
          More experiments and open-source code on{" "}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline underline-offset-4 hover:no-underline"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={profile.socials.huggingface}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-ink underline underline-offset-4 hover:no-underline"
          >
            Hugging Face
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}

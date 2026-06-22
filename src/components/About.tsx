import { Brain, Rocket, Target, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { profile, stats } from "../data";

const pillars = [
  {
    icon: <Brain size={22} />,
    title: "Technically fluent",
    text: "Hands-on with LLMs, RAG, embeddings, vector DBs, and agentic frameworks — I can scope and build, not just spec.",
  },
  {
    icon: <Target size={22} />,
    title: "Outcome-driven",
    text: "I define the metrics that matter — quality, latency, cost, adoption — and steer products toward them.",
  },
  {
    icon: <Rocket size={22} />,
    title: "Ships products",
    text: "From idea to launch: roadmaps, PRDs, prototypes, A/B tests, and GTM — delivered iteratively.",
  },
  {
    icon: <Users size={22} />,
    title: "Cross-functional",
    text: "I translate ambiguous research goals into sprint-ready requirements for ML, data, and engineering teams.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading
        index="01"
        eyebrow="Who Am I"
        title="Where strategy meets engineering"
        subtitle="I sit between the whiteboard and the codebase — turning AI capabilities into products people actually use."
      />

      <div className="grid gap-6 md:grid-cols-5">
        <Reveal className="md:col-span-2" from="left">
          <div className="frame frame-hover h-full p-7">
            <p className="text-lg leading-relaxed text-ink">{profile.summary}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              I&apos;m comfortable across the OpenAI, Anthropic, and Hugging Face
              ecosystems, and equally at home writing a PRD or wiring up a
              retrieval pipeline. Based in {profile.location}.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-black/[0.06] bg-black/[0.02] p-4 text-center"
                >
                  <div className="font-display text-2xl font-bold text-ink">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} from="right">
              <div className="frame frame-hover h-full p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
                  {p.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

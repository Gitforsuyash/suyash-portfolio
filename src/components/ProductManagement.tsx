import {
  BarChart3,
  ClipboardList,
  Compass,
  Cpu,
  FileText,
  LineChart,
  Map as MapIcon,
  Rocket,
  Search,
  Target,
  Users,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { productManagement as pm } from "../data";

const icons = [
  <Search size={20} />,
  <Compass size={20} />,
  <FileText size={20} />,
  <MapIcon size={20} />,
  <ClipboardList size={20} />,
  <LineChart size={20} />,
];

const compIcons = [
  <Target size={20} />,
  <Cpu size={20} />,
  <BarChart3 size={20} />,
  <Users size={20} />,
];

export default function ProductManagement() {
  return (
    <section id="product" className="section-pad">
      <SectionHeading
        index="03"
        eyebrow="Product Management Coursework"
        title="From market research to launch — built solo"
        subtitle="I drove the complete product lifecycle myself for a Generative AI product, owning every stage end to end."
      />

      <Reveal className="mb-6" from="down">
        <div className="frame p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                {pm.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-ink-soft">
                {pm.provider}
              </p>
            </div>
            <span className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
              {pm.status}
            </span>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            {pm.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pm.takeaways.map((t) => (
              <span key={t} className="chip text-xs">
                <Rocket size={13} /> {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pm.phases.map((phase, i) => (
          <Reveal key={phase.label} delay={i * 0.06} from="right">
            <div className="frame frame-hover group relative h-full overflow-hidden p-6">
              <span className="absolute right-4 top-3 font-mono text-5xl font-bold text-white/[0.05]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
                {icons[i]}
              </div>
              <h4 className="font-display text-base font-semibold text-ink">
                {phase.label}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {phase.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---- Core PM competencies ---- */}
      <Reveal from="down" className="mb-6 mt-16">
        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Core competencies
        </h3>
        <p className="mt-2 max-w-2xl text-ink-soft">
          The product-management depth I bring to AI products — strategy,
          technical fluency, metrics, and cross-functional delivery.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pm.competencies.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06} from="right">
            <div className="frame frame-hover h-full p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
                {compIcons[i]}
              </div>
              <h4 className="font-display text-base font-semibold text-ink">
                {c.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                  >
                    <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-ink" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { Briefcase, MapPin } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Work experience"
        subtitle="Building and owning AI products across drug discovery, developer tools, and automation."
      />

      <div className="space-y-5">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05} from="right">
            <div className="frame frame-hover p-6 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:gap-10">
                {/* left rail */}
                <div className="md:w-56 md:flex-shrink-0">
                  <span className="chip gap-1.5 font-mono text-xs">
                    <Briefcase size={13} /> {job.period}
                  </span>
                  {job.current && (
                    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Current
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    {job.role}
                  </h3>
                  <div className="mt-1 font-medium text-ink">{job.company}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-sm text-ink-soft">
                    <MapPin size={13} /> {job.location}
                  </div>
                </div>

                {/* body */}
                <div className="flex-1">
                  <p className="text-ink">{job.summary}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((pt, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

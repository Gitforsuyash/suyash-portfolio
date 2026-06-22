import { Award, GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { certifications, education } from "../data";

export default function Credentials() {
  return (
    <section id="credentials" className="section-pad">
      <SectionHeading
        index="06"
        eyebrow="Certifications & Education"
        title="Credentials"
        subtitle="Continuous learning across AI engineering, data science, and product management."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Certifications */}
        <Reveal className="lg:col-span-3" from="left">
          <div className="frame h-full p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white">
                <Award size={20} />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                Certifications
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="rounded-2xl border border-black/[0.06] bg-black/[0.02] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink">{c.name}</p>
                      <p className="mt-0.5 text-sm text-ink-soft">{c.issuer}</p>
                    </div>
                    {c.note && (
                      <span className="whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">
                        {c.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal className="lg:col-span-2" delay={0.08} from="right">
          <div className="frame h-full p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white">
                <GraduationCap size={20} />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                Education
              </h3>
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5">
              <p className="font-display text-lg font-semibold text-ink">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-ink">{education.school}</p>
              <p className="mt-1 font-mono text-xs text-ink-soft">
                {education.period}
              </p>
              <p className="mono-label mt-4">Relevant coursework</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

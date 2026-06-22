import { Reveal, SectionHeading } from "./ui";
import { skills } from "../data";

export default function Skills() {
  const marquee = skills.flatMap((s) => s.items);

  return (
    <section id="skills" className="section-pad">
      <SectionHeading
        index="05"
        eyebrow="Skills & Tools"
        title="My toolkit"
        subtitle="The stack I use to research, build, and ship AI products."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05} from="right">
            <div className="frame frame-hover h-full p-6">
              <h3 className="mono-label mb-4">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-1.5 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* marquee strip */}
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

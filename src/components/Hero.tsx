import { lazy, Suspense } from "react";
import { ArrowUpRight } from "lucide-react";

const ParticleMorph = lazy(() => import("./three/ParticleMorph"));

export default function Hero() {
  return (
    <section id="home" className="px-3 pb-3 pt-20 sm:px-4">
      <div className="relative mx-auto h-[80vh] max-w-[1500px] overflow-hidden rounded-[28px] bg-panel">
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <ParticleMorph
              phrases={[
                "Hey there 👋",
                "This is Suyash",
                "I design",
                "I build",
                "AI Systems",
              ]}
            />
          </div>
        </Suspense>

        {/* corner labels */}
        <div className="pointer-events-none absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
          Suyash Kulkarni
        </div>
        <div className="pointer-events-none absolute right-6 top-6 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 sm:block">
          AI Engineer · Product Manager
        </div>
        <div className="pointer-events-none absolute bottom-6 left-6 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 sm:block">
          Pune, India
        </div>

        {/* explore CTA */}
        <a
          href="#about"
          className="group absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 border-b border-white/40 pb-1 text-lg text-white/90 transition-colors hover:border-white hover:text-white"
        >
          Explore
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}

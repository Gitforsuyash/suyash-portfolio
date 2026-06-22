import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * HSection — ties a whole section's horizontal position to scroll.
 * As you scroll DOWN, the entire section pans right → left (enters from the
 * right, settles centered, exits to the left). Scrolling UP reverses it.
 * The whole "screen" moves as one unit — not the individual components.
 */
export function HSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [180, 0, 0, -180]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.86, 1],
    [0, 1, 1, 0]
  );
  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveal — now a passthrough wrapper. Motion lives at the section level
 * (HSection), so individual cards no longer slide in on their own.
 * The `delay` / `from` props are accepted but ignored.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
}) {
  return <div className={className}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  index,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  index?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        {index && <span className="font-mono text-sm text-ink">{index}</span>}
        <span className="mono-label">{eyebrow}</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}

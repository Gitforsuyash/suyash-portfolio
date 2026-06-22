import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — a gentle fade-in (slight upward rise) as a block scrolls into view.
 * Triggers once. The `from` prop is accepted for backwards-compat but ignored.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
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
    <Reveal className="mb-12 max-w-3xl">
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
    </Reveal>
  );
}

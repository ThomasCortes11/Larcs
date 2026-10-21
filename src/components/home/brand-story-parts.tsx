"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Número que cuenta desde 0 cuando entra en pantalla (ej. "+30", "100%").
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return () => controls.stop();
  }, [inView, prefix, suffix, value, reduceMotion]);

  // El valor final va en el HTML: así se ve bien sin JavaScript y para buscadores.
  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

// En celular muestra los primeros párrafos y el resto detrás de "Leer más".
export function StoryParagraphs({ paragraphs, visible = 2 }: { paragraphs: readonly string[]; visible?: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-[var(--muted-foreground)] sm:text-base sm:leading-8">
      {paragraphs.map((paragraph, index) => (
        <p key={paragraph} className={index >= visible && !expanded ? "hidden md:block" : undefined}>
          {paragraph}
        </p>
      ))}
      {paragraphs.length > visible ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-[var(--primary)] md:hidden"
        >
          {expanded ? "Leer menos" : "Leer toda nuestra historia"}
          <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

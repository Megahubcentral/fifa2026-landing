"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlowOrb, Reveal } from "@/components/ui/motion";
import { scrollToSection } from "@/lib/scroll-to-section";

const heroSlides = [
  "https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=2200&q=80"
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((v) => (v + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="theater-dark relative overflow-hidden pt-[calc(env(safe-area-inset-top,0px)+4.75rem)]"
    >
      <div className="section-shell relative h-[calc(100svh-env(safe-area-inset-top,0px)-4.75rem)] min-h-[min(520px,85svh)] w-full">
        <div className="relative h-full w-full overflow-hidden rounded-b-3xl border border-white/15">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0.2, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.08 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={heroSlides[activeSlide]}
                alt="FIFA World Cup 2026 carousel"
                fill
                priority
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,44,0.55)_0%,rgba(7,19,44,0.4)_40%,rgba(7,19,44,0.65)_100%)]" />
          <div className="absolute inset-0 bg-stadium" />
          <GlowOrb className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-electric/20 blur-[100px]" duration={12} />
          <GlowOrb className="absolute right-[-4rem] top-24 h-56 w-56 rounded-full bg-gold/25 blur-[100px]" duration={14} />

          <div className="relative z-10 flex h-full w-full flex-col justify-center px-5 py-10 sm:px-8 sm:py-12">
            <Reveal>
              <p className="text-center text-[11px] uppercase tracking-[0.28em] text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
                Head imágenes · Carrusel principal
              </p>
              <h1
                className="mx-auto mt-3 max-w-3xl text-center text-[clamp(1.8rem,6vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white"
                style={{ textShadow: "0 8px 30px rgba(0,0,0,0.58), 0 2px 10px rgba(0,0,0,0.5)" }}
              >
                FIFA World Cup 2026
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => scrollToSection("live")}
                className="min-h-12 rounded-full bg-electric px-7 py-3 text-sm font-semibold text-midnight transition hover:brightness-110"
              >
                Ver en vivo
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("fixtures")}
                className="min-h-12 rounded-full border border-slate-300 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white"
              >
                Calendario de partidos
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("summaries")}
                className="min-h-12 rounded-full border border-slate-300 bg-white/80 px-7 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white"
              >
                Highlights
              </button>
            </Reveal>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-8 bg-electric" : "w-2 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

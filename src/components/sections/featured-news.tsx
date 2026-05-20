"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Reveal } from "@/components/ui/motion";
import { usePosts } from "@/hooks/usePosts";

export function FeaturedNewsSection() {
  const { posts, loading } = usePosts();

  if (!loading && !posts.length) return null;

  return (
    <section className="section-shell py-12 sm:py-16">
      <SectionTitle kicker="Editorial" title="Noticias destacadas" subtitle="Modulo editorial premium con story principal y tarjetas secundarias para descubrimiento rapido." />

      {loading ? (
        <div className="grid gap-4 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="h-[270px] animate-pulse rounded-3xl bg-slate-200 sm:h-[360px]" />
          </div>
          <div className="space-y-4 xl:col-span-4">
            <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
            <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 xl:grid-cols-12">
          <Reveal className="xl:col-span-8">
            <motion.article whileHover={{ y: -4 }} className="group glass-heavy overflow-hidden rounded-3xl">
              <div className="relative h-[270px] sm:h-[360px]">
                <Image src={posts[0].image} alt={posts[0].title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_35%,rgba(0,0,0,0.05)_70%,transparent_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(255,255,255,0.9)] [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">{posts[0].category}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#ffffff] [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] sm:text-3xl">{posts[0].title}</h3>
                </div>
              </div>
            </motion.article>
            <Reveal delay={0.1} className="hidden md:block mt-4">
              <div className="glass flex h-24 items-center justify-center rounded-2xl border border-white/20 p-4">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">AD / SPONSOR</p>
                  <p className="mt-1 text-sm font-semibold">Premium Leaderboard Sponsor</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">728x90</p>
                </div>
              </div>
            </Reveal>
          </Reveal>

          <div className="space-y-4 xl:col-span-4">
            {posts.slice(1, 3).map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <motion.article whileHover={{ y: -4 }} className="group glass-heavy overflow-hidden rounded-3xl">
                  <div className="relative h-40">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-electric">{item.category}</p>
                    <h4 className="mt-2 text-base font-semibold leading-tight">{item.title}</h4>
                  </div>
                </motion.article>
              </Reveal>
            ))}

            <Reveal delay={0.12} className="block md:hidden">
              <div className="glass rounded-2xl border border-white/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">AD / SPONSOR</p>
                <p className="mt-2 text-sm font-semibold">In-content Rectangle Sponsor</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50">300x250 / 336x280</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href="https://piodeportes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white hover:shadow-md"
          >
            Ver más noticias
            <span className="text-lg">→</span>
          </a>
        </Reveal>
        </>
      )}
    </section>
  );
}

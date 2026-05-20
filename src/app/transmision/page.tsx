"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useAccess } from "@/hooks/useAccess";
import { BRANDING } from "@/lib/branding";
import { FooterSection } from "@/components/sections/footer";

const PPV_PRODUCT_ID = 13;

export default function TransmisionPage() {
  const { user, loading } = useAuth();
  const { hasAccess, loading: accessLoading, error: accessError } = useAccess(PPV_PRODUCT_ID);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/suscribete");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!accessLoading && !hasAccess && user) {
      router.push("/planes");
    }
  }, [accessLoading, hasAccess, user, router]);

  if (loading || accessLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060d1f]">
        <p className="text-sm text-white/50">{loading ? "Cargando..." : "Verificando acceso..."}</p>
      </div>
    );
  }

  if (!user || !hasAccess) return null;

  return (
    <div className="min-h-screen bg-[#060d1f]">
      <header className="theater-dark fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-[#08142c]/90 backdrop-blur-2xl">
        <div className="section-shell flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={BRANDING.pioIcon}
              alt="Pio Deportes"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </Link>
          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <Link href="/" className="transition hover:text-white">Inicio</Link>
            <Link href="/perfil" className="transition hover:text-white">Perfil</Link>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        <div className="theater-dark mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <div className="glass-heavy relative overflow-hidden rounded-3xl border border-slate-700/60 bg-[#090f1f] p-4 shadow-[0_25px_80px_rgba(2,6,23,0.55)] sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(70,210,255,0.18),transparent_40%)]" />
            <div className="pointer-events-none absolute bottom-4 right-4 opacity-10">
              <Image
                src={BRANDING.fifaLogoWhite}
                alt="FIFA World Cup 2026 watermark"
                width={120}
                height={120}
                className="h-16 w-16 object-contain sm:h-24 sm:w-24"
              />
            </div>

            <div className="relative mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-400" />
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
                  Live PPV
                </span>
              </div>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-900">
                Sin anuncios
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c1c3d] via-[#0a1225] to-[#070b16]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_100%,rgba(70,210,255,0.22),transparent_45%)]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                Main Feed
              </div>
              <div className="relative grid h-full place-items-center">
                <div className="text-center">
                  <p className="text-6xl">📺</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    JW Player Embed Placeholder
                    <br />
                    <span className="text-xs text-white/50">
                      Tokenized AWS DRM stream + live SSAI hooks
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-300 bg-white/90 px-4 py-3"
              >
                <p className="text-lg font-semibold text-slate-900">
                  USA vs Mexico
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-blue-800">
                  SoFi Stadium • Group Stage • 8:00 PM AST
                </p>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {["Auto", "1080p", "EN", "Fullscreen"].map((btn) => (
                  <button
                    key={btn}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-blue-900 transition hover:bg-slate-100"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-white/50">
                <span className="text-electric">Suscripción PPV activa</span>
                {" — "}Disfrutas de esta transmisión sin anuncios gracias a tu suscripción FIFApp.
              </p>
            </div>
          </div>

          <div className="theater-dark mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Próximo", value: "Spain vs France — 7:00 PM" },
              { label: "Después", value: "Argentina vs Brazil — 9:30 PM" },
              { label: "Pre-game", value: "Show en vivo en 18 minutos" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                className="glass-heavy rounded-2xl border border-white/10 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-white/90">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

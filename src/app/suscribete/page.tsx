"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SuscribeteMarketing } from "@/components/sections/suscribete-marketing";
import { CombinedAuthForm } from "@/components/auth/combined-auth-form";
import { BRANDING } from "@/lib/branding";

export default function SuscribetePage() {
  return (
    <main>
      <header className="theater-dark fixed inset-x-0 top-0 z-40">
        <div className="section-shell grid h-[120px] grid-cols-3 items-center">
          <div />

          <Link href="/" className="flex justify-center">
            <div className="flex items-center gap-2.5">
              <Image
                src={BRANDING.pioIcon}
                alt="Pio Deportes"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <Image
                src={BRANDING.pioLogoWhite}
                alt="Pio Deportes"
                width={130}
                height={26}
                className="hidden h-6 w-auto object-contain sm:block"
              />
            </div>
          </Link>

          <div className="flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/80 transition hover:border-white/50 hover:text-white"
            >
              <span className="text-sm">←</span>
              Regresar
            </Link>
          </div>
        </div>
      </header>

      <SuscribeteMarketing />

      <section
        id="registro"
        className="relative overflow-hidden bg-[#060d1f] py-20 sm:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(70,210,255,0.10),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(231,190,98,0.06),transparent_35%)]" />
        <div className="ambient-particles absolute inset-0 opacity-30" />
        <div className="ambient-scanlines absolute inset-0 opacity-[0.04]" />

        <div className="section-shell relative">
          <CombinedAuthForm />
        </div>
      </section>
    </main>
  );
}

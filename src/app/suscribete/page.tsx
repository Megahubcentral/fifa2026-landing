"use client";

import Link from "next/link";
import { SuscribeteMarketing } from "@/components/sections/suscribete-marketing";
import { CombinedAuthForm } from "@/components/auth/combined-auth-form";
import { BrandLogoMark } from "@/components/ui/brand-logo-mark";

export default function SuscribetePage() {
  return (
    <main>
      <div className="relative">
        <header className="theater-dark absolute inset-x-0 top-0 z-30 overflow-visible">
          <div className="section-shell relative grid h-[7.5rem] grid-cols-[1fr_auto_1fr] items-center overflow-visible sm:h-[8.5rem]">
            <div />

            <div className="relative h-full w-[10.5rem] shrink-0 justify-self-center sm:w-[12.5rem] md:w-[15rem]">
              <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                <BrandLogoMark variant="crest" showRedBackground={false} />
              </div>
            </div>

            <div className="relative z-[60] flex justify-end">
              <Link
                href="/"
                className="relative z-[60] inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-200 hover:border-white/40 hover:text-white"
              >
                <span className="text-sm">←</span>
                Regresar
              </Link>
            </div>
          </div>
        </header>

        <SuscribeteMarketing />
      </div>

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

"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060d1f] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(70,210,255,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(231,190,98,0.08),transparent_35%)]" />
      <div className="ambient-particles absolute inset-0 opacity-40" />
      <div className="ambient-scanlines absolute inset-0 opacity-[0.06]" />

      <Link href="/" className="fixed left-6 top-6 z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/30 bg-white/70 backdrop-blur-xl">
          <Image
            src={BRANDING.pioIcon}
            alt="Pio Deportes"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </div>
      </Link>

      {children}
    </div>
  );
}

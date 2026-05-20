"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useProducts } from "@/hooks/useProducts";
import { Reveal } from "@/components/ui/motion";
import { BRANDING } from "@/lib/branding";

export default function PlanesPage() {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const router = useRouter();
  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState("");

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060d1f]">
        <p className="text-sm text-white/50">Cargando...</p>
      </div>
    );
  }

  if (!authLoading && !user) {
    router.push("/suscribete");
    return null;
  }

  const handlePurchase = async (productId: number) => {
    setPurchasing(true);
    setMessage("");
    const token = localStorage.getItem("fifapp_token");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });
      const json = await res.json();
      if (json.success) {
        if (json.data.payment_url) {
          window.location.href = json.data.payment_url;
        } else {
          setMessage("¡Orden creada! Pronto podrás completar el pago para activar tu acceso.");
        }
      } else {
        setMessage(json?.data?.message || "Error al procesar la compra");
      }
    } catch {
      setMessage("Error de conexión al procesar la compra");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d1f]">
      <header className="theater-dark fixed inset-x-0 top-0 z-40 border-b border-white/15 bg-[#08142c]/90 backdrop-blur-2xl">
        <div className="section-shell flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={BRANDING.pioIcon} alt="Pio Deportes" width={28} height={28} className="h-7 w-7 object-contain" />
            <Image src={BRANDING.pioLogoWhite} alt="Pio Deportes" width={100} height={20} className="hidden h-5 w-auto object-contain sm:block" />
          </Link>
          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <Link href="/" className="transition hover:text-white">Inicio</Link>
            <Link href="/transmision" className="transition hover:text-white">Transmisión</Link>
            <Link href="/perfil" className="transition hover:text-white">Perfil</Link>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <section className="section-shell py-16">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-electric">
              Suscripción PPV
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
              Elige tu plan
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/60">
              Accede a la transmisión en vivo del FIFA World Cup 2026 sin anuncios.
              Selecciona tu plan y empieza a disfrutar.
            </p>
          </Reveal>

          <div className="mt-12">
            {productsLoading ? (
              <div className="mx-auto max-w-sm">
                <div className="h-80 animate-pulse rounded-3xl bg-white/5" />
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-white/40">No hay planes disponibles por ahora.</p>
            ) : (
              <div className="mx-auto flex max-w-sm flex-col gap-6">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="theater-dark glass-heavy relative overflow-hidden rounded-3xl border border-electric/20 p-8 shadow-[0_0_40px_rgba(70,210,255,0.08)]"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/10 blur-[60px]" />

                    <div className="relative">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{product.access.days} días de acceso</p>
                      <h2 className="mt-2 text-2xl font-semibold">{product.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{product.short_description}</p>

                      <div className="my-6 border-t border-white/10" />

                      <p className="text-4xl font-bold">
                        {product.currency === "DOP" ? "RD$" : "$"}
                        {product.price.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {product.currency === "DOP" ? "Pesos Dominicanos" : "USD"} — Pago único
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={purchasing}
                        onClick={() => handlePurchase(product.id)}
                        className="mt-6 w-full rounded-full bg-electric py-3 text-sm font-semibold text-midnight transition hover:brightness-110 disabled:opacity-50"
                      >
                        {purchasing ? "Procesando..." : "Comprar ahora"}
                      </motion.button>

                      {message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-center text-xs text-white/50"
                        >
                          {message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

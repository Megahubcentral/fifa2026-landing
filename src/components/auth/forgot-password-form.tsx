"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authApi } from "@/lib/auth-api";
import { Reveal } from "@/components/ui/motion";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await authApi.forgotPassword({ email });
      const msg =
        res?.data?.message ||
        "Si el email existe, recibirás un enlace para restablecer tu contraseña.";
      setSuccess(msg);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al procesar la solicitud";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-md rounded-3xl p-8 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">
            Recuperar contraseña
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa tu email y te enviaremos instrucciones
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700"
          >
            {success}
          </motion.div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={loading}
          type="submit"
          className="mt-8 w-full rounded-full bg-electric py-3 text-sm font-semibold text-midnight transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar instrucciones"}
        </motion.button>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            href="/iniciar-sesion"
            className="font-semibold text-electric transition hover:brightness-110"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </form>
    </Reveal>
  );
}

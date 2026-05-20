"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Reveal } from "@/components/ui/motion";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
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
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Accede a tu cuenta FIFApp
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

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
              placeholder="••••••••"
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
          {loading ? "Ingresando..." : "Ingresar"}
        </motion.button>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-slate-500">
          <Link
            href="/recuperar-contrasena"
            className="transition hover:text-electric"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <p>
            ¿No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-electric transition hover:brightness-110"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </Reveal>
  );
}

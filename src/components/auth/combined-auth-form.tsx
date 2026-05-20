"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Reveal } from "@/components/ui/motion";

export function CombinedAuthForm() {
  const { register, login } = useAuth();

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegLoading(true);
    try {
      await register({ email: regEmail, password: regPassword, first_name: regFirstName, last_name: regLastName });
    } catch (err: unknown) {
      setRegError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setRegLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-5xl">
      <Reveal>
        <h2 className="mb-2 text-center text-4xl font-semibold tracking-[-0.02em]">
          Comienza ahora
        </h2>
        <p className="mb-12 text-center text-white/60">
          Crea tu cuenta o inicia sesión para acceder al PPV exclusivo
        </p>
      </Reveal>

      <div className="relative grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Register */}
        <Reveal delay={0.05} className="relative">
          <div className="glass rounded-3xl p-7 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-slate-900">
              Crear cuenta
            </h3>

            {regError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
              >
                {regError}
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Nombre</label>
                  <input
                    type="text"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Apellido</label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                    placeholder="Pérez"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Contraseña</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={8}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={regLoading}
                type="submit"
                className="w-full rounded-full bg-electric py-2.5 text-sm font-semibold text-midnight transition hover:brightness-110 disabled:opacity-50"
              >
                {regLoading ? "Creando cuenta..." : "Crear cuenta y suscribirme"}
              </motion.button>
            </form>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
          <div className="h-full w-px bg-gradient-to-b from-transparent via-slate-300/50 to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
            o
          </span>
        </div>

        {/* Login */}
        <Reveal delay={0.1} className="relative">
          <div className="glass rounded-3xl p-7 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-slate-900">
              Iniciar sesión
            </h3>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700"
              >
                {loginError}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-600">Contraseña</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loginLoading}
                type="submit"
                className="w-full rounded-full bg-electric py-2.5 text-sm font-semibold text-midnight transition hover:brightness-110 disabled:opacity-50"
              >
                {loginLoading ? "Ingresando..." : "Iniciar sesión"}
              </motion.button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              <a
                href="/recuperar-contrasena"
                className="text-electric transition hover:brightness-110"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

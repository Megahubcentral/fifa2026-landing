"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { authApi } from "@/lib/auth-api";
import { Reveal } from "@/components/ui/motion";

export function ProfileForm() {
  const { user, logout, refreshProfile } = useAuth();

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const data: Record<string, string> = {};
      if (firstName !== user?.first_name) data.first_name = firstName;
      if (lastName !== user?.last_name) data.last_name = lastName;
      if (displayName !== user?.display_name) data.display_name = displayName;
      if (password) data.password = password;

      if (Object.keys(data).length === 0) {
        setSuccess("No hay cambios que guardar");
        return;
      }

      await authApi.updateProfile(data);
      await refreshProfile();
      setSuccess("Perfil actualizado correctamente");
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al actualizar perfil";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-lg rounded-3xl p-8 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">
            Mi perfil
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Administra tu cuenta FIFApp
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
              value={user?.email || ""}
              disabled
              className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
                Nombre
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
                Apellido
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
              Nombre público
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
            />
          </div>

          <hr className="border-slate-200" />
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Cambiar contraseña (opcional)
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-600">
                Confirmar
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/20"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={loading}
          type="submit"
          className="mt-8 w-full rounded-full bg-electric py-3 text-sm font-semibold text-midnight transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </motion.button>

        <button
          type="button"
          onClick={logout}
          className="mt-4 w-full rounded-full border border-slate-200 bg-white py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
        >
          Cerrar sesión
        </button>
      </form>
    </Reveal>
  );
}

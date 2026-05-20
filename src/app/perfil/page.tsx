"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ProfileForm } from "@/components/auth/profile-form";

export default function PerfilPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/iniciar-sesion");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="text-sm text-white/50">Cargando...</div>
      </AuthLayout>
    );
  }

  if (!user) return null;

  return (
    <AuthLayout>
      <ProfileForm />
    </AuthLayout>
  );
}

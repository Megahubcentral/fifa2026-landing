"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/auth-api";
import type { AuthUser, LoginCredentials, RegisterCredentials } from "@/lib/auth-types";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("fifapp_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await authApi.getProfile();
      if (res.success) {
        setUser(res.data as AuthUser);
      } else {
        localStorage.removeItem("fifapp_token");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("fifapp_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    const res = await authApi.login(credentials);
    if (res.success && res.data.token) {
      localStorage.setItem("fifapp_token", res.data.token);
      setUser(res.data as AuthUser);
      router.push("/perfil");
    }
  };

  const register = async (data: RegisterCredentials) => {
    const res = await authApi.register(data);
    if (res.success && res.data.token) {
      localStorage.setItem("fifapp_token", res.data.token);
      setUser(res.data as AuthUser);
      router.push("/planes");
    }
  };

  const logout = () => {
    localStorage.removeItem("fifapp_token");
    setUser(null);
    router.push("/iniciar-sesion");
  };

  const refreshProfile = async () => {
    const res = await authApi.getProfile();
    if (res.success) {
      setUser(res.data as AuthUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

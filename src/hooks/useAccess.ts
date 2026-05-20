"use client";

import { useCallback, useEffect, useState } from "react";
import type { AccessResponse } from "@/lib/purchase-types";

type AccessState = {
  hasAccess: boolean;
  loading: boolean;
  error?: string;
};

export function useAccess(productId: number) {
  const [state, setState] = useState<AccessState>({ hasAccess: false, loading: true });

  const check = useCallback(async () => {
    const token = localStorage.getItem("fifapp_token");
    if (!token) {
      setState({ hasAccess: false, loading: false });
      return;
    }

    setState((s) => ({ ...s, loading: true }));
    try {
      const res = await fetch(`/api/access/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json: AccessResponse = await res.json();
      setState({ hasAccess: json?.data?.has_access ?? false, loading: false });
    } catch {
      setState({ hasAccess: false, loading: false, error: "Error al verificar acceso" });
    }
  }, [productId]);

  useEffect(() => { check(); }, [check]);

  return { ...state, check };
}

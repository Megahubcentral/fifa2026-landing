import { apiFetch } from "./api-client";
import type { AccessResponse, PurchaseResponse } from "./purchase-types";

const API_BASE = process.env.NEXT_PUBLIC_WP_API_URL || "";

export async function fetchProductsServer() {
  const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Error al obtener productos");
  const json = await res.json();
  return json?.data ?? [];
}

export const purchaseApi = {
  create: (productId: number) =>
    apiFetch<PurchaseResponse>("/purchase", {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
    }),

  checkAccess: (productId: number) =>
    apiFetch<AccessResponse>(`/access/${productId}`),
};

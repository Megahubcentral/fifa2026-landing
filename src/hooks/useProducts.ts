"use client";

import { useEffect, useState } from "react";
import type { PPVProduct } from "@/lib/purchase-types";

export function useProducts() {
  const [products, setProducts] = useState<PPVProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (active && Array.isArray(data)) setProducts(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return { products, loading };
}

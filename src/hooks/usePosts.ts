"use client";

import { useEffect, useState } from "react";
import type { PostItem } from "@/lib/posts-types";

export function usePosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { posts, loading };
}

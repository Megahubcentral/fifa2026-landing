import { NextResponse } from "next/server";
import type { PostItem } from "@/lib/posts-types";

function wpToPost(raw: any): PostItem | null {
  const title = raw.title?.rendered || raw.title;
  if (!title) return null;
  return {
    id: String(raw.id || title.slice(0, 20)),
    title,
    category: raw.categories?.[0]?.name || raw.category || "Noticias",
    image: raw.image || raw.featured_image || raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    excerpt: raw.excerpt?.rendered || raw.excerpt || "",
    date: raw.date || "",
    source: "wordpress" as const,
  };
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  let wpPosts: PostItem[] = [];

  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/posts?tag=fifa-2026`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const json = await res.json();
        const raw = json?.data?.posts ?? json?.data ?? json;
        if (Array.isArray(raw)) {
          wpPosts = raw.map(wpToPost).filter(Boolean) as PostItem[];
        }
      }
    } catch {}
  }

  return NextResponse.json(wpPosts);
}

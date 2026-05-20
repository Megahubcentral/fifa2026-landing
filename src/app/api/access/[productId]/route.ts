import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) {
    return NextResponse.json({ success: false, data: { has_access: false } }, { status: 503 });
  }

  const auth = _request.headers.get("authorization");

  try {
    const { productId } = await params;
    const res = await fetch(`${baseUrl}/access/${productId}`, {
      headers: {
        ...(auth ? { Authorization: auth } : {}),
      },
    });

    const json = await res.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ success: false, data: { has_access: false, product_id: Number((await params).productId) } });
  }
}

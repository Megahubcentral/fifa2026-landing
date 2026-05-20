import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!baseUrl) {
    return NextResponse.json({ success: false, data: { message: "API no configurada" } }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ success: false, data: { message: "Se requiere autenticación" } }, { status: 401 });
  }

  try {
    const body = await request.json();
    const res = await fetch(`${baseUrl}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, data: { message: "Error al procesar la compra" } }, { status: 500 });
  }
}

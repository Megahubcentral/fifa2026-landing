import { NextResponse } from "next/server";
import { fetchProductsServer } from "@/lib/purchase-api";

export async function GET() {
  try {
    const products = await fetchProductsServer();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 503 });
  }
}

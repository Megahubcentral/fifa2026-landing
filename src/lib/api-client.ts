const API_BASE = process.env.NEXT_PUBLIC_WP_API_URL || "";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "unknown_error", status = 500) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("fifapp_token")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers as Record<string, string>),
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    let message = "Error de conexión";
    let code = "unknown_error";
    try {
      const error = await res.json();
      message = error?.data?.message || error?.message || message;
      code = error?.code || code;
    } catch {}
    throw new ApiError(message, code, res.status);
  }

  return res.json();
}

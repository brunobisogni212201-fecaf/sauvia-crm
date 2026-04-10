import { getStoredToken } from "./cognito";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  /** Pass a token manually — if omitted, the SecureStore token is used. */
  token?: string;
  /** Set to true to skip auto-injecting the JWT. */
  skipAuth?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, skipAuth, headers, ...rest } = options;

  // Auto-inject JWT from SecureStore when no explicit token is provided
  let bearerToken = token;
  if (!bearerToken && !skipAuth) {
    bearerToken = (await getStoredToken()) ?? undefined;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      ...(headers as Record<string, string>),
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};

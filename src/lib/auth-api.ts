import { apiFetch } from "./api-client";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UpdateProfileData,
  ForgotPasswordData,
} from "./auth-types";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterCredentials) =>
    apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfile: () => apiFetch<AuthResponse>("/auth/me"),

  updateProfile: (data: UpdateProfileData) =>
    apiFetch<AuthResponse>("/auth/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: ForgotPasswordData) =>
    apiFetch<AuthResponse>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

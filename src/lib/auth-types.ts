export type AuthUser = {
  user_id: number;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  registered_at?: string;
};

export type AuthResponse = {
  success: boolean;
  data: AuthUser & { token?: string; message?: string };
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  password?: string;
};

export type ForgotPasswordData = {
  email: string;
};

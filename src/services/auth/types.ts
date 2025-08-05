export interface AuthUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

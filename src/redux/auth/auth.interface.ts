export interface ApiMessage {
  message: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string | null;
  firstname: string;
  lastname: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface UpdateProfilePayload {
  firstname?: string;
  lastname?: string;
  email?: string;
}

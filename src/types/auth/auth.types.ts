export interface IUser {
  id: string;
  email: string;
  mobileNumber: string;
  fullName: string;
  superCategory: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
}

export type IAuthResponse = AuthResponse;

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SendOtpPayload {
  email?: string;
  mobileNumber?: string;
  fullName?: string;
}

export interface VerifyOtpPayload {
  email?: string;
  mobileNumber?: string;
  otp: string;
}

export interface ResendOtpPayload {
  email?: string;
  mobileNumber?: string;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Legacy payload formats if still needed by some modules
export interface ISignupPayload {
  fullName: string;
  email: string;
  mobileNumber: string;
}

export interface ILoginPayload {
  emailOrMobile: string;
}

export interface IVerifyOtpPayload {
  otpRequestId: string;
  otp: string;
}

export interface IOtpResponse {
  otpRequestId: string;
  expiresAt: string;
}

export interface IUser {
  id: string;
  email: string;
  mobileNumber: string;
  fullName: string;
  superCategory: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

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

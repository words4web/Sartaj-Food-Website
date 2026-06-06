import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import {
  IUser,
  SendOtpPayload,
  VerifyOtpPayload,
  ResendOtpPayload,
  AuthResponse,
  SuccessResponse,
} from "@/types/auth/auth.types";

export const authService = {
  login: async (payload: SendOtpPayload): Promise<AxiosResponse<SuccessResponse>> => {
    return axiosInstance.post(API_ROUTES.AUTH.LOGIN, payload);
  },

  signup: async (payload: SendOtpPayload): Promise<AxiosResponse<SuccessResponse>> => {
    return axiosInstance.post(API_ROUTES.AUTH.SIGNUP, payload);
  },

  verifyOtp: async (
    payload: VerifyOtpPayload,
  ): Promise<AxiosResponse<{ success: boolean; message?: string; data: AuthResponse }>> => {
    return axiosInstance.post(API_ROUTES.AUTH.VERIFY_OTP, payload);
  },

  resendOtp: async (payload: ResendOtpPayload): Promise<AxiosResponse<SuccessResponse>> => {
    return axiosInstance.post(API_ROUTES.AUTH.RESEND_OTP, payload);
  },

  logout: async (): Promise<AxiosResponse<SuccessResponse>> => {
    return axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
  },

  getProfile: async (): Promise<AxiosResponse<{ success: boolean; data: { user: IUser } }>> => {
    return axiosInstance.get(API_ROUTES.AUTH.GET_PROFILE);
  },
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { useDispatch } from "react-redux";
import { setAuthUser, updateAuthUser } from "@/lib/store/authSlice";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  parseEmailOrPhone,
  getAuthIdentifierPayload,
  formatSignupPayload,
  SignupInput,
  getLocalizedError,
} from "@/utils/auth/auth.utils";

export const useLogin = () => {
  const t = useTranslations("auth");
  return useMutation({
    mutationFn: (emailOrPhone: string) => {
      const payload = parseEmailOrPhone(emailOrPhone);
      return authService.login(payload);
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message || t("otpSentSuccess"));
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(getLocalizedError(apiMsg, t) || t("failedToSendOtpTryAgain"));
    },
  });
};

export const useSignup = () => {
  const t = useTranslations("auth");
  return useMutation({
    mutationFn: (data: SignupInput) => {
      const payload = formatSignupPayload(data);
      return authService.signup(payload);
    },
    onSuccess: (response) => {
      toast.success(response.data?.message || t("otpSentSuccess"));
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(getLocalizedError(apiMsg, t) || t("failedToSendOtpTryAgain"));
    },
  });
};

export const useVerifyOtp = () => {
  const t = useTranslations("auth");
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: { isLogin: boolean; emailOrPhone: string; email: string; otp: string }) => {
      const identifierPayload = getAuthIdentifierPayload(
        data?.isLogin,
        data?.emailOrPhone,
        data?.email,
      );
      const payload = {
        ...identifierPayload,
        otp: data.otp,
      };
      return authService.verifyOtp(payload);
    },
    onSuccess: (response) => {
      toast.success(t("loginSuccess"));
      const { user, accessToken } = response?.data?.data;
      dispatch(setAuthUser({ user, accessToken }));

      setTimeout(() => {
        window.location.href = ROUTES.HOME;
      }, 150);
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(getLocalizedError(apiMsg, t) || t("invalidOtp"));
    },
  });
};

export const useResendOtp = () => {
  const t = useTranslations("auth");
  return useMutation({
    mutationFn: (data: { isLogin: boolean; emailOrPhone: string; email: string }) => {
      const payload = getAuthIdentifierPayload(data?.isLogin, data?.emailOrPhone, data?.email);
      return authService.resendOtp(payload);
    },
    onSuccess: (response) => {
      toast.success(response.data?.message || t("otpResentSuccess"));
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(getLocalizedError(apiMsg, t) || t("failedToResendOtpTryAgain"));
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("Logged out successfully");
    },
  });
};

export const useGetProfile = (isAuthenticated: boolean) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await authService.getProfile();
      const user = response?.data?.data?.user;
      if (user) {
        dispatch(updateAuthUser(user));
      }
      return user;
    },
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: true,
  });
};

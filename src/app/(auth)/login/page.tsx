"use client";

import { useState, useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import { Typography } from "@/components/common";
import {
  AuthHero,
  AuthHeader,
  AuthFooter,
  AuthIdentifierForm,
  AuthOtpForm,
} from "@/components/auth";
import { axiosInstance } from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/lib/store/authSlice";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function AuthPage() {
  const dispatch = useDispatch();
  const t = useTranslations("auth");

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "", // Used for Login
    email: "", // Used for Sign Up
    mobileNumber: "", // Used for Sign Up
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Check URL query parameters to switch active tab to signup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "signup") {
        setIsLogin(false);
      }
    }
  }, []);

  // Real-time countdown timer for resend OTP (handles tab suspension/backgrounding)
  useEffect(() => {
    if (!timerEndTime) {
      setResendTimer(0);
      return;
    }

    const calculateTimeLeft = () => {
      const difference = timerEndTime - Date.now();
      const secondsLeft = Math.max(0, Math.ceil(difference / 1000));
      setResendTimer(secondsLeft);
      if (secondsLeft <= 0) {
        setTimerEndTime(null);
      }
    };

    calculateTimeLeft(); // Initial run
    const interval = setInterval(calculateTimeLeft, 250);

    return () => clearInterval(interval);
  }, [timerEndTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload: {
      email?: string;
      mobileNumber?: string;
      fullName?: string;
    } = {};

    if (isLogin) {
      if (!formData.emailOrPhone) {
        setError(t("emailOrPhoneRequired"));
        setLoading(false);
        return;
      }

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
      if (isEmail) {
        payload.email = formData.emailOrPhone.trim().toLowerCase();
      } else {
        payload.mobileNumber = formData.emailOrPhone.trim();
      }
    } else {
      if (!formData.name || !formData.email || !formData.mobileNumber) {
        setError(t("fillAllFields"));
        setLoading(false);
        return;
      }
      payload.fullName = formData.name.trim();
      payload.email = formData.email.trim().toLowerCase();
      payload.mobileNumber = formData.mobileNumber.trim();
    }

    try {
      const endpoint = isLogin ? API_ROUTES.AUTH.LOGIN : API_ROUTES.AUTH.SIGNUP;
      const response = await axiosInstance.post(endpoint, payload);

      if (response.data?.success) {
        toast.success(response.data?.message || t("otpSentSuccess"));
        setStep("otp");
        setOtpSent(true);
        setTimerEndTime(Date.now() + 60 * 1000);
      } else {
        setError(response.data?.message || t("failedToSendOtp"));
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || t("failedToSendOtpTryAgain");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.otp || formData.otp.length !== 6) {
      setError(t("otpLengthError"));
      setLoading(false);
      return;
    }

    const payload: { email?: string; mobileNumber?: string; otp: string } = {
      otp: formData.otp,
    };

    if (isLogin) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
      if (isEmail) {
        payload.email = formData.emailOrPhone.trim().toLowerCase();
      } else {
        payload.mobileNumber = formData.emailOrPhone.trim();
      }
    } else {
      payload.email = formData.email.trim().toLowerCase();
    }

    try {
      const response = await axiosInstance.post(API_ROUTES.AUTH.VERIFY_OTP, payload);

      if (response.data?.success) {
        const { user, accessToken, refreshToken } = response.data.data;
        dispatch(setAuthUser({ user, accessToken, refreshToken }));
        toast.success(t("loginSuccess"));

        setTimeout(() => {
          window.location.href = ROUTES.HOME;
        }, 150);
      } else {
        setError(response.data?.message || t("verificationFailed"));
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || t("invalidOtp");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError("");

    const payload: { email?: string; mobileNumber?: string } = {};

    if (isLogin) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
      if (isEmail) {
        payload.email = formData.emailOrPhone.trim().toLowerCase();
      } else {
        payload.mobileNumber = formData.emailOrPhone.trim();
      }
    } else {
      payload.email = formData.email.trim().toLowerCase();
    }

    try {
      const response = await axiosInstance.post(API_ROUTES.AUTH.RESEND_OTP, payload);

      if (response.data?.success) {
        toast.success(t("otpResentSuccess"));
        setTimerEndTime(Date.now() + 60 * 1000);
      } else {
        setError(response.data?.message || t("failedToResendOtp"));
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || t("failedToResendOtpTryAgain");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newIsLogin: boolean) => {
    setIsLogin(newIsLogin);
    setStep("email");
    setFormData({
      name: "",
      emailOrPhone: "",
      email: "",
      mobileNumber: "",
      otp: "",
    });
    setError("");
    setOtpSent(false);
    setTimerEndTime(null);
    setResendTimer(0);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background overflow-hidden relative">
      {/* LEFT SIDE: Extracted Branded Premium Hero Component */}
      <AuthHero />

      {/* RIGHT SIDE: Interactive Auth Form Panel */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-12 bg-background min-h-screen relative z-10 transition-colors duration-300">
        {/* Top bar with Selectors & Mobile Logo */}
        <AuthHeader />

        {/* Main centered form panel */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Titles depending on current stage */}
            <div className="space-y-2 text-center lg:text-left">
              <Typography
                variant="h2"
                className="text-3xl font-bold tracking-tight text-foreground"
              >
                {step === "email"
                  ? isLogin
                    ? t("welcomeBack")
                    : t("createAccount")
                  : t("verifyOtp")}
              </Typography>
              <Typography variant="muted" className="text-muted-foreground text-sm">
                {step === "email"
                  ? isLogin
                    ? t("loginSubtitle")
                    : t("signupSubtitle")
                  : t("enterOtpTo", {
                      identifier: isLogin ? formData.emailOrPhone : formData.email,
                    })}
              </Typography>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                {error}
              </div>
            )}

            {/* Render appropriate sub-form stage */}
            {step === "email" ? (
              <AuthIdentifierForm
                isLogin={isLogin}
                formData={formData}
                loading={loading}
                onChange={handleChange}
                onSubmit={handleSendOTP}
                onTabChange={handleTabChange}
              />
            ) : (
              <AuthOtpForm
                otp={formData.otp}
                loading={loading}
                resendTimer={resendTimer}
                onOtpChange={(val) => setFormData((prev) => ({ ...prev, otp: val }))}
                onSubmit={handleVerifyOTP}
                onResend={handleResendOTP}
                onBack={() => setStep("email")}
              />
            )}
          </div>
        </div>

        {/* Footer info links */}
        <AuthFooter />
      </div>
    </div>
  );
}

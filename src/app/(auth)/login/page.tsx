"use client";

import { Typography } from "@/components/common";
import {
  AuthHero,
  AuthHeader,
  AuthFooter,
  AuthIdentifierForm,
  AuthOtpForm,
} from "@/components/auth";
import { useTranslations } from "next-intl";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { isErrorKey } from "@/utils/auth/auth.utils";

export default function AuthPage() {
  const t = useTranslations("auth");
  const {
    isLogin,
    step,
    formData,
    error,
    loading,
    resendTimer,
    handleChange,
    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
    handleTabChange,
    setOtp,
    setStepEmail,
  } = useAuthFlow();

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
                {isErrorKey(error) ? t(error as any) : error}
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
                onOtpChange={setOtp}
                onSubmit={handleVerifyOTP}
                onResend={handleResendOTP}
                onBack={setStepEmail}
              />
            )}
          </div>
        </div>

        <AuthFooter />
      </div>
    </div>
  );
}

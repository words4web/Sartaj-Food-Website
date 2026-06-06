"use client";

import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface AuthOtpFormProps {
  otp: string;
  loading: boolean;
  resendTimer: number;
  onOtpChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
}

export function AuthOtpForm({
  otp,
  loading,
  resendTimer,
  onOtpChange,
  onSubmit,
  onResend,
  onBack,
}: AuthOtpFormProps) {
  const t = useTranslations("auth");

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      <div className="space-y-2">
        <label
          htmlFor="otp"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {t("enterVerificationCode")}
        </label>
        <div className="relative group max-w-xs mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type="text"
            id="otp"
            name="otp"
            required
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              onOtpChange(value);
            }}
            maxLength={6}
            className="w-full pl-11 pr-4 py-3.5 border border-border rounded-xl bg-card text-foreground text-center text-2xl font-bold tracking-[0.4em] focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none shadow-sm"
            placeholder="000000"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full h-12 rounded-xl text-base font-semibold shadow-md"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              <span>{t("verifying")}</span>
            </>
          ) : (
            t("verifyAndContinue")
          )}
        </span>
      </Button>

      {/* Resend Action */}
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={onResend}
          disabled={resendTimer > 0 || loading}
          className="text-sm font-semibold transition-all"
        >
          {resendTimer > 0 ? t("resendIn", { seconds: resendTimer }) : t("resendOtpCode")}
        </Button>
      </div>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors duration-200 border border-transparent hover:border-border/50 rounded-xl"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t("changeContactInfo")}</span>
      </button>
    </form>
  );
}

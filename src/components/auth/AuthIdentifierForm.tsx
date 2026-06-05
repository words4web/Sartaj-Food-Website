"use client";

import { Button } from "@/components/ui/button";
import { Mail, User, Phone, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface AuthIdentifierFormProps {
  isLogin: boolean;
  formData: {
    name: string;
    emailOrPhone: string;
    email: string;
    mobileNumber: string;
  };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTabChange: (newIsLogin: boolean) => void;
}

export function AuthIdentifierForm({
  isLogin,
  formData,
  loading,
  onChange,
  onSubmit,
  onTabChange,
}: AuthIdentifierFormProps) {
  const t = useTranslations("auth");

  // Detect if the user input looks like a phone number to show appropriate icon
  const isPhone = /^[+0-9\s\-()]{4,}$/.test(formData.emailOrPhone);
  const InputIcon = isPhone ? Phone : Mail;

  return (
    <div className="space-y-6">
      {/* Pills-shaped Tab Switcher */}
      <div className="grid grid-cols-2 bg-muted/60 p-1 rounded-xl border border-border/50 shadow-inner">
        <button
          type="button"
          onClick={() => onTabChange(true)}
          className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
            isLogin
              ? "bg-card text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-card/20"
          }`}
        >
          {t("login")}
        </button>
        <button
          type="button"
          onClick={() => onTabChange(false)}
          className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
            !isLogin
              ? "bg-card text-foreground shadow-sm font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-card/20"
          }`}
        >
          {t("signup")}
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {isLogin ? (
          /* Login Step: Email or Phone */
          <div className="space-y-2">
            <label
              htmlFor="emailOrPhone"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t("emailOrPhone")}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                <InputIcon className="h-5 w-5 transition-all duration-300" />
              </div>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                required
                value={formData.emailOrPhone}
                onChange={onChange}
                className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none shadow-sm"
                placeholder={t("emailOrPhonePlaceholder")}
              />
            </div>
          </div>
        ) : (
          /* Sign Up Step: Full Name, Email, and Mobile Number */
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Full Name field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {t("fullName")}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={onChange}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none shadow-sm"
                  placeholder={t("fullNamePlaceholder")}
                />
              </div>
            </div>

            {/* Email address field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {t("email")}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={onChange}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none shadow-sm"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            {/* Mobile number field */}
            <div className="space-y-2">
              <label
                htmlFor="mobileNumber"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {t("mobileNumber")}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  required
                  value={formData.mobileNumber}
                  onChange={onChange}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground/50 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none shadow-sm"
                  placeholder={t("mobilePlaceholder")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl text-base font-semibold shadow-md relative overflow-hidden group"
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>{t("sendingOtp")}</span>
              </>
            ) : (
              <>
                <span>{t("sendOtp")}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { loginSchema, signupSchema, otpSchema } from "@/schemas/auth/auth.schema";
import { useLogin, useSignup, useVerifyOtp, useResendOtp } from "@/services/auth/auth.hooks";
import { getLocalizedErrorKey } from "@/utils/auth/auth.utils";
import { useLocale } from "next-intl";

export function useAuthFlow() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();
  const locale = useLocale();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    email: "",
    mobileNumber: "+81 ",
    otp: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const loading =
    loginMutation.isPending ||
    signupMutation.isPending ||
    verifyOtpMutation.isPending ||
    resendOtpMutation.isPending;

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

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 250);

    return () => clearInterval(interval);
  }, [timerEndTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "mobileNumber") {
      const cleanValue = newValue.replace(/[\s\-()]/g, "");
      if (cleanValue !== "") {
        let rest = cleanValue;
        if (cleanValue.startsWith("+81")) {
          rest = cleanValue.slice(3);
        } else if (cleanValue.startsWith("81") && cleanValue.length > 2) {
          rest = cleanValue.slice(2);
        } else if (cleanValue.startsWith("0")) {
          rest = cleanValue.slice(1);
        }
        newValue = "+81 " + rest.replace(/[^\d]/g, "");
      } else {
        newValue = "+81 ";
      }
    } else if (name === "emailOrPhone") {
      const cleanValue = newValue.replace(/[\s\-()]/g, "");
      const looksLikePhone = /^[+\d]+$/.test(cleanValue);
      if (looksLikePhone && newValue !== "") {
        let rest = cleanValue;
        if (cleanValue.startsWith("+81")) {
          rest = cleanValue.slice(3);
        } else if (cleanValue.startsWith("81") && cleanValue.length > 2) {
          rest = cleanValue.slice(2);
        } else if (cleanValue.startsWith("0")) {
          rest = cleanValue.slice(1);
        }

        rest = rest.replace(/[^\d]/g, "");
        if (rest === "") {
          newValue = "";
        } else {
          newValue = "+81 " + rest;
        }
      } else if (newValue.startsWith("+81 ")) {
        newValue = newValue.slice(4);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError("");
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const validation = loginSchema.safeParse({
        emailOrPhone: formData.emailOrPhone,
      });
      if (!validation.success) {
        setError(validation.error.errors[0].message);
        return;
      }

      loginMutation.mutate(formData.emailOrPhone, {
        onSuccess: () => {
          setStep("otp");
          setOtpSent(true);
          setTimerEndTime(Date.now() + 60 * 1000);
        },
        onError: (err: any) => {
          const apiMsg = err?.response?.data?.message || err?.message;
          setError(getLocalizedErrorKey(apiMsg) || "failedToSendOtpTryAgain");
        },
      });
    } else {
      const validation = signupSchema.safeParse({
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
      });
      if (!validation.success) {
        setError(validation.error.errors[0].message);
        return;
      }

      signupMutation.mutate(
        {
          name: formData.name,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
        },
        {
          onSuccess: () => {
            setStep("otp");
            setOtpSent(true);
            setTimerEndTime(Date.now() + 60 * 1000);
          },
          onError: (err: any) => {
            const apiMsg = err?.response?.data?.message || err?.message;
            setError(getLocalizedErrorKey(apiMsg) || "failedToSendOtpTryAgain");
          },
        },
      );
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = otpSchema.safeParse({ otp: formData.otp });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    let deviceInfo = null;
    try {
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const { getFirebaseMessaging } = await import("@/lib/firebase");
        const { getToken } = await import("firebase/messaging");
        const messaging = await getFirebaseMessaging();
        if (messaging) {
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          await navigator.serviceWorker.ready;
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });
          if (token) {
            deviceInfo = {
              fcmToken: token,
              platform: "web",
              language: locale,
              OSVersion: navigator.userAgent,
            };
          }
        }
      }
    } catch (err) {
      console.error("Failed to retrieve FCM token during login:", err);
    }

    verifyOtpMutation.mutate(
      {
        isLogin,
        emailOrPhone: formData.emailOrPhone,
        email: formData.email,
        otp: formData.otp,
        deviceInfo,
      },
      {
        onError: (err: any) => {
          const apiMsg = err?.response?.data?.message || err?.message;
          setError(getLocalizedErrorKey(apiMsg) || "invalidOtp");
        },
      },
    );
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    setError("");
    setFormData((prev) => ({ ...prev, otp: "" }));

    resendOtpMutation.mutate(
      {
        isLogin,
        emailOrPhone: formData.emailOrPhone,
        email: formData.email,
      },
      {
        onSuccess: () => {
          setTimerEndTime(Date.now() + 60 * 1000);
        },
        onError: (err: any) => {
          const apiMsg = err?.response?.data?.message || err?.message;
          setError(getLocalizedErrorKey(apiMsg) || "failedToResendOtpTryAgain");
        },
      },
    );
  };

  const handleTabChange = (newIsLogin: boolean) => {
    setIsLogin(newIsLogin);
    setStep("email");
    setFormData({
      name: "",
      emailOrPhone: "",
      email: "",
      mobileNumber: "+81 ",
      otp: "",
    });
    setError("");
    setOtpSent(false);
    setTimerEndTime(null);
    setResendTimer(0);
  };

  const setOtp = (otp: string) => {
    setFormData((prev) => ({ ...prev, otp }));
  };

  const setStepEmail = () => {
    setStep("email");
    setFormData((prev) => ({ ...prev, otp: "" }));
  };

  return {
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
  };
}

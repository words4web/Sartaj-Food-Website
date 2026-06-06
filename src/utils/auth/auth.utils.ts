import { EMAIL_REGEX } from "@/constants/validation";

export function parseEmailOrPhone(input: string): { email?: string; mobileNumber?: string } {
  const trimmed = input?.trim();
  const isEmail = EMAIL_REGEX.test(trimmed);
  if (isEmail) {
    return { email: trimmed?.toLowerCase() };
  } else {
    return { mobileNumber: trimmed.replace(/\s/g, "") };
  }
}

export function getAuthIdentifierPayload(
  isLogin: boolean,
  emailOrPhone?: string,
  email?: string,
): { email?: string; mobileNumber?: string } {
  if (isLogin) {
    if (!emailOrPhone) return {};
    return parseEmailOrPhone(emailOrPhone);
  } else {
    if (!email) return {};
    return { email: email?.trim()?.toLowerCase() };
  }
}

export interface SignupInput {
  name: string;
  email: string;
  mobileNumber: string;
}

export function formatSignupPayload(data: SignupInput) {
  return {
    fullName: data?.name?.trim(),
    email: data?.email?.trim()?.toLowerCase(),
    mobileNumber: data?.mobileNumber?.trim()?.replace(/\s/g, ""),
  };
}

export const KNOWN_ERROR_KEYS = [
  "emailOrPhoneRequired",
  "invalidEmailOrPhone",
  "nameRequired",
  "nameMinLength",
  "emailRequired",
  "invalidEmail",
  "phoneRequired",
  "invalidPhone",
  "otpRequired",
  "otpNumbersOnly",
  "otpLengthError",
  "invalidOtp",
  "otpExpired",
  "customerExists",
  "customerNotFound",
  "noCustomerFound",
  "failedToSendOtp",
  "failedToSendOtpTryAgain",
  "failedToResendOtpTryAgain",
  "postalCodeRequired",
  "invalidPostalCode",
  "prefectureRequired",
  "invalidPrefecture",
  "cityRequired",
  "streetAddressRequired",
] as const;

export function isErrorKey(key: string): boolean {
  return KNOWN_ERROR_KEYS.includes(key as any);
}

export function getLocalizedErrorKey(message: string): string {
  if (!message) return "";

  const msg = message.toLowerCase();

  if (
    msg.includes("invalid japan phone number format") ||
    msg.includes("invalid japan mobile number")
  ) {
    return "invalidPhone";
  }
  if (msg.includes("otp must be exactly 6 digits")) {
    return "otpLengthError";
  }
  if (msg.includes("otp is required")) {
    return "otpRequired";
  }
  if (msg.includes("invalid email")) {
    return "invalidEmail";
  }
  if (msg.includes("email is required")) {
    return "emailRequired";
  }
  if (msg.includes("full name is required")) {
    return "nameRequired";
  }
  if (msg.includes("mobile number is required")) {
    return "phoneRequired";
  }
  if (
    msg.includes("provide either email or mobilenumber") ||
    msg.includes("provide either email or mobileNumber")
  ) {
    return "invalidEmailOrPhone";
  }
  if (msg.includes("invalid otp") || msg.includes("incorrect otp")) {
    return "invalidOtp";
  }
  if (msg.includes("otp expired") || msg.includes("otp not found")) {
    return "otpExpired";
  }
  if (msg.includes("already exists")) {
    return "customerExists";
  }
  if (msg.includes("customer not found or unauthorized")) {
    return "customerNotFound";
  }
  if (msg.includes("customer not found") || msg.includes("no customer found")) {
    return "noCustomerFound";
  }
  if (msg.includes("failed to send otp")) {
    return "failedToSendOtp";
  }

  return message;
}

export function getLocalizedError(message: string, t: any): string {
  const key = getLocalizedErrorKey(message);
  return isErrorKey(key) ? t(key as any) : key;
}

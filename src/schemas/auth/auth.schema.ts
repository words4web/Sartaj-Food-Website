import { z } from "zod";
import { EMAIL_REGEX, PHONE_REGEX } from "@/constants/validation";

const cleanPhone = (val: string) => val.replace(/[\s\-()]/g, "");

export const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "emailOrPhoneRequired")
    .refine(
      (val) => EMAIL_REGEX.test(val) || PHONE_REGEX.test(cleanPhone(val)),
      "invalidEmailOrPhone",
    ),
});

export const signupSchema = z.object({
  name: z.string().min(1, "nameRequired").min(2, "nameMinLength"),
  email: z.string().min(1, "emailRequired").email("invalidEmail"),
  mobileNumber: z
    .string()
    .min(1, "phoneRequired")
    .refine((val) => PHONE_REGEX.test(cleanPhone(val)), "invalidPhone"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "otpRequired")
    .length(6, "otpLengthError")
    .regex(/^\d+$/, "otpNumbersOnly"),
});

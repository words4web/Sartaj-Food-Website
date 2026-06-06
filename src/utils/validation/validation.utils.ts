import { EMAIL_REGEX, PHONE_REGEX } from "@/constants/validation";

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isValidMobileNumber(phoneNumber: string): boolean {
  return PHONE_REGEX.test(phoneNumber);
}

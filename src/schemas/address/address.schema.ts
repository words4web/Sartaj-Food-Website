import { z } from "zod";
import { PREFECTURES } from "@/constants/prefectures";

export const addressSchema = z.object({
  fullName: z.string().min(1, "nameRequired"),
  postalCode: z
    .string()
    .min(1, "postalCodeRequired")
    .regex(/^\d{3}-\d{4}$/, "invalidPostalCode"),
  prefecture: z
    .string()
    .min(1, "prefectureRequired")
    .refine((val) => PREFECTURES?.some((p) => p?.code === val), {
      message: "invalidPrefecture",
    }),
  city: z.string().min(1, "cityRequired"),
  streetAddress: z.string().min(1, "streetAddressRequired"),
  building: z.string().optional(),
  phone: z
    .string()
    .min(1, "phoneRequired")
    .regex(/^\+81\d{10}$/, "invalidPhone"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

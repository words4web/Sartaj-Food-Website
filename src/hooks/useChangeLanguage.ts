"use client";

import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setLocale } from "@/lib/store/localeSlice";
import { persistor } from "@/lib/store";

export function useChangeLanguage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const changeLanguage = async (newLocale: "en" | "ja" | "ne" | "hi" | "bn") => {
    dispatch(setLocale(newLocale));
    queryClient.invalidateQueries();
    await persistor.flush();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return changeLanguage;
}

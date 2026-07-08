"use client";

import { useQuery } from "@tanstack/react-query";
import { themeService } from "./theme.service";
import { useDispatch } from "react-redux";
import { setTheme } from "@/lib/store/localeSlice";
import { applyTheme, type Theme } from "@/lib/themes";
import type { IActiveTheme } from "./theme.service";

export const useGetActiveTheme = () => {
  const dispatch = useDispatch();

  return useQuery<IActiveTheme>({
    queryKey: ["theme", "active"],
    queryFn: async () => {
      const theme = await themeService.getActiveTheme();

      if (theme?.name) {
        applyTheme(theme?.name as Theme);
        dispatch(setTheme(theme?.name as Theme));
      }

      return theme;
    },
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";

export interface IActiveTheme {
  name: string;
  isActive: boolean;
}

export const themeService = {
  getActiveTheme: async (): Promise<IActiveTheme> => {
    const res = await axiosInstance.get<{ success: boolean; data: IActiveTheme }>(
      API_ROUTES.THEME.GET_ACTIVE,
    );
    return res?.data?.data;
  },
};

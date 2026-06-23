import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { ICmsResponse } from "@/types/cms/cms.types";

export const cmsService = {
  getPageBySlug: async (
    slug: string,
  ): Promise<AxiosResponse<{ success: boolean; message: string; data: ICmsResponse }>> => {
    return axiosInstance.get(API_ROUTES.CMS.GET_PAGE(slug));
  },
};

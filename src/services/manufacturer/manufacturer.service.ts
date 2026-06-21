import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { IManufacturerResponse } from "@/types/manufacturer/manufacturer.types";

export const manufacturerService = {
  getAllManufacturers: async (): Promise<AxiosResponse<IManufacturerResponse>> => {
    return axiosInstance.get(API_ROUTES.MANUFACTURERS.GET_ALL);
  },
};

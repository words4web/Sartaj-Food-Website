import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { IAddress } from "@/types/address/address.types";

export const addressService = {
  getAddresses: async (): Promise<AxiosResponse<{ success: boolean; data: IAddress[] }>> => {
    return axiosInstance.get(API_ROUTES.ADDRESSES.GET_ALL);
  },

  createAddress: async (
    payload: IAddress,
  ): Promise<AxiosResponse<{ success: boolean; data: IAddress }>> => {
    return axiosInstance.post(API_ROUTES.ADDRESSES.CREATE, payload);
  },

  updateAddress: async (
    id: string,
    payload: IAddress,
  ): Promise<AxiosResponse<{ success: boolean; data: IAddress }>> => {
    return axiosInstance.put(API_ROUTES.ADDRESSES.UPDATE(id), payload);
  },

  deleteAddress: async (id: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return axiosInstance.delete(API_ROUTES.ADDRESSES.DELETE(id));
  },
};

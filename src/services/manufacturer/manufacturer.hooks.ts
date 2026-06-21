import { useQuery } from "@tanstack/react-query";
import { manufacturerService } from "./manufacturer.service";
import { IManufacturer } from "@/types/manufacturer/manufacturer.types";

export const useGetManufacturers = () => {
  return useQuery<IManufacturer[]>({
    queryKey: ["manufacturers"],
    queryFn: async () => {
      const response = await manufacturerService.getAllManufacturers();
      return response?.data?.data?.manufacturers || [];
    },
  });
};

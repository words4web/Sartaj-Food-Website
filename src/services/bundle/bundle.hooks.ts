import { useQuery } from "@tanstack/react-query";
import { bundleService } from "./bundle.service";

export const useGetActiveBundles = () => {
  return useQuery({
    queryKey: ["bundles", "active"],
    queryFn: async () => {
      const response = await bundleService.getActiveBundles();
      return response?.data?.data || [];
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { bannerService } from "./banner.service";

export const useGetActiveBanners = () => {
  return useQuery({
    queryKey: ["banners", "active"],
    queryFn: async () => {
      const response = await bannerService.getActiveBanners();
      return response.data?.data?.banners || [];
    },
  });
};

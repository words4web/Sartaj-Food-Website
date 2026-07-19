import { useQuery } from "@tanstack/react-query";
import { configService } from "./config.service";

export const useGetAppConfig = () => {
  return useQuery({
    queryKey: ["app-config"],
    queryFn: async () => {
      const response = await configService.getConfig();
      return response.data?.data || null;
    },
  });
};

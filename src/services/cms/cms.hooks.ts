import { useQuery } from "@tanstack/react-query";
import { cmsService } from "./cms.service";

export const useGetCmsPage = (slug: string) => {
  return useQuery({
    queryKey: ["cms", "page", slug],
    queryFn: async () => {
      const response = await cmsService.getPageBySlug(slug);
      return response?.data?.data || null;
    },
    enabled: !!slug,
  });
};

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "./category.service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getAllCategories();
      return response?.data?.data?.categories || [];
    },
  });
};

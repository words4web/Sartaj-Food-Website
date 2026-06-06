import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addressService } from "./address.service";
import { IAddress } from "@/types/address/address.types";
import { toast } from "sonner";

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await addressService.getAddresses();
      return response.data?.data || [];
    },
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddress) => addressService.createAddress(payload),
    onSuccess: () => {
      toast.success("Address created successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(apiMsg || "Failed to create address");
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IAddress }) =>
      addressService.updateAddress(id, payload),
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(apiMsg || "Failed to update address");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressService.deleteAddress(id),
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const apiMsg = error?.response?.data?.message || error?.message;
      toast.error(apiMsg || "Failed to delete address");
    },
  });
};

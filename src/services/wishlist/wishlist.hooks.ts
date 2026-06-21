import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "./wishlist.service";
import { useDispatch } from "react-redux";
import {
  setWishlist,
  addToWishlistRedux,
  removeFromWishlistRedux,
  setWishlistLoading,
} from "@/lib/store/wishlistSlice";

export const useGetWishlist = (enabled = true) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      dispatch(setWishlistLoading(true));
      try {
        const response = await wishlistService.getWishlist();
        const data = response?.data?.data;
        const productIds = (data?.products || [])?.map((p: any) => String(p?._id || p?.id));
        dispatch(setWishlist(productIds));
        return data || null;
      } catch (err) {
        dispatch(setWishlistLoading(false));
        throw err;
      } finally {
        dispatch(setWishlistLoading(false));
      }
    },
    enabled,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: wishlistService.addToWishlist,
    onMutate: async (productId: string) => {
      dispatch(addToWishlistRedux(productId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err, productId: string) => {
      dispatch(removeFromWishlistRedux(productId));
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onMutate: async (productId: string) => {
      dispatch(removeFromWishlistRedux(productId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err, productId: string) => {
      dispatch(addToWishlistRedux(productId));
    },
  });
};

import { useQuery, useMutation } from "@tanstack/react-query";
import { cartService } from "./cart.service";
import { useDispatch } from "react-redux";
import { setCart, setCartLoading, clearCart as clearCartRedux } from "@/lib/store/cartSlice";
import { ICartItem } from "@/types/cart.types";

export const useGetCart = (enabled = true) => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      dispatch(setCartLoading(true));
      try {
        const response = await cartService.getCart();
        const data = response?.data?.data;
        if (!data) return null;

        const items: ICartItem[] = (data?.items || [])?.map((item: any) => ({
          productId: item?.product?._id || item?.product?.id,
          quantity: item?.quantity,
          product: item?.product,
        }));

        const totalItems = items?.reduce((sum, item) => sum + item?.quantity, 0);
        const subtotal = data?.grandTotal || 0;
        const totalPrice = subtotal;

        const cartData = {
          items,
          totalItems,
          totalPrice,
          subtotal,
          tax: 0,
          shipping: 0,
          discount: 0,
        };

        dispatch(setCart(cartData));
        return cartData;
      } catch (err) {
        dispatch(setCartLoading(false));
        throw err;
      } finally {
        dispatch(setCartLoading(false));
      }
    },
    enabled,
  });
};

export const useAddToCart = () => useMutation({ mutationFn: cartService.addToCart });

export const useUpdateCartItem = () => useMutation({ mutationFn: cartService.updateCartItem });

export const useRemoveCartItem = () => useMutation({ mutationFn: cartService.removeCartItem });

export const useClearCart = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      dispatch(clearCartRedux());
    },
  });
};

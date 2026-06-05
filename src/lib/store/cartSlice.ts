import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState, ICart } from "@/types/cart.types";

const initialState: ICartState = {
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
  },
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCart(state, action: PayloadAction<ICart>) {
      state.cart = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearCart(state) {
      state.cart = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
      };
      state.lastUpdated = new Date().toISOString();
    },
    updateCartError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    restoreCart(state, action: PayloadAction<ICart>) {
      state.cart = action.payload;
    },
  },
});

export const { setCartLoading, setCart, clearCart, updateCartError, restoreCart } =
  cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState, ICart, ICartItem } from "@/types/cart.types";
import { IProduct } from "@/types/product/product.types";

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
    /** Optimistic: add a new item or update its quantity if already in cart */
    addOrUpdateItem(
      state,
      action: PayloadAction<{ productId: string; quantity: number; product?: IProduct }>,
    ) {
      const { productId, quantity, product } = action.payload;
      const existing = state.cart?.items?.find((i) => i?.productId === productId);
      if (existing) {
        existing.quantity = quantity;
      } else {
        state.cart?.items?.push({ productId, quantity, product } as ICartItem);
      }
      state.cart.totalItems = state.cart?.items?.reduce((s, i) => s + i?.quantity, 0);
      state.lastUpdated = new Date().toISOString();
    },
    /** Optimistic: update the quantity of an existing cart item */
    updateItemQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const item = state.cart.items?.find((i) => i?.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      state.cart.totalItems = state.cart?.items?.reduce((s, i) => s + i?.quantity, 0);
      state.lastUpdated = new Date().toISOString();
    },
    /** Optimistic: remove an item from cart by productId */
    removeItem(state, action: PayloadAction<{ productId: string }>) {
      state.cart.items = state.cart.items?.filter(
        (i) => i?.productId !== action.payload?.productId,
      );
      state.cart.totalItems = state.cart?.items?.reduce((s, i) => s + i?.quantity, 0);
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  setCartLoading,
  setCart,
  clearCart,
  updateCartError,
  restoreCart,
  addOrUpdateItem,
  updateItemQuantity,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;

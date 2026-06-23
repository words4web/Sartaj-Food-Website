import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlistState {
  items: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IWishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload;
    },
    setWishlist(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
    addToWishlistRedux(state, action: PayloadAction<string>) {
      const productId = action?.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromWishlistRedux(state, action: PayloadAction<string>) {
      const productId = action?.payload;
      state.items = state.items.filter((id) => id !== productId);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  setWishlistLoading,
  setWishlist,
  addToWishlistRedux,
  removeFromWishlistRedux,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

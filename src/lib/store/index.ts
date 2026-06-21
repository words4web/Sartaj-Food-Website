import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import localeReducer from "./localeSlice";
import cartReducer from "./cartSlice";
import notificationReducer from "./notificationSlice";
import wishlistReducer from "./wishlistSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isAuthenticated"],
  version: 1,
};

const localePersistConfig = {
  key: "locale",
  storage,
  whitelist: ["locale", "theme"],
  version: 1,
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart", "lastUpdated"],
  version: 1,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["items"],
  version: 1,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedLocaleReducer = persistReducer(localePersistConfig, localeReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    locale: persistedLocaleReducer,
    cart: persistedCartReducer,
    notification: notificationReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

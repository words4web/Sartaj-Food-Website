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

const persistConfig = {
  key: "sartaj-root",
  storage,
  whitelist: ["auth", "locale", "cart"],
  version: 1,
};

const persistedAuthReducer = persistReducer(
  {
    ...persistConfig,
    key: "auth",
  },
  authReducer,
);

const persistedLocaleReducer = persistReducer(
  {
    ...persistConfig,
    key: "locale",
  },
  localeReducer,
);

const persistedCartReducer = persistReducer(
  {
    ...persistConfig,
    key: "cart",
  },
  cartReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    locale: persistedLocaleReducer,
    cart: persistedCartReducer,
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

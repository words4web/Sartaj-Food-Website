import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "@/lib/themes";

interface LocaleState {
  locale: "en" | "ja" | "ne" | "hi" | "bn";
  theme: Theme;
}

const initialState: LocaleState = {
  locale: "en",
  theme: "default",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<"en" | "ja" | "ne" | "hi" | "bn">) {
      state.locale = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    restoreLocale(state, action: PayloadAction<LocaleState>) {
      state.locale = action.payload.locale;
      state.theme = action.payload.theme;
    },
  },
});

export const { setLocale, setTheme, restoreLocale } = localeSlice.actions;

export default localeSlice.reducer;

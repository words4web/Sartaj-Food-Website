import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const activeLocale =
    typeof locale === "string" && routing.locales.includes(locale as any)
      ? locale
      : routing.defaultLocale;

  return {
    locale: activeLocale,
    messages: (await import(`./messages/${activeLocale}.json`)).default,
  };
});

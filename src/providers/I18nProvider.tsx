"use client";

import { ReactNode, useState, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import en from "@/i18n/messages/en.json";
import ja from "@/i18n/messages/ja.json";
import ne from "@/i18n/messages/ne.json";
import hi from "@/i18n/messages/hi.json";
import bn from "@/i18n/messages/bn.json";

const messagesMap: Record<string, any> = { en, ja, ne, hi, bn };

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const [messages, setMessages] = useState<Record<string, any>>(messagesMap[locale] || en);

  useEffect(() => {
    setMessages(messagesMap[locale] || en);
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

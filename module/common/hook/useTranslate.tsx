"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IntlProvider, useIntl } from "react-intl";

import en from "../locales/en.json";
import es from "../locales/es.json";
import ja from "../locales/ja.json";

const messages = {
  en,
  es,
  ja,
};

type Locale = "en" | "es" | "ja";

interface TranslateContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (id: keyof typeof messages[Locale], values?: Record<string, string | number | boolean>) => string;
}

const TranslateContext = createContext<TranslateContextProps | undefined>(undefined);

interface TranslateProviderProps {
  children: ReactNode;
}

export const TranslateProvider: React.FC<TranslateProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const currentLocale = localStorage.getItem("locale") as Locale;
    setLocale(currentLocale || "en");
  }, []);

  const onSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  }

  return (
    <TranslateContext.Provider value={{ locale, setLocale: onSetLocale, t: () => "" }}>
      <IntlProvider locale={locale} messages={messages[locale]} defaultLocale="en">
        <TranslateWrapper>{children}</TranslateWrapper>
      </IntlProvider>
    </TranslateContext.Provider>
  );
};

// We need a wrapper inside IntlProvider to access the useIntl hook
const TranslateWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(TranslateContext);

  if (!context) {
    throw new Error("TranslateWrapper must be used within TranslateProvider");
  }

  return <>{children}</>;
};

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  const intl = useIntl();

  if (!context) {
    throw new Error("useTranslate must be used within a TranslateProvider");
  }

  const t = (id: keyof typeof messages[Locale], values?: Record<string, string | number | boolean>) => {
    return intl.formatMessage({ id }, values);
  };

  return {
    ...context,
    t,
  };
};

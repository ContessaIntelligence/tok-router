import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { zhMessages } from "./i18n-zh";

export type Language = "en" | "zh";
export type TranslateParams = Record<string, string | number>;
export type Translate = (text: string, params?: TranslateParams) => string;

export const LANGUAGE_STORAGE_KEY = "cc-switch-lite:language";

export function initialLanguage(): Language {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  return window.navigator.language?.toLowerCase().startsWith("zh")
    ? "zh"
    : "en";
}

function format(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function translate(
  language: Language,
  text: string,
  params?: TranslateParams,
): string {
  const template = language === "zh" ? (zhMessages[text] ?? text) : text;
  return format(template, params);
}

interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translate;
}

const I18nContext = createContext<I18nValue>({
  language: "en",
  setLanguage: () => undefined,
  t: (text, params) => format(text, params),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const t = useCallback<Translate>(
    (text, params) => translate(language, text, params),
    [language],
  );
  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

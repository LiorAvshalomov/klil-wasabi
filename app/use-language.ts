"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language } from "./project-data";

const LANGUAGE_STORAGE_KEY = "wasabi-language-v2";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const initialLanguage: Language =
      queryLanguage === "en" || queryLanguage === "he"
        ? queryLanguage
        : savedLanguage === "he"
          ? "he"
          : "en";

    document.documentElement.lang = initialLanguage;
    document.documentElement.dir = initialLanguage === "he" ? "rtl" : "ltr";
    const hydrationSync = window.setTimeout(() => setLanguage(initialLanguage), 0);

    return () => window.clearTimeout(hydrationSync);
  }, []);

  const setSiteLanguage = useCallback((nextLanguage: Language) => {
    if (nextLanguage === language || switching) return;

    setSwitching(true);
    window.setTimeout(() => {
      setLanguage(nextLanguage);
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage;
      document.documentElement.dir = nextLanguage === "he" ? "rtl" : "ltr";

      const url = new URL(window.location.href);
      if (nextLanguage === "he") url.searchParams.set("lang", "he");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url);

      window.setTimeout(() => setSwitching(false), 360);
    }, 180);
  }, [language, switching]);

  const languageHref = useCallback(
    (href: string) => {
      if (language !== "he") return href;
      const [path, hash] = href.split("#", 2);
      const localizedPath = `${path}${path.includes("?") ? "&" : "?"}lang=he`;
      return hash === undefined ? localizedPath : `${localizedPath}#${hash}`;
    },
    [language],
  );

  return { language, languageHref, setSiteLanguage, switching };
}

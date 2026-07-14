"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language } from "./project-data";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("he");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    const savedLanguage = window.localStorage.getItem("wasabi-language");
    const initialLanguage: Language =
      queryLanguage === "en" || queryLanguage === "he"
        ? queryLanguage
        : savedLanguage === "en"
          ? "en"
          : "he";

    setLanguage(initialLanguage);
    document.documentElement.lang = initialLanguage;
    document.documentElement.dir = initialLanguage === "he" ? "rtl" : "ltr";
  }, []);

  const setSiteLanguage = useCallback((nextLanguage: Language) => {
    if (nextLanguage === language || switching) return;

    setSwitching(true);
    window.setTimeout(() => {
      setLanguage(nextLanguage);
      window.localStorage.setItem("wasabi-language", nextLanguage);
      document.documentElement.lang = nextLanguage;
      document.documentElement.dir = nextLanguage === "he" ? "rtl" : "ltr";

      const url = new URL(window.location.href);
      if (nextLanguage === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url);

      window.setTimeout(() => setSwitching(false), 360);
    }, 180);
  }, [language, switching]);

  const languageHref = useCallback(
    (href: string) => {
      if (language !== "en") return href;
      const [path, hash] = href.split("#", 2);
      const localizedPath = `${path}${path.includes("?") ? "&" : "?"}lang=en`;
      return hash === undefined ? localizedPath : `${localizedPath}#${hash}`;
    },
    [language],
  );

  return { language, languageHref, setSiteLanguage, switching };
}

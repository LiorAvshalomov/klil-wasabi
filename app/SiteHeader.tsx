"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "./project-data";

type SiteHeaderProps = {
  language: Language;
  languageHref: (href: string) => string;
  setSiteLanguage: (language: Language) => void;
  home?: boolean;
};

const nav = {
  work: { he: "עבודות", en: "Work" },
  about: { he: "אודות", en: "About" },
  contact: { he: "יצירת קשר", en: "Contact" },
  menu: { he: "תפריט", en: "Menu" },
  close: { he: "סגירה", en: "Close" },
} as const;

export function SiteHeader({ language, languageHref, setSiteLanguage, home = false }: SiteHeaderProps) {
  const [headerMode, setHeaderMode] = useState<"top" | "hidden" | "docked">(home ? "top" : "docked");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!home) return;

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const heroEnd = Math.max(window.innerHeight * 0.84, 620);
        setHeaderMode(y < 60 ? "top" : y < heroEnd ? "hidden" : "docked");
        frame = 0;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const workHref = languageHref("/#work");
  const aboutHref = languageHref("/#about");
  const contactHref = languageHref("/contact");
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header shell-header ${home ? "home-header" : "inner-header"} is-${headerMode} ${menuOpen ? "menu-is-open" : ""}`}>
        <Link className="brand-link" href={languageHref("/")} aria-label={language === "he" ? "דף הבית" : "Home"} onClick={closeMenu}>
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>{language === "he" ? "כליל ישראלי" : "KLIL ISRAELI"}</span>
        </Link>

        <nav className="desktop-nav" aria-label={language === "he" ? "ניווט ראשי" : "Main navigation"}>
          <Link href={workHref}>{nav.work[language]}</Link>
          <Link href={aboutHref}>{nav.about[language]}</Link>
          <Link href={contactHref}>{nav.contact[language]}</Link>
        </nav>

        <div className="header-tools">
          <div className="language-switch" aria-label={language === "he" ? "בחירת שפה" : "Language"}>
            <button className={language === "he" ? "active" : ""} onClick={() => setSiteLanguage("he")} type="button">עב</button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} onClick={() => setSiteLanguage("en")} type="button">EN</button>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? nav.close[language] : nav.menu[language]}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
        <nav aria-label={language === "he" ? "ניווט מובייל" : "Mobile navigation"}>
          <Link href={workHref} onClick={closeMenu}>{nav.work[language]}</Link>
          <Link href={aboutHref} onClick={closeMenu}>{nav.about[language]}</Link>
          <Link href={contactHref} onClick={closeMenu}>{nav.contact[language]}</Link>
        </nav>
        <div className="mobile-menu-base">
          <span>KLIL ISRAELI</span>
          <span>MOTION DESIGN · TEL AVIV</span>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { KLIL_EMAIL } from "../contact-data";
import { useLanguage } from "../use-language";

const copy = {
  home: { he: "דף הבית", en: "Home" },
  back: { he: "חזרה לעבודות", en: "Back to work" },
  label: { he: "CONTACT / 01", en: "CONTACT / 01" },
  titleOne: { he: "יש משהו", en: "Something" },
  titleTwo: { he: "שצריך לזוז?", en: "needs to move?" },
  intro: {
    he: "ספרו לכליל מה בונים, מתי זה צריך לקרות, ואיפה התנועה יכולה לעשות את ההבדל.",
    en: "Tell Klil what you’re building, when it needs to happen and where motion can make the difference.",
  },
  email: { he: "מייל ישיר", en: "Direct email" },
  brief: { he: "מעדיפים בריף מסודר?", en: "Prefer a structured brief?" },
  briefCta: { he: "פתיחת טופס הפרויקט", en: "Open the project form" },
  based: { he: "בסיס", en: "Based" },
  location: { he: "תל אביב, ישראל", en: "Tel Aviv, Israel" },
  available: { he: "זמינות", en: "Availability" },
  work: { he: "פרילנס · רימוט", en: "Freelance · Remote" },
  response: { he: "זמן תגובה", en: "Response" },
  responseTime: { he: "בדרך כלל תוך 1–2 ימי עבודה", en: "Usually within 1–2 working days" },
  behance: { he: "עבודות ב־Behance", en: "Work on Behance" },
};

export function ContactPage() {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();

  return (
    <main className={`contact-page ${switching ? "is-switching-language" : ""}`}>
      <header className="site-header contact-page-header">
        <Link className="brand-link" href={languageHref("/")} aria-label={copy.home[language]}>
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>{language === "he" ? "כליל ישראלי" : "KLIL ISRAELI"}</span>
        </Link>
        <Link className="project-back" href={languageHref("/#work")}>← {copy.back[language]}</Link>
        <div className="language-switch" aria-label={language === "he" ? "בחירת שפה" : "Language"}>
          <button className={language === "he" ? "active" : ""} onClick={() => setSiteLanguage("he")} type="button">עב</button>
          <span>/</span>
          <button className={language === "en" ? "active" : ""} onClick={() => setSiteLanguage("en")} type="button">EN</button>
        </div>
      </header>

      <section className="contact-page-hero">
        <div className="contact-page-pattern" aria-hidden="true" />
        <img className="contact-page-pepper" src="/brand/pepper.png" alt="" aria-hidden="true" />
        <div className="contact-page-copy section-shell">
          <p className="section-label">{copy.label[language]}</p>
          <h1><span>{copy.titleOne[language]}</span><strong>{copy.titleTwo[language]}</strong></h1>
          <p className="contact-page-intro">{copy.intro[language]}</p>
          <div className="contact-page-actions">
            <a className="contact-email" href={`mailto:${KLIL_EMAIL}?subject=${encodeURIComponent("New motion project")}`}>
              <small>{copy.email[language]}</small>
              <bdi>{KLIL_EMAIL}</bdi>
              <i aria-hidden="true">↗</i>
            </a>
            <Link className="contact-brief-link" href={languageHref("/contact/brief")}>
              <small>{copy.brief[language]}</small>
              <strong>{copy.briefCta[language]}</strong>
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </div>
      </section>

      <section className="contact-facts section-shell" aria-label={language === "he" ? "פרטי התקשרות" : "Contact details"}>
        <div><span>01</span><small>{copy.based[language]}</small><strong>{copy.location[language]}</strong></div>
        <div><span>02</span><small>{copy.available[language]}</small><strong>{copy.work[language]}</strong></div>
        <div><span>03</span><small>{copy.response[language]}</small><strong>{copy.responseTime[language]}</strong></div>
        <a href="https://www.behance.net/klilisraeli" target="_blank" rel="noreferrer"><span>04</span><small>BEHANCE</small><strong>{copy.behance[language]} ↗</strong></a>
      </section>

      <footer className="contact-page-footer section-shell">
        <Link href={languageHref("/")}><img src="/brand/logo-light.svg" alt="Wasabi Studio" /></Link>
        <span>© 2026 KLIL ISRAELI · TEL AVIV</span>
      </footer>
    </main>
  );
}


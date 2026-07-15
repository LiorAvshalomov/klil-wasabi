"use client";

import Link from "next/link";
import { KLIL_EMAIL } from "../contact-data";
import { useLanguage } from "../use-language";
import { SiteHeader } from "../SiteHeader";

const copy = {
  label: { he: "יצירת קשר", en: "Contact" },
  titleOne: { he: "בואו", en: "Let’s" },
  titleTwo: { he: "נדבר.", en: "talk." },
  intro: {
    he: "פרויקט חדש, שיתוף פעולה או שאלה.",
    en: "A new project, collaboration or question.",
  },
  email: { he: "מייל ישיר", en: "Direct email" },
  phone: { he: "טלפון", en: "Phone" },
  brief: { he: "מעדיפים בריף מסודר?", en: "Prefer a structured brief?" },
  briefCta: { he: "פתיחת טופס הפרויקט", en: "Open the project form" },
  based: { he: "בסיס", en: "Based" },
  location: { he: "תל אביב, ישראל", en: "Tel Aviv, Israel" },
  available: { he: "זמינות", en: "Availability" },
  work: { he: "פרילנס · רימוט", en: "Freelance · Remote" },
  response: { he: "זמן תגובה", en: "Response" },
  responseTime: { he: "בדרך כלל תוך 1–2 ימי עבודה", en: "Usually within 1–2 working days" },
  home: { he: "דף הבית", en: "Home" },
  workLink: { he: "עבודות", en: "Work" },
};

export function ContactPage() {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();

  return (
    <main className={`contact-page ${switching ? "is-switching-language" : ""}`}>
      <SiteHeader language={language} languageHref={languageHref} setSiteLanguage={setSiteLanguage} />

      <section className="contact-page-hero">
        <div className="contact-page-pattern" aria-hidden="true" />
        <div className="contact-page-copy section-shell">
          <div className="contact-page-heading">
            <p className="section-label">{copy.label[language]}</p>
            <h1><span>{copy.titleOne[language]}</span><strong>{copy.titleTwo[language]}</strong></h1>
            <p className="contact-page-intro">{copy.intro[language]}</p>
          </div>
          <div className="contact-page-visual" aria-hidden="true">
            <img className="contact-page-mark" src="/brand/mark-dark.svg" alt="" />
            <img className="contact-page-pepper" src="/brand/pepper.png" alt="" />
          </div>
          <div className="contact-page-actions">
            <a className="contact-email" href={`mailto:${KLIL_EMAIL}?subject=${encodeURIComponent("New motion project")}`}>
              <small>{copy.email[language]}</small>
              <bdi>{KLIL_EMAIL}</bdi>
              <i aria-hidden="true">↗</i>
            </a>
            <a className="contact-phone" href="tel:+972501234567">
              <small>{copy.phone[language]}</small>
              <bdi>+972501234567</bdi>
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
        <div><small>{copy.based[language]}</small><strong>{copy.location[language]}</strong></div>
        <div><small>{copy.available[language]}</small><strong>{copy.work[language]}</strong></div>
        <div><small>{copy.response[language]}</small><strong>{copy.responseTime[language]}</strong></div>
      </section>

      <footer className="contact-page-footer section-shell">
        <Link className="contact-footer-brand" href={languageHref("/")}><img src="/brand/logo-dark.svg" alt="Wasabi Studio" /></Link>
        <a className="contact-footer-email" href={`mailto:${KLIL_EMAIL}`}>{KLIL_EMAIL}</a>
        <nav aria-label={language === "he" ? "קישורי תחתית" : "Footer navigation"}>
          <Link href={languageHref("/")}>{copy.home[language]}</Link>
          <Link href={languageHref("/#work")}>{copy.workLink[language]}</Link>
          <Link href={languageHref("/contact/brief")}>{copy.briefCta[language]}</Link>
        </nav>
        <span className="contact-footer-legal">© 2026 KLIL ISRAELI · TEL AVIV</span>
      </footer>
    </main>
  );
}

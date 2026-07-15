"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { KLIL_EMAIL } from "../../contact-data";
import { useLanguage } from "../../use-language";

const copy = {
  home: { he: "דף הבית", en: "Home" },
  back: { he: "חזרה ליצירת קשר", en: "Back to contact" },
  label: { he: "PROJECT BRIEF / 02", en: "PROJECT BRIEF / 02" },
  title: { he: "בואו נבין מה צריך לזוז.", en: "Let’s find what needs to move." },
  intro: {
    he: "כמה פרטים קצרים עוזרים לכליל להגיע לשיחה הראשונה עם הכיוון, הקצב והשאלות הנכונות.",
    en: "A few details help Klil arrive at the first conversation with the right direction, rhythm and questions.",
  },
  fields: {
    name: { he: "שם מלא", en: "Full name" },
    email: { he: "אימייל", en: "Email" },
    company: { he: "חברה / מותג", en: "Company / brand" },
    type: { he: "סוג הפרויקט", en: "Project type" },
    budget: { he: "טווח תקציב", en: "Budget range" },
    timeline: { he: "מתי צריך לעלות?", en: "When does it need to launch?" },
    message: { he: "מה הסיפור?", en: "What’s the story?" },
  },
  placeholders: {
    name: { he: "איך קוראים לך?", en: "What should we call you?" },
    email: { he: "name@company.com", en: "name@company.com" },
    company: { he: "שם החברה", en: "Company name" },
    timeline: { he: "תאריך, חודש או בהקדם", en: "Date, month or ASAP" },
    message: { he: "מטרת הפרויקט, קהל, תוצרים וכל דבר שחשוב לדעת…", en: "Goal, audience, deliverables and anything useful to know…" },
  },
  choose: { he: "בחירה", en: "Choose" },
  projectTypes: {
    he: ["סרט מותג", "Motion Identity", "סרט מוצר", "קמפיין סושיאל", "אירוע / מסכים", "משהו אחר"],
    en: ["Brand film", "Motion identity", "Product film", "Social campaign", "Event / screens", "Something else"],
  },
  budgets: {
    he: ["עד ₪15K", "₪15K–30K", "₪30K–60K", "₪60K+", "עדיין לא הוגדר"],
    en: ["Up to ₪15K", "₪15K–30K", "₪30K–60K", "₪60K+", "Not defined yet"],
  },
  submit: { he: "הכנת המייל", en: "Prepare email" },
  note: {
    he: "בלחיצה תיפתח אפליקציית המייל שלך עם הבריף מוכן לשליחה ישירה לכליל.",
    en: "This opens your email app with the brief prepared for direct delivery to Klil.",
  },
  ready: { he: "המייל מוכן — נשאר רק לשלוח.", en: "Your email is ready — just hit send." },
};

export function BriefForm() {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();
  const [prepared, setPrepared] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Project type: ${data.get("projectType")}`,
      `Budget: ${data.get("budget")}`,
      `Timeline: ${data.get("timeline")}`,
      "",
      "Project:",
      `${data.get("message")}`,
    ].join("\n");
    const subject = `Motion project brief — ${data.get("company") || data.get("name")}`;
    setPrepared(true);
    window.location.href = `mailto:${KLIL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className={`brief-page ${switching ? "is-switching-language" : ""}`}>
      <header className="site-header contact-page-header">
        <Link className="brand-link" href={languageHref("/")} aria-label={copy.home[language]}>
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>{language === "he" ? "כליל ישראלי" : "KLIL ISRAELI"}</span>
        </Link>
        <Link className="project-back" href={languageHref("/contact")}>← {copy.back[language]}</Link>
        <div className="language-switch" aria-label={language === "he" ? "בחירת שפה" : "Language"}>
          <button className={language === "he" ? "active" : ""} onClick={() => setSiteLanguage("he")} type="button">עב</button>
          <span>/</span>
          <button className={language === "en" ? "active" : ""} onClick={() => setSiteLanguage("en")} type="button">EN</button>
        </div>
      </header>

      <div className="brief-layout section-shell">
        <aside className="brief-intro">
          <p className="section-label">{copy.label[language]}</p>
          <h1>{copy.title[language]}</h1>
          <p>{copy.intro[language]}</p>
          <img src="/brand/clapper.png" alt="" aria-hidden="true" />
        </aside>

        <form className="brief-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="brief-name">01 / {copy.fields.name[language]}</label>
            <input id="brief-name" name="name" type="text" placeholder={copy.placeholders.name[language]} autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="brief-email">02 / {copy.fields.email[language]}</label>
            <input id="brief-email" name="email" type="email" placeholder={copy.placeholders.email[language]} autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="brief-company">03 / {copy.fields.company[language]}</label>
            <input id="brief-company" name="company" type="text" placeholder={copy.placeholders.company[language]} autoComplete="organization" />
          </div>
          <div className="form-field">
            <label htmlFor="brief-type">04 / {copy.fields.type[language]}</label>
            <select id="brief-type" name="projectType" defaultValue="" required>
              <option value="" disabled>{copy.choose[language]}</option>
              {copy.projectTypes[language].map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="brief-budget">05 / {copy.fields.budget[language]}</label>
            <select id="brief-budget" name="budget" defaultValue="" required>
              <option value="" disabled>{copy.choose[language]}</option>
              {copy.budgets[language].map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="brief-timeline">06 / {copy.fields.timeline[language]}</label>
            <input id="brief-timeline" name="timeline" type="text" placeholder={copy.placeholders.timeline[language]} required />
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="brief-message">07 / {copy.fields.message[language]}</label>
            <textarea id="brief-message" name="message" rows={6} placeholder={copy.placeholders.message[language]} required />
          </div>
          <div className="brief-submit form-field--wide">
            <button type="submit"><span>{copy.submit[language]}</span><i aria-hidden="true">↗</i></button>
            <p aria-live="polite">{prepared ? copy.ready[language] : copy.note[language]}</p>
          </div>
        </form>
      </div>
    </main>
  );
}

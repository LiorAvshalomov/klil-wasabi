"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  categoryLabels,
  clients,
  projects,
  type Copy,
  type ProjectCategory,
} from "./project-data";
import { useLanguage } from "./use-language";

type Filter = "all" | ProjectCategory;

const homeCopy = {
  skip: { he: "דילוג לעבודות", en: "Skip to work" },
  navWork: { he: "עבודות", en: "Work" },
  navAbout: { he: "כליל", en: "Klil" },
  navContact: { he: "דברו איתי", en: "Contact" },
  heroTop: { he: "כליל ישראלי · Motion Designer & Director", en: "Klil Israeli · Motion Designer & Director" },
  heroLineOne: { he: "כל פריים", en: "Every frame" },
  heroLineTwo: { he: "זז מסיבה.", en: "moves for a reason." },
  heroLocation: { he: "תל אביב · עובד עם מותגים בכל מקום", en: "Tel Aviv · Working with brands everywhere" },
  reel: { he: "SHOWREEL", en: "SHOWREEL" },
  pause: { he: "עצירה", en: "Pause" },
  play: { he: "ניגון", en: "Play" },
  scroll: { he: "גלו עבודות", en: "Explore work" },
  workIndex: { he: "01 / עבודות נבחרות", en: "01 / Selected work" },
  workTitleOne: { he: "עבודות", en: "Selected" },
  workTitleTwo: { he: "בתנועה.", en: "motion." },
  openProject: { he: "פתיחת פרויקט", en: "Open project" },
  kineticStrip: {
    he: "בימוי · עיצוב · תנועה · קצב · סאונד · בימוי · עיצוב · תנועה · קצב · סאונד · ",
    en: "DIRECTION · DESIGN · MOTION · RHYTHM · SOUND · DIRECTION · DESIGN · MOTION · RHYTHM · SOUND · ",
  },
  clientsIndex: { he: "02 / Selected collaborations", en: "02 / Selected collaborations" },
  clientsTitleOne: { he: "עברנו", en: "Good company." },
  clientsTitleTwo: { he: "פריים יחד.", en: "Better frames." },
  clientsHint: { he: "עברו על הלוגואים", en: "Hover the roster" },
  aboutIndex: { he: "03 / כליל ישראלי", en: "03 / Klil Israeli" },
  aboutTitle: {
    he: "יד אחת על הרעיון. יד שנייה על הטיימליין.",
    en: "One hand on the idea. The other on the timeline.",
  },
  aboutBody: {
    he: "Motion Designer ובמאי מתל אביב. עובד ישירות עם צוותי מותג, מוצר וקריאייטיב — מהפריים הראשון ועד הקאט האחרון.",
    en: "A motion designer and director from Tel Aviv, working directly with brand, product and creative teams — from first frame to final cut.",
  },
  values: {
    he: ["רעיון חד", "תהליך ישיר", "ביצוע מדויק"],
    en: ["Sharp idea", "Direct process", "Precise craft"],
  },
  contactIndex: { he: "04 / בואו נזיז משהו", en: "04 / Let’s move something" },
  contactTitleOne: { he: "יש משהו", en: "Got something" },
  contactTitleTwo: { he: "שצריך לזוז?", en: "that should move?" },
  contactCta: { he: "מתחילים ב-Behance", en: "Start on Behance" },
  footerMotion: { he: "Motion Design · Direction", en: "Motion Design · Direction" },
  footerLocation: { he: "תל אביב, ישראל", en: "Tel Aviv, Israel" },
  temporary: {
    he: "מדיה ושמות לקוחות מוצגים כתוכן המחשה זמני עד להטמעת החומרים של כליל.",
    en: "Media and client names are temporary presentation content until Klil’s final materials are added.",
  },
} satisfies Record<string, Copy | { he: string[]; en: string[] }>;

function t(copy: Copy, language: "he" | "en") {
  return copy[language];
}

export function PortfolioHome() {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [reelPlaying, setReelPlaying] = useState(true);
  const reelRef = useRef<HTMLVideoElement>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === "all" || project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        });
      },
      { threshold: 0.28 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    document.querySelectorAll<HTMLVideoElement>("[data-work-video]").forEach((video) => videoObserver.observe(video));

    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty("--scroll-progress", `${window.scrollY / max}`);
        document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.18, 120)}px`);
        frame = 0;
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      videoObserver.disconnect();
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activeFilter]);

  const toggleReel = () => {
    const reel = reelRef.current;
    if (!reel) return;
    if (reel.paused) {
      void reel.play().catch(() => undefined);
      setReelPlaying(true);
    } else {
      reel.pause();
      setReelPlaying(false);
    }
  };

  return (
    <main className={`portfolio ${switching ? "is-switching-language" : ""}`}>
      <a className="skip-link" href="#work">{t(homeCopy.skip, language)}</a>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <Link className="brand-link" href={languageHref("/")} aria-label="Wasabi Studio — Home">
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>{language === "he" ? "כליל ישראלי" : "KLIL ISRAELI"}</span>
        </Link>
        <nav aria-label={language === "he" ? "ניווט ראשי" : "Main navigation"}>
          <a href="#work">{t(homeCopy.navWork, language)}</a>
          <a href="#about">{t(homeCopy.navAbout, language)}</a>
          <a href="#contact">{t(homeCopy.navContact, language)}</a>
        </nav>
        <div className="language-switch" aria-label={language === "he" ? "בחירת שפה" : "Language"}>
          <button className={language === "he" ? "active" : ""} onClick={() => setSiteLanguage("he")} type="button">עב</button>
          <span>/</span>
          <button className={language === "en" ? "active" : ""} onClick={() => setSiteLanguage("en")} type="button">EN</button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <video
          ref={reelRef}
          className="hero-video"
          src="/media/demo-reel.mp4"
          poster="/media/dynamic-shapes.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={language === "he" ? "שואוריל של כליל ישראלי" : "Klil Israeli showreel"}
        />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-pattern" aria-hidden="true" />

        <div className="hero-topline">
          <span>{t(homeCopy.heroTop, language)}</span>
          <span>WASABI® / 2026</span>
        </div>

        <div className="hero-title-wrap">
          <h1 id="hero-title">
            <span>{t(homeCopy.heroLineOne, language)}</span>
            <strong>{t(homeCopy.heroLineTwo, language)}</strong>
          </h1>
          <p>{t(homeCopy.heroLocation, language)}</p>
        </div>

        <button className="reel-toggle" type="button" onClick={toggleReel} aria-pressed={!reelPlaying}>
          <span className="reel-icon" aria-hidden="true">{reelPlaying ? "Ⅱ" : "▶"}</span>
          <span>{t(homeCopy.reel, language)} / 00:12</span>
          <small>{reelPlaying ? t(homeCopy.pause, language) : t(homeCopy.play, language)}</small>
        </button>

        <a className="scroll-cue" href="#work">
          <span>{t(homeCopy.scroll, language)}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro section-shell" data-reveal>
          <p className="section-label">{t(homeCopy.workIndex, language)}</p>
          <h2 id="work-title">
            <span>{t(homeCopy.workTitleOne, language)}</span>
            <strong>{t(homeCopy.workTitleTwo, language)}</strong>
          </h2>
          <div className="work-filters" role="group" aria-label={language === "he" ? "סינון עבודות" : "Filter work"}>
            {(Object.keys(categoryLabels) as Filter[]).map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {categoryLabels[filter][language]}
              </button>
            ))}
          </div>
        </div>

        <div className="work-list section-shell" aria-live="polite">
          {visibleProjects.map((project) => {
            const originalIndex = projects.findIndex((item) => item.slug === project.slug);
            return (
              <Link
                href={languageHref(`/projects/${project.slug}`)}
                className={`work-item work-item--${project.layout}`}
                style={{ "--project-accent": project.accent } as React.CSSProperties}
                key={`${activeFilter}-${project.slug}`}
                data-reveal
                aria-label={`${t(homeCopy.openProject, language)} — ${project.title[language]}`}
              >
                <div className="work-media">
                  <video
                    data-work-video
                    src={project.video}
                    poster={project.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                  <span className="work-media-index">0{originalIndex + 1}</span>
                  <span className="work-open" aria-hidden="true">↗</span>
                  <div className="work-scanline" aria-hidden="true" />
                </div>
                <div className="work-info">
                  <p>{project.eyebrow[language]} / {project.year}</p>
                  <h3>{project.title[language]}</h3>
                  <div className="work-details">
                    <span>{project.client}</span>
                    <span className="mixed-service">
                      {project.service[language].split("·").map((part, index, parts) => (
                        <span key={`${part}-${index}`}>
                          <bdi dir="auto">{part.trim()}</bdi>{index < parts.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="kinetic-divider" aria-hidden="true">
        <div className="kinetic-track">
          <span>{t(homeCopy.kineticStrip, language)}</span>
          <span>{t(homeCopy.kineticStrip, language)}</span>
        </div>
        <img src="/brand/pepper.png" alt="" />
      </section>

      <section className="clients-section" aria-labelledby="clients-title">
        <div className="clients-head section-shell" data-reveal>
          <div>
            <p className="section-label">{t(homeCopy.clientsIndex, language)}</p>
            <h2 id="clients-title">
              <span>{t(homeCopy.clientsTitleOne, language)}</span>
              <strong>{t(homeCopy.clientsTitleTwo, language)}</strong>
            </h2>
          </div>
          <p className="clients-hint"><i aria-hidden="true" />{t(homeCopy.clientsHint, language)}</p>
        </div>

        <div className="client-grid section-shell" data-reveal>
          {clients.map((client, index) => (
            <div className={`client-tile ${client.className}`} tabIndex={0} key={client.name}>
              <span className="client-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="client-logo" aria-label={client.name}>{client.name}</span>
              <span className="client-note">{client.note}</span>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-grid section-shell">
          <div className="about-portrait" data-reveal>
            <div className="portrait-window">
              <img src="/brand/klil.png" alt={language === "he" ? "כליל ישראלי" : "Klil Israeli"} />
              <div className="portrait-shutter" aria-hidden="true" />
            </div>
            <img className="about-clapper" src="/brand/clapper.png" alt="" aria-hidden="true" />
            <span className="about-location">TLV / 32.0853° N</span>
          </div>

          <div className="about-copy" data-reveal>
            <p className="section-label">{t(homeCopy.aboutIndex, language)}</p>
            <h2 id="about-title">{t(homeCopy.aboutTitle, language)}</h2>
            <p>{t(homeCopy.aboutBody, language)}</p>
            <ul>
              {homeCopy.values[language].map((value, index) => (
                <li key={value}><span>0{index + 1}</span>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-pattern" aria-hidden="true" />
        <div className="contact-inner section-shell" data-reveal>
          <p className="section-label">{t(homeCopy.contactIndex, language)}</p>
          <h2 id="contact-title">
            <span>{t(homeCopy.contactTitleOne, language)}</span>
            <strong>{t(homeCopy.contactTitleTwo, language)}</strong>
          </h2>
          <a className="contact-cta" href="https://www.behance.net/klilisraeli" target="_blank" rel="noreferrer">
            <span>{t(homeCopy.contactCta, language)}</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main section-shell">
          <div className="footer-brand">
            <img src="/brand/mark-light.svg" alt="" aria-hidden="true" />
            <strong>WASABI</strong>
          </div>
          <div className="footer-meta">
            <p>{t(homeCopy.footerMotion, language)}</p>
            <p>{t(homeCopy.footerLocation, language)}</p>
          </div>
          <div className="footer-links">
            <a href="https://www.behance.net/klilisraeli" target="_blank" rel="noreferrer">Behance ↗</a>
            <a href="#work">{t(homeCopy.navWork, language)} ↑</a>
          </div>
        </div>
        <div className="footer-base section-shell">
          <span>© 2026 KLIL ISRAELI</span>
          <span>{t(homeCopy.temporary, language)}</span>
          <span>WASABI®</span>
        </div>
      </footer>
    </main>
  );
}

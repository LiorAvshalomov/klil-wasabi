"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  hide: { he: "הסתרה", en: "Hide" },
  show: { he: "הצגה", en: "Show" },
  scroll: { he: "גלו עבודות", en: "Explore work" },
  workIndex: { he: "01 / עבודות נבחרות", en: "01 / Selected work" },
  workTitle: { he: "עבודות בתנועה.", en: "Work in motion." },
  workCount: { he: "חמישה פרויקטים נבחרים", en: "Five selected projects" },
  openProject: { he: "פתיחת פרויקט", en: "Open project" },
  kineticStrip: {
    he: "בימוי · עיצוב · תנועה · קצב · סאונד · ",
    en: "DIRECTION · DESIGN · MOTION · RHYTHM · SOUND · ",
  },
  clientsIndex: { he: "02 / שיתופי פעולה נבחרים", en: "02 / Selected collaborations" },
  clientsTitle: { he: "חברות טובות. פריימים טובים.", en: "Good company. Better frames." },
  clientsHint: { he: "עצרו על שם", en: "Pause on a name" },
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
  contactTitle: { he: "יש משהו שצריך לזוז?", en: "Got something that should move?" },
  contactDirect: { he: "דברו עם כליל", en: "Talk to Klil" },
  contactBrief: { he: "שליחת בריף", en: "Send a brief" },
  footerMotion: { he: "Motion Design · Direction", en: "Motion Design · Direction" },
  footerLocation: { he: "תל אביב, ישראל", en: "Tel Aviv, Israel" },
  temporary: {
    he: "המדיה ושמות הלקוחות הם תוכן המחשה זמני עד להטמעת החומרים הסופיים של כליל.",
    en: "Media and client names are temporary presentation content until Klil’s final materials are added.",
  },
} satisfies Record<string, Copy | { he: string[]; en: string[] }>;

function t(copy: Copy, language: "he" | "en") {
  return copy[language];
}

function ClientTrack({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...clients, ...clients];
  return (
    <div className={`client-rail ${reverse ? "is-reverse" : ""}`}>
      <div className="client-track">
        {repeated.map((client, index) => (
          <span className={`client-wordmark ${client.className}`} tabIndex={index < clients.length ? 0 : -1} key={`${client.name}-${index}`}>
            <i aria-hidden="true" />
            <strong>{client.name}</strong>
            <small>{client.note}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PortfolioHome() {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [reelPlaying, setReelPlaying] = useState(true);
  const [heroUiHidden, setHeroUiHidden] = useState(false);
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
    <main className={`portfolio ${switching ? "is-switching-language" : ""} ${heroUiHidden ? "hero-ui-hidden" : ""}`}>
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
          <Link href={languageHref("/contact")}>{t(homeCopy.navContact, language)}</Link>
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

        <div className="reel-dock" aria-label={language === "he" ? "פקדי שואוריל" : "Showreel controls"}>
          <span className="reel-time">{t(homeCopy.reel, language)} <small>/ 00:12</small></span>
          <button type="button" onClick={toggleReel} aria-pressed={!reelPlaying}>
            <i aria-hidden="true">{reelPlaying ? "Ⅱ" : "▶"}</i>
            <span>{reelPlaying ? t(homeCopy.pause, language) : t(homeCopy.play, language)}</span>
          </button>
          <button className="reel-hide" type="button" onClick={() => setHeroUiHidden((hidden) => !hidden)} aria-pressed={heroUiHidden}>
            <i aria-hidden="true">{heroUiHidden ? "＋" : "—"}</i>
            <span>{heroUiHidden ? t(homeCopy.show, language) : t(homeCopy.hide, language)}</span>
          </button>
        </div>

        <a className="scroll-cue" href="#work">
          <span>{t(homeCopy.scroll, language)}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="work-heading section-shell" data-reveal>
          <div>
            <p className="section-label">{t(homeCopy.workIndex, language)}</p>
            <h2 id="work-title">{t(homeCopy.workTitle, language)}</h2>
          </div>
          <p className="work-count">{t(homeCopy.workCount, language)}</p>
        </div>

        <div className="work-filters section-shell" role="group" aria-label={language === "he" ? "סינון עבודות" : "Filter work"}>
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

        <div className="work-board section-shell" aria-live="polite">
          {visibleProjects.map((project, visibleIndex) => {
            const originalIndex = projects.findIndex((item) => item.slug === project.slug);
            return (
              <Link
                href={languageHref(`/projects/${project.slug}`)}
                className={`work-card ${visibleIndex === 0 ? "is-featured" : ""}`}
                style={{ "--project-accent": project.accent } as CSSProperties}
                key={`${activeFilter}-${project.slug}`}
                data-reveal
                aria-label={`${t(homeCopy.openProject, language)} — ${project.title[language]}`}
              >
                <div className="work-card-media">
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
                  <span className="work-card-index">0{originalIndex + 1}</span>
                  <span className="work-card-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="work-caption">
                  <div>
                    <p>{project.eyebrow[language]} / {project.year}</p>
                    <h3>{project.title[language]}</h3>
                  </div>
                  <div className="work-caption-meta">
                    <span>{project.client}</span>
                    <span>{project.service[language]}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="motion-ribbon" aria-hidden="true">
        {[false, true].map((reverse) => (
          <div className={`motion-ribbon-rail ${reverse ? "is-reverse" : ""}`} key={String(reverse)}>
            <div className="motion-ribbon-track">
              {[0, 1, 2, 3].map((item) => (
                <span key={item}>
                  {t(homeCopy.kineticStrip, language)}
                  <img src="/brand/pepper.png" alt="" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="clients-section" aria-labelledby="clients-title">
        <div className="clients-head section-shell" data-reveal>
          <div>
            <p className="section-label">{t(homeCopy.clientsIndex, language)}</p>
            <h2 id="clients-title">{t(homeCopy.clientsTitle, language)}</h2>
          </div>
          <p className="clients-hint"><i aria-hidden="true" />{t(homeCopy.clientsHint, language)}</p>
        </div>
        <div className="client-motion" data-reveal>
          <ClientTrack />
          <ClientTrack reverse />
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
          <h2 id="contact-title">{t(homeCopy.contactTitle, language)}</h2>
          <div className="contact-actions">
            <Link className="contact-cta" href={languageHref("/contact")}>
              <span>{t(homeCopy.contactDirect, language)}</span>
              <i aria-hidden="true">↗</i>
            </Link>
            <Link className="contact-cta is-brief" href={languageHref("/contact/brief")}>
              <span>{t(homeCopy.contactBrief, language)}</span>
              <i aria-hidden="true">→</i>
            </Link>
          </div>
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
            <Link href={languageHref("/contact")}>{t(homeCopy.navContact, language)} ↗</Link>
            <a href="https://www.behance.net/klilisraeli" target="_blank" rel="noreferrer">Behance ↗</a>
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

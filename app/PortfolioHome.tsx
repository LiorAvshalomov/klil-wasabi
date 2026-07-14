"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { demoClients, projects } from "./project-data";

export function PortfolioHome() {
  const reelRef = useRef<HTMLVideoElement>(null);
  const [reelPaused, setReelPaused] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6%" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      revealObserver.observe(element);
    });

    const workVideoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 },
    );

    document.querySelectorAll<HTMLVideoElement>("[data-work-video]").forEach((video) => {
      workVideoObserver.observe(video);
    });

    return () => {
      revealObserver.disconnect();
      workVideoObserver.disconnect();
    };
  }, []);

  const toggleReel = () => {
    const reel = reelRef.current;
    if (!reel) return;

    if (reel.paused) {
      void reel.play().catch(() => undefined);
      setReelPaused(false);
    } else {
      reel.pause();
      setReelPaused(true);
    }
  };

  return (
    <main>
      <a className="skip-link" href="#work">
        דילוג לעבודות
      </a>

      <header className="site-header">
        <Link className="brand-link" href="/" aria-label="Wasabi Studio - דף הבית">
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>כליל ישראלי</span>
        </Link>
        <nav aria-label="ניווט ראשי">
          <a href="#work">עבודות</a>
          <a href="#about">אודות</a>
          <a href="#contact">דברו איתי</a>
        </nav>
        <span className="language-chip" aria-label="שפת האתר: עברית">
          HE
        </span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="reel-frame">
          <video
            ref={reelRef}
            className="hero-reel"
            src="/media/demo-reel.mp4"
            poster="/media/dynamic-shapes.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="שואוריל לדוגמה"
          />
          <div className="reel-shade" />
          <div className="pattern-curtain" aria-hidden="true" />
          <div className="impact-tick" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow">WASABI / כליל ישראלי</p>
            <h1 id="hero-title">
              מושן מדויק.
              <br />
              עם <span>קיק.</span>
            </h1>
            <p>מעצב תנועה ובמאי · תל אביב</p>
          </div>

          <div className="reel-controls">
            <span className="demo-label">שואוריל דמו · יוחלף בחומרים של כליל</span>
            <button type="button" onClick={toggleReel} aria-pressed={reelPaused}>
              <span aria-hidden="true">{reelPaused ? "▶" : "Ⅱ"}</span>
              {reelPaused ? "הפעלה" : "עצירה"}
            </button>
          </div>
        </div>
      </section>

      <section className="work-section section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading reveal" data-reveal>
          <div>
            <p className="section-number">01 / עבודות</p>
            <h2 id="work-title">פרויקטים נבחרים</h2>
          </div>
          <p>
            כל פרויקט נפתח לעמוד משלו עם הסיפור, התפקידים, התהליך והתוצאה.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              className={`project-card reveal ${index === 0 || index === 3 || index === 4 ? "wide" : ""}`}
              data-reveal
              key={project.slug}
              aria-label={`פתיחת הפרויקט ${project.title}`}
            >
              <div className={`project-media ${project.slug === "vertical-pressure" ? "vertical-media" : ""}`}>
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
                <span className="demo-stamp">מדיית דמו</span>
                <span className="project-arrow" aria-hidden="true">↙</span>
              </div>
              <div className="project-meta">
                <div>
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{project.title}</h3>
                  <p className="latin" dir="ltr">{project.englishTitle}</p>
                </div>
                <div className="project-credits">
                  <span>{project.category}</span>
                  <span>{project.roles}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="clients-section" aria-labelledby="clients-title">
        <div className="section-shell clients-heading reveal" data-reveal>
          <p className="section-number">02 / שותפים לדרך</p>
          <div>
            <h2 id="clients-title">עם מי עבדתי</h2>
            <p>שמות לדוגמה לצורך מבנה בלבד · יוחלפו ברשימה המאושרת</p>
          </div>
        </div>
        <div className="clients-marquee" role="region" aria-label="לקוחות לדוגמה">
          <div className="clients-track">
            {[0, 1].map((copy) => (
              <div className="clients-group" aria-hidden={copy === 1} key={copy}>
                {demoClients.map((client, index) => (
                  <span className="client-wordmark" key={`${copy}-${client}`} tabIndex={copy === 0 ? 0 : -1}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {client}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="about-visual reveal" data-reveal>
          <div className="portrait-frame">
            <img src="/brand/klil.png" alt="כליל ישראלי" />
            <span>עובדים ישירות עם כליל</span>
          </div>
          <img className="clapper-illustration" src="/brand/clapper.png" alt="" aria-hidden="true" />
        </div>

        <div className="about-copy reveal" data-reveal>
          <p className="section-number">03 / קצת עליי</p>
          <h2 id="about-title">
            קריאייטיב חד.
            <br />
            תהליך <span>ישיר.</span>
          </h2>
          <p>
            אני כליל ישראלי, מעצב תנועה ובמאי. אני עוזר למותגים, חברות טכנולוגיה
            וצוותי שיווק להפוך רעיון מורכב לסרט ברור, מדויק ומלא אופי.
          </p>
          <p>
            Wasabi הוא סטודיו בוטיק: איכות של צוות גדול, עם תקשורת ישירה מול מי
            שמוביל ומבצע את העבודה.
          </p>
          <ul className="services-list" aria-label="תחומי התמחות">
            <li>בימוי ועיצוב</li>
            <li>סרטי מותג ומוצר</li>
            <li>מערכות מושן</li>
            <li>מסכי אירוע וסושיאל</li>
          </ul>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-pattern" aria-hidden="true" />
        <div className="contact-inner section-shell reveal" data-reveal>
          <div>
            <p className="section-number">04 / יוצאים לדרך</p>
            <h2 id="contact-title">
              יש לכם פריים
              <br />
              ששווה <span>להזיז?</span>
            </h2>
          </div>
          <div className="contact-actions">
            <p>ספרו לי מה אתם בונים, ואחזור אליכם עם כיוון ברור.</p>
            <a href="https://www.behance.net/klilisraeli" target="_blank" rel="noreferrer">
              דברו איתי ב-Behance <span aria-hidden="true">↙</span>
            </a>
            <small>כתובת המייל הישירה תתווסף לפני העלייה לאוויר.</small>
          </div>
          <img className="pepper-illustration" src="/brand/pepper.png" alt="" aria-hidden="true" />
        </div>
      </section>

      <footer className="site-footer section-shell">
        <img src="/brand/mark-light.svg" alt="" aria-hidden="true" />
        <span>WASABI / כליל ישראלי</span>
        <span>מושן דיזיין ובימוי · תל אביב</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

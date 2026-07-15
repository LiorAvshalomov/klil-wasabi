"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Project } from "./project-data";
import { useLanguage } from "./use-language";

const copy = {
  home: { he: "דף הבית", en: "Home" },
  back: { he: "כל העבודות", en: "All work" },
  facts: {
    he: ["תחום", "לקוח", "שירות", "שנה"],
    en: ["Field", "Client", "Service", "Year"],
  },
  chapters: {
    he: ["האתגר", "המהלך", "התוצאה"],
    en: ["The challenge", "The move", "The outcome"],
  },
  next: { he: "הפרויקט הבא", en: "Next project" },
  contact: { he: "דברו איתי", en: "Contact" },
  temporary: { he: "פרויקט ומדיה להמחשה", en: "Project and media for presentation" },
};

type ProjectViewProps = {
  project: Project;
  projectIndex: number;
  nextProject: Project;
};

export function ProjectView({ project, projectIndex, nextProject }: ProjectViewProps) {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    let frame = 0;
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty("--scroll-progress", `${window.scrollY / max}`);
        frame = 0;
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const facts = [
    project.field[language],
    project.client,
    project.service[language],
    project.year,
  ];

  const chapters = [project.challenge[language], project.approach[language], project.result[language]];

  return (
    <main
      className={`project-page project-page--${project.layout} ${switching ? "is-switching-language" : ""}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header project-header">
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

      <article>
        <section className="project-hero">
          <div className="project-hero-media">
            <video
              src={project.video}
              poster={project.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`${project.title[language]} — motion preview`}
            />
            <div className="project-hero-shade" aria-hidden="true" />
            <div className="project-hero-pattern" aria-hidden="true" />
          </div>

          <div className="project-hero-copy section-shell">
            <div className="project-counter">
              <span>0{projectIndex + 1}</span>
              <i />
              <span>05</span>
            </div>
            <p>{project.eyebrow[language]} / {project.year}</p>
            <h1>{project.title[language]}</h1>
            <span className="project-client">FOR {project.client}</span>
          </div>

          <div className="project-reel-tag">
            <span>LOOP</span>
            <i aria-hidden="true" />
            <small>00:12</small>
          </div>
        </section>

        <dl className="project-facts section-shell" data-reveal aria-label={language === "he" ? "פרטי הפרויקט" : "Project details"}>
          {facts.map((fact, index) => (
            <div key={copy.facts[language][index]}>
              <dt>{copy.facts[language][index]}</dt>
              <dd>
                {index === 2 ? (
                  <span className="mixed-service">
                    {fact.split("·").map((part, serviceIndex, parts) => (
                      <span key={`${part}-${serviceIndex}`}>
                        <bdi dir="auto">{part.trim()}</bdi>{serviceIndex < parts.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </span>
                ) : fact}
              </dd>
            </div>
          ))}
        </dl>

        <section className="project-statement section-shell" data-reveal>
          <span>W / 0{projectIndex + 1}</span>
          <h2>{project.statement[language]}</h2>
          <img src="/brand/mark-dark.svg" alt="" aria-hidden="true" />
        </section>

        <section className="project-process section-shell">
          <div className="project-process-visual project-process-visual--one" data-reveal>
            <img src={project.poster} alt="" />
            <span>FRAME / 001</span>
          </div>

          <div className="project-chapters" data-reveal>
            {chapters.map((chapter, index) => (
              <div className="project-chapter" key={copy.chapters[language][index]}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{copy.chapters[language][index]}</h3>
                  <p>{chapter}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="project-process-visual project-process-visual--two" data-reveal>
            <video src={project.video} poster={project.poster} autoPlay muted loop playsInline preload="metadata" />
            <span>MOTION / SYSTEM</span>
          </div>

          <div className="project-frame-wall" data-reveal aria-hidden="true">
            <div><img src={project.poster} alt="" /></div>
            <div><img src={project.poster} alt="" /></div>
            <div><img src={project.poster} alt="" /></div>
          </div>
        </section>

        <Link
          className="next-project"
          href={languageHref(`/projects/${nextProject.slug}`)}
          style={{ "--next-accent": nextProject.accent } as React.CSSProperties}
        >
          <video src={nextProject.video} poster={nextProject.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="next-project-shade" aria-hidden="true" />
          <div>
            <span>{copy.next[language]} / 0{((projectIndex + 1) % 5) + 1}</span>
            <strong>{nextProject.title[language]}</strong>
          </div>
          <i aria-hidden="true">↗</i>
        </Link>
      </article>

      <footer className="project-footer section-shell">
        <Link href={languageHref("/")}><img src="/brand/logo-light.svg" alt="Wasabi Studio" /></Link>
        <Link href={languageHref("/contact")}>{copy.contact[language]} ↗</Link>
        <span>{copy.temporary[language]} · © 2026</span>
      </footer>
    </main>
  );
}

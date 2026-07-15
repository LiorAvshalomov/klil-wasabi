"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import type { Project } from "./project-data";
import { useLanguage } from "./use-language";
import { SiteHeader } from "./SiteHeader";

const copy = {
  facts: {
    he: ["תחום", "לקוח", "שירות", "שנה"],
    en: ["Field", "Client", "Service", "Year"],
  },
  previous: { he: "הפרויקט הקודם", en: "Previous project" },
  next: { he: "הפרויקט הבא", en: "Next project" },
  contact: { he: "דברו איתי", en: "Contact" },
  note: { he: "הרעיון", en: "The idea" },
  chapters: ["Challenge", "Approach", "Outcome"],
  motion: "Hero motion",
  frames: "Selected frames",
  delivery: "Motion direction, design and a system built to travel.",
};

type ProjectViewProps = {
  project: Project;
  previousProject: Project;
  nextProject: Project;
};

export function ProjectView({ project, previousProject, nextProject }: ProjectViewProps) {
  const { language, languageHref, setSiteLanguage, switching } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7%" },
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

  const facts = [project.field.en, project.client, project.service.en, project.year];
  const chapters = [project.challenge.en, project.approach.en, project.result.en];

  return (
    <main
      className={`project-page project-page--${project.layout} ${switching ? "is-switching-language" : ""}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader language={language} languageHref={languageHref} setSiteLanguage={setSiteLanguage} />

      <article dir="ltr">
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
              aria-label={`${project.title.en} — motion preview`}
            />
            <div className="project-hero-shade" aria-hidden="true" />
            <div className="project-hero-pattern" aria-hidden="true" />
          </div>

          <div className="project-hero-copy section-shell">
            <p>{project.eyebrow.en} / {project.year}</p>
            <h1>{project.title.en}</h1>
            <span className="project-client">FOR {project.client}</span>
          </div>
        </section>

        <dl className="project-facts section-shell" data-reveal aria-label="Project details">
          {facts.map((fact, index) => (
            <div key={copy.facts.en[index]}>
              <dt>{copy.facts[language][index]}</dt>
              <dd>{fact}</dd>
            </div>
          ))}
        </dl>

        <section className="project-statement section-shell" data-reveal>
          <span>{copy.note[language]}</span>
          <h2>{project.statement.en}</h2>
          <img src="/brand/mark-dark.svg" alt="" aria-hidden="true" />
        </section>

        <section className="project-process section-shell">
          <figure className="project-process-visual project-process-visual--one" data-reveal>
            <video src={project.video} poster={project.poster} autoPlay muted loop playsInline preload="metadata" />
            <figcaption>{copy.motion}</figcaption>
          </figure>

          <div className="project-chapters" data-reveal>
            {chapters.map((chapter, index) => (
              <section className="project-chapter" key={copy.chapters[index]}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{copy.chapters[index]}</h3>
                  <p>{chapter}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="project-media-pair" data-reveal>
            <figure>
              <img src={project.poster} alt="" />
              <figcaption>{copy.frames}</figcaption>
            </figure>
            <figure>
              <video src={project.video} poster={project.poster} autoPlay muted loop playsInline preload="metadata" />
              <figcaption>{project.service.en}</figcaption>
            </figure>
          </div>

          <div className="project-delivery" data-reveal>
            <p>{copy.delivery}</p>
            <span>{project.service.en}</span>
          </div>
        </section>

        <nav className="project-pagination" aria-label="Project navigation">
          <ProjectNavCard project={previousProject} label={copy.previous[language]} href={languageHref(`/projects/${previousProject.slug}`)} direction="previous" />
          <ProjectNavCard project={nextProject} label={copy.next[language]} href={languageHref(`/projects/${nextProject.slug}`)} direction="next" />
        </nav>
      </article>

      <footer className="project-footer section-shell">
        <Link href={languageHref("/")}><img src="/brand/logo-dark.svg" alt="Wasabi Studio" /></Link>
        <Link href={languageHref("/contact")}>{copy.contact[language]} ↗</Link>
        <span>© 2026 KLIL ISRAELI</span>
      </footer>
    </main>
  );
}

function ProjectNavCard({ project, label, href, direction }: { project: Project; label: string; href: string; direction: "previous" | "next" }) {
  return (
    <Link
      className={`project-nav-card project-nav-card--${direction}`}
      href={href}
      style={{ "--next-accent": project.accent } as CSSProperties}
    >
      <video src={project.video} poster={project.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      <span className="project-nav-shade" aria-hidden="true" />
      <span className="project-nav-copy">
        <small dir="auto">{label}</small>
        <strong>{project.title.en}</strong>
      </span>
      <i aria-hidden="true">{direction === "previous" ? "←" : "→"}</i>
    </Link>
  );
}

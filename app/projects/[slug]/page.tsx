import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/project-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} | כליל ישראלי`,
    description: project.intro,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="project-page">
      <header className="site-header project-header">
        <Link className="brand-link" href="/" aria-label="חזרה לדף הבית">
          <img src="/brand/logo-dark.svg" alt="Wasabi Studio" />
          <span>כליל ישראלי</span>
        </Link>
        <Link className="back-link" href="/#work">חזרה לכל העבודות ←</Link>
      </header>

      <article>
        <section className="project-hero section-shell">
          <div className="project-kicker">
            <span>{String(projectIndex + 1).padStart(2, "0")} / 05</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="latin" dir="ltr">{project.englishTitle}</p>
          <div className="detail-video-frame">
            <video
              src={project.video}
              poster={project.poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
            <span>מדיית דמו · תוחלף בחומרים המקוריים של כליל</span>
          </div>
        </section>

        <section className="project-story section-shell">
          <div className="project-lead">
            <p className="section-number">על הפרויקט</p>
            <h2>{project.intro}</h2>
          </div>
          <dl className="project-facts">
            <div>
              <dt>תחום</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>תפקידים</dt>
              <dd>{project.roles}</dd>
            </div>
            <div>
              <dt>שנה</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </section>

        <section className="project-breakdown section-shell">
          <div>
            <span>01</span>
            <h3>האתגר</h3>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span>02</span>
            <h3>הגישה</h3>
            <p>{project.approach}</p>
          </div>
          <div>
            <span>03</span>
            <h3>התוצאה</h3>
            <p>{project.result}</p>
          </div>
        </section>

        <Link className="next-project" href={`/projects/${nextProject.slug}`}>
          <span>הפרויקט הבא</span>
          <strong>{nextProject.title}</strong>
          <span className="latin" dir="ltr">{nextProject.englishTitle}</span>
          <b aria-hidden="true">↙</b>
        </Link>
      </article>

      <footer className="site-footer section-shell">
        <img src="/brand/mark-light.svg" alt="" aria-hidden="true" />
        <span>WASABI / כליל ישראלי</span>
        <Link href="/#contact">דברו איתי</Link>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

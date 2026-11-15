import type { Project } from "../../data/projectsData";

type ProjectDocumentProps = {
  project: Project;
};

function BulletList({ text }: { text: string }) {
  const items = text
    .split("\n")
    .map((item) => item.replace(/^[\s•*-]+/, "").trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <ul className="project-document-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectDocument({ project }: ProjectDocumentProps) {
  return (
    <div className="project-document">
      {/* Word 97-style menu */}

      {/* Document workspace */}
      <div className="project-document-workspace">
        <article className="project-document-page">
          {/* Document header */}
          <header className="project-document-header">
            <h1>{project.name}</h1>

            <p className="project-document-subtitle">Project Overview</p>
          </header>

          <hr />

          {/* Project information */}
          <section className="project-document-section">
            <h2>Project Information</h2>

            <div className="project-document-details">
              {project.projectType && (
                <p>
                  <strong>Project Type:</strong> {project.projectType}
                </p>
              )}

              {project.role && (
                <p>
                  <strong>My Role:</strong> {project.role}
                </p>
              )}

              {project.status && (
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
              )}
            </div>
          </section>

          {/* Overview */}
          {(project.overview || project.description) && (
            <section className="project-document-section">
              <h2>Project Overview</h2>

              <p>{project.overview || project.description}</p>
            </section>
          )}

          {/* Objectives */}
          {project.objectives?.trim() && (
            <section className="project-document-section">
              <h2>Project Objectives</h2>

              <BulletList text={project.objectives} />
            </section>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="project-document-section">
              <h2>Technologies Used</h2>

              <ul className="project-document-list">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Development */}
          {project.development?.trim() && (
            <section className="project-document-section">
              <h2>Development</h2>

              <BulletList text={project.development} />
            </section>
          )}

          {/* Challenges */}
          {project.challenges?.trim() && (
            <section className="project-document-section">
              <h2>Challenges & Solutions</h2>

              <BulletList text={project.challenges} />
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes?.trim() && (
            <section className="project-document-section">
              <h2>Project Outcomes</h2>

              <BulletList text={project.outcomes} />
            </section>
          )}

          {/* Website */}
          {project.website && (
            <section className="project-document-section">
              <h2>Project Website</h2>

              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="project-document-hyperlink"
              >
                Visit Project Website
              </a>
            </section>
          )}
        </article>
      </div>

      {/* Word-style status bar */}
      <div className="project-document-status">
        <span>Document: {project.name}</span>
        <span>Read Only</span>
      </div>
    </div>
  );
}

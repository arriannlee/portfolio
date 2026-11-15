"use client";

import { useState } from "react";
import ProjectDocument from "./ProjectDocument";
import ProjectImageViewer from "./ProjectImageViewer";
import { projects, type Project } from "../../data/projectsData";

type SelectedFile = "website" | "screenshots" | "overview" | null;

export default function ProjectsExplorer() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0],
  );

  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  function selectProject(project: Project) {
    setSelectedProject(project);
    setSelectedFile(null);
  }

  return (
    <div className="projects-explorer">
      {/* Explorer menu */}
      <div className="projects-explorer-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* Address bar */}
      <div className="projects-explorer-address">
        <span>Address</span>
        <div>
          C:\Arriann\Projects
          {selectedProject ? `\\${selectedProject.name}` : ""}
        </div>
      </div>

      {/* Explorer panels */}
      <div className="projects-explorer-body">
        {/* Left: folders */}
        <aside className="projects-explorer-sidebar">
          <div className="projects-explorer-heading">Folders</div>

          <div className="projects-explorer-root">📁 Projects</div>

          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`projects-explorer-folder ${
                selectedProject?.id === project.id ? "is-selected" : ""
              }`}
              onClick={() => selectProject(project)}
            >
              <span aria-hidden="true">📁</span>
              {project.name}
            </button>
          ))}
        </aside>

        {/* Middle: files */}
        <div className="projects-explorer-files">
          <div className="projects-explorer-heading">
            {selectedProject?.name ?? "Projects"}
          </div>

          {selectedProject && (
            <>
              <button
                type="button"
                className={`projects-explorer-file ${
                  selectedFile === "website" ? "is-selected" : ""
                }`}
                onClick={() => setSelectedFile("website")}
              >
                <span aria-hidden="true">🌐</span>
                Website.url
              </button>

              <button
                type="button"
                className={`projects-explorer-file ${
                  selectedFile === "screenshots" ? "is-selected" : ""
                }`}
                onClick={() => setSelectedFile("screenshots")}
              >
                <span aria-hidden="true">📁</span>
                Screenshots
              </button>

              <button
                type="button"
                className={`projects-explorer-file ${
                  selectedFile === "overview" ? "is-selected" : ""
                }`}
                onClick={() => setSelectedFile("overview")}
              >
                <span aria-hidden="true">📄</span>
                Project Overview.doc
              </button>
            </>
          )}
        </div>

        {/* Right: preview */}
        <section className="projects-explorer-preview">
          <div className="projects-explorer-heading">Preview</div>

          {selectedProject && (
            <>
              {selectedFile !== "overview" &&
                selectedFile !== "screenshots" && (
                  <h2>{selectedProject.name}</h2>
                )}
              {!selectedFile && <p>{selectedProject.description}</p>}

              {selectedFile === "website" && (
                <div>
                  <h3>Website Shortcut</h3>
                  <p>{selectedProject.description}</p>

                  {selectedProject.website ? (
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-explorer-link"
                    >
                      Visit Website ↗
                    </a>
                  ) : (
                    <p>Website not currently available.</p>
                  )}
                </div>
              )}

              {selectedFile === "screenshots" && (
                <ProjectImageViewer
                  key={selectedProject.id}
                  screenshots={selectedProject.screenshots ?? []}
                />
              )}

              {selectedFile === "overview" && (
                <ProjectDocument project={selectedProject} />
              )}
            </>
          )}
        </section>
      </div>

      {/* Explorer status bar */}
      <div className="projects-explorer-status">
        {projects.length} project folders
      </div>
    </div>
  );
}

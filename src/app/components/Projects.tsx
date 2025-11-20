"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel");
      if (!sections.length) return;

      // Ensure all panels start in place
      gsap.set(sections, { xPercent: 0 });

      // Timeline that controls panel transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 1,
          // markers: true,
          snap: {
            snapTo: (value) => Math.round(value), // snap between panels
            duration: 0.3,
            delay: 0,
            ease: "power1.out",
          },
          end: () => "+=" + window.innerHeight * (sections.length - 1),
        },
      });

      // For each panel after the first, slide it in over the previous one
      sections.forEach((panel, index) => {
        if (index === 0) return; // first panel is already visible

        tl.fromTo(
          panel,
          { xPercent: 100 }, // start offscreen to the right
          { xPercent: 0, duration: 1, ease: "none" }, // slide in over the previous
          index - 1 // each step of scroll moves to the next panel
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Stack panels on top of each other */}
      <div className="relative h-full w-full">
        {PROJECTS.map((project: Project, index) => (
          <div
            key={project.id}
            className="panel"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: index, // later panels naturally sit above earlier ones
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: project.color,
              padding: "2rem",
            }}
          >
            <div
              style={{
                maxWidth: "1000px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              {/* PROJECT TEXT */}
              <div>
                {/* TITLE */}
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {project.title}
                </h2>

                {/* TECH STACK — inline, subtle, metadata style */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.35rem",
                    marginBottom: "1.2rem",
                    opacity: 0.7,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.stack.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < project.stack.length - 1 && (
                        <span style={{ margin: "0 0.25rem" }}>•</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "1.25rem",
                    opacity: 0.9,
                    maxWidth: "48ch",
                  }}
                >
                  {project.description}
                </p>

                {project.link && (
                  <a
                    aria-label={`View live project: ${project.title}`}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-text bg-white/90 text-slate-900 dark:bg-white/90"
                  >
                    View live project
                  </a>
                )}
              </div>

              {/* Screenshot card */}
              <div className="w-full max-w-[420px] justify-self-center">
                <button
                  type="button"
                  className="
                    group relative w-full aspect-[4/3]
                    overflow-hidden rounded-2xl
                    border border-white/30
                    bg-black/30 shadow-2xl
                  "
                  onClick={() => {
                    if (project.link) setPreviewProject(project);
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-300
                        group-hover:scale-[1.02]
                      "
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-white/70">
                      Screenshot coming soon
                    </div>
                  )}

                  {project.link && (
                    <div
                      className="
                        absolute inset-0 flex items-center justify-center
                        bg-black/70
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                      "
                    >
                      <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-white/90">
                        Live preview · click
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live preview modal – simple full-height window */}
      {previewProject?.link && (
        <div
          className="
            fixed inset-0 z-[1200]
            bg-black/80 backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          onClick={() => setPreviewProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} live preview`}
        >
          <div
            className="
              relative w-full max-w-6xl h-[90vh]
              bg-black rounded-2xl overflow-hidden
              border border-white/30
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewProject(null)}
              className="btn btn-icon absolute top-3 right-3 bg-black/70 text-white z-10"
            >
              ✕
            </button>

            <iframe
              src={previewProject.link}
              title={previewProject.title}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}

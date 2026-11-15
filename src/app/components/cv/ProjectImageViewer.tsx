"use client";

import { useEffect, useState } from "react";
import type { ProjectScreenshot } from "../../data/projectsData";

type ProjectImageViewerProps = {
  screenshots: ProjectScreenshot[];
};

export default function ProjectImageViewer({
  screenshots,
}: ProjectImageViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [screenshots]);

  const selectedImage =
    selectedIndex !== null ? screenshots[selectedIndex] : null;

  function previousImage() {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex - 1 + screenshots.length) % screenshots.length,
    );
  }

  function nextImage() {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex + 1) % screenshots.length);
  }

  return (
    <div className="project-image-viewer">
      {selectedImage && (
        <div className="project-image-toolbar">
          <button type="button" onClick={() => setSelectedIndex(null)}>
            ← Back to Gallery
          </button>
        </div>
      )}

      {screenshots.length === 0 ? (
        <div className="project-image-empty">
          <span aria-hidden="true">🖼️</span>
          <p>No screenshots have been added yet.</p>
        </div>
      ) : selectedImage ? (
        <div className="project-image-expanded">
          <div className="project-image-canvas">
            <img src={selectedImage.src} alt={selectedImage.title} />
          </div>

          <div className="project-image-controls">
            <button type="button" onClick={previousImage}>
              ◀ Previous
            </button>

            <span>
              {selectedIndex! + 1} of {screenshots.length}
            </span>

            <button type="button" onClick={nextImage}>
              Next ▶
            </button>
          </div>

          <div className="project-image-caption">{selectedImage.title}</div>
        </div>
      ) : (
        <div className="project-image-gallery">
          {screenshots.map((screenshot, index) => (
            <button
              key={`${screenshot.src}-${index}`}
              type="button"
              className="project-image-thumbnail"
              onClick={() => setSelectedIndex(index)}
            >
              <img src={screenshot.src} alt="" loading="lazy" />

              <span>{screenshot.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

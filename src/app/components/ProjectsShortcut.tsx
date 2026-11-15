"use client";

type ProjectsShortcutProps = {
  onOpen: () => void;
};

export default function ProjectsShortcut({ onOpen }: ProjectsShortcutProps) {
  return (
    <button
      type="button"
      className="retro-desktop-folder projects-shortcut"
      onClick={onOpen}
      aria-label="Open Projects"
      title="Projects"
    >
      <img
        src="/images/projects-briefcase.ico"
        alt=""
        className="projects-shortcut-icon"
        draggable={false}
      />

      <span>Projects</span>
    </button>
  );
}

export default function LinkedInShortcut() {
  return (
    <a
      href="https://www.linkedin.com/in/arriannlee/"
      target="_blank"
      rel="noopener noreferrer"
      className="retro-linkedin-shortcut"
      aria-label="Arriann Lee on LinkedIn (opens in a new tab)"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="retro-linkedin-icon"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        {/* Square, bevelled blue tile */}
        <path fill="#003b66" d="M4 4h40v40H4z" />
        <path fill="#0a66c2" d="M6 6h36v36H6z" />
        <path fill="#79baff" d="M4 4h40v2H6v36H4z" />
        <path fill="#002b50" d="M42 6h2v38H6v-2h36z" />

        {/* Pixel-style “in” */}
        <path
          fill="#fff"
          d="
            M11 12h5v5h-5z
            M11 20h5v16h-5z
            M21 20h5v2h3v-2h6v3h3v13h-5V25h-7v11h-5z
          "
        />

        {/* Retro shortcut badge */}
        <path fill="#000" d="M1 32h17v15H1z" />
        <path fill="#fff" d="M2 33h15v13H2z" />
        <path fill="#000" d="M10 35h5v5h-2v-2h-3v3H7v3H4v-5h4v-2h2z" />
      </svg>

      <span className="retro-linkedin-label">LinkedIn</span>
    </a>
  );
}

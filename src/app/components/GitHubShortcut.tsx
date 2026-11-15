export default function GitHubShortcut() {
  return (
    <a
      href="https://github.com/arriannlee"
      target="_blank"
      rel="noopener noreferrer"
      className="retro-linkedin-shortcut"
      aria-label="Arriann Lee on GitHub (opens in a new tab)"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="retro-linkedin-icon"
        aria-hidden="true"
      >
        {/* Bevelled charcoal tile */}
        <g shapeRendering="crispEdges">
          <path fill="#181818" d="M4 4h40v40H4z" />
          <path fill="#333" d="M6 6h36v36H6z" />
          <path fill="#888" d="M4 4h40v2H6v36H4z" />
          <path fill="#000" d="M42 6h2v38H6v-2h36z" />
        </g>

        {/* GitHub mark */}
        <g transform="translate(10 10) scale(1.16)" fill="#fff">
          <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.002 12.002 0 0 0 12 .297Z" />
        </g>

        {/* Retro shortcut badge */}
        <g shapeRendering="crispEdges">
          <path fill="#000" d="M1 32h17v15H1z" />
          <path fill="#fff" d="M2 33h15v13H2z" />
          <path
            fill="#000"
            d="M10 35h5v5h-2v-2h-3v3H7v3H4v-5h4v-2h2z"
          />
        </g>
      </svg>

      <span className="retro-linkedin-label">GitHub</span>
    </a>
  );
}

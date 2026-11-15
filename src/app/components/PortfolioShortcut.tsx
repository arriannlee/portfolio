export default function PortfolioShortcut() {
  return (
    <a
      href="https://arriannlee.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="retro-linkedin-shortcut"
      aria-label="Arriann Lee’s portfolio (opens in a new tab)"
    >
      <span className="retro-portfolio-icon" aria-hidden="true">
        <span className="retro-portfolio-mark">a.</span>

        <svg
          className="retro-portfolio-arrow"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          shapeRendering="crispEdges"
        >
          <path fill="#000" d="M0 0h18v16H0z" />
          <path fill="#fff" d="M1 1h16v14H1z" />
          <path
            fill="#000"
            d="M10 3h5v5h-2V6h-3v3H7v3H4V7h4V5h2z"
          />
        </svg>
      </span>

      <span className="retro-linkedin-label">Portfolio</span>
    </a>
  );
}

"use client";

import Link from "next/link";

type CVWelcomeProps = {
  onEnter: () => void;
  pdfHref?: string;
};

export default function CVWelcome({ onEnter, pdfHref }: CVWelcomeProps) {
  return (
    <div className="cv-welcome">
      <div className="cv-welcome-top" aria-hidden="true" />

      <main className="cv-welcome-main">
        <div className="cv-welcome-intro">
          <h1>welcome</h1>
          <p>Choose how you would like to explore my CV</p>
        </div>

        <div className="cv-welcome-options">
          <button type="button" className="cv-welcome-user" onClick={onEnter}>
            <span className="cv-welcome-avatar" aria-hidden="true">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                shapeRendering="crispEdges"
              >
                <path
                  d="M4 5h32v24H4z"
                  fill="#c0c0c0"
                  stroke="#222"
                  strokeWidth="2"
                />
                <path d="M8 9h24v16H8z" fill="#000080" />
                <path d="M17 30h6v4h8v3H9v-3h8z" fill="#ddd" />
                <path d="m17 12 8 5-8 5z" fill="#fff" />
              </svg>
            </span>

            <span>
              <strong>Interactive CV</strong>
              <span className="cv-welcome-user-detail">
                Click to log on - best experienced with sound!
              </span>
            </span>
          </button>

          {pdfHref ? (
            <a href={pdfHref} download className="cv-welcome-user">
              <PDFIcon />
              <span>
                <strong>Download CV</strong>
                <span className="cv-welcome-user-detail">
                  A copy to save or print
                </span>
              </span>
            </a>
          ) : (
            <button type="button" className="cv-welcome-user" disabled>
              <PDFIcon />
              <span>
                <strong>Download PDF CV</strong>

                <span className="cv-welcome-user-detail">Coming soon</span>
              </span>
            </button>
          )}
        </div>
      </main>

      <footer className="cv-welcome-footer">
        <Link href="/" className="cv-welcome-exit">
          <span className="cv-welcome-power" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 3v9" />
              <path d="M6.3 5.7a9 9 0 1 0 11.4 0" />
            </svg>
          </span>
          Return to portfolio
        </Link>
      </footer>
    </div>
  );
}

function PDFIcon() {
  return (
    <span className="cv-welcome-avatar" aria-hidden="true">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        shapeRendering="crispEdges"
      >
        <path d="M9 3h15l8 8v26H9z" fill="#fff" stroke="#333" strokeWidth="2" />
        <path d="M24 3v9h8" stroke="#333" strokeWidth="2" />
        <path
          d="M13 18h15M13 23h15M13 28h11"
          stroke="#000080"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

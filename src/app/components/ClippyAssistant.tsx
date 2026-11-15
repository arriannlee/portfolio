"use client";

import { useEffect, useState } from "react";

export default function ClippyAssistant() {
  const [showHelp, setShowHelp] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;
    let resetTimeout: ReturnType<typeof setTimeout>;

    function scheduleBlink() {
      const delay = 2500 + Math.random() * 4000;

      blinkTimeout = setTimeout(() => {
        setBlinking(true);

        resetTimeout = setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 150);
      }, delay);
    }

    scheduleBlink();
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(resetTimeout);
    };
  }, []);
  if (!isVisible) return null;

  return (
    <div className="clippy-assistant">
      {showHelp && (
        <div className="clippy-bubble">
          <div className="clippy-bubble-heading">
<strong>It looks like you&apos;re exploring Arriann&apos;s CV!</strong>
            <button
              type="button"
              className="clippy-close"
              onClick={() => setShowHelp(false)}
              aria-label="Close help"
            >
              ×
            </button>
          </div>

          <p>
            Click the desktop icons to explore her experience, skills and
            projects.
          </p>

          <p>
            Prefer a traditional CV? You can download the PDF from the Start
            menu.
          </p>

          <button
            type="button"
            className="clippy-confirm"
            onClick={() => {
              const audio = new Audio("/sound/clippy-dismiss.mp3");
              audio.volume = 0.3;
              void audio.play().catch(() => {});

              setIsVisible(false);
            }}
          >
            Got it!
          </button>
        </div>
      )}

      <button
        type="button"
        className="clippy-character"
        onClick={() => setShowHelp((current) => !current)}
        aria-label={showHelp ? "Hide help" : "Show help"}
      >
        <svg
          viewBox="0 0 130 170"
          width="110"
          height="145"
          role="img"
          aria-label="Animated paperclip assistant"
        >
          <defs>
            <linearGradient id="clippy-metal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#666" />
              <stop offset="20%" stopColor="#eee" />
              <stop offset="45%" stopColor="#999" />
              <stop offset="70%" stopColor="#f5f5f5" />
              <stop offset="100%" stopColor="#777" />
            </linearGradient>
          </defs>

          {/* Paperclip body */}
          <path
            d="
              M84 45
              C84 18 45 15 38 43
              L24 117
              C17 151 61 163 74 132
              L101 57
              C114 16 59 -1 45 36
              L22 111
            "
            fill="none"
            stroke="#444"
            strokeWidth="15"
            strokeLinecap="round"
          />

          <path
            d="
              M84 45
              C84 18 45 15 38 43
              L24 117
              C17 151 61 163 74 132
              L101 57
              C114 16 59 -1 45 36
              L22 111
            "
            fill="none"
            stroke="url(#clippy-metal)"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Eyes */}
          <g className={blinking ? "clippy-eyes is-blinking" : "clippy-eyes"}>
            <ellipse
              cx="56"
              cy="65"
              rx="15"
              ry="19"
              fill="white"
              stroke="#444"
              strokeWidth="2"
            />
            <ellipse
              cx="85"
              cy="65"
              rx="15"
              ry="19"
              fill="white"
              stroke="#444"
              strokeWidth="2"
            />
            <ellipse cx="54" cy="62" rx="6" ry="8" fill="#111" />
            <ellipse cx="83" cy="62" rx="6" ry="8" fill="#111" />
          </g>

          {/* Eyebrows */}
          <path
            d="M43 39 Q55 31 68 39"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M74 38 Q87 30 99 38"
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}

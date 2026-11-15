"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "connecting" | "failed";

export default function InternetContent() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const dialupRef = useRef<HTMLAudioElement | null>(null);
  const errorRef = useRef<HTMLAudioElement | null>(null);
  const engagedRef = useRef<HTMLAudioElement | null>(null);
  // Stop both sounds when this window closes.
  // Stop every sound when the window closes.
  useEffect(() => {
    return () => {
      [dialupRef.current, engagedRef.current, errorRef.current].forEach(
        (audio) => {
          if (!audio) return;

          audio.onended = null;
          audio.onerror = null;
          audio.ontimeupdate = null;
          audio.pause();
        },
      );

      dialupRef.current = null;
      engagedRef.current = null;
      errorRef.current = null;
    };
  }, []);

  function stopSounds() {
    [dialupRef.current, engagedRef.current, errorRef.current].forEach(
      (audio) => {
        if (!audio) return;

        audio.onended = null;
        audio.onerror = null;
        audio.ontimeupdate = null;
        audio.pause();
      },
    );

    dialupRef.current = null;
    engagedRef.current = null;
    errorRef.current = null;
  }
  function reset() {
    stopSounds();
    setStage("idle");
    setProgress(0);
    setShowHelp(false);
  }
  function connect() {
    stopSounds();

    setProgress(0);
    setShowHelp(false);
    setStage("connecting");

    function showFailure() {
      setStage("failed");

      const error = new Audio("/sound/error.mp3");
      error.volume = 0.35;
      errorRef.current = error;

      void error.play().catch(() => {});
    }

    function playEngaged() {
      const engaged = new Audio("/sound/engaged.wav");
      engaged.volume = 0.35;
      engagedRef.current = engaged;

      function finishEngaged() {
        if (engagedRef.current !== engaged) return;

        engaged.onended = null;
        engaged.onerror = null;
        engaged.ontimeupdate = null;
        engaged.pause();
        engagedRef.current = null;

        showFailure();
      }

      // Play up to three seconds of engaged tone.
      engaged.ontimeupdate = () => {
        if (engaged.currentTime >= 3) {
          finishEngaged();
        }
      };

      engaged.onended = finishEngaged;
      engaged.onerror = finishEngaged;

      void engaged.play().catch(finishEngaged);
    }

    const dialup = new Audio("/sound/dialup.wav");
    dialup.volume = 0.35;
    dialupRef.current = dialup;

    function finishDialup() {
      if (dialupRef.current !== dialup) return;

      dialup.onended = null;
      dialup.onerror = null;
      dialup.ontimeupdate = null;
      dialup.pause();
      dialupRef.current = null;

      setProgress(55);
      playEngaged();
    }

    dialup.ontimeupdate = () => {
      if (
        dialupRef.current !== dialup ||
        !Number.isFinite(dialup.duration) ||
        dialup.duration <= 0
      ) {
        return;
      }

      const percentage = (dialup.currentTime / dialup.duration) * 100;

      setProgress(Math.min(55, Math.round(percentage)));

      if (percentage >= 55) {
        finishDialup();
      }
    };

    dialup.onended = finishDialup;
    dialup.onerror = finishDialup;

    void dialup.play().catch(finishDialup);
  }

  const detail =
    progress < 30
      ? "Dialling…"
      : progress < 65
        ? "Verifying user name and password…"
        : "Registering…";

  return (
    <div className="cv-dialup">
      {stage === "failed" ? (
        <div className="cv-dialup-failure">
          <div className="cv-dialup-failure-message" role="alert">
            <span className="cv-dialup-error-icon" aria-hidden="true">
              ×
            </span>

            <div>
              <h2>Unable to connect to the Internet.</h2>

              <p>Someone’s on the phone. Ask them to hang up and try again. </p>
            </div>
          </div>

          <div className="cv-dialup-actions">
            <button
              type="button"
              className="cv-dialup-button"
              onClick={reset}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cv-dialup-connection">
            <svg
              className="cv-dialup-devices"
              width="150"
              height="60"
              viewBox="0 0 150 60"
              aria-hidden="true"
              shapeRendering="crispEdges"
            >
              {/* Computer */}
              <path
                fill="#c0c0c0"
                stroke="#808080"
                strokeWidth="3"
                d="M3 7h35v29H3z"
              />
              <path fill="#fff" d="M8 12h25v19H8z" />
              <path fill="#808080" d="M17 37h8v6h12v5H5v-5h12z" />

              {/* Connection dots */}
              <g fill="#222">
                <rect x="51" y="24" width="3" height="3" />
                <rect x="67" y="24" width="3" height="3" />
                <rect x="83" y="24" width="3" height="3" />
              </g>

              {/* Modem */}
              <path
                fill="#333"
                stroke="#808080"
                strokeWidth="2"
                d="M103 20h43v20h-43z"
              />
              <path fill="#76d44b" d="M109 33h3v3h-3z" />
            </svg>

            <div className="cv-dialup-status" role="status">
              <p>
                {stage === "connecting"
                  ? "Establishing connection…"
                  : "Ready to connect"}
              </p>

              <p className="cv-dialup-detail">
                {stage === "connecting" ? detail : "Arriann Online · 56K Modem"}
              </p>
            </div>
          </div>

          <div
            className="cv-dialup-progress"
            role="progressbar"
            aria-label="Connection progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="cv-dialup-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="cv-dialup-percentage">{progress}%</p>

          <div className="cv-dialup-help-slot">
            {showHelp && (
              <p className="cv-dialup-help">
                Best experienced with sound on.
                <br />A nostalgic dial-up simulation. Your actual Internet
                connection is unaffected.
              </p>
            )}
          </div>

          <div className="cv-dialup-actions">
            <button
              type="button"
              className="cv-dialup-button"
              onClick={stage === "connecting" ? reset : connect}
            >
              {stage === "connecting" ? "Cancel" : "Connect"}
            </button>

            <button
              type="button"
              className="cv-dialup-button"
              aria-expanded={showHelp}
              onClick={() => setShowHelp((current) => !current)}
            >
              Help
            </button>
          </div>
        </>
      )}
    </div>
  );
}

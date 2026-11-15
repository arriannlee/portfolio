"use client";

import { useEffect, useRef } from "react";

type RetroScreensaverProps = {
  onExit: () => void;
};

export default function RetroScreensaver({
  onExit,
}: RetroScreensaverProps) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;

    screenRef.current?.focus();

    return () => {
      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <div
      ref={screenRef}
      className="retro-screensaver"
      role="button"
      tabIndex={0}
      aria-label="Screensaver. Move the pointer, click or press any key to return."
      onPointerMove={onExit}
      onPointerDown={onExit}
      onKeyDown={(event) => {
        event.preventDefault();
        onExit();
      }}
    >
      <div className="retro-screensaver-horizontal">
        <div className="retro-screensaver-text">
          ARRIANN LEE CV
        </div>
      </div>

      <span className="retro-screensaver-hint">
        Move your mouse or press any key to return
      </span>
    </div>
  );
}

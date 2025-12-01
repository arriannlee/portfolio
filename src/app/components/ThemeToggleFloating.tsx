"use client";

import ThemeToggle from "./ThemeToggle";

export default function ThemeToggleFloating() {
  return (
    <div
      className="fixed top-3 right-3 z-50"
      style={{
        // avoid iOS notch are
        insetBlockStart: "max(0.75rem, env(safe-area-inset-top))",
        insetInlineEnd: "max(0.75rem, env(safe-area-inset-right))",
      }}
    >
      {/* Big enough for a11y (44px target) */}
      <div className="rounded-xl shadow-lg backdrop-blur-sm bg-bg/70 border border-accent/20">
        <ThemeToggle />
      </div>
    </div>
  );
}

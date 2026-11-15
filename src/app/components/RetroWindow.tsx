"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import RetroScrollArea from "./RetroScrollArea";

type RetroWindowProps = {
  title: string;
  children: ReactNode;
  showScrollbar?: boolean;
  variant?: "default" | "compact";
  allowMaximise?: boolean;
  onClose: () => void;
  onMinimise: () => void;
  onToggleMaximise: () => void;
  onFocus: () => void;
  isActive: boolean;
  isMaximised: boolean;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originalX: number;
  originalY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export default function RetroWindow({
  title,
  children,
  showScrollbar = true,
  variant = "default",
  allowMaximise = true,
  onClose,
  onMinimise,
  onToggleMaximise,
  onFocus,
  isActive,
  isMaximised,
}: RetroWindowProps) {
  const windowRef = useRef<HTMLElement>(null);
  const drag = useRef<DragState | null>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    if (isMaximised || event.button !== 0) return;

    const element = windowRef.current;
    const parent = element?.parentElement;

    if (!element || !parent) return;

    const windowBounds = element.getBoundingClientRect();
    const desktopBounds = parent.getBoundingClientRect();

    const minX = position.x + desktopBounds.left - windowBounds.left;
    const minY = position.y + desktopBounds.top - windowBounds.top;

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originalX: position.x,
      originalY: position.y,
      minX,
      maxX: Math.max(
        minX,
        position.x + desktopBounds.right - windowBounds.right,
      ),
      minY,
      maxY: Math.max(
        minY,
        position.y + desktopBounds.bottom - windowBounds.bottom,
      ),
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;

    if (!current || current.pointerId !== event.pointerId) return;
    if (isMaximised) return;

    const nextX = current.originalX + event.clientX - current.startX;
    const nextY = current.originalY + event.clientY - current.startY;

    setPosition({
      x: Math.max(current.minX, Math.min(current.maxX, nextX)),
      y: Math.max(current.minY, Math.min(current.maxY, nextY)),
    });
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;

    drag.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section
      ref={windowRef}
      className={[
        "retro-window",
        variant === "compact" ? "retro-window--compact" : "",
        isActive ? "is-active" : "",
        isMaximised ? "is-maximised" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transform: isMaximised
          ? "none"
          : `translate(${position.x}px, ${position.y}px)`,
      }}
      aria-label={title}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
    >
      {/* Window title bar */}

      <div
        className="retro-window-titlebar"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={() => {
          drag.current = null;
        }}
        onDoubleClick={(event) => {
          if (!allowMaximise) return;
          if ((event.target as HTMLElement).closest("button")) return;

          onToggleMaximise();
        }}
      >
        <span className="retro-window-title">{title}</span>

        <div className="retro-window-controls">
          {/* Minimise button */}

          <button
            type="button"
            className="retro-window-control"
            aria-label={`Minimise ${title}`}
            onClick={onMinimise}
          >
            <span className="retro-icon-minimise" aria-hidden="true" />
          </button>

          {/* Maximise button */}

          <button
            type="button"
            className="retro-window-control"
            aria-label={isMaximised ? `Restore ${title}` : `Maximise ${title}`}
            onClick={onToggleMaximise}
            disabled={!allowMaximise}
          >
            <span
              className={
                isMaximised ? "retro-icon-restore" : "retro-icon-maximise"
              }
              aria-hidden="true"
            />
          </button>

          {/* Close button */}

          <button
            type="button"
            className="retro-window-control"
            aria-label={`Close ${title}`}
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      {/* Window content */}

      {title === "My CV" ? (
        <div className="retro-pdf-area">{children}</div>
      ) : showScrollbar ? (
        <RetroScrollArea>{children}</RetroScrollArea>
      ) : (
        <div className="retro-scroll-area retro-scroll-area--no-bar">
          <div
            className="retro-window-content retro-scroll-viewport"
            tabIndex={0}
            role="region"
            aria-label={`${title} content`}
          >
            <div className="retro-scroll-inner">{children}</div>
          </div>
        </div>
      )}

      {/* Window status bar */}

      <div className="retro-window-status">
        <span>Ready</span>
        <span>v 14.11.26</span>
      </div>
    </section>
  );
}

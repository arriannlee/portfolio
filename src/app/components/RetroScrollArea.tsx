"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";

export default function RetroScrollArea({
  children,
}: {
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const drag = useRef<{
    pointerId: number;
    startY: number;
    startScroll: number;
  } | null>(null);

  const [metrics, setMetrics] = useState({
    height: 0,
    contentHeight: 0,
    trackHeight: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    const track = trackRef.current;

    if (!viewport || !content || !track) return;

    function measure() {
      if (!viewport || !track) return;

      setMetrics({
        height: viewport.clientHeight,
        contentHeight: viewport.scrollHeight,
        trackHeight: track.clientHeight,
        scrollTop: viewport.scrollTop,
      });
    }

    const observer = new ResizeObserver(measure);

    observer.observe(viewport);
    observer.observe(content);
    observer.observe(track);

    measure();

    return () => observer.disconnect();
  }, []);

  const maxScroll = Math.max(
    0,
    metrics.contentHeight - metrics.height,
  );

  const thumbHeight =
    metrics.contentHeight > 0
      ? Math.min(
          metrics.trackHeight,
          Math.max(
            24,
            (metrics.height / metrics.contentHeight) *
              metrics.trackHeight,
          ),
        )
      : metrics.trackHeight;

  const thumbTravel = Math.max(
    0,
    metrics.trackHeight - thumbHeight,
  );

  const thumbTop =
    maxScroll > 0
      ? (metrics.scrollTop / maxScroll) * thumbTravel
      : 0;

  function scrollBy(amount: number) {
    viewportRef.current?.scrollBy({
      top: amount,
      behavior: "instant",
    });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || maxScroll === 0) return;

    drag.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScroll: viewportRef.current?.scrollTop ?? 0,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    const viewport = viewportRef.current;

    if (
      !current ||
      !viewport ||
      current.pointerId !== event.pointerId ||
      thumbTravel === 0
    ) {
      return;
    }

    viewport.scrollTop =
      current.startScroll +
      ((event.clientY - current.startY) / thumbTravel) *
        maxScroll;
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    drag.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="retro-scroll-area">
      <div
        ref={viewportRef}
        className="retro-window-content retro-scroll-viewport"
        tabIndex={0}
        role="region"
        aria-label="Scrollable window content"
        onScroll={(event) => {
          const scrollTop = event.currentTarget.scrollTop;

          setMetrics((current) => ({
            ...current,
            scrollTop,
          }));
        }}
      >
        <div ref={contentRef} className="retro-scroll-inner">
          {children}
        </div>
      </div>

      <div className="retro-scrollbar">
        <button
          type="button"
          className="retro-scroll-arrow"
          aria-label="Scroll up"
          disabled={maxScroll === 0}
          onClick={() => scrollBy(-60)}
        >
          <span className="retro-arrow-up" aria-hidden="true" />
        </button>

        <div
          ref={trackRef}
          className="retro-scroll-track"
          onPointerDown={(event) => {
            if (event.target !== event.currentTarget) return;

            const bounds =
              event.currentTarget.getBoundingClientRect();

            scrollBy(
              event.clientY - bounds.top < thumbTop
                ? -metrics.height
                : metrics.height,
            );
          }}
        >
          {maxScroll > 0 && (
            <div
              className="retro-scroll-thumb"
              aria-hidden="true"
              style={{
                height: thumbHeight,
                top: thumbTop,
              }}
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              onLostPointerCapture={() => {
                drag.current = null;
              }}
            />
          )}
        </div>

        <button
          type="button"
          className="retro-scroll-arrow"
          aria-label="Scroll down"
          disabled={maxScroll === 0}
          onClick={() => scrollBy(60)}
        >
          <span className="retro-arrow-down" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

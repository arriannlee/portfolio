"use client";

type MinesweeperFaceProps = {
  status: "ready" | "playing" | "won" | "lost";
};

export default function MinesweeperFace({
  status,
}: MinesweeperFaceProps) {
  const isWon = status === "won";
  const isLost = status === "lost";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{
        display: "block",
        imageRendering: "pixelated",
      }}
    >
      {/* Black pixel outline */}
      <path
        d="
          M7 1 H17
          V2 H20
          V4 H22
          V7 H23
          V17 H22
          V20 H20
          V22 H17
          V23 H7
          V22 H4
          V20 H2
          V17 H1
          V7 H2
          V4 H4
          V2 H7
          Z
        "
        fill="#000000"
      />

      {/* Yellow face */}
      <path
        d="
          M7 2 H17
          V3 H19
          V5 H21
          V7 H22
          V17 H21
          V19 H19
          V21 H17
          V22 H7
          V21 H5
          V19 H3
          V17 H2
          V7 H3
          V5 H5
          V3 H7
          Z
        "
        fill="#FFFF00"
      />

      {/* Small highlight */}
      <path
        d="M6 4 H10 V5 H6 Z M4 6 H6 V9 H4 Z"
        fill="#FFFF99"
      />

      {/* NORMAL FACE */}
      {!isWon && !isLost && (
        <>
          {/* Eyes */}
          <rect x="7" y="8" width="2" height="3" fill="#000" />
          <rect x="15" y="8" width="2" height="3" fill="#000" />

          {/* Smile */}
          <rect x="6" y="14" width="2" height="2" fill="#000" />
          <rect x="8" y="16" width="2" height="2" fill="#000" />
          <rect x="10" y="17" width="4" height="2" fill="#000" />
          <rect x="14" y="16" width="2" height="2" fill="#000" />
          <rect x="16" y="14" width="2" height="2" fill="#000" />
        </>
      )}

      {/* LOST FACE */}
      {isLost && (
        <>
          {/* Left X eye */}
          <path
            d="M6 7 H8 V9 H10 V11 H8 V13 H6 V11 H8 V9 H6 Z"
            fill="#000"
          />

          {/* Right X eye */}
          <path
            d="M14 7 H16 V9 H18 V11 H16 V13 H14 V11 H16 V9 H14 Z"
            fill="#000"
          />

          {/* Sad mouth */}
          <rect x="9" y="16" width="6" height="2" fill="#000" />
          <rect x="7" y="18" width="2" height="2" fill="#000" />
          <rect x="15" y="18" width="2" height="2" fill="#000" />
        </>
      )}

      {/* WINNING FACE */}
      {isWon && (
        <>
          {/* Sunglasses */}
          <rect x="5" y="8" width="6" height="4" fill="#000" />
          <rect x="13" y="8" width="6" height="4" fill="#000" />
          <rect x="11" y="9" width="2" height="2" fill="#000" />

          {/* Smile */}
          <rect x="7" y="15" width="2" height="2" fill="#000" />
          <rect x="9" y="17" width="6" height="2" fill="#000" />
          <rect x="15" y="15" width="2" height="2" fill="#000" />
        </>
      )}
    </svg>
  );
}

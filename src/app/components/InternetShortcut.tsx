export default function InternetShortcut({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="retro-desktop-folder"
      onClick={onOpen}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        {/* Globe */}
        <circle
          cx="32"
          cy="15"
          r="13"
          fill="#176ce0"
          stroke="#222"
          strokeWidth="2"
        />

        <path
          fill="#67bd39"
          d="M24 6l9-3 3 6-5 5-7-2-3 5-2-5z
             M34 17l9-4 2 7-6 4-3 4-5-5z"
        />

        {/* Computer */}
        <path
          fill="#c0c0c0"
          stroke="#222"
          strokeWidth="2"
          d="M2 17h27v23H2z"
        />

        <path fill="#000080" d="M6 21h19v14H6z" />
        <path fill="#79cfff" d="M8 23h15v2H8z" />
        <path fill="#fff" d="M3 18h24v2H3z" />

        {/* Stand */}
        <path
          fill="#c0c0c0"
          stroke="#222"
          strokeWidth="2"
          d="M12 40h7v3h8v3H4v-3h8z"
        />

        {/* Connection indicator */}
        <path
          fill="#ffe04b"
          stroke="#222"
          d="M29 25h7v5h5v5h-8v-5h-4z"
        />
      </svg>

      <span className="retro-folder-label">
        Connect to Internet
      </span>
    </button>
  );
}

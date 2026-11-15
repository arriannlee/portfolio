type DesktopFolderProps = {
  label: string;
  onOpen: () => void;
};

export default function DesktopFolder({
  label,
  onOpen,
}: DesktopFolderProps) {
  return (
    <button
      type="button"
      className="retro-desktop-folder"
      onClick={onOpen}
    >
      <span className="retro-folder-icon" aria-hidden="true">
        <span className="retro-folder-front" />
      </span>

      <span className="retro-folder-label">{label}</span>
    </button>
  );
}

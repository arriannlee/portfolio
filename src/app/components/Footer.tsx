// This component renders the footer section of the website
// It includes the current year and the site owner's name

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center bg-[color:var(--color-bg-secondary)]">
      <p className="font-body text-sm text-[color:var(--color-sub-text)]">
        © {new Date().getFullYear()} Arriann Lee
      </p>
    </footer>
  )
}

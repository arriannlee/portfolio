'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme() // resolvedTheme handles system
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggle = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <button
      aria-label="Toggle Theme"
      type="button"
      onClick={toggle}
      className="p-3 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition"
    >
      {/* During SSR + first client render, show a neutral placeholder to avoid mismatch */}
      {!mounted ? (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden />
      ) : resolvedTheme === 'dark' ? (
        // Sun icon (exact attributes; do not vary)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="currentColor" className="w-5 h-5" aria-hidden>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.97 4.97a.75.75 0 011.06 0l1.59 1.59a.75.75 0 11-1.06 1.06L4.97 6.03a.75.75 0 010-1.06zm12.41 12.41a.75.75 0 011.06 0l1.59 1.59a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm18.75 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H21a.75.75 0 01-.75-.75zM4.97 19.03a.75.75 0 000-1.06l1.59-1.59a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 00-1.06 0zm12.41-12.41a.75.75 0 000-1.06l1.59-1.59a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 00-1.06 0zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" />
        </svg>
      ) : (
        // Moon icon (exact attributes; do not vary)
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="currentColor" className="w-5 h-5" aria-hidden>
          <path
            d="M21.752 15.002a9 9 0 11-10.5-12.002 7.5 7.5 0 1010.5 12.002z" />
        </svg>
      )}
    </button>
  )
}
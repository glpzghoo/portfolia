'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light')
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 border rounded-md">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Profile" },
  { href: "/projects", label: "Projects" },
  { href: "/hire-me", label: "Hire Me" },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `px-3 py-2 rounded font-mono text-sm transition-colors ${
      pathname === href
        ? "text-navy-deep dark:text-dk-ink font-medium"
        : "text-slate dark:text-dk-slate hover:text-navy dark:hover:text-dk-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line dark:border-dk-line bg-paper/95 dark:bg-dk-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-navy-deep dark:text-dk-ink">
          RK<span className="text-trace dark:text-dk-trace">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-line dark:bg-dk-line" />
          <button
            onClick={toggle}
            aria-label="Toggle colour theme"
            className="p-2 rounded text-slate dark:text-dk-slate hover:text-navy dark:hover:text-dk-ink transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="/api/resume"
            className="ml-2 rounded border border-navy-deep dark:border-dk-navy px-3 py-2 font-mono text-sm text-navy-deep dark:text-dk-navy hover:bg-navy-deep dark:hover:bg-dk-navy hover:text-white transition-colors"
          >
            Resume ↓
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded text-slate dark:text-dk-slate">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded text-ink dark:text-dk-ink">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line dark:border-dk-line bg-paper dark:bg-dk-bg px-4 py-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a
              href="/api/resume"
              className="mt-2 rounded border border-navy-deep dark:border-dk-navy px-3 py-2 font-mono text-sm text-center text-navy-deep dark:text-dk-navy hover:bg-navy-deep hover:text-white transition-colors"
            >
              Download Resume (PDF) ↓
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

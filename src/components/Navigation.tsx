"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/stammbaum", label: "Stammbaum" },
  { href: "/chronologie", label: "Chronologie" },
  { href: "/tagesloehnerei", label: "Aus der Tageslöhnerei" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(95,61,40,0.14)] bg-[rgba(47,34,24,0.92)] text-stone-50 backdrop-blur-md shadow-[0_12px_30px_rgba(45,36,23,0.24)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
          {/* Logo/Title */}
          <Link href="/" className="min-w-0 flex flex-col leading-tight">
            <span className="truncate text-2xl font-semibold tracking-[0.02em] text-[var(--orange-soft)] sm:text-3xl">Die Schwiesselmänner</span>
            <span className="hidden text-[10px] uppercase tracking-[0.32em] text-[rgba(227,236,222,0.82)] sm:block">Ahnenforschung &amp; Familiengeschichte</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-wrap justify-end gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[var(--orange-deep)] text-white"
                    : "text-[rgba(255,250,241,0.9)] hover:bg-[rgba(227,236,222,0.14)] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-full border border-[rgba(243,214,185,0.2)] p-2 text-[var(--orange-soft)] transition-colors hover:bg-[rgba(227,236,222,0.14)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4">
            <div className="section-shell rounded-2xl p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[var(--green-deep)] text-white"
                    : "text-[var(--brown-deep)] hover:bg-[rgba(227,236,222,0.6)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

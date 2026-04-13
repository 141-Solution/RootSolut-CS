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
    <header className="bg-amber-900 text-amber-50 shadow-lg">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Title */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-wide">Die Schwiesselmänner</span>
            <span className="text-xs text-amber-300 tracking-widest uppercase">Ahnenforschung &amp; Familiengeschichte</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-amber-700 text-white"
                    : "hover:bg-amber-800 text-amber-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-amber-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
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
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-amber-700 text-white"
                    : "hover:bg-amber-800 text-amber-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

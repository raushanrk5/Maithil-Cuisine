"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-gold/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Maithil Cuisine Logo"
              width={100}
              height={100}
              className="w-18 h-18 sm:w-26 sm:h-26"
            />
            <div>
              <div className="font-bold text-base sm:text-lg leading-tight">
                <span className="text-brand-crimson">मैथिल</span>
                <span className="text-brand-navy"> Cuisine</span>
              </div>
              <div className="text-brand-navy/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-semibold">
                Tradition of Taste
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-brand-navy hover:text-brand-crimson font-medium text-sm tracking-wide transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-brand-crimson text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-crimson-light transition-colors whitespace-nowrap"
            >
              Reserve a Table
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-brand-navy"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 border-t border-brand-gold/20 pt-3">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-brand-navy hover:text-brand-crimson font-medium py-3 px-2 border-b border-brand-cream-dark text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-brand-crimson text-white px-5 py-3 rounded-full text-sm font-semibold text-center mt-3"
              onClick={() => setMenuOpen(false)}
            >
              Reserve a Table
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

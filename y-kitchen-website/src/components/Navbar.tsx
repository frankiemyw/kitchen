"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

const navLinks = [
  { label: "Dine-In", href: "#dine-in" },
  { label: "Group Meals", href: "#group-meals" },
  { label: "Catering", href: "#catering" },
  { label: "Canteen Service", href: "#canteen-service" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-xl font-bold text-charcoal tracking-tight">
            {siteConfig.businessName}
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-muted hover:text-charcoal transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-red-brand text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-dark transition-colors"
            >
              Order Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-charcoal"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-warm-border">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2.5 text-base font-medium text-charcoal-muted hover:text-charcoal transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-red-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-dark transition-colors"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Routen", href: "/routen" },
  { label: "Segmente", href: "/segmente" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isPartner =
    pathname?.startsWith("/reederei-dashboard") ||
    pathname?.startsWith("/auth");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold shrink-0" style={{ color: "#0A2342" }}>
          CruiseSplit
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-[#0EA5E9]" : "text-gray-500 hover:text-gray-900"}`}>
              {link.label}
            </Link>
          ))}
          {isPartner ? (
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Zurück
            </Link>
          ) : (
            <Link href="/auth/login"
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0A2342" }}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Menü öffnen"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-xl transition-colors ${pathname === link.href ? "bg-sky-50 text-[#0EA5E9]" : "text-gray-600 hover:bg-gray-50"}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="text-base font-semibold py-2 px-3 rounded-xl text-white text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0A2342" }}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

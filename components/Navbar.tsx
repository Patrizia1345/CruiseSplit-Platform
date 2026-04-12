"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Segmente", href: "/segmente" },
  { label: "Reedereien", href: "/reederei-dashboard" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold"
        style={{ color: "#0A2342" }}
      >
        CruiseSplit
      </Link>

      {/* Primary links */}
      <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${
                  active
                    ? "font-semibold"
                    : "hover:text-[#0EA5E9]"
                }`}
                style={active ? { color: "#0EA5E9" } : {}}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Auth links */}
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="text-sm font-medium text-gray-600 hover:text-[#0EA5E9] transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0EA5E9" }}
        >
          Registrieren
        </Link>
      </div>
    </nav>
  );
}

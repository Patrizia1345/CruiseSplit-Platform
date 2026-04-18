"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const STATIC_NAV_LINKS = [
  { label: "Routen", href: "/routen" },
  { label: "Segmente", href: "/segmente" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPartner, setIsPartner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }: { data: { user: any } }) => {
      const user = data?.user;
      if (user) {
        setIsLoggedIn(true);
        setIsPartner(user.user_metadata?.user_type === "partner");
      }
    });
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsPartner(false);
    router.push("/");
  }

  const navLinks = isPartner
    ? [...STATIC_NAV_LINKS, { label: "Reedereien", href: "/reederei-dashboard" }]
    : STATIC_NAV_LINKS;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold" style={{ color: "#0A2342" }}>
        CruiseSplit
      </Link>
      <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
        {navLinks.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${active ? "font-semibold" : "hover:text-[#0EA5E9]"}`}
                style={active ? { color: "#0EA5E9" } : {}}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#0A2342", color: "#0A2342" }}
          >
            Ausloggen
          </button>
        ) : (
          <>
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-[#0EA5E9] transition-colors">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              Partner werden
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

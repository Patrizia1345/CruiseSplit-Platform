"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      { email, password }
    );

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const userType = data.user?.user_metadata?.user_type;
    if (userType === "partner") {
      router.push("/reederei-dashboard");
    } else {
      router.push("/segmente");
    }
  }

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold" style={{ color: "#0A2342" }}>
              Willkommen zurück
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Noch kein Konto?{" "}
              <a
                href="/auth/register"
                className="font-semibold hover:underline"
                style={{ color: "#0EA5E9" }}
              >
                Jetzt registrieren
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* E-Mail */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                E-Mail
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna@example.com"
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
              />
            </div>

            {/* Passwort */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Passwort
                </label>
                <a
                  href="#"
                  className="text-xs font-medium hover:underline"
                  style={{ color: "#0EA5E9" }}
                >
                  Vergessen?
                </a>
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              {loading ? "Wird geprüft…" : "Einloggen"}
            </button>
          </form>

          {/* Divider + Partner hint */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Partner-Zugang?{" "}
              <a
                href="/auth/register"
                className="font-semibold hover:underline"
                style={{ color: "#0EA5E9" }}
              >
                Als Partner registrieren
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


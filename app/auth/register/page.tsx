"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

type UserType = "private" | "partner";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("private");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
          company_name: userType === "partner" ? company : null,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-full font-sans bg-gray-50">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#0A2342" }}>
              Bestätigungs-E-Mail gesendet
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Bitte prüfe dein Postfach und klicke den Bestätigungslink, um
              dein Konto zu aktivieren.
            </p>
            <a
              href="/auth/login"
              className="mt-6 inline-block text-sm font-semibold"
              style={{ color: "#0EA5E9" }}
            >
              Zum Login →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold" style={{ color: "#0A2342" }}>
              Konto erstellen
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Bereits registriert?{" "}
              <a
                href="/auth/login"
                className="font-semibold hover:underline"
                style={{ color: "#0EA5E9" }}
              >
                Einloggen
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Vorname
                </label>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Anna"
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nachname
                </label>
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Müller"
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Passwort
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mindestens 8 Zeichen"
                minLength={8}
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
              />
            </div>

            {/* Kontoart */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Kontotyp
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "private", label: "Privatkunde", icon: "👤" },
                    {
                      value: "partner",
                      label: "Partner",
                      sublabel: "Reisebüro / Reederei",
                      icon: "🏢",
                    },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex flex-col gap-0.5 border rounded-xl px-4 py-3 cursor-pointer transition-all ${
                      userType === opt.value
                        ? "border-[#0EA5E9] bg-sky-50"
                        : "border-gray-200 hover:border-[#0EA5E9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={opt.value}
                      checked={userType === opt.value}
                      onChange={() => setUserType(opt.value)}
                      className="sr-only"
                    />
                    <span className="text-lg">{opt.icon}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color:
                          userType === opt.value ? "#0EA5E9" : "#0A2342",
                      }}
                    >
                      {opt.label}
                    </span>
                    {"sublabel" in opt && (
                      <span className="text-xs text-gray-400">
                        {opt.sublabel}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Firmenname — nur für Partner */}
            {userType === "partner" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Firmenname
                </label>
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="MSC Cruises GmbH"
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300"
                />
              </div>
            )}

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
              {loading ? "Wird erstellt…" : "Konto erstellen"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


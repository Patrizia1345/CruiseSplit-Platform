import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import PWA from "../pwa";
import CookieBanner from "@/components/CookieBanner";
import { CartProvider } from "@/context/CartContext";
import { routing } from "@/i18n/routing";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" }).catch(() => null);
  return {
    title: t?.("title") ?? "CruiseSplit – Kreuzfahrt-Segmente buchen",
    description:
      t?.("description") ??
      "Buche einzelne Kreuzfahrt-Segmente ab €249. Flexibel, günstig und spontan.",
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "CruiseSplit",
    },
    formatDetection: { telephone: false },
    openGraph: {
      type: "website",
      title: "CruiseSplit",
      description: t?.("description") ?? "Kreuzfahrt-Segmente flexibel buchen",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A2342",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CruiseSplit" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${syne.variable} antialiased`}>
        <NextIntlClientProvider>
          <CartProvider>
            <PWA />
            {children}
            <CookieBanner />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

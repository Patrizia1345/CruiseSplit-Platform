import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWA from "./pwa";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CruiseSplit – Kreuzfahrt-Segmente buchen",
  description: "Buche einzelne Kreuzfahrt-Segmente ab €249. Flexibel, günstig und spontan.",
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
    description: "Kreuzfahrt-Segmente flexibel buchen",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2342",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CruiseSplit" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PWA />
        {children}
      </body>
    </html>
  );
}

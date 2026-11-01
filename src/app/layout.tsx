import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display-face", weight: ["400", "500", "600"], display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono-face", weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Corporate AI Training & Implementation in Nigeria | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1a6fe0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

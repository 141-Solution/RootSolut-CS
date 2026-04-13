import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Die Schwiesselmänner",
  description: "Familienchronik und Ahnenforschung der Familie Schwiesselmann",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${displayFont.variable} ${bodyFont.variable} min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {children}
        </main>
        <footer className="border-t border-[rgba(95,61,40,0.16)] bg-[rgba(255,248,237,0.9)] px-4 py-6 text-center text-sm text-[var(--brown-deep)] sm:px-6">
          <p>© {new Date().getFullYear()} Die Schwiesselmänner · Ahnenforschung &amp; Familiengeschichte</p>
        </footer>
      </body>
    </html>
  );
}

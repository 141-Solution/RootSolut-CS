import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          {children}
        </main>
        <footer className="border-t border-amber-200 bg-amber-50 py-6 text-center text-sm text-amber-800">
          <p>© {new Date().getFullYear()} Die Schwiesselmänner · Ahnenforschung &amp; Familiengeschichte</p>
        </footer>
      </body>
    </html>
  );
}

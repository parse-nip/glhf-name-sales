import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GLHF Names — Gigaverse Username Marketplace",
  description:
    "Buy and sell Gigaverse character names on Abstract. Trade unique on-chain usernames for the GLHF / Gigaverse RPG.",
  openGraph: {
    title: "GLHF Names",
    description: "Marketplace for Gigaverse usernames on Abstract",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full`}>
      <body className="min-h-full bg-[#fafafa] font-sans text-foreground antialiased">
        <Providers>
          <Header />
          <main className="mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
          <footer className="border-t border-border/60 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
              <p>GLHF Names — built for the Gigaverse community</p>
              <div className="flex gap-4">
                <a
                  href="https://gigaverse.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Gigaverse
                </a>
                <a
                  href="https://opensea.io/collection/gigaverse-names"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  OpenSea
                </a>
                <a
                  href="https://www.glhfers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  GLHFers
                </a>
              </div>
            </div>
          </footer>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

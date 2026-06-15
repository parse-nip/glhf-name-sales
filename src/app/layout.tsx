import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Header } from "@/components/header";
import { GlhfSceneBackground, PixelGrid, Scanlines } from "@/components/pixel-effects";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-retro",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gigaverse Names — Username Marketplace on Abstract",
  description:
    "Buy and sell Gigaverse character names on Abstract. Trade unique on-chain usernames for the Gigaverse RPG.",
  openGraph: {
    title: "Gigaverse Names",
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
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} h-full dark`}
    >
      <body className="relative min-h-full font-retro text-foreground antialiased">
        <GlhfSceneBackground />
        <PixelGrid />
        <Scanlines />
        <Providers>
          <Header />
          <main className="relative z-10 mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
            {children}
          </main>
          <footer className="relative z-10 border-t-2 border-border py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-lg text-muted-foreground sm:flex-row sm:px-6">
              <p className="font-pixel text-[8px] tracking-wider">
                GIGAVERSE NAMES MARKETPLACE
              </p>
              <div className="flex gap-6 font-retro text-base">
                <a
                  href="https://gigaverse.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-glhf-gold"
                >
                  Gigaverse
                </a>
                <a
                  href="https://opensea.io/collection/gigaverse-names"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-glhf-gold"
                >
                  OpenSea
                </a>
                <a
                  href="https://x.com/playgigaverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-glhf-gold"
                >
                  @playgigaverse
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

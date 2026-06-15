"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Explore" },
  { href: "/listings", label: "For Sale" },
  { href: "/sell", label: "Sell" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-3 border-border bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="glhf-mascot-frame relative h-9 w-9 overflow-hidden p-0.5 transition-transform group-hover:-translate-y-0.5">
              <Image
                src="/assets/gigaverse-pfp.png"
                alt="Gigaverse"
                width={36}
                height={36}
                className="pixel-art h-full w-full object-cover"
              />
            </div>
            <span className="hidden font-pixel text-[9px] tracking-wider text-foreground sm:block">
              GIGA<span className="text-glhf-gold">NAMES</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 font-retro text-lg transition-colors",
                  pathname === item.href
                    ? "border-b-2 border-glhf-gold text-glhf-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus="address"
        />
      </div>
    </header>
  );
}

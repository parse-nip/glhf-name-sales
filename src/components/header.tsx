"use client";

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
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-glhf-mint bg-glhf-surface font-pixel text-[10px] text-glhf-mint shadow-[2px_2px_0_0_var(--glhf-mint)] transition-transform group-hover:-translate-y-0.5">
              G
            </span>
            <span className="hidden font-pixel text-[10px] tracking-wider text-foreground sm:block">
              GLHF<span className="text-glhf-mint">NAMES</span>
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
                    ? "border-b-2 border-glhf-mint text-glhf-mint"
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

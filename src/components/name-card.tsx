import Image from "next/image";
import Link from "next/link";
import type { NameListing } from "@/lib/types";

export function NameCard({
  listing,
  index = 0,
}: {
  listing: NameListing;
  index?: number;
}) {
  const href = `/name/${listing.tokenId}`;

  return (
    <Link
      href={href}
      className="group glhf-card animate-card-enter block overflow-hidden"
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-[#0a0a14]">
        {listing.imageUrl ? (
          <Image
            src={listing.imageUrl}
            alt={listing.name}
            fill
            className="pixel-art object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#141425] to-[#0a0a14]">
            <span className="font-pixel text-sm text-glhf-mint">
              {listing.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="font-pixel text-[8px] text-glhf-mint">VIEW →</span>
        </div>
      </div>
      <div className="space-y-2 border-t-2 border-border p-3">
        <h3 className="group-hover-glitch truncate font-retro text-xl leading-tight text-foreground group-hover:text-glhf-mint">
          {listing.name}
        </h3>
        <div className="flex items-baseline justify-between">
          <span className="font-pixel text-[7px] tracking-widest text-muted-foreground">
            PRICE
          </span>
          <span className="font-retro text-lg tabular-nums text-glhf-mint">
            {listing.priceEth === "—"
              ? "UNLISTED"
              : `${listing.priceEth} ETH`}
          </span>
        </div>
      </div>
    </Link>
  );
}

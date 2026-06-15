import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { NameListing } from "@/lib/types";

export function NameCard({ listing }: { listing: NameListing }) {
  const href = `/name/${listing.tokenId}`;

  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden border-border/70 bg-card transition-all duration-200 hover:border-border hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted/40">
          {listing.imageUrl ? (
            <Image
              src={listing.imageUrl}
              alt={listing.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/60">
              <span className="font-heading text-2xl font-semibold text-muted-foreground">
                {listing.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-medium leading-tight group-hover:text-primary">
              {listing.name}
            </h3>
            {listing.source === "glhf" && (
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                GLHF
              </Badge>
            )}
          </div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium tabular-nums">
              {listing.priceEth === "—" ? "Not listed" : `${listing.priceEth} ETH`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

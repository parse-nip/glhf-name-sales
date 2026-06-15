import { NameCard } from "@/components/name-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { NameListing } from "@/lib/types";

export function NameGrid({
  listings,
  loading,
}: {
  listings: NameListing[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full border-2 border-border bg-muted" />
            <Skeleton className="h-5 w-2/3 bg-muted" />
            <Skeleton className="h-4 w-1/2 bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="glhf-panel px-6 py-16 text-center">
        <p className="font-pixel text-xs text-muted-foreground">
          NO NAMES FOUND
        </p>
        <p className="mt-2 font-retro text-lg text-muted-foreground">
          Try a different search or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing, index) => (
        <NameCard key={listing.tokenId} listing={listing} index={index} />
      ))}
    </div>
  );
}

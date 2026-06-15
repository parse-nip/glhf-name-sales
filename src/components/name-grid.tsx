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
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <p className="font-heading text-lg text-muted-foreground">
          No names found
        </p>
        <p className="mt-1 text-sm text-muted-foreground/80">
          Try a different search or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing) => (
        <NameCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { NameGrid } from "@/components/name-grid";
import type { NameListing } from "@/lib/types";

export function ListingsPage() {
  const [listings, setListings] = useState<NameListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/names?limit=48")
      .then((r) => r.json())
      .then((d) => setListings(d.listings ?? []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="glhf-panel space-y-3 px-6 py-8">
        <p className="font-pixel text-[10px] tracking-[0.3em] text-glhf-purple">
          LIVE LISTINGS
        </p>
        <h1 className="font-pixel text-lg text-foreground sm:text-xl">
          FOR SALE
        </h1>
        <p className="font-retro text-xl text-muted-foreground">
          Unique Gigaverse names currently listed. One card per name — lowest
          price shown.
        </p>
      </div>
      <NameGrid listings={listings} loading={loading} />
    </div>
  );
}

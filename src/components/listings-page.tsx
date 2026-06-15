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
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          For Sale
        </h1>
        <p className="text-muted-foreground">
          All Gigaverse names currently listed on OpenSea and GLHF Names.
        </p>
      </div>
      <NameGrid listings={listings} loading={loading} />
    </div>
  );
}

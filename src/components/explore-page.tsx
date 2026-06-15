"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { NameGrid } from "@/components/name-grid";
import type { NameListing } from "@/lib/types";

export function ExplorePage() {
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState<NameListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalSupply: number;
    floorPriceEth: string | null;
    listedCount: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => null);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "24" });
        if (query.trim()) params.set("q", query.trim());
        const res = await fetch(`/api/names?${params}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setListings(data.listings ?? []);
      } catch {
        if (!controller.signal.aborted) setListings([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 300 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Gigaverse Names
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Trade unique Gigaverse usernames on Abstract. Each name is an
            on-chain NFT that becomes your in-game identity.
          </p>
        </div>

        {stats && (
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Total names </span>
              <span className="font-medium tabular-nums">
                {stats.totalSupply.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Listed </span>
              <span className="font-medium tabular-nums">
                {stats.listedCount}
              </span>
            </div>
            {stats.floorPriceEth && (
              <div>
                <span className="text-muted-foreground">Floor </span>
                <span className="font-medium tabular-nums">
                  {stats.floorPriceEth} ETH
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <Input
          placeholder="Search names…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md bg-background"
        />
        <NameGrid listings={listings} loading={loading} />
      </section>
    </div>
  );
}

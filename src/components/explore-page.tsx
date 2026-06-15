"use client";

import { useEffect, useState } from "react";
import { HeroBanner } from "@/components/hero-banner";
import { NameGrid } from "@/components/name-grid";
import { StatPill } from "@/components/stat-pill";
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
      <HeroBanner />

      {stats && (
        <div className="flex flex-wrap gap-3">
          <StatPill
            label="Total Names"
            value={stats.totalSupply.toLocaleString()}
          />
          <StatPill label="Listed" value={String(stats.listedCount)} />
          {stats.floorPriceEth && (
            <StatPill
              label="Floor"
              value={`${stats.floorPriceEth} ETH`}
              highlight
            />
          )}
        </div>
      )}

      <section className="space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search names"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`glhf-input w-full px-4 py-3 text-xl text-foreground placeholder:text-muted-foreground focus:outline-none ${!query ? "animate-blink-cursor" : ""}`}
          />
        </div>
        <NameGrid listings={listings} loading={loading} />
      </section>
    </div>
  );
}

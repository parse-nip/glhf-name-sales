"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MarketplaceListingBuy,
  useMarketplaceListing,
} from "@/components/sell-page";
import { MARKETPLACE_ADDRESS } from "@/lib/constants";
import { formatEthPrice } from "@/lib/opensea";
import type { GigaNameNFT } from "@/lib/types";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function NameDetailPage({ tokenId }: { tokenId: string }) {
  const [nft, setNft] = useState<GigaNameNFT | null>(null);
  const [gigaMeta, setGigaMeta] = useState<{
    name: string;
    description: string;
    image?: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
  } | null>(null);
  const [openseaPrice, setOpenseaPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const glhfListing = useMarketplaceListing(tokenId);

  useEffect(() => {
    Promise.all([
      fetch(`/api/name/${tokenId}`).then((r) => r.json()),
      fetch("/api/names?limit=100").then((r) => r.json()),
    ])
      .then(([nameData, listingsData]) => {
        setNft(nameData.nft);
        setGigaMeta(nameData.gigaMeta);
        const match = (listingsData.listings ?? []).find(
          (l: { tokenId: string; priceWei: string }) => l.tokenId === tokenId
        );
        if (match?.priceWei && match.priceWei !== "0") {
          setOpenseaPrice(match.priceWei);
        }
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [tokenId]);

  if (loading) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  const name = gigaMeta?.name ?? nft?.name ?? "Unknown";
  const imageUrl = nft?.display_image_url ?? nft?.image_url ?? gigaMeta?.image;
  const description =
    gigaMeta?.description ??
    nft?.description ??
    "A tradable Gigaverse username on Abstract.";

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-6xl font-semibold text-muted-foreground">
              {name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Gigaverse Name</Badge>
            <Badge variant="outline">Abstract</Badge>
          </div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            {name}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Separator />

        <Card>
          <CardContent className="space-y-4 pt-6">
            {glhfListing && MARKETPLACE_ADDRESS !== ZERO_ADDRESS ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">
                    GLHF Names price
                  </span>
                  <span className="text-2xl font-semibold tabular-nums">
                    {formatEthPrice(glhfListing.price.toString())} ETH
                  </span>
                </div>
                <MarketplaceListingBuy
                  listingId={glhfListing.listingId}
                  priceWei={glhfListing.price}
                />
              </>
            ) : openseaPrice ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">
                    OpenSea price
                  </span>
                  <span className="text-2xl font-semibold tabular-nums">
                    {formatEthPrice(openseaPrice)} ETH
                  </span>
                </div>
                <a
                  href={`https://opensea.io/assets/abstract/0x57e8994e2ac2e49974b0ae685c15b468d1c09259/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Buy on OpenSea
                </a>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                This name is not currently listed for sale.
              </p>
            )}
          </CardContent>
        </Card>

        {gigaMeta?.attributes && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Properties
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {gigaMeta.attributes.map((attr) => (
                <div
                  key={attr.trait_type}
                  className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2"
                >
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {attr.trait_type}
                  </p>
                  <p className="font-medium">{String(attr.value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground">Contract: </span>
            <Link
              href="https://abscan.org/address/0x57E8994e2Ac2e49974b0aE685C15b468d1C09259"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs underline"
            >
              0x57E8…9259
            </Link>
          </p>
          <p>
            <span className="text-foreground">Token ID: </span>
            <span className="break-all font-mono text-xs">{tokenId}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            ← Back to explore
          </Link>
          <a
            href="https://gigaverse.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Play Gigaverse
          </a>
        </div>
      </div>
    </div>
  );
}

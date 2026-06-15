"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <div className="glhf-panel relative aspect-square overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="pixel-art object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-pixel text-2xl text-glhf-mint">
              {name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="font-pixel text-[8px] tracking-widest text-glhf-purple">
            GIGA-NAME
          </p>
          <h1 className="font-pixel text-xl leading-relaxed text-foreground sm:text-2xl">
            {name.toUpperCase()}
          </h1>
          <p className="font-retro text-xl text-muted-foreground">{description}</p>
        </div>

        <div className="h-0.5 w-full bg-border" />

        <div className="glhf-panel space-y-4 p-5">
            {glhfListing && MARKETPLACE_ADDRESS !== ZERO_ADDRESS ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="font-pixel text-[7px] tracking-widest text-muted-foreground">
                    GLHF PRICE
                  </span>
                  <span className="font-retro text-2xl tabular-nums text-glhf-mint">
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
                  <span className="font-pixel text-[7px] tracking-widest text-muted-foreground">
                    OPENSEA
                  </span>
                  <span className="font-retro text-2xl tabular-nums text-glhf-mint">
                    {formatEthPrice(openseaPrice)} ETH
                  </span>
                </div>
                <a
                  href={`https://opensea.io/assets/abstract/0x57e8994e2ac2e49974b0ae685c15b468d1c09259/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-full items-center justify-center border-2 border-glhf-mint bg-glhf-mint font-pixel text-[9px] text-primary-foreground shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
                >
                  BUY ON OPENSEA
                </a>
              </>
            ) : (
              <p className="text-center font-retro text-lg text-muted-foreground">
                Not listed for sale.
              </p>
            )}
        </div>

        {gigaMeta?.attributes && (
          <div className="space-y-3">
            <h2 className="font-pixel text-[8px] tracking-widest text-muted-foreground">
              PROPERTIES
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {gigaMeta.attributes.map((attr) => (
                <div
                  key={attr.trait_type}
                  className="glhf-stat-pill px-3 py-2"
                >
                  <p className="font-pixel text-[7px] tracking-wider text-muted-foreground">
                    {attr.trait_type}
                  </p>
                  <p className="font-retro text-lg">{String(attr.value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 font-retro text-base text-muted-foreground">
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
            className="inline-flex h-10 items-center justify-center border-2 border-border bg-glhf-surface px-4 font-pixel text-[8px] transition-colors hover:border-glhf-mint hover:text-glhf-mint"
          >
            ← EXPLORE
          </Link>
          <a
            href="https://gigaverse.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center border-2 border-glhf-purple px-4 font-pixel text-[8px] text-glhf-purple transition-colors hover:bg-glhf-purple hover:text-background"
          >
            PLAY GAME
          </a>
        </div>
      </div>
    </div>
  );
}

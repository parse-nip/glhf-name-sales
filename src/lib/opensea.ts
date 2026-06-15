import { formatEther, parseEther } from "viem";
import type { GigaNameNFT, NameListing, OpenSeaListing } from "./types";

const OPENSEA_API = "https://api.opensea.io/api/v2";

function getApiKey() {
  return process.env.OPENSEA_API_KEY ?? "";
}

async function openseaFetch<T>(path: string): Promise<T> {
  const key = getApiKey();
  const res = await fetch(`${OPENSEA_API}${path}`, {
    headers: key ? { "x-api-key": key } : {},
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`OpenSea API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function formatEthPrice(wei: string): string {
  const eth = Number(formatEther(BigInt(wei)));
  if (eth === 0) return "0";
  if (eth < 0.0001) return eth.toExponential(2);
  return eth.toFixed(eth < 1 ? 4 : 3);
}

export function nftToListing(nft: GigaNameNFT, priceWei?: string): NameListing {
  return {
    id: nft.identifier,
    source: "opensea",
    tokenId: nft.identifier,
    name: nft.name,
    imageUrl: nft.display_image_url || nft.image_url,
    priceWei: priceWei ?? "0",
    priceEth: priceWei ? formatEthPrice(priceWei) : "—",
  };
}

export function openSeaListingToNameListing(
  listing: OpenSeaListing,
  nft?: GigaNameNFT
): NameListing {
  const priceWei = listing.price.current.value;
  return {
    id: listing.order_hash,
    source: "opensea",
    tokenId: listing.asset.identifier,
    name: nft?.name ?? `Name #${listing.asset.identifier.slice(0, 8)}…`,
    imageUrl: nft?.display_image_url ?? nft?.image_url ?? "",
    priceWei,
    priceEth: formatEthPrice(priceWei),
    orderHash: listing.order_hash,
  };
}

export async function fetchCollectionStats() {
  const data = await openseaFetch<{
    total_supply: number;
    floor_price?: number;
  }>(`/collections/gigaverse-names`);

  const listings = await fetchListings(50);
  const floor = listings.length
    ? listings.reduce((min, l) =>
        BigInt(l.priceWei) < BigInt(min.priceWei) ? l : min
      ).priceEth
    : null;

  return {
    totalSupply: data.total_supply ?? 0,
    floorPriceEth: floor,
    listedCount: listings.length,
  };
}

export async function fetchNFTs(limit = 24, cursor?: string) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("next", cursor);

  const data = await openseaFetch<{ nfts: GigaNameNFT[]; next?: string }>(
    `/chain/abstract/contract/0x57E8994e2Ac2e49974b0aE685C15b468d1C09259/nfts?${params}`
  );

  return data;
}

export async function fetchNFT(tokenId: string) {
  const data = await openseaFetch<{ nft: GigaNameNFT }>(
    `/chain/abstract/contract/0x57E8994e2Ac2e49974b0aE685C15b468d1C09259/nfts/${tokenId}`
  );
  return data.nft;
}

export async function fetchListings(limit = 48) {
  const data = await openseaFetch<{ listings: OpenSeaListing[] }>(
    `/listings/collection/gigaverse-names/all?limit=${limit}`
  );

  const tokenIds = [...new Set(data.listings.map((l) => l.asset.identifier))];
  const nftMap = new Map<string, GigaNameNFT>();

  await Promise.all(
    tokenIds.slice(0, 20).map(async (id) => {
      try {
        const nft = await fetchNFT(id);
        nftMap.set(id, nft);
      } catch {
        /* skip */
      }
    })
  );

  return data.listings
    .filter((l) => l.status === "ACTIVE")
    .map((l) => openSeaListingToNameListing(l, nftMap.get(l.asset.identifier)));
}

export async function searchNames(query: string, limit = 24) {
  const listings = await fetchListings(100);
  const q = query.toLowerCase().trim();

  if (!q) return listings.slice(0, limit);

  return listings.filter((l) => l.name.toLowerCase().includes(q)).slice(0, limit);
}

export async function fetchGigaverseMetadata(tokenId: string) {
  const res = await fetch(
    `https://gigaverse.io/api/metadata/username/data/${tokenId}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json() as Promise<{
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
  }>;
}

export { parseEther, formatEther };

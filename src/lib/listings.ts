import type { NameListing } from "./types";

/**
 * OpenSea can return multiple active orders for the same tokenId.
 * Keep one listing per name — lowest price wins.
 */
export function dedupeListingsByTokenId(listings: NameListing[]): NameListing[] {
  const byToken = new Map<string, NameListing>();

  for (const listing of listings) {
    const existing = byToken.get(listing.tokenId);
    if (!existing) {
      byToken.set(listing.tokenId, listing);
      continue;
    }

    const existingPrice = BigInt(existing.priceWei || "0");
    const nextPrice = BigInt(listing.priceWei || "0");

    if (nextPrice < existingPrice || existingPrice === 0n) {
      byToken.set(listing.tokenId, listing);
    }
  }

  return Array.from(byToken.values()).sort((a, b) => {
    const priceA = BigInt(a.priceWei || "0");
    const priceB = BigInt(b.priceWei || "0");
    if (priceA === priceB) return a.name.localeCompare(b.name);
    if (priceA === 0n) return 1;
    if (priceB === 0n) return -1;
    return priceA < priceB ? -1 : 1;
  });
}

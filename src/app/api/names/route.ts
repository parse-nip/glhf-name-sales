import { NextResponse } from "next/server";
import { fetchListings, fetchNFTs, searchNames } from "@/lib/opensea";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const type = searchParams.get("type") ?? "listings";
  const limit = Number(searchParams.get("limit") ?? "24");

  try {
    if (q) {
      const results = await searchNames(q, limit);
      return NextResponse.json({ listings: results });
    }

    if (type === "nfts") {
      const cursor = searchParams.get("cursor") ?? undefined;
      const data = await fetchNFTs(limit, cursor);
      return NextResponse.json(data);
    }

    const listings = await fetchListings(limit);
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("API /names error:", error);
    return NextResponse.json(
      { error: "Failed to fetch names" },
      { status: 500 }
    );
  }
}

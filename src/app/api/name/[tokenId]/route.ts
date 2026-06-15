import { NextResponse } from "next/server";
import { fetchGigaverseMetadata, fetchNFT } from "@/lib/opensea";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await params;

  try {
    const [nft, gigaMeta] = await Promise.all([
      fetchNFT(tokenId).catch(() => null),
      fetchGigaverseMetadata(tokenId),
    ]);

    return NextResponse.json({ nft, gigaMeta });
  } catch (error) {
    console.error("API /name error:", error);
    return NextResponse.json(
      { error: "Failed to fetch name" },
      { status: 500 }
    );
  }
}

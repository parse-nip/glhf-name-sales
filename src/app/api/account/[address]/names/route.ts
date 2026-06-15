import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  const key = process.env.OPENSEA_API_KEY ?? "";

  try {
    const res = await fetch(
      `https://api.opensea.io/api/v2/chain/abstract/account/${address}/nfts?collection=gigaverse-names&limit=50`,
      {
        headers: key ? { "x-api-key": key } : {},
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ nfts: [] });
    }

    const data = await res.json();
    return NextResponse.json({
      nfts: (data.nfts ?? []).map(
        (n: {
          identifier: string;
          name: string;
          display_image_url: string;
        }) => ({
          tokenId: n.identifier,
          name: n.name,
          imageUrl: n.display_image_url,
        })
      ),
    });
  } catch {
    return NextResponse.json({ nfts: [] });
  }
}

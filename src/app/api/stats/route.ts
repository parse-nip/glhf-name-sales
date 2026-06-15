import { NextResponse } from "next/server";
import { fetchCollectionStats } from "@/lib/opensea";

export async function GET() {
  try {
    const stats = await fetchCollectionStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("API /stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

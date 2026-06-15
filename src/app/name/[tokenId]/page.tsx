import { NameDetailPage } from "@/components/name-detail-page";

export default async function NameRoute({
  params,
}: {
  params: Promise<{ tokenId: string }>;
}) {
  const { tokenId } = await params;
  return <NameDetailPage tokenId={tokenId} />;
}

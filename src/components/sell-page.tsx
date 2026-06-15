"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GIGA_NAME_NFT,
  MARKETPLACE_ADDRESS,
} from "@/lib/constants";
import { gigaNameNftAbi, marketplaceAbi } from "@/lib/abis";
import { abstractChain } from "@/lib/wagmi";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function SellPage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync, data: txHash, isPending } = useWriteContract();
  const { isLoading: confirming } = useWaitForTransactionReceipt({ hash: txHash });

  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [ownedNames, setOwnedNames] = useState<
    Array<{ tokenId: string; name: string; imageUrl: string }>
  >([]);
  const [loadingOwned, setLoadingOwned] = useState(false);

  const marketplaceDeployed = MARKETPLACE_ADDRESS !== ZERO_ADDRESS;

  const loadOwnedNames = useCallback(async () => {
    if (!address) return;
    setLoadingOwned(true);
    try {
      const res = await fetch(`/api/account/${address}/names`);
      if (res.ok) {
        const data = await res.json();
        setOwnedNames(data.nfts ?? []);
      }
    } catch {
      toast.error("Could not load your names");
    } finally {
      setLoadingOwned(false);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected) loadOwnedNames();
  }, [isConnected, loadOwnedNames]);

  const handleList = async () => {
    if (!marketplaceDeployed) {
      toast.error("Marketplace contract not deployed yet");
      return;
    }
    if (!tokenId || !price || !address) {
      toast.error("Enter token ID and price");
      return;
    }

    try {
      const priceWei = parseEther(price);

      await writeContractAsync({
        chain: abstractChain,
        account: address,
        address: GIGA_NAME_NFT,
        abi: gigaNameNftAbi,
        functionName: "setApprovalForAll",
        args: [MARKETPLACE_ADDRESS, true],
      });

      await writeContractAsync({
        chain: abstractChain,
        account: address,
        address: MARKETPLACE_ADDRESS,
        abi: marketplaceAbi,
        functionName: "list",
        args: [GIGA_NAME_NFT, BigInt(tokenId), priceWei],
      });

      toast.success("Name listed successfully!");
      setTokenId("");
      setPrice("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Listing failed");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Sell a Name
        </h1>
        <p className="text-muted-foreground">
          List your Gigaverse name NFT for sale. Buyers pay in ETH on Abstract.
        </p>
      </div>

      {!marketplaceDeployed && (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <CardContent className="pt-6 text-sm text-muted-foreground">
            The GLHF marketplace contract is not deployed yet. You can still
            list on{" "}
            <a
              href="https://opensea.io/collection/gigaverse-names"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline"
            >
              OpenSea
            </a>
            . Deploy the contract and set{" "}
            <code className="rounded bg-muted px-1">NEXT_PUBLIC_MARKETPLACE_ADDRESS</code>{" "}
            to enable direct listings here.
          </CardContent>
        </Card>
      )}

      {isConnected && ownedNames.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Your names
          </h2>
          <div className="grid gap-2">
            {ownedNames.map((n) => (
              <button
                key={n.tokenId}
                type="button"
                onClick={() => setTokenId(n.tokenId)}
                className="flex items-center justify-between rounded-lg border border-border/70 px-4 py-3 text-left transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">{n.name}</span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  Select
                </Badge>
              </button>
            ))}
          </div>
        </section>
      )}

      {isConnected && loadingOwned && (
        <p className="text-sm text-muted-foreground">Loading your names…</p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Create listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenId">Token ID</Label>
            <Input
              id="tokenId"
              placeholder="Paste token ID or select above"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.0001"
              min="0"
              placeholder="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Separator />
          <Button
            onClick={handleList}
            disabled={!isConnected || !marketplaceDeployed || isPending || confirming}
            className="w-full"
          >
            {!isConnected
              ? "Connect wallet to list"
              : isPending || confirming
                ? "Confirming…"
                : "List for sale"}
          </Button>
          <p className="text-xs text-muted-foreground">
            2.5% platform fee on sales. Royalties apply per Gigaverse collection
            terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function MarketplaceListingBuy({
  listingId,
  priceWei,
}: {
  listingId: number;
  priceWei: bigint;
}) {
  const { address } = useAccount();
  const { writeContractAsync, data: txHash, isPending } = useWriteContract();
  const { isLoading: confirming } = useWaitForTransactionReceipt({ hash: txHash });

  const handleBuy = async () => {
    if (!address) return;
    try {
      await writeContractAsync({
        chain: abstractChain,
        account: address,
        address: MARKETPLACE_ADDRESS,
        abi: marketplaceAbi,
        functionName: "buy",
        args: [BigInt(listingId)],
        value: priceWei,
      });
      toast.success("Purchase successful!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Purchase failed");
    }
  };

  return (
    <Button
      onClick={handleBuy}
      disabled={isPending || confirming}
      className="w-full"
      size="lg"
    >
      {isPending || confirming
        ? "Confirming…"
        : `Buy for ${formatEther(priceWei)} ETH`}
    </Button>
  );
}

export { MarketplaceListingBuy };

export function useMarketplaceListing(tokenId: string) {
  const publicClient = usePublicClient();
  const [listing, setListing] = useState<{
    listingId: number;
    price: bigint;
    seller: string;
  } | null>(null);

  const { data: nextId } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "nextListingId",
    query: { enabled: MARKETPLACE_ADDRESS !== ZERO_ADDRESS },
  });

  useEffect(() => {
    if (!publicClient || !nextId || MARKETPLACE_ADDRESS === ZERO_ADDRESS) return;

    (async () => {
      const id = Number(nextId);
      for (let i = 1; i < id; i++) {
        const result = await publicClient.readContract({
          address: MARKETPLACE_ADDRESS,
          abi: marketplaceAbi,
          functionName: "listings",
          args: [BigInt(i)],
        });
        const [seller, , tid, price, active] = result as [
          string,
          string,
          bigint,
          bigint,
          boolean,
        ];
        if (active && tid.toString() === tokenId) {
          setListing({ listingId: i, price, seller });
          return;
        }
      }
      setListing(null);
    })();
  }, [publicClient, nextId, tokenId]);

  return listing;
}

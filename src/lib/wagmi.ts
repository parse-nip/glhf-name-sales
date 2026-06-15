"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { ABSTRACT_CHAIN_ID, ABSTRACT_RPC } from "./constants";

export const abstractChain = defineChain({
  id: ABSTRACT_CHAIN_ID,
  name: "Abstract",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [ABSTRACT_RPC] },
  },
  blockExplorers: {
    default: { name: "Abscan", url: "https://abscan.org" },
  },
});

export const wagmiConfig = getDefaultConfig({
  appName: "GLHF Names",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "demo-project-id",
  chains: [abstractChain],
  ssr: true,
});

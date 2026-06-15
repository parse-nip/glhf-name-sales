export const ABSTRACT_CHAIN_ID = 2741;

export const ABSTRACT_RPC = "https://api.mainnet.abs.xyz";

export const GIGA_NAME_NFT =
  "0x57E8994e2Ac2e49974b0aE685C15b468d1C09259" as const;

export const GIGAVERSE_CONTRACTS = {
  GigaNameNFT: GIGA_NAME_NFT,
  AccountSystem: "0x5f8b7eb615D5FCE81fafFb107450EdE201384C00",
  GigaNoobNFT: "0x8C98B3a36C0d9e7893Eb848FDf5b4658aDFe0732",
} as const;

// Set after deployment — update via NEXT_PUBLIC_MARKETPLACE_ADDRESS env
export const MARKETPLACE_ADDRESS = (process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS ??
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const OPENSEA_COLLECTION = "gigaverse-names";

export const abstractChain = {
  id: ABSTRACT_CHAIN_ID,
  name: "Abstract",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [ABSTRACT_RPC] },
    public: { http: [ABSTRACT_RPC] },
  },
  blockExplorers: {
    default: { name: "Abscan", url: "https://abscan.org" },
  },
} as const;

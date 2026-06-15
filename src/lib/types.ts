export interface GigaNameNFT {
  identifier: string;
  name: string;
  description: string;
  image_url: string;
  display_image_url: string;
  metadata_url: string;
  opensea_url: string;
  traits?: Array<{ trait_type: string; value: string | number }>;
}

export interface OpenSeaListing {
  order_hash: string;
  chain: string;
  price: {
    current: {
      currency: string;
      decimals: number;
      value: string;
    };
  };
  asset: {
    identifier: string;
    contract: string;
  };
  status: string;
}

export interface NameListing {
  id: string;
  source: "opensea" | "glhf";
  tokenId: string;
  name: string;
  imageUrl: string;
  priceWei: string;
  priceEth: string;
  seller?: string;
  orderHash?: string;
  listingId?: number;
}

export interface CollectionStats {
  totalSupply: number;
  floorPriceEth: string | null;
  listedCount: number;
}

# GLHF Names

A marketplace for **Gigaverse character names** — tradable username NFTs on the [Abstract](https://abs.xyz) chain, built by [GLHF](https://www.glhfers.com) for their on-chain RPG [Gigaverse](https://gigaverse.io).

## About Gigaverse Names

When players join Gigaverse, they receive a unique **username NFT** (contract: `0x57E8994e2Ac2e49974b0aE685C15b468d1C09259`). These names are tradable and can be transferred to change your in-game display name. This is separate from the **GLHFers** genesis PFP collection on Ethereum.

- [Gigaverse docs — Character Names](https://docs.gigaverse.io/nft-collections/gigaverse-character-names)
- [OpenSea collection](https://opensea.io/collection/gigaverse-names)
- [GLHFers on OpenSea](https://opensea.io/collection/glhfers)

## Features

- Browse and search listed Gigaverse names
- View name details, traits, and pricing
- Buy via OpenSea (or GLHF marketplace when deployed)
- List your names for sale (requires deployed marketplace contract)
- Wallet connect on Abstract via RainbowKit

## Tech Stack

- **Next.js 15** + TypeScript + Tailwind + shadcn/ui
- **wagmi** + **viem** + **RainbowKit** for Abstract chain
- **OpenSea API** + **Gigaverse metadata API** for NFT data
- **Solidity** escrow marketplace contract (`contracts/`)

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add OPENSEA_API_KEY and NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy Marketplace Contract

```bash
cd contracts
forge build
export PRIVATE_KEY=your_deployer_key
export FEE_RECIPIENT=your_fee_wallet
forge script script/DeployMarketplace.s.sol --rpc-url https://api.mainnet.abs.xyz --broadcast
```

Set `NEXT_PUBLIC_MARKETPLACE_ADDRESS` in `.env.local` to the deployed address.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENSEA_API_KEY` | OpenSea API v2 key (server-side) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID |
| `NEXT_PUBLIC_MARKETPLACE_ADDRESS` | Deployed NameMarketplace contract |

## License

MIT

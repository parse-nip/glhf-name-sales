# Deploying the NameMarketplace Contract

This guide walks you through deploying `NameMarketplace.sol` to **Abstract mainnet** so users can list and buy Gigaverse names directly on GLHF Names (not just OpenSea).

## Prerequisites

1. **A wallet** with ETH on Abstract mainnet (for gas)
   - Bridge via [Abstract Bridge](https://portal.abs.xyz/bridge) or [Jumper](https://jumper.exchange)
   - Abstract Global Wallet works too

2. **Foundry** installed locally
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

3. **Deployer private key** — export from MetaMask / AGW (never commit this)

## Contract overview

| Item | Value |
|------|-------|
| Contract | `contracts/src/NameMarketplace.sol` |
| GigaNameNFT | `0x57E8994e2Ac2e49974b0aE685C15b468d1C09259` |
| Chain | Abstract (ID `2741`) |
| RPC | `https://api.mainnet.abs.xyz` |
| Platform fee | 2.5% (250 bps) |

**How it works:**
- Seller calls `list()` → NFT moves into escrow, price set in ETH
- Buyer calls `buy(listingId)` with exact ETH → NFT transferred, seller paid minus fee
- Seller can `cancel(listingId)` to get their NFT back

## Step 1 — Compile

```bash
cd contracts
forge build
```

You should see `Compiler run successful!`

## Step 2 — Set environment variables

```bash
export PRIVATE_KEY="your_private_key_without_0x_or_with_0x"
export FEE_RECIPIENT="0xYourWalletAddress"   # receives 2.5% platform fees
```

`FEE_RECIPIENT` defaults to the deployer if omitted.

## Step 3 — Dry run (optional)

Simulate without broadcasting:

```bash
forge script script/DeployMarketplace.s.sol \
  --rpc-url https://api.mainnet.abs.xyz \
  -vvvv
```

## Step 4 — Deploy to Abstract mainnet

```bash
forge script script/DeployMarketplace.s.sol \
  --rpc-url https://api.mainnet.abs.xyz \
  --broadcast \
  --verify \
  --verifier-url https://api.abscan.org/api \
  --etherscan-api-key YOUR_ABSCAN_API_KEY
```

> Verification is optional but recommended. Get an API key at [abscan.org](https://abscan.org).

After success, Foundry prints the deployed address, e.g.:

```
NameMarketplace deployed at: 0xABC...123
```

Save this address.

## Step 5 — Configure the frontend

In your `.env.local`:

```env
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0xYourDeployedAddress
```

Restart the dev server:

```bash
npm run dev
```

The **Sell** page will now allow listings, and name detail pages will show **Buy** via your marketplace when listed.

## Step 6 — Verify it works

1. Connect wallet on Abstract in the app
2. Go to **Sell** → select a Gigaverse name you own
3. Set a price → approve + list (two transactions)
4. Open the name page from another wallet → **Buy**

View transactions on [abscan.org](https://abscan.org).

---

## Testnet (optional)

For testing first on Abstract testnet:

| Property | Value |
|----------|-------|
| Chain ID | `11124` |
| RPC | `https://api.testnet.abs.xyz` |
| Faucet | [Alchemy Abstract Testnet Faucet](https://www.alchemy.com/faucets/abstract-testnet) |

```bash
forge script script/DeployMarketplace.s.sol \
  --rpc-url https://api.testnet.abs.xyz \
  --broadcast
```

> Testnet GigaNameNFT addresses differ — escrow listings only work against the real name contract on mainnet.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `insufficient funds` | Bridge more ETH to Abstract |
| `TradingLocked` on list | GigaNameNFT may block transfers — check game rules |
| `Not token owner` | Wallet doesn't hold that name NFT |
| `Incorrect payment` on buy | Send exact listing price in ETH |
| Sell page says "not deployed" | Set `NEXT_PUBLIC_MARKETPLACE_ADDRESS` and restart |

## Security notes

- Never commit `PRIVATE_KEY` or `.env.local`
- The deployer becomes contract `owner` and can adjust fee (max 10%)
- Consider a multisig for `FEE_RECIPIENT` in production

---

## Quick reference

```bash
# Full deploy flow
cd contracts
forge build
export PRIVATE_KEY=...
export FEE_RECIPIENT=0x...
forge script script/DeployMarketplace.s.sol \
  --rpc-url https://api.mainnet.abs.xyz \
  --broadcast

# Then in project root
echo "NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x..." >> .env.local
npm run dev
```

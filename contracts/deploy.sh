#!/usr/bin/env bash
# Deploy NameMarketplace to Abstract.
#
# Usage:
#   export PRIVATE_KEY=0x...
#   export FEE_RECIPIENT=0x...          # optional, defaults to deployer
#   export ABSTRACT_RPC=https://api.mainnet.abs.xyz
#
#   ./deploy.sh              # simulate only
#   ./deploy.sh --broadcast  # deploy for real

set -euo pipefail
cd "$(dirname "$0")"

if [[ -z "${PRIVATE_KEY:-}" ]]; then
  echo "Error: set PRIVATE_KEY before running (never commit this)."
  exit 1
fi

RPC="${ABSTRACT_RPC:-https://api.mainnet.abs.xyz}"

echo "→ Building..."
forge build

echo "→ Running deploy script against $RPC"
forge script script/DeployMarketplace.s.sol \
  --rpc-url "$RPC" \
  "$@"

echo ""
echo "If you used --broadcast, copy the NameMarketplace address and set:"
echo "  NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x... in .env.local (or Cloudflare secrets)"

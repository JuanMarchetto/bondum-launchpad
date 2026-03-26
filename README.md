# Bondum Launchpad

Blockchain-powered loyalty platform that enables brands to create and manage SPL tokens on Solana as loyalty coins for their customers.

## Features

- **Create Loyalty Coins** — 3-step wizard to deploy SPL tokens on Solana (brand info, tokenomics, review & deploy)
- **Brand Directory** — Browse deployed brands with search and category filters
- **Coin Details** — View token stats, supply, distribution, and brand information
- **Brand Dashboard** — Manage discounts, view client activity, track token holders
- **Wallet Authentication** — Email or wallet login via Privy with embedded Solana wallets
- **Whitelist Gating** — Admin-controlled access for coin creation during early access

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Blockchain:** Solana (SPL tokens via @solana/web3.js)
- **Auth:** Privy (email + wallet, embedded Solana wallets)
- **UI:** shadcn/ui + Radix UI + Tailwind CSS
- **Backend:** [Bondum Launchpad API](https://github.com/knackresearch/panicafe-webapp/tree/main/launchpad-api) (Hono + Postgres)

## Getting Started

### Prerequisites

- Node.js 22+
- [Privy](https://privy.io) account for authentication
- Bondum Launchpad API running on port 3002 (see [backend setup](https://github.com/knackresearch/panicafe-webapp/tree/main/launchpad-api))

### Setup

```bash
git clone https://github.com/JuanMarchetto/bondum-launchpad.git
cd bondum-launchpad
npm install
cp .env.example .env.local
```

Edit `.env.local` with your values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Your Privy App ID from the dashboard |
| `NEXT_PUBLIC_API_URL` | Backend API URL (default: `http://localhost:3002`) |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC endpoint (devnet for dev, mainnet for prod) |

### Run

```bash
npm run dev
```

Open http://localhost:3000.

## Project Structure

```
app/
  page.tsx              # Home — trending coins
  brands/               # Brand directory with search
  coin/[mint]/          # Coin detail page
  create/               # 3-step coin creation wizard
  profile/              # User profile & brand management
components/
  auth/                 # Privy provider, auth guard, whitelist gate
  brand/                # Brand cards, stats, tables
  coins/                # Coin cards, category filters
  create/               # Deploy button, progress steps
  layout/               # Sidebar, header, mobile nav
  ui/                   # shadcn/ui base components
lib/
  api.ts                # API client with token auth
  solana.ts             # Solana connection & TX helpers
  utils.ts              # Utility functions
types/
  index.ts              # Shared TypeScript types
```

## Architecture

```
Browser → Next.js Frontend (Vercel)
            ↓ API calls with Privy JWT
         Launchpad API (Hono on EC2)
            ↓ Postgres (brands, coins, whitelist)
            ↓ Solana RPC (token creation, on-chain verification)
```

The frontend builds and signs Solana transactions client-side using the user's Privy-managed wallet. The backend prepares unsigned transactions and confirms deployment on-chain.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## License

[MIT](LICENSE)

# Contributing to Bondum Launchpad

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

### Prerequisites

- Node.js 22+
- npm
- A [Privy](https://privy.io) account (for authentication)
- The [Bondum Launchpad API](https://github.com/knackresearch/panicafe-webapp/tree/main/launchpad-api) running locally on port 3002

### Getting Started

```bash
git clone https://github.com/JuanMarchetto/bondum-launchpad.git
cd bondum-launchpad
npm install
cp .env.example .env.local
# Edit .env.local with your Privy App ID and API URL
npm run dev
```

Open http://localhost:3000 in your browser.

## Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run lint: `npm run lint`
5. Run build: `npm run build`
6. Commit with a descriptive message
7. Push and open a Pull Request

### Commit Messages

Use conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `refactor:` code restructuring
- `chore:` maintenance tasks

### Code Style

- TypeScript strict mode
- Tailwind CSS for styling
- shadcn/ui components where possible
- Server Components by default, `'use client'` only when needed

## Project Structure

```
app/              # Next.js App Router pages
components/
  auth/           # Authentication (Privy, whitelist gate)
  brand/          # Brand detail components
  coins/          # Coin listing components
  create/         # Coin creation wizard
  layout/         # Sidebar, header, mobile nav
  ui/             # shadcn/ui base components
lib/              # Utility functions (API client, Solana helpers)
types/            # TypeScript type definitions
```

## Reporting Bugs

Open a GitHub issue using the Bug Report template. Include:

- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## Questions?

Open a discussion or email hello@bondum.xyz.

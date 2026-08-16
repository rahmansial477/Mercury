# Mercury

Wallet-signed on-chain vaults, cryptographic proofs, and verified anonymous notes  built on Shelbynet

Live app: https://mercury-net.vercel.app/
Repository: https://github.com/rahmansial477/Mercury

## Overview

Mercury is a Web3 application that combines three distinct on-chain utilities into a single wallet-connected experience. Instead of relying on a centralized server or database, every action inside Mercury is tied to a real wallet signature and a real, verifiable transaction. There is no login system, no account creation, and no central authority controlling access to your data  your wallet is your identity, and your data belongs only to you.

The application was built to explore what genuinely useful, non-financial applications of wallet-based ownership and on-chain verification can look like, using Shelby's decentralized storage layer on Shelbynet.

## Core Features

### Vault — Time-Locked Storage

Users can lock a file or message and set a future unlock date. Once locked, the content cannot be accessed by anyone — including the wallet that created it  until the specified date has passed. This is enforced through real date-comparison logic rather than a cosmetic label, and every lock action requires a wallet-signed transaction to create it. Use cases include future-dated personal notes timed reveals, and content that needs to remain provably untouched until a set point in time

### Proofs — On-Chain Proof of Creation

Users can upload a file or piece of text along with a title to generate an immutable, timestamped proof of creation. Each proof is backed by a real transaction on Aptos, and the resulting transaction hash and timestamp are displayed alongside the entry, with a direct link to view the transaction on Aptos Explorer. This gives creators, developers, and writers a simple way to establish a verifiable timestamp for their work without relying on a third-party notary or platform.

### Notes — Verified Anonymous Notes

Users can post a short note that is signed by their wallet but displayed without revealing their wallet address or identity. Each note carries a "Verified" status that only appears when the underlying wallet signature has actually been validated  the badge is not applied automatically. This allows for anonymous but authenticated communication, useful for honest feedback, commentary, or context that a user may not want tied to their public identity.

## How It Works

1. Connect an Aptos-compatible wallet (Petra)
2. Choose an action — lock an item, create a proof, or post a note
3. Approve the resulting transaction request in your wallet
4. Once the transaction is confirmed on-chain, the item appears in your dashboard, tied to your wallet and its real transaction hash

If a transaction is cancelled or rejected in the wallet, no data is saved. Nothing in Mercury is written or displayed until it has been genuinely confirmed on-chain. The same rule applies to deleting an entry  deletion requires a new wallet-signed transaction and will not occur if that transaction is cancelled.

## Data and Privacy

All Vault, Proof, and Note data shown in the dashboard is filtered strictly by the currently connected wallet address. No data is shared globally or mixed between wallets. A wallet that has not created any entries will see an empty state rather than sample or placeholder content.

## Technical Details

- Frontend: React, TypeScript
- Wallet integration: Aptos Wallet Adapter (`@aptos-labs/wallet-adapter-react`), Petra plugin
- Storage: Shelby SDK (`@shelby-protocol/sdk`)
- Network: Aptos Shelbynet (testnet)
- Hosting: Vercel

## Links

- Live application: https://mercury-net.vercel.app/
- Shelby: https://shelby.xyz
- Shelby documentation: https://docs.shelby.xyz
- Shelby GitHub: https://github.com/shelby
- Shelby Discord: https://discord.gg/shelbyserves
- Shelby on X: https://x.com/shelbyserves
- Aptos Explorer: https://explorer.aptoslabs.com

## Builder

Rahman
GitHub: https://github.com/rahmansial477
X: https://x.com/rahmansial477

## Disclaimer

Mercury is an independent, unofficial application built on Shelby's testnet infrastructure. It is not developed, operated, or endorsed by the Shelby team.

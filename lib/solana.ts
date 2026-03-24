import { Connection, Transaction } from "@solana/web3.js"

const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com"

export const connection = new Connection(RPC_URL, "confirmed")

export function deserializeTransaction(base64Tx: string): Transaction {
  const buffer = Buffer.from(base64Tx, "base64")
  return Transaction.from(buffer)
}

export async function confirmTransaction(
  signature: string
): Promise<boolean> {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash()
  const result = await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  )
  return !result.value.err
}

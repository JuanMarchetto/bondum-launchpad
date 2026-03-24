"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { deserializeTransaction, confirmTransaction, connection } from "@/lib/solana"

type DeployButtonProps = {
  formData: Record<string, any>
}

export function DeployButton({ formData }: DeployButtonProps) {
  const { getAccessToken, user } = usePrivy()
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "preparing" | "signing" | "confirming" | "done" | "error">("idle")
  const [error, setError] = useState("")

  async function handleDeploy() {
    try {
      setStatus("preparing")
      setError("")

      const token = await getAccessToken()
      if (!token) throw new Error("Not authenticated")

      const idempotencyKey = crypto.randomUUID()
      const locations = formData.locations
        ? formData.locations.split(",").map((l: string) => l.trim()).filter(Boolean)
        : []

      // 1. Prepare deploy
      const result = await apiFetch<{
        brandId: string
        coinId: string
        serializedTx: string
        mintAddress: string
      }>("/coins/prepare-deploy", {
        method: "POST",
        token,
        body: JSON.stringify({
          ...formData,
          locations,
          socials: formData.socials ? { website: formData.socials } : {},
          totalSupply: Number(formData.totalSupply),
          decimals: Number(formData.decimals),
          idempotencyKey,
        }),
      })

      // 2. Deserialize, sign with wallet, and send
      setStatus("signing")
      const tx = deserializeTransaction(result.serializedTx)

      // Get the Solana wallet from Privy
      const solanaWallet = (user?.linkedAccounts as any[])?.find(
        (a: any) => a.type === "wallet" && a.chainType === "solana"
      ) as any

      if (!solanaWallet) throw new Error("No Solana wallet found")

      // Sign with the user's wallet via Privy
      const provider = await solanaWallet.getProvider()
      const signedTx = await provider.signTransaction(tx)

      // Send the fully-signed transaction
      const txSignature = await connection.sendRawTransaction(signedTx.serialize())

      // 3. Confirm on-chain
      setStatus("confirming")
      const confirmed = await confirmTransaction(txSignature)
      if (!confirmed) throw new Error("Transaction failed on-chain")

      // 4. Confirm with backend
      await apiFetch("/coins/confirm-deploy", {
        method: "POST",
        token,
        body: JSON.stringify({
          brandId: result.brandId,
          mintAddress: result.mintAddress,
          txSignature: txSignature,
        }),
      })

      setStatus("done")
      sessionStorage.removeItem("createCoinForm")
      router.push(`/coin/${result.mintAddress}`)
    } catch (err: any) {
      setStatus("error")
      setError(err.message || "Deploy failed")
    }
  }

  const labels = {
    idle: "Deploy Coin (~0.05 SOL)",
    preparing: "Preparing transaction...",
    signing: "Sign in your wallet...",
    confirming: "Confirming on-chain...",
    done: "Success!",
    error: "Try Again",
  }

  return (
    <div>
      <button
        onClick={handleDeploy}
        disabled={status === "preparing" || status === "signing" || status === "confirming"}
        className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors disabled:opacity-50"
      >
        {labels[status]}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  )
}

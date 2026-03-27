"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useWallets, useSignAndSendTransaction } from "@privy-io/react-auth/solana"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { deserializeTransaction, confirmTransaction } from "@/lib/solana"

type DeployButtonProps = {
  formData: Record<string, any>
}

export function DeployButton({ formData }: DeployButtonProps) {
  const { getAccessToken } = usePrivy()
  const { wallets: solanaWallets, ready: walletsReady } = useWallets()
  const { signAndSendTransaction } = useSignAndSendTransaction()
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

      // 1. Prepare deploy — strip empty optional fields
      const payload: Record<string, any> = {
        name: formData.name,
        ticker: formData.ticker,
        categoryId: Number(formData.categoryId),
        totalSupply: Number(formData.totalSupply),
        decimals: Number(formData.decimals),
        distribution: formData.distribution,
        idempotencyKey,
        locations,
      }
      if (formData.description) payload.description = formData.description
      if (formData.slogan) payload.slogan = formData.slogan
      if (formData.socials) payload.socials = { website: formData.socials }
      if (formData.logoUrl) payload.logoUrl = formData.logoUrl
      if (formData.bannerUrl) payload.bannerUrl = formData.bannerUrl

      const result = await apiFetch<{
        brandId: string
        coinId: string
        serializedTx: string
        mintAddress: string
      }>("/coins/prepare-deploy", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      })

      // 2. Deserialize and sign with embedded Solana wallet
      setStatus("signing")
      const tx = deserializeTransaction(result.serializedTx)

      // Get the embedded Solana wallet from Privy's Solana useWallets()
      const wallet = solanaWallets[0]
      if (!wallet) throw new Error("No Solana wallet found. Please try logging out and back in.")

      // Sign and send via Privy's Solana SDK
      const { signature } = await signAndSendTransaction({
        transaction: tx.serialize(),
        wallet,
      })

      const txSignature = Buffer.from(signature).toString("base64")

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
          txSignature,
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

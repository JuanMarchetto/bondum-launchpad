"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

type DeployButtonProps = {
  formData: Record<string, any>
}

export function DeployButton({ formData }: DeployButtonProps) {
  const { getAccessToken } = usePrivy()
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "deploying" | "done" | "error">("idle")
  const [error, setError] = useState("")

  async function handleDeploy() {
    try {
      setStatus("deploying")
      setError("")

      const token = await getAccessToken()
      if (!token) throw new Error("Not authenticated")

      const idempotencyKey = crypto.randomUUID()
      const locations = formData.locations
        ? formData.locations.split(",").map((l: string) => l.trim()).filter(Boolean)
        : []

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

      // Full deploy handled server-side (sign + send + confirm)
      const result = await apiFetch<{
        brandId: string
        mintAddress: string
        txSignature: string
      }>("/coins/deploy", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
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
    deploying: "Deploying on Solana...",
    done: "Success!",
    error: "Try Again",
  }

  return (
    <div>
      <button
        onClick={handleDeploy}
        disabled={status === "deploying"}
        className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors disabled:opacity-50"
      >
        {labels[status]}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  )
}

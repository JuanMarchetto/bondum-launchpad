"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { ProgressSteps } from "@/components/create/progress-steps"
import { DeployButton } from "@/components/create/deploy-button"

export default function CreateStep3() {
  const router = useRouter()
  const [form, setForm] = useState<Record<string, any>>({})

  useEffect(() => {
    const saved = sessionStorage.getItem("createCoinForm")
    if (saved) setForm(JSON.parse(saved))
    else router.push("/create")
  }, [router])

  if (!form.name) return null

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">Review your coin details before deployment.</p>
      <ProgressSteps current={3} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Coin Summary</h3>
          <div className="space-y-4">
            {[
              ["Coin Name", form.name],
              ["Ticker", `$${form.ticker}`],
              ["Total Supply", Number(form.totalSupply).toLocaleString()],
              ["Decimals", form.decimals],
              ["Distribution", form.distribution?.replace("-", " ")],
              ["Network", "Solana"],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium capitalize">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Deployment Cost</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Estimated Cost</span>
              <span className="text-3xl font-bold text-[#7C6BF0]">~0.05 SOL</span>
            </div>
            <p className="text-sm text-gray-500">
              This covers the Solana network fees for creating your SPL token.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-6">
            <h4 className="font-bold text-amber-800 mb-2">Irreversible Action</h4>
            <p className="text-amber-700 text-sm">
              Once deployed, your token settings cannot be changed. The coin name,
              ticker, total supply, and decimals are permanent.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/create/tokenomics")}
          className="px-8 py-3 border-2 border-[#7C6BF0] text-[#7C6BF0] rounded-full font-medium hover:bg-[#7C6BF0]/10 transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <DeployButton formData={form} />
      </div>
    </div>
  )
}

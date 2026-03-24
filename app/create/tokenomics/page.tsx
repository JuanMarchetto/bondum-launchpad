"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProgressSteps } from "@/components/create/progress-steps"

export default function CreateStep2() {
  const router = useRouter()
  const [form, setForm] = useState({
    totalSupply: "1000000",
    decimals: "9",
    distribution: "reward-only",
  })

  useEffect(() => {
    const saved = sessionStorage.getItem("createCoinForm")
    if (saved) {
      const parsed = JSON.parse(saved)
      setForm({
        totalSupply: parsed.totalSupply || "1000000",
        decimals: parsed.decimals || "9",
        distribution: parsed.distribution || "reward-only",
      })
    }
  }, [])

  function handleNext() {
    const existing = JSON.parse(sessionStorage.getItem("createCoinForm") || "{}")
    sessionStorage.setItem("createCoinForm", JSON.stringify({ ...existing, ...form }))
    router.push("/create/review")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">Configure your token economics.</p>
      <ProgressSteps current={2} />
      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Total Supply</label>
            <input
              type="number"
              value={form.totalSupply}
              onChange={(e) => setForm({ ...form, totalSupply: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
            <p className="text-sm text-gray-500 mt-1">The maximum number of tokens that will ever exist.</p>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Decimals</label>
            <select
              value={form.decimals}
              onChange={(e) => setForm({ ...form, decimals: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            >
              <option value="6">6 decimals</option>
              <option value="9">9 decimals (recommended)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-4">Distribution Strategy</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "reward-only", title: "Reward-only", desc: "100% of tokens are distributed as loyalty rewards to customers." },
                { id: "brand-reserve", title: "Brand Reserve", desc: "70% rewards, 30% reserved for brand treasury and partnerships." },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setForm({ ...form, distribution: opt.id })}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    form.distribution === opt.id
                      ? "border-[#7C6BF0] bg-[#7C6BF0]/10"
                      : "border-[#7C6BF0]/30 hover:border-[#7C6BF0]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.distribution === opt.id ? "border-[#7C6BF0]" : "border-gray-300"}`}>
                      {form.distribution === opt.id && <div className="w-3 h-3 rounded-full bg-[#7C6BF0]" />}
                    </div>
                    <h4 className="font-bold text-gray-800">{opt.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.push("/create")}
            className="px-8 py-3 border-2 border-[#7C6BF0] text-[#7C6BF0] rounded-full font-medium hover:bg-[#7C6BF0]/10 transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={20} /> Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors flex items-center gap-2"
          >
            Next: Review <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

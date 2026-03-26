"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, MapPin, Globe, Instagram } from "lucide-react"
import { ProgressSteps } from "@/components/create/progress-steps"
import { ImageUpload } from "@/components/create/image-upload"

export default function CreateStep1() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    description: "",
    slogan: "",
    locations: "",
    socials: "",
    logoUrl: "",
    bannerUrl: "",
    categoryId: 3,
  })

  useEffect(() => {
    const saved = sessionStorage.getItem("createCoinForm")
    if (saved) setForm(JSON.parse(saved))
  }, [])

  function handleNext() {
    sessionStorage.setItem("createCoinForm", JSON.stringify(form))
    router.push("/create/tokenomics")
  }

  const update = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">
        {"Choose carefully, these can't be changed once the coin is created."}
      </p>
      <ProgressSteps current={1} />
      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Coin Name</label>
            <input
              type="text"
              placeholder="Name your loyalty coin"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Ticker</label>
            <input
              type="text"
              placeholder="e.g. PANICAFE"
              value={form.ticker}
              onChange={(e) => update("ticker", e.target.value.toUpperCase())}
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-2">Brand Description</label>
            <textarea
              placeholder="Write a description about your brand"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0] resize-none"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Brand Slogan</label>
            <input
              type="text"
              placeholder="Add your brand's slogan"
              value={form.slogan}
              onChange={(e) => update("slogan", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Locations</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Argentina, Spain, USA"
                value={form.locations}
                onChange={(e) => update("locations", e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Brand Socials</label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://..."
                value={form.socials}
                onChange={(e) => update("socials", e.target.value)}
                className="w-full px-4 py-3 pr-20 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400">
                <Globe size={18} />
                <Instagram size={18} />
              </div>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUpload
              label="Brand Logo"
              value={form.logoUrl}
              onChange={(url) => update("logoUrl", url)}
              aspect="square"
            />
            <ImageUpload
              label="Banner Image"
              value={form.bannerUrl}
              onChange={(url) => update("bannerUrl", url)}
              aspect="wide"
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            disabled={!form.name || !form.ticker}
            className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next: Tokenomics
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

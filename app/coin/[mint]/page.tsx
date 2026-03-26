import { apiFetch } from "@/lib/api"
import { ChevronLeft, Globe, Gift } from "lucide-react"
import Link from "next/link"
import type { BrandWithCoin, Discount } from "@/types"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mint: string }>
}): Promise<Metadata> {
  const { mint } = await params
  try {
    const data = await apiFetch<BrandWithCoin>(`/coins/${mint}`)
    return {
      title: `${data.name} ($${data.ticker}) - Bondum`,
      description: data.description || `${data.name} loyalty coin on Solana`,
    }
  } catch {
    return { title: "Coin Not Found - Bondum" }
  }
}

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ mint: string }>
}) {
  const { mint } = await params
  let data: BrandWithCoin | null = null
  let rewards: Discount[] = []

  try {
    data = await apiFetch<BrandWithCoin>(`/coins/${mint}`)
    if (data?.id) {
      const res = await apiFetch<{ data: Discount[] }>(`/brands/${data.id}/discounts`)
      rewards = res.data ?? []
    }
  } catch (e) {
    if (!data) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Coin not found</p>
          <Link href="/" className="text-[#7C6BF0] hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      )
    }
  }

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 text-[#7C6BF0] mb-6 hover:underline">
        <ChevronLeft size={20} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Header */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {data.logoUrl ? (
                <img src={data.logoUrl} alt={data.name} className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#7C6BF0]">{data.ticker.charAt(0)}</span>
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
                {data.slogan && <p className="text-gray-500 italic mb-3">{data.slogan}</p>}
                <div className="flex gap-3">
                  {data.socials?.website && (
                    <a href={data.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100">
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {data.description && (
            <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
              <h3 className="font-bold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600">{data.description}</p>
            </div>
          )}

          {/* Rewards */}
          {rewards.length > 0 && (
            <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Gift size={20} className="text-[#7C6BF0]" /> Available Rewards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F5F3FF] border border-[#7C6BF0]/20"
                  >
                    <span className="font-medium text-gray-800">{reward.name}</span>
                    <span className="text-sm font-bold text-[#7C6BF0] whitespace-nowrap ml-2">
                      {reward.tokensRequired.toLocaleString()} ${data!.ticker}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locations */}
          {data.locations && data.locations.length > 0 && (
            <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Locations</h3>
              <div className="flex flex-wrap gap-2">
                {data.locations.map((loc) => (
                  <span key={loc} className="px-4 py-2 bg-[#F5F3FF] rounded-full text-gray-700">{loc}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Token Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Ticker</p>
                <p className="text-xl font-bold text-gray-800">${data.ticker}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Supply</p>
                <p className="text-xl font-bold text-gray-800">{data.coin?.totalSupply.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Decimals</p>
                <p className="text-xl font-bold text-gray-800">{data.coin?.decimals}</p>
              </div>
              {data.coin?.mintAddress && (
                <div>
                  <p className="text-sm text-gray-500">Mint Address</p>
                  <code className="text-sm text-gray-600 bg-[#F5F3FF] px-2 py-1 rounded break-all">
                    {data.coin.mintAddress}
                  </code>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-[#7C6BF0] p-6 text-white text-center">
            <h3 className="font-bold mb-2">Get the Bondum App</h3>
            <p className="text-sm opacity-90 mb-4">Collect and redeem loyalty tokens</p>
            <Link
              href="/download"
              className="block w-full py-3 bg-white text-[#7C6BF0] rounded-full font-medium hover:bg-gray-100 transition-colors text-center"
            >
              Download App
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import type { BrandWithCoin } from "@/types"

export function CoinCard({ brand }: { brand: BrandWithCoin }) {
  const mintAddress = brand.coin?.mintAddress
  if (!mintAddress) return null

  return (
    <Link
      href={`/coin/${mintAddress}`}
      className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#7C6BF0]/30 cursor-pointer hover:border-[#7C6BF0] hover:shadow-md transition-all"
    >
      {brand.logoUrl ? (
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full border-2 border-[#7C6BF0]/30 flex items-center justify-center">
          <span className="text-xl font-bold text-[#7C6BF0]">
            {brand.ticker.charAt(0)}
          </span>
        </div>
      )}
      <div>
        <h3 className="font-bold text-gray-800">{brand.name}</h3>
        <p className="text-gray-500 text-sm">${brand.ticker}</p>
        <p className="text-gray-600 text-sm">
          Supply: {brand.coin?.totalSupply.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}

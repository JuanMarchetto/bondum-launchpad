import Link from "next/link"
import type { BrandWithCoin } from "@/types"

export function BrandCard({ brand }: { brand: BrandWithCoin }) {
  const mintAddress = brand.coin?.mintAddress

  return (
    <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 hover:border-[#7C6BF0] hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-4">
        {brand.logoUrl ? (
          <img src={brand.logoUrl} alt={brand.name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
            <span className="text-xl font-bold text-[#7C6BF0]">{brand.ticker.charAt(0)}</span>
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{brand.name}</h3>
          <p className="text-[#7C6BF0] font-medium">${brand.ticker}</p>
        </div>
      </div>
      {brand.slogan && (
        <p className="text-gray-500 italic text-sm mb-3">{brand.slogan}</p>
      )}
      {brand.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{brand.description}</p>
      )}
      {brand.locations && brand.locations.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {brand.locations.slice(0, 3).map((loc) => (
            <span key={loc} className="text-xs px-2 py-1 bg-[#F5F3FF] rounded-full text-gray-600">{loc}</span>
          ))}
        </div>
      )}
      {mintAddress && (
        <Link
          href={`/coin/${mintAddress}`}
          className="block text-center py-2 rounded-full border-2 border-[#7C6BF0] text-[#7C6BF0] font-medium hover:bg-[#7C6BF0]/10 transition-colors"
        >
          View Coin
        </Link>
      )}
    </div>
  )
}

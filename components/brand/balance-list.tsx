import type { BrandWithCoin } from "@/types"

export function BalanceList({ brands }: { brands: BrandWithCoin[] }) {
  if (brands.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No coins created yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#7C6BF0]/30"
        >
          <div className="flex items-center gap-4">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
                <span className="font-bold text-[#7C6BF0]">{brand.ticker.charAt(0)}</span>
              </div>
            )}
            <div>
              <h4 className="font-bold text-gray-800">{brand.name}</h4>
              <p className="text-sm text-gray-500">${brand.ticker}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-800">
              {brand.coin?.totalSupply?.toLocaleString() || "\u2014"}
            </p>
            <p className="text-xs text-gray-500">Total Supply</p>
          </div>
        </div>
      ))}
    </div>
  )
}

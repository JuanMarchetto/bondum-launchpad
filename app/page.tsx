import { apiFetch } from "@/lib/api"
import { CoinCard } from "@/components/coins/coin-card"
import { CategoryFilter } from "@/components/coins/category-filter"
import type { BrandWithCoin, Category, PaginatedResponse } from "@/types"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const categorySlug = params.category

  let coins: BrandWithCoin[] = []
  let categories: Category[] = []

  try {
    const [coinsRes, catsRes] = await Promise.all([
      apiFetch<PaginatedResponse<BrandWithCoin>>(
        `/coins${categorySlug ? `?category=${categorySlug}` : ""}`
      ),
      apiFetch<{ data: Category[] }>("/categories"),
    ])
    coins = coinsRes.data
    categories = catsRes.data
  } catch {
    // API not available yet — show empty state
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Coins</h2>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} selected={categorySlug} />
      )}

      {coins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((brand) => (
            <CoinCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No coins yet. Be the first to create one!</p>
        </div>
      )}
    </div>
  )
}

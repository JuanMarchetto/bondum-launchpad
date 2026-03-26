import { apiFetch } from "@/lib/api"
import { BrandCard } from "@/components/brand/brand-card"
import { CategoryFilter } from "@/components/coins/category-filter"
import type { BrandWithCoin, Category, PaginatedResponse } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brands Directory - Bondum",
  description: "Discover brands with on-chain loyalty programs on Solana.",
}

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const categorySlug = params.category

  let brands: BrandWithCoin[] = []
  let categories: Category[] = []

  try {
    const [brandsRes, catsRes] = await Promise.all([
      apiFetch<PaginatedResponse<BrandWithCoin>>(
        `/brands${categorySlug ? `?category=${categorySlug}` : ""}`
      ),
      apiFetch<{ data: Category[] }>("/categories"),
    ])
    brands = brandsRes.data
    categories = Array.isArray(catsRes) ? catsRes : catsRes.data
  } catch {
    // API not available
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Brands Directory</h2>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} selected={categorySlug} />
      )}

      {brands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No brands yet.</p>
        </div>
      )}
    </div>
  )
}

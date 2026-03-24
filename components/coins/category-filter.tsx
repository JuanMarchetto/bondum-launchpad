"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import type { Category } from "@/types"

export function CategoryFilter({ categories, selected }: { categories: Category[]; selected?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function selectCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("category", slug)
    } else {
      params.delete("category")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      <button
        onClick={() => selectCategory(null)}
        className={`flex-shrink-0 px-5 py-2 rounded-full border-2 transition-colors ${
          !selected
            ? "bg-[#7C6BF0] text-white border-[#7C6BF0]"
            : "border-[#7C6BF0]/30 text-gray-700 hover:border-[#7C6BF0]"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => selectCategory(cat.slug)}
          className={`flex-shrink-0 px-5 py-2 rounded-full border-2 transition-colors ${
            selected === cat.slug
              ? "bg-[#7C6BF0] text-white border-[#7C6BF0]"
              : "border-[#7C6BF0]/30 text-gray-700 hover:border-[#7C6BF0]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

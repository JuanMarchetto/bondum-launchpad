export type Category = {
  id: number
  name: string
  slug: string
}

export type Brand = {
  id: string
  ownerWallet: string
  name: string
  ticker: string
  description: string | null
  slogan: string | null
  locations: string[]
  socials: Record<string, string>
  logoUrl: string | null
  bannerUrl: string | null
  categoryId: number
  category?: Category
  status: "pending_deploy" | "deployed" | "failed"
  createdAt: string
  updatedAt: string
}

export type Coin = {
  id: string
  brandId: string
  mintAddress: string | null
  totalSupply: number
  decimals: number
  distribution: "reward-only" | "brand-reserve"
  deployTx: string | null
  createdAt: string
}

export type BrandWithCoin = Brand & { coin: Coin | null }

export type Discount = {
  id: string
  brandId: string
  name: string
  tokensRequired: number
  active: boolean
  createdAt: string
}

export type ClientActivity = {
  id: string
  brandId: string
  walletAddress: string
  buys: number
  discountsRedeemed: number
  lastActivity: string
}

export type PaginatedResponse<T> = {
  data: T[]
  cursor: string | null
  hasMore: boolean
}

export type ApiError = {
  error: {
    code: string
    message: string
  }
}

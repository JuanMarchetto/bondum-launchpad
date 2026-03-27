"use client"

import { useState, useEffect, useCallback } from "react"
import { usePrivy } from "@privy-io/react-auth"
import Link from "next/link"
import { apiFetch } from "@/lib/api"
import { Settings } from "lucide-react"
import { StatsRow } from "@/components/brand/stats-row"
import { BalanceList } from "@/components/brand/balance-list"
import { DiscountTable } from "@/components/brand/discount-table"
import { ClientsTable } from "@/components/brand/clients-table"
import type { BrandWithCoin, Discount, ClientActivity } from "@/types"

type Tab = "balances" | "discounts" | "clients"

export default function ProfilePage() {
  const { getAccessToken } = usePrivy()
  const [tab, setTab] = useState<Tab>("balances")
  const [brands, setBrands] = useState<BrandWithCoin[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [clients, setClients] = useState<ClientActivity[]>([])
  const [token, setToken] = useState("")

  const loadBrands = useCallback(async () => {
    const t = await getAccessToken()
    if (!t) return
    setToken(t)
    const res = await apiFetch<{ data: BrandWithCoin[] }>("/profile/brands", { token: t })
    setBrands(res.data)
    if (res.data.length > 0 && !selectedBrand) {
      setSelectedBrand(res.data[0].id)
    }
  }, [getAccessToken, selectedBrand])

  const loadDiscounts = useCallback(async () => {
    if (!selectedBrand || !token) return
    const res = await apiFetch<{ data: Discount[] }>(`/brands/${selectedBrand}/discounts`, { token })
    setDiscounts(res.data)
  }, [selectedBrand, token])

  const loadClients = useCallback(async () => {
    if (!selectedBrand || !token) return
    const res = await apiFetch<{ data: ClientActivity[] }>(`/brands/${selectedBrand}/clients`, { token })
    setClients(res.data)
  }, [selectedBrand, token])

  useEffect(() => { loadBrands() }, [loadBrands])

  useEffect(() => {
    if (tab === "discounts") loadDiscounts()
    if (tab === "clients") loadClients()
  }, [tab, selectedBrand, loadDiscounts, loadClients])

  const deployedBrands = brands.filter((b) => b.status === "deployed")

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <StatsRow
        stats={[
          { label: "Total Brands", value: brands.length },
          { label: "Deployed", value: deployedBrands.length },
          { label: "Active Discounts", value: discounts.filter((d) => d.active).length },
          { label: "Total Clients", value: clients.length },
        ]}
      />

      {brands.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          {brands.length > 1 && (
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} (${b.ticker})
                </option>
              ))}
            </select>
          )}
          {selectedBrand && (
            <Link
              href={`/brands/${selectedBrand}/manage`}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
            >
              <Settings size={16} /> Manage Rewards
            </Link>
          )}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {(["balances", "discounts", "clients"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
              tab === t
                ? "bg-[#7C6BF0] text-white"
                : "border-2 border-[#7C6BF0]/30 text-gray-700 hover:border-[#7C6BF0]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        {tab === "balances" && <BalanceList brands={deployedBrands} />}
        {tab === "discounts" && selectedBrand && (
          <DiscountTable
            brandId={selectedBrand}
            discounts={discounts}
            token={token}
            onUpdate={loadDiscounts}
          />
        )}
        {tab === "clients" && <ClientsTable clients={clients} />}
      </div>
    </div>
  )
}

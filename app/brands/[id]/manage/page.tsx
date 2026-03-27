"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { apiFetch } from "@/lib/api"
import { ChevronLeft, Plus, Pencil, Trash2, X } from "lucide-react"
import Link from "next/link"
import type { BrandWithCoin, Discount } from "@/types"

export default function ManageBrandPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { getAccessToken, ready, authenticated } = usePrivy()
  const [brand, setBrand] = useState<BrandWithCoin | null>(null)
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formName, setFormName] = useState("")
  const [formTokens, setFormTokens] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const loadData = useCallback(async () => {
    try {
      const [brandData, discountData] = await Promise.all([
        apiFetch<BrandWithCoin>(`/brands/${id}`),
        apiFetch<{ data: Discount[] }>(`/brands/${id}/discounts`),
      ])
      setBrand(brandData)
      setDiscounts(discountData.data || [])
    } catch {
      setError("Failed to load brand data")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) loadData()
  }, [id, loadData])

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      const token = await getAccessToken()
      if (!token) throw new Error("Not authenticated")

      const body = {
        name: formName,
        tokensRequired: Number(formTokens),
        active: true,
      }

      if (editingId) {
        await apiFetch(`/brands/${id}/discounts/${editingId}`, {
          method: "PUT", token, body: JSON.stringify(body),
        })
      } else {
        await apiFetch(`/brands/${id}/discounts`, {
          method: "POST", token, body: JSON.stringify(body),
        })
      }

      setShowForm(false)
      setEditingId(null)
      setFormName("")
      setFormTokens("")
      await loadData()
    } catch (err: any) {
      setError(err.message || "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(discountId: string) {
    try {
      const token = await getAccessToken()
      if (!token) return
      await apiFetch(`/brands/${id}/discounts/${discountId}`, {
        method: "DELETE", token,
      })
      await loadData()
    } catch (err: any) {
      setError(err.message || "Failed to delete")
    }
  }

  function startEdit(d: Discount) {
    setEditingId(d.id)
    setFormName(d.name)
    setFormTokens(String(d.tokensRequired))
    setShowForm(true)
  }

  function startCreate() {
    setEditingId(null)
    setFormName("")
    setFormTokens("")
    setShowForm(true)
  }

  if (!ready || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7C6BF0] border-t-transparent" />
      </div>
    )
  }

  if (!authenticated) {
    router.push("/")
    return null
  }

  if (!brand) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Brand not found</p>
        <Link href="/profile" className="text-[#7C6BF0] hover:underline mt-4 inline-block">
          Back to Profile
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link href="/profile" className="flex items-center gap-2 text-[#7C6BF0] mb-6 hover:underline">
        <ChevronLeft size={20} /> Back to Profile
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage {brand.name}</h2>
          <p className="text-gray-500">${brand.ticker} rewards & benefits</p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
        >
          <Plus size={18} /> Add Reward
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-6 rounded-2xl border-2 border-[#7C6BF0] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">
              {editingId ? "Edit Reward" : "New Reward"}
            </h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
              <input
                type="text"
                placeholder="e.g. Free Coffee"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tokens Required</label>
              <input
                type="number"
                placeholder="e.g. 30000"
                value={formTokens}
                onChange={(e) => setFormTokens(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              disabled={saving || !formName || !formTokens}
              className="px-6 py-2.5 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* Discounts List */}
      {discounts.length > 0 ? (
        <div className="space-y-3">
          {discounts.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#7C6BF0]/30"
            >
              <div>
                <h4 className="font-medium text-gray-800">{d.name}</h4>
                <p className="text-sm text-[#7C6BF0] font-bold">
                  {d.tokensRequired.toLocaleString()} ${brand.ticker}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(d)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-[#7C6BF0]/30">
          <p className="text-gray-500 mb-3">No rewards yet</p>
          <button
            onClick={startCreate}
            className="text-[#7C6BF0] font-medium hover:underline"
          >
            Create your first reward
          </button>
        </div>
      )}
    </div>
  )
}

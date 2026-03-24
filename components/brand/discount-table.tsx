"use client"

import { useState } from "react"
import { apiFetch } from "@/lib/api"
import type { Discount } from "@/types"

type Props = {
  brandId: string
  discounts: Discount[]
  token: string
  onUpdate: () => void
}

export function DiscountTable({ brandId, discounts, token, onUpdate }: Props) {
  const [newName, setNewName] = useState("")
  const [newTokens, setNewTokens] = useState("")

  async function addDiscount() {
    if (!newName || !newTokens) return
    await apiFetch(`/brands/${brandId}/discounts`, {
      method: "POST",
      token,
      body: JSON.stringify({ name: newName, tokensRequired: Number(newTokens) }),
    })
    setNewName("")
    setNewTokens("")
    onUpdate()
  }

  async function toggleActive(d: Discount) {
    await apiFetch(`/brands/${brandId}/discounts/${d.id}`, {
      method: "PUT",
      token,
      body: JSON.stringify({ active: !d.active }),
    })
    onUpdate()
  }

  async function deleteDiscount(id: string) {
    await apiFetch(`/brands/${brandId}/discounts/${id}`, {
      method: "DELETE",
      token,
    })
    onUpdate()
  }

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Discount name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
        />
        <input
          type="number"
          placeholder="Tokens required"
          value={newTokens}
          onChange={(e) => setNewTokens(e.target.value)}
          className="w-40 px-4 py-2 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
        />
        <button
          onClick={addDiscount}
          className="px-6 py-2 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
        >
          Add
        </button>
      </div>
      {discounts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No discounts yet.</p>
      ) : (
        <div className="space-y-3">
          {discounts.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
              <div>
                <span className="font-medium text-gray-800">{d.name}</span>
                <span className="text-sm text-gray-500 ml-3">{d.tokensRequired} tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    d.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {d.active ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => deleteDiscount(d.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

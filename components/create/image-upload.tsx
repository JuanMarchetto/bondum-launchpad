"use client"

import { useState, useRef } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { Upload, X } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

type ImageUploadProps = {
  label: string
  value: string
  onChange: (url: string) => void
  aspect?: "square" | "wide"
}

export function ImageUpload({ label, value, onChange, aspect = "square" }: ImageUploadProps) {
  const { getAccessToken } = usePrivy()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setUploading(true)

    try {
      const token = await getAccessToken()
      if (!token) throw new Error("Not authenticated")

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error?.message || "Upload failed")
      }

      const data = await res.json()
      onChange(data.url)
    } catch (err: any) {
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function handleRemove() {
    onChange("")
    if (inputRef.current) inputRef.current.value = ""
  }

  const isWide = aspect === "wide"

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-2">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />

      {value ? (
        <div className={`relative ${isWide ? "h-32" : "h-32 w-32"} rounded-xl overflow-hidden border-2 border-[#7C6BF0]/30`}>
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`${isWide ? "w-full h-32" : "w-32 h-32"} rounded-xl border-2 border-dashed border-[#7C6BF0]/30 bg-[#F5F3FF] flex flex-col items-center justify-center gap-2 hover:border-[#7C6BF0] transition-colors disabled:opacity-50`}
        >
          {uploading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#7C6BF0] border-t-transparent" />
          ) : (
            <>
              <Upload size={20} className="text-[#7C6BF0]" />
              <span className="text-xs text-gray-500">JPG, PNG, WebP</span>
              <span className="text-xs text-gray-400">Max 5MB</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

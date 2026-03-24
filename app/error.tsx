"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
      <p className="text-gray-500 mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}

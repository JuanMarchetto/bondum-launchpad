export default function CoinLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border-2 border-gray-200 p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-64 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-gray-200 p-6 space-y-3">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-gray-200 p-6 space-y-4">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

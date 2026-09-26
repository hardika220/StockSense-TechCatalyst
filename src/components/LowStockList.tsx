import { lowStockItems } from "@/lib/data";

function StockBar({ remaining, threshold }: { remaining: number; threshold: number }) {
  const pct = Math.round((remaining / threshold) * 100);
  // color based on how critical
  const barColor =
    pct <= 5 ? "bg-red-500" : pct <= 15 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
      <div
        className={`h-1.5 rounded-full ${barColor} transition-all`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

export default function LowStockList() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Low Stock Products</h2>
          <p className="text-xs text-slate-500 mt-0.5">Items below reorder threshold</p>
        </div>
        <span className="text-xs font-medium bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full">
          {lowStockItems.length} alerts
        </span>
      </div>

      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
                strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            {/* Info + bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                <span className={`text-sm font-semibold tabular-nums ml-2 ${
                  item.remaining <= 5 ? "text-red-600" : "text-amber-600"
                }`}>
                  {item.remaining} {item.unit}
                </span>
              </div>
              <p className="text-xs text-slate-400">{item.sku}</p>
              <StockBar remaining={item.remaining} threshold={item.threshold} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

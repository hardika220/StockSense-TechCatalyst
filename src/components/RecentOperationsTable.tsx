import { recentOperations, type RecentOperation } from "@/lib/data";

// ── Badge helpers ────────────────────────────────────────────────────────────

const typeBadge: Record<RecentOperation["type"], string> = {
  Receipt: "bg-blue-100 text-blue-700",
  Delivery: "bg-emerald-100 text-emerald-700",
  Transfer: "bg-violet-100 text-violet-700",
  Adjustment: "bg-orange-100 text-orange-700",
};

const statusBadge: Record<RecentOperation["status"], string> = {
  Done: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-slate-100 text-slate-500",
};

function QtyCell({ qty }: { qty: number }) {
  const positive = qty >= 0;
  return (
    <span className={`font-semibold tabular-nums text-sm ${positive ? "text-emerald-600" : "text-red-500"}`}>
      {positive ? `+${qty}` : qty}
    </span>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function RecentOperationsTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent Operations</h2>
          <p className="text-xs text-slate-500 mt-0.5">Latest receipts, deliveries &amp; transfers</p>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:underline">View all</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ref</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentOperations.map((op) => (
              <tr key={op.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs text-slate-600 whitespace-nowrap">
                  {op.ref}
                </td>
                <td className="px-6 py-3.5 font-medium text-slate-800 whitespace-nowrap">
                  {op.product}
                </td>
                <td className="px-6 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadge[op.type]}`}>
                    {op.type}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <QtyCell qty={op.qty} />
                </td>
                <td className="px-6 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[op.status]}`}>
                    {op.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-slate-400 text-xs hidden md:table-cell whitespace-nowrap">
                  {op.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

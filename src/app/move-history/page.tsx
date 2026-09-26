import MoveHistoryTable from "@/components/MoveHistoryTable";
import { stockMoves } from "@/lib/data";

// Summary stat card — pure display, no interactivity needed
function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex flex-col gap-1">
      <span className="text-2xl font-bold text-slate-900 tabular-nums">{value}</span>
      <span className={`text-xs font-medium ${accent}`}>{label}</span>
    </div>
  );
}

// Page is a server component — data is static, filtering happens client-side
export default function MoveHistoryPage() {
  const total      = stockMoves.length;
  const receipts   = stockMoves.filter((m) => m.operationType === "Receipt").length;
  const deliveries = stockMoves.filter((m) => m.operationType === "Delivery").length;
  const transfers  = stockMoves.filter((m) => m.operationType === "Transfer").length;
  const adjustments= stockMoves.filter((m) => m.operationType === "Adjustment").length;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Move History</h2>
        <p className="text-sm text-slate-500 mt-1">
          Full stock ledger — every movement across all warehouses.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <StatCard label="Total Movements" value={total}       accent="text-slate-500"   />
        <StatCard label="Receipts"        value={receipts}    accent="text-blue-600"    />
        <StatCard label="Deliveries"      value={deliveries}  accent="text-emerald-600" />
        <StatCard label="Transfers"       value={transfers}   accent="text-violet-600"  />
        <StatCard label="Adjustments"     value={adjustments} accent="text-orange-600"  />
      </div>

      {/* Ledger table — client component handles search + filters */}
      <MoveHistoryTable moves={stockMoves} />
    </div>
  );
}

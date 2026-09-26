import MoveHistoryTable from "@/components/MoveHistoryTable";
import { stockMoves } from "@/lib/data";

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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 flex flex-col gap-1">
      <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{value}</span>
      <span className={`text-xs font-medium ${accent}`}>{label}</span>
    </div>
  );
}

export default function MoveHistoryPage() {
  const total       = stockMoves.length;
  const receipts    = stockMoves.filter((m) => m.operationType === "Receipt").length;
  const deliveries  = stockMoves.filter((m) => m.operationType === "Delivery").length;
  const transfers   = stockMoves.filter((m) => m.operationType === "Transfer").length;
  const adjustments = stockMoves.filter((m) => m.operationType === "Adjustment").length;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Move History</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Full stock ledger — every movement across all warehouses.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <StatCard label="Total Movements" value={total}       accent="text-slate-500"   />
        <StatCard label="Receipts"        value={receipts}    accent="text-blue-600"    />
        <StatCard label="Deliveries"      value={deliveries}  accent="text-emerald-600" />
        <StatCard label="Transfers"       value={transfers}   accent="text-violet-600"  />
        <StatCard label="Adjustments"     value={adjustments} accent="text-orange-600"  />
      </div>

      <MoveHistoryTable moves={stockMoves} />
    </div>
  );
}

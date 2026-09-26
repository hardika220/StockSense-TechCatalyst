"use client";

import { stockMovementData } from "@/lib/data";

const MAX_VALUE = 220; // scale ceiling for bar heights

function Bar({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) {
  const pct = Math.round((value / MAX_VALUE) * 100);
  return (
    <div className="flex flex-col items-center gap-1 group" title={`${label}: ${value}`}>
      <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {value}
      </span>
      <div className="relative w-4 bg-slate-100 rounded-sm overflow-hidden" style={{ height: 80 }}>
        <div
          className={`absolute bottom-0 w-full rounded-sm transition-all duration-500 ${color}`}
          style={{ height: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function StockMovementChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Stock Movement</h2>
          <p className="text-xs text-slate-500 mt-0.5">This week — receipts, deliveries &amp; transfers</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> Receipts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Deliveries
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-violet-400 inline-block" /> Transfers
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-2">
        {stockMovementData.map((point) => (
          <div key={point.label} className="flex flex-col items-center gap-2 flex-1">
            {/* Grouped bars */}
            <div className="flex items-end gap-1">
              <Bar value={point.receipts} color="bg-blue-500" label="Receipts" />
              <Bar value={point.deliveries} color="bg-emerald-500" label="Deliveries" />
              <Bar value={point.transfers} color="bg-violet-400" label="Transfers" />
            </div>
            {/* Day label */}
            <span className="text-xs text-slate-500">{point.label}</span>
          </div>
        ))}
      </div>

      {/* Y-axis hint */}
      <div className="mt-4 flex justify-between text-xs text-slate-400 border-t border-slate-100 pt-2">
        <span>0</span>
        <span>{MAX_VALUE / 2}</span>
        <span>{MAX_VALUE}</span>
      </div>
    </div>
  );
}

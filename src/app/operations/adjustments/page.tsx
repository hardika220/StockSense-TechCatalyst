"use client";

import { useState } from "react";

type Adjustment = {
  id: string;
  product: string;
  reason: string;
  quantity: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};

const adjustments: Adjustment[] = [
  { id: "ADJ-00412", product: "Wheat", reason: "Damaged Stock",          quantity: -10, date: "25 Sep 2026", status: "Approved" },
  { id: "ADJ-00411", product: "Rice",  reason: "Stock Count Correction", quantity: 15,  date: "24 Sep 2026", status: "Pending"  },
  { id: "ADJ-00410", product: "Maize", reason: "Expired Stock",          quantity: -8,  date: "23 Sep 2026", status: "Rejected" },
];

const statusBadge = (status: string) => {
  if (status === "Approved") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (status === "Pending")  return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
};

export default function AdjustmentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAdjustments =
    statusFilter === "All" ? adjustments : adjustments.filter((a) => a.status === statusFilter);

  const totalAdjustments = adjustments.length;
  const totalIncrease    = adjustments.filter((a) => a.quantity > 0).reduce((t, a) => t + a.quantity, 0);
  const totalDecrease    = adjustments.filter((a) => a.quantity < 0).reduce((t, a) => t + Math.abs(a.quantity), 0);
  const pendingCount     = adjustments.filter((a) => a.status === "Pending").length;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Inventory Adjustments</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage stock corrections and inventory adjustments</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Adjustments</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{totalAdjustments}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Stock Increase</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">+{totalIncrease}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Stock Decrease</p>
          <h2 className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400 tabular-nums">-{totalDecrease}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">{pendingCount}</h2>
        </div>
      </div>

      {/* Create Button */}
      <div>
        <button className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition">
          + Create Adjustment
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Adjustment Records</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track inventory corrections</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 text-sm outline-none focus:border-orange-500 transition"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
              <tr>
                {["Adjustment ID","Product","Reason","Quantity","Date","Status"].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredAdjustments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200 font-mono text-xs">{a.id}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{a.product}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{a.reason}</td>
                  <td className={`px-5 py-4 font-medium ${a.quantity > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {a.quantity > 0 ? "+" : ""}{a.quantity}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{a.date}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(a.status)}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

type Receipt = {
  id: string;
  supplier: string;
  product: string;
  quantity: number;
  date: string;
  status: "Pending" | "Completed" | "In Progress";
};

const receipts: Receipt[] = [
  { id: "REC-00124", supplier: "Green Agro Supplies", product: "Wheat", quantity: 120, date: "26 Sep 2026", status: "Completed"   },
  { id: "REC-00123", supplier: "Punjab Farm Store",   product: "Rice",  quantity: 200, date: "25 Sep 2026", status: "Pending"     },
  { id: "REC-00122", supplier: "Kisan Traders",       product: "Maize", quantity: 150, date: "24 Sep 2026", status: "In Progress" },
];

const statusBadge = (status: string) => {
  if (status === "Completed")  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (status === "Pending")    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
};

export default function ReceiptsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredReceipts =
    statusFilter === "All" ? receipts : receipts.filter((r) => r.status === statusFilter);

  const totalQuantity      = receipts.reduce((t, r) => t + r.quantity, 0);
  const pendingReceipts    = receipts.filter((r) => r.status === "Pending").length;
  const completedReceipts  = receipts.filter((r) => r.status === "Completed").length;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Receipts</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage incoming stock receipts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Receipts</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{receipts.length}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Quantity</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{totalQuantity}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">{pendingReceipts}</h2>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{completedReceipts}</h2>
        </div>
      </div>

      {/* Create Button */}
      <div>
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition">
          + Create Receipt
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Receipt Records</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track incoming stock</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
              <tr>
                {["Receipt ID","Supplier","Product","Quantity","Date","Status"].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredReceipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{r.supplier}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{r.product}</td>
                  <td className="px-5 py-4 font-medium text-emerald-600 dark:text-emerald-400">+{r.quantity}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{r.date}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
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

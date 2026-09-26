"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

type Operation = {
  id: string;
  type: "Receipt" | "Delivery" | "Adjustment";
  reference: string;
  date: string;
  status: "Pending" | "Completed" | "In Progress";
  quantity: number;
};

const operations: Operation[] = [
  { id: "1", type: "Receipt",    reference: "REC-00124", date: "26 Sep 2026", status: "Completed",   quantity: 120  },
  { id: "2", type: "Delivery",   reference: "DEL-00891", date: "26 Sep 2026", status: "In Progress", quantity: 75   },
  { id: "3", type: "Adjustment", reference: "ADJ-00412", date: "25 Sep 2026", status: "Completed",   quantity: -10  },
  { id: "4", type: "Receipt",    reference: "REC-00123", date: "25 Sep 2026", status: "Pending",     quantity: 200  },
];

const statusBadge = (status: string) => {
  if (status === "Completed") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (status === "Pending")   return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
};

export default function OperationsPage() {
  const [filter, setFilter] = useState("All");

  const filteredOperations =
    filter === "All" ? operations : operations.filter((o) => o.type === filter);

  const totalReceipts   = operations.filter((i) => i.type === "Receipt").length;
  const totalDeliveries = operations.filter((i) => i.type === "Delivery").length;
  const pending         = operations.filter((i) => i.status === "Pending").length;
  const adjustments     = operations.filter((i) => i.type === "Adjustment").length;

  return (
    <div className="flex h-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Operations" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-screen-xl mx-auto space-y-6">

            {/* Heading */}
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Operations</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage receipts, deliveries and inventory adjustments
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Receipts",           value: totalReceipts,   color: "text-slate-900 dark:text-slate-100" },
                { label: "Delivery Orders",    value: totalDeliveries, color: "text-slate-900 dark:text-slate-100" },
                { label: "Pending Operations", value: pending,         color: "text-amber-600 dark:text-amber-400"  },
                { label: "Adjustments",        value: adjustments,     color: "text-slate-900 dark:text-slate-100" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                  <h2 className={`mt-2 text-2xl font-bold tabular-nums ${color}`}>{value}</h2>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button className="rounded-xl bg-blue-600 p-5 text-left text-white hover:bg-blue-700 transition">
                <h3 className="font-semibold">Create Receipt</h3>
                <p className="mt-1 text-sm text-blue-100">Record incoming stock</p>
              </button>
              <button className="rounded-xl bg-emerald-600 p-5 text-left text-white hover:bg-emerald-700 transition">
                <h3 className="font-semibold">Create Delivery Order</h3>
                <p className="mt-1 text-sm text-emerald-100">Process outgoing stock</p>
              </button>
              <button className="rounded-xl bg-orange-500 p-5 text-left text-white hover:bg-orange-600 transition">
                <h3 className="font-semibold">Inventory Adjustment</h3>
                <p className="mt-1 text-sm text-orange-100">Adjust current stock</p>
              </button>
            </div>

            {/* Operations Table */}
            <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Operations</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Track the latest stock activities</p>
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
                >
                  <option value="All">All Operations</option>
                  <option value="Receipt">Receipts</option>
                  <option value="Delivery">Deliveries</option>
                  <option value="Adjustment">Adjustments</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      {["Type", "Reference", "Date", "Quantity", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredOperations.map((op) => (
                      <tr key={op.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{op.type}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{op.reference}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{op.date}</td>
                        <td className={`px-5 py-4 font-medium ${op.quantity < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                          {op.quantity > 0 ? "+" : ""}{op.quantity}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(op.status)}`}>
                            {op.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

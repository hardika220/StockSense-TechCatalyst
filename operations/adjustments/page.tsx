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
  {
    id: "ADJ-00412",
    product: "Wheat",
    reason: "Damaged Stock",
    quantity: -10,
    date: "25 Sep 2026",
    status: "Approved",
  },
  {
    id: "ADJ-00411",
    product: "Rice",
    reason: "Stock Count Correction",
    quantity: 15,
    date: "24 Sep 2026",
    status: "Pending",
  },
  {
    id: "ADJ-00410",
    product: "Maize",
    reason: "Expired Stock",
    quantity: -8,
    date: "23 Sep 2026",
    status: "Rejected",
  },
];

export default function AdjustmentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAdjustments =
    statusFilter === "All"
      ? adjustments
      : adjustments.filter(
          (adjustment) => adjustment.status === statusFilter
        );

  const totalAdjustments = adjustments.length;

  const totalIncrease = adjustments
    .filter((adjustment) => adjustment.quantity > 0)
    .reduce((total, adjustment) => total + adjustment.quantity, 0);

  const totalDecrease = adjustments
    .filter((adjustment) => adjustment.quantity < 0)
    .reduce((total, adjustment) => total + Math.abs(adjustment.quantity), 0);

  const pendingAdjustments = adjustments.filter(
    (adjustment) => adjustment.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Inventory Adjustments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage stock corrections and inventory adjustments
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Adjustments
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {totalAdjustments}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Stock Increase
          </p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            +{totalIncrease}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Stock Decrease
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-600">
            -{totalDecrease}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {pendingAdjustments}
          </h2>
        </div>
      </div>

      {/* Create Adjustment Button */}
      <div className="mt-6">
        <button className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-medium text-white hover:bg-orange-600">
          + Create Adjustment
        </button>
      </div>

      {/* Adjustment Table */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Adjustment Records
            </h2>

            <p className="text-sm text-slate-500">
              Track inventory corrections
            </p>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-orange-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">
                  Adjustment ID
                </th>

                <th className="px-5 py-3 font-medium">
                  Product
                </th>

                <th className="px-5 py-3 font-medium">
                  Reason
                </th>

                <th className="px-5 py-3 font-medium">
                  Quantity
                </th>

                <th className="px-5 py-3 font-medium">
                  Date
                </th>

                <th className="px-5 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAdjustments.map((adjustment) => (
                <tr
                  key={adjustment.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {adjustment.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {adjustment.product}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {adjustment.reason}
                  </td>

                  <td
                    className={`px-5 py-4 font-medium ${
                      adjustment.quantity > 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {adjustment.quantity > 0 ? "+" : ""}
                    {adjustment.quantity}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {adjustment.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        adjustment.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : adjustment.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {adjustment.status}
                    </span>
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
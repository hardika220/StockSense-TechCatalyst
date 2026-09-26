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
  {
    id: "REC-00124",
    supplier: "Green Agro Supplies",
    product: "Wheat",
    quantity: 120,
    date: "26 Sep 2026",
    status: "Completed",
  },
  {
    id: "REC-00123",
    supplier: "Punjab Farm Store",
    product: "Rice",
    quantity: 200,
    date: "25 Sep 2026",
    status: "Pending",
  },
  {
    id: "REC-00122",
    supplier: "Kisan Traders",
    product: "Maize",
    quantity: 150,
    date: "24 Sep 2026",
    status: "In Progress",
  },
];

export default function ReceiptsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredReceipts =
    statusFilter === "All"
      ? receipts
      : receipts.filter((receipt) => receipt.status === statusFilter);

  const totalQuantity = receipts.reduce(
    (total, receipt) => total + receipt.quantity,
    0
  );

  const pendingReceipts = receipts.filter(
    (receipt) => receipt.status === "Pending"
  ).length;

  const completedReceipts = receipts.filter(
    (receipt) => receipt.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Receipts
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage incoming stock receipts
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Receipts</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {receipts.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Quantity</p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {totalQuantity}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>

          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {pendingReceipts}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {completedReceipts}
          </h2>
        </div>
      </div>

      {/* Create Receipt Button */}
      <div className="mt-6">
        <button className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
          + Create Receipt
        </button>
      </div>

      {/* Receipt Table */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Receipt Records
            </h2>

            <p className="text-sm text-slate-500">
              Track incoming stock
            </p>
          </div>

          {/* Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">
                  Receipt ID
                </th>

                <th className="px-5 py-3 font-medium">
                  Supplier
                </th>

                <th className="px-5 py-3 font-medium">
                  Product
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
              {filteredReceipts.map((receipt) => (
                <tr
                  key={receipt.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {receipt.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {receipt.supplier}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {receipt.product}
                  </td>

                  <td className="px-5 py-4 font-medium text-emerald-600">
                    +{receipt.quantity}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {receipt.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        receipt.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : receipt.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {receipt.status}
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
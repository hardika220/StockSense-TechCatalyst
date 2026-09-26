"use client";

import { useState } from "react";

type Operation = {
  id: string;
  type: "Receipt" | "Delivery" | "Adjustment";
  reference: string;
  date: string;
  status: "Pending" | "Completed" | "In Progress";
  quantity: number;
};

const operations: Operation[] = [
  {
    id: "1",
    type: "Receipt",
    reference: "REC-00124",
    date: "26 Sep 2026",
    status: "Completed",
    quantity: 120,
  },
  {
    id: "2",
    type: "Delivery",
    reference: "DEL-00891",
    date: "26 Sep 2026",
    status: "In Progress",
    quantity: 75,
  },
  {
    id: "3",
    type: "Adjustment",
    reference: "ADJ-00412",
    date: "25 Sep 2026",
    status: "Completed",
    quantity: -10,
  },
  {
    id: "4",
    type: "Receipt",
    reference: "REC-00123",
    date: "25 Sep 2026",
    status: "Pending",
    quantity: 200,
  },
];

export default function OperationsPage() {
  const [filter, setFilter] = useState("All");

  const filteredOperations =
    filter === "All"
      ? operations
      : operations.filter((operation) => operation.type === filter);

  const totalReceipts = operations.filter(
    (item) => item.type === "Receipt"
  ).length;

  const totalDeliveries = operations.filter(
    (item) => item.type === "Delivery"
  ).length;

  const pending = operations.filter(
    (item) => item.status === "Pending"
  ).length;

  const adjustments = operations.filter(
    (item) => item.type === "Adjustment"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Operations
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage receipts, deliveries and inventory adjustments
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Receipts</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {totalReceipts}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Delivery Orders</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {totalDeliveries}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Pending Operations</p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Adjustments</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {adjustments}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="rounded-xl bg-blue-600 p-5 text-left text-white hover:bg-blue-700">
          <h3 className="font-semibold">Create Receipt</h3>
          <p className="mt-1 text-sm text-blue-100">
            Record incoming stock
          </p>
        </button>

        <button className="rounded-xl bg-emerald-600 p-5 text-left text-white hover:bg-emerald-700">
          <h3 className="font-semibold">Create Delivery Order</h3>
          <p className="mt-1 text-sm text-emerald-100">
            Process outgoing stock
          </p>
        </button>

        <button className="rounded-xl bg-orange-500 p-5 text-left text-white hover:bg-orange-600">
          <h3 className="font-semibold">Inventory Adjustment</h3>
          <p className="mt-1 text-sm text-orange-100">
            Adjust current stock
          </p>
        </button>
      </div>

      {/* Operations Table */}
      <div className="mt-6 rounded-xl bg-white shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Operations
            </h2>
            <p className="text-sm text-slate-500">
              Track the latest stock activities
            </p>
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Operations</option>
            <option value="Receipt">Receipts</option>
            <option value="Delivery">Deliveries</option>
            <option value="Adjustment">Adjustments</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Quantity</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOperations.map((operation) => (
                <tr key={operation.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <span className="font-medium text-slate-800">
                      {operation.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {operation.reference}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {operation.date}
                  </td>

                  <td
                    className={`px-5 py-4 font-medium ${
                      operation.quantity < 0
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {operation.quantity > 0 ? "+" : ""}
                    {operation.quantity}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        operation.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : operation.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {operation.status}
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
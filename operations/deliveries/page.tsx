"use client";

import { useState } from "react";

type Delivery = {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  date: string;
  status: "Pending" | "Completed" | "In Progress";
};

const deliveries: Delivery[] = [
  {
    id: "DEL-00891",
    customer: "Fresh Mart Pvt. Ltd.",
    product: "Wheat",
    quantity: 75,
    date: "26 Sep 2026",
    status: "In Progress",
  },
  {
    id: "DEL-00890",
    customer: "Punjab Food Industries",
    product: "Rice",
    quantity: 120,
    date: "25 Sep 2026",
    status: "Completed",
  },
  {
    id: "DEL-00889",
    customer: "Kisan Wholesale",
    product: "Maize",
    quantity: 90,
    date: "24 Sep 2026",
    status: "Pending",
  },
];

export default function DeliveriesPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredDeliveries =
    statusFilter === "All"
      ? deliveries
      : deliveries.filter(
          (delivery) => delivery.status === statusFilter
        );

  const totalQuantity = deliveries.reduce(
    (total, delivery) => total + delivery.quantity,
    0
  );

  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === "Pending"
  ).length;

  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Delivery Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage outgoing stock and delivery orders
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Deliveries
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {deliveries.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Quantity
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-600">
            {totalQuantity}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {pendingDeliveries}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {completedDeliveries}
          </h2>
        </div>
      </div>

      {/* Create Delivery Button */}
      <div className="mt-6">
        <button className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700">
          + Create Delivery Order
        </button>
      </div>

      {/* Delivery Table */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Delivery Records
            </h2>

            <p className="text-sm text-slate-500">
              Track outgoing stock deliveries
            </p>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-500"
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
                  Delivery ID
                </th>

                <th className="px-5 py-3 font-medium">
                  Customer
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
              {filteredDeliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {delivery.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {delivery.customer}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {delivery.product}
                  </td>

                  <td className="px-5 py-4 font-medium text-red-600">
                    -{delivery.quantity}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {delivery.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        delivery.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : delivery.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {delivery.status}
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
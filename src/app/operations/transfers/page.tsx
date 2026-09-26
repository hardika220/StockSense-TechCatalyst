"use client";

import { useState } from "react";
import TransfersTable from "@/components/TransfersTable";
import CreateTransferModal, {
  type TransferFormValues,
} from "@/components/CreateTransferModal";
import TransferDetailsModal from "@/components/TransferDetailsModal";
import { transfers as initialTransfers, products, type Transfer } from "@/lib/data";

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

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewing, setViewing]       = useState<Transfer | null>(null);

  const total     = transfers.length;
  const draft     = transfers.filter((t) => t.status === "Draft").length;
  const inTransit = transfers.filter((t) => t.status === "In Transit").length;
  const completed = transfers.filter((t) => t.status === "Completed").length;

  function handleCreate(values: TransferFormValues) {
    const product = products.find((p) => p.id === values.productId);
    if (!product) return;
    const n: Transfer = {
      id:            `tr-${Date.now()}`,
      ref:           `TRF-${new Date().getFullYear()}-${String(transfers.length + 1).padStart(3, "0")}`,
      datetime:      new Date().toISOString(),
      productName:   product.name,
      sku:           product.sku,
      unit:          product.unit,
      qty:           values.qty,
      fromWarehouse: values.fromWarehouse,
      toWarehouse:   values.toWarehouse,
      status:        "Draft",
      note:          values.note || undefined,
      initiatedBy:   "Current User",
    };
    setTransfers((p) => [n, ...p]);
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Internal Transfers</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track and manage stock movements between internal warehouses.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Transfers" value={total}     accent="text-slate-500"   />
          <StatCard label="Draft"           value={draft}     accent="text-slate-600 dark:text-slate-400" />
          <StatCard label="In Transit"      value={inTransit} accent="text-blue-600"    />
          <StatCard label="Completed"       value={completed} accent="text-emerald-600" />
        </div>

        <TransfersTable
          transfers={transfers}
          onCreate={() => setCreateOpen(true)}
          onView={(t) => setViewing(t)}
        />
      </div>

      <CreateTransferModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />
      <TransferDetailsModal
        transfer={viewing}
        onClose={() => setViewing(null)}
      />
    </>
  );
}

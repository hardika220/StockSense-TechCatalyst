"use client";

import { useState } from "react";
import TransfersTable from "@/components/TransfersTable";
import CreateTransferModal, {
  type TransferFormValues,
} from "@/components/CreateTransferModal";
import TransferDetailsModal from "@/components/TransferDetailsModal";
import {
  transfers as initialTransfers,
  products,
  type Transfer,
} from "@/lib/data";

// ── Stat card ─────────────────────────────────────────────────────────────────

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
    <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex flex-col gap-1">
      <span className="text-2xl font-bold text-slate-900 tabular-nums">{value}</span>
      <span className={`text-xs font-medium ${accent}`}>{label}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TransfersPage() {
  // Local state — swap useState seed for an API/SWR call when backend is ready
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewing, setViewing]       = useState<Transfer | null>(null);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total     = transfers.length;
  const draft     = transfers.filter((t) => t.status === "Draft").length;
  const inTransit = transfers.filter((t) => t.status === "In Transit").length;
  const completed = transfers.filter((t) => t.status === "Completed").length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleCreate(values: TransferFormValues) {
    const product = products.find((p) => p.id === values.productId);
    if (!product) return;

    const newTransfer: Transfer = {
      id:            `tr-${Date.now()}`,
      ref:           `TRF-${new Date().getFullYear()}-${String(transfers.length + 1).padStart(3, "0")}`,
      datetime:      new Date().toISOString(),
      productName:   product.name,
      sku:           product.sku,
      unit:          product.unit,
      qty:           values.qty,
      fromWarehouse: values.fromWarehouse,
      toWarehouse:   values.toWarehouse,
      // New transfers always start as Draft — backend can advance the status
      status:        "Draft",
      note:          values.note || undefined,
      initiatedBy:   "Current User",
    };

    setTransfers((prev) => [newTransfer, ...prev]);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Internal Transfers</h2>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage stock movements between internal warehouses.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Transfers" value={total}     accent="text-slate-500"   />
          <StatCard label="Draft"           value={draft}     accent="text-slate-600"   />
          <StatCard label="In Transit"      value={inTransit} accent="text-blue-600"    />
          <StatCard label="Completed"       value={completed} accent="text-emerald-600" />
        </div>

        {/* Transfers table */}
        <TransfersTable
          transfers={transfers}
          onCreate={() => setCreateOpen(true)}
          onView={(t) => setViewing(t)}
        />
      </div>

      {/* Create modal */}
      <CreateTransferModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      {/* Details modal */}
      <TransferDetailsModal
        transfer={viewing}
        onClose={() => setViewing(null)}
      />
    </>
  );
}

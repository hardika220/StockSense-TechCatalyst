"use client";

import { useState } from "react";
import WarehouseTable from "@/components/WarehouseTable";
import AddEditWarehouseModal, {
  type WarehouseFormValues,
} from "@/components/AddEditWarehouseModal";
import WarehouseDetailsModal from "@/components/WarehouseDetailsModal";
import { warehouses as initialWarehouses, type Warehouse } from "@/lib/data";

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

export default function WarehousePage() {
  // Local state — replace with API calls when backend is ready
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);

  const [addEditOpen, setAddEditOpen]   = useState(false);
  const [editing, setEditing]           = useState<Warehouse | null>(null);
  const [viewing, setViewing]           = useState<Warehouse | null>(null);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total       = warehouses.length;
  const active      = warehouses.filter((w) => w.status === "Active").length;
  const maintenance = warehouses.filter((w) => w.status === "Maintenance").length;
  const inactive    = warehouses.filter((w) => w.status === "Inactive").length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  function openAdd() {
    setEditing(null);
    setAddEditOpen(true);
  }

  function openEdit(wh: Warehouse) {
    setEditing(wh);
    setAddEditOpen(true);
  }

  function handleDelete(id: string) {
    setWarehouses((prev) => prev.filter((w) => w.id !== id));
  }

  function handleSave(values: WarehouseFormValues, id?: string) {
    if (id) {
      setWarehouses((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, ...values } : w
        )
      );
    } else {
      const newWarehouse: Warehouse = {
        id: `wh-${Date.now()}`,
        ...values,
        productCount: 0,
        totalStock: 0,
        createdAt: new Date().toISOString().split("T")[0],
        topProducts: [],
      };
      setWarehouses((prev) => [newWarehouse, ...prev]);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Warehouse</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your storage locations and monitor their stock levels.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Warehouses" value={total}       accent="text-slate-500"   />
          <StatCard label="Active"           value={active}      accent="text-emerald-600" />
          <StatCard label="Maintenance"      value={maintenance} accent="text-amber-600"   />
          <StatCard label="Inactive"         value={inactive}    accent="text-slate-400"   />
        </div>

        {/* Warehouse table */}
        <WarehouseTable
          warehouses={warehouses}
          onAdd={openAdd}
          onView={(wh) => setViewing(wh)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add / Edit modal */}
      <AddEditWarehouseModal
        warehouse={editing}
        isOpen={addEditOpen}
        onClose={() => setAddEditOpen(false)}
        onSave={handleSave}
      />

      {/* Details modal */}
      <WarehouseDetailsModal
        warehouse={viewing}
        onClose={() => setViewing(null)}
      />
    </>
  );
}

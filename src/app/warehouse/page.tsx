"use client";

import { useState } from "react";
import WarehouseTable from "@/components/WarehouseTable";
import AddEditWarehouseModal, {
  type WarehouseFormValues,
} from "@/components/AddEditWarehouseModal";
import WarehouseDetailsModal from "@/components/WarehouseDetailsModal";
import { warehouses as initialWarehouses, type Warehouse } from "@/lib/data";

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

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [editing, setEditing]         = useState<Warehouse | null>(null);
  const [viewing, setViewing]         = useState<Warehouse | null>(null);

  const total       = warehouses.length;
  const active      = warehouses.filter((w) => w.status === "Active").length;
  const maintenance = warehouses.filter((w) => w.status === "Maintenance").length;
  const inactive    = warehouses.filter((w) => w.status === "Inactive").length;

  function openAdd() { setEditing(null); setAddEditOpen(true); }
  function openEdit(wh: Warehouse) { setEditing(wh); setAddEditOpen(true); }
  function handleDelete(id: string) { setWarehouses((p) => p.filter((w) => w.id !== id)); }

  function handleSave(values: WarehouseFormValues, id?: string) {
    if (id) {
      setWarehouses((p) => p.map((w) => (w.id === id ? { ...w, ...values } : w)));
    } else {
      const n: Warehouse = {
        id: `wh-${Date.now()}`,
        ...values,
        productCount: 0,
        totalStock: 0,
        createdAt: new Date().toISOString().split("T")[0],
        topProducts: [],
      };
      setWarehouses((p) => [n, ...p]);
    }
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Warehouse</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your storage locations and monitor their stock levels.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Warehouses" value={total}       accent="text-slate-500"   />
          <StatCard label="Active"           value={active}      accent="text-emerald-600" />
          <StatCard label="Maintenance"      value={maintenance} accent="text-amber-600"   />
          <StatCard label="Inactive"         value={inactive}    accent="text-slate-400"   />
        </div>

        <WarehouseTable
          warehouses={warehouses}
          onAdd={openAdd}
          onView={(wh) => setViewing(wh)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddEditWarehouseModal
        warehouse={editing}
        isOpen={addEditOpen}
        onClose={() => setAddEditOpen(false)}
        onSave={handleSave}
      />
      <WarehouseDetailsModal
        warehouse={viewing}
        onClose={() => setViewing(null)}
      />
    </>
  );
}

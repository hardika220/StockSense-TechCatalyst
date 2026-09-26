"use client";

import { useState } from "react";
import ProductsTable from "@/components/ProductsTable";
import AddEditProductModal, {
  type ProductFormValues,
} from "@/components/AddEditProductModal";
import {
  products as initialProducts,
  getStockStatus,
  type Product,
} from "@/lib/data";

// ── Stat summary cards above the table ───────────────────────────────────────

function SummaryCard({
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

// ── Page component ────────────────────────────────────────────────────────────

export default function ProductsPage() {
  // Local state — swap for an API call when backend is ready
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total      = products.length;
  const inStock    = products.filter((p) => p.status === "In Stock").length;
  const lowStock   = products.filter((p) => p.status === "Low Stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleSave(values: ProductFormValues, id?: string) {
    if (id) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                ...values,
                status: getStockStatus(values.currentStock, values.reorderThreshold),
              }
            : p
        )
      );
    } else {
      // Add new — generate a simple id
      const newProduct: Product = {
        id: `p-${Date.now()}`,
        ...values,
        status: getStockStatus(values.currentStock, values.reorderThreshold),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Page heading */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Products</h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage your product catalogue and track stock levels.
            </p>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SummaryCard label="Total Products"  value={total}      accent="text-slate-500"    />
          <SummaryCard label="In Stock"        value={inStock}    accent="text-emerald-600"  />
          <SummaryCard label="Low Stock"       value={lowStock}   accent="text-amber-600"    />
          <SummaryCard label="Out of Stock"    value={outOfStock} accent="text-red-600"      />
        </div>

        {/* Products table */}
        <ProductsTable
          products={products}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add / Edit modal — rendered outside the content flow so it overlays correctly */}
      <AddEditProductModal
        product={editing}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

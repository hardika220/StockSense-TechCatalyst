"use client";

import { useState } from "react";
import ProductsTable from "@/components/ProductsTable";
import AddEditProductModal, {
  type ProductFormValues,
} from "@/components/AddEditProductModal";
import { products as initialProducts, getStockStatus, type Product } from "@/lib/data";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState<Product | null>(null);

  const total      = products.length;
  const inStock    = products.filter((p) => p.status === "In Stock").length;
  const lowStock   = products.filter((p) => p.status === "Low Stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length;

  function openAdd() { setEditing(null); setModalOpen(true); }
  function openEdit(product: Product) { setEditing(product); setModalOpen(true); }
  function handleDelete(id: string) { setProducts((p) => p.filter((x) => x.id !== id)); }

  function handleSave(values: ProductFormValues, id?: string) {
    if (id) {
      setProducts((p) =>
        p.map((x) =>
          x.id === id
            ? { ...x, ...values, status: getStockStatus(values.currentStock, values.reorderThreshold) }
            : x
        )
      );
    } else {
      setProducts((p) => [
        {
          id: `p-${Date.now()}`,
          ...values,
          status: getStockStatus(values.currentStock, values.reorderThreshold),
        },
        ...p,
      ]);
    }
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Products</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your product catalogue and track stock levels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Products"  value={total}      accent="text-slate-500"   />
          <StatCard label="In Stock"        value={inStock}    accent="text-emerald-600" />
          <StatCard label="Low Stock"       value={lowStock}   accent="text-amber-600"   />
          <StatCard label="Out of Stock"    value={outOfStock} accent="text-red-600"     />
        </div>

        <ProductsTable
          products={products}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddEditProductModal
        product={editing}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

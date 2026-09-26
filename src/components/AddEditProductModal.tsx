"use client";

import { useState, useEffect, useRef } from "react";
import type { Product, ProductCategory } from "@/lib/data";
import { PRODUCT_CATEGORIES, UNIT_OPTIONS, getStockStatus } from "@/lib/data";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductFormValues {
  name: string;
  sku: string;
  category: ProductCategory;
  unit: string;
  currentStock: number;
  reorderThreshold: number;
}

const EMPTY_FORM: ProductFormValues = {
  name: "",
  sku: "",
  category: "Raw Materials",
  unit: "pcs",
  currentStock: 0,
  reorderThreshold: 10,
};

interface AddEditProductModalProps {
  /** null = add mode, Product = edit mode */
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: ProductFormValues, id?: string) => void;
}

// ── Shared input / label styles ───────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

// ── Component ─────────────────────────────────────────────────────────────────

export default function AddEditProductModal({
  product,
  isOpen,
  onClose,
  onSave,
}: AddEditProductModalProps) {
  const isEdit = product !== null;
  const [form, setForm] = useState<ProductFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Populate form when editing, reset when adding
  useEffect(() => {
    if (!isOpen) return;
    if (product) {
      setForm({
        name: product.name,
        sku: product.sku,
        category: product.category,
        unit: product.unit,
        currentStock: product.currentStock,
        reorderThreshold: product.reorderThreshold,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [isOpen, product]);

  // Autofocus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ProductFormValues, string>> = {};
    if (!form.name.trim())         newErrors.name = "Product name is required.";
    if (!form.sku.trim())          newErrors.sku  = "SKU / Code is required.";
    if (form.currentStock < 0)     newErrors.currentStock = "Stock cannot be negative.";
    if (form.reorderThreshold < 0) newErrors.reorderThreshold = "Threshold cannot be negative.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(form, product?.id);
    onClose();
  }

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit Product" : "Add Product"}
    >
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? "Update the product details below."
                : "Fill in the details to add a new product to inventory."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close"
          >
            <IconX />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Row 1: Name */}
            <div>
              <label htmlFor="p-name" className={labelCls}>
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="p-name"
                type="text"
                placeholder="e.g. Steel Rod"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Row 2: SKU */}
            <div>
              <label htmlFor="p-sku" className={labelCls}>
                SKU / Code <span className="text-red-500">*</span>
              </label>
              <input
                id="p-sku"
                type="text"
                placeholder="e.g. RAW-SR-001"
                value={form.sku}
                onChange={(e) => set("sku", e.target.value.toUpperCase())}
                className={`${inputCls} font-mono`}
              />
              {errors.sku && (
                <p className="mt-1 text-xs text-red-600">{errors.sku}</p>
              )}
            </div>

            {/* Row 3: Category + Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="p-category" className={labelCls}>Category</label>
                <select
                  id="p-category"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value as ProductCategory)}
                  className={inputCls}
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="p-unit" className={labelCls}>Unit of Measure</label>
                <select
                  id="p-unit"
                  value={form.unit}
                  onChange={(e) => set("unit", e.target.value)}
                  className={inputCls}
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Initial / Current Stock + Reorder Threshold */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="p-stock" className={labelCls}>
                  {isEdit ? "Current Stock" : "Initial Stock"}
                </label>
                <input
                  id="p-stock"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={form.currentStock}
                  onChange={(e) =>
                    set("currentStock", Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className={`${inputCls} tabular-nums`}
                />
                {errors.currentStock && (
                  <p className="mt-1 text-xs text-red-600">{errors.currentStock}</p>
                )}
              </div>
              <div>
                <label htmlFor="p-threshold" className={labelCls}>Reorder Threshold</label>
                <input
                  id="p-threshold"
                  type="number"
                  min={0}
                  placeholder="10"
                  value={form.reorderThreshold}
                  onChange={(e) =>
                    set("reorderThreshold", Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className={`${inputCls} tabular-nums`}
                />
                {errors.reorderThreshold && (
                  <p className="mt-1 text-xs text-red-600">{errors.reorderThreshold}</p>
                )}
              </div>
            </div>

            {/* Stock status preview */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500">Projected status:</span>
              {(() => {
                const status = getStockStatus(form.currentStock, form.reorderThreshold);
                const style =
                  status === "In Stock"     ? "bg-emerald-100 text-emerald-700" :
                  status === "Low Stock"    ? "bg-amber-100   text-amber-700"   :
                                              "bg-red-100     text-red-700";
                return (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
                    {status}
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

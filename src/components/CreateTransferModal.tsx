"use client";

import { useState, useEffect, useRef } from "react";
import { INTERNAL_WAREHOUSES, products } from "@/lib/data";

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export interface TransferFormValues {
  fromWarehouse: string;
  toWarehouse: string;
  productId: string;
  qty: number;
  note: string;
}

const EMPTY_FORM: TransferFormValues = {
  fromWarehouse: "", toWarehouse: "", productId: "", qty: 1, note: "",
};

interface CreateTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: TransferFormValues) => void;
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const labelCls = "block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5";

export default function CreateTransferModal({ isOpen, onClose, onSave }: CreateTransferModalProps) {
  const [form, setForm]     = useState<TransferFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof TransferFormValues | "route", string>>>({});
  const firstSelectRef      = useRef<HTMLSelectElement>(null);

  useEffect(() => { if (!isOpen) return; setForm(EMPTY_FORM); setErrors({}); }, [isOpen]);
  useEffect(() => { if (isOpen) setTimeout(() => firstSelectRef.current?.focus(), 50); }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function set<K extends keyof TransferFormValues>(key: K, value: TransferFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev }; delete next[key];
      if (key === "fromWarehouse" || key === "toWarehouse") delete next.route;
      return next;
    });
  }

  function validate(): boolean {
    const e: Partial<Record<keyof TransferFormValues | "route", string>> = {};
    if (!form.fromWarehouse) e.fromWarehouse = "Source warehouse is required.";
    if (!form.toWarehouse)   e.toWarehouse   = "Destination warehouse is required.";
    if (form.fromWarehouse && form.toWarehouse && form.fromWarehouse === form.toWarehouse)
                             e.route = "Source and destination cannot be the same warehouse.";
    if (!form.productId)     e.productId = "Please select a product.";
    if (form.qty <= 0)       e.qty       = "Quantity must be greater than 0.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onSave(form); onClose();
  }

  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.id === form.productId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Create Transfer">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Create Transfer</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Move stock between internal warehouses.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition" aria-label="Close">
            <IconX />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* From / To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tf-from" className={labelCls}>From Warehouse <span className="text-red-500">*</span></label>
                <select ref={firstSelectRef} id="tf-from" value={form.fromWarehouse} onChange={(e) => set("fromWarehouse", e.target.value)} className={inputCls}>
                  <option value="">Select source…</option>
                  {INTERNAL_WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.fromWarehouse && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.fromWarehouse}</p>}
              </div>
              <div>
                <label htmlFor="tf-to" className={labelCls}>To Warehouse <span className="text-red-500">*</span></label>
                <select id="tf-to" value={form.toWarehouse} onChange={(e) => set("toWarehouse", e.target.value)} className={inputCls}>
                  <option value="">Select destination…</option>
                  {INTERNAL_WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.toWarehouse && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.toWarehouse}</p>}
              </div>
            </div>
            {errors.route && <p className="text-xs text-red-600 dark:text-red-400 -mt-2">{errors.route}</p>}

            {/* Product */}
            <div>
              <label htmlFor="tf-product" className={labelCls}>Product <span className="text-red-500">*</span></label>
              <select id="tf-product" value={form.productId} onChange={(e) => set("productId", e.target.value)} className={inputCls}>
                <option value="">Select product…</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.sku}</option>)}
              </select>
              {errors.productId && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.productId}</p>}
            </div>

            {/* Product preview */}
            {selectedProduct && (
              <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-mono text-slate-400 dark:text-slate-500">{selectedProduct.sku}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span>{selectedProduct.category}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span>Available: <span className={`font-semibold tabular-nums ${selectedProduct.currentStock === 0 ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-slate-200"}`}>{selectedProduct.currentStock} {selectedProduct.unit}</span></span>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label htmlFor="tf-qty" className={labelCls}>Quantity <span className="text-red-500">*</span></label>
              <input id="tf-qty" type="number" min={1} placeholder="0" value={form.qty}
                onChange={(e) => set("qty", Math.max(1, parseInt(e.target.value) || 1))}
                className={`${inputCls} tabular-nums`} />
              {errors.qty && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.qty}</p>}
              {selectedProduct && form.qty > selectedProduct.currentStock && (
                <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">⚠ Quantity exceeds available stock ({selectedProduct.currentStock} {selectedProduct.unit}).</p>
              )}
            </div>

            {/* Note */}
            <div>
              <label htmlFor="tf-note" className={labelCls}>Note (optional)</label>
              <textarea id="tf-note" rows={2} placeholder="e.g. Weekly production top-up…" value={form.note}
                onChange={(e) => set("note", e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm">
              Create Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

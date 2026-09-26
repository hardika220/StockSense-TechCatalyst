"use client";

import { useState, useEffect, useRef } from "react";
import type { Warehouse, WarehouseStatus } from "@/lib/data";
import { WAREHOUSE_STATUSES } from "@/lib/data";

// ── Icon ──────────────────────────────────────────────────────────────────────

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WarehouseFormValues {
  name: string;
  location: string;
  status: WarehouseStatus;
  manager: string;
  notes: string;
}

const EMPTY_FORM: WarehouseFormValues = {
  name: "",
  location: "",
  status: "Active",
  manager: "",
  notes: "",
};

interface AddEditWarehouseModalProps {
  /** null = add mode, Warehouse = edit mode */
  warehouse: Warehouse | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: WarehouseFormValues, id?: string) => void;
}

// ── Shared style constants ────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

// ── Component ─────────────────────────────────────────────────────────────────

export default function AddEditWarehouseModal({
  warehouse,
  isOpen,
  onClose,
  onSave,
}: AddEditWarehouseModalProps) {
  const isEdit = warehouse !== null;
  const [form, setForm]     = useState<WarehouseFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof WarehouseFormValues, string>>>({});
  const firstInputRef       = useRef<HTMLInputElement>(null);

  // Populate form on open
  useEffect(() => {
    if (!isOpen) return;
    if (warehouse) {
      setForm({
        name:     warehouse.name,
        location: warehouse.location,
        status:   warehouse.status,
        manager:  warehouse.manager,
        notes:    warehouse.notes ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [isOpen, warehouse]);

  // Autofocus
  useEffect(() => {
    if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function set<K extends keyof WarehouseFormValues>(key: K, value: WarehouseFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof WarehouseFormValues, string>> = {};
    if (!form.name.trim())     e.name     = "Warehouse name is required.";
    if (!form.location.trim()) e.location = "Location is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onSave(form, warehouse?.id);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit Warehouse" : "Add Warehouse"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEdit ? "Edit Warehouse" : "Add New Warehouse"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? "Update the warehouse details below."
                : "Fill in the details to register a new warehouse."}
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

            {/* Name */}
            <div>
              <label htmlFor="wh-name" className={labelCls}>
                Warehouse Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="wh-name"
                type="text"
                placeholder="e.g. North Hub"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="wh-location" className={labelCls}>
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="wh-location"
                type="text"
                placeholder="e.g. Logistics Park North, Oran"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className={inputCls}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>

            {/* Status + Manager */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="wh-status" className={labelCls}>Status</label>
                <div className="relative">
                  <select
                    id="wh-status"
                    value={form.status}
                    onChange={(e) => set("status", e.target.value as WarehouseStatus)}
                    className={inputCls}
                  >
                    {WAREHOUSE_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="wh-manager" className={labelCls}>Manager</label>
                <input
                  id="wh-manager"
                  type="text"
                  placeholder="e.g. Ahmed Benali"
                  value={form.manager}
                  onChange={(e) => set("manager", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="wh-notes" className={labelCls}>Notes (optional)</label>
              <textarea
                id="wh-notes"
                rows={3}
                placeholder="Any relevant notes about this warehouse…"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className={`${inputCls} resize-none`}
              />
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
              {isEdit ? "Save Changes" : "Add Warehouse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

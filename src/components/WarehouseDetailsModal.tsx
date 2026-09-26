"use client";

import { useEffect } from "react";
import type { Warehouse, WarehouseStatus } from "@/lib/data";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

const statusStyle: Record<WarehouseStatus, string> = {
  Active:      "bg-emerald-100 text-emerald-700",
  Inactive:    "bg-slate-100   text-slate-500",
  Maintenance: "bg-amber-100   text-amber-700",
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface WarehouseDetailsModalProps {
  warehouse: Warehouse | null;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WarehouseDetailsModal({
  warehouse,
  onClose,
}: WarehouseDetailsModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!warehouse) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [warehouse, onClose]);

  if (!warehouse) return null;

  const createdDate = new Date(warehouse.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${warehouse.name} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-semibold text-slate-900">{warehouse.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[warehouse.status]}`}>
                {warehouse.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <IconMapPin /> {warehouse.location}
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

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
              <p className="text-xl font-bold text-slate-900 tabular-nums">{warehouse.productCount}</p>
              <p className="text-xs text-slate-500 mt-0.5">Product Lines</p>
            </div>
            <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
              <p className="text-xl font-bold text-slate-900 tabular-nums">{warehouse.totalStock.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total Units</p>
            </div>
          </div>

          {/* Meta info */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="text-slate-400"><IconUser /></span>
              <span className="text-xs text-slate-500 w-20 shrink-0">Manager</span>
              <span className="font-medium">{warehouse.manager}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="text-slate-400"><IconCalendar /></span>
              <span className="text-xs text-slate-500 w-20 shrink-0">Created</span>
              <span className="font-medium">{createdDate}</span>
            </div>
          </div>

          {/* Notes */}
          {warehouse.notes && (
            <div className="px-4 py-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800">
              {warehouse.notes}
            </div>
          )}

          {/* Top products */}
          {warehouse.topProducts.length > 0 ? (
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Stored Products
              </h3>
              <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-50 px-4 py-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">SKU</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Qty</span>
                </div>
                {warehouse.topProducts.map((p) => (
                  <div key={p.sku} className="grid grid-cols-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <span className="text-sm text-slate-800 font-medium truncate pr-2">{p.productName}</span>
                    <span className="text-xs font-mono text-slate-500">{p.sku}</span>
                    <span className={`text-sm font-semibold tabular-nums text-right ${p.qty === 0 ? "text-red-500" : "text-slate-800"}`}>
                      {p.qty} {p.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">No products currently stored.</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg border border-slate-200 hover:bg-white hover:text-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

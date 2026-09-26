"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Warehouse, WarehouseStatus } from "@/lib/data";
import { WAREHOUSE_STATUSES } from "@/lib/data";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconDotsVertical() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="5"  r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

const statusStyle: Record<WarehouseStatus, string> = {
  Active:      "bg-emerald-100 text-emerald-700",
  Inactive:    "bg-slate-100   text-slate-500",
  Maintenance: "bg-amber-100   text-amber-700",
};

function StatusBadge({ status }: { status: WarehouseStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

// ── Row action menu ───────────────────────────────────────────────────────────

function ActionMenu({
  onView,
  onEdit,
  onDelete,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
        aria-label="Actions"
      >
        <IconDotsVertical />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-sm">
          <button
            onClick={() => { onView(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="text-slate-400"><IconEye /></span> View
          </button>
          <button
            onClick={() => { onEdit(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
          >
            <span className="text-slate-400"><IconEdit /></span> Edit
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 transition"
          >
            <span className="text-red-400"><IconTrash /></span> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface WarehouseTableProps {
  warehouses: Warehouse[];
  onAdd: () => void;
  onView: (warehouse: Warehouse) => void;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (id: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WarehouseTable({
  warehouses,
  onAdd,
  onView,
  onEdit,
  onDelete,
}: WarehouseTableProps) {
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return warehouses.filter((w) => {
      const matchSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q);
      const matchStatus = !statusFilter || w.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [warehouses, search, statusFilter]);

  const hasFilters = search || statusFilter;

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
        {/* Left: search + status filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="Search by name or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60 transition"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition"
            >
              <option value="">Status: All</option>
              {WAREHOUSE_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
              <IconChevronDown />
            </span>
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setStatusFilter(""); }}
              className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right: count + Add button */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            {filtered.length} of {warehouses.length} warehouses
          </span>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            <IconPlus /> Add Warehouse
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Warehouse</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Location</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Products</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Total Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                  No warehouses match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((wh) => (
                <tr
                  key={wh.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onView(wh)}
                >
                  {/* Name + manager */}
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-slate-800 whitespace-nowrap">{wh.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{wh.manager}</p>
                  </td>
                  {/* Location */}
                  <td className="px-6 py-3.5 text-xs text-slate-500 hidden md:table-cell max-w-[200px] truncate">
                    {wh.location}
                  </td>
                  {/* Product count */}
                  <td className="px-6 py-3.5 text-right font-semibold tabular-nums text-slate-700 hidden sm:table-cell">
                    {wh.productCount}
                  </td>
                  {/* Total stock */}
                  <td className="px-6 py-3.5 text-right font-semibold tabular-nums text-slate-700 hidden sm:table-cell">
                    {wh.totalStock.toLocaleString()}
                  </td>
                  {/* Status */}
                  <td className="px-6 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <StatusBadge status={wh.status} />
                  </td>
                  {/* Actions — stop row-click propagation so the menu works independently */}
                  <td className="px-6 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu
                      onView={() => onView(wh)}
                      onEdit={() => onEdit(wh)}
                      onDelete={() => onDelete(wh.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} warehouse{filtered.length !== 1 ? "s" : ""}
          {hasFilters ? " (filtered)" : ""}
          {" · "}Click any row to view details.
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Transfer, TransferStatus } from "@/lib/data";
import { TRANSFER_STATUSES, INTERNAL_WAREHOUSES } from "@/lib/data";

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
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
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
function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Badge maps ────────────────────────────────────────────────────────────────

const statusStyle: Record<TransferStatus, string> = {
  "Draft":      "bg-slate-100  text-slate-600",
  "In Transit": "bg-blue-100   text-blue-700",
  "Completed":  "bg-emerald-100 text-emerald-700",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TransferStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

function RouteCell({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 whitespace-nowrap">
      <span className="font-medium text-slate-700">{from}</span>
      <IconArrowRight />
      <span className="font-medium text-slate-700">{to}</span>
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition"
      >
        <option value="">{label}: All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400">
        <IconChevronDown />
      </span>
    </div>
  );
}

function ActionMenu({
  onView,
}: {
  onView: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
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
            <span className="text-slate-400"><IconEye /></span> View Details
          </button>
        </div>
      )}
    </div>
  );
}

// ── DateTime helper ───────────────────────────────────────────────────────────

function formatDatetime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface TransfersTableProps {
  transfers: Transfer[];
  onCreate: () => void;
  onView: (transfer: Transfer) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TransfersTable({
  transfers,
  onCreate,
  onView,
}: TransfersTableProps) {
  const [search,      setSearch]      = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromFilter,   setFromFilter]   = useState("");
  const [toFilter,     setToFilter]     = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return transfers.filter((t) => {
      const matchSearch =
        !q ||
        t.productName.toLowerCase().includes(q) ||
        t.sku.toLowerCase().includes(q) ||
        t.ref.toLowerCase().includes(q);
      const matchStatus = !statusFilter || t.status === statusFilter;
      const matchFrom   = !fromFilter   || t.fromWarehouse === fromFilter;
      const matchTo     = !toFilter     || t.toWarehouse   === toFilter;
      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [transfers, search, statusFilter, fromFilter, toFilter]);

  const hasFilters = search || statusFilter || fromFilter || toFilter;

  function clearFilters() {
    setSearch(""); setStatusFilter(""); setFromFilter(""); setToFilter("");
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
        {/* Left: search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="Search product, SKU or ref…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60 transition"
            />
          </div>

          <span className="text-slate-400 hidden sm:block"><IconFilter /></span>

          <FilterSelect
            label="Status"
            value={statusFilter}
            options={TRANSFER_STATUSES}
            onChange={setStatusFilter}
          />
          <FilterSelect
            label="From"
            value={fromFilter}
            options={INTERNAL_WAREHOUSES}
            onChange={setFromFilter}
          />
          <FilterSelect
            label="To"
            value={toFilter}
            options={INTERNAL_WAREHOUSES}
            onChange={setToFilter}
          />

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right: count + create button */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            {filtered.length} of {transfers.length} transfers
          </span>
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            <IconPlus /> Create Transfer
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ref</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap hidden sm:table-cell">Date &amp; Time</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">SKU</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Qty</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Route</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">
                  No transfers match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((t) => {
                const { date, time } = formatDatetime(t.datetime);
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => onView(t)}
                  >
                    {/* Ref */}
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {t.ref}
                    </td>
                    {/* Date */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <p className="text-xs font-medium text-slate-700 whitespace-nowrap">{date}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                    </td>
                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-800 whitespace-nowrap">{t.productName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{t.initiatedBy}</p>
                    </td>
                    {/* SKU */}
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap hidden md:table-cell">
                      {t.sku}
                    </td>
                    {/* Qty */}
                    <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-slate-800">
                      {t.qty} {t.unit}
                    </td>
                    {/* Route */}
                    <td className="px-5 py-3.5 hidden lg:table-cell" onClick={(e) => e.stopPropagation()}>
                      <RouteCell from={t.fromWarehouse} to={t.toWarehouse} />
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge status={t.status} />
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <ActionMenu onView={() => onView(t)} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} transfer{filtered.length !== 1 ? "s" : ""}
          {hasFilters ? " (filtered)" : ""}
          {" · "}Click any row to view details.
        </div>
      )}
    </div>
  );
}

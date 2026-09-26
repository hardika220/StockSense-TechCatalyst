"use client";

import { useState, useMemo } from "react";
import type { StockMove, MoveOperationType, MoveStatus } from "@/lib/data";
import { MOVE_OPERATION_TYPES, MOVE_STATUSES, WAREHOUSES } from "@/lib/data";

// ── Inline SVG icons ─────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
function IconArrowUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

// ── Badge style maps ──────────────────────────────────────────────────────────

const opTypeBadge: Record<MoveOperationType, string> = {
  Receipt:    "bg-blue-100   text-blue-700",
  Delivery:   "bg-emerald-100 text-emerald-700",
  Transfer:   "bg-violet-100 text-violet-700",
  Adjustment: "bg-orange-100 text-orange-700",
};

const statusBadge: Record<MoveStatus, string> = {
  Completed: "bg-green-100 text-green-700",
  Pending:   "bg-amber-100 text-amber-700",
  Cancelled: "bg-slate-100 text-slate-500",
};

// ── Qty cell — colour + sign ──────────────────────────────────────────────────

function QtyCell({ qty, unit }: { qty: number; unit: string }) {
  const positive = qty >= 0;
  return (
    <span className={`inline-flex items-center gap-1 font-semibold tabular-nums text-sm ${
      positive ? "text-emerald-600" : "text-red-500"
    }`}>
      {positive ? <IconArrowUp /> : <IconArrowDown />}
      {positive ? `+${qty}` : qty} {unit}
    </span>
  );
}

// ── DateTime formatter ────────────────────────────────────────────────────────

function formatDatetime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit",
  });
  return { date, time };
}

// ── Filter select ─────────────────────────────────────────────────────────────

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

// ── Props ─────────────────────────────────────────────────────────────────────

export interface MoveHistoryTableProps {
  moves: StockMove[];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MoveHistoryTable({ moves }: MoveHistoryTableProps) {
  const [search,    setSearch]    = useState("");
  const [opFilter,  setOpFilter]  = useState("");
  const [whFilter,  setWhFilter]  = useState("");
  const [stFilter,  setStFilter]  = useState("");

  // Warehouses list minus the placeholder "—"
  const warehouseOptions = WAREHOUSES.filter((w) => w !== "—");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return moves.filter((m) => {
      const matchSearch =
        !q ||
        m.productName.toLowerCase().includes(q) ||
        m.sku.toLowerCase().includes(q) ||
        m.ref.toLowerCase().includes(q);
      const matchOp = !opFilter || m.operationType === opFilter;
      const matchWh =
        !whFilter ||
        m.sourceWarehouse === whFilter ||
        m.destinationWarehouse === whFilter;
      const matchSt = !stFilter || m.status === stFilter;
      return matchSearch && matchOp && matchWh && matchSt;
    });
  }, [moves, search, opFilter, whFilter, stFilter]);

  const hasFilters = search || opFilter || whFilter || stFilter;

  function clearFilters() {
    setSearch("");
    setOpFilter("");
    setWhFilter("");
    setStFilter("");
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
        {/* Left: search + filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
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

          {/* Filters */}
          <span className="text-slate-400 hidden sm:block"><IconFilter /></span>

          <FilterSelect
            label="Operation"
            value={opFilter}
            options={MOVE_OPERATION_TYPES}
            onChange={setOpFilter}
          />
          <FilterSelect
            label="Warehouse"
            value={whFilter}
            options={warehouseOptions}
            onChange={setWhFilter}
          />
          <FilterSelect
            label="Status"
            value={stFilter}
            options={MOVE_STATUSES}
            onChange={setStFilter}
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

        {/* Right: result count */}
        <span className="text-xs text-slate-500 shrink-0">
          {filtered.length} of {moves.length} records
        </span>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Date &amp; Time</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">SKU</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Operation</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Source</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Destination</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Quantity</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">
                  No stock movements match your search or filters.
                </td>
              </tr>
            ) : (
              filtered.map((move) => {
                const { date, time } = formatDatetime(move.datetime);
                return (
                  <tr key={move.id} className="hover:bg-slate-50 transition-colors">
                    {/* Date & Time */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="text-xs font-medium text-slate-700">{date}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                    </td>
                    {/* Product + ref */}
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-800 whitespace-nowrap">{move.productName}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{move.ref}</p>
                    </td>
                    {/* SKU */}
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap hidden md:table-cell">
                      {move.sku}
                    </td>
                    {/* Operation type */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${opTypeBadge[move.operationType]}`}>
                        {move.operationType}
                      </span>
                    </td>
                    {/* Source */}
                    <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap hidden lg:table-cell">
                      {move.sourceWarehouse}
                    </td>
                    {/* Destination */}
                    <td className="px-5 py-3.5 text-xs text-slate-600 whitespace-nowrap hidden lg:table-cell">
                      {move.destinationWarehouse}
                    </td>
                    {/* Quantity */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <QtyCell qty={move.qty} unit={move.unit} />
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[move.status]}`}>
                        {move.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ── */}
      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          {hasFilters ? " (filtered)" : ""}
        </div>
      )}
    </div>
  );
}

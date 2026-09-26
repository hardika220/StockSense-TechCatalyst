"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Transfer, TransferStatus } from "@/lib/data";
import { TRANSFER_STATUSES, INTERNAL_WAREHOUSES } from "@/lib/data";

function IconSearch() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>; }
function IconPlus()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>; }
function IconFilter(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>; }
function IconChevronDown(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9" /></svg>; }
function IconEye()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>; }
function IconDotsVertical(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="5" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="19" r="1" fill="currentColor" /></svg>; }
function IconArrowRight(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>; }

const statusStyle: Record<TransferStatus, string> = {
  "Draft":      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  "In Transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Completed":  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

function StatusBadge({ status }: { status: TransferStatus }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[status]}`}>{status}</span>;
}

function RouteCell({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
      <span className="font-medium text-slate-700 dark:text-slate-300">{from}</span>
      <IconArrowRight />
      <span className="font-medium text-slate-700 dark:text-slate-300">{to}</span>
    </span>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}
        className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition">
        <option value="">{label}: All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400"><IconChevronDown /></span>
    </div>
  );
}

function ActionMenu({ onView }: { onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition" aria-label="Actions">
        <IconDotsVertical />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 text-sm">
          <button onClick={() => { onView(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <span className="text-slate-400"><IconEye /></span> View Details
          </button>
        </div>
      )}
    </div>
  );
}

function formatDatetime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

export interface TransfersTableProps { transfers: Transfer[]; onCreate: () => void; onView: (t: Transfer) => void; }

export default function TransfersTable({ transfers, onCreate, onView }: TransfersTableProps) {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromFilter,   setFromFilter]   = useState("");
  const [toFilter,     setToFilter]     = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return transfers.filter((t) => {
      const matchSearch = !q || t.productName.toLowerCase().includes(q) || t.sku.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q);
      return matchSearch && (!statusFilter || t.status === statusFilter) && (!fromFilter || t.fromWarehouse === fromFilter) && (!toFilter || t.toWarehouse === toFilter);
    });
  }, [transfers, search, statusFilter, fromFilter, toFilter]);

  const hasFilters = search || statusFilter || fromFilter || toFilter;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none"><IconSearch /></span>
            <input type="text" placeholder="Search product, SKU or ref…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60 transition" />
          </div>
          <span className="text-slate-400 hidden sm:block"><IconFilter /></span>
          <FilterSelect label="Status" value={statusFilter} options={TRANSFER_STATUSES} onChange={setStatusFilter} />
          <FilterSelect label="From" value={fromFilter} options={INTERNAL_WAREHOUSES} onChange={setFromFilter} />
          <FilterSelect label="To" value={toFilter} options={INTERNAL_WAREHOUSES} onChange={setToFilter} />
          {hasFilters && (
            <button onClick={() => { setSearch(""); setStatusFilter(""); setFromFilter(""); setToFilter(""); }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline underline-offset-2 transition">Clear</button>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">{filtered.length} of {transfers.length} transfers</span>
          <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm">
            <IconPlus /> Create Transfer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
              {[
                { label: "Ref",        cls: "" },
                { label: "Date & Time",cls: "hidden sm:table-cell whitespace-nowrap" },
                { label: "Product",    cls: "" },
                { label: "SKU",        cls: "hidden md:table-cell" },
                { label: "Qty",        cls: "text-right" },
                { label: "Route",      cls: "hidden lg:table-cell" },
                { label: "Status",     cls: "" },
                { label: "Actions",    cls: "text-right" },
              ].map(({ label, cls }) => (
                <th key={label} className={`px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide ${cls}`}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400 dark:text-slate-500">No transfers match your search or filters.</td></tr>
            ) : filtered.map((t) => {
              const { date, time } = formatDatetime(t.datetime);
              return (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer" onClick={() => onView(t)}>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{t.ref}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{date}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{time}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{t.productName}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.initiatedBy}</p>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap hidden md:table-cell">{t.sku}</td>
                  <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-slate-800 dark:text-slate-200">{t.qty} {t.unit}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell" onClick={(e) => e.stopPropagation()}>
                    <RouteCell from={t.fromWarehouse} to={t.toWarehouse} />
                  </td>
                  <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}><StatusBadge status={t.status} /></td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}><ActionMenu onView={() => onView(t)} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500">
          Showing {filtered.length} transfer{filtered.length !== 1 ? "s" : ""}{hasFilters ? " (filtered)" : ""}{" · "}Click any row to view details.
        </div>
      )}
    </div>
  );
}

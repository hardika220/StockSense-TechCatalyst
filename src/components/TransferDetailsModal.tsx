"use client";

import { useEffect } from "react";
import type { Transfer, TransferStatus } from "@/lib/data";

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const statusStyle: Record<TransferStatus, string> = {
  "Draft":      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  "In Transit": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Completed":  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-xs text-slate-400 dark:text-slate-500 w-32 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-800 dark:text-slate-200 font-medium flex-1">{children}</span>
    </div>
  );
}

interface TransferDetailsModalProps { transfer: Transfer | null; onClose: () => void; }

export default function TransferDetailsModal({ transfer, onClose }: TransferDetailsModalProps) {
  useEffect(() => {
    if (!transfer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [transfer, onClose]);

  if (!transfer) return null;

  const datetime = new Date(transfer.datetime);
  const formatted = {
    date: datetime.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
    time: datetime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Transfer ${transfer.ref}`}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 font-mono">{transfer.ref}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[transfer.status]}`}>{transfer.status}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formatted.date} at {formatted.time}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition" aria-label="Close">
            <IconX />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Route visual */}
          <div className="flex items-center justify-center gap-3 px-4 py-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 mb-5">
            <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">From</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{transfer.fromWarehouse}</p>
            </div>
            <span className="text-slate-400 dark:text-slate-500 mt-4"><IconArrowRight /></span>
            <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">To</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{transfer.toWarehouse}</p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="rounded-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
            <DetailRow label="Product">{transfer.productName}</DetailRow>
            <DetailRow label="SKU"><span className="font-mono text-slate-600 dark:text-slate-400">{transfer.sku}</span></DetailRow>
            <DetailRow label="Quantity"><span className="tabular-nums">{transfer.qty} {transfer.unit}</span></DetailRow>
            <DetailRow label="Initiated by">{transfer.initiatedBy}</DetailRow>
            {transfer.note && (
              <DetailRow label="Note"><span className="text-slate-600 dark:text-slate-400 font-normal">{transfer.note}</span></DetailRow>
            )}
          </div>

          {transfer.status === "Completed" && (
            <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              This transfer is complete. A corresponding entry has been recorded in Move History.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { products, stockMoves, transfers } from "@/lib/data";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ResultKind = "product" | "movement" | "transfer";

interface SearchResult {
  id: string;
  kind: ResultKind;
  primary: string;
  secondary: string;
  href: string;
}

// Per-category result limits — prevents one category from drowning the others
const LIMIT_PRODUCTS  = 5;
const LIMIT_MOVEMENTS = 3;
const LIMIT_TRANSFERS = 3;

const kindIcon: Record<ResultKind, React.ReactNode> = {
  product:  <IconBox />,
  movement: <IconHistory />,
  transfer: <IconArrow />,
};
const kindLabel: Record<ResultKind, string> = {
  product:  "Product",
  movement: "Movement",
  transfer: "Transfer",
};
const kindColor: Record<ResultKind, string> = {
  product:  "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
  movement: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300",
  transfer: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function GlobalSearch() {
  const [query, setQuery]   = useState("");
  const [open,  setOpen]    = useState(false);
  const inputRef            = useRef<HTMLInputElement>(null);
  const containerRef        = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  // ── Search logic ────────────────────────────────────────────────────────────

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const out: SearchResult[] = [];

    // Products — name + SKU match
    for (const p of products) {
      if (out.filter((r) => r.kind === "product").length >= LIMIT_PRODUCTS) break;
      if (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) {
        out.push({
          id:        p.id,
          kind:      "product",
          primary:   p.name,
          secondary: `${p.sku} · ${p.category} · ${p.currentStock} ${p.unit}`,
          href:      "/products",
        });
      }
    }

    // Stock moves — product name, SKU, or reference
    for (const m of stockMoves) {
      if (out.filter((r) => r.kind === "movement").length >= LIMIT_MOVEMENTS) break;
      if (
        m.productName.toLowerCase().includes(q) ||
        m.sku.toLowerCase().includes(q) ||
        m.ref.toLowerCase().includes(q)
      ) {
        out.push({
          id:        m.id,
          kind:      "movement",
          primary:   `${m.ref} — ${m.productName}`,
          secondary: `${m.operationType} · ${m.qty > 0 ? "+" : ""}${m.qty} ${m.unit} · ${m.status}`,
          href:      "/move-history",
        });
      }
    }

    // Transfers — product name, SKU, or reference
    for (const t of transfers) {
      if (out.filter((r) => r.kind === "transfer").length >= LIMIT_TRANSFERS) break;
      if (
        t.productName.toLowerCase().includes(q) ||
        t.sku.toLowerCase().includes(q) ||
        t.ref.toLowerCase().includes(q)
      ) {
        out.push({
          id:        t.id,
          kind:      "transfer",
          primary:   `${t.ref} — ${t.productName}`,
          secondary: `${t.fromWarehouse} → ${t.toWarehouse} · ${t.qty} ${t.unit} · ${t.status}`,
          href:      "/operations/transfers",
        });
      }
    }

    return out;
  }, [query]);

  // Show dropdown whenever there is a non-empty query AND the input is focused
  const showDropdown = open && query.trim().length > 0;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  }, []);

  const handleFocus = useCallback(() => {
    // Always open on focus so a re-focused input with existing text shows results
    setOpen(true);
  }, []);

  const clear = useCallback(() => {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }, []);

  return (
    // Keep position:relative here so the absolutely-positioned dropdown is anchored to this element
    <div ref={containerRef} className="relative hidden sm:block">
      {/* ── Input ── */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
          <IconSearch />
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products, refs…"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          autoComplete="off"
          spellCheck={false}
          aria-label="Global search"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          className="pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56 transition"
        />
        {/* Clear button — only visible when there is a query */}
        {query && (
          <button
            onMouseDown={(e) => {
              // Prevent the input blur that would fire before onClick
              e.preventDefault();
              clear();
            }}
            className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            aria-label="Clear search"
          >
            <IconX />
          </button>
        )}
      </div>

      {/* ── Dropdown — rendered as fixed to avoid clipping by overflow:hidden ancestors ── */}
      {showDropdown && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 top-full mt-2 w-[28rem] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl z-[9999] overflow-hidden"
        >
          {results.length === 0 ? (
            /* ── Empty state ── */
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No results found
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Try a product name, SKU, or reference number.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
                <button
                  onMouseDown={(e) => { e.preventDefault(); clear(); }}
                  className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
                >
                  Clear
                </button>
              </div>

              {/* Result rows */}
              <ul className="py-1 max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/50">
                {results.map((r) => (
                  <li key={`${r.kind}-${r.id}`} role="option">
                    <Link
                      href={r.href}
                      onClick={() => { setOpen(false); setQuery(""); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      {/* Kind icon bubble */}
                      <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${kindColor[r.kind]}`}>
                        {kindIcon[r.kind]}
                      </span>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                          {r.primary}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                          {r.secondary}
                        </p>
                      </div>
                      {/* Kind pill */}
                      <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                        {kindLabel[r.kind]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

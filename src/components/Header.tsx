"use client";

import { useState } from "react";

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Dashboard" }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      {/* Left — page title */}
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>

      {/* Right — search + actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Search products, refs…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56 transition"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Notifications"
        >
          <IconBell />
          {/* badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold select-none">
            JD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-800 leading-none">John Doe</p>
            <p className="text-xs text-slate-500 mt-0.5">Warehouse Manager</p>
          </div>
        </button>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTheme, type Theme } from "@/context/ThemeContext";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AppSettings {
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timezone: string;
  lowStockThresholdOverride: number;
  defaultUnit: string;
  currency: string;
  notifyLowStock: boolean;
  notifyPendingReceipts: boolean;
  notifyPendingDeliveries: boolean;
  notifyTransferCompleted: boolean;
  notifyStockAdjustment: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  dateFormat: "DD/MM/YYYY",
  timezone: "Africa/Algiers",
  lowStockThresholdOverride: 0,
  defaultUnit: "pcs",
  currency: "DZD",
  notifyLowStock: true,
  notifyPendingReceipts: true,
  notifyPendingDeliveries: true,
  notifyTransferCompleted: true,
  notifyStockAdjustment: false,
};

const STORAGE_KEY = "stocksense_settings";

function loadSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as AppSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(s: AppSettings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

// ── Shared style helpers ──────────────────────────────────────────────────────

const selectCls =
  "px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-4 space-y-4">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
        checked ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ── Theme option button ───────────────────────────────────────────────────────

function ThemeOption({
  value,
  current,
  label,
  icon,
  onSelect,
}: {
  value: Theme;
  current: Theme;
  label: string;
  icon: React.ReactNode;
  onSelect: (v: Theme) => void;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
        active
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
          : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
      }`}
      aria-pressed={active}
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
      {active && (
        <span className="w-2 h-2 rounded-full bg-blue-500 mt-0.5" />
      )}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setSettings(loadSettings()); }, []);

  function set<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Heading */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Settings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure your StockSense preferences. Changes are saved locally.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Saved
          </span>
        )}
      </div>

      {/* ── Appearance ── */}
      <SectionCard
        title="Appearance"
        description="Choose how StockSense looks. Your preference is saved in the browser."
      >
        <div className="grid grid-cols-3 gap-3">
          <ThemeOption
            value="light"
            current={theme}
            label="Light"
            icon="☀️"
            onSelect={setTheme}
          />
          <ThemeOption
            value="dark"
            current={theme}
            label="Dark"
            icon="🌙"
            onSelect={setTheme}
          />
          <ThemeOption
            value="system"
            current={theme}
            label="System"
            icon="💻"
            onSelect={setTheme}
          />
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          System default follows your OS or browser colour scheme preference.
        </p>
      </SectionCard>

      {/* ── Display ── */}
      <SectionCard
        title="Display"
        description="How dates and data are shown across the app."
      >
        <SettingRow label="Date Format" description="Format used throughout the application.">
          <select
            value={settings.dateFormat}
            onChange={(e) => set("dateFormat", e.target.value as AppSettings["dateFormat"])}
            className={selectCls}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </SettingRow>

        <SettingRow label="Timezone" description="Used for displaying operation timestamps.">
          <select
            value={settings.timezone}
            onChange={(e) => set("timezone", e.target.value)}
            className={selectCls}
          >
            <option value="Africa/Algiers">Africa/Algiers (GMT+1)</option>
            <option value="Europe/Paris">Europe/Paris (GMT+1/+2)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New York (EST)</option>
            <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
          </select>
        </SettingRow>

        <SettingRow label="Currency" description="Currency symbol shown in reports.">
          <select
            value={settings.currency}
            onChange={(e) => set("currency", e.target.value)}
            className={selectCls}
          >
            <option value="DZD">DZD — Algerian Dinar</option>
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
          </select>
        </SettingRow>
      </SectionCard>

      {/* ── Inventory ── */}
      <SectionCard
        title="Inventory"
        description="Default values used when creating products and operations."
      >
        <SettingRow
          label="Default Unit of Measure"
          description="Pre-selected unit when adding a new product."
        >
          <select
            value={settings.defaultUnit}
            onChange={(e) => set("defaultUnit", e.target.value)}
            className={selectCls}
          >
            {["pcs", "kg", "ltr", "box", "roll", "bag", "set", "m"].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </SettingRow>

        <SettingRow
          label="Global Low-Stock Threshold Override"
          description="Set to 0 to use each product's individual threshold."
        >
          <input
            type="number"
            min={0}
            value={settings.lowStockThresholdOverride}
            onChange={(e) => set("lowStockThresholdOverride", Math.max(0, parseInt(e.target.value) || 0))}
            className={`${selectCls} w-24 tabular-nums text-right`}
          />
        </SettingRow>
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard
        title="Notifications"
        description="Choose which events generate in-app notifications."
      >
        {(
          [
            { key: "notifyLowStock",           label: "Low Stock Alerts",     desc: "Notify when a product falls below threshold."        },
            { key: "notifyPendingReceipts",     label: "Pending Receipts",     desc: "Notify when a receipt is awaiting confirmation."     },
            { key: "notifyPendingDeliveries",   label: "Pending Deliveries",   desc: "Notify when a delivery is due or overdue."           },
            { key: "notifyTransferCompleted",   label: "Transfer Completed",   desc: "Notify when an internal transfer finishes."          },
            { key: "notifyStockAdjustment",     label: "Stock Adjustments",    desc: "Notify when a manual stock adjustment is applied."   },
          ] as const
        ).map(({ key, label, desc }) => (
          <SettingRow key={key} label={label} description={desc}>
            <Toggle
              checked={settings[key]}
              onChange={(v) => set(key, v)}
              label={label}
            />
          </SettingRow>
        ))}
      </SectionCard>

      {/* ── About ── */}
      <SectionCard title="About StockSense">
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          {[
            { label: "Version",   value: "1.0.0-beta",                       mono: false },
            { label: "Build",     value: "TechCatalyst · Sep 2026",          mono: true  },
            { label: "Data mode", value: "Frontend only (dummy data)",        mono: false },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">{label}</span>
              <span className={`font-medium text-slate-700 dark:text-slate-300 ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Action bar */}
      <div className="flex items-center justify-between pt-2 pb-8">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

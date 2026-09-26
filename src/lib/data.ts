// ---------------------------------------------------------------------------
// StockSense — Local dummy data
// Replace with real API calls when backend is ready.
// ---------------------------------------------------------------------------

export interface KpiCard {
  id: string;
  label: string;
  value: string | number;
  /** positive delta shown in green, negative in red */
  delta?: string;
  color: "blue" | "amber" | "violet" | "emerald";
}

export interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  remaining: number;
  threshold: number;
  unit: string;
}

export interface RecentOperation {
  id: string;
  ref: string;
  product: string;
  type: "Receipt" | "Delivery" | "Transfer" | "Adjustment";
  qty: number;
  status: "Done" | "Pending" | "Cancelled";
  date: string;
}

export interface StockMovementPoint {
  label: string;
  receipts: number;
  deliveries: number;
  transfers: number;
}

// ── KPI Cards ───────────────────────────────────────────────────────────────

export const kpiCards: KpiCard[] = [
  {
    id: "total-products",
    label: "Total Products",
    value: "1,250",
    delta: "+12 this week",
    color: "blue",
  },
  {
    id: "low-stock",
    label: "Low Stock",
    value: 32,
    delta: "+5 since yesterday",
    color: "amber",
  },
  {
    id: "pending-receipts",
    label: "Pending Receipts",
    value: 15,
    delta: "3 due today",
    color: "violet",
  },
  {
    id: "pending-deliveries",
    label: "Pending Deliveries",
    value: 10,
    delta: "2 overdue",
    color: "emerald",
  },
  {
    id: "internal-transfers",
    label: "Internal Transfers",
    value: 8,
    delta: "1 in progress",
    color: "blue",
  },
];

// ── Low Stock Products ───────────────────────────────────────────────────────

export const lowStockItems: LowStockItem[] = [
  {
    id: "ls-001",
    name: "Steel Rod",
    sku: "RAW-SR-001",
    remaining: 5,
    threshold: 50,
    unit: "pcs",
  },
  {
    id: "ls-002",
    name: "Chair",
    sku: "FUR-CH-042",
    remaining: 8,
    threshold: 20,
    unit: "pcs",
  },
  {
    id: "ls-003",
    name: "Sugar",
    sku: "GRO-SG-010",
    remaining: 2,
    threshold: 100,
    unit: "kg",
  },
  {
    id: "ls-004",
    name: "Paint Bucket",
    sku: "CON-PB-007",
    remaining: 4,
    threshold: 30,
    unit: "pcs",
  },
  {
    id: "ls-005",
    name: "Bolt M8",
    sku: "HDW-BM-022",
    remaining: 12,
    threshold: 200,
    unit: "pcs",
  },
];

// ── Recent Operations ────────────────────────────────────────────────────────

export const recentOperations: RecentOperation[] = [
  {
    id: "op-001",
    ref: "R001",
    product: "Steel Rod",
    type: "Receipt",
    qty: 100,
    status: "Done",
    date: "2026-09-26",
  },
  {
    id: "op-002",
    ref: "D001",
    product: "Chair",
    type: "Delivery",
    qty: -10,
    status: "Done",
    date: "2026-09-26",
  },
  {
    id: "op-003",
    ref: "T001",
    product: "Steel Rod",
    type: "Transfer",
    qty: 30,
    status: "Done",
    date: "2026-09-25",
  },
  {
    id: "op-004",
    ref: "R002",
    product: "Sugar",
    type: "Receipt",
    qty: 500,
    status: "Pending",
    date: "2026-09-25",
  },
  {
    id: "op-005",
    ref: "A001",
    product: "Bolt M8",
    type: "Adjustment",
    qty: -3,
    status: "Done",
    date: "2026-09-24",
  },
];

// ── Stock Movement Chart Data ────────────────────────────────────────────────

export const stockMovementData: StockMovementPoint[] = [
  { label: "Mon", receipts: 120, deliveries: 80, transfers: 40 },
  { label: "Tue", receipts: 90, deliveries: 110, transfers: 25 },
  { label: "Wed", receipts: 200, deliveries: 60, transfers: 55 },
  { label: "Thu", receipts: 150, deliveries: 95, transfers: 30 },
  { label: "Fri", receipts: 180, deliveries: 130, transfers: 70 },
  { label: "Sat", receipts: 60, deliveries: 45, transfers: 20 },
  { label: "Sun", receipts: 30, deliveries: 20, transfers: 10 },
];

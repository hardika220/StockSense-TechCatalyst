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

// ── Products ─────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "Raw Materials"
  | "Furniture"
  | "Groceries"
  | "Construction"
  | "Hardware"
  | "Electronics"
  | "Packaging";

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  unit: string;
  currentStock: number;
  reorderThreshold: number;
  /** Derived — computed from currentStock / reorderThreshold */
  status: StockStatus;
}

/** Helper — derive status from stock levels */
export function getStockStatus(
  current: number,
  threshold: number
): StockStatus {
  if (current === 0) return "Out of Stock";
  if (current <= threshold) return "Low Stock";
  return "In Stock";
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Raw Materials",
  "Furniture",
  "Groceries",
  "Construction",
  "Hardware",
  "Electronics",
  "Packaging",
];

export const UNIT_OPTIONS = ["pcs", "kg", "ltr", "box", "roll", "bag", "set", "m"];

export const products: Product[] = [
  { id: "p-001", name: "Steel Rod",          sku: "RAW-SR-001", category: "Raw Materials",  unit: "pcs", currentStock: 5,   reorderThreshold: 50,  status: "Low Stock"     },
  { id: "p-002", name: "Chair",              sku: "FUR-CH-042", category: "Furniture",       unit: "pcs", currentStock: 8,   reorderThreshold: 20,  status: "Low Stock"     },
  { id: "p-003", name: "Sugar",              sku: "GRO-SG-010", category: "Groceries",       unit: "kg",  currentStock: 2,   reorderThreshold: 100, status: "Low Stock"     },
  { id: "p-004", name: "Paint Bucket",       sku: "CON-PB-007", category: "Construction",    unit: "pcs", currentStock: 4,   reorderThreshold: 30,  status: "Low Stock"     },
  { id: "p-005", name: "Bolt M8",            sku: "HDW-BM-022", category: "Hardware",        unit: "pcs", currentStock: 12,  reorderThreshold: 200, status: "Low Stock"     },
  { id: "p-006", name: "Office Desk",        sku: "FUR-OD-011", category: "Furniture",       unit: "pcs", currentStock: 45,  reorderThreshold: 10,  status: "In Stock"      },
  { id: "p-007", name: "Cement Bag",         sku: "CON-CB-031", category: "Construction",    unit: "bag", currentStock: 320, reorderThreshold: 50,  status: "In Stock"      },
  { id: "p-008", name: "Copper Wire 2mm",    sku: "ELC-CW-005", category: "Electronics",     unit: "m",   currentStock: 850, reorderThreshold: 100, status: "In Stock"      },
  { id: "p-009", name: "Cardboard Box L",    sku: "PKG-CB-019", category: "Packaging",       unit: "pcs", currentStock: 600, reorderThreshold: 200, status: "In Stock"      },
  { id: "p-010", name: "Rice (Basmati)",     sku: "GRO-RB-003", category: "Groceries",       unit: "kg",  currentStock: 0,   reorderThreshold: 150, status: "Out of Stock"  },
  { id: "p-011", name: "PVC Pipe 50mm",      sku: "CON-PP-044", category: "Construction",    unit: "pcs", currentStock: 90,  reorderThreshold: 40,  status: "In Stock"      },
  { id: "p-012", name: "Bookshelf",          sku: "FUR-BS-007", category: "Furniture",       unit: "pcs", currentStock: 22,  reorderThreshold: 5,   status: "In Stock"      },
  { id: "p-013", name: "Motor Oil 5L",       sku: "RAW-MO-016", category: "Raw Materials",   unit: "ltr", currentStock: 35,  reorderThreshold: 20,  status: "In Stock"      },
  { id: "p-014", name: "Bubble Wrap Roll",   sku: "PKG-BW-008", category: "Packaging",       unit: "roll",currentStock: 0,   reorderThreshold: 30,  status: "Out of Stock"  },
  { id: "p-015", name: "LED Strip 5m",       sku: "ELC-LS-033", category: "Electronics",     unit: "pcs", currentStock: 14,  reorderThreshold: 25,  status: "Low Stock"     },
  { id: "p-016", name: "Hammer",             sku: "HDW-HM-001", category: "Hardware",        unit: "pcs", currentStock: 60,  reorderThreshold: 15,  status: "In Stock"      },
  { id: "p-017", name: "Wheat Flour",        sku: "GRO-WF-021", category: "Groceries",       unit: "kg",  currentStock: 480, reorderThreshold: 100, status: "In Stock"      },
  { id: "p-018", name: "Stretch Film Roll",  sku: "PKG-SF-012", category: "Packaging",       unit: "roll",currentStock: 55,  reorderThreshold: 20,  status: "In Stock"      },
];

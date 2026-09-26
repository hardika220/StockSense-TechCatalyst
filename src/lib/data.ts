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

// ── Move History / Stock Ledger ───────────────────────────────────────────────

export type MoveOperationType = "Receipt" | "Delivery" | "Transfer" | "Adjustment";
export type MoveStatus        = "Completed" | "Pending" | "Cancelled";

export interface StockMove {
  id: string;
  /** ISO datetime string — e.g. "2026-09-26T09:14:00" */
  datetime: string;
  productName: string;
  sku: string;
  operationType: MoveOperationType;
  sourceWarehouse: string;
  destinationWarehouse: string;
  /** positive = stock in, negative = stock out */
  qty: number;
  unit: string;
  status: MoveStatus;
  /** Optional reference number for traceability */
  ref: string;
}

export const WAREHOUSES = [
  "Main Warehouse",
  "North Hub",
  "South Hub",
  "East Depot",
  "West Depot",
  "Supplier",
  "Customer",
  "—",           // used as a placeholder when source/dest is not applicable
] as const;

export type WarehouseLocation = (typeof WAREHOUSES)[number];

export const MOVE_OPERATION_TYPES: MoveOperationType[] = [
  "Receipt",
  "Delivery",
  "Transfer",
  "Adjustment",
];

export const MOVE_STATUSES: MoveStatus[] = [
  "Completed",
  "Pending",
  "Cancelled",
];

export const stockMoves: StockMove[] = [
  // ── Receipts ──────────────────────────────────────────────────────────────
  {
    id: "mv-001", ref: "RCP-2026-001",
    datetime: "2026-09-26T09:14:00",
    productName: "Steel Rod",          sku: "RAW-SR-001",
    operationType: "Receipt",
    sourceWarehouse: "Supplier",       destinationWarehouse: "Main Warehouse",
    qty: 100,  unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-002", ref: "RCP-2026-002",
    datetime: "2026-09-25T11:30:00",
    productName: "Sugar",              sku: "GRO-SG-010",
    operationType: "Receipt",
    sourceWarehouse: "Supplier",       destinationWarehouse: "Main Warehouse",
    qty: 500,  unit: "kg",   status: "Pending",
  },
  {
    id: "mv-003", ref: "RCP-2026-003",
    datetime: "2026-09-24T08:50:00",
    productName: "Cement Bag",         sku: "CON-CB-031",
    operationType: "Receipt",
    sourceWarehouse: "Supplier",       destinationWarehouse: "East Depot",
    qty: 200,  unit: "bag",  status: "Completed",
  },
  {
    id: "mv-004", ref: "RCP-2026-004",
    datetime: "2026-09-23T14:20:00",
    productName: "Copper Wire 2mm",    sku: "ELC-CW-005",
    operationType: "Receipt",
    sourceWarehouse: "Supplier",       destinationWarehouse: "Main Warehouse",
    qty: 300,  unit: "m",    status: "Completed",
  },
  {
    id: "mv-005", ref: "RCP-2026-005",
    datetime: "2026-09-22T10:05:00",
    productName: "Wheat Flour",        sku: "GRO-WF-021",
    operationType: "Receipt",
    sourceWarehouse: "Supplier",       destinationWarehouse: "North Hub",
    qty: 600,  unit: "kg",   status: "Completed",
  },
  // ── Deliveries ────────────────────────────────────────────────────────────
  {
    id: "mv-006", ref: "DLV-2026-001",
    datetime: "2026-09-26T13:00:00",
    productName: "Chair",              sku: "FUR-CH-042",
    operationType: "Delivery",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "Customer",
    qty: -10,  unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-007", ref: "DLV-2026-002",
    datetime: "2026-09-25T15:45:00",
    productName: "Office Desk",        sku: "FUR-OD-011",
    operationType: "Delivery",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "Customer",
    qty: -5,   unit: "pcs",  status: "Pending",
  },
  {
    id: "mv-008", ref: "DLV-2026-003",
    datetime: "2026-09-24T12:30:00",
    productName: "Cardboard Box L",    sku: "PKG-CB-019",
    operationType: "Delivery",
    sourceWarehouse: "East Depot",     destinationWarehouse: "Customer",
    qty: -50,  unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-009", ref: "DLV-2026-004",
    datetime: "2026-09-23T09:00:00",
    productName: "Hammer",             sku: "HDW-HM-001",
    operationType: "Delivery",
    sourceWarehouse: "North Hub",      destinationWarehouse: "Customer",
    qty: -8,   unit: "pcs",  status: "Cancelled",
  },
  {
    id: "mv-010", ref: "DLV-2026-005",
    datetime: "2026-09-22T16:15:00",
    productName: "Motor Oil 5L",       sku: "RAW-MO-016",
    operationType: "Delivery",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "Customer",
    qty: -20,  unit: "ltr",  status: "Completed",
  },
  // ── Transfers ─────────────────────────────────────────────────────────────
  {
    id: "mv-011", ref: "TRF-2026-001",
    datetime: "2026-09-26T10:00:00",
    productName: "Steel Rod",          sku: "RAW-SR-001",
    operationType: "Transfer",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "North Hub",
    qty: 30,   unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-012", ref: "TRF-2026-002",
    datetime: "2026-09-25T09:30:00",
    productName: "PVC Pipe 50mm",      sku: "CON-PP-044",
    operationType: "Transfer",
    sourceWarehouse: "East Depot",     destinationWarehouse: "West Depot",
    qty: 40,   unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-013", ref: "TRF-2026-003",
    datetime: "2026-09-24T11:00:00",
    productName: "LED Strip 5m",       sku: "ELC-LS-033",
    operationType: "Transfer",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "South Hub",
    qty: 20,   unit: "pcs",  status: "Pending",
  },
  {
    id: "mv-014", ref: "TRF-2026-004",
    datetime: "2026-09-23T14:45:00",
    productName: "Cement Bag",         sku: "CON-CB-031",
    operationType: "Transfer",
    sourceWarehouse: "East Depot",     destinationWarehouse: "Main Warehouse",
    qty: 80,   unit: "bag",  status: "Completed",
  },
  {
    id: "mv-015", ref: "TRF-2026-005",
    datetime: "2026-09-21T08:20:00",
    productName: "Stretch Film Roll",  sku: "PKG-SF-012",
    operationType: "Transfer",
    sourceWarehouse: "North Hub",      destinationWarehouse: "East Depot",
    qty: 15,   unit: "roll", status: "Completed",
  },
  // ── Adjustments ───────────────────────────────────────────────────────────
  {
    id: "mv-016", ref: "ADJ-2026-001",
    datetime: "2026-09-24T17:00:00",
    productName: "Bolt M8",            sku: "HDW-BM-022",
    operationType: "Adjustment",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "—",
    qty: -3,   unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-017", ref: "ADJ-2026-002",
    datetime: "2026-09-23T16:30:00",
    productName: "Paint Bucket",       sku: "CON-PB-007",
    operationType: "Adjustment",
    sourceWarehouse: "Main Warehouse", destinationWarehouse: "—",
    qty: -2,   unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-018", ref: "ADJ-2026-003",
    datetime: "2026-09-22T14:10:00",
    productName: "Bookshelf",          sku: "FUR-BS-007",
    operationType: "Adjustment",
    sourceWarehouse: "North Hub",      destinationWarehouse: "—",
    qty: 5,    unit: "pcs",  status: "Completed",
  },
  {
    id: "mv-019", ref: "ADJ-2026-004",
    datetime: "2026-09-21T09:45:00",
    productName: "Rice (Basmati)",     sku: "GRO-RB-003",
    operationType: "Adjustment",
    sourceWarehouse: "West Depot",     destinationWarehouse: "—",
    qty: -15,  unit: "kg",   status: "Completed",
  },
  {
    id: "mv-020", ref: "ADJ-2026-005",
    datetime: "2026-09-20T11:20:00",
    productName: "Copper Wire 2mm",    sku: "ELC-CW-005",
    operationType: "Adjustment",
    sourceWarehouse: "South Hub",      destinationWarehouse: "—",
    qty: 10,   unit: "m",    status: "Pending",
  },
];

// ── Warehouses ────────────────────────────────────────────────────────────────

export type WarehouseStatus = "Active" | "Inactive" | "Maintenance";

export interface WarehouseProduct {
  productName: string;
  sku: string;
  qty: number;
  unit: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  status: WarehouseStatus;
  /** Number of distinct product lines stored here */
  productCount: number;
  /** Sum of all stock quantities across all products */
  totalStock: number;
  manager: string;
  /** ISO date string */
  createdAt: string;
  notes?: string;
  /** Snapshot of top products stored — shown in the details view */
  topProducts: WarehouseProduct[];
}

export const WAREHOUSE_STATUSES: WarehouseStatus[] = [
  "Active",
  "Inactive",
  "Maintenance",
];

export const warehouses: Warehouse[] = [
  {
    id: "wh-001",
    name: "Main Warehouse",
    location: "Industrial Zone A, Algiers",
    status: "Active",
    productCount: 14,
    totalStock: 3280,
    manager: "Ahmed Benali",
    createdAt: "2024-01-10",
    notes: "Primary storage and dispatch hub.",
    topProducts: [
      { productName: "Steel Rod",       sku: "RAW-SR-001", qty: 5,   unit: "pcs" },
      { productName: "Chair",           sku: "FUR-CH-042", qty: 8,   unit: "pcs" },
      { productName: "Copper Wire 2mm", sku: "ELC-CW-005", qty: 850, unit: "m"   },
      { productName: "Cardboard Box L", sku: "PKG-CB-019", qty: 600, unit: "pcs" },
      { productName: "Hammer",          sku: "HDW-HM-001", qty: 60,  unit: "pcs" },
    ],
  },
  {
    id: "wh-002",
    name: "North Hub",
    location: "Logistics Park North, Oran",
    status: "Active",
    productCount: 8,
    totalStock: 1640,
    manager: "Sara Meziane",
    createdAt: "2024-03-15",
    topProducts: [
      { productName: "Wheat Flour",      sku: "GRO-WF-021", qty: 600, unit: "kg"  },
      { productName: "Stretch Film Roll",sku: "PKG-SF-012", qty: 15,  unit: "roll"},
      { productName: "LED Strip 5m",     sku: "ELC-LS-033", qty: 14,  unit: "pcs" },
      { productName: "Hammer",           sku: "HDW-HM-001", qty: 60,  unit: "pcs" },
    ],
  },
  {
    id: "wh-003",
    name: "East Depot",
    location: "Free Zone East, Constantine",
    status: "Active",
    productCount: 6,
    totalStock: 890,
    manager: "Karim Hadj",
    createdAt: "2024-06-01",
    topProducts: [
      { productName: "Cement Bag",    sku: "CON-CB-031", qty: 200, unit: "bag" },
      { productName: "PVC Pipe 50mm", sku: "CON-PP-044", qty: 40,  unit: "pcs" },
      { productName: "Paint Bucket",  sku: "CON-PB-007", qty: 4,   unit: "pcs" },
    ],
  },
  {
    id: "wh-004",
    name: "South Hub",
    location: "Industrial Estate, Annaba",
    status: "Active",
    productCount: 5,
    totalStock: 430,
    manager: "Fatima Oukil",
    createdAt: "2024-08-20",
    topProducts: [
      { productName: "LED Strip 5m",     sku: "ELC-LS-033", qty: 20,  unit: "pcs" },
      { productName: "Copper Wire 2mm",  sku: "ELC-CW-005", qty: 10,  unit: "m"   },
      { productName: "Cardboard Box L",  sku: "PKG-CB-019", qty: 400, unit: "pcs" },
    ],
  },
  {
    id: "wh-005",
    name: "West Depot",
    location: "Port Logistics Area, Béjaïa",
    status: "Maintenance",
    productCount: 3,
    totalStock: 155,
    manager: "Yacine Brahimi",
    createdAt: "2024-09-05",
    notes: "Under scheduled maintenance until end of October 2026.",
    topProducts: [
      { productName: "PVC Pipe 50mm",    sku: "CON-PP-044", qty: 40,  unit: "pcs" },
      { productName: "Stretch Film Roll",sku: "PKG-SF-012", qty: 15,  unit: "roll"},
      { productName: "Rice (Basmati)",   sku: "GRO-RB-003", qty: 0,   unit: "kg"  },
    ],
  },
  {
    id: "wh-006",
    name: "Production Floor",
    location: "Factory Building B, Algiers",
    status: "Active",
    productCount: 4,
    totalStock: 210,
    manager: "Nadia Amrani",
    createdAt: "2025-01-12",
    notes: "Attached to production line — raw materials staging area.",
    topProducts: [
      { productName: "Steel Rod",      sku: "RAW-SR-001", qty: 50,  unit: "pcs" },
      { productName: "Motor Oil 5L",   sku: "RAW-MO-016", qty: 35,  unit: "ltr" },
      { productName: "Bolt M8",        sku: "HDW-BM-022", qty: 120, unit: "pcs" },
    ],
  },
  {
    id: "wh-007",
    name: "Overflow Store",
    location: "External Unit C, Sétif",
    status: "Inactive",
    productCount: 0,
    totalStock: 0,
    manager: "Mourad Zidane",
    createdAt: "2025-04-18",
    notes: "Decommissioned — pending reassignment.",
    topProducts: [],
  },
];

// ── Internal Transfers ────────────────────────────────────────────────────────
// Transfer status is intentionally separate from MoveStatus so the two
// modules can evolve independently. When a Transfer reaches "Completed" the
// backend should create a corresponding StockMove of type "Transfer".

export type TransferStatus = "Draft" | "In Transit" | "Completed";

export interface Transfer {
  id: string;
  /** Human-readable reference, e.g. TRF-2026-001 */
  ref: string;
  /** ISO datetime string */
  datetime: string;
  productName: string;
  sku: string;
  unit: string;
  qty: number;
  fromWarehouse: string;
  toWarehouse: string;
  status: TransferStatus;
  /** Optional free-text note */
  note?: string;
  /** Who initiated the transfer */
  initiatedBy: string;
}

export const TRANSFER_STATUSES: TransferStatus[] = [
  "Draft",
  "In Transit",
  "Completed",
];

// Internal warehouse locations — excludes external endpoints (Supplier / Customer / —)
export const INTERNAL_WAREHOUSES = [
  "Main Warehouse",
  "Production Floor",
  "North Hub",
  "South Hub",
  "East Depot",
  "West Depot",
  "Rack A",
  "Rack B",
] as const;

export type InternalWarehouse = (typeof INTERNAL_WAREHOUSES)[number];

export const transfers: Transfer[] = [
  // ── Completed ─────────────────────────────────────────────────────────────
  {
    id: "tr-001", ref: "TRF-2026-001",
    datetime: "2026-09-26T10:00:00",
    productName: "Steel Rod",         sku: "RAW-SR-001", unit: "pcs", qty: 30,
    fromWarehouse: "Main Warehouse",  toWarehouse: "Production Floor",
    status: "Completed",
    note: "Weekly production top-up.",
    initiatedBy: "Ahmed Benali",
  },
  {
    id: "tr-002", ref: "TRF-2026-002",
    datetime: "2026-09-25T09:30:00",
    productName: "PVC Pipe 50mm",     sku: "CON-PP-044", unit: "pcs", qty: 40,
    fromWarehouse: "East Depot",      toWarehouse: "West Depot",
    status: "Completed",
    initiatedBy: "Karim Hadj",
  },
  {
    id: "tr-003", ref: "TRF-2026-003",
    datetime: "2026-09-23T14:45:00",
    productName: "Cement Bag",        sku: "CON-CB-031", unit: "bag", qty: 80,
    fromWarehouse: "East Depot",      toWarehouse: "Main Warehouse",
    status: "Completed",
    note: "Restocking main warehouse before peak season.",
    initiatedBy: "Karim Hadj",
  },
  {
    id: "tr-004", ref: "TRF-2026-004",
    datetime: "2026-09-22T11:15:00",
    productName: "Cardboard Box L",   sku: "PKG-CB-019", unit: "pcs", qty: 200,
    fromWarehouse: "Main Warehouse",  toWarehouse: "North Hub",
    status: "Completed",
    initiatedBy: "Sara Meziane",
  },
  {
    id: "tr-005", ref: "TRF-2026-005",
    datetime: "2026-09-21T08:20:00",
    productName: "Stretch Film Roll", sku: "PKG-SF-012", unit: "roll", qty: 15,
    fromWarehouse: "North Hub",       toWarehouse: "East Depot",
    status: "Completed",
    initiatedBy: "Sara Meziane",
  },
  {
    id: "tr-006", ref: "TRF-2026-006",
    datetime: "2026-09-20T15:00:00",
    productName: "Bolt M8",           sku: "HDW-BM-022", unit: "pcs", qty: 500,
    fromWarehouse: "Main Warehouse",  toWarehouse: "Production Floor",
    status: "Completed",
    note: "Assembly line requirement.",
    initiatedBy: "Nadia Amrani",
  },
  {
    id: "tr-007", ref: "TRF-2026-007",
    datetime: "2026-09-19T10:30:00",
    productName: "Motor Oil 5L",      sku: "RAW-MO-016", unit: "ltr", qty: 20,
    fromWarehouse: "Main Warehouse",  toWarehouse: "Production Floor",
    status: "Completed",
    initiatedBy: "Nadia Amrani",
  },
  // ── In Transit ────────────────────────────────────────────────────────────
  {
    id: "tr-008", ref: "TRF-2026-008",
    datetime: "2026-09-26T13:00:00",
    productName: "LED Strip 5m",      sku: "ELC-LS-033", unit: "pcs", qty: 20,
    fromWarehouse: "Main Warehouse",  toWarehouse: "South Hub",
    status: "In Transit",
    initiatedBy: "Fatima Oukil",
  },
  {
    id: "tr-009", ref: "TRF-2026-009",
    datetime: "2026-09-26T09:00:00",
    productName: "Chair",             sku: "FUR-CH-042", unit: "pcs", qty: 12,
    fromWarehouse: "Main Warehouse",  toWarehouse: "North Hub",
    status: "In Transit",
    note: "Showroom replenishment.",
    initiatedBy: "Sara Meziane",
  },
  {
    id: "tr-010", ref: "TRF-2026-010",
    datetime: "2026-09-25T16:00:00",
    productName: "Copper Wire 2mm",   sku: "ELC-CW-005", unit: "m",   qty: 150,
    fromWarehouse: "Main Warehouse",  toWarehouse: "Production Floor",
    status: "In Transit",
    initiatedBy: "Nadia Amrani",
  },
  {
    id: "tr-011", ref: "TRF-2026-011",
    datetime: "2026-09-25T11:00:00",
    productName: "Wheat Flour",       sku: "GRO-WF-021", unit: "kg",  qty: 300,
    fromWarehouse: "North Hub",       toWarehouse: "East Depot",
    status: "In Transit",
    initiatedBy: "Ahmed Benali",
  },
  // ── Draft ─────────────────────────────────────────────────────────────────
  {
    id: "tr-012", ref: "TRF-2026-012",
    datetime: "2026-09-26T14:30:00",
    productName: "Office Desk",       sku: "FUR-OD-011", unit: "pcs", qty: 5,
    fromWarehouse: "Main Warehouse",  toWarehouse: "North Hub",
    status: "Draft",
    note: "Pending manager approval.",
    initiatedBy: "Sara Meziane",
  },
  {
    id: "tr-013", ref: "TRF-2026-013",
    datetime: "2026-09-26T08:45:00",
    productName: "Paint Bucket",      sku: "CON-PB-007", unit: "pcs", qty: 10,
    fromWarehouse: "East Depot",      toWarehouse: "Main Warehouse",
    status: "Draft",
    initiatedBy: "Karim Hadj",
  },
  {
    id: "tr-014", ref: "TRF-2026-014",
    datetime: "2026-09-25T17:00:00",
    productName: "Bookshelf",         sku: "FUR-BS-007", unit: "pcs", qty: 3,
    fromWarehouse: "Rack A",          toWarehouse: "Rack B",
    status: "Draft",
    note: "Rearranging storage layout.",
    initiatedBy: "Ahmed Benali",
  },
  {
    id: "tr-015", ref: "TRF-2026-015",
    datetime: "2026-09-24T12:00:00",
    productName: "Hammer",            sku: "HDW-HM-001", unit: "pcs", qty: 25,
    fromWarehouse: "Main Warehouse",  toWarehouse: "West Depot",
    status: "Draft",
    initiatedBy: "Yacine Brahimi",
  },
];

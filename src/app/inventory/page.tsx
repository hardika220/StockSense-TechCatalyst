import { products } from "@/lib/data";

export default function InventoryPage() {
  const inStock    = products.filter((p) => p.status === "In Stock").length;
  const lowStock   = products.filter((p) => p.status === "Low Stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Inventory</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Full inventory overview across all warehouses and product categories.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Products",  value: products.length, accent: "text-slate-500 dark:text-slate-400"   },
          { label: "In Stock",        value: inStock,         accent: "text-emerald-600 dark:text-emerald-400" },
          { label: "Low Stock",       value: lowStock,        accent: "text-amber-600 dark:text-amber-400"   },
          { label: "Out of Stock",    value: outOfStock,      accent: "text-red-600 dark:text-red-400"       },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4 flex flex-col gap-1">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{value}</span>
            <span className={`text-xs font-medium ${accent}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">All Products</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Current stock levels for every product</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                {["Product","SKU","Category","Unit","Stock","Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{p.sku}</td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">{p.category}</span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">{p.unit}</td>
                  <td className="px-6 py-3.5 font-semibold tabular-nums text-slate-800 dark:text-slate-200">{p.currentStock.toLocaleString()}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "In Stock"     ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : p.status === "Low Stock"  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      :                             "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

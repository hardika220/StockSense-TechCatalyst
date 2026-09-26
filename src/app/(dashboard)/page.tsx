import KpiCardItem from "@/components/KpiCard";
import StockMovementChart from "@/components/StockMovementChart";
import LowStockList from "@/components/LowStockList";
import RecentOperationsTable from "@/components/RecentOperationsTable";
import { kpiCards } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Overview</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Inventory snapshot — Saturday, 26 September 2026
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <KpiCardItem key={card.id} card={card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockMovementChart />
        </div>
        <div className="lg:col-span-1">
          <LowStockList />
        </div>
      </div>

      <RecentOperationsTable />
    </div>
  );
}

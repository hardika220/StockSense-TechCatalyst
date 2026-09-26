import type { KpiCard } from "@/lib/data";

const colorMap: Record<KpiCard["color"], { bg: string; icon: string; badge: string }> = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/50",    icon: "text-blue-600 dark:text-blue-400",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"    },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/50",  icon: "text-amber-600 dark:text-amber-400",  badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300"  },
  violet:  { bg: "bg-violet-50 dark:bg-violet-950/50",icon: "text-violet-600 dark:text-violet-400",badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300"},
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/50",icon:"text-emerald-600 dark:text-emerald-400",badge:"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"},
};

function CardIcon({ id, color }: { id: string; color: KpiCard["color"] }) {
  const cls = `w-5 h-5 ${colorMap[color].icon}`;
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "total-products")
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    );
  if (id === "low-stock")
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  if (id === "pending-receipts")
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    );
  if (id === "pending-deliveries")
    return (
      <svg viewBox="0 0 24 24" className={cls} {...stroke}>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} {...stroke}>
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export default function KpiCardItem({ card }: { card: KpiCard }) {
  const colors = colorMap[card.color];
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg ${colors.bg}`}>
          <CardIcon id={card.id} color={card.color} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{card.value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{card.label}</p>
      </div>
      {card.delta && (
        <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full w-fit ${colors.badge}`}>
          {card.delta}
        </span>
      )}
    </div>
  );
}

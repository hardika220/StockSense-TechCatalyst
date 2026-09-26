import GlobalSearch from "@/components/GlobalSearch";
import NotificationPanel from "@/components/NotificationPanel";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between px-6 shrink-0">
      {/* Left — page title */}
      <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h1>

      {/* Right — search + notifications + user */}
      <div className="flex items-center gap-3">
        <GlobalSearch />
        <NotificationPanel />

        {/* User avatar */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold select-none">
            JD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-none">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Warehouse Manager</p>
          </div>
        </button>
      </div>
    </header>
  );
}

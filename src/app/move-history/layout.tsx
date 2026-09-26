import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function MoveHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Move History" />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">{children}</main>
      </div>
    </div>
  );
}

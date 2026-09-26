import { redirect } from "next/navigation";

// Root path redirects to login — the dashboard lives at /dashboard
export default function RootPage() {
  redirect("/login");
}

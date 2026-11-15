import { RequireAuth } from "@/components/RequireAuth";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth roles={["vendor"]}>{children}</RequireAuth>;
}

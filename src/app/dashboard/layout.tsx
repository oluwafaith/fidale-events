import { RequireAuth } from "@/components/RequireAuth";

export default function CoupleStudioLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth roles={["couple"]}>{children}</RequireAuth>;
}

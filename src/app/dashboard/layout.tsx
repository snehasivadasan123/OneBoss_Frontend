// app/dashboard/layout.tsx
import DashboardLayout from "@/component/layout/DashboardLayout";

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

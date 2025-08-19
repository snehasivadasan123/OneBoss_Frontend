import { ClientApprovals } from "@/features/dashboards/components/ClientApprovals";
import TotalAssets from "@/features/dashboards/components/TotalAsset"
import TotalInvestments from "@/features/dashboards/components/TotalInvestment";
import InvestmentHistoryChart from "@/features/dashboards/components/InvestmentHistory";
const DashboardPage = () => {

  return (
    <div className="min-h-screen bg-primary-50 p-6 md:p-8">
      <div className="mb-6 rounded-lg bg-primary-50 shadow-sm">
        <ClientApprovals />
      </div>

      <div className="rounded-lg bg-primary-50 shadow-sm p-6">
        <TotalAssets />

        <main className="grid  gap-4 lg:grid-cols-2 ">
          <TotalInvestments />
          <InvestmentHistoryChart />
        </main>

      </div>


    </div>
  )


}

export default DashboardPage
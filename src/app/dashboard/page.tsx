import { ClientApprovals } from "@/features/dashboards/components/ClientApprovals";
import TotalAssets from "@/features/dashboards/components/TotalAsset"
import TotalInvestments from "@/features/dashboards/components/TotalInvestment";
import InvestmentHistoryChart from "@/features/dashboards/components/InvestmentHistory"


const DashboardPage = () => {

  return (
    <div >
      <div className="mb-1 rounded-lg bg-primary-50 shadow-sm">
        <ClientApprovals />
      </div>
      <TotalAssets />
      <main className="grid  gap-4 lg:grid-cols-2 ">
        <TotalInvestments />
        <InvestmentHistoryChart />
      </main>
    </div>
  )
}

export default DashboardPage
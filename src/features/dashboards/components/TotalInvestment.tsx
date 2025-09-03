"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, Chart } from "chart.js"
import { Pie } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchPlans } from "@/features/portfolio/services/planService"
import { PlanApiResponse } from "@/types/common/investment"
import { useAuth } from "@/context/AuthContext"
import { Spinner } from "@/components/shared/spinner"
import { logger } from "@/lib/logger"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function TotalInvestmentsChart() {
  const { user } = useAuth()
  const [plans, setPlans] = useState<PlanApiResponse[]>([])
  const [loading, setLoading] = useState(true);
  const clientuuid = user?.clientUuid || ""
  useEffect(() => {
    if (!clientuuid) {
      setLoading(false)
      return
    }
    setLoading(true)

    fetchPlans(clientuuid)
      .then((data) => setPlans(data))
      .catch((err) => logger.error("Error fetching plans:", err))
      .finally(() => setLoading(false))
  }, [clientuuid])

  const chartData = {
    labels: plans.map((p) => p.description || "No Description"),
    datasets: [
      {
        data: plans.map((p) => p.objectiveGrowth || 0), // TODO: replace with real market value
        backgroundColor: ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6", "#F97316"],
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 7,
        spacing: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            let label = context.label || ""
            if (label) label += ": "
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed)
            }
            return label
          },
        },
      },
    },
  }

  const legendData = plans.map((p, i) => ({
    name: p.description || "No Description",
    value: p.objectiveGrowth || 0, // TODO: replace with market value
    color: chartData.datasets[0].backgroundColor[i % chartData.datasets[0].backgroundColor.length],
  }))
  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    )
  }

  return (
    <Card className=" flex flex-col">
      <CardHeader>
        <CardTitle className="subheading-18-semibold">My Investments</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 p-4  md:items-center">

        <div className="aspect-square h-[160px] w-[160px] md:h-[200px] md:w-[200px] mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="grid w-full gap-2 text-sm">
          {legendData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center ">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span className="subheading-14-semibold md:text-base">{entry.name}</span>
              </div>
              <span className="font-medium">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

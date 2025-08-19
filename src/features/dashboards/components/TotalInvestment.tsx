"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, Chart } from "chart.js"
import { Pie } from "react-chartjs-2"
// import ChartDataLabels from "chartjs-plugin-datalabels"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend,)

// Data for the pie chart
const chartData = {
  labels: ["25645 (TFSA Client Name, Individual)", "36569 (Account Type)", "25486 (Account Type)"],
  datasets: [
    {
      data: [14220, 8521, 3501],
      backgroundColor: ["#6366F1", "#22C55E", "#F59E0B"],
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 8,
      spacing: 2,
    },
  ],
}

// Options for the pie chart
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {

        label: (context: TooltipItem<"pie">) => {
          let label = context.label || ""
          if (label) {
            label += ": "
          }
          if (context.parsed !== null) {
            label += new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(context.parsed)
          }
          return label
        },
      },
    },
    datalabels: {
      color: "#fff",
      font: {
        weight: "bold",
        size: 14,
      },

      formatter: (value: number, context: { chart: Chart<"pie"> }) => {
        const total = context.chart.data.datasets[0].data.reduce((sum: number, val: number) => sum + val, 0)
        const percentage = ((value / total) * 100).toFixed(0) + "%"
        return percentage
      },
    },
  },
}

export default function TotalInvestmentsChart() {
  const legendData = [
    { name: "25645 (TFSA Client Name, Individual)", value: 14220, color: "#6366F1" },
    { name: "36569 (Account Type)", value: 8521, color: "#22C55E" },
    { name: "25486 (Account Type)", value: 3501, color: "#F59E0B" },
  ]

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Total Investments</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-4">
        <div className="aspect-square h-[250px] w-[250px]">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="grid w-full gap-2 text-sm">
          {legendData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}</span>
              </div>
              <span className="font-medium">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

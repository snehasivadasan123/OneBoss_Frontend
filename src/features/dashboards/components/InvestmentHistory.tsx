"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
} from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Investment",
      data: [230000, 50000, 120000, 260000, 170000, 100000, 210000, 280000],
      backgroundColor: "#3B82F6",
      borderRadius: 8,
      barPercentage: 0.4,
      categoryPercentage: 0.8,
    },
  ],
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          let label = context.dataset.label || ""
          if (label) label += ": "
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(context.parsed.y)
          }
          return label
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6B7280",
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        callback: function (tickValue) {
          const value = Number(tickValue)
          return value >= 1000 ? value / 1000 + "k" : value
        },
        color: "#6B7280",
      },
    },
  },
}

export default function InvestmentHistoryChart() {
  return (
    <Card className="flex flex-col min-h-[250px] sm:min-h-[350px] md:min-h-[450px] max-h-[600px]">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-xl">
          Investment History
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-full">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

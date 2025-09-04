"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function TradingDashboard() {

  const waitingTrades = [
    {
      transaction: "Buy Gross",
      product: "FID-2202 FIDELITY GLO...",
      amount: "$1,000.00",
      risk: "LM",
      lead: "FEL",
      objective: "Balanced",
      category: "Canadian Equity Balanced",
    },
    {
      transaction: "Sell",
      product: "MFC-3100 MANULIFE GLO...",
      amount: "$2,500.00",
      risk: "M",
      lead: "DSC",
      objective: "Growth",
      category: "Global Equity",
    },
  ];

  // Portfolio accounts
  const portfolioAccounts = [
    {
      account: "FD: 2400 FIDELITY",
      before: "$2,565.76",
      after: "$2,565.76",
    },
    {
      account: "MFC: 3100 MANULIFE",
      before: "$7,300.20",
      after: "$9,800.20",
    },
  ];

  // Portfolio clients
  const portfolioClients = [
    {
      client: "Lazarevski, Naumche",
      status: "Waiting Response",
      responseDate: "",
    },
    {
      client: "Smith, John",
      status: "Approved",
      responseDate: "2025-09-03",
    },
  ];


  const actualRisk = [78, 88, 22, 20, 0];
  const toleranceRisk = [88, 78, 20, 22, 0];

  const riskCashData = {
    labels: ["L", "LM", "M", "MH", "H"],
    datasets: [
      {
        label: "Actual Risk Distribution",
        data: actualRisk,
        backgroundColor: "#ef4444",
        borderRadius: 1,
        barThickness: 15,
      },
      {
        label: "KYC Risk Tolerance",
        data: toleranceRisk,
        backgroundColor: "#00A4E8",
        borderRadius: 1,
        barThickness: 15,
      },
    ],
  };

  const actualObjectives = [50, 45, 55, 0];
  const toleranceObjectives = [50, 45, 60, 0]
  const router = useRouter();

  const investmentObjectivesData = {
    labels: ["Safety", "Income", "Growth", "Speculative"],
    datasets: [
      {
        label: "Actual Objective Distribution",
        data: actualObjectives,
        backgroundColor: "#63A402",
        borderRadius: 2,
        barThickness: 15,
      },
      {
        label: "KYC Objective Tolerance",
        data: toleranceObjectives,
        backgroundColor: "#00A4E8",
        borderRadius: 2,
        barThickness: 15,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 20 },
        title: { display: true, text: "Percent" },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  const actualRiskScore = 50.41;
  const kycRiskTolerance = 64;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto space-y-6">

        <Card>
          <CardContent className="flex justify-between items-center ">
            <div className="flex items-center">
              <ChevronLeft className="mr-2 cursor-pointer hover:text-gray-600"
                onClick={() => router.back()} />
              <h1 className="subheading-20-semibold">
                Trades for RRIF 2482133610 (Individual)
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-purple-600 border-none shadow-none hover:bg-purple-50"
            >
              Real Time updates
            </Button>
          </CardContent>
        </Card>


        <Card>
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle className="subheading-16-semibold">
              Your Waiting Trades
            </CardTitle>
            <span className="subheading-16-semibold">
              Total value: $77,477.32
            </span>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border subheading-14-semibold">
                    <th className="text-left py-2 px-2">Transaction</th>
                    <th className="text-left py-2 px-2">Product</th>
                    <th className="text-left py-2 px-2">Amount</th>
                    <th className="text-left py-2 px-2">Risk</th>
                    <th className="text-left py-2 px-2">Lead</th>
                    <th className="text-left py-2 px-2">Objective</th>
                    <th className="text-left py-2 px-2">Category</th>
                    <th className="text-left py-2 px-2"></th>
                  </tr>
                </thead>
                <tbody className="py-3 px-2 body-14-medium text-primary-600">
                  {waitingTrades.map((trade, idx) => (
                    <tr key={idx} className="text-sm border-b">
                      <td >{trade.transaction}</td>
                      <td >
                        {trade.product}
                      </td>
                      <td>{trade.amount}</td>
                      <td >{trade.risk}</td>
                      <td >{trade.lead}</td>
                      <td >{trade.objective}</td>
                      <td>{trade.category}</td>
                      <td className="py-3 px-2  ">
                        <Button
                          variant="outline"
                          size="sm"
                          className="body-14-medium border text-primary-1000  h-7 px-3 "
                        >
                          View Fund Facts
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={8} className="py-3 px-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-primary-1000 text-primary-100 body-14-medium px-4 h-8"
                      >
                        View Client Request Form
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader className="">
            <CardTitle className="subheading-16-semibold">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="subheading-14-semibold ">
                    <th className="text-left py-2 px-2">Account</th>
                    <th className="text-left py-2 px-2">
                      Market Value Before Trades
                    </th>
                    <th className="text-left py-2 px-2">
                      Market Value After Trades
                    </th>
                  </tr>
                </thead>
                <tbody className="body-14-medium text-primary-600">
                  {portfolioAccounts.map((p, idx) => (
                    <tr key={idx} className="text-sm">
                      <td className="py-3 px-2">{p.account}</td>
                      <td className="py-3 px-2">{p.before}</td>
                      <td className="py-3 px-2">{p.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>


        <Card className="p-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Portfolio Overview
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
              {/* Risk Distribution */}
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-1">
                  Portfolio Investment Objectives and Risk after Trades
                </h2>
                <div className="text-sm font-medium text-gray-700 ">
                  Risk Cash Account: $0.00
                </div>
                <div className="text-xs text-error-600 mb-3">
                  (Warning Plan’s risk is offside!)
                </div>
                <div className="h-48">
                  <Bar data={riskCashData} options={chartOptions} />
                </div>
              </div>

              {/* Investment Objectives */}
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  Investment Objectives
                </h2>
                <div className="h-48 mb-4">
                  <Bar data={investmentObjectivesData} options={chartOptions} />
                </div>
                {/* Custom Legend */}
                <div className="flex justify-center space-x-6 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-success-700  mr-1"></div>
                    <span>Actual Objective Distribution</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-info-600  mr-1"></div>
                    <span>KYC Objective Tolerance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Risk Score */}
            <div >
              <h2 className="text-sm font-medium text-gray-900 mb-2">
                Current Risk Score:{" "}
                <span className="font-semibold text-gray-900">
                  {actualRiskScore}
                </span>
              </h2>

              {/* Scale Labels */}
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>0</span>
                <span>{kycRiskTolerance}</span>
              </div>

              {/* Actual Risk Score Bar */}
              <div className="h-3   relative">
                <div
                  className="h-3 bg-success-700 "
                  style={{ width: `${actualRiskScore}%` }}
                />
              </div>

              {/* KYC Risk Score Tolerance Bar */}
              <div className="h-3  mb-4 relative">
                <div
                  className="h-3 bg-info-600 "
                  style={{ width: `${kycRiskTolerance}%` }}
                />
              </div>

              {/* Legend */}
              <div className="flex space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-success-700 rounded mr-1"></div>
                  <span>Actual Risk Score</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-info-600 rounded mr-1"></div>
                  <span>KYC Risk Score Tolerance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Section Lower */}
        <Card>
          <CardHeader>
            <CardTitle className="subheading-20-semibold">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="subheading-14-semibold">
                    <th className="text-left  px-2">Client</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Response Date</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioClients.map((c, idx) => (
                    <tr key={idx} className="text-sm">
                      <td className=" px-2 body-14-medium">{c.client}</td>
                      <td className="py-3 px-2 text-info-600">{c.status}</td>
                      <td className="py-3 px-2">{c.responseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader >
            <CardTitle className="subheading-20-semibold">
              Do you approve these trades?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Note:
                </label>
                <input
                  type="text"
                  placeholder="Paste here..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-info-600"
                />
              </div>


              <p className="body-12-regular">
                By clicking Approve Trades you are consenting to the sale of
                your electronic signature to find all original signatures on
                paper. You have the right to request that you sign a paper copy
                instead. By clicking this, you are waiving that right. After
                signing you may revoke written request to us about a paper copy
                of an electronic record. You will not be charged for the paper
                copy. If you agree to use an electronic signature it is required
                by you in the Agreement to use an electronic signature. There is
                no penalty for withdrawing your consent. You should always
                retain such that you have a current email address in order to
                contact you regarding any changes, if necessary.
              </p>

              <p className="body-12-regular">
                Please read the fund facts for the above information.
              </p>


              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="fundFacts"
                  className="mt-0.5 h-4 w- border-green-600 text-primary-1000 "
                />
                <label
                  className="body-12-regular"
                >
                  I have received and read the fund facts for the above
                  transaction(s).
                </label>
              </div>


              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="focus:bg-primary-1000 focus:text-primary-50"

                >
                  Approve Trades
                </Button>
                <Button variant="outline" className="text-sm focus:bg-primary-1000 focus:text-primary-50">
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            className="bg-primary-1000 text-white hover:bg-gray-800"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

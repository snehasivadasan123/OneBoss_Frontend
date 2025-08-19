"use client";

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { logger } from "@/lib/logger"
import { fetchPlans } from "../services/planService"
import { InvestmentSection } from "@/types/common/investment"
import { PlanApiResponse } from "@/types/common/investment"
import { Spinner } from "@/components/shared/spinner";

export default function InvestmentSectionList() {
  const router = useRouter();
  const [sections, setSections] = useState<InvestmentSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientuuid = localStorage.getItem("clientUuid");
    if (!clientuuid) {
      logger.error("No clientuuid found in localStorage");
      setLoading(false);
      return;
    }

    fetchPlans(clientuuid)
      .then((data) => {
        logger.debug("Fetched plans:", data);
        const mapped: InvestmentSection[] = data.map((plan: PlanApiResponse) => ({
          id: plan.dealerAccountCode,
          name: plan.description,
          totalValue: plan.planMarketValue || 0,
          items: [],
          balances: [],
        }));
        setSections(mapped);
      })
      .catch((err) => {
        logger.error("Error fetching plans:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card
          key={section.id}
          className="p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={() =>
            router.push(`/dashboard/portfolio/investments/${section.id}`)
          }
        >
          <div className="flex justify-between items-center">
            <span className="text-info-700 body-14-medium">{section.name}</span>
            <span className="text-xs font-semibold">
              Total value: $
              {section.totalValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

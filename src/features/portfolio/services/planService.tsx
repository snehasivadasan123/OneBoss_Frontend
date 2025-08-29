import { logger } from "@/lib/logger";
import { InvestmentDetailApiResponse, PlanApiResponse } from "@/types/common/investment";
import axios, { AxiosResponse } from "axios";
export async function fetchPlans(clientuuid: string) {
  try {
    const response: AxiosResponse<PlanApiResponse[]> = await axios.get(`/api/proxy/plan`, {
      params: { clientuuid },
      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      }
    })
    logger.debug("Plan list response:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Plan list API error:", error);
    throw error;
  }
}

export async function fetchPlanDetails(plandealeraccountcode: string) {
  try {
    const response: AxiosResponse<InvestmentDetailApiResponse[]> = await axios.get(`/api/proxy/fundaccount`, {
      params: { plandealeraccountcode },
      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      }
    })
    logger.debug("Plan details response:", response.data);

    return response.data;
  } catch (error) {
    logger.error("Plan details API error:", error);
    throw error
  }
}
export async function fetchPlanMarketValue(plandealeraccountcode?: string) {
  try {
    const response = await axios.get(`/api/proxy/planmarketvalue`, {
      params: { plandealeraccountcode },
      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      }
    });
    logger.debug("Plan market value response:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Plan market value API error:", error);
    throw error;
  }
}
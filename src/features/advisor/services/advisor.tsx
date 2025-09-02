
import axios, { AxiosResponse } from "axios"
import { Advisor } from "@/types/advisor"
import { logger } from "@/lib/logger"

export type AdvisorApiResponse = Advisor[]
export async function fetchAdvisorData(clientuuid: string) {
  try {
    const response: AxiosResponse<AdvisorApiResponse> = await axios.get('/api/proxy/representativeperson', {
      params: { clientuuid },
      headers: {
        "x-type": "CLIENT_PORTAL"
      }
    })
    logger.debug("adisor ", response.data)
    return response.data
  } catch (error) {
    logger.error("Advisor API error:", error)
    throw error
  }
}
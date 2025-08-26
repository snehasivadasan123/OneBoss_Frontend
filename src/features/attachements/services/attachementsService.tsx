import { logger } from "@/lib/logger";
import { AttachmentApiResponse } from "@/types/common/attachement";
import axios, { AxiosResponse } from "axios";

export async function fetchAttachements(clientuuid: string) {
  try {
    const response: AxiosResponse<AttachmentApiResponse[]> = await axios.get(`/api/proxy/clientattachment`, {
      params: { clientuuid },
      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      }
    })
    logger.debug("Attachement list response:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Attachement list API error:", error);
    throw error;
  }
}
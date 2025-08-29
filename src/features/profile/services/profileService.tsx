import { logger } from "@/lib/logger";
import { ProfileApiResponse } from "@/types/common/Profile";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
export async function fetchUserDetails(clientuuid: string) {
  try {

    const response: AxiosResponse<ProfileApiResponse> = await axios.get(`/api/proxy/client/${clientuuid}`, {

      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      }
    })

    logger.debug("ProfileApiResponse:", response);
    return response.data;

  } catch (error) {
    logger.error("Profile:", error);
    throw error;
  }

}
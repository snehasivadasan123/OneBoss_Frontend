import axios from "axios";
import { logger } from "@/lib/logger";

interface LoginPayload {
  username: string;
  password: string;
  application: string;
  deviceId: string;
  sessionInfo: string;
}

export async function loginClient(payload: LoginPayload) {
  try {
    const response = await axios.post(`/api/proxy/clientlogin`, payload, {
      headers: {
        "x-type": "CLIENT_PORTAL",
        "Content-Type": "application/json",
      },


    });
    logger.debug(response.data)
    return response.data;
  } catch (error) {
    logger.error("Login API error:", error)
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data
    }
    throw error;
  }
}
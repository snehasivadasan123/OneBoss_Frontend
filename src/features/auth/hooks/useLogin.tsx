"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginClient } from "../services/loginService"
import { logger } from "@/lib/logger"
import { useAuth } from "@/context/AuthContext"
export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      logger.debug("Attempting to log in with email:", email, password)
      const response = await loginClient({
        username: email,
        password: password,
        application: "CLIENT_PORTAL",
        deviceId: "123",
        sessionInfo: "123",
      })
      logger.info("Login success:", response)
      if (response.token) {
        document.cookie = `access_token=${response.token}; path=/; Secure; SameSite=Strict; max-age=${60 * 60 * 24}`
        localStorage.setItem("access_token", response.token)
        localStorage.setItem("clientUuid", response.clientUuid)
        authLogin(response.clientUuid, response.dealerAccountCode || "DEFAULT_DEALER")
        router.replace("/dashboard")
      } else {
        const msg = response.errorMessage || "Login failed. Please try again."
        setError(msg)
        logger.warn("Login failed:", msg)
      }
    } catch (err) {
      logger.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

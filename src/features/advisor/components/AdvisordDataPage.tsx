"use client"

import { fetchAdvisorData } from "@/features/advisor/services/advisor"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { Advisor } from "@/types/advisor"
import { logger } from "@/lib/logger"
export default function AdvisordDataPage() {
  const { user } = useAuth()
  const clientuuid = user?.clientUuid || ""
  const [documents, setDocuments] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadDocs() {
      try {
        if (!clientuuid) {
          setLoading(false)
          return
        }
        setLoading(true)
        const res = await fetchAdvisorData(clientuuid)
        setDocuments(res)
      } catch (err) {
        logger.error("Failed to fetch documents", err)
      } finally {
        setLoading(false)
      }
    }

    loadDocs()
  }, [clientuuid])
  return (
    <section className="space-y-1 ">
      <h2 className="subheading-20-semibold">Financial Advisor</h2>
      <div className="body-14-medium">
        <span>Advisor ID</span>
        <span>Phone</span>
        <span>Fax</span>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="subheading-20-semibold">Branch Contact Information</h3>
        <div className="body-14-medium">
          <span>1234 Second Ave.</span>
          <span>Thunder Bay, ON</span>
          <span>A1A1A1</span>
          <span>Phone 555-123-4567</span>
          <span>Fax 555-987-6543</span>
        </div>
      </div>
    </section>
  )

}
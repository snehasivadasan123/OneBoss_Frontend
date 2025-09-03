"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Eye, Trash2 } from "lucide-react"
import { fetchAttachements } from "../services/attachementsService"
import { AttachmentApiResponse } from "@/types/common/attachement";
import { useAuth } from "@/context/AuthContext"
// import { se } from "date-fns/locale"
// import { set } from "zod"
import { UploadDocumentsModal } from "./UploadDocument"
import { logger } from "@/lib/logger"

export default function Attachment() {

  const [documents, setDocuments] = useState<AttachmentApiResponse[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const clientuuid = user?.clientUuid || ""

  useEffect(() => {
    async function loadDocs() {
      try {
        if (!clientuuid) {
          setLoading(false)
          return
        }
        setLoading(true)
        const res = await fetchAttachements(clientuuid)
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
    <div className="p-6 bg-primary-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">All Documents</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-primary-1000 hover:bg-gray-700 text-primary-50 px-4 py-2">Upload New Document</Button>
      </div>




      <div className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="subheading-16-semibold text-primary-1000">Date Submitted</TableHead>
              <TableHead className="subheading-16-semibold text-primary-1000">Description</TableHead>
              <TableHead className="subheading-16-semibold text-primary-1000">Document Type</TableHead>
              <TableHead className="subheading-16-semibold text-primary-1000">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow key={doc.oneBossId} className="border-b border-gray-200">
                  <TableCell className="text-sm"> {new Date(doc.createdDate).toLocaleDateString("en-GB")} </TableCell>
                  <TableCell className="text-sm">{doc.description}</TableCell>
                  <TableCell className="text-sm">{doc.documentType.description}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="text-warning-500 hover:text-warning-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-error-500 hover:text-error-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <UploadDocumentsModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}

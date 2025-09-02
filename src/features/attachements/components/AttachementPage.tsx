"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Trash2 } from "lucide-react"
import { fetchAttachements } from "../services/attachementsService"
import { AttachmentApiResponse } from "@/types/common/attachement";
import { useAuth } from "@/context/AuthContext"
// import { se } from "date-fns/locale"
// import { set } from "zod"
import { UploadDocumentsModal } from "./UploadDocument"
import { logger } from "@/lib/logger"

export default function Attachment() {
  const [includeInactive, setIncludeInactive] = useState(false)
  const [excludeFromPlans, setExcludeFromPlans] = useState(false)
  const [treeView, setTreeView] = useState(false)
  const [showPinned, setShowPinned] = useState(false)
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


      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="include-inactive" checked={includeInactive}
            onCheckedChange={(checked) => setIncludeInactive(checked === true)} className="boder border-primary-1000" />
          <label htmlFor="include-inactive" className="body-14-medium">
            Include inactive Attachments
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="exclude-plans" checked={excludeFromPlans}
            onCheckedChange={(checked) => setExcludeFromPlans(checked === true)} className="boder border-primary-1000" />
          <label htmlFor="exclude-plans" className="body-14-medium">
            Exclude Attachments from plans, funds, OCs, transactions, and trust transactions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="tree-view" checked={treeView}
            onCheckedChange={(checked) => setTreeView(checked === true)} className="boder border-primary-1000" />
          <label htmlFor="tree-view" className="body-14-medium">
            Tree View
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="show-pinned" checked={showPinned}
            onCheckedChange={(checked) => setShowPinned(checked === true)} className="boder border-primary-1000" />
          <label htmlFor="show-pinned" className="body-14-medium">
            Show Pinned Documents
          </label>
        </div>
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

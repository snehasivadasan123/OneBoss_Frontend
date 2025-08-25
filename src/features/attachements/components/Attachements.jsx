"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Trash2 } from "lucide-react"

const mockDocuments = [
  {
    id: 1,
    dateSubmitted: "06/10/2024",
    description: "Test",
    documentType: "Not Required",
  },
  {
    id: 2,
    dateSubmitted: "05/10/2024",
    description: "Test",
    documentType: "Not Required",
  },
]

export default function Attachments() {
  const [includeInactive, setIncludeInactive] = useState(false)
  const [excludeFromPlans, setExcludeFromPlans] = useState(false)
  const [treeView, setTreeView] = useState(false)
  const [showPinned, setShowPinned] = useState(false)

  return (
    <div className="p-6 bg-primary-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">All Documents</h1>
        <Button className="bg-gray-800 hover:bg-gray-700 text-primary-50 px-4 py-2">Upload New Document</Button>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="include-inactive" checked={includeInactive} onCheckedChange={setIncludeInactive} />
          <label htmlFor="include-inactive" className="text-sm">
            Include inactive Attachments
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="exclude-plans" checked={excludeFromPlans} onCheckedChange={setExcludeFromPlans} />
          <label htmlFor="exclude-plans" className="text-sm">
            Exclude Attachments from plans, funds, OCs, transactions, and trust transactions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="tree-view" checked={treeView} onCheckedChange={setTreeView} />
          <label htmlFor="tree-view" className="text-sm">
            Tree View
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="show-pinned" checked={showPinned} onCheckedChange={setShowPinned} />
          <label htmlFor="show-pinned" className="text-sm">
            Show Pinned Documents
          </label>
        </div>
      </div>

      <div className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Date Submitted</TableHead>
              <TableHead className="font-medium text-gray-900">Description</TableHead>
              <TableHead className="font-medium text-gray-900">Document Type</TableHead>
              <TableHead className="font-medium text-gray-900">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocuments.map((doc) => (
              <TableRow key={doc.id} className="border-b border-gray-200">
                <TableCell className="text-sm">{doc.dateSubmitted}</TableCell>
                <TableCell className="text-sm">{doc.description}</TableCell>
                <TableCell className="text-sm">{doc.documentType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="text-orange-500 hover:text-orange-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

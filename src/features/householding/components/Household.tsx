"use client"

import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AcceptKeyDialog } from "./AcceptKey"

type KeyStatus = "expired" | "in-progress"

type KeyRecord = {
  id: string
  date: string
  time: string
  status: KeyStatus
  recipient?: string | null
}

function formatNow() {
  const now = new Date()
  const date = now
    .toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
    .replace(/\//g, "/")
  const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
  return { date, time }
}

function genKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function Householding() {
  const expiredRows: KeyRecord[] = useMemo(
    () => [
      { id: "expired-1", date: "03/21/2023", time: "16:02", status: "expired", recipient: "-" },
      { id: "expired-2", date: "03/21/2023", time: "16:02", status: "expired", recipient: "-" },
      { id: "expired-3", date: "03/21/2023", time: "16:02", status: "expired", recipient: "-" },
    ],
    [],
  )

  // Dynamically generated keys
  const [inProgressKeys, setInProgressKeys] = useState<KeyRecord[]>([])

  const [acceptOpen, setAcceptOpen] = useState(false)

  const selfKeyIds = inProgressKeys.map((key) => key.id)

  const onGenerate = useCallback(() => {
    const { date, time } = formatNow()
    setInProgressKeys((prev) => [
      ...prev,
      {
        id: genKey(),
        date,
        time,
        status: "in-progress",
        recipient: "-",
      },
    ])
  }, [])

  const onCancel = useCallback((id: string) => {
    setInProgressKeys((prev) => prev.filter((k) => k.id !== id))
  }, [])


  const latestKey = inProgressKeys.length ? inProgressKeys[inProgressKeys.length - 1] : null

  return (
    <div className="space-y-2">
      <span className="body-14-medium">
        Householding allow you to share read-only account access with other people, using a security key. The key is
        always under your control.
      </span>

      <section className="border rounded-lg bg-background mt-2">
        <div className="px-4 py-3 border-b">
          <h2 className="subheading-16-semibold">Granting access to other people</h2>
          <ol className="mt-2 list-decimal pl-4 body-14-medium space-y-1">
            <li>From the client portal select Householding and click “Generate Key”.</li>
            <li>Provide the key to the user of your choice.</li>
            <li>Have the person you’d like to share your portal with “Accept Key”, then enter and “Validate”.</li>
            <li>
              That client can now view the account details for both themselves and the person who provided the key. This
              access can be revoked by the provider any time thereafter.
            </li>
          </ol>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={onGenerate}>
                Generate Key
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setAcceptOpen(true)}>
                Accept Key
              </Button>
            </div>
            <span className="text-xs text-muted-foreground italic">There are no accepted keys</span>
          </div>
        </div>

        {latestKey && (
          <div className="mx-2 md:mx-4 mt-3 mb-2 rounded-md bg-blue-50 border border-blue-100">
            <div className="px-3 md:px-4 py-3">
              <h3 className="subheading-16-semibold ">New Householding Key</h3>
              <p className="body-14-medium text-primary-600">
                This key will grant read only access to your account. Only one key per recipient is allowed.
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <code className="body-14-bold">{latestKey.id}</code>
              </div>
            </div>
          </div>
        )}

        <div className="px-2 md:px-4 py-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {/* Add consistent padding for neat spacing and Actions column */}
                  <TableHead className="body-14-medium whitespace-nowrap pr-6">Date Created</TableHead>
                  <TableHead className="body-14-medium whitespace-nowrap pr-6">Time</TableHead>
                  <TableHead className="body-14-medium whitespace-nowrap pr-6">Status</TableHead>
                  <TableHead className="body-14-medium whitespace-nowrap pr-6">Recipient</TableHead>
                  <TableHead className="body-14-medium text-right whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiredRows.map((row) => (
                  <TableRow key={row.id} className="body-14-medium text-primary-600">
                    <TableCell className="py-3 pr-6 whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="py-3 pr-6 whitespace-nowrap">{row.time}</TableCell>
                    <TableCell className="py-3 pr-6">
                      <Badge
                        variant="destructive"
                        className="rounded-sm px-2 py-0 h-5 text-[10px] text-error-700 bg-error-200"
                      >
                        Expired
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 pr-6 whitespace-nowrap">-</TableCell>
                    <TableCell className="py-3 text-right">{/* no actions for expired */}</TableCell>
                  </TableRow>
                ))}

                {inProgressKeys.map((row) => (
                  <TableRow key={row.id} className="body-14-medium text-primary-600">
                    <TableCell className="py-3 pr-6 whitespace-nowrap">{row.date}</TableCell>
                    <TableCell className="py-3 pr-6 whitespace-nowrap">{row.time}</TableCell>
                    <TableCell className="py-3 pr-6">
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-2 py-0 h-5 text-[10px] bg-info-200 text-info-700 border border-blue-200"
                        >
                          In-progress
                        </Badge>
                        <span className="captions-1-medium text-primary-1000 font-mono text-[11px] break-all">
                          {row.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 pr-6 whitespace-nowrap">-</TableCell>
                    <TableCell className="py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-primary-1000 border border-primary-1000 bg-transparent"
                        onClick={() => onCancel(row.id)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <AcceptKeyDialog open={acceptOpen} onOpenChange={setAcceptOpen} selfKeyIds={selfKeyIds} />
    </div>
  )
}

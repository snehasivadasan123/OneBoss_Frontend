"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Householding() {
  return (
    <div>
      <span className="body-14-medium">Householding allow you to share read-only account access with other people, using a security key. The key is always under your control.</span>
      <section className="border rounded-lg bg-background mt-2">

        <div className="px-4 py-3 border-b ">
          <h2 className="subheading-16-semibold">Granting access to other people</h2>
          <ol className="mt-2 list-decimal pl-4 body-14-medium space-y-1">
            <li>From the client portal select Householding and click “Generate Key”.</li>
            <li>Provide the key to the user of your choice.</li>
            <li>Have the person you’d like to share your portal with “Accept key”, then enter and “Validate”.</li>
            <li>
              That client can now view the account details for both themselves and the person who provided the key. This
              access can be revoked by the provider any time thereafter.
            </li>
          </ol>


          <div className="mt-3 flex items-center  gap-3">
            <div className="flex items-center gap-2">
              <Button size="sm">Generate Key</Button>
              <Button size="sm" variant="secondary">
                Accept Key
              </Button>
            </div>
            <span className="text-xs text-muted-foreground italic">There are no accepted keys</span>
          </div>
        </div>

        <div className="px-2 md:px-4 py-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent ">
                  <TableHead className="body-14-medium">Date Created</TableHead>
                  <TableHead className="body-14-medium">Time</TableHead>
                  <TableHead className="body-14-medium">Status</TableHead>
                  <TableHead className="body-14-medium">Recipient</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                <TableRow className="body-14-medium text-primary-600">
                  <TableCell className="py-3">03/21/2023</TableCell>
                  <TableCell className="py-3">16:02</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm px-2 py-0 h-5 text-[10px] text-error-700 bg-error-200">
                      Expired
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">-</TableCell>
                </TableRow>


                <TableRow className="body-14-medium text-primary-600">
                  <TableCell className="py-3">03/21/2023</TableCell>
                  <TableCell className="py-3">16:02</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm px-2 py-0 h-5 text-[10px] text-error-700 bg-error-200">
                      Expired
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">-</TableCell>
                </TableRow>


                <TableRow className="body-14-medium text-primary-600">
                  <TableCell className="py-3">03/21/2023</TableCell>
                  <TableCell className="py-3">16:02</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm px-2 py-0 h-5 text-[10px] text-error-700 bg-error-200">
                      Expired
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">-</TableCell>
                  <TableCell className="py-3 text-right"></TableCell>
                </TableRow>

                <TableRow className="body-14-medium text-primary-600">
                  <TableCell className="py-3">03/21/2023</TableCell>
                  <TableCell className="py-3">16:02</TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col ">

                      <Badge
                        variant="secondary"
                        className="rounded-sm px-2 py-0 h-5 text-[10px] bg-info-200 text-info-700 border border-blue-200"
                      >
                        In-progress
                      </Badge>
                      <span className="captions-1-medium text-primary-1000">
                        5a5c9e42-6c3f-11e9-92c3-4599d46ea0d

                      </span>
                    </div>


                  </TableCell>
                  <TableCell className="py-3">-</TableCell>
                  <TableCell className="py-3 ">
                    <Button size="sm" variant="outline" className="text-primary-1000 border border-primary-1000 ">
                      Cancel
                    </Button>
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section >
    </div >
  )
}

"use client"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table"
import { useState } from "react"
import { ChevronUp, ChevronDown, Eye } from "lucide-react"
// import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Row = {
  period: string
  dealership: string
  representative: string
  viewed: "Viewed" | "Not Viewed"
  viewedDate: string | "-"
  released: "Released" | "Unreleased"
  postedDate: string | "-"
}


const rows: Row[] = [
  {
    period: "Jan 01 2025–Jul 31 2025",
    dealership: "Bemonstration Dealer",
    representative: "1111-1002",
    viewed: "Not Viewed",
    viewedDate: "-",
    released: "Unreleased",
    postedDate: "-",
  },
  {
    period: "Jan 01 2025–Jul 31 2025",
    dealership: "Aemonstration Dealer",
    representative: "2111-1002",
    viewed: "Not Viewed",
    viewedDate: "-",
    released: "Released",
    postedDate: "-",
  },
  {
    period: "Jun 01 2025–Jul 30 2025",
    dealership: "Demonstration Dealer",
    representative: "5111-1002",
    viewed: "Not Viewed",
    viewedDate: "-",
    released: "Unreleased",
    postedDate: "-",
  },
]


const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "dealership",
    header: "Dealership",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "representative",
    header: "Representative",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "viewed",
    header: "Viewed",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<Row["viewed"]>()}</span>
    ),
  },
  {
    accessorKey: "viewedDate",
    header: "Viewed Date",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<Row["viewedDate"]>()}</span>
    ),
  },
  {
    accessorKey: "released",
    header: "Released",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<Row["released"]>()}</span>
    ),
  },
  {
    accessorKey: "postedDate",
    header: "Posted Date",
    cell: ({ getValue }) => (
      <span className="body-14-medium text-primary-600">{getValue<Row["postedDate"]>()}</span>
    ),
  },
  {
    id: "open",
    header: "Open",
    cell: () => (
      <div className="flex justify-left">
        <Eye className="h-4 w-4 text-foreground" aria-hidden="true" />
        <span className="sr-only">Open statement</span>
      </div>
    ),
  },
]

export function StatementHistoryTable() {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="overflow-x-auto border border-gray-200">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="text-muted-foreground">
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="whitespace-nowrap">
                  {header.isPlaceholder ? null : (
                    <div
                      className="flex items-center gap-1 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="subheading-14-semibold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {{
                        asc: <ChevronUp className="h-3.5 w-3.5" />,
                        desc: <ChevronDown className="h-3.5 w-3.5" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="text-foreground">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="py-2.5 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

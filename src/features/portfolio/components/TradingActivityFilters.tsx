

"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { logger } from "@/lib/logger"

export default function TradingActivityFilters() {
  const [plan] = React.useState("all")
  const [status] = React.useState("all")
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined)

  const handleSearch = () => {
    logger.debug("Searching with:", { plan, status, fromDate, toDate })
  }

  return (
    <Card>
      <CardHeader>Trading Activity</CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-end gap-8">
          <div className="space-y-2">
            <Label htmlFor="plan-select" className="text-primary-500">
              Plan
            </Label>
            <Select defaultValue="all">
              <SelectTrigger id="plan-select">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="planA">Plan A</SelectItem>
                <SelectItem value="planB">Plan B</SelectItem>
                <SelectItem value="planC">Plan C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 ">
            <Label htmlFor="status-select" className="text-primary-500">
              Status
            </Label>
            <Select defaultValue="all">
              <SelectTrigger id="status-select">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="from-date" className="text-primary-500">
              From
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-date" className="text-primary-500">
              To
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                // initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            onClick={handleSearch}
            className="col-span-full md:col-span-auto lg:col-span-1"
          >
            Search
          </Button>
        </div>

        <Label className="text-primary-500 mt-4 block">No Transaction Found</Label>
      </CardContent>
    </Card>
  )
}

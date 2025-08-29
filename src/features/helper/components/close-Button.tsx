"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CloseButton() {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Close help"
      className="h-8 w-8 text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
}

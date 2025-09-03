"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AcceptKeyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selfKeyIds?: string[]
}

type FormValues = {
  key: string
}

export function AcceptKeyDialog({ open, onOpenChange, }: AcceptKeyDialogProps) {
  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const form = useForm<FormValues>({
    defaultValues: { key: "" },
    mode: "onSubmit",
  })

  const onSubmit = form.handleSubmit(() => {
    setValidationMessage(
      "This householding Key is invalid. You cannot accept your own Keys. Please send this key to the person to whom you wish to grant access to your account.",
    )
  })

  const onClose = () => {
    setValidationMessage(null)
    form.reset({ key: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => (newOpen ? onOpenChange(newOpen) : onClose())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accept Householding Key</DialogTitle>
          <DialogDescription className="sr-only">Paste a householding key to validate</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              name="key"
              control={form.control}
              rules={{ required: "Householding key is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Householding key</FormLabel>
                  <FormControl>
                    <Input placeholder="Please paste key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {validationMessage && (
              <Alert variant="destructive">
                <AlertTitle>Invalid householding key</AlertTitle>
                <AlertDescription>{validationMessage}</AlertDescription>
              </Alert>
            )}

            <DialogFooter className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Validate</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

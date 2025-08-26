"use client"

import { useState } from "react"
import type React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CloudUpload, FileText } from "lucide-react"

interface UploadDocumentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  description: string
  note: string
  files?: FileList
}

export function UploadDocumentsModal({ open, onOpenChange }: UploadDocumentsModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      note: "",
    },
  })

  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      setValue("files", files)
      console.log("Files dropped:", files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setValue("files", files)
      console.log("Files selected:", files)
    }
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    onOpenChange(false)
    reset()
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
          <div className="flex items-center gap-5">

            <CloudUpload className="h-6 w-6" />

            <DialogTitle className="max-w-md p-0 gap-0">
              <div>
                <h2 className="text-lg font-semibold">Upload Documents</h2>
                <p className="text-sm text-muted-foreground">Upload Documents will be sent to your advisor.</p>
              </div>
            </DialogTitle>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onOpenChange(false)}>

          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="body-14-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder="Enter your Description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-sm text-error-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="body-14-medium">
              Note
            </label>
            <Textarea id="note" placeholder="Enter your note" {...register("note")} rows={4} />
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-info-700 hover:border-info-400"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <FileText className="h-8 w-8 text-gray-400" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-info-700 rounded-full flex items-center justify-center">
                  <span className="text-primary-50 text-xs">+</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm">
                  <label htmlFor="file-upload" className="text-info-700 hover:text-info-800 cursor-pointer">
                    Click to Upload
                  </label>
                  <span className="text-primary-500"> and Drag & Drop</span>
                </div>
                <p className="body-14-regular text-primary-500">pdf, gif, jpg, jpeg or png (max 20MB)</p>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.gif,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent hover:bg-primary-300 active:bg-primary-1000 active:text-white focus:bg-primary-1000 focus:text-primary-50"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="flex-1 bg-transparent hover:bg-primary-300 active:bg-primary-1000 active:text-white focus:bg-primary-1000 focus:text-primary-50"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

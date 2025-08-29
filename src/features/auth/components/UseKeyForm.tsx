"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const keySchema = z.object({
  key: z.string().min(1, "Key is required").min(6, "Key must be at least 6 characters"),
})

type KeyFormData = z.infer<typeof keySchema>

interface CheckMailProps {

  onUseKey?: (key: string) => void
}

export default function CheckMail({ onUseKey }: CheckMailProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KeyFormData>({
    resolver: zodResolver(keySchema),
  })

  const onSubmit = async (data: KeyFormData) => {
    if (onUseKey) {
      await onUseKey(data.key)
    }
  }

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-lg">
      <div className="text-center mb-4">


        <h2 className="text-xl font-semibold text-black ">Forgot Password!</h2>

        <p className="body-14-regular text-primary-500 leading-relaxed mb-6">
          If you have received a password reset email
          and you cannot use the reset link, please copy the key from the
          email and paste it in the text box below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="key" className="text-sm font-medium text-gray-700 mb-2 block">
            Key:
          </Label>
          <div className="relative">
            <Input
              id="key"
              type="text"
              placeholder="••••••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              {...register("key")}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
          {errors.key && <p className="text-red-500 text-xs mt-1">{errors.key.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium"
        >
          {isSubmitting ? "Processing..." : "Use Key"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

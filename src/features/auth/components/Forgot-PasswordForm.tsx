"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logger } from "@/lib/logger"
import CheckMail from "./CheckMailForm"

type FormData = {
  email: string
}

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    logger.debug("Form submitted with:", data)

    try {

      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmittedEmail(data.email)
      setEmailSent(true)
    } catch (error) {
      logger.error("Error sending password reset email:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToForm = () => {
    setEmailSent(false)
    setSubmittedEmail("")
  }

  // Show email sent confirmation
  if (emailSent) {
    return <CheckMail email={submittedEmail} onBackToForm={handleBackToForm} />
  }

  // Original forgot password form
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm w-full mx-auto p-3 sm:p-4"
      noValidate
    >
      <div className="text-center mb-6">
        <h2 className="subheading-20-semibold">
          Forgot Password!
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-primary-500 mt-1">
          Enter your email to reset your password.
        </p>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Id
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          className="text-sm py-2"
        />
        {errors.email && (
          <p className="text-xs text-error-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 gap-3 mb-6 mt-6">
        <Button
          variant="ghost"
          className="text-xs sm:text-sm border px-3 py-2"
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary-1000 hover:bg-gray-800 text-white text-xs sm:text-sm py-2 px-5 rounded-md disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-primary-1000 hover:underline font-medium"
        >
          Login
        </a>
      </p>
    </form>
  )
}
"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logger } from "@/lib/logger"

type FormData = {
  email: string
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    logger.debug("Form submitted with:", data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm w-full mx-auto p-3 sm:p-4"
      noValidate
    >
      <div className="mb-3">
        <label htmlFor="email" className="sr-only">
          Email Address
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
          <p className="text-xs text-error-100 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:space-x-4 gap-3 mb-6 mt-6">
        <Button
          variant="ghost"
          className="text-xs sm:text-sm border px-3 py-2"
          type="button"
        >
          I Already have a Key
        </Button>

        <Button
          type="submit"
          className="bg-primary-1000 hover:bg-gray-800 text-white text-xs sm:text-sm py-2 px-5 rounded-md"
        >
          Continue
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

"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { logger } from "@/lib/logger"
import { Input } from "@/components/ui/input"
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLogin } from "../hooks/useLogin"
const formSchema = z.object({
  email: z.string().email({ message: "Enter a Valid Email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error } = useLogin()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  function onsubmit(values: z.infer<typeof formSchema>) {
    logger.debug("Form submitted with values:", values)
    login(values.email, values.password)
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-500" />
                    <Input
                      placeholder="Enter Your Email"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      {...field}
                      className="pr-8 pl-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="body-14-medium text-error-500 text-center">{error}</p>}
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-primary-1000 hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary-1000 hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Register */}
          <p className="text-center body-14-medium text-primary-500">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-primary-1000 hover:underline">
              Register
            </a>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm

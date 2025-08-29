
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
interface CheckMailProps {
  email: string
  onBackToForm: () => void
}

export default function CheckMail({ email, onBackToForm }: CheckMailProps) {
  return (
    <div className="max-w-sm w-full mx-auto p-3 sm:p-4 ">
      <div className="text-center mb-4">
        <div className="mb-4">

        </div>
        <h2 className="subheading-20-semibold mb-2">
          Check your mail
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-primary-500">
          We have sent a password recover instructions to {email}
        </p>
      </div>

      <Button
        onClick={() => {
          window.open('mailto:', '_blank')
        }}
        className="w-full bg-primary-1000 hover:bg-gray-800 text-white text-xs sm:text-sm py-2 px-5 rounded-md mb-6"
      >
        Open Mail
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-primary-1000 hover:underline font-medium"
        >
          Login
        </a>
      </p>


      <div className="text-center mt-4">
        <button
          onClick={onBackToForm}
          className="text-xs text-primary-1000 hover:underline"
        >
          ← Back to forgot password
        </button>
      </div>
    </div>
  )
}
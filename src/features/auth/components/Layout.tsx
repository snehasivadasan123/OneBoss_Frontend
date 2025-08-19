import Image from "next/image";

interface LoginLayoutProps {
  mode: "login" | "register";
  children: React.ReactNode;
}

export default function Layout({ mode, children }: LoginLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-primary-250 overflow-hidden px-4 sm:px-6 lg:px-12 py-6">

      <div className="hidden md:block rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/image/loginimage.svg"
          alt={`${mode === "login" ? "Login" : "Register"} Visual`}
          width={800}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative">
        <div className="w-full max-w-sm sm:max-w-md bg-primary-50 p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="w-full space-y-4">

            {/* Logo */}
            <div className="flex justify-center mb-2">
              <Image
                src="/image/logo.svg"
                alt="Logo"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {mode === "login" ? "Login" : "Register"}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-primary-500 mt-1">
                {mode === "login"
                  ? "Enter your email and password to continue."
                  : "Create an account by filling the form below."}
              </p>
            </div>
            {children}
          </div>
        </div>
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-primary-600 text-center px-2">
          Having trouble logging in?{" "}
          <a href="#" className="underline text-primary-1000">
            Click here for help.
          </a>
        </p>
      </div>
    </div>
  );
}

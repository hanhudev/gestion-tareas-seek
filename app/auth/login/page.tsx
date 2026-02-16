import { LoginForm } from "@/features/auth/components/LoginForm"
import { AppTitle } from "@/components/AppTitle"

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen p-4 sm:gap-x-32 gap-y-16">
      <AppTitle />
      <LoginForm />
    </div>
  )
}
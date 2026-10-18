import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen">
      <div className="relative w-2/5 overflow-hidden">
        <div className="auth-mesh absolute inset-0" />
      </div>

      <div className="bg-background flex flex-1 flex-col items-center justify-center px-8 py-12 lg:w-3/5 xl:w-2/3">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <div className="mb-3">
              {/* La marca de la clínica, no una persona: queda redonda (Elements / Avatars es sólo para personas). */}
              <span className="bg-primary text-primary-foreground flex size-[60px] items-center justify-center rounded-full font-medium">RD</span>
            </div>
            <h1 className="text-card-foreground text-3xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground text-small">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <form
            className="mt-6 grid w-full grid-cols-1 items-center gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-12 gap-2">
              <Field id="email" label="Email" type="email" placeholder="Enter your email" />
            </div>
            <Button type="submit">Send reset link</Button>
          </form>

          <Link
            to="/login"
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4" /> Back to login
          </Link>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">© 2025 ALL RIGHTS RESERVED | CONFIDENTALLY</p>
          </div>
        </div>
      </div>
    </div>
  )
}

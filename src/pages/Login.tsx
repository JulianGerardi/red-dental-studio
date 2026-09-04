import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Panel decorativo */}
      <div className="relative w-2/5 overflow-hidden">
        <div className="auth-mesh absolute inset-0" />
      </div>

      {/* Panel del formulario */}
      <div className="bg-background flex flex-1 flex-col items-center justify-center px-8 py-12 lg:w-3/5 xl:w-2/3">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <div className="mb-3">
              <Avatar className="h-[60px] w-[60px]">
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-card-foreground text-3xl font-bold">
              Welcome! Red Dental Studio!
            </h1>
            <p className="text-muted-foreground text-small">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            className="mt-6 grid w-full grid-cols-1 items-center gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-12 gap-2">
              <Field
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
              />
              <Field
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                adornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                }
              />
            </div>

            <a href="#">
              <button
                type="button"
                className="text-muted-foreground text-sm underline"
              >
                Forgot your password?
              </button>
            </a>

            <Button type="submit">Login</Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">
              © 2025 ALL RIGHTS RESERVED | CONFIDENTALLY
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

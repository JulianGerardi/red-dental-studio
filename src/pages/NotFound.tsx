import { Link } from 'react-router-dom'
import { buttonClasses } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="bg-page-background flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-[110px] leading-none font-bold text-ink-faint">404</p>
      {/* Tokens y Button del sistema, como Under construction (auditoría de normalización, figma/README.md). */}
      <h1 className="mt-2 text-2xl font-bold text-ink">Oops! Page not found</h1>
      <p className="mt-3 text-sm text-ink-muted">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className={buttonClasses({ className: 'mt-6' })}
      >
        Go to Homepage
      </Link>
    </div>
  )
}

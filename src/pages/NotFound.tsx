import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg-page-background flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-[110px] leading-none font-bold text-slate-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-600">Oops! Page not found</h1>
      <p className="text-muted-foreground mt-3">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

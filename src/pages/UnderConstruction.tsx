import { Link } from 'react-router-dom'

/* Compartida por /billing, /message, /contacts y /documents. */
export default function UnderConstruction() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-20 text-center">
      <svg viewBox="0 0 460 165" className="w-[450px] max-w-full" role="img" aria-label="Teeth with braces">
        <defs>
          <linearGradient id="gum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(214 95% 93%)" />
            <stop offset="55%" stopColor="hsl(218 73% 62%)" />
            <stop offset="100%" stopColor="hsl(218 73% 45%)" />
          </linearGradient>
        </defs>

        {/* encía: va detrás, las raíces se ven blancas encima */}
        <path
          d="M0 86 Q29 66 58 86 Q87 106 116 86 Q145 66 174 86 Q203 106 232 86 Q261 66 290 86 Q319 106 348 86 Q377 66 406 86 Q435 106 460 88 L460 165 L0 165 Z"
          fill="url(#gum)"
        />

        <g key="0">
          {/* corona */}
          <path d="M6 30 C6 11 24 3 50 3 C76 3 94 11 94 30 L94 74 L6 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M12 72 L28 124 Q33 133 38 124 L48 72 Z" fill="#fff" />
          <path d="M52 72 L62 124 Q67 133 72 124 L88 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="37" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="1">
          {/* corona */}
          <path d="M96 30 C96 11 114 3 140 3 C166 3 184 11 184 30 L184 74 L96 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M102 72 L118 124 Q123 133 128 124 L138 72 Z" fill="#fff" />
          <path d="M142 72 L152 124 Q157 133 162 124 L178 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="127" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="2">
          {/* corona */}
          <path d="M186 30 C186 11 204 3 230 3 C256 3 274 11 274 30 L274 74 L186 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M192 72 L208 124 Q213 133 218 124 L228 72 Z" fill="#fff" />
          <path d="M232 72 L242 124 Q247 133 252 124 L268 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="217" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="3">
          {/* corona */}
          <path d="M276 30 C276 11 294 3 320 3 C346 3 364 11 364 30 L364 74 L276 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M282 72 L298 124 Q303 133 308 124 L318 72 Z" fill="#fff" />
          <path d="M322 72 L332 124 Q337 133 342 124 L358 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="307" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="4">
          {/* corona */}
          <path d="M366 30 C366 11 384 3 410 3 C436 3 454 11 454 30 L454 74 L366 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M372 72 L388 124 Q393 133 398 124 L408 72 Z" fill="#fff" />
          <path d="M412 72 L422 124 Q427 133 432 124 L448 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="397" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>

        {/* arco del aparato */}
        <line x1="10" y1="43" x2="450" y2="43" stroke="hsl(0 0% 80%)" strokeWidth="3.5" />
      </svg>

      <h1 className="text-primary mt-10 text-2xl font-bold">Page under construction</h1>
      <p className="text-muted-foreground mt-4 max-w-sm">
        We apologize and are working to resolve the problem. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground hover:bg-primary-hover mt-6 rounded-full px-6 py-2.5 text-sm font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

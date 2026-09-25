import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'

/* Marco común de las páginas de Foundations. */
export function Page({ titulo, bajada, children }: { titulo: string; bajada?: string; children: ReactNode }) {
  return (
    /* Fondo gris de la app (page-background) con contenido en cajas blancas:
       el mismo layout que <main> en AppShell. */
    <div className="bg-page-background min-h-svh text-ink">
      <div className="mx-auto w-full max-w-[1080px] px-8 py-10">
        <h1 className="text-[28px] font-bold tracking-tight">{titulo}</h1>
        {bajada && <p className="mt-2 max-w-[70ch] text-[14px] text-ink-muted">{bajada}</p>}
        <div className="mt-8 flex flex-col gap-10">{children}</div>
      </div>
    </div>
  )
}

export function Seccion({ titulo, nota, id, children }: { titulo: string; nota?: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-[16px] font-semibold">{titulo}</h2>
      {nota && <p className="mt-1 max-w-[70ch] text-[13px] text-ink-muted">{nota}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export const Codigo = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[12px]">{children}</code>
)
`})))()}export{n,i as r,r as t};
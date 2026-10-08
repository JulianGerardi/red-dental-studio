import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, ChevronDown, ExternalLink, KeyRound, Loader2, Sparkles, Square, Undo2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Diseno } from './bloques'
import { describir, editarSinIA, type Resultado } from './describir'
import { CLAVE_DEL_EQUIPO, ErrorIA, guardarClave, leerClave, pensarDiseno, type Turno } from './ia'
import { reemplazar } from './lienzo'
import type { Seccion } from './paleta'

/* La pestaña Describe: se escribe lo que se quiere armar o cambiar y el Builder piensa (con Gemini si hay clave, si no con el
   motor de palabras clave), muestra lo que va pensando y lo arma en el lienzo. Gemini ve lo que ya hay: un pedido de cambio
   edita eso y deja lo demás. Ver design-reference/design-system.md. */

type Paso = { texto: string; hecho: boolean }
const espera = (ms: number, senal: AbortSignal) =>
  new Promise<void>((listo, cortar) => {
    const t = window.setTimeout(listo, ms)
    senal.addEventListener('abort', () => { window.clearTimeout(t); cortar(senal.reason) }, { once: true })
  })
const recortar = (s: string, n = 42) => (s.length > n ? \`\${s.slice(0, n - 1)}…\` : s)
/* Un modal solo en el lienzo: se deja abierto para verlo. */
const modalDe = (d: Diseno) => (d.bloques.length === 1 && d.bloques[0]!.tipo === 'modal' ? d.bloques[0]!.id : null)

export function useDescribir({ paleta, cuantas, d, setD, setEditando, setModalAbierto }: {
  paleta: Seccion[]
  /** Piezas y bloques que hay, para contarlo mientras busca. */
  cuantas: { piezas: number; bloques: number }
  d: Diseno
  setD: (d: Diseno | ((x: Diseno) => Diseno)) => void
  setEditando: (id: string | null) => void
  setModalAbierto: (id: string | null) => void
}) {
  const [estado, setEstado] = useState<'quieto' | 'pensando' | 'armando'>('quieto')
  const [pasos, setPasos] = useState<Paso[]>([])
  const [pensamiento, setPensamiento] = useState('')
  const [inicio, setInicio] = useState(0)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const [previo, setPrevio] = useState<Diseno | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [nada, setNada] = useState<string | null>(null)
  const [clave, setClave] = useState(leerClave)
  const [modelo, setModelo] = useState<string | null>(null)
  const [cambios, setCambios] = useState<string[]>([])
  const [claveRechazada, setClaveRechazada] = useState(false)
  /* Lo que se pidió en esta sesión: la IA lo usa para entender "eso", "la tabla", "más grande". */
  const historial = useRef<Turno[]>([])
  const corrida = useRef<AbortController | null>(null)
  const actual = useRef(d)
  useEffect(() => {
    actual.current = d
  }, [d])

  const paso = (texto: string) => setPasos((ps) => [...ps.map((p) => ({ ...p, hecho: true })), { texto, hecho: false }])

  const armar = async (texto: string) => {
    corrida.current?.abort()
    const c = new AbortController()
    corrida.current = c
    const s = c.signal
    let anterior: Diseno | null = null
    setEstado('pensando')
    setPasos([])
    setPensamiento('')
    setAviso(null)
    setNada(null)
    setResultado(null)
    setCambios([])
    setInicio(Date.now())
    try {
      paso('Leyendo lo que pediste')
      await espera(300, s)
      const hay = actual.current.bloques.length > 0
      let r: Resultado | null = null
      let edito = false
      if (clave) {
        paso(hay ? 'Mirando lo que hay en el lienzo y pensando con Gemini' : 'Pensando con Gemini, con todas las piezas de la app a mano')
        try {
          const ia = await pensarDiseno({ clave, pedido: texto, historial: historial.current, diseno: actual.current, paleta, alPensar: (t) => setPensamiento((p) => p + t), senal: s })
          r = { diseno: ia.diseno, partes: [], plantillas: [], entendido: ia.resumen || 'Listo.', abrir: modalDe(ia.diseno) }
          edito = ia.edito
          setModelo(ia.modelo)
          setClaveRechazada(false)
          setCambios(ia.cambios)
          for (const c of ia.cambios) {
            paso(c)
            await espera(200, s)
          }
        } catch (e) {
          if (s.aborted) throw e
          if (e instanceof ErrorIA && e.motivo === 'clave') setClaveRechazada(true)
          setAviso(\`\${e instanceof ErrorIA ? e.message : 'Gemini no respondió.'} Lo hice sin IA.\`)
        }
      }
      if (!r) {
        setModelo(null)
        /* Sin IA también se puede cambiar lo que hay: agregar una parte, sacar una, cambiar el título. */
        const cambio = hay ? editarSinIA(texto, actual.current, paleta) : null
        if (cambio) {
          r = cambio
          edito = true
          paso('Cambiando lo que hay en el lienzo')
        } else {
          paso(\`Buscando entre \${cuantas.piezas} piezas y \${cuantas.bloques} bloques de la app\`)
          await espera(550, s)
          r = describir(texto, paleta)
        }
      }
      if (!r) {
        setNada(texto)
        setPasos([])
        setEstado('quieto')
        return
      }
      if (!edito) {
        for (const p of r.partes) {
          paso(\`“\${recortar(p.texto)}” → \${p.opciones[0]!.etiqueta}\`)
          await espera(240, s)
        }
      }
      paso(edito ? 'Aplicando los cambios' : r.diseno.contenedor === 'app' ? 'Armando la pantalla' : 'Armándolo en el lienzo')
      anterior = actual.current
      setEstado('armando')
      setEditando(null)
      setModalAbierto(null)
      const final = r.diseno
      if (edito) {
        /* Un cambio se aplica de una: rearmar pieza por pieza haría parecer que se perdió lo que había. */
        await espera(260, s)
        setD(final)
      } else {
        setD({ ...final, bloques: [] })
        for (let i = 1; i <= final.bloques.length; i++) {
          await espera(i === 1 ? 220 : 340, s)
          setD({ ...final, bloques: final.bloques.slice(0, i) })
        }
      }
      await espera(260, s)
      setPasos((ps) => ps.map((p) => ({ ...p, hecho: true })))
      setPrevio(anterior)
      setResultado(r)
      setEditando(r.abrir)
      historial.current = [...historial.current, { pedido: texto, resumen: r.entendido }].slice(-8)
      setEstado('quieto')
    } catch {
      /* Detenido: si ya estaba armando, vuelve lo que había. */
      if (anterior) setD(anterior)
      setPasos([])
      setEstado('quieto')
    }
  }

  return {
    estado, pasos, pensamiento, inicio, resultado, previo, aviso, nada, clave, modelo, cambios, claveRechazada, armar,
    hayAlgo: d.bloques.length > 0,
    detener: () => corrida.current?.abort(),
    conectar: (k: string | null) => {
      guardarClave(k)
      setClave(leerClave())
      setClaveRechazada(false)
    },
    cambiar: (i: number, k: number) => {
      if (!resultado) return
      const p = resultado.partes[i]!
      const b = p.opciones[k]!.crear()
      setD((x) => ({ ...x, bloques: reemplazar(x.bloques, p.bloqueId, b) }))
      setResultado({ ...resultado, partes: resultado.partes.map((q, j) => (j === i ? { ...q, elegida: k, bloqueId: b.id } : q)) })
      setEditando(b.tipo === 'modal' ? b.id : null)
    },
    deshacer: () => {
      if (!previo) return
      setD(previo)
      setPrevio(null)
      setResultado(null)
      setPasos([])
      setEditando(null)
      historial.current = historial.current.slice(0, -1)
    },
    plantilla: (crear: () => Diseno) => {
      setPrevio(actual.current)
      setD(crear())
      setResultado(null)
      setPasos([])
      setEditando(null)
    },
  }
}

export type Descripcion = ReturnType<typeof useDescribir>

const EJEMPLOS = [
  'Una pantalla de pacientes con métricas, la tabla de pacientes y a la derecha los turnos del día',
  'Un popup para registrar un pago con fecha, monto, método de pago y notas',
  'Formulario de nuevo empleado con nombre, apellido, email, rol y sede',
  'El modal de nuevo paciente',
  'Pantalla de recetas con pestañas de activas, historial y la tabla de recetas',
]

/* El "orbe" que late mientras piensa. */
function Orbe({ activo }: { activo: boolean }) {
  return (
    <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,var(--color-dash-blue),var(--color-purple-fg),var(--color-dash-blue))] text-white shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-dash-blue)_12%,transparent)]', activo && 'bl-orbe')}>
      <Sparkles className="size-3.5" />
    </span>
  )
}

/* Los pensamientos de Gemini llegan en markdown liviano: se muestran los **títulos** en negrita. */
function Pensamiento({ texto }: { texto: string }) {
  const caja = useRef<HTMLDivElement>(null)
  useEffect(() => {
    caja.current?.scrollTo({ top: caja.current.scrollHeight })
  }, [texto])
  const partes: ReactNode[] = texto.slice(-1600).split(/(\\*\\*[^*]+\\*\\*)/).map((t, i) => (t.startsWith('**') ? <b key={i} className="font-semibold text-ink not-italic">{t.slice(2, -2)}</b> : t))
  return (
    <div ref={caja} className="max-h-36 overflow-y-auto rounded-lg bg-white/70 px-2.5 py-2 text-[12px] leading-relaxed whitespace-pre-wrap text-ink-muted italic [mask-image:linear-gradient(to_bottom,transparent,#000_18px)]">
      {partes}
    </div>
  )
}

function Segundos({ desde }: { desde: number }) {
  const [ahora, setAhora] = useState(desde)
  useEffect(() => {
    const t = window.setInterval(() => setAhora(Date.now()), 250)
    return () => window.clearInterval(t)
  }, [])
  return <span className="text-[11.5px] text-ink-muted tabular-nums">{Math.max(0, (ahora - desde) / 1000).toFixed(1)} s</span>
}

function Conexion({ desc }: { desc: Descripcion }) {
  const [abierto, setAbierto] = useState(!desc.clave)
  const mala = desc.claveRechazada
  useEffect(() => {
    if (mala) setAbierto(true)
  }, [mala])
  const [valor, setValor] = useState('')
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line-row bg-surface-subtle">
      <button type="button" onClick={() => setAbierto((v) => !v)} aria-expanded={abierto} className="flex items-center justify-between gap-2 px-3 py-2 text-left">
        <span className="flex items-center gap-2 text-[12.5px] text-ink">
          <span className={cn('size-2 rounded-full', mala ? 'bg-dash-bad-fg' : desc.clave ? 'bg-green' : 'bg-line')} />
          {mala ? <>Gemini rechazó la clave · <span className="font-medium text-dash-blue">Conectar otra</span></> : desc.clave ? <>Piensa con <b className="font-semibold">Gemini</b>{desc.clave === CLAVE_DEL_EQUIPO && ' · clave del equipo'}</> : <>Sin IA · <span className="font-medium text-dash-blue">Conectar Gemini (gratis)</span></>}
        </span>
        <ChevronDown className={cn('size-3.5 text-ink-muted transition-transform', abierto && 'rotate-180')} />
      </button>
      {abierto && (
        <div className="flex flex-col gap-2 border-t border-line-row px-3 pt-2.5 pb-3 text-[12px] leading-snug text-ink">
          {mala ? (
            <span className="text-dash-bad-fg">{desc.clave === CLAVE_DEL_EQUIPO ? 'La clave del equipo dejó de funcionar: hay que renovarla en Google AI Studio y volver a cargarla en el deploy.' : 'Tu clave dejó de funcionar.'} Mientras tanto podés pegar una tuya abajo.</span>
          ) : null}
          {!mala && desc.clave && desc.clave === CLAVE_DEL_EQUIPO ? (
            <span>Usa la clave de Gemini del equipo. Cada descripción la piensa Gemini con el catálogo de la app.</span>
          ) : !mala && desc.clave ? (
            <>
              <span>Tu clave de Gemini está guardada en este navegador. Cada descripción la piensa Gemini con el catálogo de la app.</span>
              <button type="button" onClick={() => desc.conectar(null)} className="self-start font-medium text-dash-bad-fg hover:underline">Quitar la clave</button>
            </>
          ) : (
            <>
              <span>1. Entrá a <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-dash-blue hover:underline">Google AI Studio <ExternalLink className="size-3" /></a> y creá una clave. Es gratis.</span>
              <span>2. Pegala acá. Queda sólo en este navegador.</span>
              <form className="flex gap-1.5" onSubmit={(e) => { e.preventDefault(); if (valor.trim()) { desc.conectar(valor.trim()); setValor(''); setAbierto(false) } }}>
                <label className="relative min-w-0 flex-1">
                  <KeyRound className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-ink-muted" />
                  <input id="builder-clave-gemini" type="password" autoComplete="off" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Clave de Gemini" aria-label="Gemini API key" className="h-8 w-full rounded-md border border-line bg-white pr-2 pl-7 text-[12.5px] outline-none focus:border-dash-blue" />
                </label>
                <button type="submit" disabled={!valor.trim()} className="h-8 rounded-md bg-dash-blue px-3 text-[12.5px] font-medium text-white hover:bg-dash-blue-hover disabled:opacity-40">Guardar</button>
              </form>
            </>
          )}
          <span className="text-[11.5px] text-ink-muted">Lo que describís y la lista de componentes se mandan a Google. En el plan gratis Google puede usarlo para mejorar sus productos: no escribas datos reales de pacientes.</span>
        </div>
      )}
    </div>
  )
}

export function Describir({ desc, listo }: { desc: Descripcion; listo: boolean }) {
  const [texto, setTexto] = useState('')
  const ocupado = desc.estado !== 'quieto'
  const enviar = (t = texto) => {
    if (!t.trim() || !listo || ocupado) return
    setTexto(t)
    void desc.armar(t)
  }
  const r = desc.resultado

  return (
    <div className="flex flex-col gap-3.5 p-4">
      <Conexion desc={desc} />
      <div className={cn('flex flex-col gap-2 rounded-xl border bg-white p-2 transition-shadow focus-within:border-dash-blue focus-within:ring-2 focus-within:ring-dash-blue/15', ocupado ? 'border-dash-blue/50 shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-dash-blue)_10%,transparent)]' : 'border-line')}>
        <textarea
          id="builder-describir"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
          rows={3}
          placeholder={desc.hayAlgo ? 'Pedí un cambio: “sacá la tabla”, “cambiá el título a Patients”, “agregá un buscador”… o algo nuevo' : '¿Qué querés armar? Ej: una pantalla de pacientes con métricas, la tabla y a la derecha los turnos del día'}
          aria-label="Describe what you want to build"
          className="w-full resize-none border-0 bg-transparent px-1.5 py-1 text-[13.5px] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
        />
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-[11.5px] text-ink-muted">{!listo ? 'Cargando los componentes de la app…' : desc.clave ? 'Enter para armar · con Gemini' : 'Enter para armar · sin IA, por palabras clave'}</span>
          {ocupado ? (
            <button type="button" onClick={desc.detener} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium text-ink hover:bg-surface-subtle">
              <Square className="size-3 fill-current" /> Detener
            </button>
          ) : (
            <button type="button" onClick={() => enviar()} disabled={!texto.trim() || !listo} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-dash-blue px-3 text-[13px] font-medium text-white hover:bg-dash-blue-hover disabled:opacity-40">
              <Sparkles className="size-3.5" /> Armar
            </button>
          )}
        </div>
      </div>

      {desc.pasos.length > 0 && (
        <section aria-label="Thinking" aria-live="polite" className="flex flex-col gap-2.5 rounded-xl border border-line-row bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-dash-blue)_5%,white),white)] p-3">
          <div className="flex items-center gap-2.5">
            <Orbe activo={ocupado} />
            <span className={cn('flex-1 text-[13.5px] font-semibold', ocupado ? 'bl-brillo text-ink' : 'text-ink')}>
              {desc.estado === 'pensando' ? 'Pensando…' : desc.estado === 'armando' ? 'Armando…' : 'Listo'}
            </span>
            {ocupado && <Segundos desde={desc.inicio} />}
          </div>
          {desc.pensamiento && <Pensamiento texto={desc.pensamiento} />}
          <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
            {desc.pasos.map((p, i) => (
              <li key={\`\${i}-\${p.texto}\`} className="bl-paso flex items-start gap-2 text-[12.5px] leading-snug">
                {p.hecho ? <Check className="mt-0.5 size-3.5 shrink-0 text-green-deep" /> : <Loader2 className="mt-0.5 size-3.5 shrink-0 animate-spin text-dash-blue" />}
                <span className={p.hecho ? 'text-ink-muted' : 'text-ink'}>{p.texto}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {desc.aviso && (
        <p role="status" className="m-0 flex items-start gap-2 rounded-lg border border-line-row bg-surface-subtle px-3 py-2 text-[12.5px] leading-snug text-ink">
          <X className="mt-0.5 size-3.5 shrink-0 text-ink-muted" /> {desc.aviso}
        </p>
      )}
      {desc.nada && (
        <p role="status" className="m-0 rounded-lg border border-line-row bg-surface-subtle px-3 py-2 text-[12.5px] leading-snug text-ink">
          No encontré nada para “{desc.nada}”. Nombrá lo que querés armar —una pantalla, un popup, un formulario, una tabla— y qué lleva: “con fecha, monto y notas”.
        </p>
      )}

      {r && !ocupado ? (
        <section aria-label="Result" className="flex flex-col gap-3 rounded-xl border border-line-row bg-surface-subtle p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="m-0 text-[13px] leading-snug text-ink">{r.entendido}</p>
            {desc.previo && (
              <button type="button" onClick={desc.deshacer} className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-[12.5px] font-medium text-dash-blue hover:bg-white">
                <Undo2 className="size-3.5" /> Deshacer
              </button>
            )}
          </div>
          <span className="self-start rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink-muted">{desc.modelo ? \`Pensado con \${desc.modelo}\` : 'Armado sin IA'}</span>
          {desc.cambios.length > 0 && (
            <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[12.5px] leading-snug text-ink-medium">
              {desc.cambios.map((c, i) => <li key={\`\${i}-\${c}\`}>{c}</li>)}
            </ul>
          )}
          {r.partes.length > 0 && (
            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {r.partes.map((p, i) => (
                <li key={\`\${i}-\${p.texto}\`} className="flex flex-col gap-1">
                  <span className="truncate text-[11.5px] text-ink-muted">“{p.texto}”</span>
                  {p.opciones.length > 1 ? (
                    <span className="relative">
                      <select value={p.elegida} onChange={(e) => desc.cambiar(i, Number(e.target.value))} aria-label={\`Option for \${p.texto}\`} className="h-8 w-full min-w-0 appearance-none rounded-md border border-line bg-white pr-7 pl-2.5 text-[13px] text-ink outline-none focus:border-dash-blue">
                        {p.opciones.map((o, k) => <option key={\`\${k}-\${o.etiqueta}\`} value={k}>{o.etiqueta} — {o.lugar}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-ink-muted" />
                    </span>
                  ) : (
                    <span className="text-[13px] font-medium text-ink">{p.opciones[0]!.etiqueta}</span>
                  )}
                </li>
              ))}
            </ol>
          )}
          {r.plantillas.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11.5px] text-ink-muted">También hay plantillas parecidas:</span>
              {r.plantillas.map((p) => (
                <button key={p.nombre} type="button" title={p.que} onClick={() => desc.plantilla(p.crear)} className="inline-flex h-6 items-center rounded-full border border-line bg-white px-2 text-[12px] font-medium text-ink hover:border-dash-blue hover:text-dash-blue">{p.nombre}</button>
              ))}
            </div>
          )}
          <p className="m-0 text-[11.5px] leading-snug text-ink-muted">Seguí pidiendo cambios acá arriba: “sacá la tabla”, “cambiá el título a…”, “poné los turnos a la derecha”.{r.partes.length > 0 && ' Cada parte también se cambia por otra opción.'} Para lo demás, arrastrá desde Components o ajustá en Layers.</p>
        </section>
      ) : !ocupado && !desc.pasos.length && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-ink-medium">Probá con</span>
          {EJEMPLOS.map((e) => (
            <button key={e} type="button" onClick={() => enviar(e)} disabled={!listo} className="rounded-lg border border-line bg-white px-2.5 py-2 text-left text-[12.5px] leading-snug text-ink hover:border-dash-blue disabled:opacity-50">
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};
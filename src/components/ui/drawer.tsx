import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { ArrowLeft, ArrowRight, Check, X, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/ui/step-indicator'

/* Drawer: el panel que entra desde la derecha, de alto completo. Desde 2026-10-06 es la forma de todo lo que se abre
   encima de una pantalla -formularios, detalles, editores-. La organización es la de Confidentally 2.0 (Julián: "la
   lógica, los steps y cómo está organizado copia del 2.0"); los colores, la tipografía y los componentes, los de esta
   plataforma. Las confirmaciones de una sola pregunta siguen siendo ConfirmDialog. Ver Components / UI / Drawer.

   Como en 2.0:
   - Título y bajada arriba; si hay varias partes, los pasos (Step 1, 2, 3) debajo, sin línea que los separe.
   - Contenido en una sola columna, con secciones de título suelto -sin caja ni borde- y campos de a dos por fila.
   - Pie con dos botones del mismo ancho: a la izquierda Cancel o Return, a la derecha Next Step o Save.
   - Un panel de apoyo (`aside`, el calendario de horarios de New Appointment) se despliega al costado del drawer.
   Radix Dialog por dentro: el foco queda adentro, Escape y la capa lo cierran. */

const ANCHO = { md: 'max-w-[480px]', lg: 'max-w-[560px]', xl: 'max-w-[760px]' } as const
export type DrawerSize = keyof typeof ANCHO

/* Dentro de un drawer las secciones no llevan caja (SectionCard la deja). */
const EnDrawer = React.createContext(false)
export const useEnDrawer = () => React.useContext(EnDrawer)

/* Hacia dónde se movió el paso: el contenido nuevo entra desde ese lado. */
const Sentido = React.createContext<1 | -1>(1)

export function Drawer({
  open, onClose, title, description, steps, step = 0, stepLabels, size = 'md', footer, footerClassName, aside, children, className,
}: {
  open: boolean
  onClose: () => void
  title: string
  /** Bajada del título; si no hay, el título también la describe para el lector de pantalla. */
  description?: string
  /** Los nombres de los pasos, si el formulario tiene varias partes. */
  steps?: readonly string[]
  /** Paso actual, desde 0. */
  step?: number
  /** Cada paso dice su nombre en vez de "Step" (New Procedure). */
  stepLabels?: boolean
  /** md 480 · lg 560 · xl 760, como los anchos de 2.0. */
  size?: DrawerSize
  /** Las acciones del pie, lado a lado y del mismo ancho. */
  footer?: React.ReactNode
  footerClassName?: string
  /** Panel de apoyo que se despliega a la izquierda del drawer (en pantallas angostas va al pie del contenido). */
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const conPasos = !!steps && steps.length > 1
  const anterior = React.useRef(step)
  const sentido: 1 | -1 = step < anterior.current ? -1 : 1
  React.useEffect(() => { anterior.current = step }, [step])
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex max-w-full items-stretch outline-none motion-safe:animate-[panel-in_180ms_ease-out]">
          {aside && (
            <div className="motion-safe:animate-[loc-in_200ms_ease-out] hidden w-[300px] shrink-0 flex-col overflow-y-auto border-r border-line bg-white shadow-[-12px_0_32px_rgb(0_0_0/0.10)] lg:flex">
              {aside}
            </div>
          )}
          <div className={cn('flex h-full w-screen flex-col bg-white shadow-[-12px_0_32px_rgb(0_0_0/0.14)]', ANCHO[size], className)}>
            <div className="flex items-start justify-between gap-3 px-6 pt-6">
              <div className="min-w-0">
                <DialogPrimitive.Title className="text-[18px] leading-tight font-bold text-ink">{title}</DialogPrimitive.Title>
                <DialogPrimitive.Description className={description ? 'mt-1 text-[12px] text-ink-muted' : 'sr-only'}>
                  {description ?? title}
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close aria-label="Close" className="-mt-1 -mr-1 shrink-0 rounded-md p-1 text-ink hover:bg-surface-muted">
                <XIcon className="size-5" />
              </DialogPrimitive.Close>
            </div>
            {/* Como en 2.0, cada paso dice "Step" y su número; el nombre lo da el título de la sección. */}
            {conPasos && <StepIndicator total={steps.length} current={step + 1} labels={stepLabels ? steps : undefined} className="px-6 pt-6" />}
            <Sentido.Provider value={sentido}>
            <EnDrawer.Provider value>
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                {children}
                {aside && <div className="mt-6 lg:hidden">{aside}</div>}
              </div>
            </EnDrawer.Provider>
            </Sentido.Provider>
            {footer && (
              <div className={cn('flex items-center gap-3 border-t border-line-soft px-6 py-4 [&>button]:flex-1 [&>div]:flex-1', footerClassName)}>
                {footer}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/* Una sección del drawer: título suelto y sus campos debajo, sin caja (como en 2.0). */
export function DrawerSection({ title, description, children, className }: { title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <div>
        <h3 className="text-[13px] font-bold text-ink">{title}</h3>
        {description && <p className="mt-0.5 text-[11px] leading-[1.5] text-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  )
}

/* Una parte de un drawer con pasos. La que no es la actual queda escondida y no se desmonta: lo escrito se conserva al
   ir y volver. Al mostrarse entra deslizándose desde el lado hacia el que se avanzó (Next desde la derecha, Return desde
   la izquierda), junto con el tilde y la línea verde del indicador. */
export function DrawerStep({ index, step, children, className }: { index: number; step: number; children: React.ReactNode; className?: string }) {
  const sentido = React.useContext(Sentido)
  return (
    <div
      hidden={index !== step}
      className={cn(
        'flex flex-col gap-6',
        sentido === 1 ? 'motion-safe:animate-[paso-entra_260ms_ease-out]' : 'motion-safe:animate-[paso-vuelve_260ms_ease-out]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* El pie de un drawer, como en 2.0: a la izquierda Cancel (primer paso) o Return; a la derecha Next Step o, en el
   último paso, Save. */
export function DrawerActions({
  step = 0, total = 1, onNext, onBack, onCancel, onSave, nextDisabled, saveDisabled, saveLabel = 'Save', cancelLabel = 'Cancel',
}: {
  step?: number
  total?: number
  onNext?: () => void
  onBack?: () => void
  onCancel: () => void
  onSave: () => void
  nextDisabled?: boolean
  saveDisabled?: boolean
  saveLabel?: string
  cancelLabel?: string
}) {
  const ultimo = step >= total - 1
  return (
    <>
      {step === 0 ? (
        <Button variant="secondary" onClick={onCancel}><X /> {cancelLabel}</Button>
      ) : (
        <Button variant="secondary" onClick={onBack}><ArrowLeft /> Return</Button>
      )}
      {ultimo ? (
        <Button disabled={saveDisabled} onClick={onSave}><Check /> {saveLabel}</Button>
      ) : (
        <Button disabled={nextDisabled} onClick={onNext}>Next Step <ArrowRight /></Button>
      )}
    </>
  )
}

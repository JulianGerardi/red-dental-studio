import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  CATEGORIAS, PERIODOS, PLANTILLAS, armarReglas, idNuevo, numero,
  type Clase, type Periodo, type PorClase, type TablaCobertura,
} from '@/data/finanzas'

/* New / Edit Coverage Table. Nuevo: General (nombre y de qué plantilla o tabla parte), Limits (máximos y deducibles) y
   Coverage (el porcentaje de cada clase). Editar: General y Limits; el porcentaje de cada categoría se cambia en la tabla
   del detalle. Ver settings-billing.md. */

const CLASES_EDITABLES: { clase: Exclude<Clase, 'Other'>; campo: 'preventivo' | 'basico' | 'mayor' | 'orto'; label: string; ayuda: string }[] = [
  { clase: 'Preventive', campo: 'preventivo', label: 'Preventive (%)', ayuda: 'Exams, X-rays, cleanings, fluoride.' },
  { clase: 'Basic', campo: 'basico', label: 'Basic (%)', ayuda: 'Fillings, root canals, gum care, extractions.' },
  { clase: 'Major', campo: 'mayor', label: 'Major (%)', ayuda: 'Crowns, bridges, dentures, implants.' },
  { clase: 'Orthodontics', campo: 'orto', label: 'Orthodontics (%)', ayuda: 'Braces and aligners.' },
]

/* Una tabla existente se ofrece como "Copy of …": así no se confunde con una plantilla del mismo nombre. */
const COPIA = 'Copy of '

/* El porcentaje con el que arranca cada clase: el de su primera categoría. */
const deClase = (t: Pick<TablaCobertura, 'reglas'>, clase: Clase) => t.reglas[CATEGORIAS.find((c) => c.clase === clase)!.grupo].porcentaje

export function CoverageTableDrawer({
  inicial, onClose, onGuardar,
}: {
  /** Con una tabla, edita su nombre, período y límites. */
  inicial?: TablaCobertura
  onClose: () => void
  onGuardar: (t: TablaCobertura) => void
}) {
  const { coberturas } = useFinanzas()
  const editando = !!inicial
  const pasos = editando ? ['General', 'Limits'] : ['General', 'Limits', 'Coverage']
  const texto = (n?: number) => (n === undefined ? '' : String(n))
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(
    {
      nombre: inicial?.nombre ?? '', base: '', periodo: inicial?.periodo ?? 'Calendar year',
      maximo: texto(inicial?.maximo), deducible: texto(inicial?.deducible), familia: texto(inicial?.deducibleFamilia), maximoOrto: texto(inicial?.maximoOrto),
      preventivo: '', basico: '', mayor: '', orto: '',
    },
    editando
      ? [['nombre', 'periodo'], ['maximo', 'deducible']]
      : [['nombre', 'base', 'periodo'], ['maximo', 'deducible'], ['preventivo', 'basico', 'mayor', 'orto']],
  )
  /* Los porcentajes con que se precargó la clase: si no se tocan, se copian las reglas de la tabla tal cual. */
  const [precarga, setPrecarga] = useState<Partial<PorClase>>({})

  const tablaBase = coberturas.find((t) => `${COPIA}${t.nombre}` === d.base)
  const elegirBase = (nombre: string) => {
    set('base')(nombre)
    const tabla = coberturas.find((t) => `${COPIA}${t.nombre}` === nombre)
    const clases = tabla
      ? Object.fromEntries(CLASES_EDITABLES.map(({ clase }) => [clase, deClase(tabla, clase)])) as PorClase
      : PLANTILLAS.find((p) => p.nombre === nombre)?.clases
    if (!clases) return
    setPrecarga(clases)
    for (const c of CLASES_EDITABLES) set(c.campo)(String(clases[c.clase]))
    if (tabla) {
      set('maximo')(String(tabla.maximo)); set('deducible')(String(tabla.deducible))
      set('familia')(String(tabla.deducibleFamilia)); set('maximoOrto')(String(tabla.maximoOrto))
      set('periodo')(tabla.periodo)
    }
  }

  const repetido = coberturas.some((t) => t.id !== inicial?.id && t.nombre.toLowerCase() === d.nombre.trim().toLowerCase())
  const monto = (k: 'maximo' | 'deducible' | 'familia' | 'maximoOrto') => {
    const n = numero(d[k])
    return falta(k) ?? (d[k].trim() && (n === null || n < 0) ? 'Enter an amount, like 1500.' : undefined)
  }
  const porcentaje = (k: 'preventivo' | 'basico' | 'mayor' | 'orto') => {
    const n = numero(d[k])
    return falta(k) ?? (d[k].trim() && (n === null || n < 0 || n > 100 || !Number.isInteger(n)) ? 'Enter a whole number from 0 to 100.' : undefined)
  }
  const errores = [repetido, ...(['maximo', 'deducible', 'familia', 'maximoOrto'] as const).map(monto), ...CLASES_EDITABLES.map((c) => porcentaje(c.campo))]
  const avanzar = () => {
    if (paso === 0 && repetido) return
    if (paso === 1 && (['maximo', 'deducible', 'familia', 'maximoOrto'] as const).some((k) => d[k].trim() && monto(k))) return
    siguiente()
  }

  const guardar = () => {
    if (!listo() || errores.some(Boolean)) return
    let reglas = inicial?.reglas ?? (tablaBase ? { ...tablaBase.reglas } : armarReglas({ Preventive: 0, Basic: 0, Major: 0, Orthodontics: 0, Other: 0 }))
    if (!inicial) {
      for (const { clase, campo } of CLASES_EDITABLES) {
        const v = Number(d[campo])
        if (tablaBase && precarga[clase] === v) continue
        reglas = Object.fromEntries(Object.entries(reglas).map(([g, r]) => [g, CATEGORIAS.find((c) => c.grupo === g)?.clase === clase ? { ...r, porcentaje: v } : r])) as TablaCobertura['reglas']
      }
    }
    onGuardar({
      id: inicial?.id ?? idNuevo(d.nombre, coberturas.map((t) => t.id)),
      nombre: d.nombre.trim(), periodo: d.periodo as Periodo,
      maximo: numero(d.maximo) ?? 0, deducible: numero(d.deducible) ?? 0, deducibleFamilia: numero(d.familia) ?? 0, maximoOrto: numero(d.maximoOrto) ?? 0,
      estado: inicial?.estado ?? 'Active', reglas,
    })
    onClose()
  }

  return (
    <ModalShell
      title={editando ? 'Edit Coverage Table' : 'New Coverage Table'}
      description={editando ? 'Name, benefit period and limits.' : 'What a plan pays for each procedure category.'}
      onClose={onClose}
      width="max-w-[560px]"
      steps={pasos}
      step={paso}
      actions={<DrawerActions step={paso} total={pasos.length} onNext={avanzar} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <TextField
            label="Name" required placeholder="e.g. PPO Standard 100/80/50" value={d.nombre} onChange={set('nombre')}
            error={falta('nombre') ?? (repetido ? 'A coverage table with this name already exists.' : undefined)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {!editando && (
              <SelectField
                label="Start From" required placeholder="Template or table"
                options={[...PLANTILLAS.map((p) => p.nombre), ...coberturas.map((t) => `${COPIA}${t.nombre}`)]}
                value={d.base} onChange={elegirBase} error={falta('base')}
                hint={tablaBase ? 'Copies its limits and every category rule.' : undefined}
              />
            )}
            <SelectField label="Benefit Period" required options={[...PERIODOS]} value={d.periodo} onChange={set('periodo')} error={falta('periodo')} hint="When the maximum and the deductible start over." />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Maximums" description="Per person, for each benefit period.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Annual Maximum ($)" required placeholder="1500" value={d.maximo} onChange={set('maximo')} error={monto('maximo')} hint="0 means no maximum." />
            <TextField label="Orthodontic Lifetime Maximum ($)" placeholder="0" value={d.maximoOrto} onChange={set('maximoOrto')} error={monto('maximoOrto')} hint="0 if orthodontics is not covered." />
          </div>
        </DrawerSection>
        <DrawerSection title="Deductibles" description="What the patient pays before the plan starts paying.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Individual Deductible ($)" required placeholder="50" value={d.deducible} onChange={set('deducible')} error={monto('deducible')} />
            <TextField label="Family Deductible ($)" placeholder="150" value={d.familia} onChange={set('familia')} error={monto('familia')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      {!editando && (
        <DrawerStep index={2} step={paso}>
          <DrawerSection title="Coverage by Class" description="Each class sets all the categories in it. You can fine-tune one category later.">
            <div className="grid gap-4 sm:grid-cols-2">
              {CLASES_EDITABLES.map((c) => (
                <TextField key={c.campo} label={c.label} required placeholder="0" value={d[c.campo]} onChange={set(c.campo)} error={porcentaje(c.campo)} hint={c.ayuda} />
              ))}
            </div>
          </DrawerSection>
        </DrawerStep>
      )}
    </ModalShell>
  )
}

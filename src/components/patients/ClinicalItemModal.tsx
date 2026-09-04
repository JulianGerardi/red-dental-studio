import { useState } from 'react'
import {
  ModalShell, FormFooter, SearchField, SelectField, TextField, DateTextField, TextArea,
} from '@/components/patients/form'
import {
  CONFIG, aItem,
  type Campo, type Categoria, type ClinicalItem,
} from '@/data/clinicalItems'
import { aviso } from '@/components/ui/toaster'

/* Figma 3648:59976 (Medical Condition), 3648:60265 (Allergy),
   3648:61266 (Past Surgery) y 3648:62265 (Medication).
   Los cuatro comparten cuerpo: 555 de ancho, campos en dos columnas y
   Cancel/Save abajo a la derecha. Cambia sólo la lista de campos, que sale
   de CONFIG en src/data/clinicalItems.ts.

   El Figma no diseña la variante de edición: la agrega el prototipo, con el
   mismo formulario precargado y el título "Edit …". */
export function ClinicalItemModal({
  categoria,
  item,
  onGuardar,
  onClose,
}: {
  categoria: Categoria
  /** Si viene, el modal edita ese ítem en vez de crear uno. */
  item?: ClinicalItem
  onGuardar: (it: ClinicalItem) => void
  onClose: () => void
}) {
  const cfg = CONFIG[categoria]
  const [v, setV] = useState<Record<string, string>>(item?.campos ?? {})
  const [intentado, setIntentado] = useState(false)
  const set = (k: string) => (valor: string) => setV((p) => ({ ...p, [k]: valor }))

  const obligatorios = cfg.campos.filter((c) => 'req' in c && c.req).map((c) => (c as { key: string }).key)
  const req = (k: string) => (intentado && !(v[k] ?? '').trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    /* Sin toast cuando falta algo: el aviso va en el campo. */
    if (obligatorios.some((k) => !(v[k] ?? '').trim())) return
    const guardado = aItem(categoria, v, item?.id)
    onGuardar(guardado)
    aviso.ok(
      item
        ? `${guardado.name} was updated.`
        : `${guardado.name} was added to ${categoria}.`,
    )
    onClose()
  }

  const render = (c: Campo, i: number) => {
    switch (c.tipo) {
      case 'titulo':
        return (
          <h3 key={i} className="mt-2 text-sm font-bold text-[#09090b] sm:col-span-2">
            {c.label}
          </h3>
        )
      case 'buscador':
        return (
          <SearchField
            key={c.key} className="sm:col-span-2" label={c.label} required={c.req}
            options={c.opciones} value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'select':
        return (
          <SelectField
            key={c.key} label={c.label} required={c.req} options={c.opciones}
            className={c.ancho === 'full' ? 'sm:col-span-2' : undefined}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      /* La unidad de Strenght y de Dose no lleva label propio en el Figma:
         se apoya en el label del campo de al lado. */
      case 'unidad':
        return (
          <SelectField
            key={c.key} label={'\u00A0'} options={c.opciones}
            value={v[c.key] ?? ''} onChange={set(c.key)}
          />
        )
      case 'texto':
        return (
          <TextField
            key={c.key} label={c.label} required={c.req} placeholder={c.ph}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'fecha':
        return (
          <DateTextField
            key={c.key} label={c.label} required={c.req}
            className={c.ancho === 'full' ? 'sm:col-span-2' : undefined}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'notas':
        return (
          <TextArea
            key={c.key} className="sm:col-span-2" label={c.label} required={c.req} placeholder={c.ph}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
    }
  }

  return (
    <ModalShell
      title={item ? `Edit ${cfg.singular}` : cfg.titulo}
      onClose={onClose}
      width="max-w-[555px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {cfg.campos.map(render)}
      </div>
    </ModalShell>
  )
}

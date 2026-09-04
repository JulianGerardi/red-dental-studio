import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Maximize2, Minimize2, TriangleAlert, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { Odontogram } from '@/components/clinical/Odontogram'
import { makeMockExam } from '@/data/odontogram'
import { ClinicalTopBar } from '@/components/clinical/ClinicalTopBar'
import { ClinicalToolbar } from '@/components/clinical/ClinicalToolbar'
import { TreatmentPlanList } from '@/components/clinical/TreatmentPlanList'
import { ProblemList } from '@/components/clinical/ProblemList'
import { VitalsPanel } from '@/components/clinical/VitalsPanel'
import { LabOrderPanel } from '@/components/clinical/LabOrderPanel'
import { RadiographyPanel } from '@/components/clinical/RadiographyPanel'
import { TreatmentPlanSection } from '@/components/clinical/TreatmentPlanSection'
import { ULTIMA_CONDICION, type Pestana, type Juego } from '@/data/clinical-mode'
import { PATIENTS } from '@/data/mock'

/* Clinical Mode — Figma 4235:135661 (barra, botonera y overview),
   4265:56662 (botonera de registros), 4106:205304 (Vitals),
   4070:148911 (Lab Order).

   Es un takeover: no usa el shell de la app —ni rail ni header—, porque la
   pantalla se ocupa entera con el paciente que se está atendiendo. La única
   salida es "Exit clinical Mode".

   Desviación anotada: el frame pone en el centro un **render 3D** de la boca,
   que es una imagen. Acá va el odontograma que ya tiene el sistema —32 piezas
   por 7 superficies—: dice lo mismo, se puede operar y es un componente
   nuestro, no una foto. Ver modulos/clinical-mode.md. */

export default function ClinicalMode() {
  const { id } = useParams()
  const patient = PATIENTS.find((p) => p.id === id) ?? PATIENTS[0]
  /* Overwiev no es una pestaña más: es el estado inicial y el botón de la
     barra vuelve acá desde cualquier examen o registro. */
  const [enOverview, setEnOverview] = useState(true)
  const [juego, setJuego] = useState<Juego>('Exams')
  const [pestana, setPestana] = useState<Pestana>('Vitals')
  const [encuentro, setEncuentro] = useState(false)
  const [ampliado, setAmpliado] = useState(false)

  const [exam, setExam] = useState(makeMockExam)
  const [seleccion, setSeleccion] = useState<number[]>([ULTIMA_CONDICION.pieza])

  const alternarPieza = (n: number) =>
    setSeleccion((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))

  const pintarSuperficie = (n: number, i: number) =>
    setExam((e) => ({
      ...e,
      teeth: e.teeth.map((t) =>
        t.number === n
          ? { ...t, surfaces: t.surfaces.map((c, j) => (j === i ? (c ? '' : '#fe0000') : c)) }
          : t,
      ),
    }))

  const irA = (p: Pestana) => { setPestana(p); setEnOverview(false) }

  const modelo = (
    <div className="relative overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
      {/* Fondo punteado: es el del frame y da la sensación de mesa de trabajo. */}
      <div
        className="overflow-x-auto p-4 pb-16"
        style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fbfefc' }}
      >
        <div className={cn('mx-auto', ampliado ? 'min-w-[900px]' : 'min-w-[720px] max-w-[900px]')}>
          <Odontogram exam={exam} selected={seleccion} onToggle={alternarPieza} onSurface={pintarSuperficie} />
        </div>
      </div>

      <button
        onClick={() => setAmpliado((v) => !v)}
        aria-label={ampliado ? 'Collapse chart' : 'Expand chart'}
        aria-pressed={ampliado}
        className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg border border-[#e4e4e7] bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]"
      >
        {ampliado ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
      </button>

      <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-[#e4e4e7] bg-white/95 px-3 py-2 shadow-[0_4px_14px_rgb(0_0_0/0.1)] backdrop-blur-sm sm:left-auto">
        <span className="flex min-w-0 items-center gap-2">
          <TriangleAlert className="size-4 shrink-0 text-[#99660d]" />
          <span className="truncate text-[13px] font-semibold text-[#09090b]">
            Last Condition: {ULTIMA_CONDICION.condicion}
          </span>
        </span>
        <span className="text-[11px] text-[#71717a]">Last Update: {ULTIMA_CONDICION.actualizado}</span>
        <button
          onClick={() => {
            setSeleccion([ULTIMA_CONDICION.pieza])
            aviso.info(`Tooth ${ULTIMA_CONDICION.pieza} selected on the chart.`)
          }}
          className="bg-dash-blue hover:bg-dash-blue-hover ml-auto shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
        >
          Show details
        </button>
      </div>
    </div>
  )

  const overview = (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* 360 y no 300: con 300 las tres cajas de datos del plan no entraban en
          una línea y "Total Procedures" se partía en dos. Medido: la etiqueta
          más larga pide 72px y con 360 la caja da 80. */}
      {!ampliado && (
        <div className="shrink-0 lg:w-[360px]">
          <TreatmentPlanList />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {modelo}
        {!ampliado && <ProblemList />}
      </div>
    </div>
  )

  const contenido = enOverview
    ? overview
    : pestana === 'Vitals'
      ? <VitalsPanel />
      : pestana === 'Lab Order'
        ? <LabOrderPanel />
        : pestana === 'Radiography'
          ? <RadiographyPanel />
          : pestana === 'Treatment Plan'
            ? <TreatmentPlanSection />
            : (
          <div className="rounded-xl border border-[#e4e4e7] bg-white">
            <EmptyState
              icon={Stethoscope}
              title={pestana}
              detail={`This ${juego === 'Exams' ? 'exam' : 'section'} is part of Clinical Mode and is being built from its own Figma board.`}
              pill="Planned"
              className="py-16"
            />
          </div>
        )

  return (
        /* Sin tope de ancho: en pantallas grandes el contenido —las tablas, el
       odontograma— usa todo lo que hay. El padding lateral sube a 48 en
       desktop: con 85 sobraba aire y con 30 quedaba pegado al borde.

       Las dos barras llegan al borde derecho repartiendo el sobrante en sus
       huecos: ningún botón cambia de tamaño y la estructura aguanta a cualquier
       ancho. El tope de 1440 existe por eso mismo: sin él, a 1920 los huecos de
       la botonera se van a 90px y la fila se desarma. */
    <div className="min-h-svh bg-[#fafbfe] p-4 sm:p-[30px] lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
      <ClinicalTopBar
        volverA={`/patients/${patient.id}`}
        encuentro={encuentro}
        onEncuentro={() => {
          setEncuentro((v) => !v)
          aviso.ok(encuentro ? 'Encounter paused.' : 'Encounter started.')
        }}
        onOverview={() => setEnOverview(true)}
        enOverview={enOverview}
      />

      <div className="mt-4">
        <ClinicalToolbar
          juego={juego}
          onJuego={setJuego}
          pestana={enOverview ? ('' as Pestana) : pestana}
          onPestana={irA}
        />
      </div>

      <div className="mt-4 flex gap-4">
        <div className="min-w-0 flex-1">{contenido}</div>
      </div>
      </div>
    </div>
  )
}

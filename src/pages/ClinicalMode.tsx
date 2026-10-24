import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { OdontogramaOverview } from '@/components/clinical/OdontogramaOverview'
import { ClinicalTopBar } from '@/components/clinical/ClinicalTopBar'
import { ClinicalToolbar } from '@/components/clinical/ClinicalToolbar'
import { DentalAssessmentExam } from '@/components/clinical/DentalAssessmentExam'
import { ExtraOralExam } from '@/components/clinical/ExtraOralExam'
import { TreatmentPlanList } from '@/components/clinical/TreatmentPlanList'
import { ProblemList } from '@/components/clinical/ProblemList'
import { NavegacionClinica, examenDePestana, type DestinoClinico } from '@/components/clinical/RecordDetail'
import { VitalsPanel } from '@/components/clinical/VitalsPanel'
import { LabOrderPanel } from '@/components/clinical/LabOrderPanel'
import { RadiographyPanel } from '@/components/clinical/RadiographyPanel'
import { TreatmentPlanSection } from '@/components/clinical/TreatmentPlanSection'
import { TreatmentPanel } from '@/components/clinical/TreatmentPanel'
import { WorkflowsProvider } from '@/components/clinical/WorkflowsContext'
import { ExamFindingsProvider, ExamLayout } from '@/components/clinical/ExamLayout'
import { EXAMENES, type Pestana } from '@/data/clinical-mode'
import { PATIENTS } from '@/data/mock'

/* Clinical Mode — Figma 4235:135661 (barra, botonera y overview),
   4265:56662 (botonera de registros), 4106:205304 (Vitals),
   4070:148911 (Lab Order).

   Es un takeover: no usa el shell de la app —ni rail ni header—, porque la
   pantalla se ocupa entera con el paciente que se está atendiendo. La única
   salida es "Exit clinical Mode".

   Desviación anotada: el frame pone en el centro un **render 3D** de la boca,
   que es una imagen. Acá va el odontograma de DentAssmt, de sólo lectura y con
   la última condición resaltada (2026-10-18). Ver modulos/clinical-mode.md. */

export default function ClinicalMode() {
  const { id } = useParams()
  /* Desde el detalle de una fila del Ledger: ?case= abre ese caso en Treatment Plan y ?procedure= esa fila de Procedures
     en el Overview (ledger.md, 2026-10-14). */
  const [busqueda] = useSearchParams()
  const casoPedido = busqueda.get('case') ?? undefined
  const procedimientoPedido = busqueda.get('procedure') ?? undefined
  const patient = PATIENTS.find((p) => p.id === id) ?? PATIENTS[0]
  /* Overwiev no es una pestaña más: es el estado inicial y el botón de la
     barra vuelve acá desde cualquier examen o registro. */
  const [enOverview, setEnOverview] = useState(!casoPedido)
  const [pestana, setPestana] = useState<Pestana>(casoPedido ? 'Treatment Plan' : 'Vitals')
  const [encuentro, setEncuentro] = useState(false)
  const [ampliado, setAmpliado] = useState(false)
  /* El caso que se abrió desde una card del Overview; sin caso, Treatment Plan entra por Unassigned. */
  const [casoAbierto, setCasoAbierto] = useState<string | undefined>(casoPedido)

  const irA = (p: Pestana) => { setPestana(p); setEnOverview(false) }
  /* Los links del detalle de la Problem List: la pestaña y, para Treatment Plan, el caso. */
  const ir = ({ pestana: p, caso }: DestinoClinico) => { if (caso) setCasoAbierto(caso); irA(p) }

  const overview = (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* 360 y no 300: con 300 las tres cajas de datos del plan no entraban en
          una línea y "Total Procedures" se partía en dos. Medido: la etiqueta
          más larga pide 72px y con 360 la caja da 80. En desktop llega hasta
          el final de la tabla sin estirar la fila: el alto lo marca la columna
          de al lado (2026-10-18). */}
      {!ampliado && (
        <div className="relative shrink-0 lg:w-[360px]">
          <TreatmentPlanList llena onAbrir={(id) => { setCasoAbierto(id); irA('Treatment Plan') }} />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <OdontogramaOverview ampliado={ampliado} onAmpliar={() => setAmpliado((v) => !v)} onDetalle={irA} />
        {!ampliado && <ProblemList procedimientoInicial={procedimientoPedido} />}
      </div>
    </div>
  )

  /* Todos los exámenes llevan las acciones y el panel de Findings (ExamLayout); Vitals sólo las acciones, y Radiography
     también, porque sus findings ya viven en el visor de cada placa. Los registros (Treatment Plan…) no. */
  const esExamen = (EXAMENES as readonly string[]).includes(pestana)
  const enConstruccion = (
    <div className="rounded-lg bg-white shadow-panel">
      <EmptyState
        icon={Stethoscope}
        title={pestana}
        detail={`This ${esExamen ? 'exam' : 'section'} is part of Clinical Mode and is being built from its own Figma board.`}
        pill="Planned"
        className="py-16"
      />
    </div>
  )
  const contenido = enOverview
    ? overview
    : pestana === 'Vitals'
      ? <ExamLayout findings={false}><VitalsPanel /></ExamLayout>
      : pestana === 'Lab Order'
        ? <LabOrderPanel />
        : pestana === 'Radiography'
          ? <RadiographyPanel />
          : pestana === 'Treatment Plan'
            ? <TreatmentPlanSection key={casoAbierto ?? 'todos'} casoInicial={casoAbierto} />
            : pestana === 'Treatment'
            ? <TreatmentPanel onTreatmentPlan={() => irA('Treatment Plan')} />
            : pestana === 'DentAssmt'
              ? <DentalAssessmentExam />
              : pestana === 'Extra Oral'
                ? <ExtraOralExam />
                : esExamen
                  ? <ExamLayout examen={examenDePestana(pestana)}>{enConstruccion}</ExamLayout>
                  : enConstruccion

  return (
        /* Sin tope de ancho: en pantallas grandes el contenido —las tablas, el
       odontograma— usa todo lo que hay. El padding lateral sube a 48 en
       desktop: con 85 sobraba aire y con 30 quedaba pegado al borde.

       Las dos barras llegan al borde derecho repartiendo el sobrante en sus
       huecos: ningún botón cambia de tamaño y la estructura aguanta a cualquier
       ancho. El tope de 1440 existe por eso mismo: sin él, a 1920 los huecos de
       la botonera se van a 90px y la fila se desarma.

       El fondo había quedado en blanco por un pedido anterior de Julián;
       ahora pidió volver al #fafbfe del resto de las pantallas -mismo token
       `bg-page-background` que usa AppShell, definido en :root así que
       funciona igual en este take-over sin shell-. */
    <WorkflowsProvider onAbrir={() => irA('Treatment')}>
    <NavegacionClinica.Provider value={ir}>
    <div className="bg-page-background min-h-svh p-4 sm:p-[30px] lg:px-12">
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
          pestana={enOverview ? ('' as Pestana) : pestana}
          onPestana={irA}
        />
      </div>

      {/* Los findings son del paciente: el provider queda montado al cambiar de examen y los conserva. */}
      <ExamFindingsProvider>
        <div className="mt-4 flex gap-4">
          <div className="min-w-0 flex-1">{contenido}</div>
        </div>
      </ExamFindingsProvider>
      </div>
    </div>
    </NavegacionClinica.Provider>
    </WorkflowsProvider>
  )
}

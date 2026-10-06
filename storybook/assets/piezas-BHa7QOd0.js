import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{l as n,r as ee}from"./chunk-62JRHF6Z-W7Abf350.js";import{n as r,t as i}from"./utils-D-bRdWGo.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{n as o,t as s}from"./switch-CzlWg6Pb.js";import{n as c,t as l}from"./calendar-days-aAv0FTpR.js";import{n as u,t as te}from"./calendar-range-CNufQ_2M.js";import{n as ne,t as d}from"./chevron-right-DkeuRWth.js";import{i as re,t as ie}from"./date-picker-hEqgrQfM.js";import{a as ae,n as oe,r as se,t as ce}from"./data-table-B1R15St_.js";import{n as f,t as p}from"./users-DciDZrSY.js";import{i as m,r as h}from"./button-R5lrVQ2-.js";import{h as g,m as _}from"./form-DbWcbLtu.js";import{n as v,t as y}from"./TurnoCalendario-CPjSEj84.js";import{i as b,r as x}from"./pill-Qo___yxt.js";import{n as S,t as C}from"./checkbox-BR_MOntE.js";import{n as w,t as T}from"./empty-state-yo-tjb-R.js";import{n as E,r as D,t as O}from"./avatar-6AYQWGxS.js";import{$t as k,Ft as A,It as j,Kl as M,Mt as N,Qt as P,Zt as F,_t as le,an as I,dl as L,dn as R,en as z,it as B,jt as V,ln as H,nu as U,on as W,ql as ue,rt as de,ru as fe,sn as pe,ul as me,un as G,xt as he}from"./iframe-BxurYdYB.js";function K({pieza:e,id:t}){let n=(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`div`,{inert:!0,className:i(`ds-muestra pointer-events-none relative flex h-[180px] justify-center overflow-hidden rounded-lg bg-surface-subtle p-4`,e.arriba?`items-start after:absolute after:inset-x-0 after:bottom-0 after:h-12 after:bg-gradient-to-t after:from-surface-subtle after:to-transparent`:`items-center`),children:e.muestra}),t?(0,Y.jsx)(me,{id:t,className:`mt-4 text-[20px] leading-tight font-semibold text-ink no-underline after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none`,children:e.titulo}):(0,Y.jsx)(`span`,{className:`mt-4 text-[20px] leading-tight font-semibold text-ink`,children:e.titulo}),(0,Y.jsx)(`span`,{className:`mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted`,children:e.que}),(0,Y.jsxs)(`span`,{className:`mt-4 inline-flex items-center gap-0.5 text-[14px] font-medium text-dash-blue`,children:[`Learn more `,(0,Y.jsx)(d,{className:`size-4 transition-transform group-hover:translate-x-0.5`,"aria-hidden":!0})]})]});return(0,Y.jsx)(`div`,{className:i(`group relative flex min-w-0 flex-col rounded-xl border border-line bg-white p-4 transition-colors hover:border-ink-faint`,`has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-dash-blue`,e.ancho===2&&`sm:col-span-2`),children:n})}function q({indice:e,piezas:t=Q,inicial:n=7}){let[r,a]=(0,J.useState)(!1),o=t=>e?.find(e=>e.titulo===t.titulo&&e.seccion===t.seccion)?.id,s=r?t:t.slice(0,n);return(0,Y.jsx)(ee,{children:(0,Y.jsxs)(`div`,{className:`flex flex-col items-center gap-6`,children:[(0,Y.jsx)(`div`,{className:`grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4`,children:s.map(e=>(0,Y.jsx)(K,{pieza:e,id:o(e)},e.titulo))}),t.length>n&&(0,Y.jsxs)(`button`,{type:`button`,onClick:()=>a(e=>!e),"aria-expanded":r,className:`inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink transition-colors hover:bg-surface-muted`,children:[r?`View less`:`View more (${t.length-n})`,(0,Y.jsx)(d,{className:i(`size-4 transition-transform`,r?`-rotate-90`:`rotate-90`),"aria-hidden":!0})]})]})})}var J,Y,X,Z,Q;function $(){return($=e((()=>{J=t(),n(),c(),u(),ne(),fe(),ue(),f(),m(),b(),P(),ae(),R(),o(),S(),re(),D(),w(),B(),g(),N(),j(),z(),he(),v(),r(),L(),Y=a(),X=[{id:`1`,nombre:`Maria Abril Viola`,ini:`MV`,estado:`Active`,saldo:120},{id:`2`,nombre:`Noah James Smith`,ini:`NS`,estado:`Active`,saldo:0},{id:`3`,nombre:`Elias Aguirre`,ini:`EA`,estado:`Inactive`,saldo:48.5}],Z=[M,p,te,U],Q=[{titulo:`Buttons`,seccion:`Elements`,que:`Cinco variantes y tres tamaños para toda acción.`,muestra:(0,Y.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-2`,children:[(0,Y.jsx)(h,{children:`Save`}),(0,Y.jsx)(h,{variant:`secondary`,children:`Cancel`}),(0,Y.jsx)(h,{variant:`destructive`,children:`Delete`})]})},{titulo:`Fields`,seccion:`Elements`,que:`Texto, selección, fecha y búsqueda, con error y ayuda.`,muestra:(0,Y.jsx)(_,{label:`Patient name`,value:`Maria Abril Viola`,onChange:()=>{},className:`w-[230px]`})},{titulo:`Tables`,seccion:`Elements`,que:`Buscar, filtrar, ordenar y achicar columnas, como en el Ledger.`,ancho:2,arriba:!0,muestra:(0,Y.jsx)(`div`,{className:`w-[460px] max-w-full`,children:(0,Y.jsx)(oe,{rows:X,rowKey:e=>e.id,pageSize:3,columns:[{key:`p`,header:`Patient`,cell:e=>(0,Y.jsx)(se,{name:e.nombre,initials:e.ini})},{key:`e`,header:`Status`,width:110,cell:e=>(0,Y.jsx)(x,{tone:e.estado===`Active`?`success`:`neutral`,size:`sm`,children:e.estado})},{key:`s`,header:`Balance`,width:100,align:`right`,cell:e=>(0,Y.jsx)(ce,{value:e.saldo})}]})})},{titulo:`Tabs`,seccion:`Elements`,que:`Cambiar de vista dentro de un mismo bloque.`,muestra:(0,Y.jsx)(F,{tabs:[`Findings`,`Diagnostics`],value:`Findings`,onChange:()=>{},"aria-label":`Example`})},{titulo:`Pills`,seccion:`Elements`,que:`El estado de algo, con seis tonos para toda la app.`,muestra:(0,Y.jsxs)(`div`,{className:`flex max-w-[220px] flex-wrap justify-center gap-1.5`,children:[(0,Y.jsx)(x,{tone:`success`,children:`Active`}),(0,Y.jsx)(x,{tone:`info`,children:`Booked`}),(0,Y.jsx)(x,{tone:`warning`,children:`No Show`}),(0,Y.jsx)(x,{tone:`danger`,children:`Overdue`}),(0,Y.jsx)(x,{tone:`purple`,children:`In progress`})]})},{titulo:`Appointment cards`,seccion:`Elements`,que:`Un turno en el Dashboard, Patients, el paciente y la agenda.`,muestra:(0,Y.jsxs)(`div`,{className:`flex w-[240px] flex-col gap-2`,children:[(0,Y.jsx)(le,{appt:{name:`Noah James`,initials:`NJ`,provider:`Dr. Elena Martinez`,operatory:`Operatory 2`,time:`10:00`},compact:!0}),(0,Y.jsx)(y,{evento:{start:10.5,patient:`Maria Abril Viola`,state:`Check-in`},forma:`chip`})]})},{titulo:`Patient menu`,seccion:`Elements`,que:`El panel de la ficha del paciente: secciones, encuentro y datos.`,arriba:!0,muestra:(0,Y.jsx)(`div`,{className:`w-[218px] origin-top scale-[0.62]`,children:(0,Y.jsx)(A.Provider,{value:{collapsed:!1,encounter:`start`},children:(0,Y.jsx)(V,{name:`John Smith`,initials:`JS`,section:`Overview`,basePath:`/patients/john-smith`})})})},{titulo:`Colors`,seccion:`Foundations`,que:`Los tokens de color, leídos de index.css.`,muestra:(0,Y.jsx)(`div`,{className:`grid grid-cols-4 gap-2`,children:[`bg-dash-blue`,`bg-ink`,`bg-green`,`bg-amber`,`bg-dash-bad-fg`,`bg-purple-fg`,`bg-brand-tint`,`bg-surface-slate`].map(e=>(0,Y.jsx)(`span`,{className:i(`size-9 rounded-lg ring-1 ring-black/5`,e)},e))})},{titulo:`Page header`,seccion:`Elements`,que:`Rastro, título, bajada y la acción principal de cada pantalla.`,muestra:(0,Y.jsxs)(`div`,{className:`flex w-[300px] flex-col gap-3`,children:[(0,Y.jsx)(de,{items:[{label:`Settings`,to:`/settings`},{label:`Accounts`}]}),(0,Y.jsx)(k,{titulo:`Accounts`,bajada:`Who can use Confidentally.`,accion:(0,Y.jsx)(h,{size:`sm`,children:`Add`})})]})},{titulo:`Cards`,seccion:`Elements`,que:`La caja que agrupa un bloque de información.`,muestra:(0,Y.jsxs)(I,{className:`w-[240px]`,children:[(0,Y.jsx)(H,{children:(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(G,{children:`Clinic hours`}),(0,Y.jsx)(pe,{children:`When patients can book.`})]})}),(0,Y.jsx)(W,{className:`text-[13px] text-ink-medium`,children:`Mon – Fri · 8:00 – 18:00`})]})},{titulo:`Navigation`,seccion:`Elements`,que:`El menú lateral de la app: colapsado, expandido y su tooltip.`,muestra:(0,Y.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,Y.jsx)(`div`,{className:`flex flex-col items-center gap-1 rounded-xl border border-line bg-surface-subtle p-1.5`,children:Z.map((e,t)=>(0,Y.jsx)(`span`,{className:i(`flex size-7 items-center justify-center rounded-md`,t===2?`bg-dash-blue text-white`:`text-ink-medium`),children:(0,Y.jsx)(e,{className:`size-4`})},t))}),(0,Y.jsx)(`span`,{className:`rounded-md bg-ink px-2 py-1 text-[12px] font-medium text-white`,children:`Scheduling`})]})},{titulo:`Typography`,seccion:`Foundations`,que:`La escala de texto de la app, en Inter.`,muestra:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,Y.jsx)(`span`,{className:`text-[34px] leading-none font-bold text-ink`,children:`Aa`}),(0,Y.jsx)(`span`,{className:`text-2xl font-bold text-ink`,children:`Heading 24`}),(0,Y.jsx)(`span`,{className:`text-sm text-ink`,children:`Body 14 · Regular`}),(0,Y.jsx)(`span`,{className:`text-xs text-ink-muted`,children:`Caption 12`})]})},{titulo:`Radius and shadows`,seccion:`Foundations`,que:`Las esquinas y sombras de cards, paneles y menús.`,muestra:(0,Y.jsxs)(`div`,{className:`flex items-end gap-3`,children:[(0,Y.jsx)(`span`,{className:`size-14 rounded-md border border-line bg-white`}),(0,Y.jsx)(`span`,{className:`shadow-inner-card size-14 rounded-lg bg-white`}),(0,Y.jsx)(`span`,{className:`shadow-panel size-14 rounded-xl bg-white`})]})},{titulo:`Switch`,seccion:`Components`,que:`Prender o apagar una opción, con efecto inmediato.`,muestra:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-3 text-[13px] text-ink`,children:[(0,Y.jsxs)(`span`,{className:`flex items-center gap-3`,children:[(0,Y.jsx)(s,{defaultChecked:!0,"aria-label":`Reminders`}),` Send reminders`]}),(0,Y.jsxs)(`span`,{className:`flex items-center gap-3`,children:[(0,Y.jsx)(s,{"aria-label":`Online booking`}),` Online booking`]})]})},{titulo:`Checkbox`,seccion:`Components`,que:`Elegir una o varias opciones de una lista.`,muestra:(0,Y.jsxs)(`div`,{className:`flex flex-col gap-2.5 text-[13px] text-ink`,children:[(0,Y.jsxs)(`span`,{className:`flex items-center gap-2.5`,children:[(0,Y.jsx)(C,{on:!0,onChange:()=>{},label:`Allergies`}),` Allergies`]}),(0,Y.jsxs)(`span`,{className:`flex items-center gap-2.5`,children:[(0,Y.jsx)(C,{on:!1,onChange:()=>{},label:`Diabetes`}),` Diabetes`]}),(0,Y.jsxs)(`span`,{className:`flex items-center gap-2.5`,children:[(0,Y.jsx)(C,{on:!0,onChange:()=>{},label:`Smoker`}),` Smoker`]})]})},{titulo:`DatePicker`,seccion:`Components`,que:`Elegir una fecha con el calendario.`,muestra:(0,Y.jsx)(ie,{value:new Date(2025,2,12),onChange:()=>{}})},{titulo:`Avatar`,seccion:`Components`,que:`La foto o las iniciales de un paciente o del equipo.`,muestra:(0,Y.jsx)(`div`,{className:`flex -space-x-2`,children:[[`MV`,`bg-dash-blue`],[`NS`,`bg-dash-blue-hover`],[`EA`,`bg-green`],[`JS`,`bg-ink`]].map(([e,t])=>(0,Y.jsx)(O,{className:`size-11 ring-2 ring-white`,children:(0,Y.jsx)(E,{className:i(`text-[13px] font-semibold text-white`,t),children:e})},e))})},{titulo:`EmptyState`,seccion:`Components`,que:`Lo que se ve cuando todavía no hay nada.`,muestra:(0,Y.jsx)(`div`,{className:`w-[260px] origin-center scale-90`,children:(0,Y.jsx)(T,{icon:l,title:`No appointments today`,detail:`Your schedule is clear.`})})}],K.__docgenInfo={description:``,methods:[],displayName:`TarjetaPieza`,props:{pieza:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{ titulo: string; seccion: Seccion; que: string; ancho?: 2; arriba?: boolean; muestra: ReactNode }`,signature:{properties:[{key:`titulo`,value:{name:`string`,required:!0}},{key:`seccion`,value:{name:`union`,raw:`'Foundations' | 'Elements' | 'Components' | 'Pages' | 'Audit' | 'Builder'`,elements:[{name:`literal`,value:`'Foundations'`},{name:`literal`,value:`'Elements'`},{name:`literal`,value:`'Components'`},{name:`literal`,value:`'Pages'`},{name:`literal`,value:`'Audit'`},{name:`literal`,value:`'Builder'`}],required:!0}},{key:`que`,value:{name:`string`,required:!0}},{key:`ancho`,value:{name:`literal`,value:`2`,required:!1}},{key:`arriba`,value:{name:`boolean`,required:!1}},{key:`muestra`,value:{name:`ReactNode`,required:!0}}]}},description:``},id:{required:!1,tsType:{name:`string`},description:``}}},q.__docgenInfo={description:``,methods:[],displayName:`Vitrina`,props:{indice:{required:!0,tsType:{name:`union`,raw:`Pagina[] | null`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  titulo: string
  seccion: Seccion
  /** Módulo o grupo: Dashboard, Scheduling, Screens… */
  grupo: string
  descripcion: string
  /** Sus ejemplos (stories), con el id de cada uno. */
  ejemplos: { nombre: string; id: string }[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`titulo`,value:{name:`string`,required:!0}},{key:`seccion`,value:{name:`union`,raw:`'Foundations' | 'Elements' | 'Components' | 'Pages' | 'Audit' | 'Builder'`,elements:[{name:`literal`,value:`'Foundations'`},{name:`literal`,value:`'Elements'`},{name:`literal`,value:`'Components'`},{name:`literal`,value:`'Pages'`},{name:`literal`,value:`'Audit'`},{name:`literal`,value:`'Builder'`}],required:!0}},{key:`grupo`,value:{name:`string`,required:!0},description:`Módulo o grupo: Dashboard, Scheduling, Screens…`},{key:`descripcion`,value:{name:`string`,required:!0}},{key:`ejemplos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ nombre: string; id: string }`,signature:{properties:[{key:`nombre`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`string`,required:!0}}]}}],raw:`{ nombre: string; id: string }[]`,required:!0},description:`Sus ejemplos (stories), con el id de cada uno.`}]}}],raw:`Pagina[]`},{name:`null`}]},description:``},piezas:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ titulo: string; seccion: Seccion; que: string; ancho?: 2; arriba?: boolean; muestra: ReactNode }`,signature:{properties:[{key:`titulo`,value:{name:`string`,required:!0}},{key:`seccion`,value:{name:`union`,raw:`'Foundations' | 'Elements' | 'Components' | 'Pages' | 'Audit' | 'Builder'`,elements:[{name:`literal`,value:`'Foundations'`},{name:`literal`,value:`'Elements'`},{name:`literal`,value:`'Components'`},{name:`literal`,value:`'Pages'`},{name:`literal`,value:`'Audit'`},{name:`literal`,value:`'Builder'`}],required:!0}},{key:`que`,value:{name:`string`,required:!0}},{key:`ancho`,value:{name:`literal`,value:`2`,required:!1}},{key:`arriba`,value:{name:`boolean`,required:!1}},{key:`muestra`,value:{name:`ReactNode`,required:!0}}]}}],raw:`Pieza[]`},description:``,defaultValue:{value:`[
  {
    titulo: 'Buttons', seccion: 'Elements', que: 'Cinco variantes y tres tamaños para toda acción.',
    muestra: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
  {
    titulo: 'Fields', seccion: 'Elements', que: 'Texto, selección, fecha y búsqueda, con error y ayuda.',
    muestra: <TextField label="Patient name" value="Maria Abril Viola" onChange={() => {}} className="w-[230px]" />,
  },
  {
    titulo: 'Tables', seccion: 'Elements', que: 'Buscar, filtrar, ordenar y achicar columnas, como en el Ledger.', ancho: 2, arriba: true,
    muestra: (
      <div className="w-[460px] max-w-full">
        <DataTable
          rows={FILAS}
          rowKey={(f) => f.id}
          pageSize={3}
          columns={[
            { key: 'p', header: 'Patient', cell: (f) => <PersonCell name={f.nombre} initials={f.ini} /> },
            { key: 'e', header: 'Status', width: 110, cell: (f) => <Pill tone={f.estado === 'Active' ? 'success' : 'neutral'} size="sm">{f.estado}</Pill> },
            { key: 's', header: 'Balance', width: 100, align: 'right', cell: (f) => <AmountCell value={f.saldo} /> },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: 'Tabs', seccion: 'Elements', que: 'Cambiar de vista dentro de un mismo bloque.',
    muestra: <Tabs tabs={['Findings', 'Diagnostics']} value="Findings" onChange={() => {}} aria-label="Example" />,
  },
  {
    titulo: 'Pills', seccion: 'Elements', que: 'El estado de algo, con seis tonos para toda la app.',
    muestra: (
      <div className="flex max-w-[220px] flex-wrap justify-center gap-1.5">
        <Pill tone="success">Active</Pill>
        <Pill tone="info">Booked</Pill>
        <Pill tone="warning">No Show</Pill>
        <Pill tone="danger">Overdue</Pill>
        <Pill tone="purple">In progress</Pill>
      </div>
    ),
  },
  {
    titulo: 'Appointment cards', seccion: 'Elements', que: 'Un turno en el Dashboard, Patients, el paciente y la agenda.',
    muestra: (
      <div className="flex w-[240px] flex-col gap-2">
        <AppointmentCard appt={{ name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' }} compact />
        <TurnoCalendario evento={{ start: 10.5, patient: 'Maria Abril Viola', state: 'Check-in' }} forma="chip" />
      </div>
    ),
  },
  {
    titulo: 'Patient menu', seccion: 'Elements', que: 'El panel de la ficha del paciente: secciones, encuentro y datos.', arriba: true,
    muestra: (
      <div className="w-[218px] origin-top scale-[0.62]">
        <PatientMenuPreview.Provider value={{ collapsed: false, encounter: 'start' }}>
          <PatientSidePanel name="John Smith" initials="JS" section="Overview" basePath="/patients/john-smith" />
        </PatientMenuPreview.Provider>
      </div>
    ),
  },
  {
    titulo: 'Colors', seccion: 'Foundations', que: 'Los tokens de color, leídos de index.css.',
    muestra: (
      <div className="grid grid-cols-4 gap-2">
        {['bg-dash-blue', 'bg-ink', 'bg-green', 'bg-amber', 'bg-dash-bad-fg', 'bg-purple-fg', 'bg-brand-tint', 'bg-surface-slate'].map((c) => (
          <span key={c} className={cn('size-9 rounded-lg ring-1 ring-black/5', c)} />
        ))}
      </div>
    ),
  },
  {
    titulo: 'Page header', seccion: 'Elements', que: 'Rastro, título, bajada y la acción principal de cada pantalla.',
    muestra: (
      <div className="flex w-[300px] flex-col gap-3">
        <Breadcrumb items={[{ label: 'Settings', to: '/settings' }, { label: 'Accounts' }]} />
        <SettingsPageHeader titulo="Accounts" bajada="Who can use Confidentally." accion={<Button size="sm">Add</Button>} />
      </div>
    ),
  },
  {
    titulo: 'Cards', seccion: 'Elements', que: 'La caja que agrupa un bloque de información.',
    muestra: (
      <Card className="w-[240px]">
        <CardHeader>
          <div>
            <CardTitle>Clinic hours</CardTitle>
            <CardDescription>When patients can book.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-[13px] text-ink-medium">Mon – Fri · 8:00 – 18:00</CardContent>
      </Card>
    ),
  },
  {
    titulo: 'Navigation', seccion: 'Elements', que: 'El menú lateral de la app: colapsado, expandido y su tooltip.',
    muestra: (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-line bg-surface-subtle p-1.5">
          {RIEL.map((Icono, i) => (
            <span key={i} className={cn('flex size-7 items-center justify-center rounded-md', i === 2 ? 'bg-dash-blue text-white' : 'text-ink-medium')}>
              <Icono className="size-4" />
            </span>
          ))}
        </div>
        <span className="rounded-md bg-ink px-2 py-1 text-[12px] font-medium text-white">Scheduling</span>
      </div>
    ),
  },
  {
    titulo: 'Typography', seccion: 'Foundations', que: 'La escala de texto de la app, en Inter.',
    muestra: (
      <div className="flex flex-col gap-1">
        <span className="text-[34px] leading-none font-bold text-ink">Aa</span>
        <span className="text-2xl font-bold text-ink">Heading 24</span>
        <span className="text-sm text-ink">Body 14 · Regular</span>
        <span className="text-xs text-ink-muted">Caption 12</span>
      </div>
    ),
  },
  {
    titulo: 'Radius and shadows', seccion: 'Foundations', que: 'Las esquinas y sombras de cards, paneles y menús.',
    muestra: (
      <div className="flex items-end gap-3">
        <span className="size-14 rounded-md border border-line bg-white" />
        <span className="shadow-inner-card size-14 rounded-lg bg-white" />
        <span className="shadow-panel size-14 rounded-xl bg-white" />
      </div>
    ),
  },
  {
    titulo: 'Switch', seccion: 'Components', que: 'Prender o apagar una opción, con efecto inmediato.',
    muestra: (
      <div className="flex flex-col gap-3 text-[13px] text-ink">
        <span className="flex items-center gap-3"><Switch defaultChecked aria-label="Reminders" /> Send reminders</span>
        <span className="flex items-center gap-3"><Switch aria-label="Online booking" /> Online booking</span>
      </div>
    ),
  },
  {
    titulo: 'Checkbox', seccion: 'Components', que: 'Elegir una o varias opciones de una lista.',
    muestra: (
      <div className="flex flex-col gap-2.5 text-[13px] text-ink">
        <span className="flex items-center gap-2.5"><Checkbox on onChange={() => {}} label="Allergies" /> Allergies</span>
        <span className="flex items-center gap-2.5"><Checkbox on={false} onChange={() => {}} label="Diabetes" /> Diabetes</span>
        <span className="flex items-center gap-2.5"><Checkbox on onChange={() => {}} label="Smoker" /> Smoker</span>
      </div>
    ),
  },
  {
    titulo: 'DatePicker', seccion: 'Components', que: 'Elegir una fecha con el calendario.',
    muestra: <DatePicker value={new Date(2025, 2, 12)} onChange={() => {}} />,
  },
  {
    titulo: 'Avatar', seccion: 'Components', que: 'La foto o las iniciales de un paciente o del equipo.',
    muestra: (
      <div className="flex -space-x-2">
        {[['MV', 'bg-dash-blue'], ['NS', 'bg-dash-blue-hover'], ['EA', 'bg-green'], ['JS', 'bg-ink']].map(([t, c]) => (
          <Avatar key={t} className="size-11 ring-2 ring-white"><AvatarFallback className={cn('text-[13px] font-semibold text-white', c)}>{t}</AvatarFallback></Avatar>
        ))}
      </div>
    ),
  },
  {
    titulo: 'EmptyState', seccion: 'Components', que: 'Lo que se ve cuando todavía no hay nada.',
    muestra: <div className="w-[260px] origin-center scale-90"><EmptyState icon={CalendarDays} title="No appointments today" detail="Your schedule is clear." /></div>,
  },
]`,computed:!1}},inicial:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`7`,computed:!1}}}}})))()}export{$ as i,K as n,q as r,Q as t};
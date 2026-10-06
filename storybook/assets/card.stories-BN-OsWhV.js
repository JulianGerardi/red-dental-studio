import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./dist-BKhs5yhL.js";import{n as r,t as i}from"./utils-D-bRdWGo.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{n as o,t as s}from"./ellipsis-vertical-CPfIlQ5Q.js";import{i as c,n as ee,r as te,t as l}from"./SettingsSectionCard-DhEXI4WB.js";import{i as u,r as d}from"./button-R5lrVQ2-.js";import{i as f,t as p}from"./primitives-D4QdCBPb.js";import{d as m,h,m as g}from"./form-ClxpDPMA.js";import{an as _,cn as v,dn as ne,ln as y,on as b,sn as x,un as S}from"./iframe-DkoGpwoe.js";import{c as C,d as w,i as T,l as E,s as D,t as O}from"./kit-VhBMbBcY.js";import{n as k,t as A}from"./AppointmentCard.stories-DP41bH2I.js";import{n as re,t as ie}from"./OperatoryCard.stories-BIeXXqdQ.js";import{n as ae,t as oe}from"./PendingTaskCard.stories-BkaXhiEQ.js";import{n as se,t as j}from"./StatCard.stories-Cz4jr7cI.js";import{n as M,t as N}from"./PatientAppointmentCard.stories-BYiAjHP_.js";import{n as P,t as F}from"./PatientCard.stories-Ca7dwa7N.js";function I({title:e,description:t,action:n,content:r,footer:a,state:o,width:c}){return(0,z.jsxs)(_,{style:{width:c},className:i(o===`hover`&&`hover:border-dash-blue/40 pseudo-hover cursor-pointer transition-colors`,o===`selected`&&`border-dash-blue ring-dash-blue/15 ring-2`),children:[(0,z.jsxs)(y,{children:[(0,z.jsxs)(`div`,{className:`min-w-0`,children:[(0,z.jsx)(S,{children:e}),t&&(0,z.jsx)(x,{children:t})]}),n===`button`&&(0,z.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`}),n===`menu`&&(0,z.jsx)(d,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Actions`,children:(0,z.jsx)(s,{})})]}),(0,z.jsx)(b,{children:r}),a&&(0,z.jsxs)(v,{children:[(0,z.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,z.jsx)(d,{size:`md`,children:`Save`})]})]})}function L({nombre:e,children:t,className:n}){return(0,z.jsxs)(`div`,{className:i(`relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1`,n),children:[(0,z.jsx)(`span`,{className:`bg-dash-blue absolute -top-2 right-2 rounded px-1.5 text-[10px] leading-4 font-semibold text-white`,children:e}),t]})}function R({nombre:e,children:t,selector:n}){let{ref:r,m:i}=w(n);return(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:e}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`div`,{ref:r,children:t})}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.radio}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.borde}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.padding})]})}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),c(),u(),ne(),h(),E(),f(),se(),k(),re(),ae(),P(),M(),ee(),r(),z=a(),B={title:`Elements/Cards`,component:_,parameters:{layout:`padded`,docs:{description:{component:[`Una **card** es la caja blanca que agrupa **un solo tema** sobre el fondo gris de la pantalla: los datos de contacto de un paciente, un número del día, una cita. Sirve para separar bloques y que la pantalla se lea por partes.`,``,"**Partes** (`@/components/ui/card`): `Card` (la caja) · `CardHeader` con `CardTitle` y `CardDescription` · `CardContent` · `CardFooter` para las acciones.",``,`**Probalo:** en *Playground* armá tu card desde *Controls*: título, bajada, acción, contenido, pie y estado.`].join(`
`)}}},args:{title:`Contact information`,description:`How the clinic reaches the patient.`,action:`button`,content:`sarah.stone@mail.com · (555) 010-2233`,footer:!1,state:`default`,width:380},argTypes:{title:{control:`text`,description:`Título de la card.`},description:{control:`text`,description:`Bajada debajo del título. Vacía = sin bajada.`},action:{control:`inline-radio`,options:[`none`,`button`,`menu`],description:`Acción arriba a la derecha.`},content:{control:`text`,description:`Contenido.`},footer:{control:`boolean`,description:`Pie con Cancel y Save.`},state:{control:`inline-radio`,options:[`default`,`hover`,`selected`],description:`hover: la card entera es clickeable. selected: está elegida.`},width:{control:{type:`range`,min:240,max:640,step:20},description:`Ancho en px.`}},decorators:[e=>(0,z.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,z.jsx)(e,{})})]},V={render:e=>(0,z.jsx)(I,{...e})},H={parameters:{controls:{disable:!0}},render:()=>(0,z.jsxs)(_,{className:`w-[420px]`,children:[(0,z.jsx)(L,{nombre:`CardHeader`,children:(0,z.jsxs)(y,{className:`pb-1`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(L,{nombre:`CardTitle`,className:`inline-block`,children:(0,z.jsx)(S,{children:`Contact information`})}),(0,z.jsx)(x,{children:`How the clinic reaches the patient.`})]}),(0,z.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`})]})}),(0,z.jsx)(L,{nombre:`CardContent`,children:(0,z.jsx)(b,{children:`sarah.stone@mail.com · (555) 010-2233`})}),(0,z.jsx)(L,{nombre:`CardFooter`,children:(0,z.jsxs)(v,{children:[(0,z.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,z.jsx)(d,{size:`md`,children:`Save`})]})})]})},{Default:U}=t(j),{Default:W}=t(A),{Available:G}=t(ie),{Default:K}=t(oe),{Active:q}=t(F),{Booked:J}=t(N),Y=[{nombre:`SettingsSectionCard`,uso:`One section of Settings on its home page. The whole card is the link.`,ancho:320,nodo:(0,z.jsx)(l,{to:`/settings/accounts`,icon:te,title:`Accounts`,description:`Manage your account and their access.`})},{nombre:`SectionCard`,uso:`A block of a form: groups related fields under a title.`,ancho:340,nodo:(0,z.jsx)(m,{title:`General`,children:(0,z.jsx)(g,{label:`Name`,placeholder:`Name`})})},{nombre:`StatCard`,uso:`One number of the day with its change.`,ancho:260,nodo:(0,z.jsx)(U,{})},{nombre:`AppointmentCard`,uso:`One appointment in the dashboard list.`,ancho:360,nodo:(0,z.jsx)(W,{})},{nombre:`OperatoryCard`,uso:`One room and who is in it.`,ancho:300,nodo:(0,z.jsx)(G,{})},{nombre:`PendingTaskCard`,uso:`A task that is waiting for someone.`,ancho:320,nodo:(0,z.jsx)(K,{})},{nombre:`PatientCard`,uso:`A patient in the mobile list.`,ancho:340,nodo:(0,z.jsx)(q,{})},{nombre:`PatientAppointmentCard`,uso:`One appointment in the Patient Dashboard. Same surface as the dashboard cards.`,ancho:280,nodo:(0,z.jsx)(J,{})}],X={name:`Cards in the app`,parameters:{controls:{disable:!0}},render:()=>(0,z.jsx)(T,{children:(0,z.jsx)(`div`,{className:`grid grid-cols-1 gap-6 md:grid-cols-2`,children:Y.map(e=>(0,z.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,z.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,z.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:e.uso}),(0,z.jsx)(`div`,{style:{width:e.ancho,maxWidth:`100%`},children:e.nodo})]},e.nombre))})})},Z={parameters:{controls:{disable:!0}},render:()=>(0,z.jsxs)(T,{children:[(0,z.jsx)(O,{titulo:`Box`,nota:`Medidas leídas de la card dibujada.`,children:(0,z.jsxs)(D,{encabezado:[`Part`,`Sample`,`Radius`,`Border`,`Padding`],minimo:640,children:[(0,z.jsx)(R,{nombre:`Card`,children:(0,z.jsx)(_,{className:`h-12 w-40`})}),(0,z.jsx)(R,{nombre:`CardHeader`,selector:`:scope > div > div`,children:(0,z.jsx)(_,{className:`w-40`,children:(0,z.jsx)(y,{children:(0,z.jsx)(S,{children:`Title`})})})}),(0,z.jsx)(R,{nombre:`CardContent`,selector:`:scope > div > div`,children:(0,z.jsx)(_,{className:`w-40`,children:(0,z.jsx)(b,{children:`Content`})})}),(0,z.jsx)(R,{nombre:`CardFooter`,selector:`:scope > div > div`,children:(0,z.jsx)(_,{className:`w-40`,children:(0,z.jsx)(v,{children:(0,z.jsx)(d,{size:`sm`,children:`Save`})})})})]})}),(0,z.jsxs)(O,{titulo:`Card inside a panel`,nota:`La misma superficie para todas las cards que van adentro de un panel (InnerCard): Appointments, Waiting Room, Rooms y Pending Task del Dashboard, los turnos y las tareas del Patient Dashboard y las cards chicas de Patients. Antes cada una tenía su sombra y la del Dashboard (0 4px 2px) se veía dura.`,children:[(0,z.jsxs)(`div`,{className:`flex flex-wrap gap-4 rounded-lg bg-surface-subtle p-5`,children:[(0,z.jsx)(p,{className:`flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted`,children:`InnerCard`}),(0,z.jsx)(p,{className:`flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted`,children:`InnerCard`})]}),(0,z.jsxs)(D,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Background`}),(0,z.jsx)(`td`,{children:(0,z.jsx)(C,{nombre:`white`})})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Border`}),(0,z.jsxs)(`td`,{children:[(0,z.jsx)(C,{nombre:`line`}),` · 1px`]})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Shadow`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`shadow-inner-card · 0 1px 3px rgb(0 0 0 / 8%)`})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Radius`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`8px`})]})]})]}),(0,z.jsx)(O,{titulo:`Rules`,children:(0,z.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,z.jsx)(`li`,{children:`One topic per card. If it needs two titles, it is two cards.`}),(0,z.jsx)(`li`,{children:`The action that edits the card goes top right; the ones that save or cancel go in the footer.`}),(0,z.jsx)(`li`,{children:`Cards sit on the grey page background, 16–24px apart.`})]})})]})},Q=[`Playground`,`Anatomy`,`InTheApp`,`Specs`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <Armada {...args} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Card className="w-[420px]">
      <Parte nombre="CardHeader">
        <CardHeader className="pb-1">
          <div>
            <Parte nombre="CardTitle" className="inline-block"><CardTitle>Contact information</CardTitle></Parte>
            <CardDescription>How the clinic reaches the patient.</CardDescription>
          </div>
          <Button variant="link" size="sm">Edit</Button>
        </CardHeader>
      </Parte>
      <Parte nombre="CardContent"><CardContent>sarah.stone@mail.com · (555) 010-2233</CardContent></Parte>
      <Parte nombre="CardFooter">
        <CardFooter><Button variant="secondary" size="md">Cancel</Button><Button size="md">Save</Button></CardFooter>
      </Parte>
    </Card>
}`,...H.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Cards in the app',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {EN_LA_APP.map(c => <div key={c.nombre} className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold">{c.nombre}</p>
            <p className="text-[12px] text-ink-muted">{c.uso}</p>
            <div style={{
          width: c.ancho,
          maxWidth: '100%'
        }}>{c.nodo}</div>
          </div>)}
      </div>
    </Lienzo>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Box" nota="Medidas leídas de la card dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Radius', 'Border', 'Padding']} minimo={640}>
          <Medida nombre="Card"><Card className="h-12 w-40" /></Medida>
          <Medida nombre="CardHeader" selector=":scope > div > div"><Card className="w-40"><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card></Medida>
          <Medida nombre="CardContent" selector=":scope > div > div"><Card className="w-40"><CardContent>Content</CardContent></Card></Medida>
          <Medida nombre="CardFooter" selector=":scope > div > div"><Card className="w-40"><CardFooter><Button size="sm">Save</Button></CardFooter></Card></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Card inside a panel" nota="La misma superficie para todas las cards que van adentro de un panel (InnerCard): Appointments, Waiting Room, Rooms y Pending Task del Dashboard, los turnos y las tareas del Patient Dashboard y las cards chicas de Patients. Antes cada una tenía su sombra y la del Dashboard (0 4px 2px) se veía dura.">
        <div className="flex flex-wrap gap-4 rounded-lg bg-surface-subtle p-5">
          <InnerCard className="flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted">InnerCard</InnerCard>
          <InnerCard className="flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted">InnerCard</InnerCard>
        </div>
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Background</td><td><Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Border</td><td><Token nombre="line" /> · 1px</td></tr>
          <tr><td className="font-semibold">Shadow</td><td className="tabular-nums">shadow-inner-card · 0 1px 3px rgb(0 0 0 / 8%)</td></tr>
          <tr><td className="font-semibold">Radius</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One topic per card. If it needs two titles, it is two cards.</li>
          <li>The action that edits the card goes top right; the ones that save or cancel go in the footer.</li>
          <li>Cards sit on the grey page background, 16–24px apart.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{H as Anatomy,X as InTheApp,V as Playground,Z as Specs,Q as __namedExportsOrder,B as default};
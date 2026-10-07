import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./dist-BKhs5yhL.js";import{n as r,t as i}from"./utils-D-bRdWGo.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{n as o,t as s}from"./ellipsis-vertical-CPfIlQ5Q.js";import{i as c,n as ee,r as l,t as te}from"./SettingsSectionCard-B11FOhUL.js";import{i as u,r as d}from"./button-R5lrVQ2-.js";import{c as f,l as p}from"./estilos-CHlNpAbz.js";import{i as m,t as h}from"./primitives-hTAWF3nr.js";import{d as g,h as _,m as ne}from"./form-DIbxxX9H.js";import{an as v,cn as y,dn as b,ln as x,on as S,sn as C,un as w}from"./iframe-BgtEFaWm.js";import{c as T,d as re,i as E,l as D,s as O,t as k}from"./kit-VhBMbBcY.js";import{n as ie,t as ae}from"./AppointmentCard.stories--JMpM7P4.js";import{n as oe,t as se}from"./OperatoryCard.stories-DhclGhRC.js";import{n as ce,t as le}from"./PendingTaskCard.stories-jnfeYAvT.js";import{n as A,t as j}from"./StatCard.stories-r7PDzhTo.js";import{n as M,t as N}from"./PatientAppointmentCard.stories-iQqmGgLA.js";import{n as P,t as F}from"./PatientCard.stories-DZP6Y7NI.js";function I({title:e,description:t,action:n,content:r,footer:a,state:o,width:c}){return(0,z.jsxs)(v,{style:{width:c},className:i(o===`hover`&&`hover:ring-dash-blue/40 pseudo-hover cursor-pointer transition-shadow hover:ring-1`,o===`selected`&&`ring-dash-blue ring-2`),children:[(0,z.jsxs)(x,{children:[(0,z.jsxs)(`div`,{className:`min-w-0`,children:[(0,z.jsx)(w,{children:e}),t&&(0,z.jsx)(C,{children:t})]}),n===`button`&&(0,z.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`}),n===`menu`&&(0,z.jsx)(d,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Actions`,children:(0,z.jsx)(s,{})})]}),(0,z.jsx)(S,{children:r}),a&&(0,z.jsxs)(y,{children:[(0,z.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,z.jsx)(d,{size:`md`,children:`Save`})]})]})}function L({nombre:e,children:t,className:n}){return(0,z.jsxs)(`div`,{className:i(`relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1`,n),children:[(0,z.jsx)(`span`,{className:`bg-dash-blue absolute -top-2 right-2 rounded px-1.5 text-[10px] leading-4 font-semibold text-white`,children:e}),t]})}function R({nombre:e,children:t,selector:n}){let{ref:r,m:i}=re(n);return(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:e}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`div`,{ref:r,children:t})}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.radio}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.borde}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:i?.padding})]})}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),c(),u(),b(),_(),D(),m(),p(),A(),ie(),oe(),ce(),P(),M(),ee(),r(),z=a(),B={title:`Elements/Cards`,component:v,parameters:{layout:`padded`,docs:{description:{component:[`Una **card** es la caja blanca que agrupa **un solo tema** sobre el fondo gris de la pantalla: los datos de contacto de un paciente, un número del día, una cita. Sirve para separar bloques y que la pantalla se lea por partes.`,``,"**Partes** (`@/components/ui/card`): `Card` (la caja) · `CardHeader` con `CardTitle` y `CardDescription` · `CardContent` · `CardFooter` para las acciones.",``,"**Dos superficies, en toda la app:** la card que va sobre el fondo gris lleva **sombra y no borde** (`Card`, `TARJETA_PANEL`, como los paneles del Dashboard); la card que va **adentro** de otra lleva un stroke de medio pixel en gris tenue y sombra suave (`InnerCard`, `TARJETA_INTERNA`). Las tablas y la grilla del calendario mantienen su borde.",``,`**Probalo:** en *Playground* armá tu card desde *Controls*: título, bajada, acción, contenido, pie y estado.`].join(`
`)}}},args:{title:`Contact information`,description:`How the clinic reaches the patient.`,action:`button`,content:`sarah.stone@mail.com · (555) 010-2233`,footer:!1,state:`default`,width:380},argTypes:{title:{control:`text`,description:`Título de la card.`},description:{control:`text`,description:`Bajada debajo del título. Vacía = sin bajada.`},action:{control:`inline-radio`,options:[`none`,`button`,`menu`],description:`Acción arriba a la derecha.`},content:{control:`text`,description:`Contenido.`},footer:{control:`boolean`,description:`Pie con Cancel y Save.`},state:{control:`inline-radio`,options:[`default`,`hover`,`selected`],description:`hover: la card entera es clickeable. selected: está elegida.`},width:{control:{type:`range`,min:240,max:640,step:20},description:`Ancho en px.`}},decorators:[e=>(0,z.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,z.jsx)(e,{})})]},V={render:e=>(0,z.jsx)(I,{...e})},H={parameters:{controls:{disable:!0}},render:()=>(0,z.jsxs)(v,{className:`w-[420px]`,children:[(0,z.jsx)(L,{nombre:`CardHeader`,children:(0,z.jsxs)(x,{className:`pb-1`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(L,{nombre:`CardTitle`,className:`inline-block`,children:(0,z.jsx)(w,{children:`Contact information`})}),(0,z.jsx)(C,{children:`How the clinic reaches the patient.`})]}),(0,z.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`})]})}),(0,z.jsx)(L,{nombre:`CardContent`,children:(0,z.jsx)(S,{children:`sarah.stone@mail.com · (555) 010-2233`})}),(0,z.jsx)(L,{nombre:`CardFooter`,children:(0,z.jsxs)(y,{children:[(0,z.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,z.jsx)(d,{size:`md`,children:`Save`})]})})]})},{Default:U}=t(j),{Default:W}=t(ae),{Available:G}=t(se),{Default:K}=t(le),{Active:q}=t(F),{Booked:J}=t(N),Y=[{nombre:`SettingsSectionCard`,uso:`One section of Settings on its home page. The whole card is the link.`,ancho:320,nodo:(0,z.jsx)(te,{to:`/settings/accounts`,icon:l,title:`Accounts`,description:`Manage your account and their access.`})},{nombre:`SectionCard`,uso:`A block of a form: groups related fields under a title.`,ancho:340,nodo:(0,z.jsx)(g,{title:`General`,children:(0,z.jsx)(ne,{label:`Name`,placeholder:`Name`})})},{nombre:`StatCard`,uso:`One number of the day with its change.`,ancho:260,nodo:(0,z.jsx)(U,{})},{nombre:`AppointmentCard`,uso:`One appointment in the dashboard list.`,ancho:360,nodo:(0,z.jsx)(W,{})},{nombre:`OperatoryCard`,uso:`One room and who is in it.`,ancho:300,nodo:(0,z.jsx)(G,{})},{nombre:`PendingTaskCard`,uso:`A task that is waiting for someone.`,ancho:320,nodo:(0,z.jsx)(K,{})},{nombre:`PatientCard`,uso:`A patient in the mobile list.`,ancho:340,nodo:(0,z.jsx)(q,{})},{nombre:`PatientAppointmentCard`,uso:`One appointment in the Patient Dashboard. Same surface as the dashboard cards.`,ancho:280,nodo:(0,z.jsx)(J,{})}],X={name:`Cards in the app`,parameters:{controls:{disable:!0}},render:()=>(0,z.jsx)(E,{children:(0,z.jsx)(`div`,{className:`grid grid-cols-1 gap-6 md:grid-cols-2`,children:Y.map(e=>(0,z.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,z.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,z.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:e.uso}),(0,z.jsx)(`div`,{style:{width:e.ancho,maxWidth:`100%`},children:e.nodo})]},e.nombre))})})},Z={parameters:{controls:{disable:!0}},render:()=>(0,z.jsxs)(E,{children:[(0,z.jsx)(k,{titulo:`Box`,nota:`Medidas leídas de la card dibujada.`,children:(0,z.jsxs)(O,{encabezado:[`Part`,`Sample`,`Radius`,`Border`,`Padding`],minimo:640,children:[(0,z.jsx)(R,{nombre:`Card`,children:(0,z.jsx)(v,{className:`h-12 w-40`})}),(0,z.jsx)(R,{nombre:`CardHeader`,selector:`:scope > div > div`,children:(0,z.jsx)(v,{className:`w-40`,children:(0,z.jsx)(x,{children:(0,z.jsx)(w,{children:`Title`})})})}),(0,z.jsx)(R,{nombre:`CardContent`,selector:`:scope > div > div`,children:(0,z.jsx)(v,{className:`w-40`,children:(0,z.jsx)(S,{children:`Content`})})}),(0,z.jsx)(R,{nombre:`CardFooter`,selector:`:scope > div > div`,children:(0,z.jsx)(v,{className:`w-40`,children:(0,z.jsx)(y,{children:(0,z.jsx)(d,{size:`sm`,children:`Save`})})})})]})}),(0,z.jsxs)(k,{titulo:`Card on the page`,nota:`La card que va sobre el fondo gris, en toda la app (Card, TARJETA_PANEL en lib/estilos, la Card de Settings y SectionCard): los paneles del Dashboard, el Patient Dashboard y las pantallas del paciente, Clinical Mode, Billing, Help, Notifications y Settings. Blanca, con sombra y sin borde. Con el mouse encima o elegida, un anillo azul en vez de un borde.`,children:[(0,z.jsxs)(`div`,{className:`flex flex-wrap gap-4 rounded-lg bg-page-background p-6`,children:[(0,z.jsx)(`div`,{className:`${f} flex h-24 w-56 items-center justify-center text-[12px] text-ink-muted`,children:`Card on the page`}),(0,z.jsxs)(`div`,{className:`${f} flex w-72 flex-col gap-3 p-4`,children:[(0,z.jsx)(`span`,{className:`text-[12px] font-semibold text-ink`,children:`With cards inside`}),(0,z.jsx)(h,{className:`h-10`}),(0,z.jsx)(h,{className:`h-10`})]})]}),(0,z.jsxs)(O,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Background`}),(0,z.jsx)(`td`,{children:(0,z.jsx)(T,{nombre:`white`})})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Border`}),(0,z.jsx)(`td`,{children:`None`})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Shadow`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`shadow-panel · 0 4px 14px rgb(100 100 100 / 25%)`})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Radius`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`8px`})]})]})]}),(0,z.jsxs)(k,{titulo:`Card inside a panel`,nota:`La misma superficie para todas las cards que van adentro de un panel (InnerCard): Appointments, Waiting Room, Rooms y Pending Task del Dashboard, los turnos y las tareas del Patient Dashboard y las cards chicas de Patients. Antes cada una tenía su sombra y la del Dashboard (0 4px 2px) se veía dura.`,children:[(0,z.jsxs)(`div`,{className:`flex flex-wrap gap-4 rounded-lg bg-surface-subtle p-5`,children:[(0,z.jsx)(h,{className:`flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted`,children:`InnerCard`}),(0,z.jsx)(h,{className:`flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted`,children:`InnerCard`})]}),(0,z.jsxs)(O,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Background`}),(0,z.jsx)(`td`,{children:(0,z.jsx)(T,{nombre:`white`})})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Stroke`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`0.5px, negro al 12%, por dentro de la card (sombra inset: un border de 0.5px se redondea a 1px y una línea por fuera la recorta una lista con scroll). En retina, medio pixel; en una pantalla común, 1px en #eeeeee; igual en los cuatro lados`})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Shadow`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`shadow-inner-card · inset 0 0 0 0.5px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 4%)`})]}),(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{className:`font-semibold`,children:`Radius`}),(0,z.jsx)(`td`,{className:`tabular-nums`,children:`8px`})]})]})]}),(0,z.jsx)(k,{titulo:`Rules`,children:(0,z.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,z.jsx)(`li`,{children:`One topic per card. If it needs two titles, it is two cards.`}),(0,z.jsx)(`li`,{children:`The action that edits the card goes top right; the ones that save or cancel go in the footer.`}),(0,z.jsx)(`li`,{children:`Cards sit on the grey page background, 16–24px apart, with a shadow and no border.`}),(0,z.jsx)(`li`,{children:`A card inside another card has a half-pixel stroke in a faint grey and a soft shadow (InnerCard).`}),(0,z.jsx)(`li`,{children:`Tables and the calendar grid keep their border: they are not cards.`})]})})]})},Q=[`Playground`,`Anatomy`,`InTheApp`,`Specs`],V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Card on the page" nota="La card que va sobre el fondo gris, en toda la app (Card, TARJETA_PANEL en lib/estilos, la Card de Settings y SectionCard): los paneles del Dashboard, el Patient Dashboard y las pantallas del paciente, Clinical Mode, Billing, Help, Notifications y Settings. Blanca, con sombra y sin borde. Con el mouse encima o elegida, un anillo azul en vez de un borde.">
        <div className="flex flex-wrap gap-4 rounded-lg bg-page-background p-6">
          <div className={\`\${TARJETA_PANEL} flex h-24 w-56 items-center justify-center text-[12px] text-ink-muted\`}>Card on the page</div>
          <div className={\`\${TARJETA_PANEL} flex w-72 flex-col gap-3 p-4\`}>
            <span className="text-[12px] font-semibold text-ink">With cards inside</span>
            <InnerCard className="h-10" />
            <InnerCard className="h-10" />
          </div>
        </div>
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Background</td><td><Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Border</td><td>None</td></tr>
          <tr><td className="font-semibold">Shadow</td><td className="tabular-nums">shadow-panel · 0 4px 14px rgb(100 100 100 / 25%)</td></tr>
          <tr><td className="font-semibold">Radius</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Card inside a panel" nota="La misma superficie para todas las cards que van adentro de un panel (InnerCard): Appointments, Waiting Room, Rooms y Pending Task del Dashboard, los turnos y las tareas del Patient Dashboard y las cards chicas de Patients. Antes cada una tenía su sombra y la del Dashboard (0 4px 2px) se veía dura.">
        <div className="flex flex-wrap gap-4 rounded-lg bg-surface-subtle p-5">
          <InnerCard className="flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted">InnerCard</InnerCard>
          <InnerCard className="flex h-20 w-48 items-center justify-center text-[12px] text-ink-muted">InnerCard</InnerCard>
        </div>
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Background</td><td><Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Stroke</td><td className="tabular-nums">0.5px, negro al 12%, por dentro de la card (sombra inset: un border de 0.5px se redondea a 1px y una línea por fuera la recorta una lista con scroll). En retina, medio pixel; en una pantalla común, 1px en #eeeeee; igual en los cuatro lados</td></tr>
          <tr><td className="font-semibold">Shadow</td><td className="tabular-nums">shadow-inner-card · inset 0 0 0 0.5px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 4%)</td></tr>
          <tr><td className="font-semibold">Radius</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One topic per card. If it needs two titles, it is two cards.</li>
          <li>The action that edits the card goes top right; the ones that save or cancel go in the footer.</li>
          <li>Cards sit on the grey page background, 16–24px apart, with a shadow and no border.</li>
          <li>A card inside another card has a half-pixel stroke in a faint grey and a soft shadow (InnerCard).</li>
          <li>Tables and the calendar grid keep their border: they are not cards.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{H as Anatomy,X as InTheApp,V as Playground,Z as Specs,Q as __namedExportsOrder,B as default};
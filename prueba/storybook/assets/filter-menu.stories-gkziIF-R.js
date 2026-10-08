import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./circle-alert-C10ApoXx.js";import{n as a,t as o}from"./clipboard-list-BiftUctM.js";import{n as s,t as c}from"./ColumnPicker-BMSw43DU.js";import{n as l,t as u}from"./siren-BDHT527r.js";import{n as d,t as f}from"./stethoscope-CtGSUjPD.js";import{a as p,n as m,r as h,t as g}from"./filter-menu-BXXtLsip.js";import{nt as _,tt as v}from"./iframe-DeErfScU.js";import{n as y,r as b}from"./play-CDw6varG.js";import{a as x,d as S,i as C,l as w,n as T,s as E,t as D}from"./kit-VhBMbBcY.js";function O({kind:e,size:t,counts:n,disabled:r}){let[i,a]=(0,A.useState)([`Operatory 2`]),[o,s]=(0,A.useState)(`Active`),[c,l]=(0,A.useState)([]),[u,d]=(0,A.useState)(``),f=e=>n?e:{...e,count:void 0};return(0,j.jsxs)(`div`,{className:`flex h-80 items-start gap-4`,children:[e===`multiple`&&(0,j.jsx)(g,{label:`Filter appointments`,size:t,disabled:r,groups:[{title:`Operatory`,options:F.map((e,t)=>f({value:e,count:t+2})),value:i,onChange:a}]}),e===`single`&&(0,j.jsx)(g,{label:`Filter by status`,size:t,disabled:r,groups:[{type:`single`,title:`Status`,defaultValue:`Active`,options:I.map(f),value:o,onChange:s}]}),e===`with search`&&(0,j.jsx)(g,{label:`Filter workflows`,size:t,disabled:r,groups:[{title:`Workflow type`,options:L.map(f),value:c,onChange:l}],search:{label:`Code or description`,placeholder:`e.g. TRIAGE or Social`,value:u,onChange:d},result:`6 of 6 workflows`})]})}function k({size:e,count:t}){let{ref:n,m:r}=S();return(0,j.jsxs)(`tr`,{children:[(0,j.jsxs)(`td`,{className:`font-semibold`,children:[e,t?` · active`:``]}),(0,j.jsx)(`td`,{children:(0,j.jsx)(`div`,{ref:n,className:`inline-flex`,children:(0,j.jsx)(h,{size:e,count:t})})}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.texto}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.icono}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{A=t(),r(),a(),l(),d(),p(),s(),_(),w(),b(),j=n(),{userEvent:M,within:N}=__STORYBOOK_MODULE_TEST__,P={title:`Elements/Filter`,parameters:{layout:`padded`,docs:{description:{component:["El filtro de la app (`@/components/ui/filter-menu`), uno solo para todas las pantallas: Dashboard, Ledger, Accounts overview, la tabla estándar, la Problem List, Workflows y el buscador de procedimientos.",``,`**El botón** es siempre el mismo: ícono, "Filter" y, con filtros aplicados, azul con la cantidad. **El menú** tiene grupos de varias opciones (casillas) o de una (radio), cada opción con su cantidad y, si es un estado, el punto de su color; búsqueda opcional y Clear all. Se aplica al tocar.`,``,`**Tamaños:** md (36px) junto a buscadores; sm (28px) en encabezados de cards y paneles.`,``,"**En una barra de herramientas** Columns usa el mismo botón (`filterTriggerClasses`): en el Ledger y en las tablas, Filter y Columns tienen el mismo alto, letra y borde, y los dos se pintan de azul cuando algo está aplicado.",``,`**Probalo:** en *Playground* cambiá el tipo de filtro, el tamaño y las cantidades desde *Controls*.`].join(`
`)}}},args:{kind:`multiple`,size:`md`,counts:!0,disabled:!1},argTypes:{kind:{control:`inline-radio`,options:[`multiple`,`single`,`with search`],description:`Varias opciones (casillas), una (radio, con un valor por defecto) o con búsqueda.`},size:{control:`inline-radio`,options:[`md`,`sm`],description:`md 36px junto a buscadores · sm 28px en encabezados de cards.`},counts:{control:`boolean`,description:`Cuántas filas tiene cada opción.`},disabled:{control:`boolean`,description:`Deshabilitado: la tabla está cargando o sin permiso.`}}},F=[`Operatory 1`,`Operatory 2`,`Operatory 3`],I=[{value:`Active`,tone:`success`,count:6},{value:`In treatment`,tone:`info`,count:1},{value:`Monitoring`,tone:`warning`,count:1},{value:`Discarded`,tone:`danger`,count:1}],L=[{value:`Procedure`,icon:f,count:1},{value:`Emergency`,icon:u,count:1},{value:`Complication`,icon:i,count:0,disabled:!0},{value:`Questionnaire`,icon:o,count:4}],R={render:e=>(0,j.jsx)(O,{...e})},z={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(C,{children:[(0,j.jsx)(D,{titulo:`Trigger`,nota:`El mismo botón en todas las pantallas. Sin filtros, blanco; con filtros aplicados, azul con la cantidad.`,children:(0,j.jsxs)(x,{children:[(0,j.jsx)(T,{rotulo:`md · none applied`,children:(0,j.jsx)(h,{})}),(0,j.jsx)(T,{rotulo:`md · 2 applied`,children:(0,j.jsx)(h,{count:2})}),(0,j.jsx)(T,{rotulo:`sm · in card headers`,children:(0,j.jsx)(h,{size:`sm`})}),(0,j.jsx)(T,{rotulo:`sm · 1 applied`,children:(0,j.jsx)(h,{size:`sm`,count:1})})]})}),(0,j.jsx)(D,{titulo:`Option`,nota:`Nombre y cantidad; un estado lleva el punto de su color, una categoría su ícono.`,children:(0,j.jsx)(`div`,{className:`flex w-[240px] flex-col gap-1 rounded-lg border border-line p-1 text-[13px]`,children:[I[0],L[3],{value:`Operatory 1`,count:3},{value:`No results`,count:0}].map(e=>(0,j.jsx)(`div`,{className:`flex items-center gap-2 rounded-md px-2 py-1`,children:(0,j.jsx)(m,{o:e})},e.value))})})]})},B={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(E,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Default`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(h,{})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Sin filtros: se ve todo (o el valor por defecto, como Active en la Problem List).`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Active`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(h,{count:2})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Hay filtros aplicados: azul con cuántos. Clear all los saca.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Disabled`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(h,{disabled:!0})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`La tabla está cargando o es de sólo lectura.`})]})]})},V={args:{kind:`with search`},render:e=>(0,j.jsx)(O,{...e}),play:async e=>{await M.click(await N(e.canvasElement).findByRole(`button`,{name:/filter workflows/i})),await y(/code or description/i)(e)}},H={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(C,{children:[(0,j.jsx)(D,{titulo:`In a toolbar`,nota:`El buscador primero, después Filter y las demás herramientas con el mismo botón (Columns). Así se ve la barra del Ledger.`,children:(0,j.jsxs)(`div`,{className:`flex h-48 flex-wrap items-start gap-3`,children:[(0,j.jsx)(`input`,{"aria-label":`Search`,placeholder:`Search by code, description or provider`,className:`h-9 w-[260px] rounded-md border border-line bg-white px-3 text-[13px] placeholder:text-ink-faint`}),(0,j.jsx)(v,{onClick:()=>{},className:`h-9`}),(0,j.jsx)(h,{}),(0,j.jsx)(c,{columnas:[{id:`fecha`,label:`Date`,bloqueada:!0},{id:`monto`,label:`Amount`}],ocultas:[],onToggle:()=>{},onReset:()=>{}}),(0,j.jsx)(c,{columnas:[{id:`fecha`,label:`Date`,bloqueada:!0},{id:`monto`,label:`Amount`}],ocultas:[`monto`],onToggle:()=>{},onReset:()=>{}})]})}),(0,j.jsx)(D,{titulo:`Trigger`,nota:`Medidas leídas del botón dibujado. El menú mide 248px de ancho.`,children:(0,j.jsxs)(E,{encabezado:[`Size`,`Sample`,`Height`,`Padding`,`Text`,`Icon`,`Radius`],minimo:720,children:[(0,j.jsx)(k,{size:`md`,count:0}),(0,j.jsx)(k,{size:`md`,count:2}),(0,j.jsx)(k,{size:`sm`,count:0})]})})]})},U=[`Playground`,`Parts`,`States`,`Open`,`Specs`],R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Trigger" nota="El mismo botón en todas las pantallas. Sin filtros, blanco; con filtros aplicados, azul con la cantidad.">
        <Muestras>
          <ConRotulo rotulo="md · none applied"><FilterTrigger /></ConRotulo>
          <ConRotulo rotulo="md · 2 applied"><FilterTrigger count={2} /></ConRotulo>
          <ConRotulo rotulo="sm · in card headers"><FilterTrigger size="sm" /></ConRotulo>
          <ConRotulo rotulo="sm · 1 applied"><FilterTrigger size="sm" count={1} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Option" nota="Nombre y cantidad; un estado lleva el punto de su color, una categoría su ícono.">
        <div className="flex w-[240px] flex-col gap-1 rounded-lg border border-line p-1 text-[13px]">
          {[ESTADOS[0]!, TIPOS[3]!, {
          value: 'Operatory 1',
          count: 3
        }, {
          value: 'No results',
          count: 0
        }].map(o => <div key={o.value} className="flex items-center gap-2 rounded-md px-2 py-1"><FilterOptionLabel o={o} /></div>)}
        </div>
      </Bloque>
    </Lienzo>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
      <tr><td className="font-semibold">Default</td><td><FilterTrigger /></td><td className="text-ink-medium">Sin filtros: se ve todo (o el valor por defecto, como Active en la Problem List).</td></tr>
      <tr><td className="font-semibold">Active</td><td><FilterTrigger count={2} /></td><td className="text-ink-medium">Hay filtros aplicados: azul con cuántos. Clear all los saca.</td></tr>
      <tr><td className="font-semibold">Disabled</td><td><FilterTrigger disabled /></td><td className="text-ink-medium">La tabla está cargando o es de sólo lectura.</td></tr>
    </Tabla>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    kind: 'with search'
  },
  render: args => <Demo {...args} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /filter workflows/i
    }));
    await esperar(/code or description/i)(c);
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="In a toolbar" nota="El buscador primero, después Filter y las demás herramientas con el mismo botón (Columns). Así se ve la barra del Ledger.">
        <div className="flex h-48 flex-wrap items-start gap-3">
          <input aria-label="Search" placeholder="Search by code, description or provider" className="h-9 w-[260px] rounded-md border border-line bg-white px-3 text-[13px] placeholder:text-ink-faint" />
          <SearchButton onClick={() => {}} className="h-9" />
          <FilterTrigger />
          <ColumnPicker columnas={[{
          id: 'fecha',
          label: 'Date',
          bloqueada: true
        }, {
          id: 'monto',
          label: 'Amount'
        }]} ocultas={[]} onToggle={() => {}} onReset={() => {}} />
          <ColumnPicker columnas={[{
          id: 'fecha',
          label: 'Date',
          bloqueada: true
        }, {
          id: 'monto',
          label: 'Amount'
        }]} ocultas={['monto']} onToggle={() => {}} onReset={() => {}} />
        </div>
      </Bloque>
      <Bloque titulo="Trigger" nota="Medidas leídas del botón dibujado. El menú mide 248px de ancho.">
        <Tabla encabezado={['Size', 'Sample', 'Height', 'Padding', 'Text', 'Icon', 'Radius']} minimo={720}>
          <Medida size="md" count={0} />
          <Medida size="md" count={2} />
          <Medida size="sm" count={0} />
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...H.parameters?.docs?.source}}}})))()}W();export{V as Open,z as Parts,R as Playground,H as Specs,B as States,U as __namedExportsOrder,P as default};
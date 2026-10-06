import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./circle-alert-C10ApoXx.js";import{n as a,t as o}from"./clipboard-list-BiftUctM.js";import{n as s,t as c}from"./siren-BDHT527r.js";import{n as l,t as u}from"./stethoscope-CtGSUjPD.js";import{i as d,n as f,r as p,t as m}from"./filter-menu-BSEGyoUv.js";import{n as h,r as g}from"./play-CDw6varG.js";import{a as _,d as v,i as y,l as b,n as x,s as S,t as C}from"./kit-VhBMbBcY.js";function w({kind:e,size:t,counts:n,disabled:r}){let[i,a]=(0,E.useState)([`Operatory 2`]),[o,s]=(0,E.useState)(`Active`),[c,l]=(0,E.useState)([]),[u,d]=(0,E.useState)(``),f=e=>n?e:{...e,count:void 0};return(0,D.jsxs)(`div`,{className:`flex h-80 items-start gap-4`,children:[e===`multiple`&&(0,D.jsx)(m,{label:`Filter appointments`,size:t,disabled:r,groups:[{title:`Operatory`,options:j.map((e,t)=>f({value:e,count:t+2})),value:i,onChange:a}]}),e===`single`&&(0,D.jsx)(m,{label:`Filter by status`,size:t,disabled:r,groups:[{type:`single`,title:`Status`,defaultValue:`Active`,options:M.map(f),value:o,onChange:s}]}),e===`with search`&&(0,D.jsx)(m,{label:`Filter workflows`,size:t,disabled:r,groups:[{title:`Workflow type`,options:N.map(f),value:c,onChange:l}],search:{label:`Code or description`,placeholder:`e.g. TRIAGE or Social`,value:u,onChange:d},result:`6 of 6 workflows`})]})}function T({size:e,count:t}){let{ref:n,m:r}=v();return(0,D.jsxs)(`tr`,{children:[(0,D.jsxs)(`td`,{className:`font-semibold`,children:[e,t?` · active`:``]}),(0,D.jsx)(`td`,{children:(0,D.jsx)(`div`,{ref:n,className:`inline-flex`,children:(0,D.jsx)(p,{size:e,count:t})})}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:r?.texto}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:r?.icono}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{E=t(),r(),a(),s(),l(),d(),b(),g(),D=n(),{userEvent:O,within:k}=__STORYBOOK_MODULE_TEST__,A={title:`Elements/Filter`,parameters:{layout:`padded`,docs:{description:{component:["El filtro de la app (`@/components/ui/filter-menu`), uno solo para todas las pantallas: Dashboard, Ledger, Accounts overview, la tabla estándar, la Problem List, Workflows y el buscador de procedimientos.",``,`**El botón** es siempre el mismo: ícono, "Filter" y, con filtros aplicados, azul con la cantidad. **El menú** tiene grupos de varias opciones (casillas) o de una (radio), cada opción con su cantidad y, si es un estado, el punto de su color; búsqueda opcional y Clear all. Se aplica al tocar.`,``,`**Tamaños:** md (36px) junto a buscadores; sm (28px) en encabezados de cards y paneles.`,``,`**Probalo:** en *Playground* cambiá el tipo de filtro, el tamaño y las cantidades desde *Controls*.`].join(`
`)}}},args:{kind:`multiple`,size:`md`,counts:!0,disabled:!1},argTypes:{kind:{control:`inline-radio`,options:[`multiple`,`single`,`with search`],description:`Varias opciones (casillas), una (radio, con un valor por defecto) o con búsqueda.`},size:{control:`inline-radio`,options:[`md`,`sm`],description:`md 36px junto a buscadores · sm 28px en encabezados de cards.`},counts:{control:`boolean`,description:`Cuántas filas tiene cada opción.`},disabled:{control:`boolean`,description:`Deshabilitado: la tabla está cargando o sin permiso.`}}},j=[`Operatory 1`,`Operatory 2`,`Operatory 3`],M=[{value:`Active`,tone:`success`,count:6},{value:`In treatment`,tone:`info`,count:1},{value:`Monitoring`,tone:`warning`,count:1},{value:`Discarded`,tone:`danger`,count:1}],N=[{value:`Procedure`,icon:u,count:1},{value:`Emergency`,icon:c,count:1},{value:`Complication`,icon:i,count:0,disabled:!0},{value:`Questionnaire`,icon:o,count:4}],P={render:e=>(0,D.jsx)(w,{...e})},F={parameters:{controls:{disable:!0}},render:()=>(0,D.jsxs)(y,{children:[(0,D.jsx)(C,{titulo:`Trigger`,nota:`El mismo botón en todas las pantallas. Sin filtros, blanco; con filtros aplicados, azul con la cantidad.`,children:(0,D.jsxs)(_,{children:[(0,D.jsx)(x,{rotulo:`md · none applied`,children:(0,D.jsx)(p,{})}),(0,D.jsx)(x,{rotulo:`md · 2 applied`,children:(0,D.jsx)(p,{count:2})}),(0,D.jsx)(x,{rotulo:`sm · in card headers`,children:(0,D.jsx)(p,{size:`sm`})}),(0,D.jsx)(x,{rotulo:`sm · 1 applied`,children:(0,D.jsx)(p,{size:`sm`,count:1})})]})}),(0,D.jsx)(C,{titulo:`Option`,nota:`Nombre y cantidad; un estado lleva el punto de su color, una categoría su ícono.`,children:(0,D.jsx)(`div`,{className:`flex w-[240px] flex-col gap-1 rounded-lg border border-line p-1 text-[13px]`,children:[M[0],N[3],{value:`Operatory 1`,count:3},{value:`No results`,count:0}].map(e=>(0,D.jsx)(`div`,{className:`flex items-center gap-2 rounded-md px-2 py-1`,children:(0,D.jsx)(f,{o:e})},e.value))})})]})},I={parameters:{controls:{disable:!0}},render:()=>(0,D.jsxs)(S,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Default`}),(0,D.jsx)(`td`,{children:(0,D.jsx)(p,{})}),(0,D.jsx)(`td`,{className:`text-ink-medium`,children:`Sin filtros: se ve todo (o el valor por defecto, como Active en la Problem List).`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Active`}),(0,D.jsx)(`td`,{children:(0,D.jsx)(p,{count:2})}),(0,D.jsx)(`td`,{className:`text-ink-medium`,children:`Hay filtros aplicados: azul con cuántos. Clear all los saca.`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Disabled`}),(0,D.jsx)(`td`,{children:(0,D.jsx)(p,{disabled:!0})}),(0,D.jsx)(`td`,{className:`text-ink-medium`,children:`La tabla está cargando o es de sólo lectura.`})]})]})},L={args:{kind:`with search`},render:e=>(0,D.jsx)(w,{...e}),play:async e=>{await O.click(await k(e.canvasElement).findByRole(`button`,{name:/filter workflows/i})),await h(/code or description/i)(e)}},R={parameters:{controls:{disable:!0}},render:()=>(0,D.jsx)(y,{children:(0,D.jsx)(C,{titulo:`Trigger`,nota:`Medidas leídas del botón dibujado. El menú mide 248px de ancho.`,children:(0,D.jsxs)(S,{encabezado:[`Size`,`Sample`,`Height`,`Padding`,`Text`,`Icon`,`Radius`],minimo:720,children:[(0,D.jsx)(T,{size:`md`,count:0}),(0,D.jsx)(T,{size:`md`,count:2}),(0,D.jsx)(T,{size:`sm`,count:0})]})})})},z=[`Playground`,`Parts`,`States`,`Open`,`Specs`],P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Trigger" nota="Medidas leídas del botón dibujado. El menú mide 248px de ancho.">
        <Tabla encabezado={['Size', 'Sample', 'Height', 'Padding', 'Text', 'Icon', 'Radius']} minimo={720}>
          <Medida size="md" count={0} />
          <Medida size="md" count={2} />
          <Medida size="sm" count={0} />
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...R.parameters?.docs?.source}}}})))()}B();export{L as Open,F as Parts,P as Playground,R as Specs,I as States,z as __namedExportsOrder,A as default};
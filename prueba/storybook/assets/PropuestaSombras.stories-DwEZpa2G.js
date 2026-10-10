import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{o as n,s as r}from"./Scheduling-C8Iq-S2-.js";import{n as i,t as a}from"./pantalla-CqjrW3qO.js";import{i as o,r as s}from"./button-R5lrVQ2-.js";import{i as c,n as l}from"./primitives-z7RugbbU.js";import{an as u,dn as d,in as f,ln as p,on as m,rn as h,sn as g,un as _,vt as v,xt as y}from"./iframe-EG2kAlYS.js";import{c as b,d as x,i as S,t as C}from"./kit-4bQS7S9u.js";import{o as w,u as T}from"./dashboard-data-7AI3s00y.js";function E({variante:e,children:t,className:n}){return(0,O.jsxs)(`div`,{"data-sombra":e,className:n,children:[(0,O.jsx)(`style`,{children:A}),t]})}function D({variante:e}){return(0,O.jsxs)(E,{variante:e,className:`flex w-[260px] flex-col gap-4`,children:[(0,O.jsxs)(u,{children:[(0,O.jsxs)(p,{className:`pb-1`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(_,{children:`Contact information`}),(0,O.jsx)(g,{children:`How the clinic reaches the patient.`})]}),(0,O.jsx)(s,{variant:`link`,size:`sm`,children:`Edit`})]}),(0,O.jsx)(m,{children:`sarah.stone@mail.com · (555) 010-2233`})]}),(0,O.jsx)(h,{title:`Appointments`,value:`6`,delta:`+2 vs yesterday`,icon:n}),(0,O.jsx)(l,{title:`Today Appointments`,bodyClassName:`gap-3`,children:w.slice(0,3).map(e=>(0,O.jsx)(v,{appt:e},e.name))})]})}var O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{r(),d(),o(),c(),y(),f(),T(),x(),i(),O=t(),k={actual:{nombre:`Current`,valor:`0 4px 14px 0 rgb(100 100 100 / 0.25)`,idea:`Gris neutro al 25% y 14px de blur: se ve un halo oscuro alrededor de toda la card, también arriba.`},a:{nombre:`A · Subtle`,valor:`0 1px 2px 0 rgb(16 24 40 / 0.06), 0 1px 3px 0 rgb(16 24 40 / 0.08)`,idea:`Casi plana: sólo una sombra de contacto que marca el borde. La card se separa del fondo por el blanco, no por la altura. La más calma para pantallas densas; la diferencia con la card de adentro se achica.`},b:{nombre:`B · Diffuse`,valor:`0 1px 2px 0 rgb(16 24 40 / 0.04), 0 4px 16px -2px rgb(16 24 40 / 0.10)`,idea:`La misma idea de hoy (la card apenas levantada) con un tercio de la intensidad: una sombra de contacto para el borde y una difusa que cae hacia abajo, sin halo arriba.`},c:{nombre:`C · Floating`,valor:`0 2px 4px -2px rgb(16 24 40 / 0.06), 0 16px 32px -8px rgb(16 24 40 / 0.14)`,idea:`Más altura y más aire: sombra amplia y muy clara, corrida hacia abajo. Se ve más liviana y "premium", pero el borde de arriba casi desaparece sobre el fondo #fafbfe y pide más separación entre cards.`}},A=Object.keys(k).filter(e=>e!==`actual`).map(e=>`[data-sombra="${e}"] .shadow-panel, [data-sombra="${e}"] .shadow-stat { --tw-shadow: ${k[e].valor}; }`).join(`
`),j={title:`Proposals/Card shadow`,parameters:{layout:`padded`,docs:{description:{component:["**Propuesta, no está aplicada.** La sombra de las cards madre (`shadow-panel`: `Card`, `Panel`, `TARJETA_PANEL`, `SectionCard`; y `shadow-stat` de los números del Dashboard) se ve dura. Tres variantes más suaves, las tres sin borde (regla del 2026-10-06), con el gris azulado del fondo de página en vez de gris neutro.",``,"La que se elija pasa a un solo token para **todas** las cards madre, también la tira de números del Dashboard, que hoy tiene una sombra propia. Las cards de adentro (`InnerCard`) no cambian.",``,`**Probalo:** en *Playground* cambiá la variante desde *Controls*; en *In the app* mirá cada variante en una pantalla real (Dashboard, Patients, la ficha del paciente).`].join(`
`)}}}},M={control:{type:`inline-radio`,labels:Object.fromEntries(Object.entries(k).map(([e,t])=>[e,t.nombre]))},options:Object.keys(k),description:`Sombra de las cards madre.`},N={args:{variante:`b`},argTypes:{variante:M},render:({variante:e})=>(0,O.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,O.jsx)(`div`,{className:`bg-page-background rounded-lg p-8`,children:(0,O.jsx)(D,{variante:e})}),(0,O.jsx)(`p`,{className:`max-w-[72ch] text-[13px] text-ink-muted`,children:k[e].idea})]})},P={name:`Side by side`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(`div`,{className:`bg-page-background flex flex-wrap gap-x-6 gap-y-8 rounded-lg p-6`,children:Object.keys(k).map(e=>(0,O.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,O.jsx)(`span`,{className:`text-[13px] font-semibold text-ink`,children:k[e].nombre}),(0,O.jsx)(D,{variante:e})]},e))})},F={name:`In the app`,tags:[`!autodocs`],args:{variante:`b`,pantalla:`/`},argTypes:{variante:M,pantalla:{control:{type:`select`,labels:{"/":`Dashboard`,"/patients":`Patients`,"/patients/patient-0001":`Patient overview`,"/billing":`Billing`,"/settings/general":`Settings`}},options:[`/`,`/patients`,`/patients/patient-0001`,`/billing`,`/settings/general`],description:`Pantalla de la app.`}},parameters:{layout:`fullscreen`,router:!1},render:({variante:e,pantalla:t})=>(0,O.jsx)(E,{variante:e,children:(0,O.jsx)(a,{ruta:t})},t)},I={parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(S,{children:[(0,O.jsx)(C,{titulo:`Values`,nota:`Las tres usan rgb(16 24 40), el gris azulado oscuro del texto, en vez del gris neutro de hoy: sobre el fondo #fafbfe la sombra se ve limpia y no sucia. Todas sin borde y con la sombra de contacto (1–2px) que marca el canto, porque el blanco de la card y el fondo casi no contrastan.`,children:(0,O.jsx)(b,{encabezado:[`Variant`,`box-shadow`,`Why`],minimo:760,arriba:!0,children:Object.keys(k).map(e=>(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:k[e].nombre}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:(0,O.jsx)(`code`,{className:`text-[12px]`,children:k[e].valor})}),(0,O.jsx)(`td`,{className:`text-ink-medium`,children:k[e].idea})]},e))})}),(0,O.jsx)(C,{titulo:`What changes`,children:(0,O.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,O.jsx)(`li`,{children:`One token: --shadow-panel in src/index.css. Every page card follows it (Card, Panel, TARJETA_PANEL, SectionCard, Settings cards, Clinical Mode panels).`}),(0,O.jsx)(`li`,{children:`shadow-stat (the Dashboard numbers) takes the same value: today it has its own shadow.`}),(0,O.jsx)(`li`,{children:`Unchanged: InnerCard (shadow-inner-card), drawers, menus and the blue ring on hover and selection.`})]})})]})},L=[`Playground`,`SideBySide`,`InTheApp`,`Specs`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    variante: 'b'
  },
  argTypes: {
    variante: CONTROL_VARIANTE
  },
  render: ({
    variante
  }) => <div className="flex flex-col gap-3">
      <div className="bg-page-background rounded-lg p-8"><Muestra variante={variante} /></div>
      <p className="max-w-[72ch] text-[13px] text-ink-muted">{VARIANTES[variante].idea}</p>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Side by side',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="bg-page-background flex flex-wrap gap-x-6 gap-y-8 rounded-lg p-6">
      {(Object.keys(VARIANTES) as Variante[]).map(v => <div key={v} className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold text-ink">{VARIANTES[v].nombre}</span>
          <Muestra variante={v} />
        </div>)}
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'In the app',
  tags: ['!autodocs'],
  args: {
    variante: 'b',
    pantalla: '/'
  },
  argTypes: {
    variante: CONTROL_VARIANTE,
    pantalla: {
      control: {
        type: 'select' as const,
        labels: {
          '/': 'Dashboard',
          '/patients': 'Patients',
          '/patients/patient-0001': 'Patient overview',
          '/billing': 'Billing',
          '/settings/general': 'Settings'
        }
      },
      options: ['/', '/patients', '/patients/patient-0001', '/billing', '/settings/general'],
      description: 'Pantalla de la app.'
    }
  },
  parameters: {
    layout: 'fullscreen',
    router: false
  },
  render: ({
    variante,
    pantalla
  }) => <ConVariante key={pantalla} variante={variante}>
      <PantallaReal ruta={pantalla} />
    </ConVariante>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Values" nota="Las tres usan rgb(16 24 40), el gris azulado oscuro del texto, en vez del gris neutro de hoy: sobre el fondo #fafbfe la sombra se ve limpia y no sucia. Todas sin borde y con la sombra de contacto (1–2px) que marca el canto, porque el blanco de la card y el fondo casi no contrastan.">
        <Tabla encabezado={['Variant', 'box-shadow', 'Why']} minimo={760} arriba>
          {(Object.keys(VARIANTES) as Variante[]).map(v => <tr key={v}>
              <td className="font-semibold whitespace-nowrap">{VARIANTES[v].nombre}</td>
              <td className="tabular-nums"><code className="text-[12px]">{VARIANTES[v].valor}</code></td>
              <td className="text-ink-medium">{VARIANTES[v].idea}</td>
            </tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="What changes">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One token: --shadow-panel in src/index.css. Every page card follows it (Card, Panel, TARJETA_PANEL, SectionCard, Settings cards, Clinical Mode panels).</li>
          <li>shadow-stat (the Dashboard numbers) takes the same value: today it has its own shadow.</li>
          <li>Unchanged: InnerCard (shadow-inner-card), drawers, menus and the blue ring on hover and selection.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...I.parameters?.docs?.source}}}})))()}R();export{F as InTheApp,N as Playground,P as SideBySide,I as Specs,L as __namedExportsOrder,j as default};
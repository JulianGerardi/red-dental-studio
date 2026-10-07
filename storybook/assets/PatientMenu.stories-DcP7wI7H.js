import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{c as n,l as r,r as i,s as a,t as o,u as s}from"./chunk-62JRHF6Z-W7Abf350.js";import{t as c}from"./jsx-runtime-DeHZSEgm.js";import{r as l,t as u}from"./toaster-B6mRBNx3.js";import{Ft as d,It as f,Mt as p,Nt as m,Pt as h,jt as g}from"./iframe-Crjbd9Sa.js";import{c as _,l as v,r as y,s as b,t as x,u as S}from"./kit-VhBMbBcY.js";function C(e,t){switch(e){case`section tooltip`:return{collapsed:!0,tooltip:`Ledger`};case`status tooltip`:return{collapsed:!0,tooltip:`${t} · Active · 50 years`};case`patient information`:return{collapsed:!0,infoCard:!0};case`encounter options`:return{collapsed:!1,encounterOptions:!0};default:return{}}}function w({ruta:e,seccion:t}){let n=(0,A.useRef)(null),[r,i]=(0,A.useState)(0);(0,A.useLayoutEffect)(()=>{let e=n.current;if(!e)return;let t=()=>i(Math.round(e.getBoundingClientRect().width));t();let r=new ResizeObserver(t);return r.observe(e),()=>r.disconnect()},[]);let a=e.endsWith(`/clinical-mode`)?`Clinical Mode, full screen`:e===`/patients/edit`?`the patient form (General)`:e;return(0,j.jsx)(`div`,{ref:n,className:`flex min-h-[220px] min-w-0 flex-1 flex-col items-center justify-center gap-1.5 self-stretch rounded-lg border border-dashed border-ink-faint/60 p-6 text-center`,children:t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(`p`,{className:`text-[13px] font-semibold text-ink`,children:[t,` screen`]}),(0,j.jsxs)(`p`,{className:`text-[12px] text-ink-muted tabular-nums`,children:[`Available width: `,r,` px`]}),(0,j.jsx)(`p`,{className:`font-mono text-[11px] text-ink-faint`,children:e})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`p`,{className:`text-[13px] font-semibold text-ink`,children:`Leaves the patient menu`}),(0,j.jsxs)(`p`,{className:`text-[12px] text-ink-muted`,children:[`Opens `,a,`.`]}),(0,j.jsx)(o,{to:M,className:`text-[12px] font-medium text-dash-blue underline`,children:`Back to Overview`})]})})}function T({name:e,pantalla:t}){let{pathname:n}=s(),r=P(n);return(0,j.jsxs)(`div`,{className:`flex flex-col gap-4 lg:flex-row lg:items-start`,children:[(0,j.jsx)(g,{name:e,initials:F(e),section:r??``,basePath:M}),t&&(0,j.jsx)(w,{ruta:n,seccion:r})]})}function E({section:e=`Overview`,name:t=`John Smith`,preview:r={},pantalla:o=!1}){return(0,j.jsx)(d.Provider,{value:r,children:(0,j.jsx)(i,{initialEntries:[`${M}${N[e]}`],children:(0,j.jsx)(n,{children:(0,j.jsx)(a,{path:`*`,element:(0,j.jsx)(T,{name:t,pantalla:o})})})},e)})}function D({collapsed:e,encounter:t}){return(0,A.useEffect)(()=>{h(e),m(t)},[e,t]),null}function O({titulo:e,nota:t,ancho:n,children:r}){return(0,j.jsxs)(`figure`,{className:`m-0 flex flex-col gap-2`,style:{width:n},children:[(0,j.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,j.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,j.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),r]})}function k(){let e=(0,A.useRef)(null),t=(0,A.useRef)(null),[n,r]=(0,A.useState)([]);return(0,A.useLayoutEffect)(()=>{r(W.map(([,n,r])=>{let i=(n===`exp`?e:t).current?.querySelector(r);return i?S(i):null}))},[]),(0,j.jsxs)(`div`,{className:`flex flex-col gap-6 lg:flex-row lg:items-start`,children:[(0,j.jsxs)(`div`,{className:`flex shrink-0 items-start gap-4`,children:[(0,j.jsx)(`div`,{ref:e,children:(0,j.jsx)(E,{preview:V})}),(0,j.jsx)(`div`,{ref:t,children:(0,j.jsx)(E,{preview:H})})]}),(0,j.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col gap-8`,children:[(0,j.jsx)(x,{titulo:`Sizes`,nota:`Medidas leídas de los dos menús de al lado, en computadora.`,children:(0,j.jsx)(b,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:560,children:W.map(([e],t)=>{let r=n[t];return(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,j.jsx)(G,{})]})]})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{A=t(),r(),p(),f(),l(),v(),j=c(),M=`/patients/abril-viola`,N={Overview:``,Treatments:`/treatments`,Insurance:`/insurance`,Ledger:`/ledger`,Documents:`/documents`,"Relationships & Billing":`/relationships`},P=e=>Object.entries(N).find(([,t])=>`${M}${t}`===e)?.[0]??null,F=e=>e.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0]).join(``).toUpperCase(),I={title:`Elements/Patient menu`,parameters:{layout:`fullscreen`,router:!1,docs:{decisionsFrom:`components/patients/PatientSidePanel.tsx`,description:{component:["El panel de la izquierda en todas las pantallas de un paciente (`@/components/patients/PatientSidePanel`). Acá está solo: las pantallas de cada sección están en *Pages*.",``,`Hace tres cosas: **dice quién es el paciente** (foto, nombre, estado, edad), **lleva a cada sección** de su ficha y **arranca la atención** (encuentro y Clinical Mode). Abajo tiene sus datos generales y de contacto.`,``,`Se colapsa de 218px a 60px para darle ancho a la pantalla (el Ledger lo necesita) y lo recuerda al pasar de una sección a otra. En pantallas de menos de 1024px no colapsa: las secciones pasan a una tira horizontal (ver *On each device*).`,``,`**Probalo:** en *Playground* tocá las secciones, colapsá con el botón de arriba del panel y mirá cuánto ancho gana el recuadro; pasá el mouse por los íconos colapsados y por la tarjeta de ficha; cambiá el encuentro con el chevron. Con *open* dejás abierto cada tooltip o menú.`].join(`
`)}}},args:{section:`Overview`,collapsed:!1,encounter:`start`,name:`John Smith`,open:`nothing`},argTypes:{section:{control:`select`,options:Object.keys(N),description:`Sección abierta: queda en azul. En la app es la ruta; acá también cambia al tocar el menú.`},collapsed:{control:`boolean`,description:`Expandido (218px) o colapsado (60px). En la app, con el botón de arriba del panel.`},encounter:{control:`inline-radio`,options:[`start`,`pending`],description:`Start Encounter (verde) o Pending Encounter (ámbar).`},name:{control:`text`,description:`Nombre del paciente: las iniciales de la foto salen de acá. Probá uno largo.`},open:{control:`select`,options:[`nothing`,`section tooltip`,`status tooltip`,`patient information`,`encounter options`],description:`Deja abierto lo que en la app se abre con el mouse. Los tooltips y la tarjeta sólo existen colapsado: al elegirlos, el menú se colapsa.`,table:{category:`Preview`}}}},L=({children:e})=>(0,j.jsx)(`div`,{className:`bg-page-background min-h-[760px] p-4 sm:p-6`,children:e}),R={loaders:[async({args:e})=>(h(!!e.collapsed),m(e.encounter??`start`),{})],render:e=>(0,j.jsxs)(L,{children:[(0,j.jsx)(E,{section:e.section,name:e.name,preview:C(e.open,e.name),pantalla:!0}),(0,j.jsx)(D,{collapsed:e.collapsed,encounter:e.encounter}),(0,j.jsx)(u,{})]})},z=[[`Collapse button`,`Colapsa a 60px o expande a 218px. Se recuerda al cambiar de sección. Sólo en pantallas de 1024px o más.`,`Cambia a "expand".`],[`Photo`,`Iniciales en azul hasta que se sube una foto; al tocarla se cambia.`,`Baja a 36px, con un punto verde por el estado.`],[`Name · status · age`,`Quién es el paciente. El estado es la misma pill verde de las tablas.`,`Se leen en el tooltip del punto verde.`],[`Encounter`,`Start Encounter (verde) arranca la atención; Pending Encounter (ámbar) la deja en espera. El chevron cambia entre los dos.`,`No se muestra.`],[`Clinical Mode`,`Abre la ficha clínica a pantalla completa (odontograma, exámenes).`,`Ícono de ojo con tooltip.`],[`Sections`,`Las seis partes de la ficha. La actual va en azul; cada una abre su pantalla.`,`Sólo íconos, con el nombre en un tooltip.`],[`General · Contact`,`Datos del paciente. El lápiz edita: General abre la ficha del paciente, Contact un modal.`,`Ícono de ficha: al pasar el mouse abre una tarjeta con los dos bloques.`]],B={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(L,{children:(0,j.jsxs)(`div`,{className:`flex flex-col gap-6 lg:flex-row lg:items-start`,children:[(0,j.jsx)(E,{preview:{collapsed:!1,encounter:`start`}}),(0,j.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,j.jsx)(b,{encabezado:[`Part`,`What it does`,`When collapsed`],minimo:560,arriba:!0,children:z.map(([e,t,n])=>(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:n})]},e))})})]})})},V={collapsed:!1,encounter:`start`},H={collapsed:!0,encounter:`start`},U={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(L,{children:(0,j.jsxs)(`div`,{className:`flex flex-col gap-10`,children:[(0,j.jsx)(x,{titulo:`Expanded · 218px`,children:(0,j.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,j.jsx)(O,{titulo:`Default`,nota:`La sección actual en azul.`,ancho:218,children:(0,j.jsx)(E,{preview:V})}),(0,j.jsx)(O,{titulo:`Hover on a section`,nota:`Fondo gris: se puede elegir.`,ancho:218,children:(0,j.jsx)(y,{selector:`a[href$="/insurance"]`,estado:`hover`,children:(0,j.jsx)(E,{preview:V})})}),(0,j.jsx)(O,{titulo:`Keyboard focus`,nota:`Anillo azul al llegar con Tab.`,ancho:218,children:(0,j.jsx)(y,{selector:`a[href$="/ledger"]`,estado:`focus-visible`,children:(0,j.jsx)(E,{preview:V})})}),(0,j.jsx)(O,{titulo:`Pending encounter`,nota:`Ámbar con pausa: la atención quedó en espera.`,ancho:218,children:(0,j.jsx)(E,{preview:{collapsed:!1,encounter:`pending`}})}),(0,j.jsx)(O,{titulo:`Encounter options`,nota:`El chevron abre los dos estados; el actual en azul.`,ancho:218,children:(0,j.jsx)(E,{preview:{...V,encounterOptions:!0}})})]})}),(0,j.jsx)(x,{titulo:`Collapsed · 60px`,children:(0,j.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,j.jsx)(O,{titulo:`Collapsed`,nota:`Sólo íconos; el estado es el punto verde.`,ancho:120,children:(0,j.jsx)(E,{preview:H})}),(0,j.jsx)(O,{titulo:`Tooltip on a section`,nota:`El nombre aparece a la derecha al pasar el mouse.`,ancho:200,children:(0,j.jsx)(E,{preview:{...H,tooltip:`Ledger`}})}),(0,j.jsx)(O,{titulo:`Patient status`,nota:`Nombre, estado y edad en el tooltip del punto.`,ancho:260,children:(0,j.jsx)(E,{preview:{...H,tooltip:`John Smith · Active · 50 years`}})}),(0,j.jsx)(O,{titulo:`Patient information`,nota:`General y Contact en una tarjeta, al pasar el mouse por la ficha.`,ancho:340,children:(0,j.jsx)(E,{preview:{...H,infoCard:!0}})})]})})]})})},W=[[`Panel · expanded`,`exp`,`aside`],[`Panel · collapsed`,`col`,`aside`],[`Section · expanded`,`exp`,`nav a`],[`Section · collapsed`,`col`,`nav a`],[`Encounter`,`exp`,`.relative.w-full > span`],[`Clinical Mode`,`exp`,`a[href$="/clinical-mode"]`],[`Photo · expanded`,`exp`,`aside .rounded-full`],[`Photo · collapsed`,`col`,`aside .rounded-full`]],G=()=>(0,j.jsx)(x,{titulo:`Colors`,children:(0,j.jsxs)(b,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Panel`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(_,{nombre:`white`}),` · border `,(0,j.jsx)(_,{nombre:`line`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Active section`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(_,{nombre:`dash-blue`}),` · text `,(0,j.jsx)(_,{nombre:`white`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(_,{nombre:`surface-muted`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Start Encounter`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(_,{nombre:`green`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Pending Encounter`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(_,{nombre:`amber`}),` · text `,(0,j.jsx)(_,{nombre:`[#7a4a00]`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Clinical Mode`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(_,{nombre:`[#eef5ff]`}),` · text `,(0,j.jsx)(_,{nombre:`dash-blue`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Photo`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(_,{nombre:`dash-blue-hover`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Status`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(_,{nombre:`dash-ok-bg`}),` · `,(0,j.jsx)(_,{nombre:`dash-ok-fg`}),` · dot `,(0,j.jsx)(_,{nombre:`green`})]})]})]})}),K={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(L,{children:(0,j.jsx)(k,{})})},q=[`Playground`,`Parts`,`States`,`Specs`],R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  loaders: [async ({
    args
  }) => {
    setPatientMenuCollapsed(!!args.collapsed);
    setEncounterState(args.encounter ?? 'start');
    return {};
  }],
  render: args => <Fondo>
      <Menu section={args.section} name={args.name} preview={previewDe(args.open, args.name)} pantalla />
      <Sincronizar collapsed={args.collapsed} encounter={args.encounter} />
      <Toaster />
    </Fondo>
}`,...R.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Menu preview={{
        collapsed: false,
        encounter: 'start'
      }} />
        <div className="min-w-0 flex-1">
          <Tabla encabezado={['Part', 'What it does', 'When collapsed']} minimo={560} arriba>
            {PARTES.map(([parte, que, colapsado]) => <tr key={parte}>
                <td className="font-semibold whitespace-nowrap">{parte}</td>
                <td className="text-ink-medium">{que}</td>
                <td className="text-ink-medium">{colapsado}</td>
              </tr>)}
          </Tabla>
        </div>
      </div>
    </Fondo>
}`,...B.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Expanded · 218px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Default" nota="La sección actual en azul." ancho={218}>
              <Menu preview={EXPANDIDO} />
            </Estado>
            <Estado titulo="Hover on a section" nota="Fondo gris: se puede elegir." ancho={218}>
              <Forzar selector='a[href$="/insurance"]' estado="hover"><Menu preview={EXPANDIDO} /></Forzar>
            </Estado>
            <Estado titulo="Keyboard focus" nota="Anillo azul al llegar con Tab." ancho={218}>
              <Forzar selector='a[href$="/ledger"]' estado="focus-visible"><Menu preview={EXPANDIDO} /></Forzar>
            </Estado>
            <Estado titulo="Pending encounter" nota="Ámbar con pausa: la atención quedó en espera." ancho={218}>
              <Menu preview={{
              collapsed: false,
              encounter: 'pending'
            }} />
            </Estado>
            <Estado titulo="Encounter options" nota="El chevron abre los dos estados; el actual en azul." ancho={218}>
              <Menu preview={{
              ...EXPANDIDO,
              encounterOptions: true
            }} />
            </Estado>
          </div>
        </Bloque>
        <Bloque titulo="Collapsed · 60px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Collapsed" nota="Sólo íconos; el estado es el punto verde." ancho={120}>
              <Menu preview={COLAPSADO} />
            </Estado>
            <Estado titulo="Tooltip on a section" nota="El nombre aparece a la derecha al pasar el mouse." ancho={200}>
              <Menu preview={{
              ...COLAPSADO,
              tooltip: 'Ledger'
            }} />
            </Estado>
            <Estado titulo="Patient status" nota="Nombre, estado y edad en el tooltip del punto." ancho={260}>
              <Menu preview={{
              ...COLAPSADO,
              tooltip: 'John Smith · Active · 50 years'
            }} />
            </Estado>
            <Estado titulo="Patient information" nota="General y Contact en una tarjeta, al pasar el mouse por la ficha." ancho={340}>
              <Menu preview={{
              ...COLAPSADO,
              infoCard: true
            }} />
            </Estado>
          </div>
        </Bloque>
      </div>
    </Fondo>
}`,...U.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Medidas />
    </Fondo>
}`,...K.parameters?.docs?.source}}}})))()}J();export{B as Parts,R as Playground,K as Specs,U as States,q as __namedExportsOrder,I as default};
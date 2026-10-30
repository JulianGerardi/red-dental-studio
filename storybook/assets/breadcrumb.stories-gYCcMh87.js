import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{ct as n,st as r}from"./iframe-Dl16-5f_.js";import{a as i,c as a,d as o,i as s,l as c,p as l,r as u,t as d,u as f}from"./kit-CWUgB5-0.js";import{n as p,t as m}from"./PatientBreadcrumb-HxFurT5S.js";function h(){let{ref:e,m:t}=l(`nav`);return(0,g.jsxs)(`div`,{ref:e,children:[(0,g.jsx)(r,{items:_(`Patients > John Smith > Ledger`)}),(0,g.jsxs)(`p`,{className:`mt-3 text-[12px] text-ink-muted tabular-nums`,children:[`Measured: `,t?.texto,` · `,t?.peso,` · height `,t?.alto,` · gap `,t?.gap]})]})}var g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{n(),p(),o(),g=t(),_=e=>{let t=e.split(`>`).map(e=>e.trim()).filter(Boolean);return t.map((e,n)=>({label:e,to:n<t.length-1?`#`:void 0}))},v={title:`Elements/Breadcrumb`,parameters:{layout:`padded`,docs:{description:{component:['El rastro de navegación (`@/components/ui/breadcrumb`): dice dónde estás y cada tramo, menos el último, lleva de vuelta. El último es la pantalla actual: va en gris, no es link y lleva `aria-current="page"`.',``,"**Dónde va (Julián, 2026-10-13):** sólo en las pantallas a las que **se entra desde otra**. Las de primer nivel —las que se abren desde el menú lateral o el de la cuenta: Dashboard, Patients, Scheduling, Billing, Help, Notifications, Settings y Profile— **no llevan**. La pantalla nunca lo escribe a mano: en Settings lo arma el layout a partir de la ruta y en las pantallas del paciente `PatientBreadcrumb` (*Patients / paciente / sección*). Ver *Where it goes* en *Specs*.",``,`**Probalo:** en *Playground* escribí el rastro desde *Controls*, separando los tramos con ">"; pasá el mouse y llegá con Tab a los links.`].join(`
`)}}},args:{trail:`Patients > John Smith > Ledger`},argTypes:{trail:{control:`text`,description:`Tramos separados por ">". El último es la pantalla actual.`}}},y={controls:{disable:!0}},b={render:({trail:e})=>(0,g.jsx)(r,{items:_(e)})},x={parameters:y,render:()=>(0,g.jsxs)(s,{children:[(0,g.jsx)(d,{nota:`Un rastro de tres tramos: los dos primeros llevan de vuelta, el tercero es donde estás.`,children:(0,g.jsx)(r,{items:_(`Patients > John Smith > Ledger`)})}),(0,g.jsx)(c,{partes:[[`Link`,`Un nivel de arriba: lleva a esa pantalla. Azul, subrayado con el mouse, anillo azul con Tab.`,`items[i].to`],[`Separator`,`Una "/" en gris tenue entre tramos (Julián, 2026-10-17); no se lee en voz alta.`,`span aria-hidden`],[`Current screen`,`El último tramo, sin link (llevaría al mismo lugar), en gris y con aria-current="page".`,`items[last] sin to`]]})]})},S={parameters:y,render:()=>(0,g.jsx)(s,{children:(0,g.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,g.jsx)(i,{titulo:`Default`,nota:`Dos niveles arriba y la pantalla actual.`,children:(0,g.jsx)(r,{items:_(`Patients > John Smith > Ledger`)})}),(0,g.jsx)(i,{titulo:`Hover on a link`,nota:`Subrayado: se puede volver.`,children:(0,g.jsx)(u,{selector:`a`,estado:`hover`,children:(0,g.jsx)(r,{items:_(`Patients > John Smith > Ledger`)})})}),(0,g.jsx)(i,{titulo:`Keyboard focus`,nota:`Anillo azul al llegar con Tab, el de los botones.`,children:(0,g.jsx)(u,{selector:`a`,estado:`focus-visible`,children:(0,g.jsx)(r,{items:_(`Patients > John Smith > Ledger`)})})}),(0,g.jsx)(i,{titulo:`Patient overview`,nota:`En el Overview el rastro termina en el paciente.`,children:(0,g.jsx)(m,{className:`mb-0`,name:`John Smith`})}),(0,g.jsx)(i,{titulo:`Long trail, narrow screen`,nota:`Baja de renglón entre tramos; ninguno se corta.`,ancho:260,children:(0,g.jsx)(r,{items:_(`Settings > Billing > Carriers > Aetna Dental Plans > Acme Corp`)})}),(0,g.jsx)(i,{titulo:`First-level screen`,nota:`Patients, Billing, Dashboard…: sin rastro. El título dice dónde estás.`,children:(0,g.jsx)(`p`,{className:`text-[12px] text-ink-faint`,children:`(no breadcrumb)`})})]})})},C=[[`Dashboard · Patients · Scheduling · Billing · Help · Notifications`,`—`],[`Settings (General) · Profile (/settings/account)`,`—`],[`Patient overview`,`Patients / John Smith`],[`Patient section (Treatments, Insurance, Ledger, Documents, Relationships & Billing)`,`Patients / John Smith / Ledger`],[`Add Relationship (drawer over the list)`,`Patients / John Smith / Relationships & Billing`],[`Edit Patient`,`Patients / John Smith / Edit Patient`],[`Settings section`,`Settings / Locations`],[`Settings item`,`Settings / Locations / Abril`],[`Settings / Billing`,`Settings / Billing / Carriers / Aetna Dental Plans`],[`A /new that opens a drawer`,`Ends in the list: Settings / Employees`]],w={parameters:y,render:()=>(0,g.jsxs)(s,{children:[(0,g.jsx)(d,{titulo:`Where it goes`,nota:`Primer nivel sin rastro; todo lo que se abre desde otra pantalla, con el camino desde el primer nivel.`,children:(0,g.jsx)(a,{encabezado:[`Screen`,`Breadcrumb`],minimo:640,children:C.map(([e,t])=>(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:e}),(0,g.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})}),(0,g.jsxs)(d,{titulo:`Type and spacing`,nota:`Medido sobre el rastro dibujado.`,children:[(0,g.jsx)(h,{}),(0,g.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,g.jsx)(`li`,{children:`13px, links Regular. Separador "/" en ink-faint, con 6px a cada lado.`}),(0,g.jsx)(`li`,{children:`Settings: 20px desde arriba de la página. Paciente: arriba de la página, 16px sobre el panel y el contenido.`})]})]}),(0,g.jsx)(d,{titulo:`Colors`,children:(0,g.jsxs)(a,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,g.jsxs)(`td`,{children:[(0,g.jsx)(f,{nombre:`dash-blue`}),` · focus `,(0,g.jsx)(f,{nombre:`dash-blue`})]})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Separator`}),(0,g.jsx)(`td`,{children:(0,g.jsx)(f,{nombre:`ink-faint`})})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Current screen`}),(0,g.jsx)(`td`,{children:(0,g.jsx)(f,{nombre:`ink-muted`})})]})]})})]})},T=[`Playground`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: ({
    trail
  }) => <Breadcrumb items={migas(trail)} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Un rastro de tres tramos: los dos primeros llevan de vuelta, el tercero es donde estás.">
        <Breadcrumb items={migas('Patients > John Smith > Ledger')} />
      </Bloque>
      <TablaPartes partes={[['Link', 'Un nivel de arriba: lleva a esa pantalla. Azul, subrayado con el mouse, anillo azul con Tab.', 'items[i].to'], ['Separator', 'Una "/" en gris tenue entre tramos (Julián, 2026-10-17); no se lee en voz alta.', 'span aria-hidden'], ['Current screen', 'El último tramo, sin link (llevaría al mismo lugar), en gris y con aria-current="page".', 'items[last] sin to']]} />
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Default" nota="Dos niveles arriba y la pantalla actual.">
          <Breadcrumb items={migas('Patients > John Smith > Ledger')} />
        </Muestra>
        <Muestra titulo="Hover on a link" nota="Subrayado: se puede volver.">
          <Forzar selector="a" estado="hover"><Breadcrumb items={migas('Patients > John Smith > Ledger')} /></Forzar>
        </Muestra>
        <Muestra titulo="Keyboard focus" nota="Anillo azul al llegar con Tab, el de los botones.">
          <Forzar selector="a" estado="focus-visible"><Breadcrumb items={migas('Patients > John Smith > Ledger')} /></Forzar>
        </Muestra>
        <Muestra titulo="Patient overview" nota="En el Overview el rastro termina en el paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" />
        </Muestra>
        <Muestra titulo="Long trail, narrow screen" nota="Baja de renglón entre tramos; ninguno se corta." ancho={260}>
          <Breadcrumb items={migas('Settings > Billing > Carriers > Aetna Dental Plans > Acme Corp')} />
        </Muestra>
        <Muestra titulo="First-level screen" nota="Patients, Billing, Dashboard…: sin rastro. El título dice dónde estás.">
          <p className="text-[12px] text-ink-faint">(no breadcrumb)</p>
        </Muestra>
      </div>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Where it goes" nota="Primer nivel sin rastro; todo lo que se abre desde otra pantalla, con el camino desde el primer nivel.">
        <Tabla encabezado={['Screen', 'Breadcrumb']} minimo={640}>
          {DONDE.map(([pantalla, rastro]) => <tr key={pantalla}><td className="font-semibold">{pantalla}</td><td className="text-ink-medium">{rastro}</td></tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and spacing" nota="Medido sobre el rastro dibujado.">
        <Medida />
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>13px, links Regular. Separador "/" en ink-faint, con 6px a cada lado.</li>
          <li>Settings: 20px desde arriba de la página. Paciente: arriba de la página, 16px sobre el panel y el contenido.</li>
        </ul>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Link</td><td><Token nombre="dash-blue" /> · focus <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Separator</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Current screen</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}}})))()}E();export{x as Parts,b as Playground,w as Specs,S as States,T as __namedExportsOrder,v as default};
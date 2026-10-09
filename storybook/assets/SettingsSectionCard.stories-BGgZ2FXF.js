import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./landmark-keQdMzmY.js";import{a as i,t as a}from"./Settings-Dm7pzceE.js";import{n as o,t as s}from"./receipt-DWHAnRyY.js";import{n as c,t as l}from"./shield-check-C14uC3Wq.js";import{n as u,t as d}from"./sliders-horizontal-YdgkuTmM.js";import{i as f,n as p,r as m,t as h}from"./SettingsSectionCard-CiMyJepO.js";import{a as g,c as _,d as v,i as y,l as b,o as x,p as S,r as C,t as w,u as T}from"./kit-4bQS7S9u.js";import{c as E,d as D}from"./mock-i2EtIAf1.js";function O({sel:e,parte:t}){let{ref:n,m:r}=S(e);return(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:t}),(0,k.jsx)(`td`,{className:`w-[260px]`,children:(0,k.jsx)(`div`,{ref:n,children:(0,k.jsx)(h,{to:`#`,icon:s,title:`Fee Schedules`,description:`What your office charges.`,detail:`5 active schedules`})})}),(0,k.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,k.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:``}),(0,k.jsx)(`td`,{className:`tabular-nums`,children:r?.padding})]})}var k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{n(),o(),c(),u(),f(),p(),D(),i(),v(),k=t(),A={title:`Components/Settings/SettingsSectionCard`,component:h,parameters:{layout:`padded`,docs:{description:{component:["La card de una portada (`@/components/settings/SettingsSectionCard`): ícono, título y bajada, y la card entera es el link. La usan la portada de Settings y la de Billing.",``,`**detail** (2026-10-08): un dato al pie, en azul, para las portadas de una sección ("5 active schedules · Default: UCR - Red"). Sin detail se ve como antes.`,``,`**Probalo:** en *Playground* cambiá título, bajada y *detail* desde *Controls*.`].join(`
`)}}},args:{to:`/settings/accounts`,icon:m,title:`Accounts`,description:`Manage your account and their access.`,detail:``},argTypes:{icon:{control:!1},to:{control:`text`,description:`A dónde lleva.`},detail:{control:`text`,description:`Dato al pie. Vacío = sin pie.`}},decorators:[e=>(0,k.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,k.jsx)(`div`,{className:`w-[320px] max-w-full`,children:(0,k.jsx)(e,{})})})]},j={controls:{disable:!0}},M=e=>(0,k.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,k.jsx)(e,{})}),N={},P={parameters:j,decorators:[M],render:()=>(0,k.jsxs)(y,{children:[(0,k.jsx)(`div`,{className:`w-[320px]`,children:(0,k.jsx)(h,{to:`/settings/finance/carriers`,icon:r,title:`Carriers`,description:`The insurance companies you bill and their plans.`,detail:`8 carriers · 10 plans`})}),(0,k.jsx)(b,{partes:[[`Icon`,`Cuadro de 44px con el ícono de la sección.`,`LucideIcon`],[`Title`,`15px bold.`,`h2`],[`Description`,`Qué hay adentro, en una o dos líneas.`,`p`],[`Detail`,`Opcional: un dato al pie en azul, para las portadas de una sección.`,`detail`]]})]})},F={parameters:j,decorators:[M],render:()=>(0,k.jsxs)(y,{children:[(0,k.jsxs)(x,{children:[(0,k.jsx)(g,{titulo:`Default`,ancho:300,children:(0,k.jsx)(h,{to:`#`,icon:m,title:`Accounts`,description:`Manage your account and their access.`})}),(0,k.jsx)(g,{titulo:`Hover`,nota:`Anillo azul tenue.`,ancho:300,children:(0,k.jsx)(C,{selector:`a > div`,estado:`hover`,children:(0,k.jsx)(h,{to:`#`,icon:m,title:`Accounts`,description:`Manage your account and their access.`})})}),(0,k.jsx)(g,{titulo:`With detail`,ancho:300,children:(0,k.jsx)(h,{to:`#`,icon:s,title:`Fee Schedules`,description:`What your office charges for each procedure.`,detail:`5 active schedules · Default: UCR - Red`})})]}),(0,k.jsx)(w,{titulo:`Settings home`,nota:`Una card por sección.`,children:(0,k.jsx)(`div`,{className:`grid gap-5 md:grid-cols-2 xl:grid-cols-3`,children:E.map(e=>(0,k.jsx)(h,{to:e.to,icon:a[e.icon]??d,title:e.title,description:e.desc},e.to))})}),(0,k.jsx)(w,{titulo:`Billing home`,nota:`Las tres tablas de Billing, con detail.`,children:(0,k.jsxs)(`div`,{className:`grid gap-5 md:grid-cols-3`,children:[(0,k.jsx)(h,{to:`#`,icon:s,title:`Fee Schedules`,description:`What your office charges for each procedure.`,detail:`5 active schedules`}),(0,k.jsx)(h,{to:`#`,icon:r,title:`Carriers`,description:`The insurance companies you bill and their plans.`,detail:`8 carriers · 10 plans`}),(0,k.jsx)(h,{to:`#`,icon:l,title:`Coverage Tables`,description:`What each plan pays by procedure category.`,detail:`5 active tables`})]})})]})},I={parameters:j,decorators:[M],render:()=>(0,k.jsxs)(y,{children:[(0,k.jsx)(w,{titulo:`Sizes`,nota:`Medidas leídas de la card dibujada.`,children:(0,k.jsxs)(_,{encabezado:[`Part`,`Sample`,`Height`,`Text`,`Padding`],minimo:640,children:[(0,k.jsx)(O,{sel:`a > div`,parte:`Card`}),(0,k.jsx)(O,{sel:`h2`,parte:`Title`}),(0,k.jsx)(O,{sel:`p:last-child`,parte:`Detail`})]})}),(0,k.jsx)(w,{titulo:`Colors`,children:(0,k.jsxs)(_,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,k.jsxs)(`td`,{children:[(0,k.jsx)(T,{nombre:`card`}),` · `,(0,k.jsx)(`code`,{children:`shadow-panel`})]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Icon box`}),(0,k.jsxs)(`td`,{children:[(0,k.jsx)(T,{nombre:`accent`}),` · icon `,(0,k.jsx)(T,{nombre:`primary`})]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Description`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(T,{nombre:`ink-muted`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,k.jsxs)(`td`,{children:[(0,k.jsx)(T,{nombre:`dash-blue`}),` · 12px semibold`]})]})]})})]})},L=[`Playground`,`Parts`,`States`,`Specs`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  decorators: [ancho],
  render: () => <Lienzo>
      <div className="w-[320px]"><SettingsSectionCard to="/settings/finance/carriers" icon={Landmark} title="Carriers" description="The insurance companies you bill and their plans." detail="8 carriers · 10 plans" /></div>
      <TablaPartes partes={[['Icon', 'Cuadro de 44px con el ícono de la sección.', 'LucideIcon'], ['Title', '15px bold.', 'h2'], ['Description', 'Qué hay adentro, en una o dos líneas.', 'p'], ['Detail', 'Opcional: un dato al pie en azul, para las portadas de una sección.', 'detail']]} />
    </Lienzo>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  decorators: [ancho],
  render: () => <Lienzo>
      <Muestras>
        <Muestra titulo="Default" ancho={300}><SettingsSectionCard to="#" icon={UserCog} title="Accounts" description="Manage your account and their access." /></Muestra>
        <Muestra titulo="Hover" nota="Anillo azul tenue." ancho={300}><Forzar selector="a > div" estado="hover"><SettingsSectionCard to="#" icon={UserCog} title="Accounts" description="Manage your account and their access." /></Forzar></Muestra>
        <Muestra titulo="With detail" ancho={300}><SettingsSectionCard to="#" icon={Receipt} title="Fee Schedules" description="What your office charges for each procedure." detail="5 active schedules · Default: UCR - Red" /></Muestra>
      </Muestras>
      <Bloque titulo="Settings home" nota="Una card por sección.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SETTINGS_SECTIONS.map(s => <SettingsSectionCard key={s.to} to={s.to} icon={SETTINGS_ICONS[s.icon] ?? SlidersHorizontal} title={s.title} description={s.desc} />)}
        </div>
      </Bloque>
      <Bloque titulo="Billing home" nota="Las tres tablas de Billing, con detail.">
        <div className="grid gap-5 md:grid-cols-3">
          <SettingsSectionCard to="#" icon={Receipt} title="Fee Schedules" description="What your office charges for each procedure." detail="5 active schedules" />
          <SettingsSectionCard to="#" icon={Landmark} title="Carriers" description="The insurance companies you bill and their plans." detail="8 carriers · 10 plans" />
          <SettingsSectionCard to="#" icon={ShieldCheck} title="Coverage Tables" description="What each plan pays by procedure category." detail="5 active tables" />
        </div>
      </Bloque>
    </Lienzo>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  decorators: [ancho],
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la card dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Text', 'Padding']} minimo={640}>
          <Medida sel="a > div" parte="Card" />
          <Medida sel="h2" parte="Title" />
          <Medida sel="p:last-child" parte="Detail" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Card</td><td><Token nombre="card" /> · <code>shadow-panel</code></td></tr>
          <tr><td className="font-semibold">Icon box</td><td><Token nombre="accent" /> · icon <Token nombre="primary" /></td></tr>
          <tr><td className="font-semibold">Description</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Detail</td><td><Token nombre="dash-blue" /> · 12px semibold</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...I.parameters?.docs?.source}}}})))()}R();export{P as Parts,N as Playground,I as Specs,F as States,L as __namedExportsOrder,A as default};
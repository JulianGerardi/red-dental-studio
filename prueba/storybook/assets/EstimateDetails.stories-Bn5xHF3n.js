import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,n as i,r as a,t as o}from"./EstimateDetails-BagibrXX.js";import{h as s,n as c}from"./treatment-plan-C-0A7vXg.js";import{o as l,r as u}from"./estimaciones-xEZc9MML.js";import{a as d,f,i as p,t as m,u as h}from"./kit-Di92TvVK.js";function g(){let[e,t]=(0,_.useState)(!1);return(0,v.jsx)(i,{situacion:r(x,S),onEscenario:T,onSimular:T,fallar:e,onFallar:t})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{_=t(),s(),l(),f(),a(),v=n(),y=[`al-dia`,`desactualizada`,`sin-calcular`,`calculando`,`fallo`],b={"al-dia":`Up to date`,desactualizada:`Update needed`,"sin-calcular":`Not calculated`,calculando:`Calculating`,fallo:`Update failed`},x=c[0],S=u(c)[x.id],C={title:`Components/Clinical/EstimateDetails`,parameters:{layout:`fullscreen`,docs:{jira:[`CON-3695`,`CON-1598`],story:{inline:!1,iframeHeight:760},description:{component:[`El detalle de la estimación de un caso: por visita y por procedimiento, cuánto cuesta, cuánto cubre el seguro y cuánto paga el paciente (CON-3695, CON-1598). Se abre desde el **Total amount** de la card del caso o de su encabezado en Treatment Plan.`,``,`**Cómo se usa:** la estimación es una foto. Si el caso cambió después de calcularla queda *Update needed* y ofrece *Update estimate*; sin calcular, *Calculate estimate*; si el cálculo falla, avisa y deja reintentar. Con el caso presentado o cerrado queda bloqueada: se ve y no se recalcula.`,``,`**Probalo:** en *Playground* elegí el estado y si el caso está bloqueado desde *Controls*. *Parts* dice qué hace cada parte y *States* muestra cada situación.`].join(`
`)}}},args:{status:`al-dia`,lockedCase:!1},argTypes:{status:{control:`select`,options:y,description:`al-dia · desactualizada (el caso cambió) · sin-calcular · calculando · fallo.`},lockedCase:{control:`boolean`,description:`El caso ya se presentó: la estimación queda de lectura.`}}},w={layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},T=()=>{},E={...x,estado:`Presented`},D={render:({status:e,lockedCase:t})=>(0,v.jsx)(`div`,{className:`bg-page-background min-h-[720px] p-6`,children:(0,v.jsx)(o,{caso:t?E:x,estimacion:{...S,estado:e},onVolver:T,onCalcular:T})})},O={parameters:w,render:()=>(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{titulo:`Parts`,children:(0,v.jsx)(h,{partes:[[`Header`,`Back, el nombre del caso y el estado de la estimación con su descripción.`,`EstimateDetails`],[`Totals`,`Los totales del caso: fee, cobertura del seguro, ajustes y lo que paga el paciente.`,`EstimateDetails`],[`Visit table`,`Una tabla por visita con sus procedimientos; en celular la primera columna queda fija.`,`EstimateDetails`],[`Action`,`Calculate, Update o Retry según la situación; no aparece con el caso bloqueado.`,`EstimateDetails`],[`Prototype controls`,`Sólo del prototipo: fuerza un escenario o simula un cambio en el caso para ver cada situación.`,`PrototypeControls`]]})}),(0,v.jsx)(m,{titulo:`Prototype controls`,children:(0,v.jsx)(g,{})})]})},k={parameters:w,render:()=>(0,v.jsx)(p,{children:(0,v.jsx)(m,{titulo:`States`,children:(0,v.jsxs)(`div`,{className:`grid gap-6`,children:[y.map(e=>(0,v.jsx)(d,{titulo:b[e],nota:e===`calculando`?`Loading: mientras se calcula.`:e===`fallo`?`Error: el cálculo falló y se puede reintentar.`:e===`sin-calcular`?`Empty: todavía no hay estimación.`:void 0,children:(0,v.jsx)(o,{caso:x,estimacion:{...S,estado:e},onVolver:T,onCalcular:T})},e)),(0,v.jsx)(d,{titulo:`Presented / locked`,nota:`Disabled: con el caso presentado no se recalcula.`,children:(0,v.jsx)(o,{caso:E,estimacion:S,onVolver:T,onCalcular:T})})]})})})},A={parameters:w,render:()=>(0,v.jsx)(i,{situacion:`desactualizada`,onEscenario:T,onSimular:T,fallar:!0,onFallar:T})},j=[`Playground`,`Parts`,`States`,`FailNextCalculationChecked`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: ({
    status,
    lockedCase
  }) => <div className="bg-page-background min-h-[720px] p-6">
      <EstimateDetails caso={lockedCase ? presentado : caso} estimacion={{
      ...base,
      estado: status
    }} onVolver={nada} onCalcular={nada} />
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Header', 'Back, el nombre del caso y el estado de la estimación con su descripción.', 'EstimateDetails'], ['Totals', 'Los totales del caso: fee, cobertura del seguro, ajustes y lo que paga el paciente.', 'EstimateDetails'], ['Visit table', 'Una tabla por visita con sus procedimientos; en celular la primera columna queda fija.', 'EstimateDetails'], ['Action', 'Calculate, Update o Retry según la situación; no aparece con el caso bloqueado.', 'EstimateDetails'], ['Prototype controls', 'Sólo del prototipo: fuerza un escenario o simula un cambio en el caso para ver cada situación.', 'PrototypeControls']]} />
      </Bloque>
      <Bloque titulo="Prototype controls"><Controles /></Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="States">
        <div className="grid gap-6">
          {ESTADOS.map(e => <Muestra key={e} titulo={ROTULO[e]} nota={e === 'calculando' ? 'Loading: mientras se calcula.' : e === 'fallo' ? 'Error: el cálculo falló y se puede reintentar.' : e === 'sin-calcular' ? 'Empty: todavía no hay estimación.' : undefined}>
              <EstimateDetails caso={caso} estimacion={{
            ...base,
            estado: e
          }} onVolver={nada} onCalcular={nada} />
            </Muestra>)}
          <Muestra titulo="Presented / locked" nota="Disabled: con el caso presentado no se recalcula."><EstimateDetails caso={presentado} estimacion={base} onVolver={nada} onCalcular={nada} /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <PrototypeControls situacion="desactualizada" onEscenario={nada} onSimular={nada} fallar onFallar={nada} />
}`,...A.parameters?.docs?.source}}}})))()}M();export{A as FailNextCalculationChecked,O as Parts,D as Playground,k as States,j as __namedExportsOrder,C as default};
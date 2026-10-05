import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,t as f,u as p}from"./ProcedureRow-CkA7DBAY.js";import{a as m,d as h,i as g,l as _,n as v,s as y,t as b}from"./kit-VhBMbBcY.js";import{r as x,s as S,u as C}from"./data-BswmdO8N.js";function w({estado:e}){let{ref:t,m:n}=h();return(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:e}),(0,E.jsx)(`td`,{children:(0,E.jsx)(`div`,{ref:t,className:`w-[380px]`,children:(0,E.jsx)(a,{procedure:D,estado:e,scopes:[`Tooth`,`Quadrant`,`Arch`]})})}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:n?.alto}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:n?.padding}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:n?.radio})]})}var T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{T=t(),u(),p(),r(),C(),_(),E=n(),D=x.find(e=>e.code===`D0120`),O=x.find(e=>e.code===`D2140`),k={title:`Components/Clinical/Dental/ProcedureRow`,component:a,parameters:{layout:`padded`,docs:{description:{component:["La fila para elegir un procedimiento en New Procedure / New Condition (Figma *Design system · 2.0*, 535:2822): el código, la descripción, su área y un botón por alcance (diente, superficie, cuadrante, arcada) con los íconos del design system. La condición o diagnóstico (535:2307) va con `ConditionRow`.",``,`**Estados:** *default*, *selected* (borde azul), *inactive* (gris azulado), *error* (rojo) y *disabled* (apagada, no se elige).`,``,`**Probalo:** en *Playground* cambiá el estado desde *Controls* y elegí un alcance.`].join(`
`)}}},args:{procedure:D,estado:`default`,scopes:S.filter(e=>e!==`Surface`)},argTypes:{estado:{control:`inline-radio`,options:s,description:`Cómo se ve la fila.`},procedure:{table:{disable:!0}},scopes:{table:{disable:!0}},scope:{table:{disable:!0}}}},A={render:function(e){let[t,n]=(0,T.useState)(null);return(0,E.jsx)(`div`,{className:`max-w-[440px]`,children:(0,E.jsx)(a,{...e,scope:t,onScope:n})})}},j={parameters:{controls:{disable:!0}},render:()=>(0,E.jsxs)(g,{children:[(0,E.jsx)(b,{titulo:`Icons`,nota:`Diente, superficie, cuadrante y arcada, en blanco sobre el color del estado. Cada uno con su tooltip (ConAyuda): pasá el mouse.`,children:(0,E.jsx)(i,{delayDuration:200,children:(0,E.jsx)(y,{encabezado:[`State`,...S],minimo:420,children:s.map(e=>(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:e}),S.map(t=>(0,E.jsx)(`td`,{children:(0,E.jsx)(l,{texto:o[t],children:(0,E.jsx)(`span`,{className:`inline-flex`,children:(0,E.jsx)(f,{estado:e,children:(0,E.jsx)(c,{scope:t})})})})},t))]},e))})})}),(0,E.jsx)(b,{titulo:`Condition`,nota:`Una condición o diagnóstico: el nombre y el diente.`,children:(0,E.jsx)(`div`,{className:`max-w-[420px]`,children:(0,E.jsx)(d,{label:`Chronic enamel dental caries`})})})]})},M={parameters:{controls:{disable:!0}},render:()=>(0,E.jsx)(g,{children:(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(b,{titulo:`Procedure`,children:(0,E.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[s.map(e=>(0,E.jsx)(v,{rotulo:e,children:(0,E.jsx)(a,{procedure:D,estado:e,scopes:S.filter(e=>e!==`Surface`)})},e)),(0,E.jsx)(v,{rotulo:`selected, on surface`,children:(0,E.jsx)(a,{procedure:O,estado:`selected`,scopes:S,scope:`Surface`})})]})}),(0,E.jsx)(b,{titulo:`Condition`,children:(0,E.jsx)(`div`,{className:`flex flex-col gap-3`,children:s.map(e=>(0,E.jsx)(v,{rotulo:e,children:(0,E.jsx)(d,{label:`Chronic enamel dental caries`,estado:e})},e))})})]})})},N={parameters:{controls:{disable:!0}},render:()=>(0,E.jsxs)(g,{children:[(0,E.jsx)(b,{titulo:`Row`,nota:`Medidas leídas de la fila dibujada: borde de 1, padding 12 × 11, radio 6, íconos de 23 con 8 entre sí.`,children:(0,E.jsx)(y,{encabezado:[`State`,`Sample`,`Height`,`Padding`,`Radius`],minimo:720,children:[`default`,`selected`].map(e=>(0,E.jsx)(w,{estado:e},e))})}),(0,E.jsx)(m,{children:S.map(e=>(0,E.jsx)(v,{rotulo:e,children:(0,E.jsx)(f,{estado:`default`,children:(0,E.jsx)(c,{scope:e})})},e))})]})},P=[`Playground`,`Parts`,`States`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [scope, setScope] = useState<ProcedureScope | null>(null);
    return <div className="max-w-[440px]"><ProcedureRow {...args} scope={scope} onScope={setScope} /></div>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Icons" nota="Diente, superficie, cuadrante y arcada, en blanco sobre el color del estado. Cada uno con su tooltip (ConAyuda): pasá el mouse.">
        <TooltipProvider delayDuration={200}>
          <Tabla encabezado={['State', ...SCOPES]} minimo={420}>
            {ESTADOS_FILA.map(e => <tr key={e}>
                <td className="font-semibold">{e}</td>
                {SCOPES.map(s => <td key={s}><ConAyuda texto={NOMBRE_ALCANCE[s]}><span className="inline-flex"><CajaIcono estado={e}><ScopeIcon scope={s} /></CajaIcono></span></ConAyuda></td>)}
              </tr>)}
          </Tabla>
        </TooltipProvider>
      </Bloque>
      <Bloque titulo="Condition" nota="Una condición o diagnóstico: el nombre y el diente.">
        <div className="max-w-[420px]"><ConditionRow label="Chronic enamel dental caries" /></div>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Bloque titulo="Procedure">
          <div className="flex flex-col gap-3">
            {ESTADOS_FILA.map(e => <ConRotulo key={e} rotulo={e}><ProcedureRow procedure={D0120} estado={e} scopes={SCOPES.filter(s => s !== 'Surface')} /></ConRotulo>)}
            <ConRotulo rotulo="selected, on surface"><ProcedureRow procedure={D2140} estado="selected" scopes={SCOPES} scope="Surface" /></ConRotulo>
          </div>
        </Bloque>
        <Bloque titulo="Condition">
          <div className="flex flex-col gap-3">
            {ESTADOS_FILA.map(e => <ConRotulo key={e} rotulo={e}><ConditionRow label="Chronic enamel dental caries" estado={e} /></ConRotulo>)}
          </div>
        </Bloque>
      </div>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Row" nota="Medidas leídas de la fila dibujada: borde de 1, padding 12 × 11, radio 6, íconos de 23 con 8 entre sí.">
        <Tabla encabezado={['State', 'Sample', 'Height', 'Padding', 'Radius']} minimo={720}>
          {(['default', 'selected'] as const).map(e => <FilaMedida key={e} estado={e} />)}
        </Tabla>
      </Bloque>
      <Muestras>
        {SCOPES.map(s => <ConRotulo key={s} rotulo={s}><CajaIcono estado="default"><ScopeIcon scope={s} /></CajaIcono></ConRotulo>)}
      </Muestras>
    </Lienzo>
}`,...N.parameters?.docs?.source}}}})))()}F();export{j as Parts,A as Playground,N as Specs,M as States,P as __namedExportsOrder,k as default};
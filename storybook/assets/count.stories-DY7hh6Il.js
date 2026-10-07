import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./chevron-down-BGVf7U5Y.js";import{a as o,i as s,n as c,r as l,t as u}from"./count-BBSlbsDf.js";import{c as d,l as f}from"./estilos-CHlNpAbz.js";import{Al as p,Dl as m,El as h,jl as g}from"./iframe-CuqX9FWN.js";import{a as _,c as v,d as y,i as b,l as x,m as S,n as C,p as w,s as T,t as E}from"./kit-VhBMbBcY.js";function D({rotulo:e,cuenta:t}){let{ref:n,m:r}=y();return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{ref:n,className:`inline-block`,children:(0,O.jsx)(c,{children:t})})}),(0,O.jsx)(`td`,{className:`font-semibold`,children:e}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,O.jsxs)(`td`,{className:`tabular-nums`,children:[r?.texto,` · `,r?.peso]}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{i(),o(),g(),m(),l(),x(),w(),f(),t(),O=r(),k={title:`Elements/Counts`,component:c,parameters:{layout:`padded`,docs:{description:{component:["El globo con una cuenta (`@/components/ui/count`): cuántas alergias, medicamentos o condiciones tiene un paciente. Con un dígito es un círculo; con dos, una píldora. No es un estado (eso es *Pills*) ni un botón: sólo cuenta.",``,`**Probalo:** en *Playground* cambiá el número y probá *active* (el globo sobre una card azul) desde *Controls*.`].join(`
`)}}},args:{children:`4`,active:!1},argTypes:{children:{control:`text`,description:`El número. Un dígito dibuja un círculo; dos o más, una píldora.`},active:{control:`boolean`,description:`Sobre una card abierta (azul): fondo claro y número azul.`},className:{table:{disable:!0}}}},A={},j={parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(b,{children:(0,O.jsx)(E,{nota:`El ancho se adapta al número. El cero no se apaga: una lista vacía también es un dato.`,children:(0,O.jsxs)(_,{children:[[`0`,`4`,`12`].map(e=>(0,O.jsx)(C,{rotulo:e.length>1?`Two digits`:e===`0`?`Zero`:`One digit`,children:(0,O.jsx)(c,{children:e})},e)),(0,O.jsx)(C,{rotulo:`Active (open card)`,children:(0,O.jsx)(`span`,{className:`flex h-9 items-center rounded-lg bg-dash-blue px-3`,children:(0,O.jsx)(c,{active:!0,children:`4`})})})]})})})},M=[{titulo:`Allergies`,Icono:p,cuenta:`4`},{titulo:`Medical Conditions`,Icono:s,cuenta:`4`},{titulo:`Medication`,Icono:h,cuenta:`12`}],N={name:`In context`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(b,{children:(0,O.jsx)(E,{nota:`Icono, título, globo y chevron: el globo va pegado al título y su centro coincide con el del texto.`,children:(0,O.jsx)(`div`,{className:`grid gap-3 sm:grid-cols-3`,children:M.map(({titulo:e,Icono:t,cuenta:r},i)=>(0,O.jsxs)(`div`,{className:n(d,`flex items-center gap-2.5 px-4 py-3`,i===0&&`bg-dash-blue`),children:[(0,O.jsx)(t,{className:n(`size-4 shrink-0`,i===0?`text-white`:`text-ink`)}),(0,O.jsx)(`span`,{className:n(`truncate text-[13px] font-semibold`,i===0?`text-white`:`text-ink`),children:e}),(0,O.jsx)(c,{active:i===0,children:r}),(0,O.jsx)(a,{className:n(`ml-auto size-4 shrink-0`,i===0?`rotate-180 text-white`:`text-ink-muted`)})]},e))})})})},P={parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(b,{children:[(0,O.jsx)(E,{titulo:`Size`,nota:`Medidas leídas del globo dibujado. El alto es fijo; el ancho mínimo es igual al alto, así que un dígito es un círculo.`,children:(0,O.jsxs)(T,{encabezado:[`Sample`,`Case`,`Height`,`Width`,`Padding`,`Text`,`Radius`],minimo:700,children:[(0,O.jsx)(D,{rotulo:`One digit`,cuenta:`4`}),(0,O.jsx)(D,{rotulo:`Two digits`,cuenta:`12`})]})}),(0,O.jsx)(E,{titulo:`Colors`,nota:`Tokens de cada caso, de count.tsx y src/index.css.`,children:(0,O.jsx)(T,{encabezado:[`Case`,`Sample`,`Fill`,`Text`],minimo:560,children:Object.keys(u).map(e=>{let t=S(u[e]);return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,O.jsx)(`td`,{children:e===`active`?(0,O.jsx)(`span`,{className:`inline-flex rounded-md bg-dash-blue p-1.5`,children:(0,O.jsx)(c,{active:!0,children:`4`})}):(0,O.jsx)(c,{children:`4`})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(v,{nombre:t.fondo})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(v,{nombre:t.texto})})]},e)})})})]})},F=[`Playground`,`States`,`InContext`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque nota="El ancho se adapta al número. El cero no se apaga: una lista vacía también es un dato.">
        <Muestras>
          {['0', '4', '12'].map(n => <ConRotulo key={n} rotulo={n.length > 1 ? 'Two digits' : n === '0' ? 'Zero' : 'One digit'}><Count>{n}</Count></ConRotulo>)}
          <ConRotulo rotulo="Active (open card)">
            <span className="flex h-9 items-center rounded-lg bg-dash-blue px-3"><Count active>4</Count></span>
          </ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'In context',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque nota="Icono, título, globo y chevron: el globo va pegado al título y su centro coincide con el del texto.">
        <div className="grid gap-3 sm:grid-cols-3">
          {CARDS.map(({
          titulo,
          Icono,
          cuenta
        }, i) => <div key={titulo} className={cn(TARJETA_PANEL, 'flex items-center gap-2.5 px-4 py-3', i === 0 && 'bg-dash-blue')}>
              <Icono className={cn('size-4 shrink-0', i === 0 ? 'text-white' : 'text-ink')} />
              <span className={cn('truncate text-[13px] font-semibold', i === 0 ? 'text-white' : 'text-ink')}>{titulo}</span>
              <Count active={i === 0}>{cuenta}</Count>
              <ChevronDown className={cn('ml-auto size-4 shrink-0', i === 0 ? 'rotate-180 text-white' : 'text-ink-muted')} />
            </div>)}
        </div>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Medidas leídas del globo dibujado. El alto es fijo; el ancho mínimo es igual al alto, así que un dígito es un círculo.">
        <Tabla encabezado={['Sample', 'Case', 'Height', 'Width', 'Padding', 'Text', 'Radius']} minimo={700}>
          <FilaMedidas rotulo="One digit" cuenta="4" />
          <FilaMedidas rotulo="Two digits" cuenta="12" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de cada caso, de count.tsx y src/index.css.">
        <Tabla encabezado={['Case', 'Sample', 'Fill', 'Text']} minimo={560}>
          {(Object.keys(COUNT_TONES) as (keyof typeof COUNT_TONES)[]).map(caso => {
          const k = tokensDe(COUNT_TONES[caso]);
          return <tr key={caso}>
                <td className="font-semibold capitalize">{caso}</td>
                <td>{caso === 'active' ? <span className="inline-flex rounded-md bg-dash-blue p-1.5"><Count active>4</Count></span> : <Count>4</Count>}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>;
        })}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{N as InContext,A as Playground,P as Specs,j as States,F as __namedExportsOrder,k as default};
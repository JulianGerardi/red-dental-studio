import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{n as i,t as a}from"./chevron-down-BGVf7U5Y.js";import{n as o,t as s}from"./clipboard-CdvxvrC0.js";import{h as c,m as l}from"./estilos-CE-FcrPI.js";import{au as u,cu as d,iu as f,lu as p}from"./iframe-d-oVrlEB.js";import{c as m,d as h,g,h as _,i as v,n as y,o as b,p as x,t as S,u as C}from"./kit-4bQS7S9u.js";import{n as w,r as T,t as E}from"./count-CiXEAcMj.js";function D({rotulo:e,cuenta:t}){let{ref:n,m:r}=x();return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{ref:n,className:`inline-block`,children:(0,O.jsx)(w,{children:t})})}),(0,O.jsx)(`td`,{className:`font-semibold`,children:e}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,O.jsxs)(`td`,{className:`tabular-nums`,children:[r?.texto,` · `,r?.peso]}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{i(),o(),p(),u(),T(),h(),_(),c(),t(),O=r(),k={title:`Elements/Counts`,component:w,parameters:{layout:`padded`,docs:{description:{component:["El globo con una cuenta (`@/components/ui/count`): cuántas alergias, medicamentos o condiciones tiene un paciente. Con un dígito es un círculo; con dos, una píldora. No es un estado (eso es *Pills*) ni un botón: sólo cuenta.",``,`**Probalo:** en *Playground* cambiá el número y probá *active* (el globo sobre una card azul) desde *Controls*.`].join(`
`)}}},args:{children:`4`,active:!1},argTypes:{children:{control:`text`,description:`El número. Un dígito dibuja un círculo; dos o más, una píldora.`},active:{control:`boolean`,description:`Sobre una card abierta (azul): fondo claro y número azul.`},className:{table:{disable:!0}}}},A={},j={parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(v,{children:(0,O.jsx)(S,{nota:`El ancho se adapta al número. El cero no se apaga: una lista vacía también es un dato.`,children:(0,O.jsxs)(b,{children:[[`0`,`4`,`12`].map(e=>(0,O.jsx)(y,{rotulo:e.length>1?`Two digits`:e===`0`?`Zero`:`One digit`,children:(0,O.jsx)(w,{children:e})},e)),(0,O.jsx)(y,{rotulo:`Active (open card)`,children:(0,O.jsx)(`span`,{className:`flex h-9 items-center rounded-lg bg-dash-blue px-3`,children:(0,O.jsx)(w,{active:!0,children:`4`})})})]})})})},M=[{titulo:`Allergies`,Icono:d,cuenta:`4`},{titulo:`Medical Conditions`,Icono:s,cuenta:`4`},{titulo:`Medication`,Icono:f,cuenta:`12`}],N={name:`In context`,parameters:{controls:{disable:!0}},render:()=>(0,O.jsx)(v,{children:(0,O.jsx)(S,{nota:`Icono, título, globo y chevron: el globo va pegado al título y su centro coincide con el del texto.`,children:(0,O.jsx)(`div`,{className:`grid gap-3 sm:grid-cols-3`,children:M.map(({titulo:e,Icono:t,cuenta:r},i)=>(0,O.jsxs)(`div`,{className:n(l,`flex items-center gap-2.5 px-4 py-3`,i===0&&`bg-dash-blue`),children:[(0,O.jsx)(t,{className:n(`size-4 shrink-0`,i===0?`text-white`:`text-ink`)}),(0,O.jsx)(`span`,{className:n(`truncate text-[13px] font-semibold`,i===0?`text-white`:`text-ink`),children:e}),(0,O.jsx)(w,{active:i===0,children:r}),(0,O.jsx)(a,{className:n(`ml-auto size-4 shrink-0`,i===0?`rotate-180 text-white`:`text-ink-muted`)})]},e))})})})},P={parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(v,{children:[(0,O.jsx)(S,{titulo:`Size`,nota:`Medidas leídas del globo dibujado. El alto es fijo; el ancho mínimo es igual al alto, así que un dígito es un círculo.`,children:(0,O.jsxs)(m,{encabezado:[`Sample`,`Case`,`Height`,`Width`,`Padding`,`Text`,`Radius`],minimo:700,children:[(0,O.jsx)(D,{rotulo:`One digit`,cuenta:`4`}),(0,O.jsx)(D,{rotulo:`Two digits`,cuenta:`12`})]})}),(0,O.jsx)(S,{titulo:`Colors`,nota:`Tokens de cada caso, de count.tsx y src/index.css.`,children:(0,O.jsx)(m,{encabezado:[`Case`,`Sample`,`Fill`,`Text`],minimo:560,children:Object.keys(E).map(e=>{let t=g(E[e]);return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,O.jsx)(`td`,{children:e===`active`?(0,O.jsx)(`span`,{className:`inline-flex rounded-md bg-dash-blue p-1.5`,children:(0,O.jsx)(w,{active:!0,children:`4`})}):(0,O.jsx)(w,{children:`4`})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(C,{nombre:t.fondo})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(C,{nombre:t.texto})})]},e)})})})]})},F=[`Playground`,`States`,`InContext`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
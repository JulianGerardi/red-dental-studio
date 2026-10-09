import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{h as i,m as a}from"./estilos-IIbyrx-O.js";import{c as o,d as s,i as c,p as l,r as u,t as d,u as f}from"./kit-4bQS7S9u.js";import{n as p,t as m}from"./info-tip-C1Zjr76b.js";function h({title:e,text:t,abierto:r,children:i}){return(0,v.jsxs)(`div`,{className:n(a,`w-[248px] p-4`),children:[(0,v.jsxs)(`div`,{className:`flex items-start justify-between gap-2`,children:[(0,v.jsx)(`p`,{className:`truncate text-xs text-ink-muted`,children:e}),i??(0,v.jsx)(m,{title:e,abierto:r,children:t})]}),(0,v.jsx)(`p`,{className:`text-dash-blue mt-1 text-xl font-bold`,children:`$2,131.86`}),(0,v.jsx)(`p`,{className:`mt-0.5 truncate text-[11px] text-ink-faint`,children:`Across patient and insurance balances`})]})}function g({titulo:e,nota:t,children:n}){return(0,v.jsxs)(`figure`,{className:`m-0 flex w-[248px] flex-col gap-2`,children:[(0,v.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,v.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,v.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),n]})}function _({nombre:e,selector:t,children:n}){let{ref:r,m:i}=l(t);return(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:e}),(0,v.jsx)(`td`,{children:(0,v.jsx)(`div`,{ref:r,children:n})}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:i?`${i.ancho} × ${i.alto}`:``}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:i?.icono})]})}var v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{p(),s(),i(),t(),v=r(),y={title:`Components/UI/InfoTip`,parameters:{layout:`padded`,docs:{description:{component:["El **círculo de info** (`@/components/ui/info-tip`) va arriba a la derecha de una card con un número y explica **qué cuenta** ese número: los cinco de Billing y los de Today. Es un `HoverCard` (card blanca con título y texto), no un `Tooltip`: el Tooltip oscuro es sólo para nombrar.",``,`**Cómo se abre:** con el mouse al pasar; con el dedo al tocar; con el teclado al llegar con Tab. Escape o tocar afuera lo cierra. Gris como la etiqueta de la card y azul mientras está abierto.`,``,`**Probalo:** en *Playground* cambiá título y texto desde *Controls*, o pasá el mouse por el círculo.`].join(`
`)}}},args:{title:`Total A/R`,text:`Sum of the remaining total balance of the location's open charges.`,open:!0},argTypes:{title:{control:`text`,description:`Igual que la etiqueta de la card.`},text:{control:`text`,description:`Qué cuenta el número, en una o dos líneas.`},open:{control:`boolean`,description:`Arranca abierto. Apagado: se abre al pasar el mouse.`}},decorators:[e=>(0,v.jsx)(`div`,{className:`bg-page-background rounded-xl p-6 pb-28`,children:(0,v.jsx)(e,{})})]},b={render:e=>(0,v.jsx)(h,{title:e.title,text:e.text,abierto:e.open},`${e.open}-${e.title}-${e.text}`)},x=[[`Trigger`,`El círculo de info (Info de lucide, 16px) en un área de 24px. Gris (ink-muted) como la etiqueta; azul con hover, foco o abierto.`],[`Card`,`HoverCard de 256px, blanca con sombra, abajo y alineada al borde derecho del círculo. Si no entra abajo, abre arriba.`],[`Title`,`El nombre del número, igual que la etiqueta de la card. 13px Semibold.`],[`Text`,`Qué cuenta, en una o dos líneas. 12px, ink-muted.`]],S={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(`div`,{className:`flex flex-col gap-24`,children:[(0,v.jsx)(h,{title:`Total A/R`,text:`Sum of the remaining total balance of the location's open charges.`,abierto:!0}),(0,v.jsx)(o,{encabezado:[`Part`,`What it does`],minimo:560,arriba:!0,children:x.map(([e,t])=>(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,v.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})]})},C=`Sum of the remaining guarantor balance of the location's open charges.`,w={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-36`,children:[(0,v.jsx)(g,{titulo:`Default`,nota:`Gris, como la etiqueta: hay algo más, sin competir con el número.`,children:(0,v.jsx)(h,{title:`Guarantor A/R`,text:C})}),(0,v.jsx)(g,{titulo:`Hover`,nota:`Azul al pasar el mouse; la card se abre a los 120ms.`,children:(0,v.jsx)(h,{title:`Guarantor A/R`,text:C,children:(0,v.jsx)(u,{selector:`button`,estado:`hover`,children:(0,v.jsx)(m,{title:`Guarantor A/R`,children:C})})})}),(0,v.jsx)(g,{titulo:`Focus`,nota:`Con el teclado: anillo azul. Enter no hace falta: llegar con Tab ya lo abre.`,children:(0,v.jsx)(h,{title:`Guarantor A/R`,text:C,children:(0,v.jsx)(u,{selector:`button`,estado:`focus-visible`,children:(0,v.jsx)(m,{title:`Guarantor A/R`,children:C})})})}),(0,v.jsx)(g,{titulo:`Open`,nota:`La card con el título y el texto, abajo y a la derecha. En el celular se abre y se cierra tocando.`,children:(0,v.jsx)(h,{title:`Overdue Balance`,text:`Open charge balances older than 30 days.`,abierto:!0})}),(0,v.jsx)(g,{titulo:`Two lines`,nota:`El texto más largo de Billing: entra en dos líneas en 256px.`,children:(0,v.jsx)(h,{title:`Guarantors with Open Charges`,text:`Ledgers whose charges at this location still carry a positive guarantor balance.`,abierto:!0})})]})},T={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(c,{children:[(0,v.jsxs)(d,{titulo:`Sizes`,nota:`Medidas leídas del círculo dibujado.`,children:[(0,v.jsx)(o,{encabezado:[`Part`,`Sample`,`Size`,`Icon`],minimo:560,children:(0,v.jsx)(_,{nombre:`Trigger`,selector:`button`,children:(0,v.jsx)(m,{title:`Total A/R`,children:`Sum of the remaining total balance of the location's open charges.`})})}),(0,v.jsxs)(o,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,v.jsx)(`td`,{children:`256px wide, 12px padding, radius 8px, below and aligned to the right edge`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,v.jsxs)(`td`,{children:[`13px Semibold · `,(0,v.jsx)(f,{nombre:`ink`})]})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,v.jsxs)(`td`,{children:[`12px, line height 1.375 · `,(0,v.jsx)(f,{nombre:`ink-muted`})]})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Delay`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`opens after 120ms, closes after 80ms`})]})]})]}),(0,v.jsx)(d,{titulo:`Colors`,children:(0,v.jsxs)(o,{encabezado:[`State`,`Token`],minimo:480,children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Default`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(f,{nombre:`ink-muted`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Hover, focus, open`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(f,{nombre:`dash-blue`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Focus ring`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(f,{nombre:`dash-ring`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,v.jsxs)(`td`,{children:[(0,v.jsx)(f,{nombre:`white`}),` · shadow-md and a faint ring (the HoverCard of the design system)`]})]})]})}),(0,v.jsx)(d,{titulo:`Rules`,children:(0,v.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,v.jsx)(`li`,{children:`Only on a card with a number, top right, to explain what that number counts. Not for naming an icon: that is a Tooltip.`}),(0,v.jsx)(`li`,{children:`The title repeats the card label; the text says what is counted in one or two lines, from the user’s side.`}),(0,v.jsx)(`li`,{children:`Opens on hover, tap or keyboard focus; Escape or tapping outside closes it. Screen readers read the title and the text from the button.`}),(0,v.jsx)(`li`,{children:`Every number in the same row has one, or none does.`})]})})]})},E=[`Playground`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:"{\n  render: a => <Card key={`${a.open}-${a.title}-${a.text}`} title={a.title} text={a.text} abierto={a.open} />\n}",...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex flex-col gap-24">
      <Card title="Total A/R" text="Sum of the remaining total balance of the location's open charges." abierto />
      <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
        {PARTES.map(([parte, que]) => <tr key={parte}><td className="font-semibold whitespace-nowrap">{parte}</td><td className="text-ink-medium">{que}</td></tr>)}
      </Tabla>
    </div>
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex flex-wrap items-start gap-x-6 gap-y-36">
      <Estado titulo="Default" nota="Gris, como la etiqueta: hay algo más, sin competir con el número."><Card title="Guarantor A/R" text={TEXTO} /></Estado>
      <Estado titulo="Hover" nota="Azul al pasar el mouse; la card se abre a los 120ms.">
        <Card title="Guarantor A/R" text={TEXTO}><Forzar selector="button" estado="hover"><InfoTip title="Guarantor A/R">{TEXTO}</InfoTip></Forzar></Card>
      </Estado>
      <Estado titulo="Focus" nota="Con el teclado: anillo azul. Enter no hace falta: llegar con Tab ya lo abre.">
        <Card title="Guarantor A/R" text={TEXTO}><Forzar selector="button" estado="focus-visible"><InfoTip title="Guarantor A/R">{TEXTO}</InfoTip></Forzar></Card>
      </Estado>
      <Estado titulo="Open" nota="La card con el título y el texto, abajo y a la derecha. En el celular se abre y se cierra tocando."><Card title="Overdue Balance" text="Open charge balances older than 30 days." abierto /></Estado>
      <Estado titulo="Two lines" nota="El texto más largo de Billing: entra en dos líneas en 256px."><Card title="Guarantors with Open Charges" text="Ledgers whose charges at this location still carry a positive guarantor balance." abierto /></Estado>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del círculo dibujado.">
        <Tabla encabezado={['Part', 'Sample', 'Size', 'Icon']} minimo={560}>
          <Medida nombre="Trigger" selector="button"><InfoTip title="Total A/R">Sum of the remaining total balance of the location&apos;s open charges.</InfoTip></Medida>
        </Tabla>
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Card</td><td>256px wide, 12px padding, radius 8px, below and aligned to the right edge</td></tr>
          <tr><td className="font-semibold">Title</td><td>13px Semibold · <Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Text</td><td>12px, line height 1.375 · <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Delay</td><td className="tabular-nums">opens after 120ms, closes after 80ms</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['State', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Default</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Hover, focus, open</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Focus ring</td><td><Token nombre="dash-ring" /></td></tr>
          <tr><td className="font-semibold">Card</td><td><Token nombre="white" /> · shadow-md and a faint ring (the HoverCard of the design system)</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Only on a card with a number, top right, to explain what that number counts. Not for naming an icon: that is a Tooltip.</li>
          <li>The title repeats the card label; the text says what is counted in one or two lines, from the user’s side.</li>
          <li>Opens on hover, tap or keyboard focus; Escape or tapping outside closes it. Screen readers read the title and the text from the button.</li>
          <li>Every number in the same row has one, or none does.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}}})))()}D();export{S as Parts,b as Playground,T as Specs,w as States,E as __namedExportsOrder,y as default};
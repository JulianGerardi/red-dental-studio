import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i,t as a}from"./play-C4HzH6w4.js";import{a as o,c as s,d as c,i as l,l as u,o as d,p as f,r as p,t as m,u as h}from"./kit-4bQS7S9u.js";import{n as g,t as _}from"./EditableAmount-D4ohysQg.js";function v({inicial:e,...t}){let[n,r]=(0,b.useState)(e);return(0,x.jsx)(_,{label:`D1110 fee`,...t,value:n,onChange:r})}function y({editando:e}){let{ref:t,m:n}=f(e?`input`:`button`);return(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:e?`Input`:`Button`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(`div`,{ref:t,children:(0,x.jsx)(v,{inicial:115,editing:e})})}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:n?.ancho}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:n?.alto}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:n?.texto}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:n?.radio})]})}var b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{b=t(),g(),c(),i(),x=n(),{expect:S,waitFor:C,within:w}=__STORYBOOK_MODULE_TEST__,T={title:`Components/Finance/EditableAmount`,component:_,parameters:{layout:`padded`,docs:{description:{component:["Un monto que se edita en su misma celda (`@/components/finance/EditableAmount`): el precio de un procedimiento en la tabla de un fee schedule.",``,`**Cómo se usa:** se toca el monto (aparece el lápiz al pasar el mouse), se escribe y Enter -o salir del campo- lo guarda; Escape lo descarta. Vacío y Enter lo deja sin precio ("Not set"). Un texto que no es un monto pinta el borde en rojo y no se guarda.`,``,`**Probalo:** en *Playground* tocá el monto y cambialo; desde *Controls* probá *value*, *disabled* y *editing*.`].join(`
`)}}},args:{value:115,label:`D1110 fee`,disabled:!1,editing:!1,onChange:()=>{}},argTypes:{value:{control:`number`,description:`El monto. Sin valor: "Not set".`},label:{control:`text`,description:`Qué monto es, para el lector de pantalla.`},disabled:{control:`boolean`,description:`De sólo lectura.`},editing:{control:`boolean`,description:`Arranca editando (sólo stories).`},onChange:{table:{disable:!0}}}},E={controls:{disable:!0}},D={render:e=>(0,x.jsx)(v,{inicial:e.value,disabled:e.disabled,editing:e.editing,label:e.label},`${e.value}-${e.editing}`)},O={parameters:E,render:()=>(0,x.jsxs)(l,{children:[(0,x.jsxs)(d,{children:[(0,x.jsx)(o,{titulo:`Reading`,children:(0,x.jsx)(p,{selector:`button`,estado:`hover`,children:(0,x.jsx)(v,{inicial:115})})}),(0,x.jsx)(o,{titulo:`Editing`,children:(0,x.jsx)(v,{inicial:115,editing:!0})})]}),(0,x.jsx)(u,{partes:[[`Amount`,`El monto con centavos, en negro. "Not set" en gris si no tiene.`,`button`],[`Pencil`,`Aparece con el mouse o el foco: dice que se puede editar.`,`Pencil`],[`Input`,`Campo de 112px, alineado a la derecha, con el $ adentro. Borde azul; rojo si el texto no es un monto.`,`input`]]})]})},k={args:{value:115,editing:!1},play:async e=>{await r(/edit d1110 fee/i)(e),await a(/^d1110 fee$/i,`9x`)(e),await C(()=>S(w(e.canvasElement).getByLabelText(/^d1110 fee$/i)).toHaveAttribute(`aria-invalid`,`true`))}},A={parameters:E,render:()=>(0,x.jsxs)(l,{children:[(0,x.jsxs)(d,{children:[(0,x.jsx)(o,{titulo:`Default`,nota:`El precio guardado.`,children:(0,x.jsx)(v,{inicial:115})}),(0,x.jsx)(o,{titulo:`Hover`,nota:`Fondo gris y lápiz.`,children:(0,x.jsx)(p,{selector:`button`,estado:`hover`,children:(0,x.jsx)(v,{inicial:115})})}),(0,x.jsx)(o,{titulo:`Not set (empty)`,nota:`El código no tiene precio en este fee schedule.`,children:(0,x.jsx)(v,{})}),(0,x.jsx)(o,{titulo:`Editing`,nota:`Enter guarda, Escape descarta.`,children:(0,x.jsx)(v,{inicial:115,editing:!0})}),(0,x.jsx)(o,{titulo:`Disabled`,nota:`Sólo lectura, al 50%.`,children:(0,x.jsx)(v,{inicial:115,disabled:!0})})]}),(0,x.jsxs)(`p`,{className:`text-[12.5px] text-ink-muted`,children:[`Error (invalid text): red border and nothing is saved. See it live in the `,(0,x.jsx)(`em`,{children:`Invalid Amount`}),` story.`]})]})},j={parameters:E,render:()=>(0,x.jsxs)(l,{children:[(0,x.jsx)(m,{titulo:`Sizes`,nota:`Medidas leídas de la pieza dibujada.`,children:(0,x.jsxs)(s,{encabezado:[`Part`,`Sample`,`Width`,`Height`,`Text`,`Radius`],minimo:620,children:[(0,x.jsx)(y,{}),(0,x.jsx)(y,{editando:!0})]})}),(0,x.jsx)(m,{titulo:`Colors`,children:(0,x.jsxs)(s,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Amount`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(h,{nombre:`ink`})})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Not set`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(h,{nombre:`ink-faint`})})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(h,{nombre:`surface-muted`})})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Input border`}),(0,x.jsxs)(`td`,{children:[(0,x.jsx)(h,{nombre:`dash-blue`}),` · error `,(0,x.jsx)(h,{nombre:`field-error`})]})]})]})}),(0,x.jsx)(m,{titulo:`Rules`,children:(0,x.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,x.jsx)(`li`,{children:`Accepts “95”, “95.5”, “$1,250”. Saves rounded to cents.`}),(0,x.jsx)(`li`,{children:`Empty + Enter clears the fee. Invalid text on blur is discarded.`}),(0,x.jsx)(`li`,{children:`Clicks inside don’t reach the row (it can live in a clickable row).`})]})})]})},M=[`Playground`,`Parts`,`InvalidAmount`,`States`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:"{\n  render: a => <Vivo key={`${a.value}-${a.editing}`} inicial={a.value} disabled={a.disabled} editing={a.editing} label={a.label} />\n}",...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Muestras>
        <Muestra titulo="Reading"><Forzar selector="button" estado="hover"><Vivo inicial={115} /></Forzar></Muestra>
        <Muestra titulo="Editing"><Vivo inicial={115} editing /></Muestra>
      </Muestras>
      <TablaPartes partes={[['Amount', 'El monto con centavos, en negro. "Not set" en gris si no tiene.', 'button'], ['Pencil', 'Aparece con el mouse o el foco: dice que se puede editar.', 'Pencil'], ['Input', 'Campo de 112px, alineado a la derecha, con el $ adentro. Borde azul; rojo si el texto no es un monto.', 'input']]} />
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    value: 115,
    editing: false
  },
  play: async c => {
    await pulsar(/edit d1110 fee/i)(c);
    await escribir(/^d1110 fee$/i, '9x')(c);
    await waitFor(() => expect(within(c.canvasElement).getByLabelText(/^d1110 fee$/i)).toHaveAttribute('aria-invalid', 'true'));
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Muestras>
        <Muestra titulo="Default" nota="El precio guardado."><Vivo inicial={115} /></Muestra>
        <Muestra titulo="Hover" nota="Fondo gris y lápiz."><Forzar selector="button" estado="hover"><Vivo inicial={115} /></Forzar></Muestra>
        <Muestra titulo="Not set (empty)" nota="El código no tiene precio en este fee schedule."><Vivo /></Muestra>
        <Muestra titulo="Editing" nota="Enter guarda, Escape descarta."><Vivo inicial={115} editing /></Muestra>
        <Muestra titulo="Disabled" nota="Sólo lectura, al 50%."><Vivo inicial={115} disabled /></Muestra>
      </Muestras>
      <p className="text-[12.5px] text-ink-muted">Error (invalid text): red border and nothing is saved. See it live in the <em>Invalid Amount</em> story.</p>
    </Lienzo>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la pieza dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Width', 'Height', 'Text', 'Radius']} minimo={620}>
          <Medida />
          <Medida editando />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Amount</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Not set</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-muted" /></td></tr>
          <tr><td className="font-semibold">Input border</td><td><Token nombre="dash-blue" /> · error <Token nombre="field-error" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Accepts “95”, “95.5”, “$1,250”. Saves rounded to cents.</li>
          <li>Empty + Enter clears the fee. Invalid text on blur is discarded.</li>
          <li>Clicks inside don’t reach the row (it can live in a clickable row).</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}}})))()}N();export{k as InvalidAmount,O as Parts,D as Playground,j as Specs,A as States,M as __namedExportsOrder,T as default};
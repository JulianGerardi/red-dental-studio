import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{p as r,t as i}from"./data-CDDmu8Sc.js";import{c as a,d as o,i as s,n as c,p as l,t as u}from"./kit-CWUgB5-0.js";import{n as d,t as f}from"./DescriptorFields-BzaSlZJX.js";function p(){let{ref:e,m:t}=l();return(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Selected pill`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(`div`,{ref:e,className:`inline-block`,children:(0,h.jsx)(f,{value:{quantity:`Solitary`},onChange:()=>{},rows:[i[0]]})})}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:t?.padding}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:t?.radio})]})}var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{m=t(),d(),r(),o(),h=n(),g={title:`Components/Clinical/Dental/DescriptorFields`,component:f,parameters:{layout:`padded`,docs:{description:{component:[`La guía visual de descriptores de una condition: doce filas, una por atributo, cada una con sus opciones como píldoras de una sola elección. Ninguna es obligatoria -una condition puede no tener nada elegido, o sólo algunas filas-. La usan [New Condition](/docs/components-clinical-dental-newproceduredrawer--docs) (paso *Descriptors*) y [Edit Finding](/docs/components-clinical-dental-editfindingdrawer--docs), sólo en una condition.`,``,`**Tomadas de la app real** (red.dev, Extraoral e Intraoral, New Condition → Select descriptors), no del Figma: Quantity, Symmetry, Size, Shape, Borders, Colors, Surface, Consistency, Mobility, Pain, Bleeding y Exudate, con las mismas opciones -confirmado el 2026-10-24 con grabaciones de pantalla de Julián en los dos exámenes-.`,``,`**Probalo:** tocá una píldora para elegirla: la fila cambia a una sola opción, en azul. Tocarla de nuevo la deselecciona.`].join(`
`)}}},args:{value:{},onChange:()=>{}},argTypes:{value:{table:{disable:!0}},onChange:{table:{disable:!0}}}},_={render:function(e){let[t,n]=(0,m.useState)(e.value);return(0,h.jsx)(`div`,{className:`max-w-[420px]`,children:(0,h.jsx)(f,{...e,value:t,onChange:n})})}},v={parameters:{controls:{disable:!0}},render:()=>(0,h.jsx)(s,{children:(0,h.jsx)(u,{titulo:`Rows`,nota:`Rótulo (FieldLabel, como Provider y Notes) y una píldora por opción, que envuelven en vez de quedar en columnas fijas.`,children:(0,h.jsx)(a,{encabezado:[`Row`,`Options`],minimo:520,children:i.map(e=>(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:e.label}),(0,h.jsx)(`td`,{children:e.options.join(` · `)})]},e.id))})})})},y={parameters:{controls:{disable:!0}},render:()=>(0,h.jsx)(s,{children:(0,h.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,h.jsx)(u,{titulo:`Empty`,nota:`Nada elegido: la condición creada sin tocar la guía.`,children:(0,h.jsx)(`div`,{className:`max-w-[380px]`,children:(0,h.jsx)(f,{value:{},onChange:()=>{}})})}),(0,h.jsx)(u,{titulo:`Selected`,nota:`Dos filas elegidas (hover y foco: Playground).`,children:(0,h.jsx)(`div`,{className:`max-w-[380px]`,children:(0,h.jsx)(f,{value:{colors:`White`,borders:`Raised`},onChange:()=>{}})})})]})})},b={parameters:{controls:{disable:!0}},render:()=>(0,h.jsxs)(s,{children:[(0,h.jsx)(u,{titulo:`Rows`,nota:`Gap de 16 entre filas, 6 entre el rótulo y las píldoras, 6 entre píldoras de una misma fila.`,children:(0,h.jsx)(a,{encabezado:[`Item`,`Sample`,`Padding`,`Radius`],minimo:560,children:(0,h.jsx)(p,{})})}),(0,h.jsx)(u,{titulo:`Rules`,nota:`Una elección por fila: tocar otra píldora la reemplaza. Tocar la ya elegida la deselecciona. Ninguna fila es obligatoria.`,children:(0,h.jsx)(c,{rotulo:`Unselected`,children:(0,h.jsx)(`span`,{className:`text-[11px] font-semibold text-ink-muted`,children:`Option label`})})})]})},x=[`Playground`,`Parts`,`States`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<Record<string, string>>(args.value);
    return <div className="max-w-[420px]"><DescriptorFields {...args} value={value} onChange={setValue} /></div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Rows" nota="Rótulo (FieldLabel, como Provider y Notes) y una píldora por opción, que envuelven en vez de quedar en columnas fijas.">
        <Tabla encabezado={['Row', 'Options']} minimo={520}>
          {DESCRIPTOR_ROWS.map(r => <tr key={r.id}><td className="font-semibold">{r.label}</td><td>{r.options.join(' · ')}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Bloque titulo="Empty" nota="Nada elegido: la condición creada sin tocar la guía.">
          <div className="max-w-[380px]"><DescriptorFields value={{}} onChange={() => {}} /></div>
        </Bloque>
        <Bloque titulo="Selected" nota="Dos filas elegidas (hover y foco: Playground).">
          <div className="max-w-[380px]"><DescriptorFields value={{
            colors: 'White',
            borders: 'Raised'
          }} onChange={() => {}} /></div>
        </Bloque>
      </div>
    </Lienzo>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Rows" nota="Gap de 16 entre filas, 6 entre el rótulo y las píldoras, 6 entre píldoras de una misma fila.">
        <Tabla encabezado={['Item', 'Sample', 'Padding', 'Radius']} minimo={560}>
          <PildoraMedida />
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules" nota="Una elección por fila: tocar otra píldora la reemplaza. Tocar la ya elegida la deselecciona. Ninguna fila es obligatoria.">
        <ConRotulo rotulo="Unselected"><span className="text-[11px] font-semibold text-ink-muted">Option label</span></ConRotulo>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as Parts,_ as Playground,b as Specs,y as States,x as __namedExportsOrder,g as default};
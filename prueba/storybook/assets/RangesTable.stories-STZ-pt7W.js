import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,n as i,t as a}from"./RangesTable-C_lCe8cB.js";import{R as o,a as s}from"./finanzas-DVzIcMd6.js";import{a as c,d as l,f as u,i as d,l as f,t as p,u as m}from"./kit-Di92TvVK.js";function h({rangos:e,tipo:t,intentado:n,nombre:i}){let[o,c]=(0,g.useState)(e),l=s.find(e=>e.nombre===i)??s[0];return(0,_.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,_.jsx)(a,{tipo:t,rangos:o,onChange:c,excepciones:l.excepciones,intentado:n}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>c([...o,r()]),className:`self-start text-[13px] font-medium text-dash-blue`,children:`+ Add Range`})]})}var g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{g=t(),i(),u(),o(),_=n(),v={title:`Components/Finance/RangesTable`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/RangesTable.tsx`,description:{component:[`La tabla de rangos de una coverage table (red.dev): la de cada plantilla en *Coverage Table* y la de cada plan en su pestaña *Coverage Table*.`,``,`Cada fila es un rango de códigos CDT (*R. Min* – *R. Max*), su categoría, el tipo de deducible y lo que paga: un % con Type *Percentage* o un monto con *Copayment*. *Exc* cuenta las excepciones de la plantilla que caen en el rango. En el celular cada rango baja a dos columnas.`,``,`**Probalo:** en *Playground* editá un rango, sumá uno vacío con el botón de abajo o borrá uno con el tacho.`].join(`
`)}}},args:{tabla:s[0].nombre,tipo:`Percentage`,ancho:960},argTypes:{tabla:{control:`select`,options:s.map(e=>e.nombre),description:`La plantilla de la que salen los rangos y las excepciones.`},tipo:{control:`inline-radio`,options:[`Percentage`,`Copayment`],description:`Percentage pide un %; Copayment, un monto.`},ancho:{control:{type:`range`,min:360,max:1100,step:10},description:`Ancho del contenedor.`}}},y={render:({tabla:e,tipo:t,ancho:n})=>{let r=s.find(t=>t.nombre===e)??s[0];return(0,_.jsx)(`div`,{style:{width:n,maxWidth:`100%`},children:(0,_.jsx)(h,{rangos:r.rangos,tipo:t,nombre:e},e+t)})}},b={parameters:{controls:{disable:!0}},render:()=>(0,_.jsx)(d,{children:(0,_.jsx)(p,{titulo:`Parts`,children:(0,_.jsx)(m,{partes:[[`Code ranges`,`Desde y hasta, en mayúsculas y sólo D + dígitos (D0100). Obligatorios.`,`TextField hideLabel`],[`Category`,`Texto libre (Diagnostic, Endodontics…). Obligatoria.`,`TextField hideLabel`],[`Deductible type`,`Basic, Major, None, Orthodontic o Preventive.`,`SelectField hideLabel`],[`Coverage % / Copayment`,`Lo que paga: 0–100 con Percentage, un monto con Copayment.`,`TextField hideLabel`],[`Exc`,`Cuántas excepciones de la plantilla caen en el rango (sólo lectura).`,`span`],[`Tacho`,`Saca el rango; se guarda con el Save de la pantalla.`,`button`],[`Empty`,`Sin rangos: “No procedure ranges found”.`,`EmptyState`]]})})})},x={parameters:{controls:{disable:!0}},render:()=>(0,_.jsx)(d,{children:(0,_.jsxs)(p,{titulo:`States`,children:[(0,_.jsx)(c,{titulo:`Empty`,nota:`Sin rangos (Inicio en red.dev).`,children:(0,_.jsx)(h,{rangos:[],tipo:`Percentage`,nombre:s[0].nombre})}),(0,_.jsx)(c,{titulo:`Validation error`,nota:`Save con un rango incompleto: lo obligatorio en rojo (Required).`,children:(0,_.jsx)(h,{rangos:[r()],tipo:`Percentage`,intentado:!0,nombre:s[0].nombre})}),(0,_.jsx)(c,{titulo:`Copayment`,nota:`El último valor es un monto.`,children:(0,_.jsx)(h,{rangos:s[3].rangos.slice(0,3),tipo:`Copayment`,nombre:s[3].nombre})})]})})},S={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(d,{children:[(0,_.jsx)(p,{titulo:`Measures`,children:(0,_.jsxs)(f,{encabezado:[`Piece`,`Value`],children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Columnas`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`1.3fr · 1.6fr · 150 · 110 · 40 · 32, gap 12`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Fila`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`campos de 36px, 12px arriba y abajo, línea entre filas`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Encabezado`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`12px Medium; el * de obligatorio en rojo`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Celular (<640px)`}),(0,_.jsx)(`td`,{children:`dos columnas: rango y categoría a lo ancho, el resto de a dos`})]})]})}),(0,_.jsx)(p,{titulo:`Colors`,children:(0,_.jsxs)(f,{encabezado:[`Piece`,`Token`],children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Encabezado, Exc`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`ink-muted`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Línea entre filas`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`line`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Tacho`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`dash-bad-fg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Obligatorio`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`required`})})]})]})})]})},C=[`Playground`,`Parts`,`States`,`Specs`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: ({
    tabla,
    tipo,
    ancho
  }) => {
    const t = COBERTURAS.find(c => c.nombre === tabla) ?? COBERTURAS[0];
    return <div style={{
      width: ancho,
      maxWidth: '100%'
    }}><Editable key={tabla + tipo} rangos={t.rangos} tipo={tipo} nombre={tabla} /></div>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Code ranges', 'Desde y hasta, en mayúsculas y sólo D + dígitos (D0100). Obligatorios.', 'TextField hideLabel'], ['Category', 'Texto libre (Diagnostic, Endodontics…). Obligatoria.', 'TextField hideLabel'], ['Deductible type', 'Basic, Major, None, Orthodontic o Preventive.', 'SelectField hideLabel'], ['Coverage % / Copayment', 'Lo que paga: 0–100 con Percentage, un monto con Copayment.', 'TextField hideLabel'], ['Exc', 'Cuántas excepciones de la plantilla caen en el rango (sólo lectura).', 'span'], ['Tacho', 'Saca el rango; se guarda con el Save de la pantalla.', 'button'], ['Empty', 'Sin rangos: “No procedure ranges found”.', 'EmptyState']]} />
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestra titulo="Empty" nota="Sin rangos (Inicio en red.dev).">
          <Editable rangos={[]} tipo="Percentage" nombre={COBERTURAS[0].nombre} />
        </Muestra>
        <Muestra titulo="Validation error" nota="Save con un rango incompleto: lo obligatorio en rojo (Required).">
          <Editable rangos={[rangoVacio()]} tipo="Percentage" intentado nombre={COBERTURAS[0].nombre} />
        </Muestra>
        <Muestra titulo="Copayment" nota="El último valor es un monto.">
          <Editable rangos={COBERTURAS[3].rangos.slice(0, 3)} tipo="Copayment" nombre={COBERTURAS[3].nombre} />
        </Muestra>
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Columnas</td><td className="tabular-nums">1.3fr · 1.6fr · 150 · 110 · 40 · 32, gap 12</td></tr>
          <tr><td className="font-semibold">Fila</td><td className="tabular-nums">campos de 36px, 12px arriba y abajo, línea entre filas</td></tr>
          <tr><td className="font-semibold">Encabezado</td><td className="tabular-nums">12px Medium; el * de obligatorio en rojo</td></tr>
          <tr><td className="font-semibold">Celular (&lt;640px)</td><td>dos columnas: rango y categoría a lo ancho, el resto de a dos</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Encabezado, Exc</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Línea entre filas</td><td><Token nombre="line" /></td></tr>
          <tr><td className="font-semibold">Tacho</td><td><Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Obligatorio</td><td><Token nombre="required" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}}})))()}w();export{b as Parts,y as Playground,S as Specs,x as States,C as __namedExportsOrder,v as default};
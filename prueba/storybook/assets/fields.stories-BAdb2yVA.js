import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,d as a,i as o,l as s,o as c,t as l,u}from"./kit-4bQS7S9u.js";import{R as d,y as f}from"./finanzas-Cd24vV6l.js";import{i as p,n as m,r as h,t as g}from"./fields-5StTt2QV.js";function _({unit:e,error:t,disabled:n}){let[r,i]=(0,b.useState)(30);return(0,x.jsx)(h,{label:`Expected Period of Insurance Claim Resolution`,required:!0,unit:e,value:r,onChange:i,disabled:n,error:t?`This field is required.`:void 0})}function v({codigo:e,error:t}){let[n,r]=(0,b.useState)({...f,codigo:e,area:`800`,numero:`4517715`}),i={...n,codigo:e};return(0,x.jsx)(m,{required:!0,value:i,onChange:r,errores:t?{area:`This field is required.`,numero:`This field is required.`}:void 0})}function y({inicial:e=1250,invalid:t}){let[n,r]=(0,b.useState)(e);return(0,x.jsx)(g,{label:`D2740 new fee`,value:n,onChange:r,invalid:t,className:`w-32`})}var b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{b=t(),p(),a(),d(),x=n(),S={title:`Components/Finance/Fields`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/fields.tsx`,description:{component:[`Los tres campos de *Settings → Billing* que el formulario base no tiene, copiados de red.dev con nuestro estilo:`,``,`- **UnitField**: un número con su unidad (*days*, *months*, *years*) y flechas para bajar o subir. Expected Period of Insurance Claim Resolution, Waiting Period, Dependent Max Age.`,`- **PhoneFields**: Country Code y el número. Con (+1) el número va en dos campos, *Area Code (3 digits)* y *Number (7 digits)*; con otro país, uno solo. Sólo guarda dígitos.`,`- **MoneyInput**: un monto en una celda de tabla. Se escribe el número y al salir se ve como $1,250.00.`,``,`**Probalo:** en *Playground* elegí el campo y cambiá el país, el error o el estado deshabilitado.`].join(`
`)}}},args:{campo:`Unit field`,unit:`days`,country:f.codigo,error:!1,disabled:!1},argTypes:{campo:{control:`inline-radio`,options:[`Unit field`,`Phone fields`,`Money input`],description:`Qué campo mostrar.`},unit:{control:`inline-radio`,options:[`days`,`months`,`years`],description:`UnitField: la unidad.`},country:{control:`select`,options:[`(+1) United States of America (the)`,`(+52) Mexico`,`(+54) Argentina`],description:`PhoneFields: el código de país.`},error:{control:`boolean`,description:`Muestra el error de validación.`},disabled:{control:`boolean`,description:`UnitField deshabilitado.`}}},C={render:({campo:e,unit:t,country:n,error:r,disabled:i})=>(0,x.jsxs)(`div`,{className:`max-w-[640px]`,children:[e===`Unit field`&&(0,x.jsx)(_,{unit:t,error:r,disabled:i}),e===`Phone fields`&&(0,x.jsx)(v,{codigo:n,error:r},n),e===`Money input`&&(0,x.jsx)(y,{invalid:r})]})},w={parameters:{controls:{disable:!0}},render:()=>(0,x.jsx)(o,{children:(0,x.jsx)(l,{titulo:`Parts`,children:(0,x.jsx)(s,{partes:[[`UnitField · número`,`Se escribe o se cambia con las flechas; no baja del mínimo (0).`,`input type=number`],[`UnitField · flechas`,`Bajar y subir de a uno; cada una con su aria-label (Decrease…, Increase…).`,`button`],[`UnitField · unidad`,`days, months o years, en gris a la derecha.`,`span`],[`PhoneFields · Country Code`,`Elige el país; con (+1) aparecen Area Code y Number.`,`SelectField`],[`PhoneFields · Area Code / Number`,`Sólo dígitos: 3 y 7 con (+1); Number se ve como 451-7715.`,`TextField`],[`MoneyInput`,`Monto alineado a la derecha; al enfocar muestra el número, al salir $0.00.`,`input inputMode=decimal`]]})})})},T={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(o,{children:[(0,x.jsx)(l,{titulo:`UnitField`,children:(0,x.jsxs)(c,{children:[(0,x.jsx)(r,{titulo:`Default`,ancho:300,children:(0,x.jsx)(_,{unit:`days`})}),(0,x.jsx)(r,{titulo:`Error`,nota:`Validation: borde rojo y el mensaje abajo.`,ancho:300,children:(0,x.jsx)(_,{unit:`days`,error:!0})}),(0,x.jsx)(r,{titulo:`Disabled`,ancho:300,children:(0,x.jsx)(_,{unit:`months`,disabled:!0})})]})}),(0,x.jsx)(l,{titulo:`PhoneFields`,children:(0,x.jsxs)(c,{children:[(0,x.jsx)(r,{titulo:`(+1) — tres campos`,ancho:560,children:(0,x.jsx)(v,{codigo:`(+1) United States of America (the)`})}),(0,x.jsx)(r,{titulo:`Otro país — dos campos`,ancho:400,children:(0,x.jsx)(v,{codigo:`(+54) Argentina`})}),(0,x.jsx)(r,{titulo:`Error`,nota:`Required: Area Code y Number vacíos.`,ancho:560,children:(0,x.jsx)(v,{codigo:`(+1) United States of America (the)`,error:!0})})]})}),(0,x.jsx)(l,{titulo:`MoneyInput`,children:(0,x.jsxs)(c,{children:[(0,x.jsx)(r,{titulo:`With value`,children:(0,x.jsx)(y,{})}),(0,x.jsx)(r,{titulo:`Empty`,nota:`Placeholder $0.00.`,children:(0,x.jsx)(y,{inicial:null})}),(0,x.jsx)(r,{titulo:`Invalid`,children:(0,x.jsx)(y,{invalid:!0})})]})})]})},E={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(o,{children:[(0,x.jsx)(l,{titulo:`Measures`,children:(0,x.jsxs)(i,{encabezado:[`Piece`,`Value`],children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`UnitField, PhoneFields`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`36px de alto (h-9), texto 13px, rótulo 12px Medium`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Flechas`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`20 × 20, ícono 14px`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Unidad`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`12px`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`MoneyInput`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`32px de alto (h-8), texto 13px tabular, a la derecha`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`PhoneFields`}),(0,x.jsx)(`td`,{children:`tres columnas con (+1), dos con otro país; una en el celular`})]})]})}),(0,x.jsx)(l,{titulo:`Colors`,children:(0,x.jsxs)(i,{encabezado:[`Piece`,`Token`],children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Unidad, flechas`}),(0,x.jsxs)(`td`,{children:[(0,x.jsx)(u,{nombre:`ink-faint`}),` · `,(0,x.jsx)(u,{nombre:`ink-muted`})]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Error`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(u,{nombre:`field-error`})})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Borde, foco`}),(0,x.jsxs)(`td`,{children:[(0,x.jsx)(u,{nombre:`line`}),` · `,(0,x.jsx)(u,{nombre:`dash-blue`})]})]})]})})]})},D=[`Playground`,`Parts`,`States`,`Specs`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: ({
    campo,
    unit,
    country,
    error,
    disabled
  }) => <div className="max-w-[640px]">
      {campo === 'Unit field' && <Unidad unit={unit} error={error} disabled={disabled} />}
      {campo === 'Phone fields' && <Telefonos key={country} codigo={country} error={error} />}
      {campo === 'Money input' && <Monto invalid={error} />}
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['UnitField · número', 'Se escribe o se cambia con las flechas; no baja del mínimo (0).', 'input type=number'], ['UnitField · flechas', 'Bajar y subir de a uno; cada una con su aria-label (Decrease…, Increase…).', 'button'], ['UnitField · unidad', 'days, months o years, en gris a la derecha.', 'span'], ['PhoneFields · Country Code', 'Elige el país; con (+1) aparecen Area Code y Number.', 'SelectField'], ['PhoneFields · Area Code / Number', 'Sólo dígitos: 3 y 7 con (+1); Number se ve como 451-7715.', 'TextField'], ['MoneyInput', 'Monto alineado a la derecha; al enfocar muestra el número, al salir $0.00.', 'input inputMode=decimal']]} />
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="UnitField">
        <Muestras>
          <Muestra titulo="Default" ancho={300}><Unidad unit="days" /></Muestra>
          <Muestra titulo="Error" nota="Validation: borde rojo y el mensaje abajo." ancho={300}><Unidad unit="days" error /></Muestra>
          <Muestra titulo="Disabled" ancho={300}><Unidad unit="months" disabled /></Muestra>
        </Muestras>
      </Bloque>
      <Bloque titulo="PhoneFields">
        <Muestras>
          <Muestra titulo="(+1) — tres campos" ancho={560}><Telefonos codigo="(+1) United States of America (the)" /></Muestra>
          <Muestra titulo="Otro país — dos campos" ancho={400}><Telefonos codigo="(+54) Argentina" /></Muestra>
          <Muestra titulo="Error" nota="Required: Area Code y Number vacíos." ancho={560}><Telefonos codigo="(+1) United States of America (the)" error /></Muestra>
        </Muestras>
      </Bloque>
      <Bloque titulo="MoneyInput">
        <Muestras>
          <Muestra titulo="With value"><Monto /></Muestra>
          <Muestra titulo="Empty" nota="Placeholder $0.00."><Monto inicial={null} /></Muestra>
          <Muestra titulo="Invalid"><Monto invalid /></Muestra>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">UnitField, PhoneFields</td><td className="tabular-nums">36px de alto (h-9), texto 13px, rótulo 12px Medium</td></tr>
          <tr><td className="font-semibold">Flechas</td><td className="tabular-nums">20 × 20, ícono 14px</td></tr>
          <tr><td className="font-semibold">Unidad</td><td className="tabular-nums">12px</td></tr>
          <tr><td className="font-semibold">MoneyInput</td><td className="tabular-nums">32px de alto (h-8), texto 13px tabular, a la derecha</td></tr>
          <tr><td className="font-semibold">PhoneFields</td><td>tres columnas con (+1), dos con otro país; una en el celular</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Unidad, flechas</td><td><Token nombre="ink-faint" /> · <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Error</td><td><Token nombre="field-error" /></td></tr>
          <tr><td className="font-semibold">Borde, foco</td><td><Token nombre="line" /> · <Token nombre="dash-blue" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...E.parameters?.docs?.source}}}})))()}O();export{w as Parts,C as Playground,E as Specs,T as States,D as __namedExportsOrder,S as default};
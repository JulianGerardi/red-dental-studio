import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{j as n,z as r}from"./finanzas-CWUsFos6.js";import{f as i,i as a,l as o,t as s,u as c}from"./kit-Di92TvVK.js";import{i as l,r as u,t as d}from"./kit-drawer-CIzMwpmc.js";import{i as f,n as p,o as m,r as h}from"./play-Dr1R_I1D.js";import{i as g,n as _,r as v,t as y}from"./FeeScheduleTools-Cv0OSwnW.js";var b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{g(),h(),l(),i(),r(),b=t(),x={title:`Components/Finance/FeeScheduleTools`,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/FeeScheduleTools.tsx`,story:{inline:!1,iframeHeight:560},description:{component:[`Las dos herramientas del editor de un fee schedule, arriba a la derecha como en red.dev:`,``,`- **Copy form**: *Select the fee schedule you want to replace with*. Trae los precios de otro fee schedule activo a la columna *New Fee*.`,`- **Bulk Edit** → **Increase All**: sube (o baja, con un número negativo) los *New Fee* en $ o en %, con *Exclude $0.0 fees from the increase* y *Round up the value to the nearest dollar*. Con filas tildadas en la tabla pasa a **Increase Selected** y cambia sólo esas (pedido de Julián; red.dev sube todas).`,``,`Ninguna guarda: los cambios quedan en *New Fee* hasta el *Save* del editor, que crea la versión nueva desde *Available From*.`,``,`**Probalo:** en *Playground* elegí la herramienta y cuántas filas hay tildadas.`].join(`
`)}}},args:{herramienta:`Increase all`,seleccionados:0},argTypes:{herramienta:{control:`inline-radio`,options:[`Copy form`,`Increase all`],description:`Qué drawer abrir.`},seleccionados:{control:{type:`number`,min:0,max:26},description:`Increase All: filas tildadas en la tabla (0 = todas).`}},render:({herramienta:e,seleccionados:t})=>e===`Copy form`?(0,b.jsx)(y,{opciones:S,onClose:()=>{},onCopiar:()=>{}}):(0,b.jsx)(_,{seleccionados:t,onClose:()=>{},onAplicar:()=>{}},t)},S=[`Aetna 2026`,`Delta Dental PPO 2026`,`PPO Premium Plan`,`Medicaid`],C={},w={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsxs)(a,{children:[(0,b.jsx)(s,{titulo:`Copy form`,children:(0,b.jsx)(c,{partes:[[`Fee schedule`,`Select con los otros fee schedules activos; placeholder “Select an option”.`,`SelectField`],[`Pie`,`Cancel · Confirm.`,`FormFooter`]]})}),(0,b.jsx)(s,{titulo:`Increase All / Increase Selected`,children:(0,b.jsx)(c,{partes:[[`Increase all fees by`,`Monto o porcentaje; distinto de 0. Con selección: Increase Selected Fees By.`,`TextField`],[`By`,`$ o %.`,`SelectField`],[`Exclude $0.0 fees from the increase`,`Los que valen $0 quedan igual.`,`OptionCheckbox`],[`Round up the value to the nearest dollar`,`Redondea para arriba.`,`OptionCheckbox`],[`Pie`,`Cancel · Confirm.`,`FormFooter`]]})})]})},T={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsx)(d,{estados:[{estado:`Increase all`,cuando:`Sin filas tildadas: cambia todos los New Fee.`,story:`Playground`},{estado:`Increase selected`,cuando:`Con filas tildadas: título, bajada y rótulo dicen cuántas.`,story:`Increase selected`},{estado:`Validation error`,cuando:`Confirm con el monto vacío o en 0: “Enter an amount other than 0.”.`,story:`With Validation Error`},{estado:`Copy form error`,cuando:`Confirm sin elegir: “Select the fee schedule to copy.”.`,story:`Copy Form Error`}]})},E={args:{seleccionados:3}},D={play:m(f(/^confirm$/i),p(/other than 0/i))},O={args:{herramienta:`Copy form`},play:m(f(/^confirm$/i),p(/select the fee schedule to copy/i))},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsxs)(a,{children:[(0,b.jsx)(u,{filas:[[`Size`,`sm · 480px las dos`],[`aumentar()`,`% multiplica, $ suma; Round up usa Math.ceil; si no, 2 decimales.`]]}),(0,b.jsx)(s,{titulo:`Ejemplos de aumentar()`,children:(0,b.jsxs)(o,{encabezado:[`Fee`,`Increase`,`New fee`],children:[(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(92)}),(0,b.jsx)(`td`,{children:`10 %`}),(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(v(92,{monto:10,por:`%`,excluirCeros:!1,redondear:!1}))})]}),(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(92)}),(0,b.jsx)(`td`,{children:`10 % · Round up`}),(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(v(92,{monto:10,por:`%`,excluirCeros:!1,redondear:!0}))})]}),(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(0)}),(0,b.jsx)(`td`,{children:`$5 · Exclude $0.0`}),(0,b.jsx)(`td`,{className:`tabular-nums`,children:n(v(0,{monto:5,por:`$`,excluirCeros:!0,redondear:!1}))})]})]})})]})},A=[`Playground`,`Parts`,`States`,`IncreaseSelected`,`WithValidationError`,`CopyFormError`,`Specs`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Copy form">
        <TablaPartes partes={[['Fee schedule', 'Select con los otros fee schedules activos; placeholder “Select an option”.', 'SelectField'], ['Pie', 'Cancel · Confirm.', 'FormFooter']]} />
      </Bloque>
      <Bloque titulo="Increase All / Increase Selected">
        <TablaPartes partes={[['Increase all fees by', 'Monto o porcentaje; distinto de 0. Con selección: Increase Selected Fees By.', 'TextField'], ['By', '$ o %.', 'SelectField'], ['Exclude $0.0 fees from the increase', 'Los que valen $0 quedan igual.', 'OptionCheckbox'], ['Round up the value to the nearest dollar', 'Redondea para arriba.', 'OptionCheckbox'], ['Pie', 'Cancel · Confirm.', 'FormFooter']]} />
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <EstadosDelDrawer estados={[{
    estado: 'Increase all',
    cuando: 'Sin filas tildadas: cambia todos los New Fee.',
    story: 'Playground'
  }, {
    estado: 'Increase selected',
    cuando: 'Con filas tildadas: título, bajada y rótulo dicen cuántas.',
    story: 'Increase selected'
  }, {
    estado: 'Validation error',
    cuando: 'Confirm con el monto vacío o en 0: “Enter an amount other than 0.”.',
    story: 'With Validation Error'
  }, {
    estado: 'Copy form error',
    cuando: 'Confirm sin elegir: “Select the fee schedule to copy.”.',
    story: 'Copy Form Error'
  }]} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    seleccionados: 3
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^confirm$/i), esperar(/other than 0/i))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    herramienta: 'Copy form'
  },
  play: secuencia(pulsar(/^confirm$/i), esperar(/select the fee schedule to copy/i))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <SpecsDelDrawer filas={[['Size', 'sm · 480px las dos'], ['aumentar()', '% multiplica, $ suma; Round up usa Math.ceil; si no, 2 decimales.']]} />
      <Bloque titulo="Ejemplos de aumentar()">
        <Tabla encabezado={['Fee', 'Increase', 'New fee']}>
          <tr><td className="tabular-nums">{dinero(92)}</td><td>10 %</td><td className="tabular-nums">{dinero(aumentar(92, {
              monto: 10,
              por: '%',
              excluirCeros: false,
              redondear: false
            }))}</td></tr>
          <tr><td className="tabular-nums">{dinero(92)}</td><td>10 % · Round up</td><td className="tabular-nums">{dinero(aumentar(92, {
              monto: 10,
              por: '%',
              excluirCeros: false,
              redondear: true
            }))}</td></tr>
          <tr><td className="tabular-nums">{dinero(0)}</td><td>$5 · Exclude $0.0</td><td className="tabular-nums">{dinero(aumentar(0, {
              monto: 5,
              por: '$',
              excluirCeros: true,
              redondear: false
            }))}</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}}})))()}j();export{O as CopyFormError,E as IncreaseSelected,w as Parts,C as Playground,k as Specs,T as States,D as WithValidationError,A as __namedExportsOrder,x as default};
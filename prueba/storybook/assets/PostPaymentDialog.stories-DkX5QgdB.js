import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,l as i}from"./ledger-CZ3NwwJq.js";import{f as a,n as o,t as s}from"./billing-hTXF5fvV.js";import{f as c,i as l,l as u,t as d}from"./kit-Di92TvVK.js";import{i as f,n as p,r as m,t as h}from"./kit-drawer-CIzMwpmc.js";import{i as g,n as _,o as v,r as y}from"./play-Dr1R_I1D.js";import{n as b,t as x}from"./PostPaymentDialog-DyHA9Oqg.js";var S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{a(),f(),c(),y(),b(),S=t(),C={title:`Components/Billing/PostPaymentDialog`,component:x,parameters:{layout:`fullscreen`,docs:{jira:[`CON-4147`,`CON-1060`,`CON-3732`],story:{inline:!1,iframeHeight:680},description:{component:["Los tres drawers que cargan un movimiento en la cuenta de un paciente, **uno por botón, como red.dev** (CON-4147): *Patient Payment (-)* abre **New Patient Payment (-)**, *Credit Adjustment (-)* abre **Credit Adjustment (-)** y *Charge Adjustment (+)* abre **Enter Charge (+) Adjustment**. Es un solo componente: `tipoInicial` decide qué drawer arma. Lo abren Billing (con un paciente elegido) y el Ledger del paciente.",``,`**Cómo se usa:** el pago y el crédito tienen dos pasos -los datos y *Allocation*, la tabla donde se elige a qué cargos se aplica-; lo que no se aplica queda como crédito sin aplicar. El pago acepta **varios métodos** con + y −, y *Check Payment* pide Check y Bank/Branch. El cargo es de un solo paso: suma Provider y Visit date y no lleva tabla de aplicación. *Apply to* ofrece al paciente y a los demás de su garante.`,``,`**Probalo:** en *Playground* elegí el tipo desde *Controls*. *Parts* muestra los pasos de cada drawer y las listas de red.dev, *States* cada estado con su story y *Specs* los anchos.`].join(`
`)}}},args:{tipoInicial:`Patient Payment`,movs:s,aplicaciones:o,garante:`John Hayes`,dependientes:[`Maria Abril Viola`],alcanceInicial:`Maria Abril Viola`,onClose:()=>{},onGuardar:()=>{}},argTypes:{tipoInicial:{control:`select`,options:[`Patient Payment`,`Credit Adjustment`,`Charge Adjustment`],description:`Qué botón se tocó: decide el título, los campos y si hay paso Allocation.`},alcanceInicial:{control:`text`,description:`A quién se aplica al abrir: el nombre de un paciente o @guarantor (todo el hogar).`}}},w={layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},T={},E={},D={args:{tipoInicial:`Credit Adjustment`}},O={args:{tipoInicial:`Charge Adjustment`}},k={args:{tipoInicial:`Charge Adjustment`},play:v(g(/^save$/i),_(/required|at least|must|invalid/i))},A={play:v(g(/add another payment method/i),_(/remove this payment method/i))},j={parameters:w,render:()=>(0,S.jsxs)(l,{children:[(0,S.jsx)(p,{nota:`New Patient Payment (-) y Credit Adjustment (-). Enter Charge (+) Adjustment es de un solo paso, sin Allocation.`,pasos:[{nombre:`Payment / Adjustment`,secciones:`Date · Apply to · métodos de pago (o tipo de ajuste) · Amount · Notes`,obligatorios:`Amount mayor a cero; con Check Payment, Check y Bank/Branch`},{nombre:`Allocation`,secciones:`La tabla de cargos abiertos con lo que se aplica a cada uno`,obligatorios:`Nada: lo que no se aplica queda como crédito`}]}),(0,S.jsx)(d,{titulo:`Lists from red.dev`,nota:`Viven en data/billing.ts.`,children:(0,S.jsxs)(u,{encabezado:[`List`,`Options`],minimo:640,arriba:!0,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Payment methods`}),(0,S.jsx)(`td`,{children:n.join(` · `)})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Credit adjustment types`}),(0,S.jsx)(`td`,{children:i.join(` · `)})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Charge adjustment types`}),(0,S.jsx)(`td`,{children:r.join(` · `)})]})]})})]})},M={parameters:w,render:()=>(0,S.jsx)(h,{estados:[{estado:`New patient payment (-)`,cuando:`Patient Payment (-) en Billing o en el Ledger.`,story:`Patient Payment`},{estado:`Credit adjustment (-)`,cuando:`Credit Adjustment (-).`,story:`Credit Adjustment`},{estado:`Enter charge (+) adjustment`,cuando:`Charge Adjustment (+): un solo paso, con Provider y Visit date.`,story:`Charge Adjustment`},{estado:`Validation errors`,cuando:`Save o Next Step sin Amount.`,story:`With Validation Errors`},{estado:`Several payment methods`,cuando:`Add another payment method.`,story:`Several Payment Methods`}]})},N={parameters:w,render:()=>(0,S.jsx)(m,{filas:[[`Width · payment and credit`,`2xl · 1000px, para que la tabla de Allocation entre entera`],[`Width · charge`,`El ancho por defecto de los drawers de formulario (ModalShell)`],[`Fields`,`De a dos y del mismo ancho; Notes ocupa el ancho entero`],[`Footer · payment and credit`,`Cancel / Next Step en el primer paso; Return / Save en Allocation`],[`Footer · charge`,`Cancel / Save: un solo paso`]]})},P=[`Playground`,`PatientPayment`,`CreditAdjustment`,`ChargeAdjustment`,`WithValidationErrors`,`SeveralPaymentMethods`,`Parts`,`States`,`Specs`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Credit Adjustment'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Charge Adjustment'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Charge Adjustment'
  },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/add another payment method/i), esperar(/remove this payment method/i))
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <PasosDelDrawer nota="New Patient Payment (-) y Credit Adjustment (-). Enter Charge (+) Adjustment es de un solo paso, sin Allocation." pasos={[{
      nombre: 'Payment / Adjustment',
      secciones: 'Date · Apply to · métodos de pago (o tipo de ajuste) · Amount · Notes',
      obligatorios: 'Amount mayor a cero; con Check Payment, Check y Bank/Branch'
    }, {
      nombre: 'Allocation',
      secciones: 'La tabla de cargos abiertos con lo que se aplica a cada uno',
      obligatorios: 'Nada: lo que no se aplica queda como crédito'
    }]} />
      <Bloque titulo="Lists from red.dev" nota="Viven en data/billing.ts.">
        <Tabla encabezado={['List', 'Options']} minimo={640} arriba>
          <tr><td className="font-semibold whitespace-nowrap">Payment methods</td><td>{METODOS_PAGO.join(' · ')}</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">Credit adjustment types</td><td>{TIPOS_AJUSTE_CREDITO.join(' · ')}</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">Charge adjustment types</td><td>{TIPOS_AJUSTE_CARGO.join(' · ')}</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <EstadosDelDrawer estados={[{
    estado: 'New patient payment (-)',
    cuando: 'Patient Payment (-) en Billing o en el Ledger.',
    story: 'Patient Payment'
  }, {
    estado: 'Credit adjustment (-)',
    cuando: 'Credit Adjustment (-).',
    story: 'Credit Adjustment'
  }, {
    estado: 'Enter charge (+) adjustment',
    cuando: 'Charge Adjustment (+): un solo paso, con Provider y Visit date.',
    story: 'Charge Adjustment'
  }, {
    estado: 'Validation errors',
    cuando: 'Save o Next Step sin Amount.',
    story: 'With Validation Errors'
  }, {
    estado: 'Several payment methods',
    cuando: 'Add another payment method.',
    story: 'Several Payment Methods'
  }]} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <SpecsDelDrawer filas={[['Width · payment and credit', '2xl · 1000px, para que la tabla de Allocation entre entera'], ['Width · charge', 'El ancho por defecto de los drawers de formulario (ModalShell)'], ['Fields', 'De a dos y del mismo ancho; Notes ocupa el ancho entero'], ['Footer · payment and credit', 'Cancel / Next Step en el primer paso; Return / Save en Allocation'], ['Footer · charge', 'Cancel / Save: un solo paso']]} />
}`,...N.parameters?.docs?.source}}}})))()}F();export{O as ChargeAdjustment,D as CreditAdjustment,j as Parts,E as PatientPayment,T as Playground,A as SeveralPaymentMethods,N as Specs,M as States,k as WithValidationErrors,P as __namedExportsOrder,C as default};
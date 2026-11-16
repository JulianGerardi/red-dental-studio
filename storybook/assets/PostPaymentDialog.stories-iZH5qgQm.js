import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,d as r,g as i,u as a}from"./billing-4dwPr1Hn.js";import{f as o,i as s,l as c,t as l}from"./kit-Di92TvVK.js";import{i as u,n as d,r as f,t as p}from"./kit-drawer-BiLxbV4M.js";import{i as m,n as h,o as g,r as _}from"./play-Dr1R_I1D.js";import{n as v,t as y}from"./PostPaymentDialog-BSalkGY8.js";var b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),u(),o(),_(),v(),b=t(),x={title:`Components/Billing/PostPaymentDialog`,component:y,parameters:{layout:`fullscreen`,docs:{jira:[`CON-4147`,`CON-1060`,`CON-3732`],story:{inline:!1,iframeHeight:680},description:{component:["Los tres drawers que cargan un movimiento en la cuenta de un paciente, **uno por botón, como red.dev** (CON-4147): *Patient Payment (-)* abre **New Patient Payment (-)**, *Credit Adjustment (-)* abre **Credit Adjustment (-)** y *Charge Adjustment (+)* abre **Enter Charge (+) Adjustment**. Es un solo componente: `tipoInicial` decide qué drawer arma. Lo abren Billing (con un paciente elegido) y el Ledger del paciente.",``,`**Cómo se usa:** el pago y el crédito tienen dos pasos -los datos y *Allocation*, la tabla donde se elige a qué cargos se aplica-; lo que no se aplica queda como crédito sin aplicar. El pago acepta **varios métodos** con + y −, y *Check Payment* pide Check y Bank/Branch. El cargo es de un solo paso: suma Provider y Visit date y no lleva tabla de aplicación. *Apply to* ofrece al paciente y a los demás de su garante.`,``,`**Probalo:** en *Playground* elegí el tipo desde *Controls*. *Parts* muestra los pasos de cada drawer y las listas de red.dev, *States* cada estado con su story y *Specs* los anchos.`].join(`
`)}}},args:{tipoInicial:`Patient Payment`,pacienteInicial:`Maria Abril Viola`,onClose:()=>{},onGuardar:()=>{}},argTypes:{tipoInicial:{control:`select`,options:[`Patient Payment`,`Credit Adjustment`,`Charge Adjustment`],description:`Qué botón se tocó: decide el título, los campos y si hay paso Allocation.`},pacienteInicial:{control:`text`,description:`El paciente elegido en Billing o el de la ficha: Apply to ofrece a su grupo de garante.`}}},S={layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},C={},w={},T={args:{tipoInicial:`Credit Adjustment`}},E={args:{tipoInicial:`Charge Adjustment`}},D={args:{tipoInicial:`Charge Adjustment`},play:g(m(/^save$/i),h(/required|at least|must|invalid/i))},O={play:g(m(/add another payment method/i),h(/remove this payment method/i))},k={parameters:S,render:()=>(0,b.jsxs)(s,{children:[(0,b.jsx)(d,{nota:`New Patient Payment (-) y Credit Adjustment (-). Enter Charge (+) Adjustment es de un solo paso, sin Allocation.`,pasos:[{nombre:`Payment / Adjustment`,secciones:`Date · Apply to · métodos de pago (o tipo de ajuste) · Amount · Notes`,obligatorios:`Amount mayor a cero; con Check Payment, Check y Bank/Branch`},{nombre:`Allocation`,secciones:`La tabla de cargos abiertos con lo que se aplica a cada uno`,obligatorios:`Nada: lo que no se aplica queda como crédito`}]}),(0,b.jsx)(l,{titulo:`Lists from red.dev`,nota:`Viven en data/billing.ts.`,children:(0,b.jsxs)(c,{encabezado:[`List`,`Options`],minimo:640,arriba:!0,children:[(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Payment methods`}),(0,b.jsx)(`td`,{children:n.join(` · `)})]}),(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Credit adjustment types`}),(0,b.jsx)(`td`,{children:r.join(` · `)})]}),(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`Charge adjustment types`}),(0,b.jsx)(`td`,{children:a.join(` · `)})]})]})})]})},A={parameters:S,render:()=>(0,b.jsx)(p,{estados:[{estado:`New Patient Payment (-)`,cuando:`Patient Payment (-) en Billing o en el Ledger.`,story:`Patient Payment`},{estado:`Credit Adjustment (-)`,cuando:`Credit Adjustment (-).`,story:`Credit Adjustment`},{estado:`Enter Charge (+) Adjustment`,cuando:`Charge Adjustment (+): un solo paso, con Provider y Visit date.`,story:`Charge Adjustment`},{estado:`Validation errors`,cuando:`Save o Next Step sin Amount.`,story:`With Validation Errors`},{estado:`Several payment methods`,cuando:`Add another payment method.`,story:`Several Payment Methods`}]})},j={parameters:S,render:()=>(0,b.jsx)(f,{filas:[[`Width · payment and credit`,`2xl · 1000px, para que la tabla de Allocation entre entera`],[`Width · charge`,`El ancho por defecto de los drawers de formulario (ModalShell)`],[`Fields`,`De a dos y del mismo ancho; Notes ocupa el ancho entero`],[`Footer · payment and credit`,`Cancel / Next Step en el primer paso; Return / Save en Allocation`],[`Footer · charge`,`Cancel / Save: un solo paso`]]})},M=[`Playground`,`PatientPayment`,`CreditAdjustment`,`ChargeAdjustment`,`WithValidationErrors`,`SeveralPaymentMethods`,`Parts`,`States`,`Specs`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Credit Adjustment'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Charge Adjustment'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Charge Adjustment'
  },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/add another payment method/i), esperar(/remove this payment method/i))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <EstadosDelDrawer estados={[{
    estado: 'New Patient Payment (-)',
    cuando: 'Patient Payment (-) en Billing o en el Ledger.',
    story: 'Patient Payment'
  }, {
    estado: 'Credit Adjustment (-)',
    cuando: 'Credit Adjustment (-).',
    story: 'Credit Adjustment'
  }, {
    estado: 'Enter Charge (+) Adjustment',
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <SpecsDelDrawer filas={[['Width · payment and credit', '2xl · 1000px, para que la tabla de Allocation entre entera'], ['Width · charge', 'El ancho por defecto de los drawers de formulario (ModalShell)'], ['Fields', 'De a dos y del mismo ancho; Notes ocupa el ancho entero'], ['Footer · payment and credit', 'Cancel / Next Step en el primer paso; Return / Save en Allocation'], ['Footer · charge', 'Cancel / Save: un solo paso']]} />
}`,...j.parameters?.docs?.source}}}})))()}N();export{E as ChargeAdjustment,T as CreditAdjustment,k as Parts,w as PatientPayment,C as Playground,O as SeveralPaymentMethods,j as Specs,A as States,D as WithValidationErrors,M as __namedExportsOrder,x as default};
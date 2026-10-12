import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i}from"./button-R5lrVQ2-.js";import{i as a,n as o,r as s,t as c}from"./step-indicator-DeeqvE9V.js";import{c as l,d as u,i as d,n as f,o as p,t as m,u as h}from"./kit-4bQS7S9u.js";function g({total:e,current:t,names:n}){let[r,a]=(0,_.useState)(Math.min(t,e));return(0,v.jsxs)(`div`,{className:`flex w-[420px] max-w-full flex-col gap-4 rounded-lg border border-line bg-white p-6`,children:[(0,v.jsx)(s,{total:e,current:r,labels:n?y.slice(0,e):void 0}),(0,v.jsxs)(`div`,{className:`flex gap-3 [&>button]:flex-1`,children:[(0,v.jsx)(i,{variant:`secondary`,disabled:r<=1,onClick:()=>a(e=>e-1),children:`Return`}),(0,v.jsx)(i,{disabled:r>e,onClick:()=>a(e=>e+1),children:`Next Step`})]})]})}var _,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{_=t(),a(),r(),u(),v=n(),y=[`Procedure`,`Surfaces`,`Link to finding`,`Review`],b={title:`Elements/StepIndicator`,parameters:{layout:`padded`,docs:{description:{component:["Los pasos de un drawer con varias partes (`@/components/ui/step-indicator`). El drawer lo dibuja solo cuando recibe `steps`: New Patient, New Appointment, Edit Patient, New Location, New Employee, New Account, New Procedure, Post payment, las suscripciones.",``,`**Rótulos:** cada paso dice su nombre (General, Contact, Address; Procedure, Surfaces, Link to finding…) para que el usuario sepa qué está haciendo (Julián, 2026-10-06). Sin nombres dice "Step". El rótulo no ocupa ancho: la línea corre siempre de círculo a círculo, con nombres largos o cortos.`,``,`**Al avanzar:** el tilde entra con un rebote, un anillo verde se abre y la línea se llena en verde hacia el paso siguiente.`,``,`**Probalo:** en *Playground* cambiá la cantidad de pasos, el paso actual y los nombres desde *Controls*, y usá Next Step / Return.`].join(`
`)}}},args:{total:3,current:2,names:!0},argTypes:{total:{control:{type:`range`,min:2,max:4,step:1},description:`Cantidad de pasos.`},current:{control:{type:`range`,min:1,max:4,step:1},description:`Paso actual, desde 1.`},names:{control:`boolean`,description:`Cada paso con su nombre (lo que usan los drawers). Apagado dice "Step".`}}},x={render:e=>(0,v.jsx)(g,{...e},`${e.total}-${e.current}-${e.names}`)},S={parameters:{controls:{disable:!0}},render:()=>(0,v.jsx)(d,{children:(0,v.jsxs)(m,{titulo:`The pieces`,children:[(0,v.jsxs)(p,{children:[(0,v.jsx)(f,{rotulo:`Badge`,children:(0,v.jsx)(o,{estado:`active`,numero:2})}),(0,v.jsx)(f,{rotulo:`Connector`,children:(0,v.jsx)(`div`,{className:`flex w-40`,children:(0,v.jsx)(c,{lleno:!1})})}),(0,v.jsx)(f,{rotulo:`Label with a name`,children:(0,v.jsx)(`div`,{className:`flex w-24 justify-center`,children:(0,v.jsx)(o,{estado:`active`,numero:1,label:`Surfaces`})})})]}),(0,v.jsxs)(l,{encabezado:[`Part`,`What it does`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Badge`}),(0,v.jsx)(`td`,{children:`Círculo de 24px con el número; completo, un tilde.`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Connector`}),(0,v.jsx)(`td`,{children:`Línea de 2px entre dos círculos; se llena en verde al pasar al paso siguiente.`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,v.jsx)(`td`,{children:`"Step" o el nombre del paso, 10px arriba del círculo. No ocupa ancho: el primero se alinea a la izquierda, el último a la derecha y los del medio al centro.`})]})]})]})})},C={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(d,{children:[(0,v.jsx)(m,{titulo:`Each step`,nota:`Pending gris, active azul, complete verde con tilde.`,children:(0,v.jsxs)(p,{children:[(0,v.jsx)(f,{rotulo:`Pending`,children:(0,v.jsx)(o,{estado:`pending`,numero:3})}),(0,v.jsx)(f,{rotulo:`Active`,children:(0,v.jsx)(o,{estado:`active`,numero:2})}),(0,v.jsx)(f,{rotulo:`Complete`,children:(0,v.jsx)(o,{estado:`complete`,numero:1})})]})}),(0,v.jsx)(m,{titulo:`Whole bar`,nota:`Con "Step" y con nombres: los círculos y la línea quedan en el mismo lugar.`,children:(0,v.jsx)(l,{encabezado:[`Where`,`Step`,`Names`],minimo:600,children:[1,2,3].map(e=>(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:e===1?`First step`:e===2?`Middle step`:`Last step`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(`div`,{className:`w-[230px]`,children:(0,v.jsx)(s,{total:3,current:e})})}),(0,v.jsx)(`td`,{children:(0,v.jsx)(`div`,{className:`w-[230px]`,children:(0,v.jsx)(s,{total:3,current:e,labels:y.slice(0,3)})})})]},e))})})]})},w={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(d,{children:[(0,v.jsx)(m,{titulo:`Measures`,children:(0,v.jsxs)(l,{encabezado:[`Piece`,`Value`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Badge`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`24 × 24px, número 12px Semibold, tilde 10px`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Connector`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`2px de alto, de círculo a círculo`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`10px Medium, 15px de alto, 4px arriba del círculo`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`In a drawer`}),(0,v.jsx)(`td`,{children:`Debajo del título, 24px de margen a los costados, sin línea que lo separe.`})]})]})}),(0,v.jsx)(m,{titulo:`Colors`,children:(0,v.jsxs)(l,{encabezado:[`State`,`Badge`,`Label`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Pending`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`line-strong`})}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`ink-faint`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Active`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-blue`})}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-blue`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Complete`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-ok-fg`})}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-ok-fg`})})]})]})}),(0,v.jsx)(m,{titulo:`Motion`,nota:`Con movimiento reducido no hay animación.`,children:(0,v.jsxs)(l,{encabezado:[`When`,`What moves`,`Timing`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`A step completes`}),(0,v.jsx)(`td`,{children:`El tilde entra con un rebote (paso-check) y un anillo verde se abre (paso-anillo).`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`380ms · 700ms`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Then`}),(0,v.jsx)(`td`,{children:`La línea se llena en verde hacia el paso siguiente.`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`500ms, 150ms después`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`The content`}),(0,v.jsx)(`td`,{children:`El paso nuevo del drawer entra desde la derecha (Next) o desde la izquierda (Return).`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`260ms`})]})]})})]})},T=[`Playground`,`Parts`,`States`,`Specs`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{\n  render: args => <Demo key={`${args.total}-${args.current}-${args.names}`} {...args} />\n}",...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="The pieces">
        <Muestras>
          <ConRotulo rotulo="Badge"><Insignia estado="active" numero={2} /></ConRotulo>
          <ConRotulo rotulo="Connector"><div className="flex w-40"><Conector lleno={false} /></div></ConRotulo>
          <ConRotulo rotulo="Label with a name"><div className="flex w-24 justify-center"><Insignia estado="active" numero={1} label="Surfaces" /></div></ConRotulo>
        </Muestras>
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Badge</td><td>Círculo de 24px con el número; completo, un tilde.</td></tr>
          <tr><td className="font-semibold">Connector</td><td>Línea de 2px entre dos círculos; se llena en verde al pasar al paso siguiente.</td></tr>
          <tr><td className="font-semibold">Label</td><td>"Step" o el nombre del paso, 10px arriba del círculo. No ocupa ancho: el primero se alinea a la izquierda, el último a la derecha y los del medio al centro.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Each step" nota="Pending gris, active azul, complete verde con tilde.">
        <Muestras>
          <ConRotulo rotulo="Pending"><Insignia estado="pending" numero={3} /></ConRotulo>
          <ConRotulo rotulo="Active"><Insignia estado="active" numero={2} /></ConRotulo>
          <ConRotulo rotulo="Complete"><Insignia estado="complete" numero={1} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Whole bar" nota='Con "Step" y con nombres: los círculos y la línea quedan en el mismo lugar.'>
        <Tabla encabezado={['Where', 'Step', 'Names']} minimo={600}>
          {[1, 2, 3].map(n => <tr key={n}>
              <td className="font-semibold">{n === 1 ? 'First step' : n === 2 ? 'Middle step' : 'Last step'}</td>
              <td><div className="w-[230px]"><StepIndicator total={3} current={n} /></div></td>
              <td><div className="w-[230px]"><StepIndicator total={3} current={n} labels={NOMBRES.slice(0, 3)} /></div></td>
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Badge</td><td className="tabular-nums">24 × 24px, número 12px Semibold, tilde 10px</td></tr>
          <tr><td className="font-semibold">Connector</td><td className="tabular-nums">2px de alto, de círculo a círculo</td></tr>
          <tr><td className="font-semibold">Label</td><td className="tabular-nums">10px Medium, 15px de alto, 4px arriba del círculo</td></tr>
          <tr><td className="font-semibold">In a drawer</td><td>Debajo del título, 24px de margen a los costados, sin línea que lo separe.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['State', 'Badge', 'Label']}>
          <tr><td className="font-semibold">Pending</td><td><Token nombre="line-strong" /></td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Active</td><td><Token nombre="dash-blue" /></td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Complete</td><td><Token nombre="dash-ok-fg" /></td><td><Token nombre="dash-ok-fg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Motion" nota="Con movimiento reducido no hay animación.">
        <Tabla encabezado={['When', 'What moves', 'Timing']}>
          <tr><td className="font-semibold">A step completes</td><td>El tilde entra con un rebote (paso-check) y un anillo verde se abre (paso-anillo).</td><td className="tabular-nums">380ms · 700ms</td></tr>
          <tr><td className="font-semibold">Then</td><td>La línea se llena en verde hacia el paso siguiente.</td><td className="tabular-nums">500ms, 150ms después</td></tr>
          <tr><td className="font-semibold">The content</td><td>El paso nuevo del drawer entra desde la derecha (Next) o desde la izquierda (Return).</td><td className="tabular-nums">260ms</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}}})))()}E();export{S as Parts,x as Playground,w as Specs,C as States,T as __namedExportsOrder,b as default};
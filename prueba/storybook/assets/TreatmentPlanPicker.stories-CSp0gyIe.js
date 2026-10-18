import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,n as o,o as s,t as c,u as l}from"./kit-CWUgB5-0.js";import{a as u,i as d,n as f,o as p,s as m,t as h}from"./TreatmentPlanPicker-D_CuIbHi.js";var g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{m(),i(),g=t(),_={id:`p1`,estado:`Accepted`,date:`02/12/2026`,doctor:`Dr. Elena Martinez`,therapy:`Crown and root canal`,visitas:2,procedimientos:4},v={id:`v1`,name:`Visit 1`,procedimientos:[`D3310 – Endodontic therapy`,`D2740 – Crown – porcelain/ceramic`],total:`$1,240.00`},y={fecha:`Sep 28, 2026`,hora:`1:15 PM`,estado:`Fulfilled`},b=[`Booked`,`Fulfilled`,`No Show`,`Cancelled`],x={title:`Components/Scheduling/TreatmentPlanPicker`,parameters:{layout:`padded`,docs:{description:{component:[`Las piezas del paso **Link to treatment plan visit** de New Appointment: la card del plan, la fila de la visita con su tabla de procedimientos y, desde 2026-10-17, **el aviso de que la visita ya está linkeada a otro turno** y la pregunta *Move treatment visit?* que aparece al guardar.`,``,`**Cuándo se usa:** una visita pertenece a un solo turno. Si ya tiene uno, se ve en su fila *antes* de elegirla; si igual se elige, Save pregunta si se mueve y recién ahí la desvincula del turno anterior.`,``,`**Probalo:** en *Playground* prendé *vinculada*, cambiá el estado del turno y elegí la fila.`].join(`
`)}}},args:{seleccionada:!0,vinculada:!0,estado:`Fulfilled`},argTypes:{seleccionada:{control:`boolean`,description:`La visita elegida abre la tabla de procedimientos.`},vinculada:{control:`boolean`,description:`La visita ya está linkeada a otro turno: se ve el bloque Linked appointment.`},estado:{control:`inline-radio`,options:b,description:`Estado del turno al que está linkeada, con el tono de los turnos de la app.`}}},S={render:({seleccionada:e,vinculada:t,estado:n})=>(0,g.jsx)(`div`,{className:`w-[420px] max-w-full`,children:(0,g.jsx)(p,{visita:{...v,vinculada:t?{...y,estado:n}:void 0},on:e,onClick:()=>{}},`${e}-${t}-${n}`)})},C={parameters:{controls:{disable:!0}},render:()=>(0,g.jsx)(a,{children:(0,g.jsxs)(c,{titulo:`Pieces`,nota:`Las dos que ya existían y las dos de la visita linkeada.`,children:[(0,g.jsxs)(s,{children:[(0,g.jsx)(o,{rotulo:`Plan card`,children:(0,g.jsx)(`div`,{className:`w-[380px] max-w-full`,children:(0,g.jsx)(f,{plan:_,on:!0,onClick:()=>{}})})}),(0,g.jsx)(o,{rotulo:`Visit row, linked`,children:(0,g.jsx)(`div`,{className:`w-[380px] max-w-full`,children:(0,g.jsx)(p,{visita:{...v,vinculada:y},on:!1,onClick:()=>{}})})}),(0,g.jsx)(o,{rotulo:`Linked appointment`,children:(0,g.jsx)(`div`,{className:`w-[340px] max-w-full`,children:(0,g.jsx)(u,{turno:y})})})]}),(0,g.jsxs)(r,{encabezado:[`Piece`,`What it does`],minimo:560,arriba:!0,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`PlanCard`}),(0,g.jsx)(`td`,{className:`text-ink-medium`,children:`El plan elegible: barra de color del estado, doctor, terapia, conteos y fecha.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`VisitRow`}),(0,g.jsx)(`td`,{className:`text-ink-medium`,children:`La visita: nombre, procedimientos, total; la elegida abre la tabla de códigos.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`TurnoVinculadoInfo`}),(0,g.jsx)(`td`,{className:`text-ink-medium`,children:`Bloque gris dentro de la fila con la fecha y la hora del otro turno, su estado en una Pill y el círculo de info (InfoTip) que explica que hay que moverla.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:`MoverVisitaDialog`}),(0,g.jsx)(`td`,{className:`text-ink-medium`,children:`La pregunta de sí o no al guardar: ConfirmDialog con Cancel y Move visit.`})]})]})]})})},w={parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(a,{children:[(0,g.jsx)(c,{titulo:`States`,nota:`Lo linkeado se ve sin elegir la visita: se decide antes de tocarla.`,children:(0,g.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-6`,children:[(0,g.jsx)(n,{titulo:`Free`,nota:`Sin turno: sólo la fila.`,ancho:380,children:(0,g.jsx)(p,{visita:v,on:!1,onClick:()=>{}})}),(0,g.jsx)(n,{titulo:`Selected`,nota:`Borde azul y la tabla de procedimientos.`,ancho:380,children:(0,g.jsx)(p,{visita:v,on:!0,onClick:()=>{}})}),(0,g.jsx)(n,{titulo:`Linked`,nota:`El turno donde ya está, en la misma fila.`,ancho:380,children:(0,g.jsx)(p,{visita:{...v,vinculada:y},on:!1,onClick:()=>{}})}),(0,g.jsx)(n,{titulo:`Linked and selected`,nota:`Save va a preguntar si se mueve.`,ancho:380,children:(0,g.jsx)(p,{visita:{...v,vinculada:y},on:!0,onClick:()=>{}})})]})}),(0,g.jsx)(c,{titulo:`Linked appointment status`,nota:`La Pill del turno usa los tonos de los turnos de la app (PATIENT_APPOINTMENT_TONES). La pregunta al guardar está en la story Move Visit Question.`,children:(0,g.jsx)(s,{children:b.map(e=>(0,g.jsx)(o,{rotulo:e,children:(0,g.jsx)(`div`,{className:`w-[260px]`,children:(0,g.jsx)(u,{turno:{...y,estado:e}})})},e))})})]})},T={parameters:{layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:420}}},render:()=>(0,g.jsx)(h,{visita:`Visit 2`,turno:y,onConfirm:()=>{},onCancel:()=>{}})},E={parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,g.jsx)(d,{on:!0,onClick:()=>{},barra:`var(--color-dash-blue)`,className:`p-3`,children:(0,g.jsx)(`span`,{className:`text-[13px] font-semibold`,children:`Selected`})}),(0,g.jsx)(d,{on:!1,onClick:()=>{},className:`p-3`,children:(0,g.jsx)(`span`,{className:`text-[13px] font-semibold`,children:`Not selected`})})]})},D={parameters:{controls:{disable:!0}},render:()=>(0,g.jsxs)(a,{children:[(0,g.jsx)(c,{titulo:`Linked appointment`,children:(0,g.jsxs)(r,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Block`}),(0,g.jsxs)(`td`,{children:[`Inside the visit row, 12px side margin · `,(0,g.jsx)(l,{nombre:`dash-field`}),` · radius 6px · 12px × 8px padding`]})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,g.jsxs)(`td`,{children:[`"Linked appointment" 11px · `,(0,g.jsx)(l,{nombre:`ink-muted`}),`, with the InfoTip next to it`]})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Date`}),(0,g.jsxs)(`td`,{children:[`"Sep 28, 2026 · 1:15 PM" 12px · `,(0,g.jsx)(l,{nombre:`ink`}),`, then the status Pill (sm)`]})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Tone`}),(0,g.jsx)(`td`,{children:`Booked info · Fulfilled success · No Show warning · Cancelled danger`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Info text`}),(0,g.jsx)(`td`,{children:`"To use this visit for the new appointment, you’ll need to move it from the linked appointment."`})]})]})}),(0,g.jsx)(c,{titulo:`Move question`,children:(0,g.jsxs)(r,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Component`}),(0,g.jsx)(`td`,{children:`ConfirmDialog (Elements / ConfirmDialog), 420px, centered; it is a yes or no question, so it is not a drawer`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,g.jsx)(`td`,{children:`Move treatment visit?`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,g.jsxs)(`td`,{children:[`"Visit N is linked to the appointment on `,`{date}`,` at `,`{time}`,`." and "Continuing will unlink this visit from that appointment and link it to the appointment you are saving."`]})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Buttons`}),(0,g.jsx)(`td`,{children:`Cancel (secondary) · Move visit (primary: it is not destructive, the visit keeps its data)`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Keyboard`}),(0,g.jsx)(`td`,{children:`Focus goes into the dialog; Escape or Cancel closes it and the drawer keeps what was typed`})]})]})})]})},O=[`Playground`,`Parts`,`States`,`MoveVisitQuestion`,`SelectableCard`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: ({
    seleccionada,
    vinculada,
    estado
  }) => <div className="w-[420px] max-w-full">
      <VisitRow key={\`\${seleccionada}-\${vinculada}-\${estado}\`} visita={{
      ...VISITA,
      vinculada: vinculada ? {
        ...VINCULADA,
        estado
      } : undefined
    }} on={seleccionada} onClick={() => {}} />
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Pieces" nota="Las dos que ya existían y las dos de la visita linkeada.">
        <Muestras>
          <ConRotulo rotulo="Plan card"><div className="w-[380px] max-w-full"><PlanCard plan={PLAN} on onClick={() => {}} /></div></ConRotulo>
          <ConRotulo rotulo="Visit row, linked"><div className="w-[380px] max-w-full"><VisitRow visita={{
              ...VISITA,
              vinculada: VINCULADA
            }} on={false} onClick={() => {}} /></div></ConRotulo>
          <ConRotulo rotulo="Linked appointment"><div className="w-[340px] max-w-full"><TurnoVinculadoInfo turno={VINCULADA} /></div></ConRotulo>
        </Muestras>
        <Tabla encabezado={['Piece', 'What it does']} minimo={560} arriba>
          <tr><td className="font-semibold whitespace-nowrap">PlanCard</td><td className="text-ink-medium">El plan elegible: barra de color del estado, doctor, terapia, conteos y fecha.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">VisitRow</td><td className="text-ink-medium">La visita: nombre, procedimientos, total; la elegida abre la tabla de códigos.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">TurnoVinculadoInfo</td><td className="text-ink-medium">Bloque gris dentro de la fila con la fecha y la hora del otro turno, su estado en una Pill y el círculo de info (InfoTip) que explica que hay que moverla.</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">MoverVisitaDialog</td><td className="text-ink-medium">La pregunta de sí o no al guardar: ConfirmDialog con Cancel y Move visit.</td></tr>
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
      <Bloque titulo="States" nota="Lo linkeado se ve sin elegir la visita: se decide antes de tocarla.">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-6">
          <Muestra titulo="Free" nota="Sin turno: sólo la fila." ancho={380}><VisitRow visita={VISITA} on={false} onClick={() => {}} /></Muestra>
          <Muestra titulo="Selected" nota="Borde azul y la tabla de procedimientos." ancho={380}><VisitRow visita={VISITA} on onClick={() => {}} /></Muestra>
          <Muestra titulo="Linked" nota="El turno donde ya está, en la misma fila." ancho={380}><VisitRow visita={{
            ...VISITA,
            vinculada: VINCULADA
          }} on={false} onClick={() => {}} /></Muestra>
          <Muestra titulo="Linked and selected" nota="Save va a preguntar si se mueve." ancho={380}><VisitRow visita={{
            ...VISITA,
            vinculada: VINCULADA
          }} on onClick={() => {}} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Linked appointment status" nota="La Pill del turno usa los tonos de los turnos de la app (PATIENT_APPOINTMENT_TONES). La pregunta al guardar está en la story Move Visit Question.">
        <Muestras>
          {ESTADOS.map(estado => <ConRotulo key={estado} rotulo={estado}><div className="w-[260px]"><TurnoVinculadoInfo turno={{
              ...VINCULADA,
              estado
            }} /></div></ConRotulo>)}
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 420
      }
    }
  },
  render: () => <MoverVisitaDialog visita="Visit 2" turno={VINCULADA} onConfirm={() => {}} onCancel={() => {}} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <Seleccionable on onClick={() => {}} barra="var(--color-dash-blue)" className="p-3"><span className="text-[13px] font-semibold">Selected</span></Seleccionable>
      <Seleccionable on={false} onClick={() => {}} className="p-3"><span className="text-[13px] font-semibold">Not selected</span></Seleccionable>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Linked appointment">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Block</td><td>Inside the visit row, 12px side margin · <Token nombre="dash-field" /> · radius 6px · 12px × 8px padding</td></tr>
          <tr><td className="font-semibold">Label</td><td>"Linked appointment" 11px · <Token nombre="ink-muted" />, with the InfoTip next to it</td></tr>
          <tr><td className="font-semibold">Date</td><td>"Sep 28, 2026 · 1:15 PM" 12px · <Token nombre="ink" />, then the status Pill (sm)</td></tr>
          <tr><td className="font-semibold">Tone</td><td>Booked info · Fulfilled success · No Show warning · Cancelled danger</td></tr>
          <tr><td className="font-semibold">Info text</td><td>"To use this visit for the new appointment, you’ll need to move it from the linked appointment."</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Move question">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Component</td><td>ConfirmDialog (Elements / ConfirmDialog), 420px, centered; it is a yes or no question, so it is not a drawer</td></tr>
          <tr><td className="font-semibold">Title</td><td>Move treatment visit?</td></tr>
          <tr><td className="font-semibold">Text</td><td>"Visit N is linked to the appointment on {'{date}'} at {'{time}'}." and "Continuing will unlink this visit from that appointment and link it to the appointment you are saving."</td></tr>
          <tr><td className="font-semibold">Buttons</td><td>Cancel (secondary) · Move visit (primary: it is not destructive, the visit keeps its data)</td></tr>
          <tr><td className="font-semibold">Keyboard</td><td>Focus goes into the dialog; Escape or Cancel closes it and the drawer keeps what was typed</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}}})))()}k();export{T as MoveVisitQuestion,C as Parts,S as Playground,E as SelectableCard,D as Specs,w as States,O as __namedExportsOrder,x as default};
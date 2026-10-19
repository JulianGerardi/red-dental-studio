import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,l as o,t as s}from"./kit-CWUgB5-0.js";import{n as c,r as l}from"./decorators-DWO7sIfz.js";import{n as u,t as d}from"./PendingDocuments-BUGqUa3G.js";import{i as f,n as p,r as m}from"./PatientDetail-BHPezJPQ.js";function h(){let e=(e,t=``)=>(0,_.jsx)(`div`,{className:`flex items-center justify-center rounded-lg bg-white p-3 text-center text-[12px] font-semibold text-ink shadow-panel ${t}`,children:e});return(0,_.jsxs)(`div`,{className:`flex gap-3 rounded-xl bg-page-background p-4`,children:[e(`Patient menu`,`w-28 shrink-0`),(0,_.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col gap-3`,children:[(0,_.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:[`Allergies`,`Medical Conditions`,`Medication`,`Past Surgery…`].map(t=>e(t,`py-2 font-medium`))}),(0,_.jsxs)(`div`,{className:`grid grid-cols-[minmax(0,1fr)_7rem] gap-3`,children:[(0,_.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[e(`Pending Task`,`h-24`),e(`Pending documents`,`h-24`)]}),e(`Appointments · 280px`)]})]})]})}function g({ancho:e,alto:t,args:n=``,escala:r}){return(0,_.jsx)(`div`,{className:`overflow-hidden rounded-xl border border-line-row bg-page-background`,style:{width:e*r,height:t*r},children:(0,_.jsx)(`iframe`,{title:`${e}px`,loading:`lazy`,src:`iframe.html?id=${b}&viewMode=story${n&&`&args=${n}`}`,style:{width:e,height:t,border:0,transform:`scale(${r})`,transformOrigin:`top left`}})})}var _,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{f(),u(),l(),i(),_=t(),v={title:`Pages/Parts/Patient Overview`,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`pages/PatientDetail.tsx`,description:{component:["El Overview del paciente (`@/pages/PatientDetail`): los cuatro bloques clínicos arriba y, abajo, **dos columnas**. A la izquierda **Pending Task** y debajo **Pending documents**; a la derecha **Appointments**, una columna de 280px del alto de las dos. Desde 1024px; antes, todo en una columna en ese orden.",``,'**Cuántos se ven:** 3 tareas y 4 documentos siempre. Turnos: 7 en la columna (entran a la par de la izquierda) y 3 cuando va apilado. Más allá, "Show N more" (`ui/show-more`). La pantalla completa, con el menú y el header, está en *Pages*.',``,`**Probalo:** en *Playground* cambiá la cantidad de turnos desde *Controls* y mirá cuándo aparece "Show N more"; en *Guidelines → Devices* la misma pantalla en el celular, la tablet y el escritorio.`].join(`
`)}}},args:{appointments:7},argTypes:{appointments:{control:{type:`range`,min:1,max:14},description:`Turnos del paciente. Con más de 7 (o de 3 apilado) aparece "Show N more".`}},decorators:[c]},y={controls:{disable:!0}},b=`pages-parts-patient-overview--playground`,x={parameters:{docs:{story:{inline:!1,iframeHeight:1400},devices:{height:1400}}},render:e=>(0,_.jsx)(`div`,{className:`min-h-screen bg-page-background`,children:(0,_.jsx)(p,{turnos:e.appointments},e.appointments)})},S=[[`Patient menu`,`Avatar, Start Encounter, Clinical Mode, las seis secciones y los datos General y Contact.`,`PatientSidePanel`],[`Clinical cards`,`Allergies, Medical Conditions, Medication y Past Surgery and Hospitalization, de a dos. Cada una abre su listado flotante.`,`Card · ClinicalPopover`],[`Pending Task`,`Arriba a la izquierda: lo que hay que hacer por este paciente, en filas. Se ven 3.`,`Card · ListGroup · TaskRow`],[`Pending documents`,`Debajo de Pending Task: los documentos a resolver por urgencia, con quién actúa y la acción. Se ven 4. En una columna angosta el vencimiento y el botón bajan a otro renglón.`,`Card · PendingDocuments`],[`Appointments`,`Columna derecha de 280px, del alto de Pending Task + Pending documents. Se ven 7 en la columna y 3 apilado.`,`Card · ShowMore · PatientAppointmentCard`]],C={parameters:y,render:()=>(0,_.jsx)(`div`,{className:`p-4 sm:p-6`,children:(0,_.jsxs)(a,{children:[(0,_.jsx)(s,{titulo:`Layout from 1024px`,nota:`Lo que se resuelve (tareas y documentos) a la izquierda, uno abajo del otro; la agenda del paciente en la columna de la derecha, de punta a punta.`,children:(0,_.jsx)(h,{})}),(0,_.jsx)(o,{partes:S})]})})},w=({children:e})=>(0,_.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:e}),T={parameters:y,render:()=>(0,_.jsx)(`div`,{className:`p-4 sm:p-6`,children:(0,_.jsxs)(a,{className:`max-w-[1100px]`,children:[(0,_.jsx)(s,{titulo:`Two columns · 1024px and up`,children:(0,_.jsxs)(w,{children:[(0,_.jsx)(n,{titulo:`7 appointments`,nota:`Entran todos: la columna termina a la par de Pending documents.`,children:(0,_.jsx)(g,{ancho:1280,alto:1340,escala:.4})}),(0,_.jsx)(n,{titulo:`12 appointments`,nota:`Se ven 7 y “Show 5 more” abre el resto con scroll adentro.`,children:(0,_.jsx)(g,{ancho:1280,alto:1340,escala:.4,args:`appointments:12`})})]})}),(0,_.jsx)(s,{titulo:`One column · under 1024px`,nota:`Pending Task, Pending documents y Appointments, en ese orden. Los turnos vuelven a 3 para no alargar la página.`,children:(0,_.jsx)(g,{ancho:768,alto:2300,escala:.3})}),(0,_.jsx)(s,{titulo:`Pending documents in a narrow column`,nota:`Con menos de ~520px (la columna a 1024px, el celular) el vencimiento y el botón bajan a un segundo renglón, alineados a la derecha.`,children:(0,_.jsxs)(w,{children:[(0,_.jsx)(n,{titulo:`Wide`,ancho:760,children:(0,_.jsx)(`div`,{className:`rounded-lg bg-white p-5 shadow-panel`,children:(0,_.jsx)(d,{})})}),(0,_.jsx)(n,{titulo:`Narrow · 380px`,ancho:380,children:(0,_.jsx)(`div`,{className:`rounded-lg bg-white p-5 shadow-panel`,children:(0,_.jsx)(d,{})})})]})})]})})},E=[[`Columns`,`minmax(0, 1fr) · 280px, desde 1024px (lg)`,`lg:grid-cols-[minmax(0,1fr)_280px]`],[`Gap`,`20px entre columnas y entre Pending Task y Pending documents`,`gap-5`],[`Appointments height`,`Se estira al alto de la columna izquierda; si tiene más turnos, la izquierda queda más corta`,`align-items: stretch`],[`Visible tasks`,String(m.tareas),`TOPE.tareas`],[`Visible documents`,`4`,`PendingDocuments · TOPE`],[`Visible appointments`,`${m.turnosColumna} en la columna · ${m.turnos} apilado`,`TOPE.turnosColumna · TOPE.turnos`],[`Document row`,`El nombre pide 14rem (224px); si no entra, vencimiento y botón bajan juntos y van a la derecha`,`basis-56 · ml-auto`]],D={parameters:y,render:()=>(0,_.jsx)(`div`,{className:`p-4 sm:p-6`,children:(0,_.jsx)(a,{children:(0,_.jsx)(r,{encabezado:[`Spec`,`Value`,`Code`],minimo:640,arriba:!0,children:E.map(([e,t,n])=>(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,_.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,_.jsx)(`td`,{className:`font-mono text-[12px] text-ink-muted`,children:n})]},e))})})})},O=[`Playground`,`Parts`,`States`,`Specs`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 1400
      },
      devices: {
        height: 1400
      }
    }
  },
  render: a => <div className="min-h-screen bg-page-background">
      <PatientDetail key={a.appointments} turnos={a.appointments} />
    </div>
}`,...x.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <div className="p-4 sm:p-6">
      <Lienzo>
        <Bloque titulo="Layout from 1024px" nota="Lo que se resuelve (tareas y documentos) a la izquierda, uno abajo del otro; la agenda del paciente en la columna de la derecha, de punta a punta.">
          <Mapa />
        </Bloque>
        <TablaPartes partes={PARTES} />
      </Lienzo>
    </div>
}`,...C.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <div className="p-4 sm:p-6">
      <Lienzo className="max-w-[1100px]">
        <Bloque titulo="Two columns · 1024px and up">
          <Fila>
            <Muestra titulo="7 appointments" nota="Entran todos: la columna termina a la par de Pending documents.">
              <Ventana ancho={1280} alto={1340} escala={0.4} />
            </Muestra>
            <Muestra titulo="12 appointments" nota="Se ven 7 y “Show 5 more” abre el resto con scroll adentro.">
              <Ventana ancho={1280} alto={1340} escala={0.4} args="appointments:12" />
            </Muestra>
          </Fila>
        </Bloque>
        <Bloque titulo="One column · under 1024px" nota="Pending Task, Pending documents y Appointments, en ese orden. Los turnos vuelven a 3 para no alargar la página.">
          <Ventana ancho={768} alto={2300} escala={0.3} />
        </Bloque>
        <Bloque titulo="Pending documents in a narrow column" nota="Con menos de ~520px (la columna a 1024px, el celular) el vencimiento y el botón bajan a un segundo renglón, alineados a la derecha.">
          <Fila>
            <Muestra titulo="Wide" ancho={760}><div className="rounded-lg bg-white p-5 shadow-panel"><PendingDocuments /></div></Muestra>
            <Muestra titulo="Narrow · 380px" ancho={380}><div className="rounded-lg bg-white p-5 shadow-panel"><PendingDocuments /></div></Muestra>
          </Fila>
        </Bloque>
      </Lienzo>
    </div>
}`,...T.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <div className="p-4 sm:p-6">
      <Lienzo>
        <Tabla encabezado={['Spec', 'Value', 'Code']} minimo={640} arriba>
          {SPECS.map(([spec, valor, codigo]) => <tr key={spec}>
              <td className="font-semibold whitespace-nowrap">{spec}</td>
              <td className="text-ink-medium">{valor}</td>
              <td className="font-mono text-[12px] text-ink-muted">{codigo}</td>
            </tr>)}
        </Tabla>
      </Lienzo>
    </div>
}`,...D.parameters?.docs?.source}}}})))()}k();export{C as Parts,x as Playground,D as Specs,T as States,O as __namedExportsOrder,v as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./button-BOlyjP3C.js";import{n as a,t as o}from"./confirm-dialog-BRGcDB9Q.js";import{d as s,f as c,i as l,l as u,t as d}from"./kit-Di92TvVK.js";function f({title:e,text:t,confirmLabel:n,tone:r,icon:a,otherAction:s,loading:c}){let[l,u]=(0,p.useState)(!0);return(0,m.jsxs)(`div`,{className:`p-6`,children:[(0,m.jsx)(i,{onClick:()=>u(!0),children:`Open confirmation`}),l&&(0,m.jsx)(o,{title:e,confirmLabel:n,tone:r,loading:c,icon:a===`auto`?void 0:a,otherAction:s?{label:`Sign now`,onClick:()=>u(!1)}:void 0,onCancel:()=>u(!1),onConfirm:()=>u(!1),children:(0,m.jsx)(`p`,{children:t})})]})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{p=t(),c(),a(),r(),m=n(),h={title:`Elements/ConfirmDialog`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:420},jira:[`CON-1546`,`CON-2890`,`CON-3999`,`CON-4165`,`CON-4166`,`CON-4167`],description:{component:`La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra, descarta o desactiva sin vuelta. Desde el 2026-11-16 el título lleva un ícono de 16 px en línea, sin círculo, que sale solo del tono: info azul (primary) o triángulo rojo (danger). *icon* lo cambia: **warning** (alerta, azul o roja) cuando hay algo que revisar antes de seguir, y **delete** (tacho rojo) sólo en lo que borra. Con *otherAction* es una decisión de tres salidas (Consent required); con *loading* la acción principal muestra el spinner y los demás botones quedan deshabilitados. En Figma: *Confidentally UI · Design System* → Feedback & Overlays → Confirm dialog (Tone × Icon). **Probalo:** cambiá *tone* e *icon* en *Playground*.`}}},args:{title:`Discard and close?`,text:`This returns the whole chart to its default. It cannot be undone.`,confirmLabel:`Discard and close`,tone:`danger`,icon:`auto`,otherAction:!1,loading:!1},argTypes:{title:{control:`text`,description:`La pregunta.`},text:{control:`text`,description:`Qué pasa si se confirma.`},confirmLabel:{control:`text`,description:`Lo que hace el botón, con el verbo de la acción.`},tone:{control:`inline-radio`,options:[`primary`,`danger`],description:`danger: borra o descarta algo que no se recupera.`},icon:{control:`inline-radio`,options:[`auto`,`warning`,`delete`],description:`auto (sin prop): sale del tono, info azul o triángulo rojo. warning: alerta, hay algo que revisar antes de seguir. delete: tacho, sólo para lo que borra.`},otherAction:{control:`boolean`,description:`Una tercera salida entre Cancel y la acción principal (Sign now). El diálogo pasa de 420 a 480px.`},loading:{control:`boolean`,description:`La acción principal está en curso: spinner en su botón y los otros deshabilitados.`}}},g={render:e=>(0,m.jsx)(f,{...e})},_={args:{title:`Back to permanent dentition?`,text:`What was marked on the primary teeth is cleared.`,confirmLabel:`Switch to permanent`,tone:`primary`},render:e=>(0,m.jsx)(f,{...e})},v={name:`Neutral (info)`,args:{title:`Replace working hours?`,text:`This will replace the existing working hours for Monday and Tuesday. Do you want to continue?`,confirmLabel:`Confirm`,tone:`primary`},render:e=>(0,m.jsx)(f,{...e})},y={name:`Warning (review first)`,args:{title:`Affected appointments`,text:`There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list.`,confirmLabel:`Confirm`,tone:`primary`,icon:`warning`},render:e=>(0,m.jsx)(f,{...e})},b={name:`Danger (discard, deactivate)`,args:{title:`Discard unsaved changes?`,text:`Your billing profile changes haven't been saved.`,confirmLabel:`Discard changes`,tone:`danger`},render:e=>(0,m.jsx)(f,{...e})},x={name:`Danger + warning`,args:{title:`This room has scheduled appointments`,text:`There are scheduled appointments assigned to Operatory 1. You can review and manage each appointment individually or confirm to move all of them to the waiting list.`,confirmLabel:`Confirm`,tone:`danger`,icon:`warning`},render:e=>(0,m.jsx)(f,{...e})},S={name:`Delete (trash)`,args:{title:`Delete relationship`,text:`Are you sure you want to remove this relationship? This action cannot be undone.`,confirmLabel:`Delete`,tone:`danger`,icon:`delete`},render:e=>(0,m.jsx)(f,{...e})},C={args:{title:`Consent required`,text:`This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.`,confirmLabel:`Send consent and sign later`,tone:`primary`,icon:`warning`,otherAction:!0},render:e=>(0,m.jsx)(f,{...e})},w={args:{title:`Consent required`,text:`This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.`,confirmLabel:`Send consent and sign later`,tone:`primary`,icon:`warning`,otherAction:!0,loading:!0},render:e=>(0,m.jsx)(f,{...e})},T={parameters:{controls:{disable:!0}},render:()=>(0,m.jsx)(l,{children:(0,m.jsx)(d,{titulo:`Parts`,children:(0,m.jsxs)(u,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Question`}),(0,m.jsx)(`td`,{children:`El título es la pregunta: Discard and close?`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,m.jsx)(`td`,{children:`Qué pasa si se confirma.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Buttons`}),(0,m.jsx)(`td`,{children:`Cancel y la acción con su verbo; danger en rojo.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,m.jsxs)(`td`,{children:[`16 px en línea con el título, sin círculo ni fondo. Sale del tono; `,(0,m.jsx)(`em`,{children:`icon`}),` lo cambia a alerta o tacho (ver States).`]})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Other action`}),(0,m.jsx)(`td`,{children:`Opcional: una tercera salida secondary entre Cancel y la principal.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Loading`}),(0,m.jsx)(`td`,{children:`Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.`})]})]})})})},E={parameters:{controls:{disable:!0}},render:()=>(0,m.jsx)(l,{children:(0,m.jsx)(d,{titulo:`States`,nota:`El ícono no se elige por pantalla: sale de tone e icon. Un tacho en algo que sólo desactiva o descarta diría que se borra.`,children:(0,m.jsxs)(u,{encabezado:[`tone`,`icon`,`Ícono`,`Cuándo`,`Story`],minimo:720,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{children:`primary`}),(0,m.jsx)(`td`,{children:`—`}),(0,m.jsxs)(`td`,{children:[`info, `,(0,m.jsx)(s,{nombre:`dash-blue`})]}),(0,m.jsx)(`td`,{children:`Pregunta simple: Replace working hours?, Move treatment visit?`}),(0,m.jsx)(`td`,{children:`Neutral (info)`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{children:`primary`}),(0,m.jsx)(`td`,{children:`warning`}),(0,m.jsxs)(`td`,{children:[`circle-alert, `,(0,m.jsx)(s,{nombre:`dash-blue`})]}),(0,m.jsx)(`td`,{children:`Hay algo que revisar antes de seguir: Consent required, turnos afectados.`}),(0,m.jsx)(`td`,{children:`Warning, ThreeActions`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{children:`danger`}),(0,m.jsx)(`td`,{children:`—`}),(0,m.jsxs)(`td`,{children:[`triangle-alert, `,(0,m.jsx)(s,{nombre:`dash-bad-fg`})]}),(0,m.jsx)(`td`,{children:`Descarta, desactiva o deshabilita: Discard unsaved changes?, Deactivate Operatory 1?`}),(0,m.jsx)(`td`,{children:`Danger`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{children:`danger`}),(0,m.jsx)(`td`,{children:`warning`}),(0,m.jsxs)(`td`,{children:[`circle-alert, `,(0,m.jsx)(s,{nombre:`dash-bad-fg`})]}),(0,m.jsx)(`td`,{children:`Desactivar con cosas que resolver: This room has scheduled appointments.`}),(0,m.jsx)(`td`,{children:`Danger + warning`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{children:`danger`}),(0,m.jsx)(`td`,{children:`delete`}),(0,m.jsxs)(`td`,{children:[`trash-2, `,(0,m.jsx)(s,{nombre:`dash-bad-fg`})]}),(0,m.jsx)(`td`,{children:`Borra: Delete Appointment, Delete Relationship, Delete procedure, borrar una suscripción.`}),(0,m.jsx)(`td`,{children:`Delete (trash)`})]})]})})})},D={parameters:{controls:{disable:!0}},render:()=>(0,m.jsxs)(l,{children:[(0,m.jsx)(d,{titulo:`Specs`,children:(0,m.jsxs)(u,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,m.jsx)(`td`,{children:`420px, centrada; 480px con una tercera salida.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,m.jsx)(`td`,{children:`16px Bold`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,m.jsx)(`td`,{children:`16px, 8px a la izquierda del título, alineado con la primera línea (3px desde arriba). Sin círculo.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,m.jsx)(`td`,{children:`13px`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Focus`}),(0,m.jsx)(`td`,{children:`Entra en Cancel (lo seguro). Al cerrar vuelve al botón que la abrió (Save, Delete…), no al principio de la página.`})]})]})}),(0,m.jsx)(d,{titulo:`Where`,nota:`Todo lo demás es un drawer.`,children:(0,m.jsxs)(u,{encabezado:[`Question`,`Tone`],minimo:560,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Discard and close? (odontograma)`}),(0,m.jsx)(`td`,{children:`danger`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Back to permanent dentition?`}),(0,m.jsx)(`td`,{children:`primary`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Clear the tooth selection`}),(0,m.jsx)(`td`,{children:`danger`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Discard, Expire, Cancel, Present, Accept del caso`}),(0,m.jsx)(`td`,{children:`danger o primary según la acción`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Confirm procedure`}),(0,m.jsx)(`td`,{children:`primary`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Consent required (Complete, Start)`}),(0,m.jsx)(`td`,{children:`primary con ícono de alerta y tercera salida`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Replace working hours? (Locations → Working Hours)`}),(0,m.jsx)(`td`,{children:`primary`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Affected appointments (HoursAppointmentsDialog)`}),(0,m.jsx)(`td`,{children:`primary con icon warning`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`This room has scheduled appointments / Deactivate Operatory 1?`}),(0,m.jsx)(`td`,{children:`danger (con warning si hay turnos)`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Delete Appointment, Delete Relationship, Delete procedure, delete subscription`}),(0,m.jsx)(`td`,{children:`danger con icon delete`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Delete working hours? (✕ de una franja, Working Hours)`}),(0,m.jsx)(`td`,{children:`danger con icon delete`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Close working hours? (switch de un día, Working Hours)`}),(0,m.jsx)(`td`,{children:`danger`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Unable to change working hours (HoursBlockedDialog)`}),(0,m.jsx)(`td`,{children:`primary con icon warning, sólo Close`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)`}),(0,m.jsx)(`td`,{children:`primary`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Clinical Note (al terminar el encuentro; Cancel es "Remind me later")`}),(0,m.jsx)(`td`,{children:`primary`})]})]})})]})},O=[`Playground`,`Primary`,`Neutral`,`Warning`,`Danger`,`DangerWarning`,`Delete`,`ThreeActions`,`Loading`,`Parts`,`States`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Back to permanent dentition?',
    text: 'What was marked on the primary teeth is cleared.',
    confirmLabel: 'Switch to permanent',
    tone: 'primary'
  },
  render: args => <Demo {...args} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Neutral (info)',
  args: {
    title: 'Replace working hours?',
    text: 'This will replace the existing working hours for Monday and Tuesday. Do you want to continue?',
    confirmLabel: 'Confirm',
    tone: 'primary'
  },
  render: args => <Demo {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Warning (review first)',
  args: {
    title: 'Affected appointments',
    text: 'There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list.',
    confirmLabel: 'Confirm',
    tone: 'primary',
    icon: 'warning'
  },
  render: args => <Demo {...args} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Danger (discard, deactivate)',
  args: {
    title: 'Discard unsaved changes?',
    text: "Your billing profile changes haven't been saved.",
    confirmLabel: 'Discard changes',
    tone: 'danger'
  },
  render: args => <Demo {...args} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Danger + warning',
  args: {
    title: 'This room has scheduled appointments',
    text: 'There are scheduled appointments assigned to Operatory 1. You can review and manage each appointment individually or confirm to move all of them to the waiting list.',
    confirmLabel: 'Confirm',
    tone: 'danger',
    icon: 'warning'
  },
  render: args => <Demo {...args} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Delete (trash)',
  args: {
    title: 'Delete relationship',
    text: 'Are you sure you want to remove this relationship? This action cannot be undone.',
    confirmLabel: 'Delete',
    tone: 'danger',
    icon: 'delete'
  },
  render: args => <Demo {...args} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Consent required',
    text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.',
    confirmLabel: 'Send consent and sign later',
    tone: 'primary',
    icon: 'warning',
    otherAction: true
  },
  render: args => <Demo {...args} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Consent required',
    text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.',
    confirmLabel: 'Send consent and sign later',
    tone: 'primary',
    icon: 'warning',
    otherAction: true,
    loading: true
  },
  render: args => <Demo {...args} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Question</td><td>El título es la pregunta: Discard and close?</td></tr>
          <tr><td className="font-semibold">Text</td><td>Qué pasa si se confirma.</td></tr>
          <tr><td className="font-semibold">Buttons</td><td>Cancel y la acción con su verbo; danger en rojo.</td></tr>
          <tr><td className="font-semibold">Icon</td><td>16 px en línea con el título, sin círculo ni fondo. Sale del tono; <em>icon</em> lo cambia a alerta o tacho (ver States).</td></tr>
          <tr><td className="font-semibold">Other action</td><td>Opcional: una tercera salida secondary entre Cancel y la principal.</td></tr>
          <tr><td className="font-semibold">Loading</td><td>Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States" nota="El ícono no se elige por pantalla: sale de tone e icon. Un tacho en algo que sólo desactiva o descarta diría que se borra.">
        <Tabla encabezado={['tone', 'icon', 'Ícono', 'Cuándo', 'Story']} minimo={720}>
          <tr><td>primary</td><td>—</td><td>info, <Token nombre="dash-blue" /></td><td>Pregunta simple: Replace working hours?, Move treatment visit?</td><td>Neutral (info)</td></tr>
          <tr><td>primary</td><td>warning</td><td>circle-alert, <Token nombre="dash-blue" /></td><td>Hay algo que revisar antes de seguir: Consent required, turnos afectados.</td><td>Warning, ThreeActions</td></tr>
          <tr><td>danger</td><td>—</td><td>triangle-alert, <Token nombre="dash-bad-fg" /></td><td>Descarta, desactiva o deshabilita: Discard unsaved changes?, Deactivate Operatory 1?</td><td>Danger</td></tr>
          <tr><td>danger</td><td>warning</td><td>circle-alert, <Token nombre="dash-bad-fg" /></td><td>Desactivar con cosas que resolver: This room has scheduled appointments.</td><td>Danger + warning</td></tr>
          <tr><td>danger</td><td>delete</td><td>trash-2, <Token nombre="dash-bad-fg" /></td><td>Borra: Delete Appointment, Delete Relationship, Delete procedure, borrar una suscripción.</td><td>Delete (trash)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, centrada; 480px con una tercera salida.</td></tr>
          <tr><td className="font-semibold">Title</td><td>16px Bold</td></tr>
          <tr><td className="font-semibold">Icon</td><td>16px, 8px a la izquierda del título, alineado con la primera línea (3px desde arriba). Sin círculo.</td></tr>
          <tr><td className="font-semibold">Text</td><td>13px</td></tr>
          <tr><td className="font-semibold">Focus</td><td>Entra en Cancel (lo seguro). Al cerrar vuelve al botón que la abrió (Save, Delete…), no al principio de la página.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where" nota="Todo lo demás es un drawer.">
        <Tabla encabezado={["Question", "Tone"]} minimo={560}>
          <tr><td className="font-semibold">Discard and close? (odontograma)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Back to permanent dentition?</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clear the tooth selection</td><td>danger</td></tr>
          <tr><td className="font-semibold">Discard, Expire, Cancel, Present, Accept del caso</td><td>danger o primary según la acción</td></tr>
          <tr><td className="font-semibold">Confirm procedure</td><td>primary</td></tr>
          <tr><td className="font-semibold">Consent required (Complete, Start)</td><td>primary con ícono de alerta y tercera salida</td></tr>
          <tr><td className="font-semibold">Replace working hours? (Locations → Working Hours)</td><td>primary</td></tr>
          <tr><td className="font-semibold">Affected appointments (HoursAppointmentsDialog)</td><td>primary con icon warning</td></tr>
          <tr><td className="font-semibold">This room has scheduled appointments / Deactivate Operatory 1?</td><td>danger (con warning si hay turnos)</td></tr>
          <tr><td className="font-semibold">Delete Appointment, Delete Relationship, Delete procedure, delete subscription</td><td>danger con icon delete</td></tr>
          <tr><td className="font-semibold">Delete working hours? (✕ de una franja, Working Hours)</td><td>danger con icon delete</td></tr>
          <tr><td className="font-semibold">Close working hours? (switch de un día, Working Hours)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Unable to change working hours (HoursBlockedDialog)</td><td>primary con icon warning, sólo Close</td></tr>
          <tr><td className="font-semibold">Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clinical Note (al terminar el encuentro; Cancel es "Remind me later")</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}}})))()}k();export{b as Danger,x as DangerWarning,S as Delete,w as Loading,v as Neutral,T as Parts,g as Playground,_ as Primary,D as Specs,E as States,C as ThreeActions,y as Warning,O as __namedExportsOrder,h as default};
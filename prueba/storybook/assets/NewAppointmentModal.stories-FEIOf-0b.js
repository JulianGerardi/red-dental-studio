import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,o as a,r as o}from"./play-Dr1R_I1D.js";import{i as s,n as c,r as l,t as u}from"./kit-drawer-B35lbR6D.js";import{n as d,t as f}from"./NewAppointmentModal-CvbffzUA.js";var p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{d(),s(),o(),p=t(),m={title:`Components/Scheduling/NewAppointmentModal`,component:f,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Agendar un turno desde *Scheduling → New appointment*, desde una solicitud (*Schedule*) o editando uno existente. Es el drawer de New Appointment de Confidentally 2.0, con el calendario del día que se despliega al costado al tocar la fecha o la hora.`,``,`**Pasos:** *Patient and Scheduling* (paciente, providers, motivo, fecha y horario, operatory y estado) y *Link to treatment plan visit* (plan y visita, opcional; Additional y notas).`,``,"**Visita linkeada a otro turno** (desde 2026-10-17): una visita pertenece a un solo turno. Si la que se elige ya tiene uno, su fila lo muestra —fecha, hora y estado— con un círculo de info, y **Save pregunta *Move treatment visit?***. *Move visit* la desvincula del turno anterior y la linkea al nuevo; *Cancel* vuelve al drawer sin tocar nada. Es una pregunta de sí o no, por eso es un `ConfirmDialog` y no un tercer paso.",``,'**Las sugerencias de Patient y los dos Provider llevan una segunda línea** (2026-10-19): fecha de nacimiento y email del paciente, email del provider (`SearchField` → prop `subtext`, *Elements / Fields*). Julián: "antes además del nombre decía la fecha de nacimiento y email". El del provider sale de Settings → Employees; el del paciente es mock propio de esta pantalla, sin ficha única para esos cuatro nombres.',``,`**Probalo:** en *Playground* completá el paso 1, avanzá y elegí **Visit 2** (es la linkeada); después apretá Save.`].join(`
`)}}},args:{onClose:()=>{}}},h={},g={args:{titulo:`Edit Appointment`,inicial:{patient:`Maria Abril Viola`,reason:`Routine cleaning appointment`}}},_={patient:`John Smith`,primary:`Dr. Emily Chen`,date:`20-10-2026`,start:`10 AM`,end:`11 AM`,operatory:`Operatory 1`,status:`Booked`},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(c,{pasos:[{nombre:`Patient and Scheduling`,secciones:`Patient, Primary y Additional Provider · Requestor y Reason for Visit · Date, Start y End Time (con el calendario del día al costado) · Operatory y Status`,obligatorios:`Patient, Primary Provider, Date, Start y End Time, Operatory, Status`},{nombre:`Link to treatment plan visit`,secciones:`Treatment plan · Visit (la fila de una visita linkeada muestra su otro turno) · Additional: ASAP, Follow-up, Premedicate · Notes`,obligatorios:`Nada: el link es opcional. Si la visita está linkeada a otro turno, Save pregunta si se mueve.`}],nota:`Un solo paso con pregunta, no uno por escenario: la pregunta de mover la visita sólo aparece cuando hace falta, así el indicador siempre dice dos pasos.`})},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(u,{estados:[{estado:`Default`,cuando:`Abre en el paso 1, sin errores.`,story:`Playground`},{estado:`Edit`,cuando:`Con datos del turno: mismo drawer, otro título y otro toast.`,story:`Edit`},{estado:`Validation errors`,cuando:`Next Step con obligatorios vacíos: borde rojo y "This field is required."`,story:`With Validation Errors`},{estado:`Visit linked elsewhere`,cuando:`La visita elegida ya tiene turno: su fila muestra Linked appointment con fecha, hora y estado, y el círculo de info explica que hay que moverla.`,story:`Linked Visit`},{estado:`Move question`,cuando:`Save con esa visita elegida abre Move treatment visit? sobre el drawer. Cancel lo cierra y el drawer sigue como estaba, con el foco otra vez en Save.`,story:`Move Visit Question`},{estado:`Moved`,cuando:`Move visit guarda el turno, cierra el drawer y avisa con dos toasts: el del turno y "Visit 2 moved from the Sep 28, 2026 appointment."`}]})},b={play:a(r(/^next step$/i),i(/required|at least|must|invalid/i))},x={args:{titulo:`New Appointment`,inicial:_},play:a(r(/^next step$/i),n(`radio`,/^Visit 2/),i(/Linked appointment/))},S={args:{titulo:`New Appointment`,inicial:_},play:a(r(/^next step$/i),n(`radio`,/^Visit 2/),r(/^save$/i),i(/Move treatment visit\?/))},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(l,{filas:[[`Size`,`lg · 560px; con el calendario del día, el panel se despliega a la izquierda`],[`Opens from`,`New appointment y Schedule (una solicitud) en Scheduling; Edit en el Dashboard y en Patients.`],[`Move question`,`ConfirmDialog de 420px sobre el drawer: Move treatment visit?, con Cancel y Move visit. Detalle en Components / Scheduling / TreatmentPlanPicker.`],[`Toasts`,`"Appointment for {patient} booked at {time}." y, si se movió una visita, "{Visit} moved from the {date} appointment."`],[`Texts`,`Los del Figma; los de la visita linkeada, del prototipo de Julián (2026-10-17).`]]})},w=[`Playground`,`Edit`,`Parts`,`States`,`WithValidationErrors`,`LinkedVisit`,`MoveVisitQuestion`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    titulo: 'Edit Appointment',
    inicial: {
      patient: 'Maria Abril Viola',
      reason: 'Routine cleaning appointment'
    }
  }
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
  render: () => <PasosDelDrawer pasos={[{
    nombre: 'Patient and Scheduling',
    secciones: 'Patient, Primary y Additional Provider · Requestor y Reason for Visit · Date, Start y End Time (con el calendario del día al costado) · Operatory y Status',
    obligatorios: 'Patient, Primary Provider, Date, Start y End Time, Operatory, Status'
  }, {
    nombre: 'Link to treatment plan visit',
    secciones: 'Treatment plan · Visit (la fila de una visita linkeada muestra su otro turno) · Additional: ASAP, Follow-up, Premedicate · Notes',
    obligatorios: 'Nada: el link es opcional. Si la visita está linkeada a otro turno, Save pregunta si se mueve.'
  }]} nota="Un solo paso con pregunta, no uno por escenario: la pregunta de mover la visita sólo aparece cuando hace falta, así el indicador siempre dice dos pasos." />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
    estado: 'Default',
    cuando: 'Abre en el paso 1, sin errores.',
    story: 'Playground'
  }, {
    estado: 'Edit',
    cuando: 'Con datos del turno: mismo drawer, otro título y otro toast.',
    story: 'Edit'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step con obligatorios vacíos: borde rojo y "This field is required."',
    story: 'With Validation Errors'
  }, {
    estado: 'Visit linked elsewhere',
    cuando: 'La visita elegida ya tiene turno: su fila muestra Linked appointment con fecha, hora y estado, y el círculo de info explica que hay que moverla.',
    story: 'Linked Visit'
  }, {
    estado: 'Move question',
    cuando: 'Save con esa visita elegida abre Move treatment visit? sobre el drawer. Cancel lo cierra y el drawer sigue como estaba, con el foco otra vez en Save.',
    story: 'Move Visit Question'
  }, {
    estado: 'Moved',
    cuando: 'Move visit guarda el turno, cierra el drawer y avisa con dos toasts: el del turno y "Visit 2 moved from the Sep 28, 2026 appointment."'
  }]} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required|at least|must|invalid/i))
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    titulo: 'New Appointment',
    inicial: COMPLETO
  },
  play: secuencia(pulsar(/^next step$/i), pulsarRol('radio', /^Visit 2/), esperar(/Linked appointment/))
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    titulo: 'New Appointment',
    inicial: COMPLETO
  },
  play: secuencia(pulsar(/^next step$/i), pulsarRol('radio', /^Visit 2/), pulsar(/^save$/i), esperar(/Move treatment visit\\?/))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px; con el calendario del día, el panel se despliega a la izquierda'], ['Opens from', 'New appointment y Schedule (una solicitud) en Scheduling; Edit en el Dashboard y en Patients.'], ['Move question', 'ConfirmDialog de 420px sobre el drawer: Move treatment visit?, con Cancel y Move visit. Detalle en Components / Scheduling / TreatmentPlanPicker.'], ['Toasts', '"Appointment for {patient} booked at {time}." y, si se movió una visita, "{Visit} moved from the {date} appointment."'], ['Texts', 'Los del Figma; los de la visita linkeada, del prototipo de Julián (2026-10-17).']]} />
}`,...C.parameters?.docs?.source}}}})))()}T();export{g as Edit,x as LinkedVisit,S as MoveVisitQuestion,v as Parts,h as Playground,C as Specs,y as States,b as WithValidationErrors,w as __namedExportsOrder,m as default};
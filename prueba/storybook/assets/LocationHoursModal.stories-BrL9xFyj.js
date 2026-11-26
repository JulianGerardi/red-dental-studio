import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{f as n,i as r,t as i,u as a}from"./kit-Di92TvVK.js";import{i as o,r as s,t as c}from"./kit-drawer-CIzMwpmc.js";import{i as l,n as u,o as d,r as f}from"./play-Dr1R_I1D.js";import{n as p,o as m}from"./location-detail-CqGaCj-Y.js";import{i as h,t as g}from"./LocationHoursModal-Cbv1HFOB.js";var _,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{h(),o(),n(),f(),m(),_=t(),v=Object.values(p),y={title:`Components/Settings/LocationHoursModal`,component:g,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},jira:[`CON-1546`,`CON-2890`],description:{component:[`*Set working hours*: lo abren **Edit hours** o activar **Open** en un día cerrado de *Settings → Locations → Working Hours*. Se cargan franjas (Start / End Time, de a dos) y se eligen los días en *Repeat on days*.`,``,"**Aplicar a otros días** (2026-11-16): el día de origen va relleno en azul y no se puede sacar (`aria-disabled`). Los demás se eligen estén Open o Closed. Save reemplaza el horario completo de cada día elegido; no los vincula: después cada uno se edita aparte.",``,`**Replace working hours?**: si algún día adicional está Open con otro horario, Save pregunta antes, nombrando sólo esos días en el orden de la tabla. No pregunta si sólo cambia el de origen, si los otros están Closed o si ya tienen el mismo horario (se comparan las franjas ordenadas). Cancel vuelve al panel con todo lo cargado.`,``,"**Turnos afectados:** si `onGuardar` devuelve `false`, el panel queda abierto: la pantalla lo usa para abrir *HoursAppointmentsDialog* cuando las horas nuevas dejan afuera turnos Proposed o Booked.",``,`**Probalo:** en *Playground* (Sunday, cerrado) cargá 09:00 a 14:00, elegí M y T y apretá Save.`].join(`
`)}}},args:{onClose:()=>{},horario:v}},b={args:{dia:0}},x={args:{dia:2,iniciales:p.Tuesday.rangos}},S={args:{dia:0},play:d(l(/^monday$/i),l(/^tuesday$/i))},C={args:{dia:0},play:d(l(/^save$/i),u(/required|at least|must|invalid/i))},w={args:{dia:2,iniciales:p.Tuesday.rangos},play:d(l(/^wednesday$/i),l(/^save$/i),u(/Replace working hours\?/))},T={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(r,{children:(0,_.jsx)(i,{titulo:`Parts`,children:(0,_.jsx)(a,{partes:[[`Time ranges`,`Start Time y End Time de a dos, con la ✕ para quitar una fila cuando hay más de una.`,`SelectField`],[`Add another time range`,`Suma una fila vacía.`,`Link azul con CirclePlus`],[`Repeat on days`,`Siete botones S M T W T F S. El día de origen va relleno y fijo; el resto con borde azul cuando está elegido.`,`button aria-pressed`],[`Replace working hours?`,`Pregunta antes de pisar el horario distinto de otro día abierto.`,`ConfirmDialog primary`],[`Footer`,`Cancel y Save del mismo ancho.`,`DrawerActions`]]})})})},E={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(c,{estados:[{estado:`Closed day`,cuando:`Desde el switch Open: una fila vacía y el día de origen fijo.`,story:`Playground`},{estado:`Edit hours`,cuando:`Las franjas del día cargadas para editarlas.`,story:`Edit Hours`},{estado:`Other days selected`,cuando:`El día de origen relleno (no se saca) y otros días con borde azul.`,story:`Other Days Selected`},{estado:`Validation errors`,cuando:`Required., Start time must be earlier than end time., Time interval must be at least 30 minutes., This time interval overlaps with another. y Select at least one day.`,story:`With Validation Errors`},{estado:`Replace question`,cuando:`Save con un día adicional Open y otro horario. Cancel vuelve al panel sin guardar.`,story:`Replace Question`},{estado:`Waiting on appointments`,cuando:`onGuardar devolvió false: el panel sigue abierto mientras HoursAppointmentsDialog resuelve los turnos.`}]})},D={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{filas:[[`Size`,`sm · 420px`],[`Day buttons`,`32 × 32px, radio md. Origen: fondo dash-blue y texto blanco; elegido: borde dash-blue; libre: texto ink-faint.`],[`Replace message`,`"This will replace the existing working hours for Monday and Tuesday. Do you want to continue?" Sólo días adicionales abiertos con otro horario, en el orden de la tabla.`],[`Toasts`,`"Hours saved for Sunday." o "Hours saved for 3 days."`],[`Props`,`dia (origen 0-6), iniciales (franjas del día), horario (la semana, para comparar), onGuardar(dias, rangos) → false deja el panel abierto.`]]})},O=[`Playground`,`EditHours`,`OtherDaysSelected`,`WithValidationErrors`,`ReplaceQuestion`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    dia: 0
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    dia: 2,
    iniciales: HORARIO_SEMANAL.Tuesday.rangos
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    dia: 0
  },
  play: secuencia(pulsar(/^monday$/i), pulsar(/^tuesday$/i))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    dia: 0
  },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    dia: 2,
    iniciales: HORARIO_SEMANAL.Tuesday.rangos
  },
  play: secuencia(pulsar(/^wednesday$/i), pulsar(/^save$/i), esperar(/Replace working hours\\?/))
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
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Time ranges', 'Start Time y End Time de a dos, con la ✕ para quitar una fila cuando hay más de una.', 'SelectField'], ['Add another time range', 'Suma una fila vacía.', 'Link azul con CirclePlus'], ['Repeat on days', 'Siete botones S M T W T F S. El día de origen va relleno y fijo; el resto con borde azul cuando está elegido.', 'button aria-pressed'], ['Replace working hours?', 'Pregunta antes de pisar el horario distinto de otro día abierto.', 'ConfirmDialog primary'], ['Footer', 'Cancel y Save del mismo ancho.', 'DrawerActions']]} />
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
    estado: 'Closed day',
    cuando: 'Desde el switch Open: una fila vacía y el día de origen fijo.',
    story: 'Playground'
  }, {
    estado: 'Edit hours',
    cuando: 'Las franjas del día cargadas para editarlas.',
    story: 'Edit Hours'
  }, {
    estado: 'Other days selected',
    cuando: 'El día de origen relleno (no se saca) y otros días con borde azul.',
    story: 'Other Days Selected'
  }, {
    estado: 'Validation errors',
    cuando: 'Required., Start time must be earlier than end time., Time interval must be at least 30 minutes., This time interval overlaps with another. y Select at least one day.',
    story: 'With Validation Errors'
  }, {
    estado: 'Replace question',
    cuando: 'Save con un día adicional Open y otro horario. Cancel vuelve al panel sin guardar.',
    story: 'Replace Question'
  }, {
    estado: 'Waiting on appointments',
    cuando: 'onGuardar devolvió false: el panel sigue abierto mientras HoursAppointmentsDialog resuelve los turnos.'
  }]} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'sm · 420px'], ['Day buttons', '32 × 32px, radio md. Origen: fondo dash-blue y texto blanco; elegido: borde dash-blue; libre: texto ink-faint.'], ['Replace message', '"This will replace the existing working hours for Monday and Tuesday. Do you want to continue?" Sólo días adicionales abiertos con otro horario, en el orden de la tabla.'], ['Toasts', '"Hours saved for Sunday." o "Hours saved for 3 days."'], ['Props', 'dia (origen 0-6), iniciales (franjas del día), horario (la semana, para comparar), onGuardar(dias, rangos) → false deja el panel abierto.']]} />
}`,...D.parameters?.docs?.source}}}})))()}k();export{x as EditHours,S as OtherDaysSelected,T as Parts,b as Playground,w as ReplaceQuestion,D as Specs,E as States,C as WithValidationErrors,O as __namedExportsOrder,y as default};
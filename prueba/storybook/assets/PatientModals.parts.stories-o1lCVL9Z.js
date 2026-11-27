import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{At as n,Kn as r,jt as i,qn as a}from"./iframe-Yt0JmvfH.js";import{i as o,n as s,r as c,t as l}from"./kit-drawer-CIzMwpmc.js";import{i as u,n as d,o as f,r as p}from"./play-Dr1R_I1D.js";import{n as m,r as h}from"./decorators-DnJ_XFUm.js";import{n as g,r as _}from"./personas-Ds65_VxA.js";import{a as v,c as y,i as b,n as x,o as ee,r as te,t as S}from"./PacienteCampos-BRxy7Jqe.js";import{r as C,t as w}from"./EditPatient-mSD_Bt79.js";import{n as T,t as E}from"./NewPatientModal-Cp_kgbIv.js";var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{h(),p(),o(),i(),y(),_(),a(),C(),T(),D=t(),O={title:`Pages/Parts/Patient modals`,parameters:{layout:`fullscreen`,docs:{jira:[`CON-2107`,`CON-2858`,`CON-1328`,`CON-1329`],story:{inline:!1,iframeHeight:720},description:{component:[`Alta y edición de un paciente, con los campos de Confidentally 2.0.`,``,"- **New Patient** es un drawer en pasos: *General* → *Guardian* (sólo para un menor de 18, obligatorio) → *Demography*. General puede vincular a una persona que ya está en el sistema. Si el nombre completo y el email ya son de otro paciente, avisa con un `Alert` y no guarda.","- **Edit Patient** es una pantalla (`/patients/:id/edit`) con el formato de la ficha de un empleado: foto editable, nombre y estado, y las cards *General*, *Contact*, *Address* y *Demographic*, sin pestañas. No lleva Guardian ni el buscador de personas: editar no vincula a nadie.",`- **Interpreter Required** va en Demography, en la misma fila que *Language*: van de la mano.`,`- Los errores se marcan sólo en la sección que se revisó; al guardar, el foco va al primer campo que falta.`,``,`**Probalo:** en *Playground* completá General y avanzá; en *Edit Patient* borrá un obligatorio y tocá *Save Changes*.`].join(`
`)}}},decorators:[m]},k=()=>{},A={...n,first:`Abril`,last:`Viola`,birthday:`April 2, 2025`,email:`Abril@gmail.com`},j=()=>{},M={layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},N={render:()=>(0,D.jsx)(E,{onClose:k})},P={parameters:M,render:()=>(0,D.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,D.jsx)(s,{nota:`New Patient. Guardian aparece sólo si la fecha de nacimiento es de un menor de 18.`,pasos:[{nombre:`General`,secciones:`Casilla para vincular a una persona del sistema; si no, First, Middle y Last Name en una fila, Email y Birthdate; la cuenta del portal`,obligatorios:`First Name, Last Name, Email, Birthdate · o una persona elegida`},{nombre:`Guardian`,secciones:`Buscador de personas o Add New Person (datos, contacto y dirección en desplegables), garante y relación`,obligatorios:`Un guardián y su relación; si es nuevo, sus datos, teléfono y dirección`},{nombre:`Demography`,secciones:`Gender, Race, Ethnicity, Marital Status, Profession, Nationality, Language + Interpreter Required, Religion`,obligatorios:`Gender`}]}),(0,D.jsx)(s,{nota:`Edit Patient: las mismas secciones como cards de una sola pantalla, en este orden, con un único Save Changes.`,pasos:[{nombre:`General`,secciones:`Foto, nombre y estado arriba; First, Middle y Last Name, Email, Birthdate y la cuenta del portal (Linked o la opción de crearla)`,obligatorios:`First Name, Last Name, Email, Birthdate`},{nombre:`Contact`,secciones:`Country Code, Area Code (3 digits), Number (7 digits), Extension`,obligatorios:`Todos menos Extension`},{nombre:`Address`,secciones:`Address Line 1 y 2, Country, State, City, ZIP Code`,obligatorios:`Todos menos Address Line 2`},{nombre:`Demographic`,secciones:`Los mismos campos que en New Patient`,obligatorios:`Gender`}]})]})},F={parameters:M,render:()=>(0,D.jsx)(l,{estados:[{estado:`New · General`,cuando:`Abre en General, vacío.`,story:`Playground`},{estado:`New · Required fields`,cuando:`Next Step con obligatorios vacíos: se marcan sólo los del paso.`,story:`New Patient — Required fields`},{estado:`New · Guardian`,cuando:`El paciente es menor de 18: aparece el paso y el aviso.`,story:`New Patient — Guardian`},{estado:`New · Demography`,cuando:`Gender obligatorio; Interpreter Required al lado de Language.`,story:`New Patient — Demography`},{estado:`New · Duplicate`,cuando:`Mismo nombre y email que otro paciente: Alert danger arriba y no guarda.`,story:`New Patient — Duplicate`},{estado:`New · Linked person`,cuando:`La casilla tildada cambia los datos por el buscador.`,story:`Link Person Selected`},{estado:`Edit · Complete`,cuando:`Abre con los datos del paciente; la cuenta del portal como Linked.`,story:`Edit patient`},{estado:`Edit · Missing data`,cuando:`Ficha sin teléfono, dirección ni Gender: Save Changes los marca y lleva al primero.`,story:`Edit Patient — Missing data`},{estado:`Edit · No portal account`,cuando:`Ofrece crear la cuenta en vez del estado Linked.`,story:`Edit Patient — Missing data`}]})},I={parameters:M,render:()=>(0,D.jsx)(c,{filas:[[`New patient`,`Drawer lg · 560px, pasos con DrawerStep y DrawerActions`],[`Edit patient`,`Pantalla: migas Patients / Edit Patient, PageTitle, cards de Settings (Card), FormFooter a la derecha`],[`Header de Edit`,`EditableAvatar 56px (misma foto que el panel del paciente: clavePacienteFoto) + nombre 20px Bold + Pill de estado`],[`Fields`,`De a dos; el nombre completo en una fila de tres. En celular, apilados`],[`Interpreter required`,`OptionCheckbox a 36px de alto, abajo de su celda: a la altura del select de Language`],[`Duplicate`,`Alert danger · "A patient is already registered with this name and email address."`],[`Validation`,`useFormPaciente: errores por sección revisada; enfocar() lleva al campo con scroll`]]})},L={name:`New Patient — Guardian`,render:()=>(0,D.jsx)(E,{pasoInicial:1,inicial:{first:`Mia`,last:`Lopez`,email:`mia@mail.com`,birthday:`January 15, 2016`},onClose:k})},R={name:`New Patient — Demography`,render:()=>(0,D.jsx)(E,{pasoInicial:2,onClose:k})},z={name:`New Patient — Required fields`,render:()=>(0,D.jsx)(E,{onClose:k}),play:f(u(/Next Step/),d(/This field is required/))},B={name:`New Patient — Duplicate`,render:()=>(0,D.jsx)(E,{pasoInicial:1,inicial:{...A,birthday:`04/02/1990`,gender:`Female`},onClose:k}),play:f(u(/^Save/),d(/already registered/))},V={render:()=>(0,D.jsx)(w,{pacienteId:`abril-viola`})},H={name:`Edit Patient — Missing data`,render:()=>(0,D.jsx)(w,{pacienteId:`marco-rivera`}),play:f(u(/Save Changes/),d(/This field is required/))},U={render:()=>(0,D.jsx)(r,{onClose:k})},W={name:`Fields — General`,parameters:{layout:`padded`},render:()=>(0,D.jsx)(`div`,{className:`w-[512px]`,children:(0,D.jsx)(v,{d:A,cambiar:j,errores:{},portalVinculado:!0})})},G={name:`Fields — Guardian`,parameters:{layout:`padded`},render:()=>(0,D.jsx)(`div`,{className:`w-[512px]`,children:(0,D.jsx)(ee,{d:{...A,guardianName:`Elena Chen`,guardianRel:`Parent`},cambiar:j,errores:{}})})},K={name:`Fields — Demography`,parameters:{layout:`padded`},render:()=>(0,D.jsx)(`div`,{className:`w-[512px]`,children:(0,D.jsx)(te,{d:{...A,gender:`Female`,language:`Spanish`,interpreter:!0,nationality:`United States`},cambiar:j,errores:{}})})},q={name:`Fields — Contact`,parameters:{layout:`padded`},render:()=>(0,D.jsx)(`div`,{className:`w-[512px]`,children:(0,D.jsx)(x,{d:{...A,area:`555`,numero:`12345`},cambiar:j,errores:{numero:`Number must be 7 digits.`}})})},J={name:`Fields — Address`,parameters:{layout:`padded`},render:()=>(0,D.jsx)(`div`,{className:`w-[512px]`,children:(0,D.jsx)(b,{d:{...A,linea1:`123 Maple Street`,pais:`United States`,estado:`Arizona`,ciudad:`Phoenix`,zip:`85016`},cambiar:j,errores:{}})})},Y={render:()=>(0,D.jsx)(`div`,{className:`w-[420px]`,children:(0,D.jsx)(S,{v:{activo:!0,onActivo:()=>{},personas:g,valor:``,onValor:()=>{}}})})},X={render:()=>(0,D.jsx)(`div`,{className:`w-[420px]`,children:(0,D.jsx)(S,{v:{activo:!0,onActivo:()=>{},personas:g,valor:g[0].name,onValor:()=>{}}})})},Z={render:()=>(0,D.jsx)(`div`,{className:`w-[420px]`,children:(0,D.jsx)(S,{v:{activo:!0,onActivo:()=>{},personas:g,valor:``,onValor:()=>{},error:`Select a person or untick the option to enter the details.`}})})},Q=[`Playground`,`Parts`,`States`,`Specs`,`NewPatientGuardian`,`NewPatientDemography`,`NewPatientRequired`,`NewPatientDuplicate`,`EditPatient`,`EditPatientMissing`,`EditContact`,`FieldsGeneral`,`FieldsGuardian`,`FieldsDemography`,`FieldsContact`,`FieldsAddress`,`LinkPersonSearch`,`LinkPersonSelected`,`LinkPersonError`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <NewPatientModal onClose={salir} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: DOCS,
  render: () => <div className="flex flex-col gap-8">
      <PasosDelDrawer nota="New Patient. Guardian aparece sólo si la fecha de nacimiento es de un menor de 18." pasos={[{
      nombre: 'General',
      secciones: 'Casilla para vincular a una persona del sistema; si no, First, Middle y Last Name en una fila, Email y Birthdate; la cuenta del portal',
      obligatorios: 'First Name, Last Name, Email, Birthdate · o una persona elegida'
    }, {
      nombre: 'Guardian',
      secciones: 'Buscador de personas o Add New Person (datos, contacto y dirección en desplegables), garante y relación',
      obligatorios: 'Un guardián y su relación; si es nuevo, sus datos, teléfono y dirección'
    }, {
      nombre: 'Demography',
      secciones: 'Gender, Race, Ethnicity, Marital Status, Profession, Nationality, Language + Interpreter Required, Religion',
      obligatorios: 'Gender'
    }]} />
      <PasosDelDrawer nota="Edit Patient: las mismas secciones como cards de una sola pantalla, en este orden, con un único Save Changes." pasos={[{
      nombre: 'General',
      secciones: 'Foto, nombre y estado arriba; First, Middle y Last Name, Email, Birthdate y la cuenta del portal (Linked o la opción de crearla)',
      obligatorios: 'First Name, Last Name, Email, Birthdate'
    }, {
      nombre: 'Contact',
      secciones: 'Country Code, Area Code (3 digits), Number (7 digits), Extension',
      obligatorios: 'Todos menos Extension'
    }, {
      nombre: 'Address',
      secciones: 'Address Line 1 y 2, Country, State, City, ZIP Code',
      obligatorios: 'Todos menos Address Line 2'
    }, {
      nombre: 'Demographic',
      secciones: 'Los mismos campos que en New Patient',
      obligatorios: 'Gender'
    }]} />
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: DOCS,
  render: () => <EstadosDelDrawer estados={[{
    estado: 'New · General',
    cuando: 'Abre en General, vacío.',
    story: 'Playground'
  }, {
    estado: 'New · Required fields',
    cuando: 'Next Step con obligatorios vacíos: se marcan sólo los del paso.',
    story: 'New Patient — Required fields'
  }, {
    estado: 'New · Guardian',
    cuando: 'El paciente es menor de 18: aparece el paso y el aviso.',
    story: 'New Patient — Guardian'
  }, {
    estado: 'New · Demography',
    cuando: 'Gender obligatorio; Interpreter Required al lado de Language.',
    story: 'New Patient — Demography'
  }, {
    estado: 'New · Duplicate',
    cuando: 'Mismo nombre y email que otro paciente: Alert danger arriba y no guarda.',
    story: 'New Patient — Duplicate'
  }, {
    estado: 'New · Linked person',
    cuando: 'La casilla tildada cambia los datos por el buscador.',
    story: 'Link Person Selected'
  }, {
    estado: 'Edit · Complete',
    cuando: 'Abre con los datos del paciente; la cuenta del portal como Linked.',
    story: 'Edit patient'
  }, {
    estado: 'Edit · Missing data',
    cuando: 'Ficha sin teléfono, dirección ni Gender: Save Changes los marca y lleva al primero.',
    story: 'Edit Patient — Missing data'
  }, {
    estado: 'Edit · No portal account',
    cuando: 'Ofrece crear la cuenta en vez del estado Linked.',
    story: 'Edit Patient — Missing data'
  }]} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: DOCS,
  render: () => <SpecsDelDrawer filas={[['New patient', 'Drawer lg · 560px, pasos con DrawerStep y DrawerActions'], ['Edit patient', 'Pantalla: migas Patients / Edit Patient, PageTitle, cards de Settings (Card), FormFooter a la derecha'], ['Header de Edit', 'EditableAvatar 56px (misma foto que el panel del paciente: clavePacienteFoto) + nombre 20px Bold + Pill de estado'], ['Fields', 'De a dos; el nombre completo en una fila de tres. En celular, apilados'], ['Interpreter required', 'OptionCheckbox a 36px de alto, abajo de su celda: a la altura del select de Language'], ['Duplicate', 'Alert danger · "A patient is already registered with this name and email address."'], ['Validation', 'useFormPaciente: errores por sección revisada; enfocar() lleva al campo con scroll']]} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Guardian',
  render: () => <NewPatientModal pasoInicial={1} inicial={{
    first: 'Mia',
    last: 'Lopez',
    email: 'mia@mail.com',
    birthday: 'January 15, 2016'
  }} onClose={salir} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Demography',
  render: () => <NewPatientModal pasoInicial={2} onClose={salir} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Required fields',
  render: () => <NewPatientModal onClose={salir} />,
  play: secuencia(pulsar(/Next Step/), esperar(/This field is required/))
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Duplicate',
  render: () => <NewPatientModal pasoInicial={1} inicial={{
    ...datos,
    birthday: '04/02/1990',
    gender: 'Female'
  }} onClose={salir} />,
  play: secuencia(pulsar(/^Save/), esperar(/already registered/))
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <EditPatientPage pacienteId="abril-viola" />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Missing data',
  render: () => <EditPatientPage pacienteId="marco-rivera" />,
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/))
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactModal onClose={salir} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Fields — General',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Guardian',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGuardian d={{
      ...datos,
      guardianName: 'Elena Chen',
      guardianRel: 'Parent'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Demography',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposDemography d={{
      ...datos,
      gender: 'Female',
      language: 'Spanish',
      interpreter: true,
      nationality: 'United States'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Contact',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposContacto d={{
      ...datos,
      area: '555',
      numero: '12345'
    }} cambiar={sinCambiar} errores={{
      numero: 'Number must be 7 digits.'
    }} /></div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Address',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposDireccion d={{
      ...datos,
      linea1: '123 Maple Street',
      pais: 'United States',
      estado: 'Arizona',
      ciudad: 'Phoenix',
      zip: '85016'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {}
    }} /></div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: PERSONAS_SISTEMA[0].name,
      onValor: () => {}
    }} /></div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {},
      error: 'Select a person or untick the option to enter the details.'
    }} /></div>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{U as EditContact,V as EditPatient,H as EditPatientMissing,J as FieldsAddress,q as FieldsContact,K as FieldsDemography,W as FieldsGeneral,G as FieldsGuardian,Z as LinkPersonError,Y as LinkPersonSearch,X as LinkPersonSelected,R as NewPatientDemography,B as NewPatientDuplicate,L as NewPatientGuardian,z as NewPatientRequired,P as Parts,N as Playground,I as Specs,F as States,Q as __namedExportsOrder,O as default};
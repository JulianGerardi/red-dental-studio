import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{At as n,_n as r,jt as i,vn as a}from"./iframe-C6XUoxHI.js";import{i as o,n as s,o as c,r as l}from"./play-Dr1R_I1D.js";import{n as u,r as d}from"./decorators-DRZkhih1.js";import{n as f,r as p}from"./personas-QR-w0CZG.js";import{a as m,i as h,n as g,o as _,r as v,s as y,t as b}from"./EditPatientModal-rWKLuidk.js";import{i as x,t as S}from"./EditPatient-Cjf7DGhc.js";import{n as C,t as w}from"./NewPatientModal-CDEQeoGg.js";var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{d(),l(),i(),y(),p(),a(),x(),g(),C(),T=t(),E={title:`Pages/Parts/Patient modals`,parameters:{layout:`fullscreen`,docs:{jira:[`CON-2107`,`CON-2858`],story:{inline:!1,iframeHeight:640}}},decorators:[u]},D=()=>{},O={render:()=>(0,T.jsx)(w,{onClose:D})},k={name:`New Patient — Guardian`,render:()=>(0,T.jsx)(w,{pasoInicial:1,inicial:{first:`Mia`,last:`Lopez`,birthday:`January 15, 2016`},onClose:D})},A={name:`New Patient — Demography`,render:()=>(0,T.jsx)(w,{pasoInicial:2,onClose:D})},j={name:`New Patient — Required fields`,render:()=>(0,T.jsx)(w,{onClose:D}),play:c(o(/Next Step/),s(/This field is required/))},M={render:()=>(0,T.jsx)(b,{id:`abril-viola`,onClose:D})},N={name:`Edit Patient — Guardian`,render:()=>(0,T.jsx)(b,{id:`sofia-chen`,onClose:D})},P={name:`Edit Patient — No portal account`,render:()=>(0,T.jsx)(b,{id:`marco-rivera`,onClose:D})},F={name:`Edit Patient — Error in another section`,render:()=>(0,T.jsx)(b,{inicial:{...n,first:`Abril`,birthday:`April 2, 2025`,email:`abril@gmail.com`,guardianNuevo:!0,city:`Phoenix`},onClose:D}),play:c(o(/Save Changes/),s(/This field is required/))},I={render:()=>(0,T.jsx)(r,{onClose:D})},L={parameters:{layout:`padded`},render:()=>(0,T.jsx)(S,{})},R=()=>{},z={...n,first:`Abril`,last:`Viola`,birthday:`April 2, 2025`,email:`Abril@gmail.com`},B={name:`Fields — General`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(m,{d:z,cambiar:R,errores:{},portalVinculado:!0})})},V={name:`Fields — Guardian`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(_,{d:{...z,guardianName:`Elena Chen`,guardianRel:`Parent`},cambiar:R,errores:{}})})},H={name:`Fields — Demography`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(h,{d:{...z,phone:`(555) 123-4567`,language:`English`,city:`Phoenix`},cambiar:R,errores:{}})})},U={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:``,onValor:()=>{}}})})},W={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:f[0].name,onValor:()=>{}}})})},G={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:``,onValor:()=>{},error:`Select a person or untick the option to enter the details.`}})})},K=[`NewPatient`,`NewPatientGuardian`,`NewPatientDemography`,`NewPatientRequired`,`EditPatient`,`EditPatientGuardian`,`EditPatientNoPortal`,`EditPatientErrors`,`EditContact`,`EditPatientFormOnly`,`FieldsGeneral`,`FieldsGuardian`,`FieldsDemography`,`LinkPersonSearch`,`LinkPersonSelected`,`LinkPersonError`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <NewPatientModal onClose={salir} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Guardian',
  render: () => <NewPatientModal pasoInicial={1} inicial={{
    first: 'Mia',
    last: 'Lopez',
    birthday: 'January 15, 2016'
  }} onClose={salir} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Demography',
  render: () => <NewPatientModal pasoInicial={2} onClose={salir} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Required fields',
  render: () => <NewPatientModal onClose={salir} />,
  play: secuencia(pulsar(/Next Step/), esperar(/This field is required/))
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <EditPatientModal id="abril-viola" onClose={salir} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Guardian',
  render: () => <EditPatientModal id="sofia-chen" onClose={salir} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — No portal account',
  render: () => <EditPatientModal id="marco-rivera" onClose={salir} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Error in another section',
  render: () => <EditPatientModal inicial={{
    ...VACIO_PACIENTE,
    first: 'Abril',
    birthday: 'April 2, 2025',
    email: 'abril@gmail.com',
    guardianNuevo: true,
    city: 'Phoenix'
  }} onClose={salir} />,
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/))
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactModal onClose={salir} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <EditPatientForm />
}`,...L.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Fields — General',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Guardian',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGuardian d={{
      ...datos,
      guardianName: 'Elena Chen',
      guardianRel: 'Parent'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Demography',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposDemography d={{
      ...datos,
      phone: '(555) 123-4567',
      language: 'English',
      city: 'Phoenix'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {}
    }} /></div>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: PERSONAS_SISTEMA[0].name,
      onValor: () => {}
    }} /></div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {},
      error: 'Select a person or untick the option to enter the details.'
    }} /></div>
}`,...G.parameters?.docs?.source}}}})))()}q();export{I as EditContact,M as EditPatient,F as EditPatientErrors,L as EditPatientFormOnly,N as EditPatientGuardian,P as EditPatientNoPortal,H as FieldsDemography,B as FieldsGeneral,V as FieldsGuardian,G as LinkPersonError,U as LinkPersonSearch,W as LinkPersonSelected,O as NewPatient,A as NewPatientDemography,k as NewPatientGuardian,j as NewPatientRequired,K as __namedExportsOrder,E as default};
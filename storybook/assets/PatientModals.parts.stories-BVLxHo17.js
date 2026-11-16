import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{At as n,_n as r,jt as i,vn as a}from"./iframe-DG0O1DGj.js";import{i as o,n as s,o as c,r as l}from"./play-Dr1R_I1D.js";import{n as u,r as d}from"./decorators-B0CqRVuF.js";import{n as f,r as p}from"./personas-QR-w0CZG.js";import{a as m,i as h,n as g,o as _,r as v,s as y,t as b}from"./EditPatientModal-PI41KmSj.js";import{i as x,t as S}from"./EditPatient-7GE4Bans.js";import{n as C,t as w}from"./NewPatientModal-5bq1M_bM.js";var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{d(),l(),i(),y(),p(),a(),x(),g(),C(),T=t(),E={title:`Pages/Parts/Patient modals`,parameters:{layout:`fullscreen`,docs:{jira:[`CON-2107`,`CON-2858`],story:{inline:!1,iframeHeight:640}}},decorators:[u]},D=()=>{},O={render:()=>(0,T.jsx)(w,{onClose:D})},k={name:`New Patient — Guardian`,render:()=>(0,T.jsx)(w,{pasoInicial:1,inicial:{first:`Mia`,last:`Lopez`,birthday:`January 15, 2016`},onClose:D})},A={name:`New Patient — Demography`,render:()=>(0,T.jsx)(w,{pasoInicial:2,onClose:D})},j={name:`New Patient — Required fields`,render:()=>(0,T.jsx)(w,{onClose:D}),play:c(o(/Next Step/),s(/This field is required/))},M={render:()=>(0,T.jsx)(b,{id:`abril-viola`,onClose:D})},N={name:`Edit Patient — Guardian`,render:()=>(0,T.jsx)(b,{id:`sofia-chen`,seccionInicial:`Guardian`,onClose:D})},P={name:`Edit Patient — Demography`,render:()=>(0,T.jsx)(b,{id:`abril-viola`,seccionInicial:`Demography`,onClose:D})},F={name:`Edit Patient — No portal account`,render:()=>(0,T.jsx)(b,{id:`marco-rivera`,onClose:D})},I={name:`Edit Patient — Error in another section`,render:()=>(0,T.jsx)(b,{seccionInicial:`Demography`,inicial:{...n,first:`Abril`,birthday:`April 2, 2025`,email:`abril@gmail.com`,guardianNuevo:!0,city:`Phoenix`},onClose:D}),play:c(o(/Save Changes/),s(/This field is required/))},L={render:()=>(0,T.jsx)(r,{onClose:D})},R={parameters:{layout:`padded`},render:()=>(0,T.jsx)(S,{})},z=()=>{},B={...n,first:`Abril`,last:`Viola`,birthday:`April 2, 2025`,email:`Abril@gmail.com`},V={name:`Fields — General`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(m,{d:B,cambiar:z,errores:{},portalVinculado:!0})})},H={name:`Fields — Guardian`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(_,{d:{...B,guardianName:`Elena Chen`,guardianRel:`Parent`},cambiar:z,errores:{}})})},U={name:`Fields — Demography`,parameters:{layout:`padded`},render:()=>(0,T.jsx)(`div`,{className:`w-[512px]`,children:(0,T.jsx)(h,{d:{...B,phone:`(555) 123-4567`,language:`English`,city:`Phoenix`},cambiar:z,errores:{}})})},W={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:``,onValor:()=>{}}})})},G={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:f[0].name,onValor:()=>{}}})})},K={render:()=>(0,T.jsx)(`div`,{className:`w-[420px]`,children:(0,T.jsx)(v,{v:{activo:!0,onActivo:()=>{},personas:f,valor:``,onValor:()=>{},error:`Select a person or untick the option to enter the details.`}})})},q=[`NewPatient`,`NewPatientGuardian`,`NewPatientDemography`,`NewPatientRequired`,`EditPatient`,`EditPatientGuardian`,`EditPatientDemography`,`EditPatientNoPortal`,`EditPatientErrors`,`EditContact`,`EditPatientFormOnly`,`FieldsGeneral`,`FieldsGuardian`,`FieldsDemography`,`LinkPersonSearch`,`LinkPersonSelected`,`LinkPersonError`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
  render: () => <EditPatientModal id="sofia-chen" seccionInicial="Guardian" onClose={salir} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Demography',
  render: () => <EditPatientModal id="abril-viola" seccionInicial="Demography" onClose={salir} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — No portal account',
  render: () => <EditPatientModal id="marco-rivera" onClose={salir} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Error in another section',
  render: () => <EditPatientModal seccionInicial="Demography" inicial={{
    ...VACIO_PACIENTE,
    first: 'Abril',
    birthday: 'April 2, 2025',
    email: 'abril@gmail.com',
    guardianNuevo: true,
    city: 'Phoenix'
  }} onClose={salir} />,
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/))
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactModal onClose={salir} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <EditPatientForm />
}`,...R.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Fields — General',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Guardian',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGuardian d={{
      ...datos,
      guardianName: 'Elena Chen',
      guardianRel: 'Parent'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {}
    }} /></div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: PERSONAS_SISTEMA[0].name,
      onValor: () => {}
    }} /></div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px]"><BuscarPersona v={{
      activo: true,
      onActivo: () => {},
      personas: PERSONAS_SISTEMA,
      valor: '',
      onValor: () => {},
      error: 'Select a person or untick the option to enter the details.'
    }} /></div>
}`,...K.parameters?.docs?.source}}}})))()}J();export{L as EditContact,M as EditPatient,P as EditPatientDemography,I as EditPatientErrors,R as EditPatientFormOnly,N as EditPatientGuardian,F as EditPatientNoPortal,U as FieldsDemography,V as FieldsGeneral,H as FieldsGuardian,K as LinkPersonError,W as LinkPersonSearch,G as LinkPersonSelected,O as NewPatient,A as NewPatientDemography,k as NewPatientGuardian,j as NewPatientRequired,q as __namedExportsOrder,E as default};
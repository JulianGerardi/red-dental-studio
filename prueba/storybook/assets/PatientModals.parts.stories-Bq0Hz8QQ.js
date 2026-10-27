import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{$t as n,At as r,Qt as i,jt as a}from"./iframe-CPqQGzOR.js";import{i as o,n as s,o as c,r as l}from"./play-Dr1R_I1D.js";import{n as u,r as d}from"./decorators-BUUCpTPi.js";import{a as f,i as p,n as m,r as h,s as g,t as _}from"./EditPatientModal-DRibkp7y.js";import{i as v,t as y}from"./EditPatient-DV0Ht4bX.js";import{n as b,t as x}from"./NewPatientModal-b4-N-Ru3.js";var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{d(),l(),a(),g(),n(),v(),m(),b(),S=t(),C={title:`Pages/Parts/Patient modals`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:640}}},decorators:[u]},w=()=>{},T={render:()=>(0,S.jsx)(x,{onClose:w})},E={name:`New Patient — Guardian`,render:()=>(0,S.jsx)(x,{pasoInicial:1,onClose:w})},D={name:`New Patient — Demography`,render:()=>(0,S.jsx)(x,{pasoInicial:2,onClose:w})},O={name:`New Patient — Required fields`,render:()=>(0,S.jsx)(x,{onClose:w}),play:c(o(/Next Step/),s(/This field is required/))},k={render:()=>(0,S.jsx)(_,{id:`abril-viola`,onClose:w})},A={name:`Edit Patient — Guardian`,render:()=>(0,S.jsx)(_,{id:`sofia-chen`,seccionInicial:`Guardian`,onClose:w})},j={name:`Edit Patient — Demography`,render:()=>(0,S.jsx)(_,{id:`abril-viola`,seccionInicial:`Demography`,onClose:w})},M={name:`Edit Patient — No portal account`,render:()=>(0,S.jsx)(_,{id:`marco-rivera`,onClose:w})},N={name:`Edit Patient — Error in another section`,render:()=>(0,S.jsx)(_,{seccionInicial:`Demography`,inicial:{...r,first:`Abril`,birthday:`April 2, 2025`,email:`abril@gmail.com`,guardian:!0,city:`Phoenix`},onClose:w}),play:c(o(/Save Changes/),s(/This field is required/))},P={render:()=>(0,S.jsx)(i,{onClose:w})},F={parameters:{layout:`padded`},render:()=>(0,S.jsx)(y,{})},I=()=>{},L={...r,first:`Abril`,last:`Viola`,birthday:`April 2, 2025`,email:`Abril@gmail.com`},R={name:`Fields — General`,parameters:{layout:`padded`},render:()=>(0,S.jsx)(`div`,{className:`w-[512px]`,children:(0,S.jsx)(p,{d:L,cambiar:I,errores:{},portalVinculado:!0})})},z={name:`Fields — Guardian`,parameters:{layout:`padded`},render:()=>(0,S.jsx)(`div`,{className:`w-[512px]`,children:(0,S.jsx)(f,{d:{...L,guardian:!0,guardianName:`Elena Chen`,guardianRel:`Parent`},cambiar:I,errores:{}})})},B={name:`Fields — Demography`,parameters:{layout:`padded`},render:()=>(0,S.jsx)(`div`,{className:`w-[512px]`,children:(0,S.jsx)(h,{d:{...L,phone:`(555) 123-4567`,language:`English`,city:`Phoenix`},cambiar:I,errores:{}})})},V=[`NewPatient`,`NewPatientGuardian`,`NewPatientDemography`,`NewPatientRequired`,`EditPatient`,`EditPatientGuardian`,`EditPatientDemography`,`EditPatientNoPortal`,`EditPatientErrors`,`EditContact`,`EditPatientFormOnly`,`FieldsGeneral`,`FieldsGuardian`,`FieldsDemography`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <NewPatientModal onClose={salir} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Guardian',
  render: () => <NewPatientModal pasoInicial={1} onClose={salir} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Demography',
  render: () => <NewPatientModal pasoInicial={2} onClose={salir} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'New Patient — Required fields',
  render: () => <NewPatientModal onClose={salir} />,
  play: secuencia(pulsar(/Next Step/), esperar(/This field is required/))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <EditPatientModal id="abril-viola" onClose={salir} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Guardian',
  render: () => <EditPatientModal id="sofia-chen" seccionInicial="Guardian" onClose={salir} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Demography',
  render: () => <EditPatientModal id="abril-viola" seccionInicial="Demography" onClose={salir} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — No portal account',
  render: () => <EditPatientModal id="marco-rivera" onClose={salir} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Edit Patient — Error in another section',
  render: () => <EditPatientModal seccionInicial="Demography" inicial={{
    ...VACIO_PACIENTE,
    first: 'Abril',
    birthday: 'April 2, 2025',
    email: 'abril@gmail.com',
    guardian: true,
    city: 'Phoenix'
  }} onClose={salir} />,
  play: secuencia(pulsar(/Save Changes/), esperar(/This field is required/))
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <EditContactModal onClose={salir} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <EditPatientForm />
}`,...F.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Fields — General',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGeneral d={datos} cambiar={sinCambiar} errores={{}} portalVinculado /></div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Fields — Guardian',
  parameters: {
    layout: 'padded'
  },
  render: () => <div className="w-[512px]"><CamposGuardian d={{
      ...datos,
      guardian: true,
      guardianName: 'Elena Chen',
      guardianRel: 'Parent'
    }} cambiar={sinCambiar} errores={{}} /></div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}}})))()}H();export{P as EditContact,k as EditPatient,j as EditPatientDemography,N as EditPatientErrors,F as EditPatientFormOnly,A as EditPatientGuardian,M as EditPatientNoPortal,B as FieldsDemography,R as FieldsGeneral,z as FieldsGuardian,T as NewPatient,D as NewPatientDemography,E as NewPatientGuardian,O as NewPatientRequired,V as __namedExportsOrder,C as default};
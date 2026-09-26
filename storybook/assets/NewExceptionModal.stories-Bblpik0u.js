import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{a as t,i as n,n as r,r as i}from"./play-CDw6varG.js";import{n as a,t as o}from"./NewExceptionModal-nEuTGzYC.js";var s,c,l,u,d;function f(){return(f=e((()=>{a(),i(),s={title:`Components/Settings/NewExceptionModal`,component:o,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},args:{onClose:()=>{},onGuardar:()=>{}}},c={},l={args:{inicial:{id:`exc1`,nombre:`Independence Day`,abreviatura:`HOL`,razon:`Holiday`,fecha:new Date(2026,6,4),horaInicio:``,horaFin:``,todoElDia:!0,estado:`Active`}}},u={play:t(n(/^save$/i),r(/required|at least|must|invalid/i))},d=[`Create`,`Edit`,`WithValidationErrors`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: {
      id: 'exc1',
      nombre: 'Independence Day',
      abreviatura: 'HOL',
      razon: 'Holiday',
      fecha: new Date(2026, 6, 4),
      horaInicio: '',
      horaFin: '',
      todoElDia: true,
      estado: 'Active'
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...u.parameters?.docs?.source}}}})))()}f();export{c as Create,l as Edit,u as WithValidationErrors,d as __namedExportsOrder,s as default};
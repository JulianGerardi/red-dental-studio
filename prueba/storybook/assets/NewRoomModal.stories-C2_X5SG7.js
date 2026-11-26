import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,n,o as r,r as i}from"./play-Dr1R_I1D.js";import{n as a,t as o}from"./NewRoomModal-FvSi2oql.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{a(),i(),s={title:`Components/Settings/NewRoomModal`,component:o,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},args:{onClose:()=>{},onGuardar:()=>{}}},c={},l={args:{inicial:{id:`s1`,nombre:`Operatory 1`,tipo:`Operatory`,abreviatura:`OP1`,activa:!0,turnos:[]}}},u={play:r(t(/^save$/i),n(/required|at least|must|invalid/i))},d={args:{inicial:{id:`s5`,nombre:`Operatory 5`,tipo:`Operatory`,abreviatura:`OP5`,activa:!1,turnos:[]}}},f=[`Create`,`Edit`,`WithValidationErrors`,`InactiveRoom`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: {
      id: 's1',
      nombre: 'Operatory 1',
      tipo: 'Operatory',
      abreviatura: 'OP1',
      activa: true,
      turnos: []
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: {
      id: 's5',
      nombre: 'Operatory 5',
      tipo: 'Operatory',
      abreviatura: 'OP5',
      activa: false,
      turnos: []
    }
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{c as Create,l as Edit,d as InactiveRoom,u as WithValidationErrors,f as __namedExportsOrder,s as default};
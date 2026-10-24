import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{a as t,i as n,n as r,o as i,r as a}from"./play-Dr1R_I1D.js";import{n as o,t as s}from"./EditRelationshipModal-D1tDeg9X.js";var c,l,u,d,f;function p(){return(p=e((()=>{o(),a(),c={title:`Components/Patients/EditRelationshipModal`,component:s,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`Cambiar cómo se relaciona una persona con el paciente: sus roles (Guardian y/o Guarantor) y el vínculo. Abre con lo que la relación ya tiene.`,``,`**Quitar Guardian revoca acceso** (CON-3958, 2026-10-22): si se destilda Guardian y se guarda, antes aparece *Remove Guardian access* —"[Persona] will no longer have guardian access to [Paciente]"— y, si era su último vínculo de guardián, que se le desactiva el usuario de este consultorio. Cancel vuelve al formulario; Remove Guardian guarda.`,``,`**Probalo:** en *Playground* destildá Guardian y apretá Save.`].join(`
`)}}},args:{persona:{name:`Michael Miller`,initials:`MM`,dob:`May 14, 1982`,email:`mm.thompson@yahoo.com`},paciente:`John Smith`,inicial:{guardian:!0,guarantor:!1,rel:`Parent`},ultimaDeGuardian:!0,onClose:()=>{}}},l={},u={args:{inicial:{guardian:!1,guarantor:!1,rel:``}},play:i(n(/^save$/i),r(/required|at least|must|invalid/i))},d={name:`Remove Guardian access`,args:{inicial:{guardian:!0,guarantor:!0,rel:`Parent`}},play:i(t(`checkbox`,/^Guardian$/),n(/^save$/i),r(/will no longer have guardian access/i))},f=[`Default`,`WithValidationErrors`,`RemoveGuardianConfirm`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: {
      guardian: false,
      guarantor: false,
      rel: ''
    }
  },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Remove Guardian access',
  args: {
    inicial: {
      guardian: true,
      guarantor: true,
      rel: 'Parent'
    }
  },
  play: secuencia(pulsarRol('checkbox', /^Guardian$/), pulsar(/^save$/i), esperar(/will no longer have guardian access/i))
}`,...d.parameters?.docs?.source}}}})))()}p();export{l as Default,d as RemoveGuardianConfirm,u as WithValidationErrors,f as __namedExportsOrder,c as default};
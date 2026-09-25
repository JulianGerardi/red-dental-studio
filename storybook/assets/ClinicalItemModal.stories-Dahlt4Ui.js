import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{a as t,i as n,n as r,r as i}from"./play-CDw6varG.js";import{n as a,t as o}from"./ClinicalItemModal-x3KgJoRt.js";var s,c,l,u,d,f,p;function m(){return(m=e((()=>{a(),i(),s={title:`Components/Patients/ClinicalItemModal`,component:o,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},args:{categoria:`Allergies`,onGuardar:()=>{},onClose:()=>{}},argTypes:{categoria:{control:`select`,options:[`Allergies`,`Medical Conditions`,`Medication`,`Past Surgery and Hospitalization`]}}},c={},l={args:{categoria:`Medication`}},u={args:{categoria:`Medical Conditions`}},d={args:{categoria:`Past Surgery and Hospitalization`}},f={play:t(n(/^save$/i),r(/required|at least|must|invalid/i))},p=[`Allergies`,`Medication`,`MedicalConditions`,`PastSurgery`,`WithValidationErrors`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    categoria: 'Medication'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    categoria: 'Medical Conditions'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    categoria: 'Past Surgery and Hospitalization'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...f.parameters?.docs?.source}}}})))()}m();export{c as Allergies,u as MedicalConditions,l as Medication,d as PastSurgery,f as WithValidationErrors,p as __namedExportsOrder,s as default};
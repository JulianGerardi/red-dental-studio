import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./PostPaymentDialog-BrPIwTtq.js";import{a as r,i,n as a,r as o}from"./play-CDw6varG.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{t(),o(),s={title:`Components/Billing/PostPaymentDialog`,component:n,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},args:{tipoInicial:`Patient Payment`,onClose:()=>{},onGuardar:()=>{}},argTypes:{tipoInicial:{control:`select`,options:[`Patient Payment`,`Credit Adjustment`,`Charge Adjustment`]}}},c={},l={args:{tipoInicial:`Credit Adjustment`}},u={args:{tipoInicial:`Charge Adjustment`}},d={play:r(i(/^save$/i),a(/required|at least|must|invalid/i))},f=[`PatientPayment`,`CreditAdjustment`,`ChargeAdjustment`,`WithValidationErrors`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Credit Adjustment'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    tipoInicial: 'Charge Adjustment'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i))
}`,...d.parameters?.docs?.source}}}})))()}p();export{u as ChargeAdjustment,l as CreditAdjustment,c as PatientPayment,d as WithValidationErrors,f as __namedExportsOrder,s as default};
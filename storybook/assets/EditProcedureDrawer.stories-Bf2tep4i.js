import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./EditProcedureDrawer-DwmYuUHP.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),r={id:`F-1`,area:`Tooth 19`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:19,provider:`Elena Martinez`,surfaces:[`O`],notes:``,linked:[],diagnoses:[],kind:`condition`,examen:`Dental assessment`},i={id:`F-6`,area:`Tooth 19`,condition:`D2740 - Crown – porcelain/ceramic`,descriptor:`Tooth`,date:`May 14, 2026`,status:`Externally treated`,tooth:19,provider:`Emily Chen`,surfaces:[],notes:``,linked:[`F-1`],diagnoses:[],kind:`procedure`,fee:1200},a={title:`Components/Clinical/Dental/EditProcedureDrawer`,component:n,parameters:{layout:`fullscreen`,docs:{jira:[`CON-2083`,`CON-1751`,`CON-3900`],story:{inline:!1,iframeHeight:640},description:{component:`**Edit Procedure** (Figma 5294:85084; CON-2083, CON-1751): los datos del procedimiento arriba y, en pestañas, la información general (provider, notas, fee si existe) y los hallazgos y diagnósticos vinculados. Recibe todos los findings del paciente para ofrecer con cuál vincularlo. Lo abre [EditFindingDrawer](/docs/components-clinical-dental-editfindingdrawer--docs) cuando el finding es un procedimiento.

**Probalo:** en *Default* cambiá de pestaña; *WithoutLinks* es un procedimiento sin hallazgos vinculados.`}}},args:{finding:i,findings:[r,i],onClose:()=>{},onSave:()=>{}}},o={},s={args:{finding:{...i,linked:[],fee:void 0}}},c=[`Default`,`WithoutLinks`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      ...CORONA,
      linked: [],
      fee: undefined
    }
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{o as Default,s as WithoutLinks,c as __namedExportsOrder,a as default};
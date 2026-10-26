import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./EditFindingDrawer-Baj6nMrg.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),r={title:`Components/Clinical/Dental/EditFindingDrawer`,component:n,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:["Editar un finding, en el mismo drawer de la derecha que New Procedure/New Condition: estado, fecha, zona, condición y descriptores arriba (`FindingCard`); Provider, Surfaces (si tiene pieza) y Notes abajo.",``,'**Descriptors sólo en una condition** (`finding.kind === "condition"`): la guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs), cargada con lo que ya tenía elegido. Un procedure no la lleva.',``,`**Probalo:** en *Default* tocá otra píldora de Borders o Surface y guardá: la línea "Descriptors" de la card de arriba no cambia -es una foto de cuando se abrió el drawer-, pero la Problem List sí queda con lo nuevo.`].join(`
`)}}},args:{finding:{id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[`#10987231`],diagnoses:[],kind:`condition`,descriptors:{borders:`Raised`}},onClose:()=>{},onSave:()=>{}}},i={},a={args:{finding:{id:`F-2`,area:`Soft Palate`,condition:`oral candidiasis`,descriptor:`Red`,date:`May 14, 2026`,status:`Active`,tooth:null,provider:`Sarah Stone`,surfaces:[],notes:``,linked:[],diagnoses:[],kind:`condition`,descriptors:{colors:`Red`}}}},o={args:{finding:{id:`F-6`,area:`Tooth 19`,condition:`D2740 - Crown – porcelain/ceramic`,descriptor:`Tooth`,date:`May 14, 2026`,status:`Externally Treated`,tooth:19,provider:`Emily Chen`,surfaces:[],notes:``,linked:[],diagnoses:[],kind:`procedure`}}},s=[`Default`,`WithoutTooth`,`ProcedureFinding`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      id: 'F-2',
      area: 'Soft Palate',
      condition: 'oral candidiasis',
      descriptor: 'Red',
      date: 'May 14, 2026',
      status: 'Active',
      tooth: null,
      provider: 'Sarah Stone',
      surfaces: [],
      notes: '',
      linked: [],
      diagnoses: [],
      kind: 'condition',
      descriptors: {
        colors: 'Red'
      }
    }
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      id: 'F-6',
      area: 'Tooth 19',
      condition: 'D2740 - Crown – porcelain/ceramic',
      descriptor: 'Tooth',
      date: 'May 14, 2026',
      status: 'Externally Treated',
      tooth: 19,
      provider: 'Emily Chen',
      surfaces: [],
      notes: '',
      linked: [],
      diagnoses: [],
      kind: 'procedure'
    }
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{i as Default,o as ProcedureFinding,a as WithoutTooth,s as __namedExportsOrder,r as default};
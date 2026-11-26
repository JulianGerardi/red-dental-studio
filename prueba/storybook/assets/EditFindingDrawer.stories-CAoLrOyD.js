import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./EditFindingDrawer-CMHn8Fxq.js";var a,o,s,c,l,u,d;function f(){return(f=e((()=>{r(),a=t(),o={title:`Components/Clinical/Dental/EditFindingDrawer`,component:i,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:["Editar un finding, en el mismo drawer de la derecha que New Procedure/New Condition: estado, fecha, zona, condición y descriptores arriba (`FindingCard`); Provider, Surfaces (si tiene pieza) y Notes abajo.",``,'**Descriptors sólo en una condition** (`finding.kind === "condition"`): la guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs), cargada con lo que ya tenía elegido. Un procedure no la lleva.',``,`**Probalo:** en *Default* tocá otra píldora de Borders o Surface y guardá: la línea "Descriptors" de la card de arriba no cambia -es una foto de cuando se abrió el drawer-, pero la Problem List sí queda con lo nuevo.`].join(`
`)}}},args:{finding:{id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[`#10987231`],diagnoses:[],kind:`condition`,descriptors:{borders:`Raised`}},onClose:()=>{},onSave:()=>{}}},s={},c={args:{finding:{id:`F-2`,area:`Soft palate`,condition:`oral candidiasis`,descriptor:`Red`,date:`May 14, 2026`,status:`Active`,tooth:null,provider:`Sarah Stone`,surfaces:[],notes:``,linked:[],diagnoses:[],kind:`condition`,descriptors:{colors:`Red`}}}},l={args:{finding:{id:`F-6`,area:`Tooth 19`,condition:`D2740 - Crown – porcelain/ceramic`,descriptor:`Tooth`,date:`May 14, 2026`,status:`Externally treated`,tooth:19,provider:`Emily Chen`,surfaces:[],notes:``,linked:[],diagnoses:[],kind:`procedure`}}},u={render:()=>(0,a.jsx)(n,{finding:{id:`F-2`,area:`Soft palate`,condition:`oral candidiasis`,descriptor:`Red`,date:`May 14, 2026`,status:`Active`,tooth:null,provider:`Sarah Stone`,surfaces:[],notes:``,linked:[],diagnoses:[],kind:`condition`,descriptors:{colors:`Red`},examen:`Intraoral`},onClose:()=>{},onSave:()=>{}})},d=[`Default`,`WithoutTooth`,`ProcedureFinding`,`RegionFindingView`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      id: 'F-2',
      area: 'Soft palate',
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      id: 'F-6',
      area: 'Tooth 19',
      condition: 'D2740 - Crown – porcelain/ceramic',
      descriptor: 'Tooth',
      date: 'May 14, 2026',
      status: 'Externally treated',
      tooth: 19,
      provider: 'Emily Chen',
      surfaces: [],
      notes: '',
      linked: [],
      diagnoses: [],
      kind: 'procedure'
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <EditFindingView finding={{
    id: 'F-2',
    area: 'Soft palate',
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
    },
    examen: 'Intraoral'
  }} onClose={() => {}} onSave={() => {}} />
}`,...u.parameters?.docs?.source}}}})))()}f();export{s as Default,l as ProcedureFinding,u as RegionFindingView,c as WithoutTooth,d as __namedExportsOrder,o as default};
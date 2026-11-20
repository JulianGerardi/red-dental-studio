import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_ as n,o as r}from"./data-BmMkgGYd.js";import{i,n as a,o,r as s,t as c}from"./OpcionesVinculo-C6pF64Q4.js";var l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{o(),n(),l=t(),u={title:`Components/Clinical/Dental/OpcionesVinculo`,parameters:{layout:`padded`,docs:{jira:[`CON-2083`,`CON-1751`],description:{component:`Lo que muestra cada resultado de los buscadores de *New Procedure* y *New Condition* (CON-2083, CON-1751): un **finding** para vincular (condición, área, estado y fecha), un **diagnóstico** (código y descripción), una **condición** (con su grupo) y un **procedimiento** (código CDT y nombre). Van adentro de [SearchPicker](/docs/components-ui-searchpicker--docs).

**Probalo:** cada story es una card; *WithoutDetail* muestra las que no traen el dato opcional.`}}},decorators:[e=>(0,l.jsx)(`div`,{className:`flex w-[420px] max-w-full flex-col gap-2 rounded-xl bg-white p-3`,children:(0,l.jsx)(e,{})})]},d={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s,{finding:{condition:`chronic enamel dental caries`,area:`Tooth 3`,surfaces:[`O`,`DB`],status:`Active`,date:`May 14, 2026`,examen:`Dental Assessment`}}),(0,l.jsx)(s,{finding:{condition:`oral candidiasis`,area:`Soft Palate`,surfaces:[],status:`Active`,date:`May 14, 2026`,examen:`Intraoral`}})]})},f={render:()=>(0,l.jsx)(a,{code:`K05.31`,descripcion:`Chronic periodontitis, localized`,detalle:`Periodontal`})},p={render:()=>(0,l.jsx)(c,{nombre:`Abscess (morphologic abnormality)`,grupo:`Soft tissue`})},m={render:()=>(0,l.jsx)(l.Fragment,{children:r.slice(0,3).map(e=>(0,l.jsx)(i,{procedure:e},e.code))})},h={render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{code:`K02.9`,descripcion:`Dental caries, unspecified`}),(0,l.jsx)(c,{nombre:`Generally unwell`})]})},g=[`FindingOption`,`DiagnosisOption`,`ConditionOption`,`ProcedureOption`,`WithoutDetail`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <OpcionFinding finding={{
      condition: 'chronic enamel dental caries',
      area: 'Tooth 3',
      surfaces: ['O', 'DB'],
      status: 'Active',
      date: 'May 14, 2026',
      examen: 'Dental Assessment'
    }} />
      <OpcionFinding finding={{
      condition: 'oral candidiasis',
      area: 'Soft Palate',
      surfaces: [],
      status: 'Active',
      date: 'May 14, 2026',
      examen: 'Intraoral'
    }} />
    </>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <OpcionDiagnostico code="K05.31" descripcion="Chronic periodontitis, localized" detalle="Periodontal" />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <OpcionCondicion nombre="Abscess (morphologic abnormality)" grupo="Soft tissue" />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <>{PROCEDURES.slice(0, 3).map(p => <OpcionProcedimiento key={p.code} procedure={p} />)}</>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <OpcionDiagnostico code="K02.9" descripcion="Dental caries, unspecified" />
      <OpcionCondicion nombre="Generally unwell" />
    </>
}`,...h.parameters?.docs?.source}}}})))()}_();export{p as ConditionOption,f as DiagnosisOption,d as FindingOption,m as ProcedureOption,h as WithoutDetail,g as __namedExportsOrder,u as default};
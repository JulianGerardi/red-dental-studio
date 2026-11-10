import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{d as n,r}from"./kit-CWUgB5-0.js";import{a as i,i as a,r as o}from"./EditRelationshipModal-8Mg0m2tU.js";import{i as s,n as c,o as l,r as u,t as d}from"./Relationships-DGyoCyTj.js";var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{i(),n(),l(),f=t(),p={title:`Pages/Parts/Relationships`,parameters:{layout:`padded`}},m=()=>{},h={layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:420}}},g={render:()=>(0,f.jsx)(`div`,{className:`w-[640px]`,children:(0,f.jsx)(u,{p:s[0],onEdit:m,onDelete:m})})},_={render:()=>(0,f.jsx)(`div`,{className:`w-[640px]`,children:(0,f.jsx)(u,{p:d[0]})})},v={render:()=>(0,f.jsx)(`div`,{className:`h-40`,children:(0,f.jsx)(c,{nombre:`Jessica Miller`,onEdit:m,onDelete:m})})},y={name:`Row menu — open`,render:()=>(0,f.jsx)(r,{selector:`button`,estado:`click`,className:`h-40`,children:(0,f.jsx)(c,{nombre:`Jessica Miller`,onEdit:m,onDelete:m})})},b={name:`Delete relationship`,parameters:h,render:()=>(0,f.jsx)(o,{onConfirm:m,onCancel:m})},x={name:`Remove Guardian access`,parameters:h,render:()=>(0,f.jsx)(a,{persona:`Michael Miller`,paciente:`John Smith`,ultimaDeGuardian:!0,onConfirm:m,onCancel:m})},S=[`RelationCard`,`HouseholdCard`,`RowMenu`,`RowMenuOpen`,`DeleteDialog`,`RemoveGuardian`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={salir} onDelete={salir} /></div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} /></div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Row menu — open',
  render: () => <Forzar selector="button" estado="click" className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} /></Forzar>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Delete relationship',
  parameters: emergente,
  render: () => <DeleteRelationshipDialog onConfirm={salir} onCancel={salir} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Remove Guardian access',
  parameters: emergente,
  render: () => <RemoveGuardianDialog persona="Michael Miller" paciente="John Smith" ultimaDeGuardian onConfirm={salir} onCancel={salir} />
}`,...x.parameters?.docs?.source}}}})))()}C();export{b as DeleteDialog,_ as HouseholdCard,g as RelationCard,x as RemoveGuardian,v as RowMenu,y as RowMenuOpen,S as __namedExportsOrder,p as default};
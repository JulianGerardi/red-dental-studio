import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,n as r,r as i,t as a}from"./RadiographyViewer-D7jUpejl.js";import{_ as o,a as s}from"./clinical-mode-Bvx1pbAd.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{o(),n(),c=t(),l={title:`Components/Clinical/RadiographyViewer parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:520}}}},u={render:()=>(0,c.jsxs)(`div`,{className:`flex gap-4`,children:[(0,c.jsx)(`div`,{className:`h-40 w-64`,children:(0,c.jsx)(i,{id:`a`})}),(0,c.jsx)(`div`,{className:`h-24 w-40`,children:(0,c.jsx)(i,{id:`b`,chica:!0})})]})},d={render:()=>(0,c.jsx)(`div`,{className:`flex w-[320px] flex-col gap-2`,children:s.slice(0,2).map(e=>(0,c.jsx)(a,{h:e,onBorrar:()=>{}},e.id))})},f={parameters:{layout:`fullscreen`},render:()=>(0,c.jsx)(r,{onClose:()=>{}})},p=[`Plate`,`FindingCard`,`NewConditionDialog`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4"><div className="h-40 w-64"><Placa id="a" /></div><div className="h-24 w-40"><Placa id="b" chica /></div></div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[320px] flex-col gap-2">{HALLAZGOS.slice(0, 2).map(h => <FichaHallazgo key={h.id} h={h} onBorrar={() => {}} />)}</div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <NewCondition onClose={() => {}} />
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as FindingCard,f as NewConditionDialog,u as Plate,p as __namedExportsOrder,l as default};
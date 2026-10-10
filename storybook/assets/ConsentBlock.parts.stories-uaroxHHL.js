import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i}from"./ConsentBlock-rFDQ9IgT.js";import{i as a,u as o}from"./treatment-plan-C_EmF93Q.js";var s,c,l,u,d;function f(){return(f=e((()=>{o(),n(),s=t(),c={title:`Components/Clinical/ConsentBlock parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:420}}}},l={render:()=>(0,s.jsxs)(`div`,{className:`@container flex w-[1100px] flex-col gap-2`,children:[a.firmas.map(e=>(0,s.jsx)(r,{f:e},e.rol)),(0,s.jsx)(r,{f:{...a.firmas[0],estado:`Signed`,fecha:`05/14/2026`}})]})},u={parameters:{layout:`fullscreen`},render:()=>(0,s.jsx)(i,{onClose:()=>{}})},d=[`SignatureRows`,`HistoryPanel`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="@container flex w-[1100px] flex-col gap-2">
      {CONSENTIMIENTO.firmas.map(f => <FilaFirma key={f.rol} f={f} />)}
      <FilaFirma f={{
      ...CONSENTIMIENTO.firmas[0],
      estado: 'Signed',
      fecha: '05/14/2026'
    }} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <PanelHistorial onClose={() => {}} />
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as HistoryPanel,l as SignatureRows,d as __namedExportsOrder,c as default};
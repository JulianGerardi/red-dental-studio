import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{g as n,h as r,u as i}from"./demos-BL-Zdfa5.js";var a,o,s,c,l;function u(){return(u=e((()=>{n(),a=t(),o={title:`Components/Help/Demos`,parameters:{layout:`padded`}},s={render:()=>(0,a.jsx)(`div`,{className:`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`,children:Object.entries(r).filter(([e])=>e.endsWith(`Demo`)).map(([e,t])=>(0,a.jsxs)(`figure`,{className:`flex flex-col gap-2`,children:[(0,a.jsx)(`div`,{className:`w-[260px] overflow-hidden rounded-xl border border-line`,children:(0,a.jsx)(t,{})}),(0,a.jsx)(`figcaption`,{className:`text-[12px] text-ink-muted`,children:e})]},e))})},c={render:()=>(0,a.jsx)(`div`,{className:`w-[300px] overflow-hidden rounded-xl border border-line`,children:(0,a.jsx)(i,{activa:`Ledger`})})},l=[`All`,`PatientTabsSelected`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(demos).filter(([nombre]) => nombre.endsWith('Demo')).map(([nombre, Demo]) => {
      const Componente = Demo as () => React.ReactElement;
      return <figure key={nombre} className="flex flex-col gap-2">
              <div className="w-[260px] overflow-hidden rounded-xl border border-line"><Componente /></div>
              <figcaption className="text-[12px] text-ink-muted">{nombre}</figcaption>
            </figure>;
    })}
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px] overflow-hidden rounded-xl border border-line"><demos.PatientTabsDemo activa="Ledger" /></div>
}`,...c.parameters?.docs?.source}}}})))()}u();export{s as All,c as PatientTabsSelected,l as __namedExportsOrder,o as default};
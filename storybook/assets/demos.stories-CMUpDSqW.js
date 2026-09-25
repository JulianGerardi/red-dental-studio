import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{g as n,h as r}from"./demos-BjCpu0fS.js";var i,a,o,s;function c(){return(c=e((()=>{n(),i=t(),a={title:`Components/Help/Demos`,parameters:{layout:`padded`}},o={render:()=>(0,i.jsx)(`div`,{className:`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`,children:Object.entries(r).filter(([e])=>e.endsWith(`Demo`)).map(([e,t])=>(0,i.jsxs)(`figure`,{className:`flex flex-col gap-2`,children:[(0,i.jsx)(`div`,{className:`w-[260px] overflow-hidden rounded-xl border border-line`,children:(0,i.jsx)(t,{})}),(0,i.jsx)(`figcaption`,{className:`text-[12px] text-ink-muted`,children:e})]},e))})},s=[`All`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(demos).filter(([nombre]) => nombre.endsWith('Demo')).map(([nombre, Demo]) => {
      const Componente = Demo as () => React.ReactElement;
      return <figure key={nombre} className="flex flex-col gap-2">
              <div className="w-[260px] overflow-hidden rounded-xl border border-line"><Componente /></div>
              <figcaption className="text-[12px] text-ink-muted">{nombre}</figcaption>
            </figure>;
    })}
    </div>
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as All,s as __namedExportsOrder,a as default};
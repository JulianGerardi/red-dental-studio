import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{a as i,i as a,n as o,r as s,t as c}from"./ProblemList-VQDbBYAW.js";import{a as l,n as u,r as d,t as f}from"./play-CDw6varG.js";import{i as p,u as m,y as h}from"./clinical-mode-B54OdYK5.js";var g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{n(),h(),i(),d(),g=t(),{userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Components/Clinical/ProblemList`,component:o,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},b={},x={play:async e=>{await _.click(await v(e.canvasElement).findByRole(`tab`,{name:`Procedures`})),await u(/D0220/)(e)}},S={play:l(f(/search/i,`zzzz`),u(/no problems found/i))},C={play:async e=>{let[t]=await v(e.canvasElement).findAllByRole(`button`,{name:/actions for abscess/i});await _.click(t),await u(/start monitoring/i)(e)}},w={render:()=>(0,g.jsx)(r,{children:(0,g.jsxs)(`div`,{className:`flex flex-wrap items-center gap-6`,children:[(0,g.jsx)(c,{nota:`Reports fatigue for the last week; no fever.`}),(0,g.jsx)(c,{}),(0,g.jsx)(a,{pieza:14}),(0,g.jsx)(a,{}),(0,g.jsx)(s,{value:`Active`,options:p,onChange:()=>{},conteo:Object.fromEntries(p.map(e=>[e,m.filter(t=>t.estado===e).length])),tono:{Active:`success`,Monitoring:`warning`,"In treatment":`info`}})]})})},T=[`Default`,`Procedures`,`NoResults`,`RowMenu`,`Parts`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('tab', {
      name: 'Procedures'
    }));
    await esperar(/D0220/)(c);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no problems found/i))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: async c => {
    const [primera] = await within(c.canvasElement).findAllByRole('button', {
      name: /actions for abscess/i
    });
    await userEvent.click(primera);
    await esperar(/start monitoring/i)(c);
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <NoteCell nota="Reports fatigue for the last week; no fever." />
        <NoteCell />
        <ToothCell pieza={14} />
        <ToothCell />
        <StatusFilter value="Active" options={ESTADOS_PROBLEMA} onChange={() => {}} conteo={Object.fromEntries(ESTADOS_PROBLEMA.map(e => [e, PROBLEMAS.filter(p => p.estado === e).length]))} tono={{
        Active: 'success',
        Monitoring: 'warning',
        'In treatment': 'info'
      }} />
      </div>
    </TooltipProvider>
}`,...w.parameters?.docs?.source}}}})))()}E();export{b as Default,S as NoResults,w as Parts,x as Procedures,C as RowMenu,T as __namedExportsOrder,y as default};
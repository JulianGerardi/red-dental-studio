import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{i,n as a,r as o,t as s}from"./ProblemList-DVYJKvbH.js";import{a as c,n as l,r as u,t as d}from"./play-CDw6varG.js";var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{n(),i(),u(),f=t(),{userEvent:p,within:m}=__STORYBOOK_MODULE_TEST__,h={title:`Components/Clinical/ProblemList`,component:a,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},g={},_={play:async e=>{await p.click(await m(e.canvasElement).findByRole(`tab`,{name:`Procedures`})),await l(/D0220/)(e)}},v={play:c(d(/search/i,`zzzz`),l(/no problems found/i))},y={play:async e=>{let[t]=await m(e.canvasElement).findAllByRole(`button`,{name:/actions for abscess/i});await p.click(t),await l(/start monitoring/i)(e)}},b={render:()=>(0,f.jsx)(r,{children:(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-6`,children:[(0,f.jsx)(s,{nota:`Reports fatigue for the last week; no fever.`}),(0,f.jsx)(s,{}),(0,f.jsx)(o,{pieza:14}),(0,f.jsx)(o,{})]})})},x={play:async e=>{await p.click(await m(e.canvasElement).findByRole(`button`,{name:/filter problems by status/i})),await l(/clinic declined/i)(e)}},S=[`Default`,`Procedures`,`NoResults`,`RowMenu`,`Parts`,`StatusFilterOpen`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('tab', {
      name: 'Procedures'
    }));
    await esperar(/D0220/)(c);
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no problems found/i))
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: async c => {
    const [primera] = await within(c.canvasElement).findAllByRole('button', {
      name: /actions for abscess/i
    });
    await userEvent.click(primera);
    await esperar(/start monitoring/i)(c);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <NoteCell nota="Reports fatigue for the last week; no fever." />
        <NoteCell />
        <ToothCell pieza={14} />
        <ToothCell />
      </div>
    </TooltipProvider>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /filter problems by status/i
    }));
    await esperar(/clinic declined/i)(c);
  }
}`,...x.parameters?.docs?.source}}}})))()}C();export{g as Default,v as NoResults,b as Parts,_ as Procedures,y as RowMenu,x as StatusFilterOpen,S as __namedExportsOrder,h as default};
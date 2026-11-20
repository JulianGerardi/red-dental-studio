import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,o as r,r as i}from"./ConsentDocument-DooGlybY.js";var a,o,s,c,l,u,d;function f(){return(f=e((()=>{r(),a=t(),o={title:`Components/Settings/ConsentDocument parts`,parameters:{layout:`padded`}},s={render:()=>(0,a.jsx)(`div`,{className:`w-[420px] bg-white p-6`,children:(0,a.jsx)(n,{titulo:`Nature of procedure`,children:(0,a.jsx)(`p`,{children:`The proposed treatment has been explained to me.`})})})},c={render:()=>(0,a.jsx)(`div`,{className:`w-[420px] bg-white p-6`,children:(0,a.jsx)(i,{rol:`Patient / Legal Guardian`,nombre:`John Smith`})})},l={render:()=>(0,a.jsx)(`div`,{className:`w-[420px] bg-white p-6`,children:(0,a.jsx)(i,{rol:`Patient / Legal Guardian`,nombre:`John Smith`,firma:{fecha:`11/13/2026`,nombre:`John Smith`,iniciales:`JS`}})})},u={render:()=>(0,a.jsx)(`div`,{className:`w-[420px] bg-white p-6`,children:(0,a.jsx)(i,{rol:`Provider`,nombre:`Dr. Perez Martinez`,firma:{fecha:`11/13/2026`,nombre:`Perez Martinez`,texto:`Perez Martinez`}})})},d=[`DocumentSection`,`SignatureLineEmpty`,`SignatureLineAdopted`,`SignatureLineTyped`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px] bg-white p-6"><Seccion titulo="Nature of procedure"><p>The proposed treatment has been explained to me.</p></Seccion></div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Patient / Legal Guardian" nombre="John Smith" /></div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Patient / Legal Guardian" nombre="John Smith" firma={{
      fecha: '11/13/2026',
      nombre: 'John Smith',
      iniciales: 'JS'
    }} /></div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[420px] bg-white p-6"><LineaFirma rol="Provider" nombre="Dr. Perez Martinez" firma={{
      fecha: '11/13/2026',
      nombre: 'Perez Martinez',
      texto: 'Perez Martinez'
    }} /></div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{s as DocumentSection,l as SignatureLineAdopted,c as SignatureLineEmpty,u as SignatureLineTyped,d as __namedExportsOrder,o as default};
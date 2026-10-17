import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./PendingDocuments-8Zd6h-0N.js";var o,s,c,l,u,d;function f(){return(f=e((()=>{r(),n(),o=t(),s={title:`Components/Patients/PendingDocuments`,component:a,parameters:{layout:`padded`,docs:{description:{component:[`Los documentos del paciente que alguien tiene que resolver (firmar, subir, actualizar o revisar), en el Patient Dashboard en lugar de la tabla de Insurance. Agrupados en Overdue, Due this week y Later, con quién tiene que actuar (Patient, Provider, Front desk) y un botón para resolverlo; los vencidos con el botón azul. Se filtra entre All, Patient y Office.`,``,`**Probalo:** en *Playground* resolvé documentos o filtrá por quién tiene que actuar.`].join(`
`)}}},argTypes:{docs:{table:{disable:!0}}},decorators:[e=>(0,o.jsx)(`div`,{className:`max-w-[860px] rounded-lg border border-line bg-white p-5`,children:(0,o.jsx)(e,{})})]},c={},l={name:`Many documents (show more)`,args:{docs:[0,1,2].flatMap(e=>i.map(t=>({...t,id:`${t.id}-${e}`})))}},u={args:{docs:i.map(e=>({...e,resuelto:`Oct 5, 2026`}))}},d=[`Playground`,`ManyDocuments`,`Empty`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Many documents (show more)',
  args: {
    docs: [0, 1, 2].flatMap(k => DOCS_PENDIENTES.map(d => ({
      ...d,
      id: \`\${d.id}-\${k}\`
    })))
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    docs: DOCS_PENDIENTES.map(d => ({
      ...d,
      resuelto: 'Oct 5, 2026'
    }))
  }
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as Empty,l as ManyDocuments,c as Playground,d as __namedExportsOrder,s as default};
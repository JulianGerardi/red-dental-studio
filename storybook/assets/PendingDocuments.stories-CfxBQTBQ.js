import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./PendingDocuments-DLW6PnVv.js";var o,s,c,l,u;function d(){return(d=e((()=>{r(),n(),o=t(),s={title:`Components/Patients/PendingDocuments`,component:a,parameters:{layout:`padded`,docs:{description:{component:[`Los documentos del paciente que alguien tiene que resolver (firmar, subir, actualizar o revisar), en el Patient Dashboard en lugar de la tabla de Insurance. Agrupados en Overdue, Due this week y Later, con quién tiene que actuar (Patient, Provider, Front desk) y un botón para resolverlo; los vencidos con el botón azul. Se filtra entre All, Patient y Office.`,``,`**Probalo:** en *Playground* resolvé documentos o filtrá por quién tiene que actuar.`].join(`
`)}}},argTypes:{docs:{table:{disable:!0}}},decorators:[e=>(0,o.jsx)(`div`,{className:`max-w-[860px] rounded-lg border border-line bg-white p-5`,children:(0,o.jsx)(e,{})})]},c={},l={args:{docs:i.map(e=>({...e,resuelto:`Oct 5, 2026`}))}},u=[`Playground`,`Empty`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    docs: DOCS_PENDIENTES.map(d => ({
      ...d,
      resuelto: 'Oct 5, 2026'
    }))
  }
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as Empty,c as Playground,u as __namedExportsOrder,s as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./ProblemListFlotante-C6J1LxXc.js";import{i,n as a,o,r as s}from"./play-Dr1R_I1D.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{s(),n(),c=t(),l={title:`Components/Clinical/ProblemListFlotante`,component:r,parameters:{layout:`fullscreen`,docs:{jira:[`CON-3114`,`CON-2832`,`CON-2833`],story:{inline:!1,iframeHeight:640},description:{component:`El botón **View Problem List** de la barra de acciones del Overview de Clinical Mode y la tabla que abre flotando (clinical-mode.md, 2026-10-29): *Problem List* con los hallazgos de todos los exámenes y *Procedures* con los procedimientos del paciente (CON-2832, CON-2833). Es ancha para que la tabla entre entera y scrollea adentro hasta el borde de la pantalla.

**Cómo se usa:** con \`procedimientoInicial\` abre ya en Procedures con esa fila desplegada: es el link del Ledger a un procedimiento (\`?procedure=\`).

**Probalo:** en *Default* tocá el botón; *Open* la deja abierta y *OpenOnProcedure* llega como desde el Ledger.`}}},decorators:[e=>(0,c.jsx)(`div`,{className:`bg-page-background min-h-[600px] p-4`,children:(0,c.jsx)(e,{})})]},u={},d={play:o(i(/view problem list/i),a(/problem list/i))},f={args:{procedimientoInicial:`D4341`}},p=[`Default`,`Open`,`OpenOnProcedure`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/view problem list/i), esperar(/problem list/i))
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    procedimientoInicial: 'D4341'
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Default,d as Open,f as OpenOnProcedure,p as __namedExportsOrder,l as default};
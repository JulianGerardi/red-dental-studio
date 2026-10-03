import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./toaster-B6mRBNx3.js";import{fn as a,mn as o}from"./iframe-BOxiGlyD.js";var s,c,l,u,d;function f(){return(f=e((()=>{r(),o(),s=t(),c={title:`Components/UI/Toast`,component:i,parameters:{docs:{description:{component:"El aviso que confirma o rechaza cada acción, abajo a la izquierda. Se dispara con `aviso.ok / error / warn / info` (el `<Toaster />` ya está montado en la app y en el preview). **Probalo** en *Playground*: tipo, mensaje y acción."}}}},l={args:{type:`ok`,message:`Consent template updated.`,withAction:!1,actionLabel:`Undo`},argTypes:{type:{control:`inline-radio`,options:[`ok`,`error`,`warn`,`info`],description:`ok: salió bien · error: no se pudo · warn: salió, pero ojo · info: dato.`},message:{control:`text`,description:`Qué pasó, en pasado y en una línea.`},withAction:{control:`boolean`,description:`Un botón para deshacer o para ir a ver el resultado.`},actionLabel:{control:`text`}},render:({type:e,message:t,withAction:r,actionLabel:i})=>(0,s.jsx)(a,{onClick:()=>n[e](t,r?{label:i,onClick:()=>n.info(`${i} clicked.`)}:void 0),children:`Show toast`})},u={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,s.jsx)(a,{variant:`secondary`,onClick:()=>n.ok(`Consent template updated.`),children:`ok`}),(0,s.jsx)(a,{variant:`secondary`,onClick:()=>n.error(`Could not save the appointment.`),children:`error`}),(0,s.jsx)(a,{variant:`secondary`,onClick:()=>n.warn(`This patient has an open balance.`),children:`warn`}),(0,s.jsx)(a,{variant:`secondary`,onClick:()=>n.info(`Rich text formatting is not available.`),children:`info`}),(0,s.jsx)(a,{variant:`secondary`,onClick:()=>n.ok(`Appointment moved.`,{label:`Go to Mar 13`,onClick:()=>{}}),children:`with action`})]})},d=[`Playground`,`Tipos`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'ok',
    message: 'Consent template updated.',
    withAction: false,
    actionLabel: 'Undo'
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['ok', 'error', 'warn', 'info'],
      description: 'ok: salió bien · error: no se pudo · warn: salió, pero ojo · info: dato.'
    },
    message: {
      control: 'text',
      description: 'Qué pasó, en pasado y en una línea.'
    },
    withAction: {
      control: 'boolean',
      description: 'Un botón para deshacer o para ir a ver el resultado.'
    },
    actionLabel: {
      control: 'text'
    }
  },
  render: ({
    type,
    message,
    withAction,
    actionLabel
  }) => <Button onClick={() => aviso[type](message, withAction ? {
    label: actionLabel,
    onClick: () => aviso.info(\`\${actionLabel} clicked.\`)
  } : undefined)}>Show toast</Button>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => aviso.ok('Consent template updated.')}>ok</Button>
      <Button variant="secondary" onClick={() => aviso.error('Could not save the appointment.')}>error</Button>
      <Button variant="secondary" onClick={() => aviso.warn('This patient has an open balance.')}>warn</Button>
      <Button variant="secondary" onClick={() => aviso.info('Rich text formatting is not available.')}>info</Button>
      <Button variant="secondary" onClick={() => aviso.ok('Appointment moved.', {
      label: 'Go to Mar 13',
      onClick: () => {}
    })}>with action</Button>
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Playground,u as Tipos,d as __namedExportsOrder,c as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./toaster-D2sSwnPH.js";import{i as a,r as o}from"./button-R5lrVQ2-.js";var s,c,l,u,d;function f(){return(f=e((()=>{r(),a(),s=t(),c={title:`Components/UI/Toast`,component:i,parameters:{docs:{description:{component:"El aviso que confirma o rechaza cada acción, abajo a la izquierda. Se dispara con `aviso.ok / error / warn / info` (el `<Toaster />` ya está montado en la app y en el preview). **Probalo** en *Playground*: tipo, título, mensaje y acción. Con título, el mensaje explica la regla que frenó la acción (*Procedure cannot be updated*)."}}}},l={args:{type:`ok`,title:``,message:`Consent template updated.`,withAction:!1,actionLabel:`Undo`},argTypes:{type:{control:`inline-radio`,options:[`ok`,`error`,`warn`,`info`],description:`ok: salió bien · error: no se pudo · warn: salió, pero ojo · info: dato.`},title:{control:`text`,description:`Opcional. Con título, el mensaje explica la regla que frenó la acción y la acción baja debajo del texto.`},message:{control:`text`,description:`Qué pasó, en pasado y en una línea.`},withAction:{control:`boolean`,description:`Un botón para deshacer o para ir a ver el resultado.`},actionLabel:{control:`text`}},render:({type:e,title:t,message:r,withAction:i,actionLabel:a})=>(0,s.jsx)(o,{onClick:()=>n[e](t?{titulo:t,texto:r}:r,i?{label:a,onClick:()=>n.info(`${a} clicked.`)}:void 0),children:`Show toast`})},u={render:()=>(0,s.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.ok(`Consent template updated.`),children:`ok`}),(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.error(`Could not save the appointment.`),children:`error`}),(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.warn(`This patient has an open balance.`),children:`warn`}),(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.info(`Rich text formatting is not available.`),children:`info`}),(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.ok(`Appointment moved.`,{label:`Go to Mar 13`,onClick:()=>{}}),children:`with action`}),(0,s.jsx)(o,{variant:`secondary`,onClick:()=>n.error({titulo:`Procedure cannot be updated`,texto:`The treatment case must be Accepted and its treatment plan must be Accepted or In Progress.`},{label:`View case`,onClick:()=>{}}),children:`with title and action`})]})},d=[`Playground`,`Tipos`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'ok',
    title: '',
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
    title: {
      control: 'text',
      description: 'Opcional. Con título, el mensaje explica la regla que frenó la acción y la acción baja debajo del texto.'
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
    title,
    message,
    withAction,
    actionLabel
  }) => <Button onClick={() => aviso[type](title ? {
    titulo: title,
    texto: message
  } : message, withAction ? {
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
      <Button variant="secondary" onClick={() => aviso.error({
      titulo: 'Procedure cannot be updated',
      texto: 'The treatment case must be Accepted and its treatment plan must be Accepted or In Progress.'
    }, {
      label: 'View case',
      onClick: () => {}
    })}>with title and action</Button>
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Playground,u as Tipos,d as __namedExportsOrder,c as default};
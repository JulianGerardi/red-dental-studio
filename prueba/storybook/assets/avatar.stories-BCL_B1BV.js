import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./avatar-6AYQWGxS.js";var a,o,s,c,l,u,d;function f(){return(f=e((()=>{r(),a=t(),o={title:`Components/UI/Avatar`,component:i,parameters:{docs:{description:{component:`El círculo con las iniciales o la foto de una persona. **Probalo** en *Playground*: iniciales, tamaño, color (paciente o equipo) y foto.`}}}},s=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23c7d9fb%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231a4da9%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2211%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3Cpath%20d%3D%22M12%2060c3-12%2012-18%2020-18s17%206%2020%2018%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3C%2Fsvg%3E`,c={patient:`bg-dash-blue-hover text-white`,team:`bg-dash-count-bg text-dash-blue-hover`,primary:``},l={args:{initials:`SS`,size:32,tone:`patient`,photo:!1},argTypes:{initials:{control:`text`,description:`Una o dos letras.`},size:{control:`inline-radio`,options:[16,24,32,36,40,56,62],description:`32 en tablas y listas · 62 en el panel del paciente · 16-24 en chips.`},tone:{control:`inline-radio`,options:Object.keys(c),description:`patient: azul oscuro (pacientes) · team: celeste (equipo y providers) · primary: el del componente base.`},photo:{control:`boolean`,description:`Con foto, las iniciales no se ven.`}},render:({initials:e,size:t,tone:r,photo:o})=>(0,a.jsx)(i,{style:{width:t,height:t},children:o?(0,a.jsx)(`img`,{src:s,alt:e,className:`size-full object-cover`}):(0,a.jsx)(n,{className:`font-semibold ${c[r]}`,style:{fontSize:Math.max(7,Math.round(t/2.8))},children:e.slice(0,2).toUpperCase()})})},u={render:()=>(0,a.jsx)(`div`,{className:`flex items-end gap-3`,children:[24,32,40,56].map(e=>(0,a.jsx)(i,{style:{width:e,height:e},children:(0,a.jsx)(n,{style:{fontSize:e/2.6},children:`SS`})},e))})},d=[`Playground`,`Initials`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    initials: 'SS',
    size: 32,
    tone: 'patient',
    photo: false
  },
  argTypes: {
    initials: {
      control: 'text',
      description: 'Una o dos letras.'
    },
    size: {
      control: 'inline-radio',
      options: [16, 24, 32, 36, 40, 56, 62],
      description: '32 en tablas y listas · 62 en el panel del paciente · 16-24 en chips.'
    },
    tone: {
      control: 'inline-radio',
      options: Object.keys(TONOS),
      description: 'patient: azul oscuro (pacientes) · team: celeste (equipo y providers) · primary: el del componente base.'
    },
    photo: {
      control: 'boolean',
      description: 'Con foto, las iniciales no se ven.'
    }
  },
  render: ({
    initials,
    size,
    tone,
    photo
  }) => <Avatar style={{
    width: size,
    height: size
  }}>
      {photo ? <img src={FOTO} alt={initials} className="size-full object-cover" /> : <AvatarFallback className={\`font-semibold \${TONOS[tone]}\`} style={{
      fontSize: Math.max(7, Math.round(size / 2.8))
    }}>{initials.slice(0, 2).toUpperCase()}</AvatarFallback>}
    </Avatar>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-3">
      {[24, 32, 40, 56].map(s => <Avatar key={s} style={{
      width: s,
      height: s
    }}>
          <AvatarFallback style={{
        fontSize: s / 2.6
      }}>SS</AvatarFallback>
        </Avatar>)}
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as Initials,l as Playground,d as __namedExportsOrder,o as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./switch-CzlWg6Pb.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`Components/UI/Switch`,component:r,argTypes:{size:{control:`select`,options:[`default`,`sm`]}},parameters:{docs:{description:{component:`Prende o apaga algo que tiene efecto enseguida. **Probalo** en *Playground*.`}}}},o={args:{label:`Active template`,checked:!0,size:`default`,disabled:!1,invalid:!1},argTypes:{label:{control:`text`,description:`Qué prende o apaga. Siempre al lado.`},checked:{control:`boolean`,description:`Cómo arranca. Se puede tocar.`},size:{control:`inline-radio`,options:[`default`,`sm`],description:`default en formularios · sm en listas.`},disabled:{control:`boolean`},invalid:{control:`boolean`,description:`Borde rojo cuando falta elegir.`}},render:({label:e,checked:t,size:n,disabled:a,invalid:o})=>(0,i.jsxs)(`label`,{className:`flex items-center gap-2.5 text-[13px] text-ink`,children:[(0,i.jsx)(r,{defaultChecked:t,size:n,disabled:a,"aria-invalid":o||void 0},String(t)),e]})},s={args:{defaultChecked:!0,"aria-label":`Active`}},c={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{"aria-label":`Off`}),(0,i.jsx)(r,{defaultChecked:!0,"aria-label":`On`}),(0,i.jsx)(r,{size:`sm`,defaultChecked:!0,"aria-label":`Small on`}),(0,i.jsx)(r,{disabled:!0,"aria-label":`Disabled`}),(0,i.jsx)(r,{disabled:!0,defaultChecked:!0,"aria-label":`Disabled on`})]})},l={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{"aria-invalid":!0,"aria-label":`Invalid off`}),(0,i.jsx)(r,{"aria-invalid":!0,defaultChecked:!0,"aria-label":`Invalid on`})]})},u=[`Playground`,`Default`,`States`,`Invalid`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Active template',
    checked: true,
    size: 'default',
    disabled: false,
    invalid: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Qué prende o apaga. Siempre al lado.'
    },
    checked: {
      control: 'boolean',
      description: 'Cómo arranca. Se puede tocar.'
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'sm'],
      description: 'default en formularios · sm en listas.'
    },
    disabled: {
      control: 'boolean'
    },
    invalid: {
      control: 'boolean',
      description: 'Borde rojo cuando falta elegir.'
    }
  },
  render: ({
    label,
    checked,
    size,
    disabled,
    invalid
  }) => <label className="flex items-center gap-2.5 text-[13px] text-ink">
      <Switch key={String(checked)} defaultChecked={checked} size={size} disabled={disabled} aria-invalid={invalid || undefined} />
      {label}
    </label>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Active'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
      <Switch size="sm" defaultChecked aria-label="Small on" />
      <Switch disabled aria-label="Disabled" />
      <Switch disabled defaultChecked aria-label="Disabled on" />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Switch aria-invalid aria-label="Invalid off" />
      <Switch aria-invalid defaultChecked aria-label="Invalid on" />
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{s as Default,l as Invalid,o as Playground,c as States,u as __namedExportsOrder,a as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./country-flag-C8s4f2GP.js";import{f as i,n as a,o}from"./kit-Di92TvVK.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{i(),n(),s=t(),c={title:`Components/UI/CountryFlag`,component:r,parameters:{layout:`padded`,docs:{description:{component:`La bandera que acompaña al Country Code de un teléfono y al país de una dirección. Es decorativa (\`alt=""\`): el nombre va siempre en texto al lado. Sin país conocido no dibuja nada.

**Probalo:** escribí en *Controls* la opción tal como la muestra el campo ("(+54) Argentina") o un valor viejo ("+1").`}}},args:{opcion:`(+1) United States`},argTypes:{opcion:{control:`text`,description:`La opción del campo: "(+54) Argentina", "United States"…`}}},l={},u={parameters:{controls:{disable:!0}},render:()=>(0,s.jsx)(o,{children:[`(+1) United States`,`(+54) Argentina`,`(+52) Mexico`,`(+34) Spain`,`(+55) Brazil`].map(e=>(0,s.jsx)(a,{rotulo:e,children:(0,s.jsx)(r,{opcion:e})},e))})},d={args:{opcion:`Atlantis`},render:e=>(0,s.jsxs)(`span`,{className:`text-[13px] text-ink-muted`,children:[`[`,(0,s.jsx)(r,{...e}),`] no flag for an unknown country`]})},f=[`Playground`,`Countries`,`UnknownCountry`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Muestras>
      {['(+1) United States', '(+54) Argentina', '(+52) Mexico', '(+34) Spain', '(+55) Brazil'].map(o => <ConRotulo key={o} rotulo={o}><CountryFlag opcion={o} /></ConRotulo>)}
    </Muestras>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    opcion: 'Atlantis'
  },
  render: args => <span className="text-[13px] text-ink-muted">[<CountryFlag {...args} />] no flag for an unknown country</span>
}`,...d.parameters?.docs?.source}}}})))()}p();export{u as Countries,l as Playground,d as UnknownCountry,f as __namedExportsOrder,c as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{fn as r,mn as i}from"./iframe-CuHImV4I.js";import{n as a,t as o}from"./drawer--iNdA5iK.js";var s,c,l,u,d;function f(){return(f=e((()=>{s=t(),a(),i(),c=n(),l={title:`Components/UI/Drawer`,component:o,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:560},description:{component:`Un panel que entra desde la derecha para cargar algo sin perder de vista la pantalla de atrás. Título con su X, contenido con scroll y las acciones fijas al pie. **Probalo** en *Playground*: título, bajada y si lleva pie.`}}}},u={args:{title:`New Procedure`,description:`Chart a procedure on the selected area.`,footer:!0,open:!0},argTypes:{title:{control:`text`,description:`Qué se carga.`},description:{control:`text`,description:`Una línea de contexto. Vacía, no se muestra.`},footer:{control:`boolean`,description:`Acciones fijas al pie, una debajo de la otra.`},open:{control:`boolean`,description:`Abierto al cargar. Apagado: se abre con el botón.`}},render:function({title:e,description:t,footer:n,open:i}){let[a,l]=(0,s.useState)(i);return(0,c.jsxs)(`div`,{className:`p-6`,children:[(0,c.jsx)(r,{onClick:()=>l(!0),children:`Open drawer`}),(0,c.jsx)(o,{open:a,onClose:()=>l(!1),title:e,description:t||void 0,footer:n?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{className:`w-full`,children:`Next Step`}),(0,c.jsx)(r,{variant:`secondary`,className:`w-full`,onClick:()=>l(!1),children:`Cancel`})]}):void 0,children:(0,c.jsx)(`p`,{className:`text-[13px] text-ink-muted`,children:`The form goes here. The chart behind stays visible.`})})]})}},d=[`Playground`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'New Procedure',
    description: 'Chart a procedure on the selected area.',
    footer: true,
    open: true
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Qué se carga.'
    },
    description: {
      control: 'text',
      description: 'Una línea de contexto. Vacía, no se muestra.'
    },
    footer: {
      control: 'boolean',
      description: 'Acciones fijas al pie, una debajo de la otra.'
    },
    open: {
      control: 'boolean',
      description: 'Abierto al cargar. Apagado: se abre con el botón.'
    }
  },
  render: function Render({
    title,
    description,
    footer,
    open
  }) {
    const [abierto, setAbierto] = useState(open);
    return <div className="p-6">
        <Button onClick={() => setAbierto(true)}>Open drawer</Button>
        <Drawer open={abierto} onClose={() => setAbierto(false)} title={title} description={description || undefined} footer={footer ? <><Button className="w-full">Next Step</Button><Button variant="secondary" className="w-full" onClick={() => setAbierto(false)}>Cancel</Button></> : undefined}>
          <p className="text-[13px] text-ink-muted">The form goes here. The chart behind stays visible.</p>
        </Drawer>
      </div>;
  }
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as Playground,d as __namedExportsOrder,l as default};
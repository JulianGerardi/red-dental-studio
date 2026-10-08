import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i}from"./button-R5lrVQ2-.js";import{i as a,l as o,s,t as c}from"./kit-VhBMbBcY.js";import{n as l,t as u}from"./confirm-dialog-BVbqClRi.js";function d({title:e,text:t,confirmLabel:n,tone:r}){let[a,o]=(0,f.useState)(!0);return(0,p.jsxs)(`div`,{className:`p-6`,children:[(0,p.jsx)(i,{onClick:()=>o(!0),children:`Open confirmation`}),a&&(0,p.jsx)(u,{title:e,confirmLabel:n,tone:r,onCancel:()=>o(!1),onConfirm:()=>o(!1),children:(0,p.jsx)(`p`,{children:t})})]})}var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{f=t(),o(),l(),r(),p=n(),m={title:`Elements/ConfirmDialog`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:420},description:{component:`La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra o descarta sin vuelta. **Probalo** en *Playground*.`}}},args:{title:`Discard and close?`,text:`This returns the whole chart to its default. It cannot be undone.`,confirmLabel:`Discard and close`,tone:`danger`},argTypes:{title:{control:`text`,description:`La pregunta.`},text:{control:`text`,description:`Qué pasa si se confirma.`},confirmLabel:{control:`text`,description:`Lo que hace el botón, con el verbo de la acción.`},tone:{control:`inline-radio`,options:[`primary`,`danger`],description:`danger: borra o descarta algo que no se recupera.`}}},h={render:e=>(0,p.jsx)(d,{...e})},g={args:{title:`Back to permanent dentition?`,text:`What was marked on the primary teeth is cleared.`,confirmLabel:`Switch to permanent`,tone:`primary`},render:e=>(0,p.jsx)(d,{...e})},_={parameters:{controls:{disable:!0}},render:()=>(0,p.jsx)(a,{children:(0,p.jsx)(c,{titulo:`Parts`,children:(0,p.jsxs)(s,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Question`}),(0,p.jsx)(`td`,{children:`El título es la pregunta: Discard and close?`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,p.jsx)(`td`,{children:`Qué pasa si se confirma.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Buttons`}),(0,p.jsx)(`td`,{children:`Cancel y la acción con su verbo; danger en rojo.`})]})]})})})},v={parameters:{controls:{disable:!0}},render:()=>(0,p.jsxs)(a,{children:[(0,p.jsx)(c,{titulo:`Specs`,children:(0,p.jsxs)(s,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,p.jsx)(`td`,{children:`420px, centrada.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,p.jsx)(`td`,{children:`16px Bold`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,p.jsx)(`td`,{children:`13px`})]})]})}),(0,p.jsx)(c,{titulo:`Where`,nota:`Todo lo demás es un drawer.`,children:(0,p.jsxs)(s,{encabezado:[`Question`,`Tone`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Discard and close? (odontograma)`}),(0,p.jsx)(`td`,{children:`danger`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Back to permanent dentition?`}),(0,p.jsx)(`td`,{children:`primary`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Clear the tooth selection`}),(0,p.jsx)(`td`,{children:`danger`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Discard, Expire, Cancel, Present, Accept del caso`}),(0,p.jsx)(`td`,{children:`danger o primary según la acción`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Confirm procedure`}),(0,p.jsx)(`td`,{children:`primary`})]})]})})]})},y=[`Playground`,`Primary`,`Parts`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Back to permanent dentition?',
    text: 'What was marked on the primary teeth is cleared.',
    confirmLabel: 'Switch to permanent',
    tone: 'primary'
  },
  render: args => <Demo {...args} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Question</td><td>El título es la pregunta: Discard and close?</td></tr>
          <tr><td className="font-semibold">Text</td><td>Qué pasa si se confirma.</td></tr>
          <tr><td className="font-semibold">Buttons</td><td>Cancel y la acción con su verbo; danger en rojo.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, centrada.</td></tr>
          <tr><td className="font-semibold">Title</td><td>16px Bold</td></tr>
          <tr><td className="font-semibold">Text</td><td>13px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where" nota="Todo lo demás es un drawer.">
        <Tabla encabezado={["Question", "Tone"]} minimo={560}>
          <tr><td className="font-semibold">Discard and close? (odontograma)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Back to permanent dentition?</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clear the tooth selection</td><td>danger</td></tr>
          <tr><td className="font-semibold">Discard, Expire, Cancel, Present, Accept del caso</td><td>danger o primary según la acción</td></tr>
          <tr><td className="font-semibold">Confirm procedure</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Parts,h as Playground,g as Primary,v as Specs,y as __namedExportsOrder,m as default};
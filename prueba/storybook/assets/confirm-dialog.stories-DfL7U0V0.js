import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./button-DhtV2iTj.js";import{n as a,t as o}from"./confirm-dialog-ClIi13bP.js";import{c as s,d as c,i as l,t as u}from"./kit-CWUgB5-0.js";function d({title:e,text:t,confirmLabel:n,tone:r,warningIcon:a,otherAction:s,loading:c}){let[l,u]=(0,f.useState)(!0);return(0,p.jsxs)(`div`,{className:`p-6`,children:[(0,p.jsx)(i,{onClick:()=>u(!0),children:`Open confirmation`}),l&&(0,p.jsx)(o,{title:e,confirmLabel:n,tone:r,loading:c,icon:a?`warning`:void 0,otherAction:s?{label:`Sign now`,onClick:()=>u(!1)}:void 0,onCancel:()=>u(!1),onConfirm:()=>u(!1),children:(0,p.jsx)(`p`,{children:t})})]})}var f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{f=t(),c(),a(),r(),p=n(),m={title:`Elements/ConfirmDialog`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:420},description:{component:`La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra o descarta sin vuelta. Con *warningIcon* y *otherAction* es una decisión de tres salidas antes de seguir (Consent required); con *loading* la acción principal muestra el spinner y los demás botones quedan deshabilitados. **Probalo** en *Playground*.`}}},args:{title:`Discard and close?`,text:`This returns the whole chart to its default. It cannot be undone.`,confirmLabel:`Discard and close`,tone:`danger`,warningIcon:!1,otherAction:!1,loading:!1},argTypes:{title:{control:`text`,description:`La pregunta.`},text:{control:`text`,description:`Qué pasa si se confirma.`},confirmLabel:{control:`text`,description:`Lo que hace el botón, con el verbo de la acción.`},tone:{control:`inline-radio`,options:[`primary`,`danger`],description:`danger: borra o descarta algo que no se recupera.`},warningIcon:{control:`boolean`,description:`Círculo ámbar con el signo de alerta: la acción pedida quedó frenada por algo que falta.`},otherAction:{control:`boolean`,description:`Una tercera salida entre Cancel y la acción principal (Sign now). El diálogo pasa de 420 a 480px.`},loading:{control:`boolean`,description:`La acción principal está en curso: spinner en su botón y los otros deshabilitados.`}}},h={render:e=>(0,p.jsx)(d,{...e})},g={args:{title:`Back to permanent dentition?`,text:`What was marked on the primary teeth is cleared.`,confirmLabel:`Switch to permanent`,tone:`primary`},render:e=>(0,p.jsx)(d,{...e})},_={args:{title:`Consent required`,text:`This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.`,confirmLabel:`Send consent and sign later`,tone:`primary`,warningIcon:!0,otherAction:!0},render:e=>(0,p.jsx)(d,{...e})},v={args:{title:`Consent required`,text:`This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.`,confirmLabel:`Send consent and sign later`,tone:`primary`,warningIcon:!0,otherAction:!0,loading:!0},render:e=>(0,p.jsx)(d,{...e})},y={parameters:{controls:{disable:!0}},render:()=>(0,p.jsx)(l,{children:(0,p.jsx)(u,{titulo:`Parts`,children:(0,p.jsxs)(s,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Question`}),(0,p.jsx)(`td`,{children:`El título es la pregunta: Discard and close?`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,p.jsx)(`td`,{children:`Qué pasa si se confirma.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Buttons`}),(0,p.jsx)(`td`,{children:`Cancel y la acción con su verbo; danger en rojo.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Warning icon`}),(0,p.jsx)(`td`,{children:`Opcional: círculo ámbar de 36px a la izquierda del título.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Other action`}),(0,p.jsx)(`td`,{children:`Opcional: una tercera salida secondary entre Cancel y la principal.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Loading`}),(0,p.jsx)(`td`,{children:`Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.`})]})]})})})},b={parameters:{controls:{disable:!0}},render:()=>(0,p.jsxs)(l,{children:[(0,p.jsx)(u,{titulo:`Specs`,children:(0,p.jsxs)(s,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,p.jsx)(`td`,{children:`420px, centrada; 480px con una tercera salida.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,p.jsx)(`td`,{children:`16px Bold`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,p.jsx)(`td`,{children:`13px`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Focus`}),(0,p.jsx)(`td`,{children:`Entra en Cancel (lo seguro). Al cerrar vuelve al botón que la abrió (Save, Delete…), no al principio de la página.`})]})]})}),(0,p.jsx)(u,{titulo:`Where`,nota:`Todo lo demás es un drawer.`,children:(0,p.jsxs)(s,{encabezado:[`Question`,`Tone`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Discard and close? (odontograma)`}),(0,p.jsx)(`td`,{children:`danger`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Back to permanent dentition?`}),(0,p.jsx)(`td`,{children:`primary`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Clear the tooth selection`}),(0,p.jsx)(`td`,{children:`danger`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Discard, Expire, Cancel, Present, Accept del caso`}),(0,p.jsx)(`td`,{children:`danger o primary según la acción`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Confirm procedure`}),(0,p.jsx)(`td`,{children:`primary`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Consent required (Complete, Start)`}),(0,p.jsx)(`td`,{children:`primary con ícono de alerta y tercera salida`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)`}),(0,p.jsx)(`td`,{children:`primary`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Clinical Note (al terminar el encuentro; Cancel es "Remind me later")`}),(0,p.jsx)(`td`,{children:`primary`})]})]})})]})},x=[`Playground`,`Primary`,`ThreeActions`,`Loading`,`Parts`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
  args: {
    title: 'Consent required',
    text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.',
    confirmLabel: 'Send consent and sign later',
    tone: 'primary',
    warningIcon: true,
    otherAction: true
  },
  render: args => <Demo {...args} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Consent required',
    text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.',
    confirmLabel: 'Send consent and sign later',
    tone: 'primary',
    warningIcon: true,
    otherAction: true,
    loading: true
  },
  render: args => <Demo {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Warning icon</td><td>Opcional: círculo ámbar de 36px a la izquierda del título.</td></tr>
          <tr><td className="font-semibold">Other action</td><td>Opcional: una tercera salida secondary entre Cancel y la principal.</td></tr>
          <tr><td className="font-semibold">Loading</td><td>Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, centrada; 480px con una tercera salida.</td></tr>
          <tr><td className="font-semibold">Title</td><td>16px Bold</td></tr>
          <tr><td className="font-semibold">Text</td><td>13px</td></tr>
          <tr><td className="font-semibold">Focus</td><td>Entra en Cancel (lo seguro). Al cerrar vuelve al botón que la abrió (Save, Delete…), no al principio de la página.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where" nota="Todo lo demás es un drawer.">
        <Tabla encabezado={["Question", "Tone"]} minimo={560}>
          <tr><td className="font-semibold">Discard and close? (odontograma)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Back to permanent dentition?</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clear the tooth selection</td><td>danger</td></tr>
          <tr><td className="font-semibold">Discard, Expire, Cancel, Present, Accept del caso</td><td>danger o primary según la acción</td></tr>
          <tr><td className="font-semibold">Confirm procedure</td><td>primary</td></tr>
          <tr><td className="font-semibold">Consent required (Complete, Start)</td><td>primary con ícono de alerta y tercera salida</td></tr>
          <tr><td className="font-semibold">Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clinical Note (al terminar el encuentro; Cancel es "Remind me later")</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as Loading,y as Parts,h as Playground,g as Primary,b as Specs,_ as ThreeActions,x as __namedExportsOrder,m as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{p as r,r as i}from"./data-CDDmu8Sc.js";import{c as a,d as o,i as s,t as c}from"./kit-CWUgB5-0.js";import{n as l,t as u}from"./ExtraOralDiagram-C_DGz_ts.js";var d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{d=t(),l(),r(),o(),f=n(),p={title:`Components/Clinical/Dental/ExtraOralDiagram`,component:u,parameters:{layout:`padded`,docs:{description:{component:['El gráfico de Extraoral: cuatro vistas de cabeza -perfil derecho, frente, nuca, perfil izquierdo, el orden de una foto clínica- con regiones clickeables. Dibujado como SVG propio, no una foto: mismo criterio que el `Odontogram` ("no una foto", clinical-mode.md).',``,`**Siete regiones, confirmadas en grabaciones de pantalla de red.dev** (Julián, 2026-10-24): Scalp, Right/Left Forehead, Right/Left Eye, Right/Left Posterior Head. Una región puede dibujarse en más de una vista -Scalp en el frente, por ejemplo- y las dos marcan juntas. **Los límites son una aproximación**: no hay fuente vectorial, se estimaron sobre capturas y video.`,``,`**Dos clicks, no uno**: una región sin nada guardado es sólo un hover; clickearla la suma a "pending" (ámbar, lo que se está por cargar); si ya tiene una condition activa guardada queda en verde. Multi-selección: cada click alterna esa región sola, las demás siguen como estaban.`,``,`**Probalo:** clickeá una región en cualquier vista.`].join(`
`)}}},args:{pending:[],active:[],onToggle:()=>{}},argTypes:{pending:{table:{disable:!0}},active:{table:{disable:!0}},onToggle:{table:{disable:!0}}}},m={render:function(e){let[t,n]=(0,d.useState)(e.pending);return(0,f.jsx)(u,{...e,pending:t,onToggle:e=>n(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})}},h={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(s,{children:(0,f.jsx)(c,{titulo:`Regions`,nota:`Clickeable en cualquier vista donde se dibuje; todas sus formas marcan juntas.`,children:(0,f.jsxs)(a,{encabezado:[`Region`,`Views`],minimo:420,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Scalp`}),(0,f.jsx)(`td`,{children:`Front (pendiente en los dos perfiles: se pisaba con Forehead/Posterior Head)`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Right Forehead`}),(0,f.jsx)(`td`,{children:`Front, right profile`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Left Forehead`}),(0,f.jsx)(`td`,{children:`Front, left profile`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Right Eye`}),(0,f.jsx)(`td`,{children:`Front`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Left Eye`}),(0,f.jsx)(`td`,{children:`Front`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Right Posterior Head`}),(0,f.jsx)(`td`,{children:`Right profile, back`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Left Posterior Head`}),(0,f.jsx)(`td`,{children:`Left profile, back`})]})]})})})},g={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(s,{children:(0,f.jsxs)(`div`,{className:`grid gap-6`,children:[(0,f.jsx)(c,{titulo:`Default`,nota:`Nada elegido ni guardado.`,children:(0,f.jsx)(u,{pending:[],active:[],onToggle:()=>{}})}),(0,f.jsx)(c,{titulo:`Pending`,nota:`Elegidas ahora, antes de guardar (ámbar) — Add Condition abierto.`,children:(0,f.jsx)(u,{pending:[`Scalp`,`Right Forehead`],active:[],onToggle:()=>{}})}),(0,f.jsx)(c,{titulo:`Active`,nota:`Con una condition ya guardada (verde).`,children:(0,f.jsx)(u,{pending:[],active:[`Right Posterior Head`,`Left Eye`],onToggle:()=>{}})})]})})},_={parameters:{controls:{disable:!0}},render:()=>(0,f.jsxs)(s,{children:[(0,f.jsx)(c,{titulo:`Colors`,nota:`Pending: warn-fg al 35% (45% en hover). Active: dash-ok-fg al 30% (40% en hover) — el mismo verde de un finding Active. Trazo de las regiones: line-strong.`,children:(0,f.jsxs)(a,{encabezado:[`Token`,`Where`],minimo:420,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`warn-fg / 35%`}),(0,f.jsx)(`td`,{children:`Región pending`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`dash-ok-fg / 30%`}),(0,f.jsx)(`td`,{children:`Región active`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`surface-muted`}),(0,f.jsx)(`td`,{children:`Cabeza, hombros, orejas`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`line`}),(0,f.jsx)(`td`,{children:`Trazo de la cabeza`})]})]})}),(0,f.jsx)(c,{titulo:`Rules`,nota:`Siete regiones (${i.join(`, `)}). Cada forma es un botón real (role="button", tabIndex, Enter/Espacio): se puede marcar sin mouse.`,children:(0,f.jsx)(`div`,{})})]})},v=[`Playground`,`Parts`,`States`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [pending, setPending] = useState<ExtraOralRegion[]>(args.pending);
    return <ExtraOralDiagram {...args} pending={pending} onToggle={r => setPending(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])} />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Regions" nota="Clickeable en cualquier vista donde se dibuje; todas sus formas marcan juntas.">
        <Tabla encabezado={['Region', 'Views']} minimo={420}>
          <tr><td className="font-semibold">Scalp</td><td>Front (pendiente en los dos perfiles: se pisaba con Forehead/Posterior Head)</td></tr>
          <tr><td className="font-semibold">Right Forehead</td><td>Front, right profile</td></tr>
          <tr><td className="font-semibold">Left Forehead</td><td>Front, left profile</td></tr>
          <tr><td className="font-semibold">Right Eye</td><td>Front</td></tr>
          <tr><td className="font-semibold">Left Eye</td><td>Front</td></tr>
          <tr><td className="font-semibold">Right Posterior Head</td><td>Right profile, back</td></tr>
          <tr><td className="font-semibold">Left Posterior Head</td><td>Left profile, back</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="grid gap-6">
        <Bloque titulo="Default" nota="Nada elegido ni guardado.">
          <ExtraOralDiagram pending={[]} active={[]} onToggle={() => {}} />
        </Bloque>
        <Bloque titulo="Pending" nota="Elegidas ahora, antes de guardar (ámbar) — Add Condition abierto.">
          <ExtraOralDiagram pending={['Scalp', 'Right Forehead']} active={[]} onToggle={() => {}} />
        </Bloque>
        <Bloque titulo="Active" nota="Con una condition ya guardada (verde).">
          <ExtraOralDiagram pending={[]} active={['Right Posterior Head', 'Left Eye'] as ExtraOralRegion[]} onToggle={() => {}} />
        </Bloque>
      </div>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Colors" nota="Pending: warn-fg al 35% (45% en hover). Active: dash-ok-fg al 30% (40% en hover) — el mismo verde de un finding Active. Trazo de las regiones: line-strong.">
        <Tabla encabezado={['Token', 'Where']} minimo={420}>
          <tr><td className="font-semibold">warn-fg / 35%</td><td>Región pending</td></tr>
          <tr><td className="font-semibold">dash-ok-fg / 30%</td><td>Región active</td></tr>
          <tr><td className="font-semibold">surface-muted</td><td>Cabeza, hombros, orejas</td></tr>
          <tr><td className="font-semibold">line</td><td>Trazo de la cabeza</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules" nota={\`Siete regiones (\${EXTRAORAL_REGIONS.join(', ')}). Cada forma es un botón real (role="button", tabIndex, Enter/Espacio): se puede marcar sin mouse.\`}>
        <div />
      </Bloque>
    </Lienzo>
}`,..._.parameters?.docs?.source}}}})))()}y();export{h as Parts,m as Playground,_ as Specs,g as States,v as __namedExportsOrder,p as default};
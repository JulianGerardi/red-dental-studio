import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./arrow-right-BmZVgUe0.js";import{n as i,t as a}from"./plus-Cbf0BrW0.js";import{n as o,t as s}from"./send-8zxCuNWS.js";import{i as c,n as l,r as u,t as d}from"./button-R5lrVQ2-.js";import{Jl as f,Mu as p,Nu as m,Yl as h}from"./iframe-CzkjOWIU.js";import{c as g,d as _,g as v,h as y,i as b,n as x,o as S,p as C,t as w,u as T}from"./kit-4bQS7S9u.js";function E({icon:e,iconPosition:t,label:n,state:r,...i}){let o=k[e]??(i.iconOnly?a:null),s=o?(0,O.jsx)(o,{}):null;return(0,O.jsx)(`div`,{className:P[r],children:(0,O.jsx)(u,{...i,"aria-label":i.iconOnly?n:void 0,children:i.iconOnly?s:(0,O.jsxs)(O.Fragment,{children:[t===`start`&&s,n,t===`end`&&s]})})})}function D({s:e}){let{ref:t,m:n}=C();return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{ref:t,children:(0,O.jsxs)(u,{size:e,children:[(0,O.jsx)(a,{}),`Save`]})})}),(0,O.jsx)(`td`,{className:`font-semibold`,children:e}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:n?.alto}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:n?.padding}),(0,O.jsxs)(`td`,{className:`tabular-nums`,children:[n?.texto,` · `,n?.peso]}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:n?.radio}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:n?.gap}),(0,O.jsx)(`td`,{className:`tabular-nums`,children:n?.icono})]})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{n(),m(),i(),o(),h(),c(),_(),y(),O=t(),k={none:null,Plus:a,Download:p,Send:s,Trash2:f,ArrowRight:r},A=Object.keys(l),j=Object.keys(d),M={primary:`The main action of the screen or dialog. Only one per view.`,secondary:`Next to the primary one: Cancel, Back, Export.`,ghost:`Low emphasis, no box: toolbars and row actions.`,link:`Reads as a link: navigate or see more.`,destructive:`Deletes or discards. Usually inside a confirmation dialog.`},N={sm:`28px`,md:`32px`,lg:`36px`},P={default:``,hover:`pseudo-hover-all`,pressed:`pseudo-active-all`,focus:`pseudo-focus-visible-all pseudo-focus-all`},F={title:`Elements/Buttons`,component:u,parameters:{layout:`padded`,docs:{description:{component:["El botón estándar de la app (`@/components/ui/button`). Cada variante es el look más usado en el código para ese tipo de botón y los tamaños son las tres alturas más usadas.",``,`**Cuál usar:** *Primary* para la acción principal (una por vista) · *Secondary* para la alternativa (Cancel, Back) · *Ghost* para acciones de poco peso · *Link* para navegar · *Destructive* para borrar o descartar.`,``,`**Probalo:** en *Playground* cambiá variante, tamaño, texto, ícono y estado desde el panel *Controls*.`].join(`
`)}}},args:{variant:`primary`,size:`lg`,label:`Save`,icon:`none`,iconPosition:`start`,iconOnly:!1,disabled:!1,loading:!1,state:`default`},argTypes:{variant:{control:`inline-radio`,options:A,description:`Tipo de botón.`},size:{control:`inline-radio`,options:j,description:`sm 28px · md 32px · lg 36px.`},label:{control:`text`,description:`Texto del botón.`},icon:{control:`select`,options:Object.keys(k),description:`Ícono de lucide-react.`},iconPosition:{control:`inline-radio`,options:[`start`,`end`],description:`Antes o después del texto.`},iconOnly:{control:`boolean`,description:`Botón cuadrado con sólo el ícono. Necesita aria-label.`},disabled:{control:`boolean`},loading:{control:`boolean`,description:`Spinner y deshabilitado mientras dura la acción.`},state:{control:`inline-radio`,options:[`default`,`hover`,`pressed`,`focus`],description:`Fuerza un estado para verlo sin interactuar.`,table:{category:`Preview`}},children:{table:{disable:!0}},className:{table:{disable:!0}}}},I={render:e=>(0,O.jsx)(E,{...e})},L={parameters:{controls:{include:[`size`,`label`]}},render:({size:e,label:t})=>(0,O.jsx)(b,{children:(0,O.jsx)(`div`,{className:`grid grid-cols-1 gap-4 sm:grid-cols-5`,children:A.map(n=>(0,O.jsxs)(`div`,{className:`flex flex-col items-start gap-2`,children:[(0,O.jsx)(u,{variant:n,size:e,children:n===`destructive`?`Delete`:t}),(0,O.jsx)(`p`,{className:`text-[12px] font-semibold capitalize`,children:n}),(0,O.jsx)(`p`,{className:`text-[12px] leading-snug text-ink-muted`,children:M[n]})]},n))})})},R={parameters:{controls:{include:[`variant`,`label`]}},render:({variant:e,label:t})=>(0,O.jsx)(b,{children:(0,O.jsxs)(S,{children:[j.map(n=>(0,O.jsx)(x,{rotulo:`${n} · ${N[n]}`,children:(0,O.jsx)(u,{variant:e,size:n,children:t})},n)),j.map(t=>(0,O.jsx)(x,{rotulo:`icon ${t}`,children:(0,O.jsx)(u,{variant:e,size:t,iconOnly:!0,"aria-label":`Add`,children:(0,O.jsx)(a,{})})},`i-${t}`))]})})},z=[[`Default`,`default`],[`Hover`,`hover`],[`Pressed`,`pressed`],[`Focus (keyboard)`,`focus`],[`Disabled`,`disabled`],[`Loading`,`loading`]],B={parameters:{controls:{include:[`size`]}},render:({size:e})=>(0,O.jsx)(b,{children:(0,O.jsx)(g,{encabezado:[`Variant`,...z.map(([e])=>e)],minimo:820,children:A.map(t=>(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold capitalize`,children:t}),z.map(([n,r])=>(0,O.jsx)(`td`,{children:(0,O.jsx)(`div`,{className:r===`disabled`||r===`loading`?``:P[r],children:(0,O.jsx)(u,{variant:t,size:e,disabled:r===`disabled`,loading:r===`loading`,children:t===`destructive`?`Delete`:`Save`})})},n))]},t))})})},V={parameters:{controls:{include:[`variant`,`size`]}},render:({variant:e,size:t})=>(0,O.jsxs)(S,{children:[(0,O.jsx)(x,{rotulo:`Icon first`,children:(0,O.jsxs)(u,{variant:e,size:t,children:[(0,O.jsx)(a,{}),`New patient`]})}),(0,O.jsx)(x,{rotulo:`Icon last`,children:(0,O.jsxs)(u,{variant:e,size:t,children:[`Next`,(0,O.jsx)(r,{})]})}),(0,O.jsx)(x,{rotulo:`Icon only`,children:(0,O.jsx)(u,{variant:e,size:t,iconOnly:!0,"aria-label":`Download`,children:(0,O.jsx)(p,{})})})]})},H={parameters:{controls:{disable:!0}},render:()=>(0,O.jsxs)(b,{children:[(0,O.jsx)(w,{titulo:`Sizes`,nota:`Medidas leídas del botón ya dibujado.`,children:(0,O.jsx)(g,{encabezado:[`Sample`,`Size`,`Height`,`Padding`,`Text`,`Radius`,`Gap`,`Icon`],minimo:760,children:j.map(e=>(0,O.jsx)(D,{s:e},e))})}),(0,O.jsx)(w,{titulo:`Colors`,nota:`Los tokens de cada variante. Salen de button.tsx y su valor de src/index.css: si cambia uno, cambia acá.`,children:(0,O.jsx)(g,{encabezado:[`Variant`,`Fill`,`Text`,`Border`,`Hover fill`,`Focus ring`],minimo:900,children:A.map(e=>{let t=v(l[e]);return(0,O.jsxs)(`tr`,{children:[(0,O.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,O.jsx)(`td`,{children:(0,O.jsx)(T,{nombre:t.fondo})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(T,{nombre:t.texto})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(T,{nombre:t.borde})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(T,{nombre:t.fondoHover})}),(0,O.jsx)(`td`,{children:(0,O.jsx)(T,{nombre:t.foco})})]},e)})})}),(0,O.jsx)(w,{titulo:`Shared rules`,children:(0,O.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,O.jsx)(`li`,{children:`Radius 6px and Medium weight on every size.`}),(0,O.jsx)(`li`,{children:`Focus with the keyboard: 2px ring, 2px away from the button, in the variant’s color.`}),(0,O.jsx)(`li`,{children:`Disabled and loading: 40% opacity and no pointer events.`})]})})]})},U=[`Playground`,`Variants`,`Sizes`,`States`,`WithIcon`,`Specs`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['size', 'label']
    }
  },
  render: ({
    size,
    label
  }) => <Lienzo>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {VARIANTES.map(v => <div key={v} className="flex flex-col items-start gap-2">
            <Button variant={v} size={size}>{v === 'destructive' ? 'Delete' : label}</Button>
            <p className="text-[12px] font-semibold capitalize">{v}</p>
            <p className="text-[12px] leading-snug text-ink-muted">{USO[v]}</p>
          </div>)}
      </div>
    </Lienzo>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'label']
    }
  },
  render: ({
    variant,
    label
  }) => <Lienzo>
      <Muestras>
        {TAMANOS.map(s => <ConRotulo key={s} rotulo={\`\${s} · \${ALTO[s]}\`}><Button variant={variant} size={s}>{label}</Button></ConRotulo>)}
        {TAMANOS.map(s => <ConRotulo key={\`i-\${s}\`} rotulo={\`icon \${s}\`}><Button variant={variant} size={s} iconOnly aria-label="Add"><Plus /></Button></ConRotulo>)}
      </Muestras>
    </Lienzo>
}`,...R.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['size']
    }
  },
  render: ({
    size
  }) => <Lienzo>
      <Tabla encabezado={['Variant', ...COLUMNAS_ESTADO.map(([n]) => n)]} minimo={820}>
        {VARIANTES.map(v => <tr key={v}>
            <td className="font-semibold capitalize">{v}</td>
            {COLUMNAS_ESTADO.map(([n, e]) => <td key={n}>
                <div className={e === 'disabled' || e === 'loading' ? '' : PSEUDO[e]}>
                  <Button variant={v} size={size} disabled={e === 'disabled'} loading={e === 'loading'}>{v === 'destructive' ? 'Delete' : 'Save'}</Button>
                </div>
              </td>)}
          </tr>)}
      </Tabla>
    </Lienzo>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'size']
    }
  },
  render: ({
    variant,
    size
  }) => <Muestras>
      <ConRotulo rotulo="Icon first"><Button variant={variant} size={size}><Plus />New patient</Button></ConRotulo>
      <ConRotulo rotulo="Icon last"><Button variant={variant} size={size}>Next<ArrowRight /></Button></ConRotulo>
      <ConRotulo rotulo="Icon only"><Button variant={variant} size={size} iconOnly aria-label="Download"><Download /></Button></ConRotulo>
    </Muestras>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del botón ya dibujado.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text', 'Radius', 'Gap', 'Icon']} minimo={760}>
          {TAMANOS.map(s => <FilaTamano key={s} s={s} />)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Los tokens de cada variante. Salen de button.tsx y su valor de src/index.css: si cambia uno, cambia acá.">
        <Tabla encabezado={['Variant', 'Fill', 'Text', 'Border', 'Hover fill', 'Focus ring']} minimo={900}>
          {VARIANTES.map(v => {
          const t = tokensDe(BUTTON_VARIANTS[v]);
          return <tr key={v}>
                <td className="font-semibold capitalize">{v}</td>
                <td><Token nombre={t.fondo} /></td>
                <td><Token nombre={t.texto} /></td>
                <td><Token nombre={t.borde} /></td>
                <td><Token nombre={t.fondoHover} /></td>
                <td><Token nombre={t.foco} /></td>
              </tr>;
        })}
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Radius 6px and Medium weight on every size.</li>
          <li>Focus with the keyboard: 2px ring, 2px away from the button, in the variant’s color.</li>
          <li>Disabled and loading: 40% opacity and no pointer events.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...H.parameters?.docs?.source}}}})))()}W();export{I as Playground,R as Sizes,H as Specs,B as States,L as Variants,V as WithIcon,U as __namedExportsOrder,F as default};
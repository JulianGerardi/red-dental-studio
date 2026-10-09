import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./ClinicalBadge-CoITQymF.js";import{c as i,d as a,g as o,h as s,i as c,n as l,o as u,p as d,t as f,u as p}from"./kit-4bQS7S9u.js";function m({s:e}){let{ref:t,m:n}=d();return(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{children:(0,h.jsx)(`div`,{ref:t,children:(0,h.jsx)(r,{tipo:`CC`,size:e})})}),(0,h.jsx)(`td`,{className:`font-semibold`,children:e}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:n?.alto}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:n?.padding}),(0,h.jsxs)(`td`,{className:`tabular-nums`,children:[n?.texto,` · `,n?.peso]})]})}var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{n(),a(),s(),h=t(),g=[`CC`,`TR`],_=[`ok`,`no`],v=[`active`,`inactive`,`disabled`],y={CC:`Chief Complaint`,TR:`Triage`},b={title:`Components/Clinical/ClinicalBadge`,component:r,parameters:{layout:`padded`,docs:{description:{component:[`Los badges del header de Clinical Mode (Figma *Design system · 2.0*, 254:2930): **CC** (Chief Complaint) y **TR** (Triage), con tilde si está hecho y cruz si no. Cada uno en tres estados: *active* (lleno), *inactive* (suave) y *disabled* (gris, sin dato).`,``,`**Probalo:** en *Playground* cambiá tipo, resultado, estado y tamaño desde *Controls*.`].join(`
`)}}},args:{tipo:`CC`,resultado:`ok`,estado:`active`,size:`md`},argTypes:{tipo:{control:`inline-radio`,options:g,description:`CC (Chief Complaint) o TR (Triage).`},resultado:{control:`inline-radio`,options:_,description:`ok: tilde, hecho. no: cruz, falta o negativo.`},estado:{control:`inline-radio`,options:v,description:`active lleno, inactive suave, disabled sin dato.`},size:{control:`inline-radio`,options:[`sm`,`md`],description:`sm es el de Figma; md, el del header.`},className:{table:{disable:!0}}}},x={},S={parameters:{controls:{include:[`size`]}},render:({size:e})=>(0,h.jsx)(c,{children:(0,h.jsx)(i,{encabezado:[`Badge`,...v],minimo:420,children:g.flatMap(t=>_.map(n=>(0,h.jsxs)(`tr`,{children:[(0,h.jsxs)(`td`,{className:`font-semibold`,children:[y[t],n===`no`?` – Negative`:``]}),v.map(i=>(0,h.jsx)(`td`,{children:(0,h.jsx)(r,{tipo:t,resultado:n,estado:i,size:e})},i))]},`${t}-${n}`)))})})},C={parameters:{controls:{disable:!0}},render:()=>(0,h.jsxs)(c,{children:[(0,h.jsx)(f,{titulo:`Sizes`,nota:`sm es el tamaño de Figma (22 de alto); md, el del header, para que el tilde se lea.`,children:(0,h.jsx)(i,{encabezado:[`Sample`,`Size`,`Height`,`Padding`,`Text`],children:[`sm`,`md`].map(e=>(0,h.jsx)(m,{s:e},e))})}),(0,h.jsx)(f,{titulo:`Colors`,nota:`Tokens de cada combinación, de ClinicalBadge.tsx y src/index.css.`,children:(0,h.jsx)(i,{encabezado:[`Result`,`State`,`Sample`,`Fill`,`Text`],minimo:620,children:_.flatMap(e=>v.map(t=>{let n=(0,h.jsx)(r,{tipo:`TR`,resultado:e,estado:t}),i={ok:{active:`bg-status-ok text-white`,inactive:`bg-status-ok-muted text-status-ok-strong`,disabled:`bg-surface-muted text-line-strong`},no:{active:`bg-required text-white`,inactive:`bg-status-bad-muted text-status-bad-strong`,disabled:`bg-surface-muted text-line-strong`}}[e][t],a=o(i);return(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:e}),(0,h.jsx)(`td`,{children:t}),(0,h.jsx)(`td`,{children:n}),(0,h.jsx)(`td`,{children:(0,h.jsx)(p,{nombre:a.fondo})}),(0,h.jsx)(`td`,{children:(0,h.jsx)(p,{nombre:a.texto})})]},`${e}-${t}`)}))})}),(0,h.jsx)(u,{children:g.map(e=>(0,h.jsx)(l,{rotulo:y[e],children:(0,h.jsx)(r,{tipo:e,size:`md`})},e))})]})},w=[`Playground`,`States`,`Specs`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['size']
    }
  },
  render: ({
    size
  }) => <Lienzo>
      <Tabla encabezado={['Badge', ...ESTADOS]} minimo={420}>
        {TIPOS.flatMap(t => RESULTADOS.map(r => <tr key={\`\${t}-\${r}\`}>
            <td className="font-semibold">{NOMBRE[t]}{r === 'no' ? ' – Negative' : ''}</td>
            {ESTADOS.map(e => <td key={e}><ClinicalBadge tipo={t} resultado={r} estado={e} size={size} /></td>)}
          </tr>))}
      </Tabla>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="sm es el tamaño de Figma (22 de alto); md, el del header, para que el tilde se lea.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text']}>
          {(['sm', 'md'] as const).map(s => <FilaTamano key={s} s={s} />)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de cada combinación, de ClinicalBadge.tsx y src/index.css.">
        <Tabla encabezado={['Result', 'State', 'Sample', 'Fill', 'Text']} minimo={620}>
          {RESULTADOS.flatMap(r => ESTADOS.map(e => {
          const muestra = <ClinicalBadge tipo="TR" resultado={r} estado={e} />;
          const clases = {
            ok: {
              active: 'bg-status-ok text-white',
              inactive: 'bg-status-ok-muted text-status-ok-strong',
              disabled: 'bg-surface-muted text-line-strong'
            },
            no: {
              active: 'bg-required text-white',
              inactive: 'bg-status-bad-muted text-status-bad-strong',
              disabled: 'bg-surface-muted text-line-strong'
            }
          }[r][e];
          const k = tokensDe(clases);
          return <tr key={\`\${r}-\${e}\`}>
                <td className="font-semibold">{r}</td>
                <td>{e}</td>
                <td>{muestra}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>;
        }))}
        </Tabla>
      </Bloque>
      <Muestras>
        {TIPOS.map(t => <ConRotulo key={t} rotulo={NOMBRE[t]}><ClinicalBadge tipo={t} size="md" /></ConRotulo>)}
      </Muestras>
    </Lienzo>
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Playground,C as Specs,S as States,w as __namedExportsOrder,b as default};
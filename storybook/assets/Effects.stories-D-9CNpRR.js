import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,o as r}from"./tokens-DiKHBuJU.js";import{a as i,i as a,o}from"./audit-BWe9RHrA.js";import{i as s,n as c,r as l,t as u}from"./Page-D6JwDZ22.js";var d,f,p,m;function h(){return(h=e((()=>{n(),a(),s(),d=t(),f={title:`Foundations/Radius and shadows`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},p={name:`Radius and shadows`,render:()=>(0,d.jsxs)(c,{titulo:`Radius and shadows`,bajada:`Los tokens del sistema y lo que el código escribe a mano.`,children:[(0,d.jsx)(l,{titulo:`Radio (tokens)`,nota:`Salen de --radius en src/index.css.`,children:(0,d.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:[`sm`,`md`,`lg`,`xl`,`2xl`].map(e=>(0,d.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,d.jsx)(`div`,{className:`size-16 border border-line bg-surface-subtle rounded-${e}`}),(0,d.jsxs)(u,{children:[`rounded-`,e]})]},e))})}),(0,d.jsx)(l,{titulo:`Sombras (tokens)`,children:(0,d.jsx)(`div`,{className:`flex flex-wrap gap-6`,children:r.map(({nombre:e,valor:t})=>(0,d.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,d.jsx)(`div`,{className:`h-16 w-40 rounded-lg bg-white`,style:{boxShadow:`var(--${e})`}}),(0,d.jsx)(u,{children:e.replace(`shadow-`,`shadow-`)}),(0,d.jsx)(`span`,{className:`max-w-40 text-[11px] text-ink-muted`,children:t})]},e))})}),(0,d.jsx)(l,{titulo:`Radios escritos a mano`,nota:`rounded-[…] con valor propio. Cada uno es una decisión que no pasa por un token.`,children:(0,d.jsx)(`ul`,{className:`text-[13px]`,children:i.map(e=>(0,d.jsxs)(`li`,{className:`flex gap-4 border-t border-line-soft py-1.5 first:border-t-0`,children:[(0,d.jsx)(u,{children:e.valor}),(0,d.jsxs)(`span`,{className:`text-ink-muted`,children:[e.usos,` usos en `,e.archivos,` archivos`]})]},e.valor))})}),(0,d.jsx)(l,{titulo:`Sombras escritas a mano`,children:(0,d.jsx)(`ul`,{className:`text-[13px]`,children:o.map(e=>(0,d.jsxs)(`li`,{className:`flex flex-wrap gap-x-4 border-t border-line-soft py-1.5 first:border-t-0`,children:[(0,d.jsx)(u,{children:e.valor.length>90?`${e.valor.slice(0,90)}…`:e.valor}),(0,d.jsxs)(`span`,{className:`text-ink-muted`,children:[e.usos,` usos en `,e.archivos,` archivos`]})]},e.valor))})})]})},m=[`Efectos`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Radius and shadows',
  render: () => <Page titulo="Radius and shadows" bajada="Los tokens del sistema y lo que el código escribe a mano.">
      <Seccion titulo="Radio (tokens)" nota="Salen de --radius en src/index.css.">
        <div className="flex flex-wrap gap-4">
          {['sm', 'md', 'lg', 'xl', '2xl'].map(r => <div key={r} className="flex flex-col items-center gap-2">
              <div className={\`size-16 border border-line bg-surface-subtle rounded-\${r}\`} />
              <Codigo>rounded-{r}</Codigo>
            </div>)}
        </div>
      </Seccion>

      <Seccion titulo="Sombras (tokens)">
        <div className="flex flex-wrap gap-6">
          {sombrasDeTema.map(({
          nombre,
          valor
        }) => <div key={nombre} className="flex flex-col gap-2">
              <div className="h-16 w-40 rounded-lg bg-white" style={{
            boxShadow: \`var(--\${nombre})\`
          }} />
              <Codigo>{nombre.replace('shadow-', 'shadow-')}</Codigo>
              <span className="max-w-40 text-[11px] text-ink-muted">{valor}</span>
            </div>)}
        </div>
      </Seccion>

      <Seccion titulo="Radios escritos a mano" nota="rounded-[…] con valor propio. Cada uno es una decisión que no pasa por un token.">
        <ul className="text-[13px]">
          {radios.map(r => <li key={r.valor} className="flex gap-4 border-t border-line-soft py-1.5 first:border-t-0">
              <Codigo>{r.valor}</Codigo>
              <span className="text-ink-muted">{r.usos} usos en {r.archivos} archivos</span>
            </li>)}
        </ul>
      </Seccion>

      <Seccion titulo="Sombras escritas a mano">
        <ul className="text-[13px]">
          {sombras.map(s => <li key={s.valor} className="flex flex-wrap gap-x-4 border-t border-line-soft py-1.5 first:border-t-0">
              <Codigo>{s.valor.length > 90 ? \`\${s.valor.slice(0, 90)}…\` : s.valor}</Codigo>
              <span className="text-ink-muted">{s.usos} usos en {s.archivos} archivos</span>
            </li>)}
        </ul>
      </Seccion>
    </Page>
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Efectos,m as __namedExportsOrder,f as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,i,n as a,r as o,t as s}from"./tokens-Dk0RUS4u.js";import{i as c,n as l,r as u,t as d}from"./Page-BT4O46MH.js";function f(e){return e.endsWith(`foreground`)?`text-${e}`:`bg-${e}`}var p,m,h,g,_;function v(){return(v=e((()=>{n(),c(),p=t(),m={title:`Foundations/Colors`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},h=({color:e})=>(0,p.jsx)(`span`,{className:`inline-block size-9 shrink-0 rounded-md border border-black/10`,style:{background:e}}),g={name:`Colors`,render:()=>(0,p.jsxs)(l,{titulo:`Colors`,bajada:`Salen de src/index.css. Si cambiás un valor ahí, esta página y la app se actualizan juntas.`,children:[(0,p.jsx)(u,{titulo:`Sistema base`,nota:`Convención shadcn/ui: cada token tiene su versión clara y oscura. En Tailwind se usan como bg-primary, text-primary-foreground, border-border, etc.`,children:(0,p.jsx)(`div`,{className:`flex flex-col gap-8`,children:o().map(({grupo:e,filas:t})=>(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{className:`mb-2 text-[13px] font-semibold text-ink-medium`,children:e}),(0,p.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line`,children:(0,p.jsxs)(`table`,{className:`w-full text-left text-[12.5px]`,children:[(0,p.jsx)(`thead`,{className:`bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase`,children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Claro`}),(0,p.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Oscuro`}),(0,p.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Token`}),(0,p.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Clase`}),(0,p.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Valor`})]})}),(0,p.jsx)(`tbody`,{children:t.map(e=>(0,p.jsxs)(`tr`,{className:`border-t border-line-soft`,children:[(0,p.jsx)(`td`,{className:`px-3 py-2`,children:(0,p.jsx)(h,{color:s(e.claro)})}),(0,p.jsx)(`td`,{className:`px-3 py-2`,children:e.oscuro?(0,p.jsx)(h,{color:s(e.oscuro)}):(0,p.jsx)(`span`,{className:`text-ink-faint`,children:`-`})}),(0,p.jsx)(`td`,{className:`px-3 py-2`,children:(0,p.jsxs)(d,{children:[`--`,e.nombre]})}),(0,p.jsx)(`td`,{className:`px-3 py-2`,children:(0,p.jsx)(d,{children:f(e.nombre)})}),(0,p.jsxs)(`td`,{className:`px-3 py-2 font-mono text-[12px] text-ink-medium`,children:[i(e.claro)??e.claro,e.oscuro&&(0,p.jsxs)(`span`,{className:`text-ink-faint`,children:[` · `,i(e.oscuro)??e.oscuro]})]})]},e.nombre))})]})})]},e))})}),(0,p.jsx)(u,{titulo:`Tokens de la app`,nota:`Los que se agregaron al rediseño: el azul del Figma (dash-*), estados y neutros semánticos. Viven en el bloque @theme de src/index.css.`,children:(0,p.jsx)(`div`,{className:`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3`,children:a.map(({nombre:e,valor:t})=>(0,p.jsxs)(`div`,{className:`flex items-center gap-3 rounded-lg border border-line p-3`,children:[(0,p.jsx)(h,{color:`var(--${e})`}),(0,p.jsxs)(`div`,{className:`min-w-0`,children:[(0,p.jsxs)(`p`,{className:`truncate font-mono text-[12px] font-medium`,children:[`--`,e]}),(0,p.jsxs)(`p`,{className:`truncate text-[11.5px] text-ink-muted`,children:[`bg-`,e.replace(`color-`,``),` · `,t]})]})]},e))})}),(0,p.jsx)(u,{titulo:`Radio base`,children:(0,p.jsxs)(`p`,{className:`text-[13px] text-ink-medium`,children:[(0,p.jsxs)(d,{children:[`--radius: `,r.radius]}),` - de ahí salen `,(0,p.jsx)(d,{children:`rounded-sm`}),`, `,(0,p.jsx)(d,{children:`rounded-md`}),` y `,(0,p.jsx)(d,{children:`rounded-lg`}),`.`]})})]})},_=[`Tokens`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Colors',
  render: () => <Page titulo="Colors" bajada="Salen de src/index.css. Si cambiás un valor ahí, esta página y la app se actualizan juntas.">
      <Seccion titulo="Sistema base" nota="Convención shadcn/ui: cada token tiene su versión clara y oscura. En Tailwind se usan como bg-primary, text-primary-foreground, border-border, etc.">
        <div className="flex flex-col gap-8">
          {gruposDeTokens().map(({
          grupo,
          filas
        }) => <div key={grupo}>
              <h3 className="mb-2 text-[13px] font-semibold text-ink-medium">{grupo}</h3>
              <div className="overflow-hidden rounded-lg border border-line">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
                    <tr>
                      <th className="px-3 py-2 font-medium">Claro</th>
                      <th className="px-3 py-2 font-medium">Oscuro</th>
                      <th className="px-3 py-2 font-medium">Token</th>
                      <th className="px-3 py-2 font-medium">Clase</th>
                      <th className="px-3 py-2 font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filas.map(f => <tr key={f.nombre} className="border-t border-line-soft">
                        <td className="px-3 py-2"><Muestra color={aCss(f.claro)} /></td>
                        <td className="px-3 py-2">{f.oscuro ? <Muestra color={aCss(f.oscuro)} /> : <span className="text-ink-faint">-</span>}</td>
                        <td className="px-3 py-2"><Codigo>--{f.nombre}</Codigo></td>
                        <td className="px-3 py-2"><Codigo>{utilidad(f.nombre)}</Codigo></td>
                        <td className="px-3 py-2 font-mono text-[12px] text-ink-medium">
                          {hslAHex(f.claro) ?? f.claro}
                          {f.oscuro && <span className="text-ink-faint"> · {hslAHex(f.oscuro) ?? f.oscuro}</span>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>)}
        </div>
      </Seccion>

      <Seccion titulo="Tokens de la app" nota="Los que se agregaron al rediseño: el azul del Figma (dash-*), estados y neutros semánticos. Viven en el bloque @theme de src/index.css.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coloresDeTema.map(({
          nombre,
          valor
        }) => <div key={nombre} className="flex items-center gap-3 rounded-lg border border-line p-3">
              <Muestra color={\`var(--\${nombre})\`} />
              <div className="min-w-0">
                <p className="truncate font-mono text-[12px] font-medium">--{nombre}</p>
                <p className="truncate text-[11.5px] text-ink-muted">bg-{nombre.replace('color-', '')} · {valor}</p>
              </div>
            </div>)}
        </div>
      </Seccion>

      <Seccion titulo="Radio base">
        <p className="text-[13px] text-ink-medium">
          <Codigo>--radius: {tokensClaros.radius}</Codigo> - de ahí salen <Codigo>rounded-sm</Codigo>, <Codigo>rounded-md</Codigo> y <Codigo>rounded-lg</Codigo>.
        </p>
      </Seccion>
    </Page>
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as Tokens,_ as __namedExportsOrder,m as default};
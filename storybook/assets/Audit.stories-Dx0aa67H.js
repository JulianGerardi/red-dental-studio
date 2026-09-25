import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,r,t as i}from"./audit-BlPvgqM2.js";import{i as a,n as o,r as s,t as c}from"./Page-D7sAlKBt.js";var l,u,d,f;function p(){return(p=e((()=>{n(),a(),l=t(),u={title:`Foundations/Color audit`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},d={name:`Color audit`,render:()=>{let e=r.reduce((e,t)=>e+t.usos,0),t=r.filter(e=>e.token),n=t.reduce((e,t)=>e+t.usos,0);return(0,l.jsxs)(o,{titulo:`Color audit`,bajada:`Colores escritos a mano en el código (#rrggbb), leídos de ${i} archivos de src/. Un color que no pasa por un token no cambia cuando cambia el token.`,children:[(0,l.jsx)(s,{titulo:`Resumen`,children:(0,l.jsxs)(`div`,{className:`flex flex-wrap gap-8 text-[13px]`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-[26px] font-bold`,children:e}),(0,l.jsx)(`p`,{className:`text-ink-muted`,children:`usos de hex escritos a mano`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-[26px] font-bold`,children:r.length}),(0,l.jsx)(`p`,{className:`text-ink-muted`,children:`valores distintos`})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-[26px] font-bold`,children:n}),(0,l.jsxs)(`p`,{className:`text-ink-muted`,children:[`ya tienen un token (`,t.length,` valores)`]})]})]})}),(0,l.jsx)(s,{titulo:`Todos los valores`,nota:`Ordenados por cantidad de usos. La columna Token dice si ya existe uno con ese mismo valor.`,children:(0,l.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line`,children:(0,l.jsxs)(`table`,{className:`w-full text-left text-[12.5px]`,children:[(0,l.jsx)(`thead`,{className:`bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase`,children:(0,l.jsxs)(`tr`,{children:[(0,l.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Color`}),(0,l.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Valor`}),(0,l.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Usos`}),(0,l.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Archivos`}),(0,l.jsx)(`th`,{className:`px-3 py-2 font-medium`,children:`Token`})]})}),(0,l.jsx)(`tbody`,{children:r.map(e=>(0,l.jsxs)(`tr`,{className:`border-t border-line-soft`,children:[(0,l.jsx)(`td`,{className:`px-3 py-1.5`,children:(0,l.jsx)(`span`,{className:`inline-block size-5 rounded border border-black/10 align-middle`,style:{background:e.valor}})}),(0,l.jsx)(`td`,{className:`px-3 py-1.5 font-mono`,children:e.valor}),(0,l.jsx)(`td`,{className:`px-3 py-1.5`,children:e.usos}),(0,l.jsx)(`td`,{className:`px-3 py-1.5`,children:e.archivos}),(0,l.jsx)(`td`,{className:`px-3 py-1.5`,children:e.token?(0,l.jsx)(c,{children:e.token}):(0,l.jsx)(`span`,{className:`text-ink-faint`,children:`-`})})]},e.valor))})]})})})]})}},f=[`Auditoria`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Color audit',
  render: () => {
    const total = hexEnCodigo.reduce((n, h) => n + h.usos, 0);
    const conToken = hexEnCodigo.filter(h => h.token);
    const usosConToken = conToken.reduce((n, h) => n + h.usos, 0);
    return <Page titulo="Color audit" bajada={\`Colores escritos a mano en el código (#rrggbb), leídos de \${archivosAnalizados} archivos de src/. Un color que no pasa por un token no cambia cuando cambia el token.\`}>
        <Seccion titulo="Resumen">
          <div className="flex flex-wrap gap-8 text-[13px]">
            <div><p className="text-[26px] font-bold">{total}</p><p className="text-ink-muted">usos de hex escritos a mano</p></div>
            <div><p className="text-[26px] font-bold">{hexEnCodigo.length}</p><p className="text-ink-muted">valores distintos</p></div>
            <div><p className="text-[26px] font-bold">{usosConToken}</p><p className="text-ink-muted">ya tienen un token ({conToken.length} valores)</p></div>
          </div>
        </Seccion>

        <Seccion titulo="Todos los valores" nota="Ordenados por cantidad de usos. La columna Token dice si ya existe uno con ese mismo valor.">
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
                <tr><th className="px-3 py-2 font-medium">Color</th><th className="px-3 py-2 font-medium">Valor</th><th className="px-3 py-2 font-medium">Usos</th><th className="px-3 py-2 font-medium">Archivos</th><th className="px-3 py-2 font-medium">Token</th></tr>
              </thead>
              <tbody>
                {hexEnCodigo.map(h => <tr key={h.valor} className="border-t border-line-soft">
                    <td className="px-3 py-1.5"><span className="inline-block size-5 rounded border border-black/10 align-middle" style={{
                    background: h.valor
                  }} /></td>
                    <td className="px-3 py-1.5 font-mono">{h.valor}</td>
                    <td className="px-3 py-1.5">{h.usos}</td>
                    <td className="px-3 py-1.5">{h.archivos}</td>
                    <td className="px-3 py-1.5">{h.token ? <Codigo>{h.token}</Codigo> : <span className="text-ink-faint">-</span>}</td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </Seccion>
      </Page>;
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as Auditoria,f as __namedExportsOrder,u as default};
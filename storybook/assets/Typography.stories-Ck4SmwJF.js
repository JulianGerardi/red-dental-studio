import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,l as r}from"./tokens-Dk0RUS4u.js";import{i,s as a}from"./audit-BlPvgqM2.js";import{i as o,n as s,r as c,t as l}from"./Page-D7sAlKBt.js";var u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),o(),u=t(),d={title:`Foundations/Typography`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},f=`Sarah Stone, treatment plan accepted`,p={name:`Typography`,render:()=>(0,u.jsxs)(s,{titulo:`Typography`,bajada:`Una sola familia, Inter. La escala sale de lo que el código usa hoy: cada tamaño con la cantidad de veces que aparece.`,children:[(0,u.jsxs)(c,{titulo:`Familia`,children:[(0,u.jsx)(`p`,{className:`text-[32px] leading-tight font-semibold`,children:`Inter`}),(0,u.jsx)(`p`,{className:`mt-1 text-[13px] text-ink-muted`,children:(0,u.jsxs)(l,{children:[`--font-sans: `,r[`font-sans`]]})}),(0,u.jsx)(`div`,{className:`mt-4 flex flex-wrap gap-6 text-[20px]`,children:[400,500,600,700].map(e=>(0,u.jsxs)(`span`,{style:{fontWeight:e},children:[`Aa `,e]},e))})]}),(0,u.jsx)(c,{titulo:`Tamaños en uso`,nota:`Todos son clases arbitrarias (text-[13px]). Los que casi no se usan son candidatos a unificarse.`,children:(0,u.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line`,children:a.map(e=>{let t=parseFloat(e.valor.replace(`text-[`,``));return(0,u.jsxs)(`div`,{className:`flex items-baseline gap-4 border-t border-line-soft px-4 py-2.5 first:border-t-0`,children:[(0,u.jsx)(`span`,{className:`w-24 shrink-0`,children:(0,u.jsx)(l,{children:e.valor})}),(0,u.jsxs)(`span`,{className:`w-24 shrink-0 text-[12px] text-ink-muted`,children:[e.usos,` usos`]}),(0,u.jsx)(`span`,{className:`min-w-0 truncate`,style:{fontSize:t},children:f})]},e.valor)})})})]})},m=[`Escala`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Typography',
  render: () => <Page titulo="Typography" bajada="Una sola familia, Inter. La escala sale de lo que el código usa hoy: cada tamaño con la cantidad de veces que aparece.">
      <Seccion titulo="Familia">
        <p className="text-[32px] leading-tight font-semibold">Inter</p>
        <p className="mt-1 text-[13px] text-ink-muted">
          <Codigo>--font-sans: {tokensTema['font-sans']}</Codigo>
        </p>
        <div className="mt-4 flex flex-wrap gap-6 text-[20px]">
          {[400, 500, 600, 700].map(w => <span key={w} style={{
          fontWeight: w
        }}>Aa {w}</span>)}
        </div>
      </Seccion>

      <Seccion titulo="Tamaños en uso" nota="Todos son clases arbitrarias (text-[13px]). Los que casi no se usan son candidatos a unificarse.">
        <div className="overflow-hidden rounded-lg border border-line">
          {tamanosDeTexto.map(t => {
          const px = parseFloat(t.valor.replace('text-[', ''));
          return <div key={t.valor} className="flex items-baseline gap-4 border-t border-line-soft px-4 py-2.5 first:border-t-0">
                <span className="w-24 shrink-0"><Codigo>{t.valor}</Codigo></span>
                <span className="w-24 shrink-0 text-[12px] text-ink-muted">{t.usos} usos</span>
                <span className="min-w-0 truncate" style={{
              fontSize: px
            }}>{EJEMPLO}</span>
              </div>;
        })}
        </div>
      </Seccion>
    </Page>
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as Escala,m as __namedExportsOrder,d as default};
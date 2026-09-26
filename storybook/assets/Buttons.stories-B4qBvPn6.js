import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i}from"./Page-D6JwDZ22.js";import{a,c as o,l as s,o as c,s as l}from"./Recipes-k0DFi2sR.js";import{a as u,i as d,n as f,o as p,t as m}from"./spec-BsYnllfC.js";var h,g,_,v;function y(){return(y=e((()=>{n(),l(),p(),h=t(),g={title:`Audit/Buttons in code`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},_={name:`Buttons in code`,render:()=>{let e=s.filter(e=>e.tipo===`button`),t=o.elementos.button??0;return(0,h.jsxs)(r,{titulo:`Buttons in code`,bajada:`Para quien migra código: cuánto se aparta hoy la app del botón estándar (Elements / Buttons). Son los ${t} <button> de la app, leídos del código; ${o.usosDeButtonUI} usan el componente Button, el resto tiene clases propias. Si el código cambia, cambia acá.`,children:[(0,h.jsx)(i,{titulo:`Sizes in use`,nota:`Cuántos botones usan cada valor, en toda la app. Si hay más de un valor, hay botones del mismo tipo que no miden lo mismo.`,children:(0,h.jsx)(d,{looks:e,total:t})}),(0,h.jsx)(i,{titulo:`Colors in use`,nota:`Los colores que usan los botones, con la cantidad de botones que los usan.`,children:(0,h.jsx)(m,{looks:e})}),(0,h.jsxs)(i,{titulo:`States in the app`,nota:`Qué porcentaje de los botones define cada estado, qué clases usa y qué falta.`,children:[(0,h.jsx)(f,{looks:e,total:t,filas:[{estado:`Hover`,define:e=>e.estados.hover,clases:/^hover:/,faltante:e=>`${e} buttons look the same under the mouse.`},{estado:`Focus`,define:e=>e.estados.foco===`definido`,clases:/^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/,faltante:(e,t)=>`${e} buttons use the browser’s default ring; ${a(t.filter(e=>e.estados.foco===`quitado`||e.estados.foco===`invisible`))} show no ring at all.`},{estado:`Active (pressed)`,define:e=>e.estados.activo,clases:/(^|:)active:/,faltante:e=>`${e} buttons do not react to the press.`},{estado:`Disabled`,define:e=>e.estados.deshabilitado,clases:/(^|:)disabled:|cursor-not-allowed/,faltante:e=>`${e} buttons have no disabled look: disabled or not, they look the same.`}]}),(0,h.jsxs)(`p`,{className:`mt-3 max-w-[70ch] text-[12.5px] text-ink-muted`,children:[`El botón estándar (`,(0,h.jsx)(`code`,{className:`rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]`,children:`ui/Button`}),`, en Elements / Buttons) ya resuelve todos estos estados; la app lo usa en `,o.usosDeButtonUI,` lugares.`]})]}),(0,h.jsx)(u,{tipo:`button`,familiaDe:c,cantidad:e.length,elementos:t})]})}},v=[`Botones`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Buttons in code',
  render: () => {
    const botones = recetas.filter(r => r.tipo === 'button');
    const total = meta.elementos.button ?? 0;
    return <Page titulo="Buttons in code" bajada={\`Para quien migra código: cuánto se aparta hoy la app del botón estándar (Elements / Buttons). Son los \${total} <button> de la app, leídos del código; \${meta.usosDeButtonUI} usan el componente Button, el resto tiene clases propias. Si el código cambia, cambia acá.\`}>
        <Seccion titulo="Sizes in use" nota="Cuántos botones usan cada valor, en toda la app. Si hay más de un valor, hay botones del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={botones} total={total} />
        </Seccion>

        <Seccion titulo="Colors in use" nota="Los colores que usan los botones, con la cantidad de botones que los usan.">
          <ColoresEnUso looks={botones} />
        </Seccion>

        <Seccion titulo="States in the app" nota="Qué porcentaje de los botones define cada estado, qué clases usa y qué falta.">
          <EstadosDeLaApp looks={botones} total={total} filas={[{
          estado: 'Hover',
          define: r => r.estados.hover,
          clases: /^hover:/,
          faltante: n => \`\${n} buttons look the same under the mouse.\`
        }, {
          estado: 'Focus',
          define: r => r.estados.foco === 'definido',
          clases: /^(?:[^\\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
          faltante: (n, sin) => \`\${n} buttons use the browser’s default ring; \${elementosDe(sin.filter(r => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.\`
        }, {
          estado: 'Active (pressed)',
          define: r => r.estados.activo,
          clases: /(^|:)active:/,
          faltante: n => \`\${n} buttons do not react to the press.\`
        }, {
          estado: 'Disabled',
          define: r => r.estados.deshabilitado,
          clases: /(^|:)disabled:|cursor-not-allowed/,
          faltante: n => \`\${n} buttons have no disabled look: disabled or not, they look the same.\`
        }]} />
          <p className="mt-3 max-w-[70ch] text-[12.5px] text-ink-muted">
            El botón estándar (<code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]">ui/Button</code>, en Elements / Buttons) ya resuelve todos estos estados; la app lo usa en {meta.usosDeButtonUI} lugares.
          </p>
        </Seccion>

        <TodoLoEncontrado tipo="button" familiaDe={familiaBoton} cantidad={botones.length} elementos={total} />
      </Page>;
  }
}`,..._.parameters?.docs?.source}}}})))()}y();export{_ as Botones,v as __namedExportsOrder,g as default};
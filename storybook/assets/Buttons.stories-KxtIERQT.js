import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i}from"./Page-D6JwDZ22.js";import{a,d as o,f as s,l as c,u as l}from"./Recipes-BRGIR7wI.js";import{a as u,c as d,n as f,o as p,r as m,s as h,t as g}from"./spec-B9EJoz9a.js";var _,v,y,b,x,S;function C(){return(C=e((()=>{n(),l(),d(),_=t(),v={title:`Patterns/Buttons`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},y=e=>s.filter(t=>t.tipo===`button`&&c(t)===e).sort((e,t)=>t.cantidad-e.cantidad)[0],b=[{nombre:`Primary`,uso:`The main action of a screen or dialog: Save, Next, New.`,look:y(`Primary (solid blue)`),texto:`Save`},{nombre:`Outline`,uso:`A secondary action: Cancel, Back, Export.`,look:y(`Outline`),texto:`Cancel`},{nombre:`Text link`,uso:`An action that reads as a link.`,look:y(`Text link`),texto:`View all`},{nombre:`Icon only`,uso:`Toolbar and close buttons. Needs an aria-label.`,look:y(`Icon-only`)},{nombre:`Destructive`,uso:`Deletes or discards.`,look:y(`Destructive`),texto:`Delete`}],x={name:`Buttons`,render:()=>{let e=s.filter(e=>e.tipo===`button`),t=o.elementos.button??0;return(0,_.jsxs)(r,{titulo:`Buttons`,bajada:`Los ${t} botones de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Lo que sale de esta página es lo que la app hace hoy: si el código cambia, cambia acá.`,children:[(0,_.jsx)(i,{titulo:`Types and states`,nota:`El look más usado de cada tipo, en cada estado. “—” quiere decir que el código no define ese estado: el botón se ve igual.`,children:(0,_.jsx)(p,{tipos:b,columnas:[`default`,`hover`,`focus`,`disabled`]})}),(0,_.jsx)(i,{titulo:`Measures`,nota:`Leídas de los botones de arriba, ya dibujados.`,children:(0,_.jsx)(m,{tipos:b})}),(0,_.jsx)(i,{titulo:`Sizes in use`,nota:`Cuántos botones usan cada valor, en toda la app. Si hay más de un valor, hay botones del mismo tipo que no miden lo mismo.`,children:(0,_.jsx)(u,{looks:e,total:t})}),(0,_.jsx)(i,{titulo:`Colors in use`,nota:`Los colores que usan los botones, con la cantidad de botones que los usan.`,children:(0,_.jsx)(g,{looks:e})}),(0,_.jsxs)(i,{titulo:`States in the app`,nota:`Qué porcentaje de los botones define cada estado, qué clases usa y qué falta.`,children:[(0,_.jsx)(f,{looks:e,total:t,filas:[{estado:`Hover`,define:e=>e.estados.hover,clases:/^hover:/,faltante:e=>`${e} buttons look the same under the mouse.`},{estado:`Focus`,define:e=>e.estados.foco===`definido`,clases:/^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/,faltante:(e,t)=>`${e} buttons use the browser’s default ring; ${a(t.filter(e=>e.estados.foco===`quitado`||e.estados.foco===`invisible`))} show no ring at all.`},{estado:`Active (pressed)`,define:e=>e.estados.activo,clases:/(^|:)active:/,faltante:e=>`${e} buttons do not react to the press.`},{estado:`Disabled`,define:e=>e.estados.deshabilitado,clases:/(^|:)disabled:|cursor-not-allowed/,faltante:e=>`${e} buttons have no disabled look: disabled or not, they look the same.`}]}),(0,_.jsxs)(`p`,{className:`mt-3 max-w-[70ch] text-[12.5px] text-ink-muted`,children:[`El componente compartido `,(0,_.jsx)(`code`,{className:`rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]`,children:`ui/Button`}),` ya define los cuatro estados para sus 7 variantes (Components / UI / Button), pero la app lo usa en `,o.usosDeButtonUI,` lugares.`]})]}),(0,_.jsx)(h,{tipo:`button`,familiaDe:c,cantidad:e.length,elementos:t})]})}},S=[`Botones`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Buttons',
  render: () => {
    const botones = recetas.filter(r => r.tipo === 'button');
    const total = meta.elementos.button ?? 0;
    return <Page titulo="Buttons" bajada={\`Los \${total} botones de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Lo que sale de esta página es lo que la app hace hoy: si el código cambia, cambia acá.\`}>
        <Seccion titulo="Types and states" nota="El look más usado de cada tipo, en cada estado. “—” quiere decir que el código no define ese estado: el botón se ve igual.">
          <TiposConEstados tipos={TIPOS} columnas={['default', 'hover', 'focus', 'disabled']} />
        </Seccion>

        <Seccion titulo="Measures" nota="Leídas de los botones de arriba, ya dibujados.">
          <MedidasDeTipos tipos={TIPOS} />
        </Seccion>

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
            El componente compartido <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[11px]">ui/Button</code> ya define los cuatro estados para sus 7 variantes (Components / UI / Button), pero la app lo usa en {meta.usosDeButtonUI} lugares.
          </p>
        </Seccion>

        <TodoLoEncontrado tipo="button" familiaDe={familiaBoton} cantidad={botones.length} elementos={total} />
      </Page>;
  }
}`,...x.parameters?.docs?.source}}}})))()}C();export{x as Botones,S as __namedExportsOrder,v as default};
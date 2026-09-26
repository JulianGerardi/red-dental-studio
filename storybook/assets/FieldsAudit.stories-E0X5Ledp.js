import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i}from"./Page-D6JwDZ22.js";import{a,c as o,l as s,s as c}from"./Recipes-DXf61Rap.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./spec-DCc68Pid.js";var h,g,_,v,y,b;function x(){return(x=e((()=>{n(),c(),f(),h=t(),g={title:`Audit/Fields in code`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},_=s.filter(e=>e.tipo===`field`),v=e=>/field-error|dash-bad/.test(e.firma),y={name:`Fields in code`,render:()=>{let e=o.elementos.field??0;return(0,h.jsxs)(r,{titulo:`Fields in code`,bajada:`Para quien migra código: los ${e} <input>, <select> y <textarea> de la app con estilo propio, leídos del código, comparados con los campos estándar (Elements / Fields). Si el código cambia, cambia acá.`,children:[(0,h.jsx)(i,{titulo:`Sizes in use`,nota:`Cuántos campos usan cada valor. Más de un valor quiere decir que hay campos del mismo tipo que no miden lo mismo.`,children:(0,h.jsx)(u,{looks:_.filter(e=>e.inputType!==`checkbox`&&e.inputType!==`file`),total:e})}),(0,h.jsx)(i,{titulo:`Colors in use`,children:(0,h.jsx)(m,{looks:_,roles:p.filter(e=>e.nombre!==`Fill on hover`)})}),(0,h.jsx)(i,{titulo:`States in the app`,nota:`Qué porcentaje de los campos define cada estado y qué falta.`,children:(0,h.jsx)(d,{looks:_,total:e,filas:[{estado:`Focus`,define:e=>e.estados.foco===`definido`,clases:/^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/,faltante:(e,t)=>`${e} fields use the browser’s default ring; ${a(t.filter(e=>e.estados.foco===`quitado`||e.estados.foco===`invisible`))} show no ring at all.`},{estado:`Error`,define:v,clases:/field-error|dash-bad/,faltante:e=>`${e} fields have no error look.`},{estado:`Disabled`,define:e=>e.estados.deshabilitado,clases:/(^|:)disabled:|cursor-not-allowed/,faltante:e=>`${e} fields have no disabled look.`}]})}),(0,h.jsx)(l,{tipo:`field`,cantidad:_.length,elementos:e})]})}},b=[`CamposEnCodigo`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Fields in code',
  render: () => {
    const total = datos.elementos.field ?? 0;
    return <Page titulo="Fields in code" bajada={\`Para quien migra código: los \${total} <input>, <select> y <textarea> de la app con estilo propio, leídos del código, comparados con los campos estándar (Elements / Fields). Si el código cambia, cambia acá.\`}>
        <Seccion titulo="Sizes in use" nota="Cuántos campos usan cada valor. Más de un valor quiere decir que hay campos del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={campos.filter(r => r.inputType !== 'checkbox' && r.inputType !== 'file')} total={total} />
        </Seccion>
        <Seccion titulo="Colors in use">
          <ColoresEnUso looks={campos} roles={ROLES_COLOR.filter(r => r.nombre !== 'Fill on hover')} />
        </Seccion>
        <Seccion titulo="States in the app" nota="Qué porcentaje de los campos define cada estado y qué falta.">
          <EstadosDeLaApp looks={campos} total={total} filas={[{
          estado: 'Focus',
          define: r => r.estados.foco === 'definido',
          clases: /^(?:[^\\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
          faltante: (n, sin) => \`\${n} fields use the browser’s default ring; \${elementosDe(sin.filter(r => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.\`
        }, {
          estado: 'Error',
          define: conError,
          clases: /field-error|dash-bad/,
          faltante: n => \`\${n} fields have no error look.\`
        }, {
          estado: 'Disabled',
          define: r => r.estados.deshabilitado,
          clases: /(^|:)disabled:|cursor-not-allowed/,
          faltante: n => \`\${n} fields have no disabled look.\`
        }]} />
        </Seccion>
        <TodoLoEncontrado tipo="field" cantidad={campos.length} elementos={total} />
      </Page>;
  }
}`,...y.parameters?.docs?.source}}}})))()}x();export{y as CamposEnCodigo,b as __namedExportsOrder,g as default};
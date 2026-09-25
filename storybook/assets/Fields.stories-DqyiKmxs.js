import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i}from"./Page-D6JwDZ22.js";import{a,c as o,d as s,f as c,o as l,p as u,s as d,u as f}from"./Recipes-BRGIR7wI.js";import{a as p,c as m,i as h,n as g,o as _,r as v,s as y,t as b}from"./spec-B9EJoz9a.js";var x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{n(),f(),m(),x=t(),S={title:`Patterns/Fields`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,options:{showPanel:!1}}},C=c.filter(e=>e.tipo===`field`),w=e=>/field-error|dash-bad/.test(e.firma),T=e=>o(e)?`Hidden file input`:d(e)?`Checkbox and radio`:e.tag===`select`?`Select`:e.tag===`textarea`?`Textarea`:w(e)?`Input with error`:l(e)?`Search input`:u(e)?`Inline input`:`Text input`,E=(e,t=()=>!0)=>C.filter(n=>T(n)===e&&t(n)).sort((e,t)=>t.cantidad-e.cantidad)[0],D=e=>C.filter(t=>w(t)&&l(t)===e&&t.tag===`input`).sort((e,t)=>t.cantidad-e.cantidad)[0],O=[{nombre:`Text input`,uso:`A single-line field.`,look:E(`Text input`),error:D(!1)},{nombre:`Search input`,uso:`A text field with a magnifier icon on the left.`,look:E(`Search input`),error:D(!0)},{nombre:`Select`,uso:`The native select, styled like a text field.`,look:E(`Select`)},{nombre:`Textarea`,uso:`A multi-line field.${u(E(`Textarea`)??{clases:`border`})?` Its only look has no border of its own: the box comes from the screen.`:``}`,look:E(`Textarea`)},{nombre:`Checkbox`,uso:`A native checkbox tinted with the brand accent.`,look:E(`Checkbox and radio`)}],k={name:`Fields`,render:()=>{let e=s.elementos.field??0;return(0,x.jsxs)(r,{titulo:`Fields`,bajada:`Los ${e} <input>, <select> y <textarea> con estilo propio de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Los campos de formulario reutilizables (etiqueta + campo + error) están en Components / Patients / Form fields.`,children:[(0,x.jsx)(i,{titulo:`Types and states`,nota:`El look más usado de cada tipo. Error es el aspecto que toma el campo cuando falla la validación; “—” quiere decir que el código no lo define.`,children:(0,x.jsx)(_,{tipos:O,columnas:[`default`,`focus`,`error`,`disabled`]})}),(0,x.jsx)(i,{titulo:`Measures`,nota:`Leídas de los campos de arriba, ya dibujados.`,children:(0,x.jsx)(v,{tipos:O})}),(0,x.jsx)(i,{titulo:`Sizes in use`,nota:`Cuántos campos usan cada valor, en toda la app. Si hay más de un valor, hay campos del mismo tipo que no miden lo mismo.`,children:(0,x.jsx)(p,{looks:C.filter(e=>!o(e)&&!d(e)),total:e})}),(0,x.jsx)(i,{titulo:`Colors in use`,nota:`Los colores que usan los campos, con la cantidad de campos que los usan.`,children:(0,x.jsx)(b,{looks:C,roles:h.filter(e=>e.nombre!==`Fill on hover`)})}),(0,x.jsx)(i,{titulo:`States in the app`,nota:`Qué porcentaje de los campos define cada estado, qué clases usa y qué falta.`,children:(0,x.jsx)(g,{looks:C,total:e,filas:[{estado:`Hover`,define:e=>e.estados.hover,clases:/^hover:/,faltante:e=>`${e} fields look the same under the mouse.`},{estado:`Focus`,define:e=>e.estados.foco===`definido`,clases:/^(?:[^\s:]+:)*focus(?:-visible)?:(?!outline-none)/,faltante:(e,t)=>`${e} fields use the browser’s default ring; ${a(t.filter(e=>e.estados.foco===`quitado`||e.estados.foco===`invisible`))} show no ring at all.`},{estado:`Error`,define:w,clases:/field-error|dash-bad/,faltante:e=>`${e} fields have no error look: a failed validation is not visible on them.`},{estado:`Disabled`,define:e=>e.estados.deshabilitado,clases:/(^|:)disabled:|cursor-not-allowed/,faltante:e=>`${e} fields have no disabled look: disabled or not, they look the same.`}]})}),(0,x.jsx)(y,{tipo:`field`,familiaDe:T,cantidad:C.length,elementos:e})]})}},A=[`Campos`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Fields',
  render: () => {
    const total = datos.elementos.field ?? 0;
    return <Page titulo="Fields" bajada={\`Los \${total} <input>, <select> y <textarea> con estilo propio de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Los campos de formulario reutilizables (etiqueta + campo + error) están en Components / Patients / Form fields.\`}>
        <Seccion titulo="Types and states" nota="El look más usado de cada tipo. Error es el aspecto que toma el campo cuando falla la validación; “—” quiere decir que el código no lo define.">
          <TiposConEstados tipos={TIPOS} columnas={['default', 'focus', 'error', 'disabled']} />
        </Seccion>

        <Seccion titulo="Measures" nota="Leídas de los campos de arriba, ya dibujados.">
          <MedidasDeTipos tipos={TIPOS} />
        </Seccion>

        <Seccion titulo="Sizes in use" nota="Cuántos campos usan cada valor, en toda la app. Si hay más de un valor, hay campos del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={campos.filter(r => !esOculto(r) && !esCasilla(r))} total={total} />
        </Seccion>

        <Seccion titulo="Colors in use" nota="Los colores que usan los campos, con la cantidad de campos que los usan.">
          <ColoresEnUso looks={campos} roles={ROLES_COLOR.filter(r => r.nombre !== 'Fill on hover')} />
        </Seccion>

        <Seccion titulo="States in the app" nota="Qué porcentaje de los campos define cada estado, qué clases usa y qué falta.">
          <EstadosDeLaApp looks={campos} total={total} filas={[{
          estado: 'Hover',
          define: r => r.estados.hover,
          clases: /^hover:/,
          faltante: n => \`\${n} fields look the same under the mouse.\`
        }, {
          estado: 'Focus',
          define: r => r.estados.foco === 'definido',
          clases: /^(?:[^\\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
          faltante: (n, sin) => \`\${n} fields use the browser’s default ring; \${elementosDe(sin.filter(r => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.\`
        }, {
          estado: 'Error',
          define: conError,
          clases: /field-error|dash-bad/,
          faltante: n => \`\${n} fields have no error look: a failed validation is not visible on them.\`
        }, {
          estado: 'Disabled',
          define: r => r.estados.deshabilitado,
          clases: /(^|:)disabled:|cursor-not-allowed/,
          faltante: n => \`\${n} fields have no disabled look: disabled or not, they look the same.\`
        }]} />
        </Seccion>

        <TodoLoEncontrado tipo="field" familiaDe={familia} cantidad={campos.length} elementos={total} />
      </Page>;
  }
}`,...k.parameters?.docs?.source}}}})))()}j();export{k as Campos,A as __namedExportsOrder,S as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,n as r,r as i,t as a}from"./play-C4HzH6w4.js";import{a as o,w as s}from"./finanzas-D49FH9Xj.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BWB0Ospl.js";import{n as f,t as p}from"./CoverageRuleDrawer-DU6E5E4Y.js";var m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{f(),i(),c(),s(),m=t(),h=o[0],g={title:`Components/Finance/CoverageRuleDrawer`,component:p,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:640},description:{component:[`La regla de una categoría de una coverage table: cuánto paga el plan, si se descuenta el deducible, la espera y el límite de frecuencia. Se abre tocando una fila de la tabla de reglas.`,``,`**Un paso:** Coverage (Plan Pays con su barra y el interruptor Deductible Applies, on / off) y Limitations (Waiting Period y Frequency Limit).`,``,`**Probalo:** en *Playground* cambiá el porcentaje y mirá la barra; elegí otra categoría desde *Controls*.`].join(`
`)}}},args:{grupo:`Implant services`,regla:h.reglas[`Implant services`],onClose:()=>{},onGuardar:()=>{}},argTypes:{grupo:{control:`select`,options:Object.keys(h.reglas),description:`La categoría CDT.`},regla:{control:!1}}},_={render:e=>(0,m.jsx)(p,{...e,regla:h.reglas[e.grupo]},e.grupo)},v={args:{grupo:`Cosmetic & aesthetic services`,regla:h.reglas[`Cosmetic & aesthetic services`]}},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(l,{nota:`Un paso. El título es la categoría y la bajada su rango de códigos y su clase.`,pasos:[{nombre:`Rule`,secciones:`Coverage: Plan Pays (%), la barra (CoverageBar), Deductible Applies (on / off). Limitations: Waiting Period, Frequency Limit`,obligatorios:`Plan Pays`}]})},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(d,{estados:[{estado:`Default`,cuando:`Con la regla actual y la barra del porcentaje.`,story:`Playground`},{estado:`Not covered`,cuando:`0%: la barra dice “Not covered”.`,story:`Not Covered`},{estado:`Validation errors`,cuando:`Vacío o fuera de 0 a 100 (sólo enteros): sin barra y el error debajo; Save no hace nada.`,story:`With Validation Errors`},{estado:`Saved`,cuando:`La fila cambia y el toast dice “… now pays N%.”.`}]})},x={play:n(a(/plan pays/i,`150`),r(/whole number/i))},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(u,{filas:[[`Size`,`md · 480px`],[`Opens from`,`Una fila (o Edit rule) de la tabla de reglas, en el detalle de una coverage table.`],[`Deductible`,`Toggle de settings/primitives: Yes / No.`],[`Waiting Period`,`None, 3, 6 o 12 months.`]]})},C=[`Playground`,`NotCovered`,`Parts`,`States`,`WithValidationErrors`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: a => <CoverageRuleDrawer key={a.grupo} {...a} regla={tabla.reglas[a.grupo]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    grupo: 'Cosmetic & aesthetic services',
    regla: tabla.reglas['Cosmetic & aesthetic services']
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <PasosDelDrawer nota="Un paso. El título es la categoría y la bajada su rango de códigos y su clase." pasos={[{
    nombre: 'Rule',
    secciones: 'Coverage: Plan Pays (%), la barra (CoverageBar), Deductible Applies (on / off). Limitations: Waiting Period, Frequency Limit',
    obligatorios: 'Plan Pays'
  }]} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <EstadosDelDrawer estados={[{
    estado: 'Default',
    cuando: 'Con la regla actual y la barra del porcentaje.',
    story: 'Playground'
  }, {
    estado: 'Not covered',
    cuando: '0%: la barra dice “Not covered”.',
    story: 'Not Covered'
  }, {
    estado: 'Validation errors',
    cuando: 'Vacío o fuera de 0 a 100 (sólo enteros): sin barra y el error debajo; Save no hace nada.',
    story: 'With Validation Errors'
  }, {
    estado: 'Saved',
    cuando: 'La fila cambia y el toast dice “… now pays N%.”.'
  }]} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/plan pays/i, '150'), esperar(/whole number/i))
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <SpecsDelDrawer filas={[['Size', 'md · 480px'], ['Opens from', 'Una fila (o Edit rule) de la tabla de reglas, en el detalle de una coverage table.'], ['Deductible', 'Toggle de settings/primitives: Yes / No.'], ['Waiting Period', 'None, 3, 6 o 12 months.']]} />
}`,...S.parameters?.docs?.source}}}})))()}w();export{v as NotCovered,y as Parts,_ as Playground,S as Specs,b as States,x as WithValidationErrors,C as __namedExportsOrder,g as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{t as o,w as s}from"./finanzas-D49FH9Xj.js";import{n as c,t as l}from"./AdjustFeesDrawer-Dn2cqCp8.js";import{i as u,n as d,r as f,t as p}from"./kit-drawer-BWB0Ospl.js";var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{c(),a(),u(),s(),m=t(),h={title:`Components/Finance/AdjustFeesDrawer`,component:l,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Sube o baja por porcentaje los precios de un fee schedule (*Adjust fees*, en su detalle): todos o los de una categoría, con redondeo a $1 o $5.`,``,`**Un paso:** Change, Percentage, Apply To y Rounding arriba; abajo la vista previa de los primeros cinco códigos (antes → después) y cuántos cambian. El botón dice a cuántos precios se aplica.`,``,`**Probalo:** en *Playground* escribí 5 y cambiá Apply To a una categoría.`].join(`
`)}}},args:{arancel:o[1],onClose:()=>{},onGuardar:()=>{}},argTypes:{arancel:{control:!1}}},g={},_={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(d,{nota:`Un solo paso: el pie es Cancel / Apply to N fees.`,pasos:[{nombre:`Adjustment`,secciones:`Adjustment: Change (Increase / Decrease by), Percentage (%), Apply To, Rounding. Preview: cinco códigos y “N of M fees change.”`,obligatorios:`Percentage`}]})},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(p,{estados:[{estado:`Default`,cuando:`Sin porcentaje: la vista previa muestra los precios de hoy y pide escribirlo.`,story:`Playground`},{estado:`Validation errors`,cuando:`Apply sin porcentaje (“This field is required.”) o fuera de 1 a 100.`,story:`With Validation Errors`},{estado:`Preview`,cuando:`Con un porcentaje válido: antes en gris → después en negro, y el botón “Apply to N fees”.`},{estado:`Applied`,cuando:`Se cierra y el toast dice “N fees updated.”.`}]})},y={play:n(r(/^apply$/i),i(/required/i))},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(f,{filas:[[`Size`,`md · 480px`],[`Opens from`,`Adjust fees, en el detalle de un fee schedule (deshabilitado si no tiene precios).`],[`Applies to`,`Sólo los códigos con precio; los “Not set” no cambian.`],[`Rounding`,`No rounding (centavos), Nearest $1 (default) o Nearest $5. Nunca baja de $0.`]]})},x=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
  render: () => <PasosDelDrawer nota="Un solo paso: el pie es Cancel / Apply to N fees." pasos={[{
    nombre: 'Adjustment',
    secciones: 'Adjustment: Change (Increase / Decrease by), Percentage (%), Apply To, Rounding. Preview: cinco códigos y “N of M fees change.”',
    obligatorios: 'Percentage'
  }]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
    cuando: 'Sin porcentaje: la vista previa muestra los precios de hoy y pide escribirlo.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Apply sin porcentaje (“This field is required.”) o fuera de 1 a 100.',
    story: 'With Validation Errors'
  }, {
    estado: 'Preview',
    cuando: 'Con un porcentaje válido: antes en gris → después en negro, y el botón “Apply to N fees”.'
  }, {
    estado: 'Applied',
    cuando: 'Se cierra y el toast dice “N fees updated.”.'
  }]} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^apply$/i), esperar(/required/i))
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
  render: () => <SpecsDelDrawer filas={[['Size', 'md · 480px'], ['Opens from', 'Adjust fees, en el detalle de un fee schedule (deshabilitado si no tiene precios).'], ['Applies to', 'Sólo los códigos con precio; los “Not set” no cambian.'], ['Rounding', 'No rounding (centavos), Nearest $1 (default) o Nearest $5. Nunca baja de $0.']]} />
}`,...b.parameters?.docs?.source}}}})))()}S();export{_ as Parts,g as Playground,b as Specs,v as States,y as WithValidationErrors,x as __namedExportsOrder,h as default};
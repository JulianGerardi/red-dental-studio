import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a}from"./play-Dr1R_I1D.js";import{c as o,d as s,i as c,t as l}from"./kit-CWUgB5-0.js";import{n as u,t as d}from"./RegionConditionDrawer-CprUe4iO.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{u(),a(),s(),f=t(),p={title:`Components/Clinical/Dental/RegionConditionDrawer`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:["Add Condition de Extraoral/Intraoral: por región del gráfico, no por diente -el drawer de `NewProcedureDrawer` no sirve acá, siempre carga contra un diente-.",``,`**Dos pasos**, los dos titulados "New Condition" como en la app real: **Condition** -las regiones elegidas en el gráfico, afuera, como chips removibles; el catálogo de condición, propio, con buscador- y **Descriptors** -la misma guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs)-.`,``,`**El botón del paso 1 dice "Select descriptors"**, no "Next Step": así lo dice la app real. Deshabilitado hasta elegir una condition.`,``,`**Probalo:** en *Playground* elegí "Atrophy" y avanzá.`].join(`
`)}}},args:{open:!0,regions:[`Right Forehead`,`Right Posterior Head`],onRemoveRegion:()=>{},onClose:()=>{},onSave:()=>{}}},m={},h={args:{regions:[]}},g={play:i(n(/^Atrophy/i),r(/select descriptors/i))},_={play:i(n(/^Atrophy/i),n(/select descriptors/i),r(/tap a pill again to clear it/i))},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{children:(0,f.jsx)(l,{titulo:`Steps`,nota:`Los dos pasos, siempre los mismos -esta condition no tiene Surfaces ni Link to finding/diagnosis, que son de un procedure.`,children:(0,f.jsxs)(o,{encabezado:[`Step`,`What it asks`],minimo:480,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Condition`}),(0,f.jsx)(`td`,{children:`Las regiones elegidas (chips, con su ✕) y el catálogo de condición, con buscador.`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Descriptors`}),(0,f.jsx)(`td`,{children:`La guía visual de descriptores, opcional.`})]})]})})})},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{children:(0,f.jsx)(l,{titulo:`Specs`,children:(0,f.jsxs)(o,{encabezado:[`Item`,`Value`],minimo:480,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Size`}),(0,f.jsx)(`td`,{children:`md · 480px`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,f.jsx)(`td`,{children:`New Condition, los dos pasos`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Next, paso Condition`}),(0,f.jsx)(`td`,{children:`"Select descriptors", deshabilitado sin condition elegida`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Save`}),(0,f.jsx)(`td`,{children:`Guarda la condition en las regiones elegidas, con sus descriptores`})]})]})})})},b=[`Playground`,`WithoutRegions`,`ConditionSelected`,`DescriptorsStep`,`Parts`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    regions: []
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^Atrophy/i), esperar(/select descriptors/i))
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^Atrophy/i), pulsar(/select descriptors/i), esperar(/tap a pill again to clear it/i))
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
  render: () => <Lienzo>
      <Bloque titulo="Steps" nota="Los dos pasos, siempre los mismos -esta condition no tiene Surfaces ni Link to finding/diagnosis, que son de un procedure.">
        <Tabla encabezado={['Step', 'What it asks']} minimo={480}>
          <tr><td className="font-semibold">Condition</td><td>Las regiones elegidas (chips, con su ✕) y el catálogo de condición, con buscador.</td></tr>
          <tr><td className="font-semibold">Descriptors</td><td>La guía visual de descriptores, opcional.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
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
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Size</td><td>md · 480px</td></tr>
          <tr><td className="font-semibold">Title</td><td>New Condition, los dos pasos</td></tr>
          <tr><td className="font-semibold">Next, paso Condition</td><td>"Select descriptors", deshabilitado sin condition elegida</td></tr>
          <tr><td className="font-semibold">Save</td><td>Guarda la condition en las regiones elegidas, con sus descriptores</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as ConditionSelected,_ as DescriptorsStep,v as Parts,m as Playground,y as Specs,h as WithoutRegions,b as __namedExportsOrder,p as default};
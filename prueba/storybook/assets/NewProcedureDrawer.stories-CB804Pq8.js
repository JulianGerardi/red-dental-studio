import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-CDw6varG.js";import{i as o,l as s,s as c,t as l}from"./kit-VhBMbBcY.js";import{n as u,t as d}from"./NewProcedureDrawer-D5LsYQ9Z.js";var f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{s(),u(),a(),f=t(),p={title:`Components/Clinical/Dental/NewProcedureDrawer`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Add Procedure y Add Condition del odontograma. Los pasos dependen de lo elegido: **Procedure**; **Surfaces** si el procedimiento elegido va en superficie, sea Planned o Existing; y, sólo para Planned, **Link to finding** (los hallazgos por nombre) y **Link to diagnosis** (los diagnósticos por código y superficie, sin estado ni fecha).`,``,`**Pie:** el de todos los drawers (Cancel o Return, Next Step o Save); Next Step queda deshabilitado hasta elegir un procedimiento o marcar una superficie.`,``,`**Probalo:** en *Playground* elegí un procedimiento en superficie (D2140) y avanzá.`].join(`
`)}}},args:{open:!0,mode:`procedure`,area:`Tooth 21`,teeth:[20,21,22],findings:[{id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[],diagnoses:[]},{id:`F-3`,area:`Tooth 20`,condition:`localized periodontal pocketing`,descriptor:`Moderate`,date:`May 14, 2026`,status:`Active`,tooth:20,provider:`Elena Martinez`,surfaces:[`B`,`MB`],notes:``,linked:[],diagnoses:[]},{id:`F-5`,area:`Soft Palate`,condition:`oral candidiasis`,descriptor:`Red`,date:`May 14, 2026`,status:`Active`,tooth:null,provider:`Sarah Stone`,surfaces:[],notes:``,linked:[],diagnoses:[]}],onClose:()=>{},onSave:()=>{}},argTypes:{mode:{control:`inline-radio`,options:[`procedure`,`condition`],description:`Add Procedure arranca en Planned; Add Condition, en Existing.`}}},m={},h={args:{mode:`condition`}},g={play:n(r(/^D2140 on surface$/i),r(/next step/i),i(/apply to unset/i))},_={play:n(r(/^D0120\s*-/),r(/^D0120 on tooth$/i),r(/next step/i),i(/localized periodontal pocketing/i))},v={play:n(r(/^D0120\s*-/),r(/^D0120 on tooth$/i),r(/next step/i),r(/next step/i),i(/K05\.31/))},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(o,{children:(0,f.jsx)(l,{titulo:`Steps`,nota:`Cada paso con su nombre en el indicador, como en todos los drawers.`,children:(0,f.jsxs)(c,{encabezado:[`Step`,`What it asks`,`When it shows`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,f.jsx)(`td`,{children:`Buscar y elegir el procedimiento (Existing o Planned), con el filtro por área.`}),(0,f.jsx)(`td`,{children:`Siempre`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Surfaces`}),(0,f.jsx)(`td`,{children:`Marcar las superficies, pieza por pieza.`}),(0,f.jsx)(`td`,{children:`Si el procedimiento va en superficie`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Link to finding`}),(0,f.jsx)(`td`,{children:`Vincular los hallazgos que resuelve, por nombre, con estado y fecha.`}),(0,f.jsx)(`td`,{children:`Si es Planned`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Link to diagnosis`}),(0,f.jsx)(`td`,{children:`Vincular los diagnósticos que trata: código ICD-10 y superficies, sin estado ni fecha.`}),(0,f.jsx)(`td`,{children:`Si es Planned`})]})]})})})},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(o,{children:(0,f.jsx)(l,{titulo:`Specs`,children:(0,f.jsxs)(c,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Size`}),(0,f.jsx)(`td`,{children:`md · 480px`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,f.jsx)(`td`,{children:`New Procedure, o New Condition desde Add Condition.`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Next disabled`}),(0,f.jsx)(`td`,{children:`Sin procedimiento elegido o sin superficies marcadas.`})]})]})})})},x=[`Playground`,`FromAddCondition`,`SurfacesStep`,`LinkToFindingStep`,`LinkToDiagnosisStep`,`Parts`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'condition'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D2140 on surface$/i), pulsar(/next step/i), esperar(/apply to unset/i))
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D0120\\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/next step/i), esperar(/localized periodontal pocketing/i))
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D0120\\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/next step/i), pulsar(/next step/i), esperar(/K05\\.31/))
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
      <Bloque titulo="Steps" nota="Cada paso con su nombre en el indicador, como en todos los drawers.">
        <Tabla encabezado={["Step", "What it asks", "When it shows"]} minimo={560}>
          <tr><td className="font-semibold">Procedure</td><td>Buscar y elegir el procedimiento (Existing o Planned), con el filtro por área.</td><td>Siempre</td></tr>
          <tr><td className="font-semibold">Surfaces</td><td>Marcar las superficies, pieza por pieza.</td><td>Si el procedimiento va en superficie</td></tr>
          <tr><td className="font-semibold">Link to finding</td><td>Vincular los hallazgos que resuelve, por nombre, con estado y fecha.</td><td>Si es Planned</td></tr>
          <tr><td className="font-semibold">Link to diagnosis</td><td>Vincular los diagnósticos que trata: código ICD-10 y superficies, sin estado ni fecha.</td><td>Si es Planned</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
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
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Size</td><td>md · 480px</td></tr>
          <tr><td className="font-semibold">Title</td><td>New Procedure, o New Condition desde Add Condition.</td></tr>
          <tr><td className="font-semibold">Next disabled</td><td>Sin procedimiento elegido o sin superficies marcadas.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}}})))()}S();export{h as FromAddCondition,v as LinkToDiagnosisStep,_ as LinkToFindingStep,y as Parts,m as Playground,b as Specs,g as SurfacesStep,x as __namedExportsOrder,p as default};
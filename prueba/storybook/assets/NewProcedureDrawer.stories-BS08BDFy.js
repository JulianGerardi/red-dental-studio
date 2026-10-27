import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a}from"./play-Dr1R_I1D.js";import{c as o,d as s,i as c,t as l}from"./kit-CWUgB5-0.js";import{n as u,t as d}from"./NewProcedureDrawer-6YNZzWhM.js";var f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{s(),u(),a(),f=t(),p={title:`Components/Clinical/Dental/NewProcedureDrawer`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Add Procedure y Add Condition del odontograma. Los pasos dependen de lo elegido: **Procedure**; **Surfaces** si el procedimiento elegido va en superficie, sea Planned o Existing; **Descriptors**, sólo desde Add Condition (la guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs)); y, sólo para Planned, **Link to finding** (los hallazgos por nombre) y **Link to diagnosis** (los diagnósticos por código y superficie, sin estado ni fecha).`,``,`**Vincular pide un procedimiento ya cargado:** el paso de Procedure (y Surfaces, si lo hay) termina en Save, que guarda el procedimiento ahí mismo, sin vínculos todavía. Recién con eso guardado aparecen Link to finding y Link to diagnosis, para agregarle los vínculos al procedimiento que ya existe; su Save los guarda y cierra.`,``,`**Pie:** el de todos los drawers (Cancel o Return, Next Step o Save); Next Step/Save quedan deshabilitados hasta elegir un procedimiento o marcar una superficie. Descriptors no bloquea: es opcional.`,``,`**Probalo:** en *Playground* elegí un procedimiento en superficie (D2140) y avanzá. En *FromAddCondition*, avanzá hasta Descriptors.`].join(`
`)}}},args:{open:!0,mode:`procedure`,area:`Tooth 21`,teeth:[20,21,22],findings:[{id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[],diagnoses:[]},{id:`F-3`,area:`Tooth 20`,condition:`localized periodontal pocketing`,descriptor:`Moderate`,date:`May 14, 2026`,status:`Active`,tooth:20,provider:`Elena Martinez`,surfaces:[`B`,`MB`],notes:``,linked:[],diagnoses:[]},{id:`F-5`,area:`Soft Palate`,condition:`oral candidiasis`,descriptor:`Red`,date:`May 14, 2026`,status:`Active`,tooth:null,provider:`Sarah Stone`,surfaces:[],notes:``,linked:[],diagnoses:[]}],onClose:()=>{},onSave:()=>`F-mock`,onLink:()=>{}},argTypes:{mode:{control:`inline-radio`,options:[`procedure`,`condition`],description:`Add Procedure arranca en Planned; Add Condition, en Existing.`}}},m={},h={args:{mode:`condition`}},g={play:i(n(/^D2140 on surface$/i),n(/next step/i),r(/apply to unset/i))},_={args:{mode:`condition`},play:i(n(/^D2740 on tooth$/i),n(/next step/i),r(/tap a pill again to clear it/i))},v={play:i(n(/^D0120\s*-/),n(/^D0120 on tooth$/i),n(/^save$/i),r(/localized periodontal pocketing/i))},y={play:i(n(/^D0120\s*-/),n(/^D0120 on tooth$/i),n(/^save$/i),n(/next step/i),r(/K05\.31/))},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{children:(0,f.jsx)(l,{titulo:`Steps`,nota:`Cada paso con su nombre en el indicador, como en todos los drawers.`,children:(0,f.jsxs)(o,{encabezado:[`Step`,`What it asks`,`When it shows`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,f.jsx)(`td`,{children:`Buscar y elegir el procedimiento (Existing o Planned), con el filtro por área.`}),(0,f.jsx)(`td`,{children:`Siempre`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Surfaces`}),(0,f.jsx)(`td`,{children:`Marcar las superficies, pieza por pieza. Save de este paso guarda el procedimiento.`}),(0,f.jsx)(`td`,{children:`Si el procedimiento va en superficie`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Descriptors`}),(0,f.jsx)(`td`,{children:`La guía visual de descriptores (DescriptorFields), opcional. Save de este paso guarda el procedimiento.`}),(0,f.jsx)(`td`,{children:`Desde Add Condition`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Link to finding`}),(0,f.jsx)(`td`,{children:`Vincular los hallazgos que resuelve, por nombre, con estado y fecha, sobre el procedimiento ya guardado.`}),(0,f.jsx)(`td`,{children:`Si es Planned, recién después de guardar el procedimiento`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Link to diagnosis`}),(0,f.jsx)(`td`,{children:`Vincular los diagnósticos que trata: código ICD-10 y superficies, sin estado ni fecha. Save de este paso guarda los vínculos.`}),(0,f.jsx)(`td`,{children:`Si es Planned, recién después de guardar el procedimiento`})]})]})})})},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{children:(0,f.jsx)(l,{titulo:`Specs`,children:(0,f.jsxs)(o,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Size`}),(0,f.jsx)(`td`,{children:`md · 480px`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,f.jsx)(`td`,{children:`New Procedure, o New Condition desde Add Condition.`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Next/Save disabled`}),(0,f.jsx)(`td`,{children:`Sin procedimiento elegido o sin superficies marcadas.`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Save, en Procedure/Surfaces`}),(0,f.jsx)(`td`,{children:`Guarda el procedimiento (sin vínculos) y hace aparecer Link to finding y Link to diagnosis.`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Save, en Link to diagnosis`}),(0,f.jsx)(`td`,{children:`Guarda los vínculos sobre el procedimiento ya creado y cierra.`})]})]})})})},S=[`Playground`,`FromAddCondition`,`SurfacesStep`,`DescriptorsStep`,`LinkToFindingStep`,`LinkToDiagnosisStep`,`Parts`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'condition'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D2140 on surface$/i), pulsar(/next step/i), esperar(/apply to unset/i))
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'condition'
  },
  play: secuencia(pulsar(/^D2740 on tooth$/i), pulsar(/next step/i), esperar(/tap a pill again to clear it/i))
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D0120\\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/^save$/i), esperar(/localized periodontal pocketing/i))
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^D0120\\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/^save$/i), pulsar(/next step/i), esperar(/K05\\.31/))
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
      <Bloque titulo="Steps" nota="Cada paso con su nombre en el indicador, como en todos los drawers.">
        <Tabla encabezado={["Step", "What it asks", "When it shows"]} minimo={560}>
          <tr><td className="font-semibold">Procedure</td><td>Buscar y elegir el procedimiento (Existing o Planned), con el filtro por área.</td><td>Siempre</td></tr>
          <tr><td className="font-semibold">Surfaces</td><td>Marcar las superficies, pieza por pieza. Save de este paso guarda el procedimiento.</td><td>Si el procedimiento va en superficie</td></tr>
          <tr><td className="font-semibold">Descriptors</td><td>La guía visual de descriptores (DescriptorFields), opcional. Save de este paso guarda el procedimiento.</td><td>Desde Add Condition</td></tr>
          <tr><td className="font-semibold">Link to finding</td><td>Vincular los hallazgos que resuelve, por nombre, con estado y fecha, sobre el procedimiento ya guardado.</td><td>Si es Planned, recién después de guardar el procedimiento</td></tr>
          <tr><td className="font-semibold">Link to diagnosis</td><td>Vincular los diagnósticos que trata: código ICD-10 y superficies, sin estado ni fecha. Save de este paso guarda los vínculos.</td><td>Si es Planned, recién después de guardar el procedimiento</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Next/Save disabled</td><td>Sin procedimiento elegido o sin superficies marcadas.</td></tr>
          <tr><td className="font-semibold">Save, en Procedure/Surfaces</td><td>Guarda el procedimiento (sin vínculos) y hace aparecer Link to finding y Link to diagnosis.</td></tr>
          <tr><td className="font-semibold">Save, en Link to diagnosis</td><td>Guarda los vínculos sobre el procedimiento ya creado y cierra.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}}})))()}C();export{_ as DescriptorsStep,h as FromAddCondition,y as LinkToDiagnosisStep,v as LinkToFindingStep,b as Parts,m as Playground,x as Specs,g as SurfacesStep,S as __namedExportsOrder,p as default};
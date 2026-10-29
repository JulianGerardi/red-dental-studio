import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a}from"./play-Dr1R_I1D.js";import{d as o,i as s,t as c}from"./kit-CWUgB5-0.js";import{n as l,t as u}from"./ExtraOralExam-DfaInehu.js";var d,f,p,m,h,g,_;function v(){return(v=e((()=>{l(),a(),o(),d=t(),f={title:`Components/Clinical/ExtraOralExam`,component:u,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`El examen Extraoral completo: el gráfico de regiones ([ExtraOralDiagram](/docs/components-clinical-dental-extraoraldiagram--docs)) en vez del odontograma, con las acciones y el panel de Findings de [ExamLayout](/docs/components-clinical-examlayout--docs).`,``,"**Add Condition abre el drawer propio** ([RegionConditionDrawer](/docs/components-clinical-dental-regionconditiondrawer--docs)), no el de diente: `ExamLayout` ahora acepta `onCondicion` para reemplazarlo por examen. Add Procedure sigue siendo el genérico -pendiente, no es lo que pidió esta tanda-.",``,`**Probalo:** clickeá una región del gráfico -queda en ámbar- y después "Add Condition": el drawer abre con esa región ya puesta en "Selected area".`].join(`
`)}}}},p={},m={play:i(n(/^Scalp$/i),r(/add condition/i))},h={play:i(n(/^Right Eye$/i),n(/^Add Condition$/i),n(/^Blister/i),n(/select descriptors/i),n(/^Painful$/i),n(/^Save$/i),r(/Blister charted on Right Eye/i))},g={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,d.jsx)(s,{children:(0,d.jsx)(c,{titulo:`onCondicion`,nota:`La única diferencia con un examen por diente: ExamLayout recibe onCondicion y, al tocar Add Condition, abre RegionConditionDrawer en vez de NewProcedureDrawer. Add Procedure no cambia.`,children:(0,d.jsx)(`div`,{})})})},_=[`Default`,`RegionSelected`,`ConditionCharted`,`Parts`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^Scalp$/i), esperar(/add condition/i))
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^Right Eye$/i), pulsar(/^Add Condition$/i), pulsar(/^Blister/i), pulsar(/select descriptors/i), pulsar(/^Painful$/i), pulsar(/^Save$/i), esperar(/Blister charted on Right Eye/i))
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
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
      <Bloque titulo="onCondicion" nota="La única diferencia con un examen por diente: ExamLayout recibe onCondicion y, al tocar Add Condition, abre RegionConditionDrawer en vez de NewProcedureDrawer. Add Procedure no cambia.">
        <div />
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}}})))()}v();export{h as ConditionCharted,p as Default,g as Parts,m as RegionSelected,_ as __namedExportsOrder,f as default};
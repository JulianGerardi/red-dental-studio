import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,d as i,m as a}from"./ConsentBlock-CpK5vaP4.js";import{a as o,c as s,d as c,f as l,i as u,l as d,n as f,o as p,r as m,s as h}from"./TreatmentPlanSection-CpW1sThD.js";function g(){let[e,t]=(0,_.useState)([i[0].id]);return(0,v.jsx)(d,{filas:i.slice(0,5),acciones:!0,seleccion:e,onSeleccion:t,onAccion:()=>{},onCompletar:()=>{}})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{_=t(),a(),l(),v=n(),y={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},b={parameters:{layout:`fullscreen`},render:()=>(0,v.jsx)(f,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},x={parameters:{layout:`fullscreen`},render:()=>(0,v.jsx)(o,{onClose:()=>{}})},S={parameters:{layout:`fullscreen`},render:()=>(0,v.jsx)(p,{onClose:()=>{}})},C={parameters:{layout:`fullscreen`},render:()=>(0,v.jsx)(u,{onClose:()=>{}})},w={parameters:{layout:`fullscreen`},render:()=>(0,v.jsx)(m,{onConfirm:()=>{},onClose:()=>{}})},T={render:()=>(0,v.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,v.jsx)(h,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,v.jsx)(h,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},E={render:()=>(0,v.jsx)(`div`,{className:`w-[300px]`,children:(0,v.jsx)(s,{vista:`caso`,casoId:r[0].id,favoritos:[r[0].id],onFavorito:()=>{},onUnassigned:()=>{},onCaso:()=>{}})})},D={render:()=>(0,v.jsx)(g,{})},O={render:()=>(0,v.jsx)(d,{filas:i.slice(0,5),onAccion:()=>{}})},k={render:()=>(0,v.jsx)(c,{caso:r[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onGrupo:()=>{},onCompletar:()=>{}})},A=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`ProceduresTable`,`ProceduresTableReadOnly`,`CaseView`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail vista="caso" casoId={CASOS[0].id} favoritos={[CASOS[0].id]} onFavorito={() => {}} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ConSeleccion />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onGrupo={() => {}} onCompletar={() => {}} />
}`,...k.parameters?.docs?.source}}}})))()}j();export{b as BaseDialog,E as CaseRail,k as CaseView,C as CompleteDialog,w as DeleteCaseDialog,x as MoveDialog,S as NewGroupDialog,D as ProceduresTable,O as ProceduresTableReadOnly,T as RadioOption,A as __namedExportsOrder,y as default};
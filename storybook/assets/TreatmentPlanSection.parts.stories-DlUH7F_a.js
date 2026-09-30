import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,f as a,i as o,l as s,n as c,o as l,p as u,r as d,s as f,u as p}from"./TreatmentPlanSection-Vm1WChRq.js";import{a as m,d as h,m as g}from"./ConsentBlock-BkAO5rLO.js";function _(){let[e,t]=(0,v.useState)([h[0].id]);return(0,y.jsx)(p,{filas:h.slice(0,5),acciones:!0,seleccion:e,onSeleccion:t,onAccion:()=>{},onCompletar:()=>{}})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{v=t(),g(),u(),y=n(),b={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},x={parameters:{layout:`fullscreen`},render:()=>(0,y.jsx)(c,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},S={parameters:{layout:`fullscreen`},render:()=>(0,y.jsx)(r,{onClose:()=>{}})},C={parameters:{layout:`fullscreen`},render:()=>(0,y.jsx)(l,{onClose:()=>{}})},w={parameters:{layout:`fullscreen`},render:()=>(0,y.jsx)(o,{onClose:()=>{}})},T={parameters:{layout:`fullscreen`},render:()=>(0,y.jsx)(d,{onConfirm:()=>{},onClose:()=>{}})},E={render:()=>(0,y.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,y.jsx)(i,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,y.jsx)(i,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},D={render:()=>(0,y.jsx)(`div`,{className:`w-[300px]`,children:(0,y.jsx)(s,{vista:`caso`,casoId:m[0].id,favoritos:[m[0].id],onFavorito:()=>{},onUnassigned:()=>{},onCaso:()=>{}})})},O={render:()=>(0,y.jsx)(_,{})},k={render:()=>(0,y.jsx)(p,{filas:h.slice(0,5),onAccion:()=>{}})},A={render:()=>(0,y.jsx)(a,{caso:m[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},j={render:()=>(0,y.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Signed`,`Pending`,`Not sent`,`Expired`].map(e=>(0,y.jsx)(f,{estado:e},e))})},M=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`ProceduresTable`,`ProceduresTableReadOnly`,`CaseView`,`ConsentStatus`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail vista="caso" casoId={CASOS[0].id} favoritos={[CASOS[0].id]} onFavorito={() => {}} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <ConSeleccion />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...j.parameters?.docs?.source}}}})))()}N();export{x as BaseDialog,D as CaseRail,A as CaseView,w as CompleteDialog,j as ConsentStatus,T as DeleteCaseDialog,S as MoveDialog,C as NewGroupDialog,O as ProceduresTable,k as ProceduresTableReadOnly,E as RadioOption,M as __namedExportsOrder,b as default};
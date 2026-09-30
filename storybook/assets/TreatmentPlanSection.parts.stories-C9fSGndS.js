import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,f as a,i as o,l as s,n as c,o as l,p as u,r as d,s as f,u as p}from"./TreatmentPlanSection-BKgKdgYh.js";import{a as m,d as h,m as g}from"./ConsentBlock-CZvtu_42.js";import{a as _,i as v,n as y,r as b}from"./play-CDw6varG.js";function x(){let[e,t]=(0,S.useState)([h[0].id]);return(0,C.jsx)(p,{filas:h.slice(0,5),acciones:!0,seleccion:e,onSeleccion:t,onAccion:()=>{},onCompletar:()=>{}})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{S=t(),g(),b(),u(),C=n(),w={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},T={parameters:{layout:`fullscreen`},render:()=>(0,C.jsx)(c,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},E={parameters:{layout:`fullscreen`},render:()=>(0,C.jsx)(r,{onClose:()=>{}})},D={parameters:{layout:`fullscreen`},render:()=>(0,C.jsx)(l,{onClose:()=>{}})},O={parameters:{layout:`fullscreen`},render:()=>(0,C.jsx)(o,{onClose:()=>{}})},k={parameters:{layout:`fullscreen`},render:()=>(0,C.jsx)(d,{onConfirm:()=>{},onClose:()=>{}})},A={render:()=>(0,C.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,C.jsx)(i,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,C.jsx)(i,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},j={render:()=>(0,C.jsx)(`div`,{className:`w-[300px]`,children:(0,C.jsx)(s,{vista:`caso`,casoId:m[0].id,favoritos:[m[0].id],onFavorito:()=>{},onUnassigned:()=>{},onCaso:()=>{}})})},M={render:()=>(0,C.jsx)(x,{})},N={render:()=>(0,C.jsx)(p,{filas:h.slice(0,5),onAccion:()=>{}})},P={render:()=>(0,C.jsx)(a,{caso:m[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},F={render:()=>(0,C.jsx)(a,{caso:{...m[0],estado:`Pending`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},I={render:()=>(0,C.jsx)(a,{caso:{...m[0],estado:`Presented`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},L={render:()=>(0,C.jsx)(a,{caso:{...m[0],estado:`Accepted`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},R={render:()=>(0,C.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Signed`,`Pending`,`Not sent`,`Expired`].map(e=>(0,C.jsx)(f,{estado:e},e))})},z={render:()=>(0,C.jsx)(a,{caso:m[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}}),play:_(v(/collapse case/i),y(/^total:/i))},B=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`ProceduresTable`,`ProceduresTableReadOnly`,`CaseView`,`CaseViewPending`,`CaseViewPresented`,`CaseViewAccepted`,`ConsentStatus`,`CaseViewCollapsed`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail vista="caso" casoId={CASOS[0].id} favoritos={[CASOS[0].id]} onFavorito={() => {}} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <ConSeleccion />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Pending'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Presented'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Accepted'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i))
}`,...z.parameters?.docs?.source}}}})))()}V();export{T as BaseDialog,j as CaseRail,P as CaseView,L as CaseViewAccepted,z as CaseViewCollapsed,F as CaseViewPending,I as CaseViewPresented,O as CompleteDialog,R as ConsentStatus,k as DeleteCaseDialog,E as MoveDialog,D as NewGroupDialog,M as ProceduresTable,N as ProceduresTableReadOnly,A as RadioOption,B as __namedExportsOrder,w as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{a,c as o,d as s,g as c,h as l,i as u,l as d,o as f,p,r as m,s as h,t as g,u as _}from"./TreatmentPlanSection-hxydBZ5p.js";import{n as v,t as y}from"./pencil-MjfcJKGT.js";import{a as b,i as x,n as S,r as C}from"./play-CDw6varG.js";import{s as w,t as T,u as E}from"./treatment-plan-C_EmF93Q.js";function D(){let[e,t]=(0,O.useState)([w[0].id]);return(0,k.jsx)(p,{filas:w.slice(0,5),acciones:!0,seleccion:e,onSeleccion:t,onAccion:()=>{},onCompletar:()=>{}})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{O=t(),v(),r(),E(),C(),c(),k=n(),A={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},j={parameters:{layout:`fullscreen`},render:()=>(0,k.jsx)(u,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},M={parameters:{layout:`fullscreen`},render:()=>(0,k.jsx)(h,{onClose:()=>{}})},N={parameters:{layout:`fullscreen`},render:()=>(0,k.jsx)(o,{onClose:()=>{}})},P={parameters:{layout:`fullscreen`},render:()=>(0,k.jsx)(f,{onClose:()=>{}})},F={parameters:{layout:`fullscreen`},render:()=>(0,k.jsx)(a,{onConfirm:()=>{},onClose:()=>{}})},I={render:()=>(0,k.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,k.jsx)(_,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,k.jsx)(_,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},L={render:()=>(0,k.jsx)(`div`,{className:`w-[300px]`,children:(0,k.jsx)(s,{casos:T,vista:`caso`,casoId:T[0].id,onUnassigned:()=>{},onCaso:()=>{}})})},R={render:()=>(0,k.jsx)(D,{})},z={render:()=>(0,k.jsx)(p,{filas:w.slice(0,5),onAccion:()=>{}})},B={render:()=>(0,k.jsx)(l,{caso:T[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},V={render:()=>(0,k.jsx)(l,{caso:{...T[0],estado:`Pending`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},H={render:()=>(0,k.jsx)(l,{caso:{...T[0],estado:`Presented`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},U={render:()=>(0,k.jsx)(l,{caso:{...T[0],estado:`Accepted`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},W={render:()=>(0,k.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Signed`,`Pending`,`Not sent`,`Expired`].map(e=>(0,k.jsx)(d,{estado:e},e))})},G={render:()=>(0,k.jsx)(l,{caso:T[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}}),play:b(x(/collapse case/i),S(/^total:/i))},K={render:()=>(0,k.jsx)(i,{delayDuration:150,children:(0,k.jsxs)(`div`,{className:`flex items-center gap-6 text-ink-medium`,children:[(0,k.jsx)(g,{habilitado:!0,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case`,children:(0,k.jsx)(y,{className:`size-4`})}),(0,k.jsx)(g,{habilitado:!1,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case (disabled)`,children:(0,k.jsx)(y,{className:`size-4`})})]})})},q={render:()=>(0,k.jsxs)(`div`,{className:`flex w-[420px] flex-col gap-3`,children:[(0,k.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 1 - $30 `,(0,k.jsx)(m,{})]}),(0,k.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 2 - $30 `,(0,k.jsx)(m,{cita:{fecha:`Sep 2, 2026`,hora:`10:00 AM`,proveedor:`Perez Martinez`}})]})]})},J={render:()=>(0,k.jsx)(l,{caso:{...T[0],sinPermiso:!0},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},Y=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`ProceduresTable`,`ProceduresTableReadOnly`,`CaseView`,`CaseViewPending`,`CaseViewPresented`,`CaseViewAccepted`,`ConsentStatus`,`CaseViewCollapsed`,`CaseAction`,`VisitAppointment`,`CaseViewLimitedAccess`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail casos={CASOS} vista="caso" casoId={CASOS[0].id} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <ConSeleccion />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} />
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Pending'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Presented'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Accepted'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i))
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-6 text-ink-medium">
        <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case"><Pencil className="size-4" /></AccionCaso>
        <AccionCaso habilitado={false} tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case (disabled)"><Pencil className="size-4" /></AccionCaso>
      </div>
    </TooltipProvider>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[420px] flex-col gap-3">
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 1 - $30 <CitaVisita /></div>
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 2 - $30 <CitaVisita cita={{
        fecha: 'Sep 2, 2026',
        hora: '10:00 AM',
        proveedor: 'Perez Martinez'
      }} /></div>
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    sinPermiso: true
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...J.parameters?.docs?.source}}}})))()}X();export{j as BaseDialog,K as CaseAction,L as CaseRail,B as CaseView,U as CaseViewAccepted,G as CaseViewCollapsed,J as CaseViewLimitedAccess,V as CaseViewPending,H as CaseViewPresented,P as CompleteDialog,W as ConsentStatus,F as DeleteCaseDialog,M as MoveDialog,N as NewGroupDialog,R as ProceduresTable,z as ProceduresTableReadOnly,I as RadioOption,q as VisitAppointment,Y as __namedExportsOrder,A as default};
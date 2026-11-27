import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-Brbi_Dmq.js";import{$ as i,G as a,J as o,Q as s,U as c,W as l,X as u,Y as d,Z as f,at as p,et as m,ot as h,q as g}from"./data-table-BzR2zSfv.js";import{n as _}from"./ConsentDetail-DK9m6WvU.js";import{n as v,t as y}from"./pencil-MjfcJKGT.js";import{h as b,n as x}from"./treatment-plan-C-0A7vXg.js";import{i as S,n as C,o as w,r as T}from"./play-Dr1R_I1D.js";var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{v(),n(),b(),T(),h(),E=t(),D={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},O={parameters:{layout:`fullscreen`},render:()=>(0,E.jsx)(o,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},k={parameters:{layout:`fullscreen`},render:()=>(0,E.jsx)(f,{onClose:()=>{}})},A={parameters:{layout:`fullscreen`},render:()=>(0,E.jsx)(s,{onClose:()=>{}})},j={parameters:{layout:`fullscreen`},render:()=>(0,E.jsx)(u,{onClose:()=>{}})},M={parameters:{layout:`fullscreen`},render:()=>(0,E.jsx)(d,{onConfirm:()=>{},onClose:()=>{}})},N={render:()=>(0,E.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,E.jsx)(i,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,E.jsx)(i,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},P={render:()=>(0,E.jsx)(`div`,{className:`w-[300px]`,children:(0,E.jsx)(m,{casos:x,vista:`caso`,casoId:x[0].id,onUnassigned:()=>{},onCaso:()=>{}})})},F={render:()=>(0,E.jsx)(p,{caso:x[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},I={render:()=>(0,E.jsx)(p,{caso:{...x[0],estado:`Pending`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},L={render:()=>(0,E.jsx)(p,{caso:{...x[0],estado:`Presented`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},R={render:()=>(0,E.jsx)(p,{caso:{...x[0],estado:`Accepted`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},z={render:()=>(0,E.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Not required`,`Not generated`,`Requested`,`Accepted`,`Rejected`,`Discarded`].map(e=>(0,E.jsx)(_,{estado:e},e))})},B={render:()=>(0,E.jsx)(p,{caso:x[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}}),play:w(S(/collapse case/i),C(/^total:/i))},V={render:()=>(0,E.jsx)(r,{delayDuration:150,children:(0,E.jsxs)(`div`,{className:`flex items-center gap-6 text-ink-medium`,children:[(0,E.jsx)(c,{habilitado:!0,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case`,children:(0,E.jsx)(y,{className:`size-4`})}),(0,E.jsx)(c,{habilitado:!1,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case (disabled)`,children:(0,E.jsx)(y,{className:`size-4`})})]})})},H={render:()=>(0,E.jsxs)(`div`,{className:`flex w-[420px] flex-col gap-3`,children:[(0,E.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 1 - $30 `,(0,E.jsx)(g,{})]}),(0,E.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 2 - $30 `,(0,E.jsx)(g,{cita:{fecha:`Sep 2, 2026`,hora:`10:00 AM`,proveedor:`Perez Martinez`}})]})]})},U={render:()=>(0,E.jsx)(p,{caso:{...x[0],sinPermiso:!0},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},W={render:()=>(0,E.jsx)(a,{total:`$1,872.00`,onClick:()=>{}})},G={render:()=>(0,E.jsx)(l,{onActualizar:()=>{}})},K=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`CaseView`,`CaseViewPending`,`CaseViewPresented`,`CaseViewAccepted`,`ConsentStatus`,`CaseViewCollapsed`,`CaseAction`,`VisitAppointment`,`CaseViewLimitedAccess`,`TotalAmountButton`,`EstimateNotice`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail casos={CASOS} vista="caso" casoId={CASOS[0].id} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Pending'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Presented'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Accepted'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Not required', 'Not generated', 'Requested', 'Accepted', 'Rejected', 'Discarded'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i))
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-6 text-ink-medium">
        <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case"><Pencil className="size-4" /></AccionCaso>
        <AccionCaso habilitado={false} tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case (disabled)"><Pencil className="size-4" /></AccionCaso>
      </div>
    </TooltipProvider>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[420px] flex-col gap-3">
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 1 - $30 <CitaVisita /></div>
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 2 - $30 <CitaVisita cita={{
        fecha: 'Sep 2, 2026',
        hora: '10:00 AM',
        proveedor: 'Perez Martinez'
      }} /></div>
    </div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    sinPermiso: true
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <BotonTotal total="$1,872.00" onClick={() => {}} />
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <AvisoEstimacion onActualizar={() => {}} />
}`,...G.parameters?.docs?.source}}}})))()}q();export{O as BaseDialog,V as CaseAction,P as CaseRail,F as CaseView,R as CaseViewAccepted,B as CaseViewCollapsed,U as CaseViewLimitedAccess,I as CaseViewPending,L as CaseViewPresented,j as CompleteDialog,z as ConsentStatus,M as DeleteCaseDialog,G as EstimateNotice,k as MoveDialog,A as NewGroupDialog,N as RadioOption,W as TotalAmountButton,H as VisitAppointment,K as __namedExportsOrder,D as default};
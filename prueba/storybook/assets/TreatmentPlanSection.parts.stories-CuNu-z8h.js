import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{G as i,H as a,J as o,K as s,Q as c,W as l,X as u,Y as d,Z as f,it as p,q as m,rt as h}from"./data-table-BlsoBtWF.js";import{n as g,t as _}from"./pencil-MjfcJKGT.js";import{f as v,t as y}from"./treatment-plan-64OOXj8b.js";import{i as b,n as x,o as S,r as C}from"./play-Dr1R_I1D.js";var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{g(),n(),v(),C(),p(),w=t(),T={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},E={parameters:{layout:`fullscreen`},render:()=>(0,w.jsx)(i,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},D={parameters:{layout:`fullscreen`},render:()=>(0,w.jsx)(o,{onClose:()=>{}})},O={parameters:{layout:`fullscreen`},render:()=>(0,w.jsx)(d,{onClose:()=>{}})},k={parameters:{layout:`fullscreen`},render:()=>(0,w.jsx)(m,{onClose:()=>{}})},A={parameters:{layout:`fullscreen`},render:()=>(0,w.jsx)(s,{onConfirm:()=>{},onClose:()=>{}})},j={render:()=>(0,w.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,w.jsx)(f,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,w.jsx)(f,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},M={render:()=>(0,w.jsx)(`div`,{className:`w-[300px]`,children:(0,w.jsx)(c,{casos:y,vista:`caso`,casoId:y[0].id,onUnassigned:()=>{},onCaso:()=>{}})})},N={render:()=>(0,w.jsx)(h,{caso:y[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},P={render:()=>(0,w.jsx)(h,{caso:{...y[0],estado:`Pending`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},F={render:()=>(0,w.jsx)(h,{caso:{...y[0],estado:`Presented`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},I={render:()=>(0,w.jsx)(h,{caso:{...y[0],estado:`Accepted`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},L={render:()=>(0,w.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Signed`,`Pending`,`Not sent`,`Expired`].map(e=>(0,w.jsx)(u,{estado:e},e))})},R={render:()=>(0,w.jsx)(h,{caso:y[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}}),play:S(b(/collapse case/i),x(/^total:/i))},z={render:()=>(0,w.jsx)(r,{delayDuration:150,children:(0,w.jsxs)(`div`,{className:`flex items-center gap-6 text-ink-medium`,children:[(0,w.jsx)(a,{habilitado:!0,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case`,children:(0,w.jsx)(_,{className:`size-4`})}),(0,w.jsx)(a,{habilitado:!1,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case (disabled)`,children:(0,w.jsx)(_,{className:`size-4`})})]})})},B={render:()=>(0,w.jsxs)(`div`,{className:`flex w-[420px] flex-col gap-3`,children:[(0,w.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 1 - $30 `,(0,w.jsx)(l,{})]}),(0,w.jsxs)(`div`,{className:`flex items-center justify-between text-[14px] font-semibold text-ink`,children:[`Visit 2 - $30 `,(0,w.jsx)(l,{cita:{fecha:`Sep 2, 2026`,hora:`10:00 AM`,proveedor:`Perez Martinez`}})]})]})},V={render:()=>(0,w.jsx)(h,{caso:{...y[0],sinPermiso:!0},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},H=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`CaseView`,`CaseViewPending`,`CaseViewPresented`,`CaseViewAccepted`,`ConsentStatus`,`CaseViewCollapsed`,`CaseAction`,`VisitAppointment`,`CaseViewLimitedAccess`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail casos={CASOS} vista="caso" casoId={CASOS[0].id} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Pending'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Presented'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Accepted'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i))
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-6 text-ink-medium">
        <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case"><Pencil className="size-4" /></AccionCaso>
        <AccionCaso habilitado={false} tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case (disabled)"><Pencil className="size-4" /></AccionCaso>
      </div>
    </TooltipProvider>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[420px] flex-col gap-3">
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 1 - $30 <CitaVisita /></div>
      <div className="flex items-center justify-between text-[14px] font-semibold text-ink">Visit 2 - $30 <CitaVisita cita={{
        fecha: 'Sep 2, 2026',
        hora: '10:00 AM',
        proveedor: 'Perez Martinez'
      }} /></div>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    sinPermiso: true
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...V.parameters?.docs?.source}}}})))()}U();export{E as BaseDialog,z as CaseAction,M as CaseRail,N as CaseView,I as CaseViewAccepted,R as CaseViewCollapsed,V as CaseViewLimitedAccess,P as CaseViewPending,F as CaseViewPresented,k as CompleteDialog,L as ConsentStatus,A as DeleteCaseDialog,D as MoveDialog,O as NewGroupDialog,j as RadioOption,B as VisitAppointment,H as __namedExportsOrder,T as default};
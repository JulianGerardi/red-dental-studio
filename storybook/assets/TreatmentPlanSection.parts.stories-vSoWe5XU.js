import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./tooltip-6ep9-x7U.js";import{a,c as o,d as s,i as c,l,m as u,o as d,p as f,r as p,s as m,t as h,u as g}from"./TreatmentPlanSection-DtZE-PtM.js";import{n as _,t as v}from"./pencil-MjfcJKGT.js";import{a as y,d as b,m as x}from"./ConsentBlock-BqlLykFZ.js";import{a as S,i as C,n as w,r as T}from"./play-CDw6varG.js";function E(){let[e,t]=(0,D.useState)([b[0].id]);return(0,O.jsx)(s,{filas:b.slice(0,5),acciones:!0,seleccion:e,onSeleccion:t,onAccion:()=>{},onCompletar:()=>{}})}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{D=t(),_(),r(),x(),T(),u(),O=n(),k={title:`Components/Clinical/TreatmentPlanSection parts`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560}}}},A={parameters:{layout:`fullscreen`},render:()=>(0,O.jsx)(p,{titulo:`Discard case`,bajada:[`This action can be undone.`],texto:[`Are you sure you want to discard this case?`],onConfirm:()=>{},onClose:()=>{},confirmar:`Discard`})},j={parameters:{layout:`fullscreen`},render:()=>(0,O.jsx)(d,{onClose:()=>{}})},M={parameters:{layout:`fullscreen`},render:()=>(0,O.jsx)(m,{onClose:()=>{}})},N={parameters:{layout:`fullscreen`},render:()=>(0,O.jsx)(a,{onClose:()=>{}})},P={parameters:{layout:`fullscreen`},render:()=>(0,O.jsx)(c,{onConfirm:()=>{},onClose:()=>{}})},F={render:()=>(0,O.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-2`,children:[(0,O.jsx)(l,{on:!0,titulo:`Move all procedures`,detalle:`Every procedure of this case goes to the destination.`,onClick:()=>{}}),(0,O.jsx)(l,{on:!1,titulo:`Copy procedures`,detalle:`Keep them in this case too.`,onClick:()=>{}})]})},I={render:()=>(0,O.jsx)(`div`,{className:`w-[300px]`,children:(0,O.jsx)(g,{vista:`caso`,casoId:y[0].id,favoritos:[y[0].id],onFavorito:()=>{},onUnassigned:()=>{},onCaso:()=>{}})})},L={render:()=>(0,O.jsx)(E,{})},R={render:()=>(0,O.jsx)(s,{filas:b.slice(0,5),onAccion:()=>{}})},z={render:()=>(0,O.jsx)(f,{caso:y[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},B={render:()=>(0,O.jsx)(f,{caso:{...y[0],estado:`Pending`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},V={render:()=>(0,O.jsx)(f,{caso:{...y[0],estado:`Presented`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},H={render:()=>(0,O.jsx)(f,{caso:{...y[0],estado:`Accepted`},favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}})},U={render:()=>(0,O.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`Signed`,`Pending`,`Not sent`,`Expired`].map(e=>(0,O.jsx)(o,{estado:e},e))})},W={render:()=>(0,O.jsx)(f,{caso:y[0],favorito:!1,onFavorito:()=>{},onDialogo:()=>{},onMover:()=>{},onCompletar:()=>{}}),play:S(C(/collapse case/i),w(/^total:/i))},G={render:()=>(0,O.jsx)(i,{delayDuration:150,children:(0,O.jsxs)(`div`,{className:`flex items-center gap-6 text-ink-medium`,children:[(0,O.jsx)(h,{habilitado:!0,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case`,children:(0,O.jsx)(v,{className:`size-4`})}),(0,O.jsx)(h,{habilitado:!1,tooltip:`Rename case`,tooltipDeshabilitado:`Only while planning`,"aria-label":`Rename case (disabled)`,children:(0,O.jsx)(v,{className:`size-4`})})]})})},K=[`BaseDialog`,`MoveDialog`,`NewGroupDialog`,`CompleteDialog`,`DeleteCaseDialog`,`RadioOption`,`CaseRail`,`ProceduresTable`,`ProceduresTableReadOnly`,`CaseView`,`CaseViewPending`,`CaseViewPresented`,`CaseViewAccepted`,`ConsentStatus`,`CaseViewCollapsed`,`CaseAction`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoMover onClose={() => {}} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoNuevoGrupo onClose={() => {}} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoCompletar onClose={() => {}} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]"><Rail vista="caso" casoId={CASOS[0].id} favoritos={[CASOS[0].id]} onFavorito={() => {}} onUnassigned={() => {}} onCaso={() => {}} /></div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <ConSeleccion />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} />
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Pending'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Presented'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={{
    ...CASOS[0],
    estado: 'Accepted'
  }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map(e => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i))
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-6 text-ink-medium">
        <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case"><Pencil className="size-4" /></AccionCaso>
        <AccionCaso habilitado={false} tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case (disabled)"><Pencil className="size-4" /></AccionCaso>
      </div>
    </TooltipProvider>
}`,...G.parameters?.docs?.source}}}})))()}q();export{A as BaseDialog,G as CaseAction,I as CaseRail,z as CaseView,H as CaseViewAccepted,W as CaseViewCollapsed,B as CaseViewPending,V as CaseViewPresented,N as CompleteDialog,U as ConsentStatus,P as DeleteCaseDialog,j as MoveDialog,M as NewGroupDialog,L as ProceduresTable,R as ProceduresTableReadOnly,F as RadioOption,K as __namedExportsOrder,k as default};
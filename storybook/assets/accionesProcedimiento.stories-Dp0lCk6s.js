import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{I as n}from"./data-table-DAd4T8F6.js";import{i as r,r as i}from"./pill-BGZIiHee.js";import{n as a,t as o}from"./row-actions-menu-DKTSePq6.js";import{a as s,c,f as l,i as u,o as d,r as f,s as p,t as m}from"./accionesProcedimiento-DTsF7M-S.js";import{C as h,o as g}from"./clinical-mode-C-Zys8pS.js";import{f as _,i as v,l as y,n as b,o as x,t as S,u as C}from"./kit-Di92TvVK.js";var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{h(),r(),a(),_(),l(),n(),w=t(),T=[`sin-plan`,`planificando`,`esperando-consentimiento`,`ejecutable`,`cerrado`],E={id:`p1`,codigo:`D2954`,nombre:`Prefabricated post and core in addition to crown`,pieza:19},D={title:`Components/Clinical/Procedure actions`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/clinical/accionesProcedimiento.tsx`,jira:[`CON-2833`,`CON-2834`,`CON-2939`,`CON-2835`,`CON-4052`],story:{inline:!1,iframeHeight:420},description:{component:["El menú ⋮ de un procedimiento y sus diálogos (`@/components/clinical/accionesProcedimiento`). Qué acciones ofrece depende del **estado del procedimiento** y de **en qué está su caso**: mientras se planea o espera el consentimiento, Start y Complete quedan bloqueados y dicen por qué (CON-2833).",``,`**Cómo se usa:** *Edit* guarda una nota sin cambiar el estado. *Refer*, *Discard* y *Discontinue* piden confirmar (CON-2939). *Delete* pregunta el alcance: sacarlo sólo del caso (queda en Unassigned Items) o borrarlo del paciente.`,``,`**Probalo:** en *Playground* elegí el estado del procedimiento y la situación del plan desde *Controls*: el menú abierto cambia. *Parts* dice qué hace cada pieza y *States* muestra la matriz completa.`].join(`
`)}}},args:{status:`Pending`,plan:`ejecutable`},argTypes:{status:{control:`select`,options:g,description:`El estado del procedimiento.`},plan:{control:`select`,options:T,description:`sin-plan: suelto · planificando · esperando-consentimiento · ejecutable: caso aceptado · cerrado.`}}},O={controls:{disable:!0},docs:{story:{inline:!0}}},k={layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:520}}},A=()=>{},j={render:({status:e,plan:t})=>(0,w.jsx)(`div`,{className:`h-72`,children:(0,w.jsx)(o,{label:`${E.codigo}`,abierto:!0,children:(0,w.jsx)(d,{grupos:c(e,t),onElegir:A})})})},M={parameters:O,render:()=>(0,w.jsxs)(v,{children:[(0,w.jsx)(S,{titulo:`Parts`,children:(0,w.jsx)(C,{partes:[[`Menu items`,`Los ítems del ⋮, en grupos con separador. Los bloqueados quedan apagados y su tooltip explica el motivo.`,`ItemsAcciones`],[`Edit procedure`,`Guarda la nota del procedimiento.`,`DialogoEditar`],[`Status change`,`Confirma Refer, Discard o Discontinue y dice de qué estado a cuál pasa.`,`DialogoCambioEstado`],[`Delete`,`Pregunta el alcance: Delete from Tx o del paciente.`,`DialogoBorrar`],[`Status pill`,`El color de cada estado del procedimiento.`,`TONO_PROCEDIMIENTO`]]})}),(0,w.jsx)(S,{titulo:`Actions`,children:(0,w.jsx)(y,{encabezado:[`Action`,`Label`,`Moves the procedure to`],minimo:480,children:Object.keys(m).map(e=>(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-mono text-[12px]`,children:e}),(0,w.jsx)(`td`,{className:`font-semibold`,children:m[e].label}),(0,w.jsx)(`td`,{children:m[e].a??`—`})]},e))})}),(0,w.jsx)(S,{titulo:`Status pill`,children:(0,w.jsx)(x,{children:g.map(e=>(0,w.jsx)(b,{rotulo:p[e],children:(0,w.jsx)(i,{tone:p[e],children:e})},e))})})]})},N={parameters:O,render:()=>(0,w.jsx)(v,{children:(0,w.jsx)(S,{titulo:`States`,nota:`Filas: estado del procedimiento. Columnas: situación del plan. Tachado = bloqueado (disabled).`,children:(0,w.jsx)(y,{encabezado:[`Status`,...T],minimo:860,arriba:!0,children:g.map(e=>(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),T.map(t=>(0,w.jsx)(`td`,{className:`text-[12px]`,children:c(e,t).flat().map(e=>(0,w.jsx)(`span`,{className:e.bloqueada?`mr-1.5 text-ink-faint line-through`:`mr-1.5`,children:m[e.accion].label},e.accion))},t))]},e))})})})},P={parameters:k,render:()=>(0,w.jsx)(s,{procedimiento:E,nota:`Wait for the core buildup to set.`,caso:`Endodontic Treatment`,onClose:A,onGuardar:A})},F={parameters:k,render:()=>(0,w.jsx)(u,{accion:`refer`,procedimiento:E,desde:`Pending`,caso:`Endodontic Treatment`,onCancel:A,onConfirm:A})},I={parameters:k,render:()=>(0,w.jsx)(u,{accion:`discard`,procedimiento:E,desde:`Planned`,onCancel:A,onConfirm:A})},L={parameters:k,render:()=>(0,w.jsx)(u,{accion:`discontinue`,procedimiento:E,desde:`In progress`,caso:`Endodontic Treatment`,onCancel:A,onConfirm:A})},R={parameters:k,render:()=>(0,w.jsx)(f,{procedimiento:E,caso:`Endodontic Treatment`,onCancel:A,onConfirm:A})},z=[`Playground`,`Parts`,`States`,`EditProcedure`,`ReferProcedure`,`DiscardProcedure`,`DiscontinueProcedure`,`DeleteProcedure`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: ({
    status,
    plan
  }) => <div className="h-72">
      <RowActionsMenu label={\`\${PROC.codigo}\`} abierto>
        <ItemsAcciones grupos={accionesDe(status, plan)} onElegir={nada} />
      </RowActionsMenu>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Menu items', 'Los ítems del ⋮, en grupos con separador. Los bloqueados quedan apagados y su tooltip explica el motivo.', 'ItemsAcciones'], ['Edit procedure', 'Guarda la nota del procedimiento.', 'DialogoEditar'], ['Status change', 'Confirma Refer, Discard o Discontinue y dice de qué estado a cuál pasa.', 'DialogoCambioEstado'], ['Delete', 'Pregunta el alcance: Delete from Tx o del paciente.', 'DialogoBorrar'], ['Status pill', 'El color de cada estado del procedimiento.', 'TONO_PROCEDIMIENTO']]} />
      </Bloque>
      <Bloque titulo="Actions">
        <Tabla encabezado={['Action', 'Label', 'Moves the procedure to']} minimo={480}>
          {(Object.keys(ACCION) as (keyof typeof ACCION)[]).map(a => <tr key={a}><td className="font-mono text-[12px]">{a}</td><td className="font-semibold">{ACCION[a].label}</td><td>{ACCION[a].a ?? '—'}</td></tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Status pill">
        <Muestras>{ESTADOS_PROCEDIMIENTO.map(e => <ConRotulo key={e} rotulo={TONO_PROCEDIMIENTO[e]}><Pill tone={TONO_PROCEDIMIENTO[e]}>{e}</Pill></ConRotulo>)}</Muestras>
      </Bloque>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="States" nota="Filas: estado del procedimiento. Columnas: situación del plan. Tachado = bloqueado (disabled).">
        <Tabla encabezado={['Status', ...CONTEXTOS]} minimo={860} arriba>
          {ESTADOS_PROCEDIMIENTO.map(e => <tr key={e}>
              <td className="font-semibold whitespace-nowrap">{e}</td>
              {CONTEXTOS.map(c => <td key={c} className="text-[12px]">
                  {accionesDe(e, c).flat().map(i => <span key={i.accion} className={i.bloqueada ? 'mr-1.5 text-ink-faint line-through' : 'mr-1.5'}>{ACCION[i.accion].label}</span>)}
                </td>)}
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <DialogoEditar procedimiento={PROC} nota="Wait for the core buildup to set." caso="Endodontic Treatment" onClose={nada} onGuardar={nada} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <DialogoCambioEstado accion="refer" procedimiento={PROC} desde="Pending" caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <DialogoCambioEstado accion="discard" procedimiento={PROC} desde="Planned" onCancel={nada} onConfirm={nada} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <DialogoCambioEstado accion="discontinue" procedimiento={PROC} desde="In progress" caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} />
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <DialogoBorrar procedimiento={PROC} caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} />
}`,...R.parameters?.docs?.source}}}})))()}B();export{R as DeleteProcedure,I as DiscardProcedure,L as DiscontinueProcedure,P as EditProcedure,M as Parts,j as Playground,F as ReferProcedure,N as States,z as __namedExportsOrder,D as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-D2sSwnPH.js";import{a,r as o}from"./button-DhtV2iTj.js";import{a as s,i as c,n as l,o as u,r as d}from"./ConsentRequiredDialog-B443LVsc.js";import{a as f,c as p,d as m,i as h,l as g,t as _,u as v}from"./kit-CWUgB5-0.js";function y({tipo:e,cuantos:t=1,enviando:n}){let[i,a]=(0,x.useState)(!0);return(0,S.jsxs)(`div`,{className:`bg-page-background min-h-[520px] p-6`,children:[(0,S.jsx)(o,{variant:`secondary`,onClick:()=>a(!0),children:`Open Consent required`}),i&&(0,S.jsx)(l,{tipo:e,procedimientos:w.slice(0,t),caso:`Restorative Plan`,enviando:n,onCancel:()=>{a(!1),r.info(`Cancelled. The procedure status is unchanged.`)},onSignNow:()=>{a(!1),r.info(`Opens the review and signature workflow. Sign now is not a signature.`)},onContinue:()=>{a(!1),r.ok(e===`sin-enviar`?`Status applied. Consent sent to the patient.`:`Status applied. Consent signature pending.`)},onViewConsent:()=>r.info(`Opens the existing consent document.`)})]})}function b(){let e=()=>c(()=>r.info(`Opens the treatment case.`));return(0,x.useEffect)(()=>{e()},[]),(0,S.jsx)(`div`,{className:`bg-page-background min-h-[520px] p-6`,children:(0,S.jsx)(o,{variant:`secondary`,onClick:e,children:`Show error again`})})}var x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{x=t(),a(),i(),m(),u(),S=n(),C={title:`Components/Clinical/ConsentRequiredDialog`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:560},description:{component:[`Frena el cambio de estado de un procedimiento cuando su consentimiento no está firmado y deja elegir cómo seguir (CON-3927, CON-3946, CON-3950; prototipo *Consent modals revised*). Sale al tocar **Complete** en Treatment Plan y **Start** en la tabla Procedures del Overview.`,``,`**Cómo se usa:** *No consent sent* (sin documento, borrador sin mandar o vencido) ofrece mandarlo para firmar después o firmar ahora; *Signature pending* (ya se mandó) ofrece firmar ahora o seguir con la firma pendiente, sin mandar otro. *Sign now* abre la revisión y la firma, no es una firma. Cancel y la X dejan el procedimiento como estaba. Si el caso todavía no está aceptado no hay diálogo: sale un aviso de error con *View case*.`,``,`**Probalo:** en *Playground* elegí la variante, cuántos procedimientos y el estado de envío desde *Controls*. *Parts* dice qué hace cada parte y cada botón, *States* muestra cada caso (todo se puede usar) y *Specs* trae medidas y colores.`].join(`
`)}}},args:{variant:`No consent sent`,procedures:1,sending:!1},argTypes:{variant:{control:`inline-radio`,options:[`No consent sent`,`Signature pending`],description:`No consent sent: sin documento, borrador o vencido · Signature pending: ya se mandó y falta la firma.`},procedures:{control:`inline-radio`,options:[1,3,8],description:`Cuántos procedimientos cambian de estado (Complete con filas marcadas). Con muchos, la lista scrollea adentro.`},sending:{control:`boolean`,description:`Mientras se manda el documento: spinner en la acción principal y los otros botones deshabilitados.`}}},w=[{id:`a`,codigo:`D2740`,nombre:`Crown – porcelain/ceramic`,pieza:19},{id:`b`,codigo:`D2391`,nombre:`Resin-based composite – one surface, posterior`,pieza:3},{id:`c`,codigo:`D0120`,nombre:`Periodic oral evaluation`},{id:`d`,codigo:`D2392`,nombre:`Resin-based composite – two surfaces, posterior`,pieza:14},{id:`e`,codigo:`D7140`,nombre:`Extraction – erupted tooth or exposed root`,pieza:16},{id:`f`,codigo:`D3330`,nombre:`Endodontic therapy, molar tooth`,pieza:30},{id:`g`,codigo:`D4341`,nombre:`Periodontal scaling and root planing – four or more teeth per quadrant`},{id:`h`,codigo:`D1110`,nombre:`Prophylaxis – adult`}],T={layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:560}}},E={render:({variant:e,procedures:t,sending:n})=>(0,S.jsx)(y,{tipo:e===`No consent sent`?`sin-enviar`:`pendiente`,cuantos:t,enviando:n},`${e}-${t}-${n}`)},D={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsxs)(h,{children:[(0,S.jsx)(_,{titulo:`Parts`,nota:`Es un ConfirmDialog con ícono y una tercera salida: la pregunta se contesta sin cargar nada, por eso no es un drawer.`,children:(0,S.jsx)(g,{partes:[[`Warning icon`,`Círculo ámbar con el signo de alerta: la acción pedida quedó frenada por algo que falta.`,`ConfirmDialog icon="warning"`],[`Title`,`"Consent required". Dice qué falta, no una pregunta de sí o no.`,`ConfirmDialog title`],[`Message`,`Qué pasa y qué se puede hacer. En plural cuando son varios procedimientos.`,`ConsentRequiredDialog`],[`Summary`,`Procedimientos (código, nombre y pieza), el paciente y el caso. Con muchos, scrollea adentro.`,`ResumenConsentimiento`],[`View consent`,`Link al documento que ya existe. Sólo en Signature pending; no cierra el diálogo.`,`ConsentRequiredDialog`],[`Actions`,`Cancel · Sign now · acción principal, en ese orden y alineadas a la derecha.`,`ConfirmDialog otherAction`]]})}),(0,S.jsx)(_,{titulo:`What each button does`,nota:`El estado que se pidió (Completed, In progress…) sólo cambia con la acción principal.`,children:(0,S.jsxs)(p,{encabezado:[`Variant`,`Cancel / ✕ / Esc`,`Sign now`,`Primary action`,`Procedure status`],minimo:760,arriba:!0,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`No consent sent`}),(0,S.jsx)(`td`,{children:`Cierra. Nada cambia.`}),(0,S.jsx)(`td`,{children:`Abre la revisión y la firma. No es una firma: el estado no cambia.`}),(0,S.jsxs)(`td`,{children:[(0,S.jsx)(`strong`,{children:`Send consent and sign later`}),`: manda el documento (o reusa el borrador que había) y sigue, sin otra confirmación.`]}),(0,S.jsx)(`td`,{children:`Cambia; el consentimiento queda Pending.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Signature pending`}),(0,S.jsx)(`td`,{children:`Cierra. Nada cambia.`}),(0,S.jsx)(`td`,{children:`Abre la revisión y la firma del documento que ya existe.`}),(0,S.jsxs)(`td`,{children:[(0,S.jsx)(`strong`,{children:`Continue without signed consent`}),`: sigue con la firma pendiente. No manda otro documento ni lo reenvía.`]}),(0,S.jsx)(`td`,{children:`Cambia; el consentimiento sigue Pending.`})]})]})}),(0,S.jsx)(_,{titulo:`When it appears`,nota:`Con varios procedimientos manda el peor caso: si uno no se mandó, es No consent sent.`,children:(0,S.jsxs)(p,{encabezado:[`Case`,`Consent`,`What happens`],minimo:640,arriba:!0,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Not accepted (Planning, Pending, Presented)`}),(0,S.jsx)(`td`,{children:`—`}),(0,S.jsxs)(`td`,{children:[`No hay diálogo: aviso de error `,(0,S.jsx)(`em`,{children:`Procedure cannot be updated`}),` con `,(0,S.jsx)(`em`,{children:`View case`}),`.`]})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Accepted o Waiting for consent`}),(0,S.jsx)(`td`,{children:`Signed`}),(0,S.jsx)(`td`,{children:`No hay diálogo: el estado cambia.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Accepted o Waiting for consent`}),(0,S.jsx)(`td`,{children:`Pending`}),(0,S.jsx)(`td`,{children:`Signature pending.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Accepted o Waiting for consent`}),(0,S.jsx)(`td`,{children:`Not sent o Expired`}),(0,S.jsx)(`td`,{children:`No consent sent.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Procedimiento suelto (sin caso)`}),(0,S.jsx)(`td`,{children:`—`}),(0,S.jsx)(`td`,{children:`No hay diálogo: no lleva consentimiento.`})]})]})}),(0,S.jsx)(_,{titulo:`Where it is used`,children:(0,S.jsxs)(p,{encabezado:[`Screen`,`Trigger`],minimo:560,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Treatment Plan › caso aceptado`}),(0,S.jsx)(`td`,{children:`Complete de una fila o de las marcadas → Confirm en Complete Procedure.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Overview › Procedures`}),(0,S.jsx)(`td`,{children:`Start en el menú de la fila.`})]})]})})]})},O=[[`No consent sent`,`Sin documento, borrador sin mandar o vencido.`,`NoConsentSent`],[`Signature pending`,`El documento se mandó y falta la firma; suma View consent.`,`SignaturePending`],[`Several procedures`,`Complete con varias filas marcadas: texto en plural y lista con scroll adentro.`,`SeveralProcedures`],[`Sending`,`Mientras se manda el documento: spinner en la acción principal y los demás botones deshabilitados (loading).`,`Sending`],[`Case not ready`,`El caso no está aceptado: no hay diálogo, sale el aviso de error con View case.`,`CaseNotReady`]],k={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsxs)(h,{children:[(0,S.jsx)(_,{titulo:`States`,nota:`Cada estado es su propia historia, en su iframe, porque el diálogo es position: fixed. Abrilas desde la barra lateral de Storybook.`,children:(0,S.jsx)(p,{encabezado:[`State`,`When`,`Story`],minimo:640,children:O.map(([e,t,n])=>(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,S.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,S.jsx)(`td`,{className:`font-mono text-[12px] text-ink-muted`,children:n})]},e))})}),(0,S.jsx)(_,{titulo:`Summary`,nota:`La caja que dice qué cambia, sola: con uno, con uno sin pieza y con varios.`,children:(0,S.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,S.jsx)(f,{titulo:`One procedure`,ancho:420,children:(0,S.jsx)(d,{procedimientos:w.slice(0,1),caso:`Restorative Plan`})}),(0,S.jsx)(f,{titulo:`Without a tooth`,nota:`Un procedimiento que no es de un diente no lleva Tooth #.`,ancho:420,children:(0,S.jsx)(d,{procedimientos:w.slice(2,3),caso:`Restorative Plan`})}),(0,S.jsx)(f,{titulo:`Several`,nota:`Con más de cuatro, la lista scrollea adentro (120px).`,ancho:420,children:(0,S.jsx)(d,{procedimientos:w,caso:`Restorative Plan`})})]})})]})},A={parameters:T,render:()=>(0,S.jsx)(y,{tipo:`sin-enviar`})},j={parameters:T,render:()=>(0,S.jsx)(y,{tipo:`pendiente`})},M={parameters:T,render:()=>(0,S.jsx)(y,{tipo:`sin-enviar`,cuantos:8})},N={parameters:T,render:()=>(0,S.jsx)(y,{tipo:`sin-enviar`,cuantos:3,enviando:!0})},P={parameters:T,render:()=>(0,S.jsx)(b,{})},F=({a:e,b:t})=>(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:e}),(0,S.jsx)(`td`,{children:t})]}),I={"sin-enviar":`No consent sent`,pendiente:`Signature pending`},L=e=>{let t=s(e);return t?I[t]:`None: the status changes`},R={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsxs)(h,{children:[(0,S.jsx)(_,{titulo:`Specs`,children:(0,S.jsxs)(p,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,S.jsx)(F,{a:`Width`,b:`480px con tres acciones (420px el ConfirmDialog de dos), centrado; en el celular, el ancho menos 32px.`}),(0,S.jsx)(F,{a:`Padding / gap`,b:`20px de padding, 12px entre partes, 8px entre botones.`}),(0,S.jsx)(F,{a:`Icon`,b:`Círculo de 36px, ícono de 18px, con un aro ámbar al 20%.`}),(0,S.jsx)(F,{a:`Title`,b:`16px Bold, a la derecha del ícono.`}),(0,S.jsx)(F,{a:`Message`,b:`13px, interlineado relajado, ink-soft.`}),(0,S.jsx)(F,{a:`Summary`,b:`13px Semibold por procedimiento y 12px el paciente y el caso; lista de hasta 120px de alto con scroll.`}),(0,S.jsx)(F,{a:`Buttons`,b:`Cancel y Sign now secondary, la principal primary; tamaño md (32px). Debajo de 640px los tres crecen y se reparten el ancho.`}),(0,S.jsx)(F,{a:`Error toast`,b:`360px; título 13px Semibold, texto 12.5px, View case debajo del texto; dura 9s porque lleva acción.`})]})}),(0,S.jsx)(_,{titulo:`Colors`,children:(0,S.jsxs)(p,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,S.jsx)(F,{a:`Icon circle`,b:(0,S.jsx)(v,{nombre:`warn-bg`})}),(0,S.jsx)(F,{a:`Icon`,b:(0,S.jsx)(v,{nombre:`warn-fg`})}),(0,S.jsx)(F,{a:`Summary`,b:(0,S.jsx)(v,{nombre:`surface-alt`})}),(0,S.jsx)(F,{a:`Primary action`,b:(0,S.jsx)(v,{nombre:`dash-blue`})}),(0,S.jsx)(F,{a:`View consent`,b:(0,S.jsx)(v,{nombre:`dash-blue`})})]})}),(0,S.jsx)(_,{titulo:`Logic`,nota:`consentimientoRequerido() decide el diálogo; nada de esto se calcula en la pantalla.`,children:(0,S.jsxs)(p,{encabezado:[`Consents of the procedures`,`Dialog`],minimo:560,children:[(0,S.jsx)(F,{a:`Todos Signed (o sin consentimiento)`,b:L([`Signed`,void 0])}),(0,S.jsx)(F,{a:`Pending`,b:L([`Pending`,`Signed`])}),(0,S.jsx)(F,{a:`Not sent`,b:L([`Not sent`])}),(0,S.jsx)(F,{a:`Expired`,b:L([`Expired`,`Pending`])}),(0,S.jsx)(F,{a:`Pending y Not sent juntos`,b:L([`Pending`,`Not sent`])})]})})]})},z=[`Playground`,`Parts`,`States`,`NoConsentSent`,`SignaturePending`,`SeveralProcedures`,`Sending`,`CaseNotReady`,`Specs`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: ({
    variant,
    procedures,
    sending
  }) => <Demo key={\`\${variant}-\${procedures}-\${sending}\`} tipo={variant === 'No consent sent' ? 'sin-enviar' : 'pendiente'} cuantos={procedures} enviando={sending} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Parts" nota="Es un ConfirmDialog con ícono y una tercera salida: la pregunta se contesta sin cargar nada, por eso no es un drawer.">
        <TablaPartes partes={[['Warning icon', 'Círculo ámbar con el signo de alerta: la acción pedida quedó frenada por algo que falta.', 'ConfirmDialog icon="warning"'], ['Title', '"Consent required". Dice qué falta, no una pregunta de sí o no.', 'ConfirmDialog title'], ['Message', 'Qué pasa y qué se puede hacer. En plural cuando son varios procedimientos.', 'ConsentRequiredDialog'], ['Summary', 'Procedimientos (código, nombre y pieza), el paciente y el caso. Con muchos, scrollea adentro.', 'ResumenConsentimiento'], ['View consent', 'Link al documento que ya existe. Sólo en Signature pending; no cierra el diálogo.', 'ConsentRequiredDialog'], ['Actions', 'Cancel · Sign now · acción principal, en ese orden y alineadas a la derecha.', 'ConfirmDialog otherAction']]} />
      </Bloque>
      <Bloque titulo="What each button does" nota="El estado que se pidió (Completed, In progress…) sólo cambia con la acción principal.">
        <Tabla encabezado={['Variant', 'Cancel / ✕ / Esc', 'Sign now', 'Primary action', 'Procedure status']} minimo={760} arriba>
          <tr>
            <td className="font-semibold">No consent sent</td>
            <td>Cierra. Nada cambia.</td>
            <td>Abre la revisión y la firma. No es una firma: el estado no cambia.</td>
            <td><strong>Send consent and sign later</strong>: manda el documento (o reusa el borrador que había) y sigue, sin otra confirmación.</td>
            <td>Cambia; el consentimiento queda Pending.</td>
          </tr>
          <tr>
            <td className="font-semibold">Signature pending</td>
            <td>Cierra. Nada cambia.</td>
            <td>Abre la revisión y la firma del documento que ya existe.</td>
            <td><strong>Continue without signed consent</strong>: sigue con la firma pendiente. No manda otro documento ni lo reenvía.</td>
            <td>Cambia; el consentimiento sigue Pending.</td>
          </tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="When it appears" nota="Con varios procedimientos manda el peor caso: si uno no se mandó, es No consent sent.">
        <Tabla encabezado={['Case', 'Consent', 'What happens']} minimo={640} arriba>
          <tr><td className="font-semibold">Not accepted (Planning, Pending, Presented)</td><td>—</td><td>No hay diálogo: aviso de error <em>Procedure cannot be updated</em> con <em>View case</em>.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Signed</td><td>No hay diálogo: el estado cambia.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Pending</td><td>Signature pending.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Not sent o Expired</td><td>No consent sent.</td></tr>
          <tr><td className="font-semibold">Procedimiento suelto (sin caso)</td><td>—</td><td>No hay diálogo: no lleva consentimiento.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where it is used">
        <Tabla encabezado={['Screen', 'Trigger']} minimo={560}>
          <tr><td className="font-semibold">Treatment Plan › caso aceptado</td><td>Complete de una fila o de las marcadas → Confirm en Complete Procedure.</td></tr>
          <tr><td className="font-semibold">Overview › Procedures</td><td>Start en el menú de la fila.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="States" nota="Cada estado es su propia historia, en su iframe, porque el diálogo es position: fixed. Abrilas desde la barra lateral de Storybook.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={640}>
          {ESTADOS.map(([estado, cuando, historia]) => <tr key={estado}>
              <td className="font-semibold whitespace-nowrap">{estado}</td>
              <td className="text-ink-medium">{cuando}</td>
              <td className="font-mono text-[12px] text-ink-muted">{historia}</td>
            </tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Summary" nota="La caja que dice qué cambia, sola: con uno, con uno sin pieza y con varios.">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
          <Muestra titulo="One procedure" ancho={420}><ResumenConsentimiento procedimientos={PROCS.slice(0, 1)} caso="Restorative Plan" /></Muestra>
          <Muestra titulo="Without a tooth" nota="Un procedimiento que no es de un diente no lleva Tooth #." ancho={420}><ResumenConsentimiento procedimientos={PROCS.slice(2, 3)} caso="Restorative Plan" /></Muestra>
          <Muestra titulo="Several" nota="Con más de cuatro, la lista scrollea adentro (120px)." ancho={420}><ResumenConsentimiento procedimientos={PROCS} caso="Restorative Plan" /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo tipo="pendiente" />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" cuantos={8} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" cuantos={3} enviando />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <CasoNoListo />
}`,...P.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <Fila a="Width" b="480px con tres acciones (420px el ConfirmDialog de dos), centrado; en el celular, el ancho menos 32px." />
          <Fila a="Padding / gap" b="20px de padding, 12px entre partes, 8px entre botones." />
          <Fila a="Icon" b="Círculo de 36px, ícono de 18px, con un aro ámbar al 20%." />
          <Fila a="Title" b="16px Bold, a la derecha del ícono." />
          <Fila a="Message" b="13px, interlineado relajado, ink-soft." />
          <Fila a="Summary" b="13px Semibold por procedimiento y 12px el paciente y el caso; lista de hasta 120px de alto con scroll." />
          <Fila a="Buttons" b="Cancel y Sign now secondary, la principal primary; tamaño md (32px). Debajo de 640px los tres crecen y se reparten el ancho." />
          <Fila a="Error toast" b="360px; título 13px Semibold, texto 12.5px, View case debajo del texto; dura 9s porque lleva acción." />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <Fila a="Icon circle" b={<Token nombre="warn-bg" />} />
          <Fila a="Icon" b={<Token nombre="warn-fg" />} />
          <Fila a="Summary" b={<Token nombre="surface-alt" />} />
          <Fila a="Primary action" b={<Token nombre="dash-blue" />} />
          <Fila a="View consent" b={<Token nombre="dash-blue" />} />
        </Tabla>
      </Bloque>
      <Bloque titulo="Logic" nota="consentimientoRequerido() decide el diálogo; nada de esto se calcula en la pantalla.">
        <Tabla encabezado={['Consents of the procedures', 'Dialog']} minimo={560}>
          <Fila a="Todos Signed (o sin consentimiento)" b={dialogo(['Signed', undefined])} />
          <Fila a="Pending" b={dialogo(['Pending', 'Signed'])} />
          <Fila a="Not sent" b={dialogo(['Not sent'])} />
          <Fila a="Expired" b={dialogo(['Expired', 'Pending'])} />
          <Fila a="Pending y Not sent juntos" b={dialogo(['Pending', 'Not sent'])} />
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...R.parameters?.docs?.source}}}})))()}B();export{P as CaseNotReady,A as NoConsentSent,D as Parts,E as Playground,N as Sending,M as SeveralProcedures,j as SignaturePending,R as Specs,k as States,z as __namedExportsOrder,C as default};
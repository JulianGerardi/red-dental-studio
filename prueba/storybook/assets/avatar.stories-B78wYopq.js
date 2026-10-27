import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{o as n,r}from"./data-table-em5yoo91.js";import{n as i,t as a}from"./user-round-B9gjLrBa.js";import{a as o,n as s,r as c,t as l}from"./avatar-RK2qZQ_5.js";import{Xt as u,Zt as d}from"./iframe-BsycZeDL.js";import{c as f,d as p,g as m,h,i as g,l as _,n as v,o as y,p as b,r as x,t as S,u as C}from"./kit-CWUgB5-0.js";function w({s:e}){let{ref:t,m:n}=b();return(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{children:(0,T.jsx)(`div`,{ref:t,className:`inline-block`,children:(0,T.jsx)(c,{initials:`NJ`,size:e})})}),(0,T.jsx)(`td`,{className:`font-semibold tabular-nums`,children:e}),(0,T.jsxs)(`td`,{className:`tabular-nums`,children:[n?.texto,` · `,n?.peso]}),(0,T.jsxs)(`td`,{className:`tabular-nums`,children:[`27% · `,Math.round(e*.27),`px`]}),(0,T.jsx)(`td`,{className:`text-ink-muted`,children:O[e]})]})}var T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{i(),o(),d(),n(),p(),h(),T=t(),E=Object.keys(s).map(Number),D=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23c7d9fb%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231a4da9%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2211%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3Cpath%20d%3D%22M12%2060c3-12%2012-18%2020-18s17%206%2020%2018%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3C%2Fsvg%3E`,O={24:`Cards de turno de Scheduling y del paciente, barra de Clinical Mode`,28:`Filas del Dashboard (turnos y tareas), Pending Task, providers de View filters`,32:`Tablas (PersonCell), listas y cards compactas, topbar, Currently being seen`,36:`Drawers y cards con tres renglones: Appointment details, Add relationship, Treatments`,40:`Relationships, paciente elegido en Billing`,44:`Card de turno del Dashboard (la referencia), Owner de la cuenta`,56:`Ficha de un empleado`,62:`Panel del paciente`,72:`Popover del paciente en el Dashboard`},k={title:`Elements/Avatars`,component:c,parameters:{layout:`padded`,docs:{description:{component:["Las iniciales (o la foto) de una persona (`@/components/ui/avatar`): pacientes, providers, empleados y la cuenta del topbar. **Un solo estilo en toda la app**: cuadrado con esquinas redondeadas, azul con las iniciales en blanco, el del avatar de *Appointments* del Dashboard.",``,`Antes convivían círculos (tablas de Patients y Employees, Relationships, el panel del paciente) y cuadrados, en azul y en celeste. Ahora la forma y el color son siempre los mismos; lo único que cambia es el tamaño, de una escala de nueve.`,``,`**Probalo:** en *Playground* cambiá las iniciales, el tamaño y poné una foto desde *Controls*.`].join(`
`)}}},args:{initials:`NJ`,size:44,photo:`none`},argTypes:{initials:{control:`text`,description:`Una o dos letras (se cortan en dos y van en mayúscula).`},size:{control:`inline-radio`,options:E,description:`Ver *Specs*: 32 en tablas y listas, 44 en la card de turno, 62 en el panel del paciente.`},photo:{control:`inline-radio`,options:[`none`,`photo`],mapping:{none:null,photo:D},description:`Con foto, las iniciales no se ven.`},className:{table:{disable:!0}}}},A={},j={parameters:{controls:{disable:!0}},render:()=>(0,T.jsxs)(g,{children:[(0,T.jsx)(S,{titulo:`Parts`,children:(0,T.jsx)(_,{partes:[[`Fondo`,`Azul de la marca, igual para pacientes y equipo.`,`Avatar`],[`Iniciales`,`Blanco Semibold, en mayúscula, dos letras como máximo. El tamaño de letra sale del tamaño del avatar.`,`Avatar`],[`Esquina`,`rounded-avatar: 27% del lado, así crece con el tamaño (12px a 44, 9px a 32).`,`token --radius-avatar`],[`Foto`,`Reemplaza las iniciales, recortada a la misma forma (object-cover).`,`photo`],[`Lápiz`,`Sólo en EditableAvatar: con hover o foco, un velo oscuro con el lápiz abre el selector de archivos.`,`EditableAvatar`]]})}),(0,T.jsx)(S,{titulo:`Person vs thing`,nota:`El avatar es sólo para personas. Una locación lleva sus iniciales en celeste (Location selector) y la marca de la clínica sigue redonda: así no se confunden con alguien.`,children:(0,T.jsxs)(y,{children:[(0,T.jsx)(v,{rotulo:`Persona`,children:(0,T.jsx)(c,{initials:`SS`})}),(0,T.jsx)(v,{rotulo:`Locación`,children:(0,T.jsx)(`span`,{className:`bg-dash-count-bg text-dash-blue-hover flex size-8 items-center justify-center rounded-md text-[11px] font-semibold`,children:`AB`})}),(0,T.jsx)(v,{rotulo:`Sin nadie (ícono)`,children:(0,T.jsx)(`span`,{className:`flex size-8 items-center justify-center rounded-avatar bg-surface-muted text-ink-faint`,children:(0,T.jsx)(a,{className:`size-4`})})})]})})]})},M={parameters:{controls:{disable:!0}},render:()=>(0,T.jsxs)(g,{children:[(0,T.jsx)(S,{titulo:`States`,children:(0,T.jsxs)(y,{children:[(0,T.jsx)(v,{rotulo:`Initials`,children:(0,T.jsx)(c,{initials:`EM`,size:44})}),(0,T.jsx)(v,{rotulo:`One letter`,children:(0,T.jsx)(c,{initials:`M`,size:44})}),(0,T.jsx)(v,{rotulo:`Long name (two letters max)`,children:(0,T.jsx)(c,{initials:`mja`,size:44})}),(0,T.jsx)(v,{rotulo:`Photo`,children:(0,T.jsx)(c,{initials:`EM`,size:44,photo:D})}),(0,T.jsx)(v,{rotulo:`Editable · rest`,children:(0,T.jsx)(u,{foto:null,iniciales:`EM`,label:`Elena Martinez`,size:44,onChange:()=>{}})}),(0,T.jsx)(v,{rotulo:`Editable · hover`,children:(0,T.jsx)(x,{selector:`button`,estado:`hover`,className:`flex`,children:(0,T.jsx)(u,{foto:D,iniciales:`EM`,label:`Elena Martinez`,size:44,onChange:()=>{}})})}),(0,T.jsx)(v,{rotulo:`Editable · focus`,children:(0,T.jsx)(x,{selector:`button`,estado:`focus-visible`,className:`flex`,children:(0,T.jsx)(u,{foto:null,iniciales:`EM`,label:`Elena Martinez`,size:44,onChange:()=>{}})})})]})}),(0,T.jsx)(S,{titulo:`In a table`,nota:`PersonCell: el avatar de 32 y el nombre como link. Igual en Patients y en Employees.`,children:(0,T.jsx)(`div`,{className:`flex w-full max-w-[420px] flex-col divide-y divide-line-row rounded-lg border border-line-row bg-white`,children:[[`Abril Viola`,`AV`],[`Elena Martinez`,`EM`],[`Marco Rivera`,`MR`]].map(([e,t])=>(0,T.jsx)(`div`,{className:`flex h-14 items-center px-4`,children:(0,T.jsx)(r,{name:e,initials:t,onClick:()=>{}})},e))})})]})},N={parameters:{controls:{disable:!0}},render:()=>{let e=m(l);return(0,T.jsxs)(g,{children:[(0,T.jsx)(S,{titulo:`Sizes`,nota:`Medidas leídas del avatar dibujado. No hay otros tamaños: si una pantalla necesita uno, se elige el más cercano de la escala.`,children:(0,T.jsx)(f,{encabezado:[`Sample`,`Size`,`Text`,`Radius`,`Where`],minimo:760,children:E.map(e=>(0,T.jsx)(w,{s:e},e))})}),(0,T.jsx)(S,{titulo:`Colors`,nota:`Los mismos para pacientes, providers y empleados.`,children:(0,T.jsxs)(f,{encabezado:[`Piece`,`Token`],children:[(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:`Fondo`}),(0,T.jsx)(`td`,{children:(0,T.jsx)(C,{nombre:e.fondo})})]}),(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:`Iniciales`}),(0,T.jsx)(`td`,{children:(0,T.jsx)(C,{nombre:e.texto})})]}),(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:`Velo del lápiz (EditableAvatar)`}),(0,T.jsx)(`td`,{children:`black 45%`})]})]})})]})}},P=[`Playground`,`Parts`,`States`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Fondo', 'Azul de la marca, igual para pacientes y equipo.', 'Avatar'], ['Iniciales', 'Blanco Semibold, en mayúscula, dos letras como máximo. El tamaño de letra sale del tamaño del avatar.', 'Avatar'], ['Esquina', 'rounded-avatar: 27% del lado, así crece con el tamaño (12px a 44, 9px a 32).', 'token --radius-avatar'], ['Foto', 'Reemplaza las iniciales, recortada a la misma forma (object-cover).', 'photo'], ['Lápiz', 'Sólo en EditableAvatar: con hover o foco, un velo oscuro con el lápiz abre el selector de archivos.', 'EditableAvatar']]} />
      </Bloque>
      <Bloque titulo="Person vs thing" nota="El avatar es sólo para personas. Una locación lleva sus iniciales en celeste (Location selector) y la marca de la clínica sigue redonda: así no se confunden con alguien.">
        <Muestras>
          <ConRotulo rotulo="Persona"><Avatar initials="SS" /></ConRotulo>
          <ConRotulo rotulo="Locación"><span className="bg-dash-count-bg text-dash-blue-hover flex size-8 items-center justify-center rounded-md text-[11px] font-semibold">AB</span></ConRotulo>
          <ConRotulo rotulo="Sin nadie (ícono)"><span className="flex size-8 items-center justify-center rounded-avatar bg-surface-muted text-ink-faint"><UserRound className="size-4" /></span></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Initials"><Avatar initials="EM" size={44} /></ConRotulo>
          <ConRotulo rotulo="One letter"><Avatar initials="M" size={44} /></ConRotulo>
          <ConRotulo rotulo="Long name (two letters max)"><Avatar initials="mja" size={44} /></ConRotulo>
          <ConRotulo rotulo="Photo"><Avatar initials="EM" size={44} photo={FOTO} /></ConRotulo>
          <ConRotulo rotulo="Editable · rest"><EditableAvatar foto={null} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></ConRotulo>
          <ConRotulo rotulo="Editable · hover">
            <Forzar selector="button" estado="hover" className="flex"><EditableAvatar foto={FOTO} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></Forzar>
          </ConRotulo>
          <ConRotulo rotulo="Editable · focus">
            <Forzar selector="button" estado="focus-visible" className="flex"><EditableAvatar foto={null} iniciales="EM" label="Elena Martinez" size={44} onChange={() => {}} /></Forzar>
          </ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="In a table" nota="PersonCell: el avatar de 32 y el nombre como link. Igual en Patients y en Employees.">
        <div className="flex w-full max-w-[420px] flex-col divide-y divide-line-row rounded-lg border border-line-row bg-white">
          {[['Abril Viola', 'AV'], ['Elena Martinez', 'EM'], ['Marco Rivera', 'MR']].map(([n, i]) => <div key={n} className="flex h-14 items-center px-4"><PersonCell name={n!} initials={i!} onClick={() => {}} /></div>)}
        </div>
      </Bloque>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const k = tokensDe(AVATAR_BASE);
    return <Lienzo>
        <Bloque titulo="Sizes" nota="Medidas leídas del avatar dibujado. No hay otros tamaños: si una pantalla necesita uno, se elige el más cercano de la escala.">
          <Tabla encabezado={['Sample', 'Size', 'Text', 'Radius', 'Where']} minimo={760}>
            {TAMANOS.map(s => <FilaTamano key={s} s={s} />)}
          </Tabla>
        </Bloque>
        <Bloque titulo="Colors" nota="Los mismos para pacientes, providers y empleados.">
          <Tabla encabezado={['Piece', 'Token']}>
            <tr><td className="font-semibold">Fondo</td><td><Token nombre={k.fondo} /></td></tr>
            <tr><td className="font-semibold">Iniciales</td><td><Token nombre={k.texto} /></td></tr>
            <tr><td className="font-semibold">Velo del lápiz (EditableAvatar)</td><td>black 45%</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>;
  }
}`,...N.parameters?.docs?.source}}}})))()}F();export{j as Parts,A as Playground,N as Specs,M as States,P as __namedExportsOrder,k as default};
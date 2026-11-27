import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./alert-BeWyOJrj.js";import{_ as a,a as o,d as s,f as c,g as l,i as u,l as d,s as f,t as p,u as m}from"./kit-Di92TvVK.js";var h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{r(),c(),l(),h=t(),g=Object.keys(i),_={info:`Algo para saber, sin acción: una verificación en curso.`,success:`Salió bien: se guardó, se envió.`,warning:`Hay que tenerlo en cuenta: acceso limitado, un dato que falta.`,danger:`Algo falló o se bloqueó: no se pudo guardar.`,neutral:`Sólo lectura: una versión expirada, un fee schedule archivado.`},v={title:`Elements/Alert`,component:n,parameters:{layout:`padded`,docs:{description:{component:["El aviso de la app (`@/components/ui/alert`): un mensaje dentro de la pantalla, con ícono, título y texto, en los colores de los estados. Por ejemplo, *Limited access to this treatment case* en Treatment Plan o *Guarantor not assigned* en el detalle del turno. Para algo que pasó y se va solo, el toast (`aviso`).",``,"**Es el único aviso de la app.** No se arman franjas con barra a la izquierda (`border-l-[3px]`) para un mensaje: desde el 2026-11-18 los avisos de Guardian, New Hours, Assign Role, Vitals y el detalle del turno usan `Alert`, y `Section notice` dejó de existir. Las tarjetas con barra de color (turnos, findings) no son avisos.",``,`**Probalo:** en *Playground* cambiá tono, título y texto desde *Controls*.`].join(`
`)}}},args:{tone:`warning`,title:`Limited access to this treatment case`,children:`You do not have permission to update treatment plans for this location.`},argTypes:{tone:{control:`inline-radio`,options:g,description:`Color según lo que dice.`},title:{control:`text`,description:`Qué pasa, en una línea.`},children:{control:`text`,description:`El detalle o qué hacer. Vacío, no se muestra.`},className:{table:{disable:!0}}}},y={},b={parameters:{controls:{disable:!0}},render:()=>(0,h.jsxs)(u,{children:[(0,h.jsx)(`div`,{className:`max-w-[560px]`,children:(0,h.jsx)(n,{tone:`warning`,title:`Attention needed`,children:`Select the location assigned to the provider, then set the start and end times in the location's local time zone.`})}),(0,h.jsx)(m,{partes:[[`Box`,`Caja redondeada (8px) con borde de 1px y fondo del tono. Ocupa el ancho de su contenedor.`,`Alert`],[`Icon`,`Uno por tono, 16px, del color del título: Info, CircleCheck, TriangleAlert, CircleAlert.`,`ALERT_TONES[tone].icono`],[`Title`,`Qué pasa, en una línea corta. 13px Semibold, del color del tono. Obligatorio.`,`title`],[`Text`,`El detalle o qué hacer. 13px, color de texto. Opcional: sin texto, el aviso es sólo el título.`,`children`]]})]})},x={parameters:{controls:{disable:!0}},render:()=>(0,h.jsxs)(u,{children:[(0,h.jsx)(p,{titulo:`Tones`,nota:`El tono sale de lo que dice el aviso, no del lugar donde va.`,children:(0,h.jsx)(`div`,{className:`flex max-w-[640px] flex-col gap-3`,children:g.map(e=>(0,h.jsx)(n,{tone:e,title:e[0].toUpperCase()+e.slice(1),children:_[e]},e))})}),(0,h.jsx)(p,{titulo:`Content`,children:(0,h.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6`,children:[(0,h.jsx)(o,{titulo:`Title and text`,nota:`Guardian de New Patient: el título dice qué pasa y el texto, qué hacer.`,ancho:440,children:(0,h.jsx)(n,{tone:`warning`,title:`This patient is under 18.`,children:`Add at least one guardian: search for a person in the system or add a new one.`})}),(0,h.jsx)(o,{titulo:`Title only`,nota:`Cuando una línea alcanza: perfil de facturación inactivo.`,ancho:440,children:(0,h.jsx)(n,{tone:`info`,title:`This billing profile is inactive and cannot be edited.`})}),(0,h.jsx)(o,{titulo:`Narrow`,nota:`En la card del detalle del turno (300px): sólo título.`,ancho:300,children:(0,h.jsx)(n,{tone:`warning`,title:`Guarantor not assigned`})}),(0,h.jsx)(o,{titulo:`Long content`,nota:`El texto largo baja de línea; el ícono queda arriba, alineado al título.`,ancho:300,children:(0,h.jsx)(n,{tone:`warning`,title:`Attention needed`,children:`Select the location assigned to the provider, then set the start and end times in the location's local time zone. The system will automatically convert and store the shift in Coordinated Universal Time (UTC).`})})]})}),(0,h.jsx)(p,{titulo:`In the app`,nota:`Dónde se usa cada tono hoy.`,children:(0,h.jsx)(d,{encabezado:[`Tone`,`Screen`,`Title`],minimo:640,children:[[`warning`,`Scheduling › Appointment details`,`Guarantor not assigned`],[`warning`,`Patients › New Patient › Guardian`,`This patient is under 18.`],[`warning`,`Settings › Employees › New Hours`,`Attention needed`],[`warning`,`Clinical › Treatment Plan`,`Limited access to this treatment case`],[`info`,`Settings › Employees › New Hours`,`This will update the hours for all selected days…`],[`info`,`Settings › Employees › Assign Role`,`Global access`],[`info`,`Settings › Billing Profile`,`This billing profile is inactive and cannot be edited.`],[`info`,`Clinical › Vitals`,`Blood pressure`],[`danger`,`Settings › Finance, Patients › Insurance`,`Uncompleted fields`]].map(([e,t,n])=>(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,h.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,h.jsx)(`td`,{className:`text-ink-medium`,children:n})]},t+n))})})]})},S={parameters:{controls:{disable:!0}},render:()=>(0,h.jsxs)(u,{children:[(0,h.jsx)(f,{piezas:[{nombre:`Box`,children:(0,h.jsx)(n,{tone:`warning`,title:`Guarantor not assigned`,className:`w-[240px]`})},{nombre:`Title`,selector:`p`,children:(0,h.jsx)(n,{tone:`warning`,title:`Guarantor not assigned`,className:`w-[240px]`})},{nombre:`Icon`,selector:`svg`,children:(0,h.jsx)(n,{tone:`warning`,title:`Guarantor not assigned`,className:`w-[240px]`})}]}),(0,h.jsx)(p,{titulo:`Colors`,nota:`Tokens de cada tono, de alert.tsx y src/index.css. El borde es el color del título al 25%.`,children:(0,h.jsx)(d,{encabezado:[`Tone`,`Fill`,`Border (25%)`,`Title and icon`],minimo:560,children:g.map(e=>{let t=a(`border ${i[e].caja} ${i[e].color}`);return(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,h.jsx)(`td`,{children:(0,h.jsx)(s,{nombre:t.fondo})}),(0,h.jsx)(`td`,{children:(0,h.jsx)(s,{nombre:t.texto})}),(0,h.jsx)(`td`,{children:(0,h.jsx)(s,{nombre:t.texto})})]},e)})})})]})},C=[`Playground`,`Parts`,`States`,`Specs`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="max-w-[560px]">
        <Alert tone="warning" title="Attention needed">
          Select the location assigned to the provider, then set the start and end times in the location&apos;s local time zone.
        </Alert>
      </div>
      <TablaPartes partes={[['Box', 'Caja redondeada (8px) con borde de 1px y fondo del tono. Ocupa el ancho de su contenedor.', 'Alert'], ['Icon', 'Uno por tono, 16px, del color del título: Info, CircleCheck, TriangleAlert, CircleAlert.', 'ALERT_TONES[tone].icono'], ['Title', 'Qué pasa, en una línea corta. 13px Semibold, del color del tono. Obligatorio.', 'title'], ['Text', 'El detalle o qué hacer. 13px, color de texto. Opcional: sin texto, el aviso es sólo el título.', 'children']]} />
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Tones" nota="El tono sale de lo que dice el aviso, no del lugar donde va.">
        <div className="flex max-w-[640px] flex-col gap-3">
          {TONOS.map(t => <Alert key={t} tone={t} title={t[0]!.toUpperCase() + t.slice(1)}>{USO[t]}</Alert>)}
        </div>
      </Bloque>
      <Bloque titulo="Content">
        <div className="flex flex-wrap items-start gap-6">
          <Muestra titulo="Title and text" nota="Guardian de New Patient: el título dice qué pasa y el texto, qué hacer." ancho={440}>
            <Alert tone="warning" title="This patient is under 18.">Add at least one guardian: search for a person in the system or add a new one.</Alert>
          </Muestra>
          <Muestra titulo="Title only" nota="Cuando una línea alcanza: perfil de facturación inactivo." ancho={440}>
            <Alert tone="info" title="This billing profile is inactive and cannot be edited." />
          </Muestra>
          <Muestra titulo="Narrow" nota="En la card del detalle del turno (300px): sólo título." ancho={300}>
            <Alert tone="warning" title="Guarantor not assigned" />
          </Muestra>
          <Muestra titulo="Long content" nota="El texto largo baja de línea; el ícono queda arriba, alineado al título." ancho={300}>
            <Alert tone="warning" title="Attention needed">
              Select the location assigned to the provider, then set the start and end times in the location&apos;s local time zone. The system will automatically convert and store the shift in Coordinated Universal Time (UTC).
            </Alert>
          </Muestra>
        </div>
      </Bloque>
      <Bloque titulo="In the app" nota="Dónde se usa cada tono hoy.">
        <Tabla encabezado={['Tone', 'Screen', 'Title']} minimo={640}>
          {[['warning', 'Scheduling › Appointment details', 'Guarantor not assigned'], ['warning', 'Patients › New Patient › Guardian', 'This patient is under 18.'], ['warning', 'Settings › Employees › New Hours', 'Attention needed'], ['warning', 'Clinical › Treatment Plan', 'Limited access to this treatment case'], ['info', 'Settings › Employees › New Hours', 'This will update the hours for all selected days…'], ['info', 'Settings › Employees › Assign Role', 'Global access'], ['info', 'Settings › Billing Profile', 'This billing profile is inactive and cannot be edited.'], ['info', 'Clinical › Vitals', 'Blood pressure'], ['danger', 'Settings › Finance, Patients › Insurance', 'Uncompleted fields']].map(([t, pantalla, titulo]) => <tr key={pantalla + titulo}>
              <td className="font-semibold capitalize">{t}</td>
              <td className="text-ink-medium">{pantalla}</td>
              <td className="text-ink-medium">{titulo}</td>
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <SpecsMedidas piezas={[{
      nombre: 'Box',
      children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" />
    }, {
      nombre: 'Title',
      selector: 'p',
      children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" />
    }, {
      nombre: 'Icon',
      selector: 'svg',
      children: <Alert tone="warning" title="Guarantor not assigned" className="w-[240px]" />
    }]} />
      <Bloque titulo="Colors" nota="Tokens de cada tono, de alert.tsx y src/index.css. El borde es el color del título al 25%.">
        <Tabla encabezado={['Tone', 'Fill', 'Border (25%)', 'Title and icon']} minimo={560}>
          {TONOS.map(t => {
          const k = tokensDe(\`border \${ALERT_TONES[t].caja} \${ALERT_TONES[t].color}\`);
          return <tr key={t}>
                <td className="font-semibold capitalize">{t}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.texto} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>;
        })}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}}})))()}w();export{b as Parts,y as Playground,S as Specs,x as States,C as __namedExportsOrder,v as default};
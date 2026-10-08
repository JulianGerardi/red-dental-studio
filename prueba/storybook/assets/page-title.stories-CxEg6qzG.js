import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./page-title-zsC81Tfx.js";import{a as i,d as a,i as o,l as s,n as c,s as l,t as u}from"./kit-VhBMbBcY.js";function d({size:e}){let{ref:t,m:n}=a();return(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{children:(0,f.jsx)(`div`,{ref:t,children:(0,f.jsx)(r,{size:e,children:e===`lg`?`Dashboard`:`Patients`})})}),(0,f.jsx)(`td`,{className:`font-semibold`,children:e}),(0,f.jsxs)(`td`,{className:`tabular-nums`,children:[n?.texto,` · `,n?.peso]}),(0,f.jsx)(`td`,{children:e===`lg`?`Dashboard`:`Todas las demás`})]})}var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{n(),s(),f=t(),p=`mt-[9px] text-xs leading-[17px] text-ink-faint`,m={title:`Components/UI/PageTitle`,component:r,parameters:{layout:`padded`,docs:{description:{component:["El título de cada pantalla (`@/components/ui/page-title`). Una sola escala para toda la app: **md, 20px Semibold**, en Patients, Scheduling, Billing, Notifications, las pantallas del paciente, **Settings** (todas, incluida la home) y **Help**. **lg, 24px Bold**, sólo en el Dashboard, como en su Figma.",``,"**Bajada:** 12px en `ink-faint`, 9px debajo del título.",``,`**Probalo:** en *Playground* cambiá el texto y el tamaño desde *Controls*.`].join(`
`)}}},args:{children:`Patients`,size:`md`},argTypes:{size:{control:`inline-radio`,options:[`md`,`lg`],description:`md 20px Semibold (todas las pantallas) · lg 24px Bold (Dashboard).`},children:{control:`text`,description:`El nombre de la pantalla.`}}},h={},g={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(o,{children:(0,f.jsxs)(u,{titulo:`Title and subtitle`,nota:`Así arrancan Settings → Locations, Help y Patients.`,children:[(0,f.jsxs)(`div`,{className:`rounded-lg border border-dashed border-line p-5`,children:[(0,f.jsx)(r,{children:`Locations`}),(0,f.jsx)(`p`,{className:p,children:`Set your location name. Add the location you need.`})]}),(0,f.jsxs)(l,{encabezado:[`Part`,`What it does`],children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,f.jsx)(`td`,{children:`El nombre de la pantalla; uno por pantalla (h1).`})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Subtitle`}),(0,f.jsx)(`td`,{children:`Una línea de contexto, opcional.`})]})]})]})})},_={parameters:{controls:{disable:!0}},render:()=>(0,f.jsxs)(i,{children:[(0,f.jsx)(c,{rotulo:`md · every screen`,children:(0,f.jsx)(r,{children:`Settings`})}),(0,f.jsx)(c,{rotulo:`lg · Dashboard`,children:(0,f.jsx)(r,{size:`lg`,children:`Dashboard`})})]})},v={parameters:{controls:{disable:!0}},render:()=>(0,f.jsxs)(o,{children:[(0,f.jsx)(u,{titulo:`Sizes`,nota:`Medidas leídas del título dibujado.`,children:(0,f.jsxs)(l,{encabezado:[`Sample`,`Size`,`Text`,`Where`],minimo:560,children:[(0,f.jsx)(d,{size:`md`}),(0,f.jsx)(d,{size:`lg`})]})}),(0,f.jsx)(u,{titulo:`Shared rules`,children:(0,f.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,f.jsxs)(`li`,{children:[`Line height 1.3 y color `,(0,f.jsx)(`code`,{children:`ink`}),` en los dos tamaños.`]}),(0,f.jsx)(`li`,{children:`Los títulos de cards y paneles van más chicos: 15px Bold (Today Appointments, las secciones de Settings).`}),(0,f.jsx)(`li`,{children:`Los drawers y Confibot titulan en 18px Bold con bajada de 12px.`})]})})]})},y=[`Playground`,`Parts`,`Sizes`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Title and subtitle" nota="Así arrancan Settings → Locations, Help y Patients.">
        <div className="rounded-lg border border-dashed border-line p-5">
          <PageTitle>Locations</PageTitle>
          <p className={SUBTITULO}>Set your location name. Add the location you need.</p>
        </div>
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Title</td><td>El nombre de la pantalla; uno por pantalla (h1).</td></tr>
          <tr><td className="font-semibold">Subtitle</td><td>Una línea de contexto, opcional.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Muestras>
      <ConRotulo rotulo="md · every screen"><PageTitle>Settings</PageTitle></ConRotulo>
      <ConRotulo rotulo="lg · Dashboard"><PageTitle size="lg">Dashboard</PageTitle></ConRotulo>
    </Muestras>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas del título dibujado.">
        <Tabla encabezado={['Sample', 'Size', 'Text', 'Where']} minimo={560}>
          <Fila size="md" />
          <Fila size="lg" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Line height 1.3 y color <code>ink</code> en los dos tamaños.</li>
          <li>Los títulos de cards y paneles van más chicos: 15px Bold (Today Appointments, las secciones de Settings).</li>
          <li>Los drawers y Confibot titulan en 18px Bold con bajada de 12px.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...v.parameters?.docs?.source}}}})))()}b();export{g as Parts,h as Playground,_ as Sizes,v as Specs,y as __namedExportsOrder,m as default};
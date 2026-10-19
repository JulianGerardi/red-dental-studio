import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,l as o,t as s}from"./kit-CWUgB5-0.js";import{n as c,r as l,t as u}from"./PatientBreadcrumb-D1s_gOl4.js";var d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{c(),i(),d=t(),f=[`Overview`,`Treatments`,`Insurance`,`Ledger`,`Documents`,`Relationships & Billing`,`Edit Patient`],p=e=>e===`Overview`?void 0:e,m={title:`Components/Patients/PatientBreadcrumb`,parameters:{layout:`padded`,docs:{description:{component:['El rastro de todas las pantallas de un paciente (`@/components/patients/PatientBreadcrumb`, Julián, 2026-10-13): **Patients / paciente / sección**. Reemplaza al "‹ Patients" que tenían arriba: ahora se vuelve a la lista o al Overview del paciente con un toque. Es el `Breadcrumb` de *Elements / Breadcrumb* con las migas armadas por `migasPaciente`.',``,`En el **Overview** termina en el paciente; en una sección, el paciente lleva al Overview y la sección es el último tramo, con el mismo nombre que en el menú del paciente. **Edit Patient** cuelga del paciente. Add Relationship abre un drawer sobre la lista, así que termina en *Relationships & Billing*. La lista de Patients no lleva rastro: es de primer nivel.`,``,`**Probalo:** en *Playground* elegí la sección y cambiá el nombre desde *Controls*.`].join(`
`)}}},args:{name:`John Smith`,section:`Ledger`},argTypes:{name:{control:`text`,description:`El nombre del paciente, el mismo del menú del paciente. Probá uno largo.`},section:{control:`select`,options:f,description:`La pantalla del paciente. Overview termina en el nombre.`}}},h={controls:{disable:!0}},g={render:({name:e,section:t})=>(0,d.jsx)(u,{className:`mb-0`,name:e,section:p(t)})},_={parameters:h,render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(s,{nota:`Una sección del paciente: los tres tramos.`,children:(0,d.jsx)(u,{className:`mb-0`,name:`John Smith`,section:`Insurance`})}),(0,d.jsx)(o,{partes:[[`Patients`,`Vuelve a la lista de pacientes.`,`/patients`],[`Patient`,`Vuelve al Overview del paciente. En el Overview es el último tramo y no es link.`,`name · /patients/:id`],[`Section`,`La pantalla actual, con el nombre del menú del paciente (o Edit Patient).`,`section`]]})]})},v={parameters:h,render:()=>(0,d.jsx)(a,{children:(0,d.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,d.jsx)(n,{titulo:`Overview`,nota:`Termina en el paciente.`,children:(0,d.jsx)(u,{className:`mb-0`,name:`John Smith`})}),(0,d.jsx)(n,{titulo:`Section`,nota:`El paciente lleva al Overview.`,children:(0,d.jsx)(u,{className:`mb-0`,name:`John Smith`,section:`Relationships & Billing`})}),(0,d.jsx)(n,{titulo:`Edit Patient`,nota:`El formulario completo cuelga del paciente.`,children:(0,d.jsx)(u,{className:`mb-0`,name:`John Smith`,section:`Edit Patient`})}),(0,d.jsx)(n,{titulo:`Long name, phone`,nota:`Baja de renglón entre tramos; el nombre no se corta.`,ancho:240,children:(0,d.jsx)(u,{className:`mb-0`,name:`Maria Abril Viola Fernández`,section:`Relationships & Billing`})})]})})},y={parameters:h,render:()=>(0,d.jsxs)(a,{children:[(0,d.jsx)(s,{titulo:`Trail per screen`,nota:`Lo que devuelve migasPaciente para cada pantalla (→ es link).`,children:(0,d.jsx)(r,{encabezado:[`Screen`,`Route`,`Breadcrumb`],minimo:640,children:f.map(e=>(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`font-semibold`,children:e}),(0,d.jsx)(`td`,{className:`font-mono text-[12px] text-ink-muted`,children:e===`Edit Patient`?`/patients/edit`:`/patients/:id${e===`Overview`?``:`/${e.split(` `)[0].toLowerCase()}`}`}),(0,d.jsx)(`td`,{className:`text-ink-medium`,children:l(`John Smith`,`/patients/john-smith`,p(e)).map(e=>e.to?`${e.label} →`:e.label).join(` / `)})]},e))})}),(0,d.jsx)(s,{titulo:`Spacing`,children:(0,d.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,d.jsx)(`li`,{children:`Arriba de la página, donde estaba "‹ Patients"; 16px (mb-4) sobre el panel del paciente y el contenido.`}),(0,d.jsx)(`li`,{children:`Texto, colores y foco: los del Breadcrumb (Elements / Breadcrumb).`})]})})]})},b=[`Playground`,`Parts`,`States`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: ({
    name,
    section
  }) => <PatientBreadcrumb className="mb-0" name={name} section={seccionDe(section)} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Una sección del paciente: los tres tramos.">
        <PatientBreadcrumb className="mb-0" name="John Smith" section="Insurance" />
      </Bloque>
      <TablaPartes partes={[['Patients', 'Vuelve a la lista de pacientes.', '/patients'], ['Patient', 'Vuelve al Overview del paciente. En el Overview es el último tramo y no es link.', 'name · /patients/:id'], ['Section', 'La pantalla actual, con el nombre del menú del paciente (o Edit Patient).', 'section']]} />
    </Lienzo>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Overview" nota="Termina en el paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" />
        </Muestra>
        <Muestra titulo="Section" nota="El paciente lleva al Overview.">
          <PatientBreadcrumb className="mb-0" name="John Smith" section="Relationships & Billing" />
        </Muestra>
        <Muestra titulo="Edit Patient" nota="El formulario completo cuelga del paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" section="Edit Patient" />
        </Muestra>
        <Muestra titulo="Long name, phone" nota="Baja de renglón entre tramos; el nombre no se corta." ancho={240}>
          <PatientBreadcrumb className="mb-0" name="Maria Abril Viola Fernández" section="Relationships & Billing" />
        </Muestra>
      </div>
    </Lienzo>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Trail per screen" nota="Lo que devuelve migasPaciente para cada pantalla (→ es link).">
        <Tabla encabezado={['Screen', 'Route', 'Breadcrumb']} minimo={640}>
          {SECCIONES.map(s => <tr key={s}>
              <td className="font-semibold">{s}</td>
              <td className="font-mono text-[12px] text-ink-muted">{s === 'Edit Patient' ? '/patients/edit' : \`/patients/:id\${s === 'Overview' ? '' : \`/\${s.split(' ')[0].toLowerCase()}\`}\`}</td>
              <td className="text-ink-medium">{migasPaciente('John Smith', '/patients/john-smith', seccionDe(s)).map(m => m.to ? \`\${m.label} →\` : m.label).join(' / ')}</td>
            </tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Spacing">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Arriba de la página, donde estaba "‹ Patients"; 16px (mb-4) sobre el panel del paciente y el contenido.</li>
          <li>Texto, colores y foco: los del Breadcrumb (Elements / Breadcrumb).</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as Parts,g as Playground,y as Specs,v as States,b as __namedExportsOrder,m as default};
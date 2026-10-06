import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i}from"./button-R5lrVQ2-.js";import{a,i as o,n as s,r as c,t as l}from"./drawer-CynsJDFo.js";import{f as u,h as d,m as f}from"./form-ClxpDPMA.js";import{a as p,i as m,l as h,n as g,s as _,t as v}from"./kit-VhBMbBcY.js";function y({title:e,description:t,steps:n,stepLabels:r,size:a,open:d}){let[p,m]=(0,b.useState)(d),[h,g]=(0,b.useState)(0),_=S.slice(0,n),v=Math.min(h,_.length-1),y=()=>{m(!1),g(0)};return(0,x.jsxs)(`div`,{className:`p-6`,children:[(0,x.jsx)(i,{onClick:()=>m(!0),children:`Open drawer`}),(0,x.jsx)(l,{open:p,onClose:y,title:e,description:t||void 0,size:a,steps:_,step:v,stepLabels:r,footer:(0,x.jsx)(s,{step:v,total:_.length,onNext:()=>g(v+1),onBack:()=>g(v-1),onCancel:y,onSave:y}),children:_.map((e,t)=>(0,x.jsx)(o,{index:t,step:v,children:(0,x.jsxs)(c,{title:`${e} Information`,children:[(0,x.jsxs)(`div`,{className:`grid grid-cols-1 gap-4 sm:grid-cols-2`,children:[(0,x.jsx)(f,{label:`First Name`,required:!0,placeholder:`John`}),(0,x.jsx)(f,{label:`Last Name`,required:!0,placeholder:`Smith`})]}),(0,x.jsx)(u,{label:`Country`,options:[`United States`,`Mexico`,`Argentina`]})]})},e))})]})}var b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{b=t(),a(),r(),d(),h(),x=n(),S=[`General`,`Contact`,`Demographic`,`Review`],C={title:`Components/UI/Drawer`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`Todo lo que se abre encima de una pantalla -formularios, detalles, editores- es un drawer que entra desde la derecha (Julián, 2026-10-06), con la lógica de Confidentally 2.0 y el diseño de esta plataforma. Las confirmaciones de una sola pregunta siguen siendo *ConfirmDialog*.`,``,"**Como en Confidentally 2.0:** una columna, secciones con título suelto sin caja (`DrawerSection`), campos de a dos por fila; con varias partes, los pasos (Step 1, 2, 3) debajo del título y cada parte en un `DrawerStep` (la que no se ve no se desmonta). **Pie (`DrawerActions`):** dos botones del mismo ancho: Cancel / Next Step en el primer paso, Return / Next Step en los del medio, Return / Save en el último. **Panel al costado (`aside`):** el calendario de New Appointment se despliega a la izquierda del drawer.",``,`**Tamaños:** md 480 (formularios cortos), lg 560 (formularios con pasos), xl 760 (tablas y editores), como los anchos de 2.0.`,``,'**Pasos:** al avanzar, el tilde rebota, la línea se llena en verde y el contenido entra desde la derecha (con Return, desde la izquierda). Con `stepLabels` cada paso dice su nombre en vez de "Step" (New Procedure).',``,`**Probalo:** en *Playground* cambiá la cantidad de pasos y el tamaño desde *Controls*.`].join(`
`)}}},args:{title:`New Patient`,description:`Create the patient record`,steps:3,stepLabels:!1,size:`lg`,open:!0},argTypes:{title:{control:`text`,description:`Qué se carga.`},description:{control:`text`,description:`Una línea de contexto. Vacía, no se muestra.`},steps:{control:{type:`range`,min:1,max:4,step:1},description:`Cantidad de pasos. Con 1 no se muestran pasos.`},stepLabels:{control:`boolean`,description:`Cada paso con su nombre en vez de "Step" (New Procedure).`},size:{control:`inline-radio`,options:[`md`,`lg`,`xl`],description:`md 480 · lg 560 · xl 760.`},open:{control:`boolean`,description:`Abierto al cargar. Apagado: se abre con el botón.`}}},w={render:e=>(0,x.jsx)(y,{...e},`${e.steps}-${e.size}-${e.stepLabels}`)},T={parameters:{controls:{disable:!0},layout:`padded`},render:()=>(0,x.jsxs)(m,{children:[(0,x.jsx)(v,{titulo:`Section`,nota:`DrawerSection: título suelto (y bajada) sin caja ni borde, como en 2.0. SectionCard se dibuja así dentro de un drawer.`,children:(0,x.jsx)(`div`,{className:`w-[420px] rounded-lg border border-dashed border-line p-5`,children:(0,x.jsx)(c,{title:`Contact Details`,description:`Update this patient's contact information`,children:(0,x.jsx)(f,{label:`Email Address`,placeholder:`john.smith@hotmail.com`})})})}),(0,x.jsx)(v,{titulo:`Footer`,nota:`DrawerActions: dos botones del mismo ancho, Cancel o Return a la izquierda y Next Step o Save a la derecha.`,children:(0,x.jsx)(p,{children:[[`1 step`,0,1],[`First step`,0,3],[`Middle step`,1,3],[`Last step`,2,3]].map(([e,t,n])=>(0,x.jsx)(g,{rotulo:e,children:(0,x.jsx)(`div`,{className:`flex w-[320px] items-center gap-3 rounded-lg border border-line p-4 [&>button]:flex-1`,children:(0,x.jsx)(s,{step:t,total:n,onNext:()=>{},onBack:()=>{},onCancel:()=>{},onSave:()=>{}})})},e))})})]})},E={parameters:{controls:{disable:!0},layout:`padded`},render:()=>(0,x.jsxs)(_,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Next disabled`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(`div`,{className:`flex w-[300px] items-center gap-3 [&>button]:flex-1`,children:(0,x.jsx)(s,{step:0,total:2,nextDisabled:!0,onNext:()=>{},onCancel:()=>{},onSave:()=>{}})})}),(0,x.jsx)(`td`,{className:`text-ink-medium`,children:`Falta algo obligatorio del paso: no se puede seguir.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Save disabled`}),(0,x.jsx)(`td`,{children:(0,x.jsx)(`div`,{className:`flex w-[300px] items-center gap-3 [&>button]:flex-1`,children:(0,x.jsx)(s,{step:1,total:2,saveDisabled:!0,onBack:()=>{},onCancel:()=>{},onSave:()=>{}})})}),(0,x.jsx)(`td`,{className:`text-ink-medium`,children:`Último paso sin completar: Save espera.`})]})]})},D={parameters:{controls:{disable:!0},layout:`padded`},render:()=>(0,x.jsxs)(m,{children:[(0,x.jsx)(v,{titulo:`Sizes`,nota:`Ancho máximo del panel; en el teléfono ocupa toda la pantalla.`,children:(0,x.jsxs)(_,{encabezado:[`Size`,`Width`,`For`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`md`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`480px`}),(0,x.jsx)(`td`,{children:`Formularios cortos: Edit Contact, Edit Relationship, medicamentos y alergias, New Room, New Hours, Review Exam.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`lg`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`560px`}),(0,x.jsx)(`td`,{children:`Formularios con pasos: New Patient, Edit Patient, New Appointment, subscriptions.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`xl`}),(0,x.jsx)(`td`,{className:`tabular-nums`,children:`760px`}),(0,x.jsx)(`td`,{children:`Tablas o editores: Post payment, Apply credit, Assign Role, AI Narrative Editor.`})]})]})}),(0,x.jsx)(v,{titulo:`Steps`,nota:`Elements / StepIndicator tiene la barra de pasos completa.`,children:(0,x.jsxs)(_,{encabezado:[`Rule`,`How`],minimo:640,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,x.jsxs)(`td`,{children:[`"Step" en todos, como en 2.0. Con `,(0,x.jsx)(`code`,{children:`stepLabels`}),`, el nombre de cada paso (sólo New Procedure).`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Next Step`}),(0,x.jsxs)(`td`,{children:[`Avanza sólo con lo obligatorio del paso completo; si falta algo lo marca en rojo, sólo en el paso a la vista (`,(0,x.jsx)(`code`,{children:`lib/useFormPasos`}),`). Save revisa todos y vuelve al primero incompleto.`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Motion`}),(0,x.jsx)(`td`,{children:`Al avanzar, el tilde rebota, la línea se llena y el contenido entra desde la derecha; con Return, desde la izquierda (260ms).`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Kept`}),(0,x.jsx)(`td`,{children:`Los pasos que no se ven no se desmontan: lo escrito se conserva al ir y volver.`})]})]})}),(0,x.jsx)(v,{titulo:`Where`,children:(0,x.jsxs)(_,{encabezado:[`Drawer`,`Steps`,`Size`],minimo:640,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`New Patient`}),(0,x.jsx)(`td`,{children:`General · Guardian (si hace falta) · Demography`}),(0,x.jsx)(`td`,{children:`lg`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`New Appointment`}),(0,x.jsx)(`td`,{children:`Patient and Scheduling · Link to treatment plan visit`}),(0,x.jsx)(`td`,{children:`lg + calendario al costado`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`New Location · New Employee`}),(0,x.jsx)(`td`,{children:`General · Contact · Address`}),(0,x.jsx)(`td`,{children:`lg`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`New Account`}),(0,x.jsx)(`td`,{children:`Information · Address · Owner`}),(0,x.jsx)(`td`,{children:`lg`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Add Relationship`}),(0,x.jsx)(`td`,{children:`Person · Contact · Relationship`}),(0,x.jsx)(`td`,{children:`lg`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`New Procedure`}),(0,x.jsx)(`td`,{children:`Procedure · Surfaces · Link to finding (con nombres)`}),(0,x.jsx)(`td`,{children:`md`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Edit Patient, subscriptions, Post payment`}),(0,x.jsx)(`td`,{children:`Ver cada componente`}),(0,x.jsx)(`td`,{children:`lg / xl`})]})]})})]})},O=[`Playground`,`Parts`,`States`,`Specs`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"{\n  render: args => <Demo key={`${args.steps}-${args.size}-${args.stepLabels}`} {...args} />\n}",...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Lienzo>
      <Bloque titulo="Section" nota="DrawerSection: título suelto (y bajada) sin caja ni borde, como en 2.0. SectionCard se dibuja así dentro de un drawer.">
        <div className="w-[420px] rounded-lg border border-dashed border-line p-5">
          <DrawerSection title="Contact Details" description="Update this patient's contact information">
            <TextField label="Email Address" placeholder="john.smith@hotmail.com" />
          </DrawerSection>
        </div>
      </Bloque>
      <Bloque titulo="Footer" nota="DrawerActions: dos botones del mismo ancho, Cancel o Return a la izquierda y Next Step o Save a la derecha.">
        <Muestras>
          {[['1 step', 0, 1], ['First step', 0, 3], ['Middle step', 1, 3], ['Last step', 2, 3]].map(([rotulo, step, total]) => <ConRotulo key={rotulo as string} rotulo={rotulo}>
              <div className="flex w-[320px] items-center gap-3 rounded-lg border border-line p-4 [&>button]:flex-1">
                <DrawerActions step={step as number} total={total as number} onNext={() => {}} onBack={() => {}} onCancel={() => {}} onSave={() => {}} />
              </div>
            </ConRotulo>)}
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
      <tr>
        <td className="font-semibold">Next disabled</td>
        <td><div className="flex w-[300px] items-center gap-3 [&>button]:flex-1"><DrawerActions step={0} total={2} nextDisabled onNext={() => {}} onCancel={() => {}} onSave={() => {}} /></div></td>
        <td className="text-ink-medium">Falta algo obligatorio del paso: no se puede seguir.</td>
      </tr>
      <tr>
        <td className="font-semibold">Save disabled</td>
        <td><div className="flex w-[300px] items-center gap-3 [&>button]:flex-1"><DrawerActions step={1} total={2} saveDisabled onBack={() => {}} onCancel={() => {}} onSave={() => {}} /></div></td>
        <td className="text-ink-medium">Último paso sin completar: Save espera.</td>
      </tr>
    </Tabla>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Ancho máximo del panel; en el teléfono ocupa toda la pantalla.">
        <Tabla encabezado={['Size', 'Width', 'For']} minimo={560}>
          <tr><td className="font-semibold">md</td><td className="tabular-nums">480px</td><td>Formularios cortos: Edit Contact, Edit Relationship, medicamentos y alergias, New Room, New Hours, Review Exam.</td></tr>
          <tr><td className="font-semibold">lg</td><td className="tabular-nums">560px</td><td>Formularios con pasos: New Patient, Edit Patient, New Appointment, subscriptions.</td></tr>
          <tr><td className="font-semibold">xl</td><td className="tabular-nums">760px</td><td>Tablas o editores: Post payment, Apply credit, Assign Role, AI Narrative Editor.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Steps" nota="Elements / StepIndicator tiene la barra de pasos completa.">
        <Tabla encabezado={['Rule', 'How']} minimo={640}>
          <tr><td className="font-semibold">Label</td><td>"Step" en todos, como en 2.0. Con <code>stepLabels</code>, el nombre de cada paso (sólo New Procedure).</td></tr>
          <tr><td className="font-semibold">Next Step</td><td>Avanza sólo con lo obligatorio del paso completo; si falta algo lo marca en rojo, sólo en el paso a la vista (<code>lib/useFormPasos</code>). Save revisa todos y vuelve al primero incompleto.</td></tr>
          <tr><td className="font-semibold">Motion</td><td>Al avanzar, el tilde rebota, la línea se llena y el contenido entra desde la derecha; con Return, desde la izquierda (260ms).</td></tr>
          <tr><td className="font-semibold">Kept</td><td>Los pasos que no se ven no se desmontan: lo escrito se conserva al ir y volver.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where">
        <Tabla encabezado={['Drawer', 'Steps', 'Size']} minimo={640}>
          <tr><td className="font-semibold">New Patient</td><td>General · Guardian (si hace falta) · Demography</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Appointment</td><td>Patient and Scheduling · Link to treatment plan visit</td><td>lg + calendario al costado</td></tr>
          <tr><td className="font-semibold">New Location · New Employee</td><td>General · Contact · Address</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Account</td><td>Information · Address · Owner</td><td>lg</td></tr>
          <tr><td className="font-semibold">Add Relationship</td><td>Person · Contact · Relationship</td><td>lg</td></tr>
          <tr><td className="font-semibold">New Procedure</td><td>Procedure · Surfaces · Link to finding (con nombres)</td><td>md</td></tr>
          <tr><td className="font-semibold">Edit Patient, subscriptions, Post payment</td><td>Ver cada componente</td><td>lg / xl</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}}})))()}k();export{T as Parts,w as Playground,D as Specs,E as States,O as __namedExportsOrder,C as default};
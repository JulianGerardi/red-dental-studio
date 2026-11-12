import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{_ as a,d as o,f as s,g as c,i as l,m as u,v as d,x as f,y as p}from"./form-BzaOROcp.js";import{c as m,d as h,h as g,i as _,l as v,m as y,n as b,p as x,s as S,t as C}from"./kit-CWUgB5-0.js";function w({type:e,label:t,placeholder:n,value:r,hint:i,error:s,required:f,disabled:p}){let[m,h]=(0,k.useState)(r),g={label:t,required:f,disabled:p,hint:i||void 0,error:s||void 0};return e===`Select`?(0,A.jsx)(c,{...g,placeholder:n||`Select`,options:j,value:m,onChange:h}):e===`Search`?(0,A.jsx)(u,{...g,placeholder:n||`Search...`,options:[`Amoxicillin`,`Ibuprofen`,`Lidocaine`],value:m,onChange:h}):e===`Date`?(0,A.jsx)(l,{...g,value:m,onChange:h}):e===`Textarea`?(0,A.jsx)(a,{...g,placeholder:n,value:m,onChange:h,rows:3}):e===`Checkbox`?(0,A.jsx)(o,{label:t,disabled:p}):(0,A.jsx)(d,{...g,placeholder:n,value:m,onChange:h})}function T({tipo:e,col:t}){let n=t===`Filled`||t===`Disabled`,r={label:`Label`,disabled:t===`Disabled`,error:t===`Error`?`This field is required.`:void 0},i=e===`Select`?(0,A.jsx)(c,{...r,options:j,value:n?`Female`:``,onChange:()=>{}}):e===`Textarea`?(0,A.jsx)(a,{...r,placeholder:`Placeholder`,rows:2,value:n?`Sensitive to cold.`:``,onChange:()=>{}}):(0,A.jsx)(d,{...r,placeholder:`Placeholder`,value:n?`Sarah Stone`:void 0});return(0,A.jsx)(`div`,{className:t===`Focus`?`pseudo-focus-all pseudo-focus-visible-all`:``,children:i})}function E({inicial:e=``,disabled:t,abierto:n}){let[r,i]=(0,k.useState)(e),a=(0,k.useRef)(null);return(0,k.useLayoutEffect)(()=>{n&&a.current?.querySelector(`input`)?.focus()},[n]),(0,A.jsx)(`div`,{ref:a,children:(0,A.jsx)(s,{label:`Select person`,required:!0,placeholder:`Search by Name or Last Name`,personas:R.map(e=>e.name),chips:z,value:r,onChange:i,disabled:t})})}function D({nombre:e,children:t,selector:n}){let{ref:r,m:i}=x(n);return(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:e}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`div`,{ref:r,className:`w-[180px]`,children:t})}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:i?.alto}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:i?.padding}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:i?.texto}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:i?.radio})]})}function O({nombre:e,clase:t,children:n}){let i=(0,k.useRef)(null),[a,o]=(0,k.useState)(null);return(0,k.useLayoutEffect)(()=>{let e=i.current?.querySelector(`input`);if(!e)return;let t=getComputedStyle(e);o([y(t.borderTopColor),y(t.backgroundColor),y(t.color)])},[]),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:e}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`div`,{ref:i,className:r(`w-[170px]`,t),children:n})}),(a??[``,``,``]).map((e,t)=>(0,A.jsx)(`td`,{children:(0,A.jsxs)(`span`,{className:`inline-flex items-center gap-2`,children:[(0,A.jsx)(S,{color:e}),(0,A.jsx)(`span`,{className:`text-[12px] tabular-nums`,children:e})]})},t))]})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{k=t(),f(),h(),n(),g(),A=i(),j=[`Female`,`Male`,`Other`],M={title:`Elements/Fields`,component:d,parameters:{layout:`padded`,docs:{decisionsFrom:`components/patients/form.tsx`,description:{component:["Los campos de formulario de la app (`@/components/patients/form`). Todos comparten el mismo aspecto: rótulo arriba, control de 36px, texto de ayuda o error debajo.",``,`**Cuál usar:** *Text* para texto corto · *Select* para elegir de una lista · *Search* para buscar con sugerencias · *Date* para una fecha tipeada · *Textarea* para texto largo · *Checkbox* para aceptar o activar una opción.`,``,"**Search puede llevar una segunda línea por sugerencia** (`subtext`, 2026-10-19): para desambiguar cuando el nombre no alcanza, como Patient y Provider en *Components / Scheduling / NewAppointmentModal* (fecha de nacimiento y email del paciente; email del provider). Sin `subtext`, la sugerencia es sólo el nombre, como siempre.",``,"**Buscar una persona es `PersonSearchField`, no `Search`** (2026-10-20): mismo campo, pero cada sugerencia y la elegida son cards con avatar y hasta dos líneas (DOB, email…) -el diseño de *Components / Patients / AddRelationshipDrawer → Select person*, compartido por cualquier buscador de persona de la app (Patient y Provider de New Appointment, Select person de Add Relationship y de los modales de Insurance)-. Nada se ve mientras no se escribe nada. **Las sugerencias flotan en un desplegable pegado al input** (2026-10-21), sin empujar los campos de abajo, y la elegida queda debajo con una **✕ para quitarla** y volver a buscar. Ver *States → Person search* acá abajo.",``,'**Date puede abrir con una fecha cargada** (`valorInicial`, 2026-10-22): Edit Patient abre con el nacimiento puesto, como lo devuelve `onChange` ("April 2, 2025"). Sin ella sigue pidiendo la fecha.',``,`**Probalo:** en *Playground* cambiá tipo, rótulo, valor, ayuda, error y estado desde *Controls*; en *States → Person search*, escribí un nombre de la lista para ver el desplegable, elegí uno y quitalo con la ✕.`].join(`
`)}}},args:{type:`Text`,label:`First name`,placeholder:`Type here`,value:``,hint:``,error:``,required:!1,disabled:!1,state:`default`},argTypes:{type:{control:`inline-radio`,options:[`Text`,`Select`,`Search`,`Date`,`Textarea`,`Checkbox`],description:`Tipo de campo.`},label:{control:`text`,description:`Rótulo arriba del campo.`},placeholder:{control:`text`,description:`Texto gris cuando está vacío.`},value:{control:`text`,description:`Valor cargado.`},hint:{control:`text`,description:`Texto de ayuda debajo del campo.`},error:{control:`text`,description:`Mensaje de error. Pinta el borde de rojo y reemplaza la ayuda.`},required:{control:`boolean`,description:`Agrega el asterisco rojo.`},disabled:{control:`boolean`},state:{control:`inline-radio`,options:[`default`,`focus`],description:`Fuerza el foco para verlo sin hacer clic.`,table:{category:`Preview`}}}},N=[e=>(0,A.jsx)(`div`,{className:`w-[340px] max-w-full`,children:(0,A.jsx)(e,{})})],P={decorators:N,render:({state:e,...t})=>(0,A.jsx)(`div`,{className:e===`focus`?`pseudo-focus-all pseudo-focus-visible-all`:``,children:(0,A.jsx)(w,{...t},`${t.type}-${t.value}`)})},F={parameters:{controls:{include:[`required`,`disabled`]}},decorators:[e=>(0,A.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,A.jsx)(e,{})})],render:({required:e,disabled:t})=>(0,A.jsxs)(`div`,{className:`grid grid-cols-1 gap-5 sm:grid-cols-2`,children:[(0,A.jsx)(d,{label:`Text`,placeholder:`Type here`,required:e,disabled:t}),(0,A.jsx)(c,{label:`Select`,options:j,required:e,disabled:t}),(0,A.jsx)(u,{label:`Search`,options:[`Amoxicillin`,`Ibuprofen`],required:e,disabled:t}),(0,A.jsx)(l,{label:`Date`,required:e,disabled:t}),(0,A.jsx)(a,{label:`Textarea`,placeholder:`Add notes`,rows:3,required:e,disabled:t}),(0,A.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,A.jsx)(`span`,{className:`text-xs font-medium text-ink`,children:`Checkbox`}),(0,A.jsx)(o,{label:`Send a reminder to the patient`,disabled:t})]})]})},I=[`Empty`,`Filled`,`Focus`,`Error`,`Disabled`],L={parameters:{controls:{disable:!0}},decorators:[e=>(0,A.jsx)(`div`,{className:`w-[980px] max-w-full`,children:(0,A.jsx)(e,{})})],render:()=>(0,A.jsx)(m,{encabezado:[`Type`,...I],minimo:940,arriba:!0,children:[`Text`,`Select`,`Textarea`].map(e=>(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`w-[90px] pt-[38px] font-semibold`,children:e}),I.map(t=>(0,A.jsx)(`td`,{className:`w-[170px] align-top`,children:(0,A.jsx)(T,{tipo:e,col:t})},t))]},e))})},R=[{name:`Michael Miller`,dob:`May 14, 1982`,email:`mm.thompson@yahoo.com`},{name:`Jessica Miller`,dob:`May 14, 1982`,email:`jessica.miller@gmail.com`},{name:`Robert Miller`,dob:`March 2, 1979`,email:`rob.miller@outlook.com`}],z=e=>{let t=R.find(t=>t.name===e);return t&&p(t.dob,t.email)},B={name:`Person search`,parameters:{controls:{disable:!0}},decorators:[e=>(0,A.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,A.jsx)(e,{})})],render:()=>(0,A.jsxs)(_,{children:[(0,A.jsx)(C,{titulo:`Parts`,children:(0,A.jsx)(v,{partes:[[`Input`,`Igual que Search: lupa + texto; filtra mientras se escribe.`,`PersonSearchField`],[`Suggestions`,`Desplegable pegado al input, sobre los campos de abajo: una card por persona que matchea, con avatar, nombre y hasta dos líneas (DOB, email…). Se cierra al elegir o al tocar afuera.`,`PersonSearchField`],[`Selected card`,`La elegida, debajo del input y con borde azul.`,`PersonSearchField`],[`Remove`,`La ✕ de la card elegida: vacía el campo para buscar a otra persona. No está con el campo deshabilitado.`,`PersonSearchField`]]})}),(0,A.jsx)(C,{titulo:`States`,nota:`Nada se ve con el campo vacío. Las sugerencias flotan sobre lo que sigue; elegir una la deja con borde azul y la ✕ la quita.`,children:(0,A.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,A.jsx)(b,{rotulo:`Empty`,children:(0,A.jsx)(`div`,{className:`w-[320px]`,children:(0,A.jsx)(E,{})})}),(0,A.jsx)(b,{rotulo:`Typing (suggestions open)`,children:(0,A.jsx)(`div`,{className:`min-h-[300px] w-[320px]`,children:(0,A.jsx)(E,{inicial:`mi`,abierto:!0})})}),(0,A.jsx)(b,{rotulo:`Selected`,children:(0,A.jsx)(`div`,{className:`w-[320px]`,children:(0,A.jsx)(E,{inicial:`Jessica Miller`})})}),(0,A.jsx)(b,{rotulo:`Disabled`,children:(0,A.jsx)(`div`,{className:`w-[320px]`,children:(0,A.jsx)(E,{inicial:`Jessica Miller`,disabled:!0})})})]})})]})},V={name:`Hint and error`,parameters:{controls:{disable:!0}},decorators:N,render:()=>(0,A.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,A.jsx)(d,{label:`Email`,placeholder:`name@clinic.com`,hint:`We send the appointment reminders here.`}),(0,A.jsx)(d,{label:`Email`,required:!0,placeholder:`name@clinic.com`,error:`Enter a valid email.`,value:`sarah@`})]})},H={parameters:{controls:{disable:!0}},decorators:[e=>(0,A.jsx)(`div`,{className:`w-[880px] max-w-full`,children:(0,A.jsx)(e,{})})],render:()=>(0,A.jsxs)(_,{children:[(0,A.jsx)(C,{titulo:`Sizes`,nota:`Todos los campos miden 36px de alto; el rótulo va 8px arriba y la ayuda o el error 4px abajo.`,children:(0,A.jsxs)(m,{encabezado:[`Type`,`Sample`,`Height`,`Padding`,`Text`,`Radius`],minimo:680,children:[(0,A.jsx)(D,{nombre:`Text`,selector:`input`,children:(0,A.jsx)(d,{label:`Label`,placeholder:`Placeholder`})}),(0,A.jsx)(D,{nombre:`Search`,selector:`input`,children:(0,A.jsx)(u,{label:`Label`})}),(0,A.jsx)(D,{nombre:`Select`,selector:`button`,children:(0,A.jsx)(c,{label:`Label`,options:j})})]})}),(0,A.jsx)(C,{titulo:`Colors`,nota:`Leídos del campo en cada estado. El error agrega el mensaje en el mismo rojo del borde.`,children:(0,A.jsxs)(m,{encabezado:[`State`,`Sample`,`Border`,`Fill`,`Text`],minimo:720,children:[(0,A.jsx)(O,{nombre:`Default`,clase:``,children:(0,A.jsx)(d,{label:`Label`,value:`Sarah Stone`})}),(0,A.jsx)(O,{nombre:`Focus`,clase:`pseudo-focus-all`,children:(0,A.jsx)(d,{label:`Label`,value:`Sarah Stone`})}),(0,A.jsx)(O,{nombre:`Error`,clase:``,children:(0,A.jsx)(d,{label:`Label`,value:`Sarah Stone`,error:`This field is required.`})}),(0,A.jsx)(O,{nombre:`Disabled`,clase:``,children:(0,A.jsx)(d,{label:`Label`,value:`Sarah Stone`,disabled:!0})})]})})]})},U=[`Playground`,`Types`,`States`,`PersonSearch`,`WithHintAndError`,`Specs`],P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  decorators: angosto,
  render: ({
    state,
    ...args
  }) => <div className={state === 'focus' ? 'pseudo-focus-all pseudo-focus-visible-all' : ''}>
      {/* key: al cambiar el valor desde Controls, el campo arranca de nuevo con ese valor. */}
      <Campo key={\`\${args.type}-\${args.value}\`} {...args} />
    </div>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['required', 'disabled']
    }
  },
  decorators: [Story => <div className="w-[720px] max-w-full"><Story /></div>],
  render: ({
    required,
    disabled
  }) => <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <TextField label="Text" placeholder="Type here" required={required} disabled={disabled} />
      <SelectField label="Select" options={OPCIONES} required={required} disabled={disabled} />
      <SearchField label="Search" options={['Amoxicillin', 'Ibuprofen']} required={required} disabled={disabled} />
      <DateTextField label="Date" required={required} disabled={disabled} />
      <TextArea label="Textarea" placeholder="Add notes" rows={3} required={required} disabled={disabled} />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-ink">Checkbox</span>
        <OptionCheckbox label="Send a reminder to the patient" disabled={disabled} />
      </div>
    </div>
}`,...F.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div className="w-[980px] max-w-full"><Story /></div>],
  render: () => <Tabla encabezado={['Type', ...COLUMNAS]} minimo={940} arriba>
      {(['Text', 'Select', 'Textarea'] as const).map(t => <tr key={t}>
          <td className="w-[90px] pt-[38px] font-semibold">{t}</td>
          {COLUMNAS.map(c => <td key={c} className="w-[170px] align-top"><Celda tipo={t} col={c} /></td>)}
        </tr>)}
    </Tabla>
}`,...L.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Person search',
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div className="w-[720px] max-w-full"><Story /></div>],
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Input', 'Igual que Search: lupa + texto; filtra mientras se escribe.', 'PersonSearchField'], ['Suggestions', 'Desplegable pegado al input, sobre los campos de abajo: una card por persona que matchea, con avatar, nombre y hasta dos líneas (DOB, email…). Se cierra al elegir o al tocar afuera.', 'PersonSearchField'], ['Selected card', 'La elegida, debajo del input y con borde azul.', 'PersonSearchField'], ['Remove', 'La ✕ de la card elegida: vacía el campo para buscar a otra persona. No está con el campo deshabilitado.', 'PersonSearchField']]} />
      </Bloque>
      <Bloque titulo="States" nota="Nada se ve con el campo vacío. Las sugerencias flotan sobre lo que sigue; elegir una la deja con borde azul y la ✕ la quita.">
        <div className="flex flex-col gap-6">
          <ConRotulo rotulo="Empty"><div className="w-[320px]"><PersonSearchDemo /></div></ConRotulo>
          <ConRotulo rotulo="Typing (suggestions open)"><div className="min-h-[300px] w-[320px]"><PersonSearchDemo inicial="mi" abierto /></div></ConRotulo>
          <ConRotulo rotulo="Selected"><div className="w-[320px]"><PersonSearchDemo inicial="Jessica Miller" /></div></ConRotulo>
          <ConRotulo rotulo="Disabled"><div className="w-[320px]"><PersonSearchDemo inicial="Jessica Miller" disabled /></div></ConRotulo>
        </div>
      </Bloque>
    </Lienzo>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Hint and error',
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: angosto,
  render: () => <div className="flex flex-col gap-5">
      <TextField label="Email" placeholder="name@clinic.com" hint="We send the appointment reminders here." />
      <TextField label="Email" required placeholder="name@clinic.com" error="Enter a valid email." value="sarah@" />
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div className="w-[880px] max-w-full"><Story /></div>],
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Todos los campos miden 36px de alto; el rótulo va 8px arriba y la ayuda o el error 4px abajo.">
        <Tabla encabezado={['Type', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={680}>
          <FilaMedidas nombre="Text" selector="input"><TextField label="Label" placeholder="Placeholder" /></FilaMedidas>
          <FilaMedidas nombre="Search" selector="input"><SearchField label="Label" /></FilaMedidas>
          <FilaMedidas nombre="Select" selector="button"><SelectField label="Label" options={OPCIONES} /></FilaMedidas>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="Leídos del campo en cada estado. El error agrega el mensaje en el mismo rojo del borde.">
        <Tabla encabezado={['State', 'Sample', 'Border', 'Fill', 'Text']} minimo={720}>
          <FilaColores nombre="Default" clase=""><TextField label="Label" value="Sarah Stone" /></FilaColores>
          <FilaColores nombre="Focus" clase="pseudo-focus-all"><TextField label="Label" value="Sarah Stone" /></FilaColores>
          <FilaColores nombre="Error" clase=""><TextField label="Label" value="Sarah Stone" error="This field is required." /></FilaColores>
          <FilaColores nombre="Disabled" clase=""><TextField label="Label" value="Sarah Stone" disabled /></FilaColores>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...H.parameters?.docs?.source}}}})))()}W();export{B as PersonSearch,P as Playground,H as Specs,L as States,F as Types,V as WithHintAndError,U as __namedExportsOrder,M as default};
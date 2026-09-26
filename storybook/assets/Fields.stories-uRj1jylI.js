import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{f as a,h as o,l as s,m as c,n as l,p as u,u as d}from"./form-okBm0E1v.js";import{a as f,c as p,d as m,l as h,o as g,r as _,t as v,u as y}from"./kit-DxbGnops.js";function b({type:e,label:t,placeholder:n,value:r,hint:i,error:o,required:f,disabled:p}){let[m,h]=(0,w.useState)(r),g={label:t,required:f,disabled:p,hint:i||void 0,error:o||void 0};return e===`Select`?(0,T.jsx)(a,{...g,placeholder:n||`Select`,options:E,value:m,onChange:h}):e===`Search`?(0,T.jsx)(d,{...g,placeholder:n||`Search...`,options:[`Amoxicillin`,`Ibuprofen`,`Lidocaine`],value:m,onChange:h}):e===`Date`?(0,T.jsx)(l,{...g,value:m,onChange:h}):e===`Textarea`?(0,T.jsx)(u,{...g,placeholder:n,value:m,onChange:h,rows:3}):e===`Checkbox`?(0,T.jsx)(s,{label:t,disabled:p}):(0,T.jsx)(c,{...g,placeholder:n,value:m,onChange:h})}function x({tipo:e,col:t}){let n=t===`Filled`||t===`Disabled`,r={label:`Label`,disabled:t===`Disabled`,error:t===`Error`?`This field is required.`:void 0},i=e===`Select`?(0,T.jsx)(a,{...r,options:E,value:n?`Female`:``,onChange:()=>{}}):e===`Textarea`?(0,T.jsx)(u,{...r,placeholder:`Placeholder`,rows:2,value:n?`Sensitive to cold.`:``,onChange:()=>{}}):(0,T.jsx)(c,{...r,placeholder:`Placeholder`,value:n?`Sarah Stone`:void 0});return(0,T.jsx)(`div`,{className:t===`Focus`?`pseudo-focus-all pseudo-focus-visible-all`:``,children:i})}function S({nombre:e,children:t,selector:n}){let{ref:r,m:i}=h(n);return(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:e}),(0,T.jsx)(`td`,{children:(0,T.jsx)(`div`,{ref:r,className:`w-[180px]`,children:t})}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:i?.alto}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:i?.padding}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:i?.texto}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:i?.radio})]})}function C({nombre:e,clase:t,children:n}){let i=(0,w.useRef)(null),[a,o]=(0,w.useState)(null);return(0,w.useLayoutEffect)(()=>{let e=i.current?.querySelector(`input`);if(!e)return;let t=getComputedStyle(e);o([y(t.borderTopColor),y(t.backgroundColor),y(t.color)])},[]),(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:e}),(0,T.jsx)(`td`,{children:(0,T.jsx)(`div`,{ref:i,className:r(`w-[170px]`,t),children:n})}),(a??[``,``,``]).map((e,t)=>(0,T.jsx)(`td`,{children:(0,T.jsxs)(`span`,{className:`inline-flex items-center gap-2`,children:[(0,T.jsx)(f,{color:e}),(0,T.jsx)(`span`,{className:`text-[12px] tabular-nums`,children:e})]})},t))]})}var w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{w=t(),o(),p(),n(),m(),T=i(),E=[`Female`,`Male`,`Other`],D={title:`Elements/Fields`,component:c,parameters:{layout:`padded`,docs:{description:{component:["Los campos de formulario de la app (`@/components/patients/form`). Todos comparten el mismo aspecto: rótulo arriba, control de 36px, texto de ayuda o error debajo.",``,`**Cuál usar:** *Text* para texto corto · *Select* para elegir de una lista · *Search* para buscar con sugerencias · *Date* para una fecha tipeada · *Textarea* para texto largo · *Checkbox* para aceptar o activar una opción.`,``,`**Probalo:** en *Playground* cambiá tipo, rótulo, valor, ayuda, error y estado desde *Controls*.`].join(`
`)}}},args:{type:`Text`,label:`First name`,placeholder:`Type here`,value:``,hint:``,error:``,required:!1,disabled:!1,state:`default`},argTypes:{type:{control:`inline-radio`,options:[`Text`,`Select`,`Search`,`Date`,`Textarea`,`Checkbox`],description:`Tipo de campo.`},label:{control:`text`,description:`Rótulo arriba del campo.`},placeholder:{control:`text`,description:`Texto gris cuando está vacío.`},value:{control:`text`,description:`Valor cargado.`},hint:{control:`text`,description:`Texto de ayuda debajo del campo.`},error:{control:`text`,description:`Mensaje de error. Pinta el borde de rojo y reemplaza la ayuda.`},required:{control:`boolean`,description:`Agrega el asterisco rojo.`},disabled:{control:`boolean`},state:{control:`inline-radio`,options:[`default`,`focus`],description:`Fuerza el foco para verlo sin hacer clic.`,table:{category:`Preview`}}}},O=[e=>(0,T.jsx)(`div`,{className:`w-[340px] max-w-full`,children:(0,T.jsx)(e,{})})],k={decorators:O,render:({state:e,...t})=>(0,T.jsx)(`div`,{className:e===`focus`?`pseudo-focus-all pseudo-focus-visible-all`:``,children:(0,T.jsx)(b,{...t},`${t.type}-${t.value}`)})},A={parameters:{controls:{include:[`required`,`disabled`]}},decorators:[e=>(0,T.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,T.jsx)(e,{})})],render:({required:e,disabled:t})=>(0,T.jsxs)(`div`,{className:`grid grid-cols-1 gap-5 sm:grid-cols-2`,children:[(0,T.jsx)(c,{label:`Text`,placeholder:`Type here`,required:e,disabled:t}),(0,T.jsx)(a,{label:`Select`,options:E,required:e,disabled:t}),(0,T.jsx)(d,{label:`Search`,options:[`Amoxicillin`,`Ibuprofen`],required:e,disabled:t}),(0,T.jsx)(l,{label:`Date`,required:e,disabled:t}),(0,T.jsx)(u,{label:`Textarea`,placeholder:`Add notes`,rows:3,required:e,disabled:t}),(0,T.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,T.jsx)(`span`,{className:`text-xs font-medium text-ink`,children:`Checkbox`}),(0,T.jsx)(s,{label:`Send a reminder to the patient`,disabled:t})]})]})},j=[`Empty`,`Filled`,`Focus`,`Error`,`Disabled`],M={parameters:{controls:{disable:!0}},decorators:[e=>(0,T.jsx)(`div`,{className:`w-[980px] max-w-full`,children:(0,T.jsx)(e,{})})],render:()=>(0,T.jsx)(g,{encabezado:[`Type`,...j],minimo:940,arriba:!0,children:[`Text`,`Select`,`Textarea`].map(e=>(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`w-[90px] pt-[38px] font-semibold`,children:e}),j.map(t=>(0,T.jsx)(`td`,{className:`w-[170px] align-top`,children:(0,T.jsx)(x,{tipo:e,col:t})},t))]},e))})},N={name:`Hint and error`,parameters:{controls:{disable:!0}},decorators:O,render:()=>(0,T.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,T.jsx)(c,{label:`Email`,placeholder:`name@clinic.com`,hint:`We send the appointment reminders here.`}),(0,T.jsx)(c,{label:`Email`,required:!0,placeholder:`name@clinic.com`,error:`Enter a valid email.`,value:`sarah@`})]})},P={parameters:{controls:{disable:!0}},decorators:[e=>(0,T.jsx)(`div`,{className:`w-[880px] max-w-full`,children:(0,T.jsx)(e,{})})],render:()=>(0,T.jsxs)(_,{children:[(0,T.jsx)(v,{titulo:`Sizes`,nota:`Todos los campos miden 36px de alto; el rótulo va 8px arriba y la ayuda o el error 4px abajo.`,children:(0,T.jsxs)(g,{encabezado:[`Type`,`Sample`,`Height`,`Padding`,`Text`,`Radius`],minimo:680,children:[(0,T.jsx)(S,{nombre:`Text`,selector:`input`,children:(0,T.jsx)(c,{label:`Label`,placeholder:`Placeholder`})}),(0,T.jsx)(S,{nombre:`Search`,selector:`input`,children:(0,T.jsx)(d,{label:`Label`})}),(0,T.jsx)(S,{nombre:`Select`,selector:`button`,children:(0,T.jsx)(a,{label:`Label`,options:E})})]})}),(0,T.jsx)(v,{titulo:`Colors`,nota:`Leídos del campo en cada estado. El error agrega el mensaje en el mismo rojo del borde.`,children:(0,T.jsxs)(g,{encabezado:[`State`,`Sample`,`Border`,`Fill`,`Text`],minimo:720,children:[(0,T.jsx)(C,{nombre:`Default`,clase:``,children:(0,T.jsx)(c,{label:`Label`,value:`Sarah Stone`})}),(0,T.jsx)(C,{nombre:`Focus`,clase:`pseudo-focus-all`,children:(0,T.jsx)(c,{label:`Label`,value:`Sarah Stone`})}),(0,T.jsx)(C,{nombre:`Error`,clase:``,children:(0,T.jsx)(c,{label:`Label`,value:`Sarah Stone`,error:`This field is required.`})}),(0,T.jsx)(C,{nombre:`Disabled`,clase:``,children:(0,T.jsx)(c,{label:`Label`,value:`Sarah Stone`,disabled:!0})})]})})]})},F=[`Playground`,`Types`,`States`,`WithHintAndError`,`Specs`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  decorators: angosto,
  render: ({
    state,
    ...args
  }) => <div className={state === 'focus' ? 'pseudo-focus-all pseudo-focus-visible-all' : ''}>
      {/* key: al cambiar el valor desde Controls, el campo arranca de nuevo con ese valor. */}
      <Campo key={\`\${args.type}-\${args.value}\`} {...args} />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}}})))()}I();export{k as Playground,P as Specs,M as States,A as Types,N as WithHintAndError,F as __namedExportsOrder,D as default};
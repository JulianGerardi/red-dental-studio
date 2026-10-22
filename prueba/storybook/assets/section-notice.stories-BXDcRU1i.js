import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,d as r,g as i,h as a,i as o,l as s,t as c,u as l}from"./kit-CWUgB5-0.js";import{n as u,t as d}from"./section-notice-D-BQQxSs.js";var f,p,m,h,g,_,v;function y(){return(y=e((()=>{u(),r(),a(),f=t(),p={title:`Elements/Section notice`,component:d,parameters:{layout:`padded`,docs:{description:{component:["El aviso de una sección de formulario (`@/components/ui/section-notice`): una franja cálida con barra a la izquierda y un texto corto. Va arriba de los campos y explica para qué sirve la sección, por ejemplo *Optional section. Use this section when a guardian needs to be associated with the patient…* en el paso Guardian de New Patient y Edit Patient (Figma 5277:125202).",``,"**No es un Alert:** `Alert` avisa de algo que pasó o que hay que atender (ícono, título, color por estado); éste sólo acompaña a la sección, sin ícono ni título. Si lo que dice es un error o un bloqueo, va `Alert`.",``,`**Probalo:** en *Playground* cambiá el texto desde *Controls*; con dos renglones se ve cómo parte.`].join(`
`)}}},args:{children:`Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.`},argTypes:{children:{control:`text`,description:`El texto del aviso, una o dos oraciones.`},className:{table:{disable:!0}}},decorators:[e=>(0,f.jsx)(`div`,{className:`w-[480px] max-w-full`,children:(0,f.jsx)(e,{})})]},m={},h={parameters:{controls:{disable:!0}},decorators:[e=>(0,f.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,f.jsx)(e,{})})],render:()=>(0,f.jsx)(o,{children:(0,f.jsx)(c,{titulo:`Parts`,children:(0,f.jsx)(s,{partes:[[`Bar`,`Barra de 3px a la izquierda, en el color del texto: es lo que lo separa de un campo.`,`SectionNotice`],[`Text`,`11px en negrita, hasta dos oraciones. Sin ícono ni título.`,`SectionNotice`]]})})})},g={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(o,{children:(0,f.jsx)(c,{titulo:`States`,nota:`Una oración o dos: siempre del ancho de la columna de campos, y el texto parte en renglones sin cortar la barra.`,children:(0,f.jsxs)(`div`,{className:`flex w-[480px] max-w-full flex-col gap-4`,children:[(0,f.jsx)(d,{children:`Additional contact and address information. These fields are optional.`}),(0,f.jsx)(d,{children:`Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.`})]})})})},_={parameters:{controls:{disable:!0}},render:()=>{let e=i(`border-l-[3px] border-attn-fg bg-warn-bg text-attn-fg`);return(0,f.jsxs)(o,{children:[(0,f.jsx)(c,{titulo:`Colors`,nota:`Tokens de section-notice.tsx y src/index.css.`,children:(0,f.jsxs)(n,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Fill`}),(0,f.jsx)(`td`,{children:(0,f.jsx)(l,{nombre:e.fondo})})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Bar`}),(0,f.jsx)(`td`,{children:(0,f.jsx)(l,{nombre:e.borde})})]}),(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,f.jsx)(`td`,{children:(0,f.jsx)(l,{nombre:e.texto})})]})]})}),(0,f.jsx)(c,{titulo:`Sizes`,nota:`Padding 16px a los costados y 12px arriba y abajo; texto de 11px con interlineado 1,5; esquinas redondeadas sólo a la derecha (la izquierda es la barra).`,children:(0,f.jsx)(d,{className:`w-[320px]`,children:`Optional section.`})})]})}},v=[`Playground`,`Parts`,`States`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div className="w-[720px] max-w-full"><Story /></div>],
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Bar', 'Barra de 3px a la izquierda, en el color del texto: es lo que lo separa de un campo.', 'SectionNotice'], ['Text', '11px en negrita, hasta dos oraciones. Sin ícono ni título.', 'SectionNotice']]} />
      </Bloque>
    </Lienzo>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States" nota="Una oración o dos: siempre del ancho de la columna de campos, y el texto parte en renglones sin cortar la barra.">
        <div className="flex w-[480px] max-w-full flex-col gap-4">
          <SectionNotice>Additional contact and address information. These fields are optional.</SectionNotice>
          <SectionNotice>Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.</SectionNotice>
        </div>
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    const k = tokensDe('border-l-[3px] border-attn-fg bg-warn-bg text-attn-fg');
    return <Lienzo>
        <Bloque titulo="Colors" nota="Tokens de section-notice.tsx y src/index.css.">
          <Tabla encabezado={['Part', 'Token']} minimo={420}>
            <tr><td className="font-semibold">Fill</td><td><Token nombre={k.fondo} /></td></tr>
            <tr><td className="font-semibold">Bar</td><td><Token nombre={k.borde} /></td></tr>
            <tr><td className="font-semibold">Text</td><td><Token nombre={k.texto} /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Sizes" nota="Padding 16px a los costados y 12px arriba y abajo; texto de 11px con interlineado 1,5; esquinas redondeadas sólo a la derecha (la izquierda es la barra).">
          <SectionNotice className="w-[320px]">Optional section.</SectionNotice>
        </Bloque>
      </Lienzo>;
  }
}`,..._.parameters?.docs?.source}}}})))()}y();export{h as Parts,m as Playground,_ as Specs,g as States,v as __namedExportsOrder,p as default};
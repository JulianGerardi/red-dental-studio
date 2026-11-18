import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{_ as i,d as a,f as o,g as s,i as c,l,t as u,u as d}from"./kit-Di92TvVK.js";function f({children:e,className:t}){return(0,p.jsx)(`div`,{role:`note`,className:n(`rounded-r-md border-l-[3px] border-attn-fg bg-warn-bg px-4 py-3 text-[11px] leading-[1.5] font-bold text-attn-fg`,t),children:e})}var p;function m(){return(m=e((()=>{t(),p=r(),f.__docgenInfo={description:``,methods:[],displayName:`SectionNotice`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var h,g,_,v,y,b,x;function S(){return(S=e((()=>{m(),o(),s(),h=r(),g={title:`Elements/Section notice`,component:f,parameters:{layout:`padded`,docs:{description:{component:["El aviso de una sección de formulario (`@/components/ui/section-notice`): una franja cálida con barra a la izquierda y un texto corto. Va arriba de los campos y explica para qué sirve la sección, por ejemplo *Optional section. Use this section when a guardian needs to be associated with the patient…* en el paso Guardian de New Patient y Edit Patient (Figma 5277:125202).",``,"**No es un Alert:** `Alert` avisa de algo que pasó o que hay que atender (ícono, título, color por estado); éste sólo acompaña a la sección, sin ícono ni título. Si lo que dice es un error o un bloqueo, va `Alert`.",``,`**Probalo:** en *Playground* cambiá el texto desde *Controls*; con dos renglones se ve cómo parte.`].join(`
`)}}},args:{children:`Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.`},argTypes:{children:{control:`text`,description:`El texto del aviso, una o dos oraciones.`},className:{table:{disable:!0}}},decorators:[e=>(0,h.jsx)(`div`,{className:`w-[480px] max-w-full`,children:(0,h.jsx)(e,{})})]},_={},v={parameters:{controls:{disable:!0}},decorators:[e=>(0,h.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,h.jsx)(e,{})})],render:()=>(0,h.jsx)(c,{children:(0,h.jsx)(u,{titulo:`Parts`,children:(0,h.jsx)(d,{partes:[[`Bar`,`Barra de 3px a la izquierda, en el color del texto: es lo que lo separa de un campo.`,`SectionNotice`],[`Text`,`11px en negrita, hasta dos oraciones. Sin ícono ni título.`,`SectionNotice`]]})})})},y={parameters:{controls:{disable:!0}},render:()=>(0,h.jsx)(c,{children:(0,h.jsx)(u,{titulo:`States`,nota:`Una oración o dos: siempre del ancho de la columna de campos, y el texto parte en renglones sin cortar la barra.`,children:(0,h.jsxs)(`div`,{className:`flex w-[480px] max-w-full flex-col gap-4`,children:[(0,h.jsx)(f,{children:`Additional contact and address information. These fields are optional.`}),(0,h.jsx)(f,{children:`Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.`})]})})})},b={parameters:{controls:{disable:!0}},render:()=>{let e=i(`border-l-[3px] border-attn-fg bg-warn-bg text-attn-fg`);return(0,h.jsxs)(c,{children:[(0,h.jsx)(u,{titulo:`Colors`,nota:`Tokens de section-notice.tsx y src/index.css.`,children:(0,h.jsxs)(l,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Fill`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(a,{nombre:e.fondo})})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Bar`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(a,{nombre:e.borde})})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(a,{nombre:e.texto})})]})]})}),(0,h.jsx)(u,{titulo:`Sizes`,nota:`Padding 16px a los costados y 12px arriba y abajo; texto de 11px con interlineado 1,5; esquinas redondeadas sólo a la derecha (la izquierda es la barra).`,children:(0,h.jsx)(f,{className:`w-[320px]`,children:`Optional section.`})})]})}},x=[`Playground`,`Parts`,`States`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as Parts,_ as Playground,b as Specs,y as States,x as __namedExportsOrder,g as default};
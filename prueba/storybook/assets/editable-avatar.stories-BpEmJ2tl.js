import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,n as i}from"./avatar-RK2qZQ_5.js";import{Jt as a,Yt as o}from"./iframe-CSX-SRjf.js";import{c as s,d as c,i as l,l as u,n as d,o as f,r as p,t as m,u as h}from"./kit-CWUgB5-0.js";function g(e){let[t,n]=(0,_.useState)(e.foto);return(0,v.jsx)(a,{...e,foto:t,onChange:n})}var _,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{_=t(),o(),r(),c(),v=n(),y=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%231a4da9%22%2F%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2226%22%20r%3D%2211%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3Cpath%20d%3D%22M12%2060c3-12%2012-18%2020-18s17%206%2020%2018%22%20fill%3D%22%23fff%22%20opacity%3D%22.9%22%2F%3E%3C%2Fsvg%3E`,b={title:`Components/UI/EditableAvatar`,component:a,parameters:{layout:`padded`,docs:{description:{component:[`El avatar de *Elements / Avatars* con la foto editable: en la ficha de un empleado (56), en el panel del paciente (62) y, en celeste y sin iniciales, el logo de la cuenta (44). Misma forma y color que cualquier otro avatar.`,``,`**Probalo:** en *Playground* pasá el mouse o llegá con Tab y elegí una imagen; cambiá el tamaño desde *Controls*.`].join(`
`)}}},args:{foto:null,iniciales:`EM`,label:`Elena Martinez`,size:56,onChange:()=>{}},argTypes:{iniciales:{control:`text`,description:`Lo que se ve sin foto.`},label:{control:`text`,description:`Nombre para el aria-label del botón: "Change photo for …".`},size:{control:`inline-radio`,options:Object.keys(i).map(Number),description:`De la escala del Avatar.`},foto:{table:{disable:!0}},onChange:{table:{disable:!0}},className:{table:{disable:!0}}}},x={render:e=>(0,v.jsx)(g,{...e})},S={parameters:{controls:{disable:!0}},render:()=>(0,v.jsx)(l,{children:(0,v.jsx)(m,{titulo:`Parts`,children:(0,v.jsx)(u,{partes:[[`Avatar`,`Las iniciales o la foto, con la forma y el color de todos los avatares.`,`Avatar`],[`Botón`,`Cubre el avatar entero; invisible en reposo para no tapar la foto. Con hover o foco, velo oscuro y lápiz.`,`button`],[`Archivo`,`Input oculto que abre el selector del sistema; la imagen queda en localStorage (usePhoto).`,`input[type=file]`]]})})})},C=(e,t,n)=>(0,v.jsx)(a,{foto:t,iniciales:`EM`,label:`Elena Martinez`,size:e,className:n,onChange:()=>{}}),w={parameters:{controls:{disable:!0}},render:()=>(0,v.jsx)(l,{children:(0,v.jsx)(m,{titulo:`States`,children:(0,v.jsxs)(f,{children:[(0,v.jsx)(d,{rotulo:`Rest · initials`,children:C(56,null)}),(0,v.jsx)(d,{rotulo:`Rest · photo`,children:C(56,y)}),(0,v.jsx)(d,{rotulo:`Hover`,children:(0,v.jsx)(p,{selector:`button`,estado:`hover`,className:`flex`,children:C(56,y)})}),(0,v.jsx)(d,{rotulo:`Focus`,children:(0,v.jsx)(p,{selector:`button`,estado:`focus-visible`,className:`flex`,children:C(56,null)})}),(0,v.jsx)(d,{rotulo:`Patient panel · 62`,children:C(62,null)}),(0,v.jsx)(d,{rotulo:`Account logo · empty`,children:(0,v.jsx)(a,{foto:null,iniciales:``,label:`Account logo`,size:44,className:`bg-dash-count-bg`,onChange:()=>{}})})]})})})},T={parameters:{controls:{disable:!0}},render:()=>(0,v.jsxs)(l,{children:[(0,v.jsx)(m,{titulo:`Measures`,children:(0,v.jsxs)(s,{encabezado:[`Piece`,`Value`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Tamaños`}),(0,v.jsx)(`td`,{children:`56 empleado · 62 paciente · 44 logo de la cuenta (los del Avatar)`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Lápiz`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`16px, centrado`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Foco`}),(0,v.jsx)(`td`,{className:`tabular-nums`,children:`anillo de 2px a 2px del avatar`})]})]})}),(0,v.jsx)(m,{titulo:`Colors`,children:(0,v.jsxs)(s,{encabezado:[`Piece`,`Token`],children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Velo y lápiz`}),(0,v.jsxs)(`td`,{children:[`black 45% · `,(0,v.jsx)(h,{nombre:`white`})]})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Anillo de foco`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-blue`})})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Logo vacío`}),(0,v.jsx)(`td`,{children:(0,v.jsx)(h,{nombre:`dash-count-bg`})})]})]})})]})},E=[`Playground`,`Parts`,`States`,`Specs`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Avatar', 'Las iniciales o la foto, con la forma y el color de todos los avatares.', 'Avatar'], ['Botón', 'Cubre el avatar entero; invisible en reposo para no tapar la foto. Con hover o foco, velo oscuro y lápiz.', 'button'], ['Archivo', 'Input oculto que abre el selector del sistema; la imagen queda en localStorage (usePhoto).', 'input[type=file]']]} />
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Rest · initials">{muestra(56, null)}</ConRotulo>
          <ConRotulo rotulo="Rest · photo">{muestra(56, FOTO)}</ConRotulo>
          <ConRotulo rotulo="Hover"><Forzar selector="button" estado="hover" className="flex">{muestra(56, FOTO)}</Forzar></ConRotulo>
          <ConRotulo rotulo="Focus"><Forzar selector="button" estado="focus-visible" className="flex">{muestra(56, null)}</Forzar></ConRotulo>
          <ConRotulo rotulo="Patient panel · 62">{muestra(62, null)}</ConRotulo>
          <ConRotulo rotulo="Account logo · empty">
            <EditableAvatar foto={null} iniciales="" label="Account logo" size={44} className="bg-dash-count-bg" onChange={() => {}} />
          </ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Tamaños</td><td>56 empleado · 62 paciente · 44 logo de la cuenta (los del Avatar)</td></tr>
          <tr><td className="font-semibold">Lápiz</td><td className="tabular-nums">16px, centrado</td></tr>
          <tr><td className="font-semibold">Foco</td><td className="tabular-nums">anillo de 2px a 2px del avatar</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Velo y lápiz</td><td>black 45% · <Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Anillo de foco</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Logo vacío</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}}})))()}D();export{S as Parts,x as Playground,T as Specs,w as States,E as __namedExportsOrder,b as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a,t as o}from"./play-CDw6varG.js";import{a as s,i as c,l,n as u,s as d,t as f}from"./kit-VhBMbBcY.js";import{a as p,i as m,n as h,r as g,t as _}from"./AddRelationshipDrawer-D5heH_7-.js";import{i as v,n as y,r as b,t as x}from"./kit-drawer-BB94JAuy.js";var S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{p(),l(),v(),a(),S=t(),C={title:`Components/Patients/AddRelationshipDrawer`,component:_,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:760},description:{component:[`Sumar un contacto relacionado desde *Relationships & Billing → Add Relationship*. Antes era una pantalla aparte; ahora es el drawer de Confidentally 2.0 con sus tres pasos.`,``,`**Pasos:** buscar a la persona o crear una nueva; sus datos de contacto; y la relación: Guardian y/o Guarantor, quién es responsable de quién y el vínculo con el paciente. Al guardar aparece primera en la lista.`,``,`**Probalo:** en *Playground* buscá "Miller", elegí a alguien y avanzá; o tildá Add New Person.`].join(`
`)}}},args:{paciente:`John Smith`,onClose:()=>{},onGuardar:()=>{}},argTypes:{paciente:{control:`text`,description:`El paciente de la ficha: aparece en las frases de Direction.`}}},w={},T={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,S.jsx)(y,{pasos:[{nombre:`Person`,secciones:`Find or create person: buscador por nombre con resultados; la persona elegida con tilde; o Add New Person con First Name, Last Name y Email`,obligatorios:`Una persona elegida, o First y Last Name`},{nombre:`Contact`,secciones:`General Information: Country, Number, Email · Adress Information: líneas 1 y 2, Country, Region, City, Postal Code`,obligatorios:`Todos`},{nombre:`Relationship`,secciones:`Assign relationship role: Guardian, Guarantor · Direction · Relationship to Patient`,obligatorios:`Al menos un rol, una dirección y el vínculo`}]}),(0,S.jsx)(c,{children:(0,S.jsxs)(f,{titulo:`Pieces`,children:[(0,S.jsxs)(s,{children:[(0,S.jsx)(u,{rotulo:`Selected person`,children:(0,S.jsx)(`div`,{className:`w-[340px]`,children:(0,S.jsx)(m,{p:h[0]})})}),(0,S.jsx)(u,{rotulo:`Direction option`,children:(0,S.jsxs)(`div`,{className:`flex w-[340px] flex-col gap-2`,children:[(0,S.jsx)(g,{texto:`Michael Miller is Guardian for John Smith.`,elegida:!0,onElegir:()=>{}}),(0,S.jsx)(g,{texto:`John Smith is Guardian of Michael Miller.`,elegida:!1,onElegir:()=>{}})]})})]}),(0,S.jsxs)(d,{encabezado:[`Piece`,`What it does`],children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Selected person`}),(0,S.jsx)(`td`,{children:`Borde azul, avatar cuadrado, DOB y email; en el drawer, con el tilde verde.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Direction option`}),(0,S.jsx)(`td`,{children:`Las dos frases se arman con la persona, los roles elegidos y el paciente.`})]})]})]})})]})},E={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsx)(x,{estados:[{estado:`Default`,cuando:`Abre en el buscador.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step sin persona elegida ni Add New Person: aviso debajo del buscador. En los otros pasos, los obligatorios en rojo.`,story:`With Validation Errors`},{estado:`Selected`,cuando:`Persona elegida: su card con tilde.`,story:`Person Selected`},{estado:`Disabled search`,cuando:`Con Add New Person tildado el buscador queda deshabilitado y aparecen los campos de la persona nueva.`},{estado:`Saved`,cuando:`La relación entra primera en la lista, con Legal contact (Guardian) y/o Financial contact (Guarantor).`}]})},D={play:n(r(/^next step$/i),i(/select a person or tick/i))},O={play:n(o(/search by name/i,`Miller`),r(/^MM Michael Miller/),i(/mm\.thompson/i))},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsx)(b,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`Add Relationship en Relationships & Billing (y en su estado vacío); también /patients/:id/relationships/new.`],[`Texts`,`Los del Figma, incluido "Adress".`],[`Validation`,`lib/useFormPasos para los campos; persona, rol y dirección se validan aparte.`]]})},A=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`PersonSelected`,`Specs`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <div className="flex flex-col gap-8">
      <PasosDelDrawer pasos={[{
      nombre: 'Person',
      secciones: 'Find or create person: buscador por nombre con resultados; la persona elegida con tilde; o Add New Person con First Name, Last Name y Email',
      obligatorios: 'Una persona elegida, o First y Last Name'
    }, {
      nombre: 'Contact',
      secciones: 'General Information: Country, Number, Email · Adress Information: líneas 1 y 2, Country, Region, City, Postal Code',
      obligatorios: 'Todos'
    }, {
      nombre: 'Relationship',
      secciones: 'Assign relationship role: Guardian, Guarantor · Direction · Relationship to Patient',
      obligatorios: 'Al menos un rol, una dirección y el vínculo'
    }]} />
      <Lienzo>
        <Bloque titulo="Pieces">
          <Muestras>
            <ConRotulo rotulo="Selected person"><div className="w-[340px]"><PersonaSeleccionada p={DIRECTORIO[0]} /></div></ConRotulo>
            <ConRotulo rotulo="Direction option"><div className="flex w-[340px] flex-col gap-2"><OpcionDireccion texto="Michael Miller is Guardian for John Smith." elegida onElegir={() => {}} /><OpcionDireccion texto="John Smith is Guardian of Michael Miller." elegida={false} onElegir={() => {}} /></div></ConRotulo>
          </Muestras>
          <Tabla encabezado={['Piece', 'What it does']}>
            <tr><td className="font-semibold">Selected person</td><td>Borde azul, avatar cuadrado, DOB y email; en el drawer, con el tilde verde.</td></tr>
            <tr><td className="font-semibold">Direction option</td><td>Las dos frases se arman con la persona, los roles elegidos y el paciente.</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <EstadosDelDrawer estados={[{
    estado: 'Default',
    cuando: 'Abre en el buscador.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step sin persona elegida ni Add New Person: aviso debajo del buscador. En los otros pasos, los obligatorios en rojo.',
    story: 'With Validation Errors'
  }, {
    estado: 'Selected',
    cuando: 'Persona elegida: su card con tilde.',
    story: 'Person Selected'
  }, {
    estado: 'Disabled search',
    cuando: 'Con Add New Person tildado el buscador queda deshabilitado y aparecen los campos de la persona nueva.'
  }, {
    estado: 'Saved',
    cuando: 'La relación entra primera en la lista, con Legal contact (Guardian) y/o Financial contact (Guarantor).'
  }]} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/select a person or tick/i))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search by name/i, 'Miller'), pulsar(/^MM Michael Miller/), esperar(/mm\\.thompson/i))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'Add Relationship en Relationships & Billing (y en su estado vacío); también /patients/:id/relationships/new.'], ['Texts', 'Los del Figma, incluido "Adress".'], ['Validation', 'lib/useFormPasos para los campos; persona, rol y dirección se validan aparte.']]} />
}`,...k.parameters?.docs?.source}}}})))()}j();export{T as Parts,O as PersonSelected,w as Playground,k as Specs,E as States,D as WithValidationErrors,A as __namedExportsOrder,C as default};
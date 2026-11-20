import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{f as n,i as r,l as i,n as a,o,t as s}from"./kit-Di92TvVK.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BiLxbV4M.js";import{i as f,n as p,o as m,r as h,t as g}from"./play-Dr1R_I1D.js";import{t as _}from"./personas-Bsr-l1FG.js";import{i as v,n as y,r as b,t as x}from"./AddRelationshipDrawer-DrlFej0S.js";var S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{v(),n(),c(),h(),S=t(),C={title:`Components/Patients/AddRelationshipDrawer`,component:x,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:760},description:{component:[`Sumar un contacto relacionado desde *Relationships & Billing → Add Relationship*. Antes era una pantalla aparte; ahora es el drawer de Confidentally 2.0 con sus pasos.`,``,`**Pasos:** buscar a la persona o crear una nueva; sus datos de contacto; y la relación: Guardian y/o Guarantor, quién es responsable de quién y el vínculo con el paciente. Al guardar aparece primera en la lista.`,``,`**Contact sólo cuando falta** (CON-3174, 2026-11-03): con una persona nueva siempre se pide; con una existente, sólo si no tiene teléfono y dirección cargados. Si los tiene, el drawer queda en dos pasos.`,``,`**Probalo:** en *Playground* buscá "Miller", elegí a alguien y avanzá; o tildá Add New Person. Con "Michael Miller" (contacto cargado) pasa directo a Relationship; con "Robert Miller" (sin contacto) pide Contact.`].join(`
`)}}},args:{paciente:`John Smith`,onClose:()=>{},onGuardar:()=>{}},argTypes:{paciente:{control:`text`,description:`El paciente de la ficha: aparece en las frases de Direction.`}}},w={},T={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsxs)(`div`,{className:`flex flex-col gap-8`,children:[(0,S.jsx)(l,{pasos:[{nombre:`Person`,secciones:`Find or create person: buscador por nombre con resultados; la persona elegida con una ✕ para quitarla; o Add New Person con First Name, Last Name y Email`,obligatorios:`Una persona elegida, o First y Last Name`},{nombre:`Contact`,secciones:`Sólo con persona nueva o sin contacto cargado. General Information: Country, Number, Email · Adress Information: líneas 1 y 2, Country, Region, City, Postal Code`,obligatorios:`Todos`},{nombre:`Relationship`,secciones:`Assign relationship role: Guardian, Guarantor · Direction · Relationship to Patient`,obligatorios:`Al menos un rol, una dirección y el vínculo`}]}),(0,S.jsx)(r,{children:(0,S.jsxs)(s,{titulo:`Pieces`,children:[(0,S.jsxs)(o,{children:[(0,S.jsx)(a,{rotulo:`Selected person`,children:(0,S.jsx)(`div`,{className:`w-[340px]`,children:(0,S.jsx)(b,{p:_[0]})})}),(0,S.jsx)(a,{rotulo:`Direction option`,children:(0,S.jsxs)(`div`,{className:`flex w-[340px] flex-col gap-2`,children:[(0,S.jsx)(y,{texto:`Michael Miller is Guardian for John Smith.`,elegida:!0,onElegir:()=>{}}),(0,S.jsx)(y,{texto:`John Smith is Guardian of Michael Miller.`,elegida:!1,onElegir:()=>{}})]})})]}),(0,S.jsxs)(i,{encabezado:[`Piece`,`What it does`],children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Selected person`}),(0,S.jsx)(`td`,{children:`Borde azul, avatar cuadrado, DOB y email; en el drawer (PersonSearchField), con una ✕ para quitarla y volver a buscar.`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Direction option`}),(0,S.jsx)(`td`,{children:`Las dos frases se arman con la persona, los roles elegidos y el paciente.`})]})]})]})})]})},E={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsx)(d,{estados:[{estado:`Default`,cuando:`Abre en el buscador.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step sin persona elegida ni Add New Person: aviso debajo del buscador. En los otros pasos, los obligatorios en rojo.`,story:`With Validation Errors`},{estado:`Selected`,cuando:`Persona elegida: su card con borde azul y una ✕ para quitarla.`,story:`Person Selected`},{estado:`Contact on file`,cuando:`Persona existente con teléfono y dirección: el drawer queda en dos pasos (Person y Relationship).`,story:`Contact On File`},{estado:`Disabled search`,cuando:`Con Add New Person tildado el buscador queda deshabilitado y aparecen los campos de la persona nueva.`},{estado:`Saved`,cuando:`La relación entra primera en la lista, con Legal contact (Guardian) y/o Financial contact (Guarantor).`}]})},D={play:m(f(/^next step$/i),p(/select a person or tick/i))},O={play:m(g(/search by name/i,`Miller`),f(/^Michael Miller/),p(/mm\.thompson/i))},k={play:m(g(/search by name/i,`Michael`),f(/^Michael Miller/),f(/^next step$/i),p(/assign relationship role/i))},A={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,S.jsx)(u,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`Add Relationship en Relationships & Billing (y en su estado vacío); también /patients/:id/relationships/new.`],[`Texts`,`Los del Figma, incluido "Adress".`],[`Validation`,`lib/useFormPasos para los campos; persona, rol y dirección se validan aparte.`]]})},j=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`PersonSelected`,`ContactOnFile`,`Specs`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
      secciones: 'Find or create person: buscador por nombre con resultados; la persona elegida con una ✕ para quitarla; o Add New Person con First Name, Last Name y Email',
      obligatorios: 'Una persona elegida, o First y Last Name'
    }, {
      nombre: 'Contact',
      secciones: 'Sólo con persona nueva o sin contacto cargado. General Information: Country, Number, Email · Adress Information: líneas 1 y 2, Country, Region, City, Postal Code',
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
            <tr><td className="font-semibold">Selected person</td><td>Borde azul, avatar cuadrado, DOB y email; en el drawer (PersonSearchField), con una ✕ para quitarla y volver a buscar.</td></tr>
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
    cuando: 'Persona elegida: su card con borde azul y una ✕ para quitarla.',
    story: 'Person Selected'
  }, {
    estado: 'Contact on file',
    cuando: 'Persona existente con teléfono y dirección: el drawer queda en dos pasos (Person y Relationship).',
    story: 'Contact On File'
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
  play: secuencia(escribir(/search by name/i, 'Miller'), pulsar(/^Michael Miller/), esperar(/mm\\.thompson/i))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search by name/i, 'Michael'), pulsar(/^Michael Miller/), pulsar(/^next step$/i), esperar(/assign relationship role/i))
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}}})))()}M();export{k as ContactOnFile,T as Parts,O as PersonSelected,w as Playground,A as Specs,E as States,D as WithValidationErrors,j as __namedExportsOrder,C as default};
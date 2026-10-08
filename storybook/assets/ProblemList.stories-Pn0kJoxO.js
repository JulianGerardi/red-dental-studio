import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{i,n as a,r as o,t as s}from"./ProblemList-Ci83sTwV.js";import{a as c,n as l,r as u,t as d}from"./play-CDw6varG.js";import{i as f,l as p,s as m,t as h}from"./kit-VhBMbBcY.js";var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{p(),n(),i(),u(),g=t(),{userEvent:_,within:v}=__STORYBOOK_MODULE_TEST__,y={title:`Components/Clinical/ProblemList`,component:a,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:560},description:{component:[`La tabla del Overview de Clinical Mode, con las pestañas **Problem List** y **Procedures** como en red.dev, sobre la tabla estándar (Elements / Tables).`,``,`**Barra:** el buscador primero y después el filtro de estado (Elements / Filter): Active por defecto en Problem List, All en Procedures. Cambiar un estado desde el menú de la fila se puede deshacer.`,``,`**Detalle de fila** (2026-10-08): clic en una fila la despliega como en el Ledger, con *Expand all / Collapse all*, y muestra lo que cuelga del registro: caso, visitas y turno, órdenes de laboratorio, derivaciones, hallazgos y consentimiento (Components / Clinical / RecordDetail). Un link a un registro de la otra pestaña cambia de pestaña y lo abre.`,``,`**Probalo:** en *Playground* cambiá de pestaña, buscá, filtrá y abrí una fila.`].join(`
`)}}}},b={},x={play:async e=>{await _.click(await v(e.canvasElement).findByRole(`tab`,{name:`Procedures`})),await l(/D0220/)(e)}},S={name:`Expanded row`,play:async e=>{let t=v(e.canvasElement);await _.click(await t.findByRole(`tab`,{name:`Procedures`})),await _.click(await t.findByText(/Extraction – erupted tooth/)),await l(/View full record/)(e),await l(/Bridge Option/)(e)}},C={name:`Jump to finding`,play:async e=>{let t=v(e.canvasElement);await _.click(await t.findByRole(`tab`,{name:`Procedures`})),await _.click(await t.findByText(/Incisional biopsy/)),await _.click(await t.findByRole(`button`,{name:/Abscess \(morphologic abnormality\)/})),await l(/Source exam/)(e)}},w={play:c(d(/search/i,`zzzz`),l(/no problems found/i))},T={play:async e=>{let[t]=await v(e.canvasElement).findAllByRole(`button`,{name:/actions for abscess/i});await _.click(t),await l(/start monitoring/i)(e)}},E={render:()=>(0,g.jsx)(r,{children:(0,g.jsxs)(`div`,{className:`flex flex-wrap items-center gap-6`,children:[(0,g.jsx)(s,{nota:`Reports fatigue for the last week; no fever.`}),(0,g.jsx)(s,{}),(0,g.jsx)(o,{pieza:14}),(0,g.jsx)(o,{})]})})},D={play:async e=>{await _.click(await v(e.canvasElement).findByRole(`button`,{name:/filter problems by status/i})),await l(/clinic declined/i)(e)}},O={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(f,{children:(0,g.jsx)(h,{titulo:`States`,children:(0,g.jsxs)(m,{encabezado:[`State`,`When`,`Story`],minimo:560,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Default`}),(0,g.jsx)(`td`,{children:`Problem List con el filtro en Active.`}),(0,g.jsx)(`td`,{children:`Playground`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Procedures`}),(0,g.jsx)(`td`,{children:`La otra pestaña, con el filtro en All.`}),(0,g.jsx)(`td`,{children:`Procedures`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,g.jsx)(`td`,{children:`Búsqueda o filtro sin resultados: No problems found.`}),(0,g.jsx)(`td`,{children:`No Results`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Row menu`}),(0,g.jsx)(`td`,{children:`Edit, los cambios de estado (los que cierran, en rojo) y Delete.`}),(0,g.jsx)(`td`,{children:`Row Menu`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Expanded row`}),(0,g.jsx)(`td`,{children:`Clic en la fila: el detalle (RecordDetail) y, arriba, Collapse all / Expand all.`}),(0,g.jsx)(`td`,{children:`Expanded Row`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Jump`}),(0,g.jsx)(`td`,{children:`Un link a un registro de la otra pestaña: cambia de pestaña, ajusta el filtro y abre esa fila.`}),(0,g.jsx)(`td`,{children:`Jump To Finding`})]})]})})})},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(f,{children:(0,g.jsx)(h,{titulo:`Specs`,children:(0,g.jsxs)(m,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Rows per page`}),(0,g.jsx)(`td`,{children:`5, con Show para cambiarlo.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,g.jsx)(`td`,{children:`12px, para que entre a 1440 sin scroll.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Note and tooth`}),(0,g.jsx)(`td`,{children:`NoteCell muestra la nota en un tooltip; ToothCell la pieza o un guion.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Columns`}),(0,g.jsx)(`td`,{children:`Date 72 · Location 80 · Tooth 44 · Surface 56 · Exam 84 · Provider 88 · Note 36 · Status 104; Condition / Procedure se estira. Con el chevron del detalle las dos pestañas entran a 1440 sin scroll.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Row detail`}),(0,g.jsx)(`td`,{children:`Ver Components / Clinical / RecordDetail → Specs.`})]})]})})})},A=[`Playground`,`Procedures`,`ExpandedRow`,`JumpToFinding`,`NoResults`,`RowMenu`,`Parts`,`StatusFilterOpen`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('tab', {
      name: 'Procedures'
    }));
    await esperar(/D0220/)(c);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Expanded row',
  play: async c => {
    const canvas = within(c.canvasElement);
    await userEvent.click(await canvas.findByRole('tab', {
      name: 'Procedures'
    }));
    await userEvent.click(await canvas.findByText(/Extraction – erupted tooth/));
    await esperar(/View full record/)(c);
    await esperar(/Bridge Option/)(c);
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Jump to finding',
  play: async c => {
    const canvas = within(c.canvasElement);
    await userEvent.click(await canvas.findByRole('tab', {
      name: 'Procedures'
    }));
    await userEvent.click(await canvas.findByText(/Incisional biopsy/));
    await userEvent.click(await canvas.findByRole('button', {
      name: /Abscess \\(morphologic abnormality\\)/
    }));
    await esperar(/Source exam/)(c);
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no problems found/i))
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  play: async c => {
    const [primera] = await within(c.canvasElement).findAllByRole('button', {
      name: /actions for abscess/i
    });
    await userEvent.click(primera);
    await esperar(/start monitoring/i)(c);
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <NoteCell nota="Reports fatigue for the last week; no fever." />
        <NoteCell />
        <ToothCell pieza={14} />
        <ToothCell />
      </div>
    </TooltipProvider>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /filter problems by status/i
    }));
    await esperar(/clinic declined/i)(c);
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Default</td><td>Problem List con el filtro en Active.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Procedures</td><td>La otra pestaña, con el filtro en All.</td><td>Procedures</td></tr>
          <tr><td className="font-semibold">Empty</td><td>Búsqueda o filtro sin resultados: No problems found.</td><td>No Results</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>Edit, los cambios de estado (los que cierran, en rojo) y Delete.</td><td>Row Menu</td></tr>
          <tr><td className="font-semibold">Expanded row</td><td>Clic en la fila: el detalle (RecordDetail) y, arriba, Collapse all / Expand all.</td><td>Expanded Row</td></tr>
          <tr><td className="font-semibold">Jump</td><td>Un link a un registro de la otra pestaña: cambia de pestaña, ajusta el filtro y abre esa fila.</td><td>Jump To Finding</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
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
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Rows per page</td><td>5, con Show para cambiarlo.</td></tr>
          <tr><td className="font-semibold">Text</td><td>12px, para que entre a 1440 sin scroll.</td></tr>
          <tr><td className="font-semibold">Note and tooth</td><td>NoteCell muestra la nota en un tooltip; ToothCell la pieza o un guion.</td></tr>
          <tr><td className="font-semibold">Columns</td><td>Date 72 · Location 80 · Tooth 44 · Surface 56 · Exam 84 · Provider 88 · Note 36 · Status 104; Condition / Procedure se estira. Con el chevron del detalle las dos pestañas entran a 1440 sin scroll.</td></tr>
          <tr><td className="font-semibold">Row detail</td><td>Ver Components / Clinical / RecordDetail → Specs.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}}})))()}j();export{S as ExpandedRow,C as JumpToFinding,w as NoResults,E as Parts,b as Playground,x as Procedures,T as RowMenu,k as Specs,O as States,D as StatusFilterOpen,A as __namedExportsOrder,y as default};
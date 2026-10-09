import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,d as r,i,l as a,t as o}from"./kit-4bQS7S9u.js";import{R as s,t as c}from"./finanzas-Cd24vV6l.js";import{i as l,r as u,t as d}from"./kit-drawer-BWB0Ospl.js";import{n as f,r as p,t as m}from"./CompareFeesDrawer-CJLjfvaT.js";var h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{p(),l(),r(),s(),h=t(),g={title:`Components/Finance/CompareFeesDrawer`,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/CompareFeesDrawer.tsx`,story:{inline:!1,iframeHeight:720},description:{component:[`**Compare fees**, desde el menú de una fila de Fee Schedules (pedido de Julián; no está en red.dev). Reemplaza la vieja columna *vs UCR*: cada procedimiento tiene su propia diferencia, así que no hay un único porcentaje que resuma un fee schedule.`,``,`La referencia se elige a la vista (*Compare with*), y arranca en el fee schedule *Default* (UCR - Red). Se comparan las versiones vigentes de los dos. Arriba, cuántos códigos quedan más altos, más bajos, iguales o sin precio en alguno de los dos; abajo, código por código con la diferencia en $ y en %.`,``,`**Probalo:** en *Playground* elegí el fee schedule y cambiá *Compare with*.`].join(`
`)}}},args:{feeSchedule:`Aetna 2026`},argTypes:{feeSchedule:{control:`select`,options:c.map(e=>e.nombre),description:`El fee schedule de la fila.`}},render:({feeSchedule:e})=>(0,h.jsx)(m,{arancel:_(e),aranceles:c,onClose:()=>{},onEditar:()=>{}},e)},_=e=>c.find(t=>t.nombre===e)??c[1],v={},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(i,{children:(0,h.jsx)(o,{titulo:`Parts`,children:(0,h.jsx)(a,{partes:[[`Compare with`,`Los otros fee schedules no archivados; arranca en el Default. Debajo, desde cuándo rige cada versión.`,`SelectField`],[`Resumen`,`Higher · Lower · Same · Missing a fee.`,`dl`],[`Tabla`,`Code · Description · este · la referencia · Difference ($ y %).`,`role=table`],[`Pie`,`Close · Edit fees (abre el editor).`,`Button`]]})})})},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(d,{estados:[{estado:`Against the default`,cuando:`Abre comparando contra UCR - Red.`,story:`Playground`},{estado:`Default itself`,cuando:`Desde UCR - Red arranca con el primer otro fee schedule.`,story:`From Default`},{estado:`Missing fees`,cuando:`Un código sin precio en alguno de los dos muestra “—” y cuenta en Missing a fee (Medicaid).`,story:`Missing Fees`}]})},x={args:{feeSchedule:`UCR - Red`}},S={args:{feeSchedule:`Medicaid`}},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsxs)(i,{children:[(0,h.jsx)(u,{filas:[[`Size`,`lg`],[`Columnas`,`Code 56 · Description 1fr · 88 · 88 · Difference 120; scroll horizontal debajo de 560px`],[`diferencia()`,`monto = este − referencia; % sobre la referencia; null si falta uno.`]]}),(0,h.jsx)(o,{titulo:`Ejemplos de diferencia()`,children:(0,h.jsx)(n,{encabezado:[`Este`,`Referencia`,`Monto`,`%`],children:[[92,115],[115,115],[130,100],[void 0,300]].map(([e,t],n)=>{let r=f(e,t);return(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`tabular-nums`,children:e??`—`}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:t??`—`}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:r?r.monto:`—`}),(0,h.jsx)(`td`,{className:`tabular-nums`,children:r?.porcentaje==null?`—`:`${r.porcentaje.toFixed(0)}%`})]},n)})})})]})},w=[`Playground`,`Parts`,`States`,`FromDefault`,`MissingFees`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Compare with', 'Los otros fee schedules no archivados; arranca en el Default. Debajo, desde cuándo rige cada versión.', 'SelectField'], ['Resumen', 'Higher · Lower · Same · Missing a fee.', 'dl'], ['Tabla', 'Code · Description · este · la referencia · Difference ($ y %).', 'role=table'], ['Pie', 'Close · Edit fees (abre el editor).', 'Button']]} />
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
    estado: 'Against the default',
    cuando: 'Abre comparando contra UCR - Red.',
    story: 'Playground'
  }, {
    estado: 'Default itself',
    cuando: 'Desde UCR - Red arranca con el primer otro fee schedule.',
    story: 'From Default'
  }, {
    estado: 'Missing fees',
    cuando: 'Un código sin precio en alguno de los dos muestra “—” y cuenta en Missing a fee (Medicaid).',
    story: 'Missing Fees'
  }]} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    feeSchedule: 'UCR - Red'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    feeSchedule: 'Medicaid'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
  render: () => {
    const ejemplos: [number | undefined, number | undefined][] = [[92, 115], [115, 115], [130, 100], [undefined, 300]];
    return <Lienzo>
        <SpecsDelDrawer filas={[['Size', 'lg'], ['Columnas', 'Code 56 · Description 1fr · 88 · 88 · Difference 120; scroll horizontal debajo de 560px'], ['diferencia()', 'monto = este − referencia; % sobre la referencia; null si falta uno.']]} />
        <Bloque titulo="Ejemplos de diferencia()">
          <Tabla encabezado={['Este', 'Referencia', 'Monto', '%']}>
            {ejemplos.map(([a, b], i) => {
            const d = diferencia(a, b);
            return <tr key={i}><td className="tabular-nums">{a ?? '—'}</td><td className="tabular-nums">{b ?? '—'}</td><td className="tabular-nums">{d ? d.monto : '—'}</td><td className="tabular-nums">{d?.porcentaje != null ? \`\${d.porcentaje.toFixed(0)}%\` : '—'}</td></tr>;
          })}
          </Tabla>
        </Bloque>
      </Lienzo>;
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as FromDefault,S as MissingFees,y as Parts,v as Playground,C as Specs,b as States,w as __namedExportsOrder,g as default};
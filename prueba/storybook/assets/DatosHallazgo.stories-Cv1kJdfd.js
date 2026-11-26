import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,l as i,n as a,o,r as s,t as c}from"./DatosHallazgo-B8ZqpQRh.js";import{f as l,i as u,t as d,u as f}from"./kit-Di92TvVK.js";var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{l(),i(),p=t(),m=[`Tooth`,`Range`,`Quadrant`,`Arch`,`Mouth`,`Intraoral`,`Extraoral`],h={title:`Components/Clinical/Dental/DatosHallazgo`,parameters:{layout:`padded`,docs:{jira:[`CON-3700`,`CON-1961`],description:{component:`Las filas con que se lee un finding: su **nombre** con el estado a la derecha, el **área de tratamiento** con el ícono de su tipo (CON-3700, CON-1961) y los datos sueltos (fecha, provider, examen) con su ícono en un cuadrado.

**Probalo:** *Finding* arma una ficha entera; *Treatment areas* muestra el ícono de cada tipo de área.`}}},decorators:[e=>(0,p.jsx)(`div`,{className:`w-[420px] max-w-full rounded-xl bg-white p-4`,children:(0,p.jsx)(e,{})})]},g={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,p.jsx)(s,{nombre:`Chronic enamel dental caries`,estado:`Active`}),(0,p.jsx)(c,{area:{tipo:`Tooth`,valor:`3`}}),(0,p.jsx)(a,{icono:(0,p.jsx)(n,{}),rotulo:`Date`,children:`05/14/2026`}),(0,p.jsx)(a,{icono:(0,p.jsx)(o,{}),rotulo:`Provider`,children:`Elena Martinez`}),(0,p.jsx)(a,{icono:(0,p.jsx)(r,{}),rotulo:`Exam`,children:`Dental assessment`})]})},_={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,p.jsx)(s,{nombre:`Chronic enamel dental caries`,estado:`Active`}),(0,p.jsx)(s,{nombre:`Localized periodontal pocketing`,estado:`In treatment`,tono:`info`}),(0,p.jsx)(s,{nombre:`Oral candidiasis`,estado:`Discarded`,tono:`danger`})]})},v={render:()=>(0,p.jsx)(a,{icono:(0,p.jsx)(o,{}),rotulo:`Provider`})},y={decorators:[e=>(0,p.jsx)(`div`,{className:`w-[720px] max-w-full`,children:(0,p.jsx)(e,{})})],render:()=>(0,p.jsxs)(u,{children:[(0,p.jsx)(d,{titulo:`Parts`,children:(0,p.jsx)(f,{partes:[[`Name row`,`El nombre del finding y su estado en una pill.`,`FilaNombre`],[`Area row`,`El área de tratamiento: ícono del tipo, tipo y valor.`,`FilaArea`],[`Data row`,`Un dato con su ícono y su rótulo.`,`FilaDato`],[`Icons`,`Fecha, provider y examen, en un cuadrado gris.`,`IconoFecha · IconoProveedor · IconoExamen`]]})}),(0,p.jsx)(d,{titulo:`Treatment areas`,children:(0,p.jsx)(`div`,{className:`flex flex-col gap-3`,children:m.map(e=>(0,p.jsx)(c,{area:{tipo:e,valor:e===`Tooth`?`3`:e===`Range`?`3 – 5`:e===`Quadrant`?`Upper Left`:e===`Arch`?`Maxillary`:e===`Mouth`?`Full mouth`:e===`Intraoral`?`Soft palate`:`Right temple area`}},e))})})]})},b=[`Finding`,`NameAndStatus`,`EmptyValue`,`TreatmentAreas`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <FilaNombre nombre="Chronic enamel dental caries" estado="Active" />
      <FilaArea area={{
      tipo: 'Tooth',
      valor: '3'
    }} />
      <FilaDato icono={<IconoFecha />} rotulo="Date">05/14/2026</FilaDato>
      <FilaDato icono={<IconoProveedor />} rotulo="Provider">Elena Martinez</FilaDato>
      <FilaDato icono={<IconoExamen />} rotulo="Exam">Dental assessment</FilaDato>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <FilaNombre nombre="Chronic enamel dental caries" estado="Active" />
      <FilaNombre nombre="Localized periodontal pocketing" estado="In treatment" tono="info" />
      <FilaNombre nombre="Oral candidiasis" estado="Discarded" tono="danger" />
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <FilaDato icono={<IconoProveedor />} rotulo="Provider" />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="w-[720px] max-w-full"><Story /></div>],
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Name row', 'El nombre del finding y su estado en una pill.', 'FilaNombre'], ['Area row', 'El área de tratamiento: ícono del tipo, tipo y valor.', 'FilaArea'], ['Data row', 'Un dato con su ícono y su rótulo.', 'FilaDato'], ['Icons', 'Fecha, provider y examen, en un cuadrado gris.', 'IconoFecha · IconoProveedor · IconoExamen']]} />
      </Bloque>
      <Bloque titulo="Treatment areas">
        <div className="flex flex-col gap-3">
          {TIPOS_AREA.map(t => <FilaArea key={t} area={{
          tipo: t,
          valor: t === 'Tooth' ? '3' : t === 'Range' ? '3 – 5' : t === 'Quadrant' ? 'Upper Left' : t === 'Arch' ? 'Maxillary' : t === 'Mouth' ? 'Full mouth' : t === 'Intraoral' ? 'Soft palate' : 'Right temple area'
        }} />)}
        </div>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as EmptyValue,g as Finding,_ as NameAndStatus,y as TreatmentAreas,b as __namedExportsOrder,h as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./DatosHallazgo-CeOlpU6A.js";import{g as p}from"./estilos-yRwJh8PH.js";import{n as m,t as h}from"./tabs-CkfXa-GY.js";import{a as g,n as _,t as v}from"./drawer-De9KfU0b.js";import{n as y,t as b}from"./chip-DAQS_UTf.js";import{_ as x,x as S}from"./form-D_-hCDwV.js";import{i as C,r as w}from"./pill-CiKKQM4h.js";import{_ as T,h as E}from"./data-BcaLzhug.js";import{n as D,r as O,t as k}from"./SurfaceWheel-C48W4J3k.js";import{n as A,r as j,t as M}from"./DescriptorFields-DEW2SQ4W.js";import{n as N,t as P}from"./EditProcedureDrawer-N8_BXe9Z.js";function F({finding:e,onClose:t,onSave:n}){let[o,p]=(0,I.useState)(`General information`),[m,g]=(0,I.useState)([]),[y,S]=(0,I.useState)(``),[C,T]=(0,I.useState)({});(0,I.useEffect)(()=>{e&&(p(`General information`),g(e.surfaces),S(e.notes),T(e.descriptors??{}))},[e]);function E(){n({surfaces:m,notes:y,descriptors:C,descriptor:j(C)}),t()}return(0,L.jsxs)(v,{open:!!e,onClose:t,title:`Edit finding`,footer:(0,L.jsx)(_,{onCancel:t,onSave:E}),tabs:(0,L.jsx)(h,{tabs:U,value:o,onChange:p,fullWidth:!0,size:`sm`,"aria-label":`Edit finding sections`}),children:[e&&o===`General information`&&(0,L.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,L.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,L.jsx)(l,{nombre:f(e.condition),estado:e.status,tono:u[e.status]}),(0,L.jsx)(s,{icono:(0,L.jsx)(r,{}),rotulo:`Creation date`,children:i(e.date)}),(0,L.jsx)(s,{icono:(0,L.jsx)(a,{}),rotulo:`Exams`,children:(0,L.jsx)(w,{tone:`success`,size:`sm`,children:e.examen??`Dental assessment`})}),(0,L.jsx)(s,{icono:(0,L.jsx)(c,{}),rotulo:`Provider`,children:e.provider}),(0,L.jsxs)(`section`,{"aria-label":`Selected area`,className:`rounded-lg bg-white shadow-inner-card`,children:[(0,L.jsx)(d,{area:{tipo:`Tooth`,valor:`${e.tooth} · Permanent`}}),(0,L.jsxs)(`div`,{className:`flex flex-col gap-4 p-4`,children:[(0,L.jsx)(`div`,{className:`flex justify-center`,children:(0,L.jsx)(D,{value:m,onChange:g,size:226})}),(0,L.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,L.jsx)(`p`,{className:`text-xs font-medium text-ink`,children:`Selected surface`}),m.length>0&&(0,L.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:m.map(e=>(0,L.jsxs)(b,{children:[e,` - `,k[e]]},e))}),(0,L.jsx)(`p`,{className:`text-[11px] leading-[1.3] text-ink-muted`,children:`Select a surface to update the finding`})]})]})]})]}),(0,L.jsx)(x,{label:`Notes`,placeholder:`Document questions, answers, clarifications, or additional notes`,value:y,onChange:S})]}),e&&o===`Descriptors`&&(0,L.jsxs)(`section`,{className:`flex flex-col gap-3.5`,children:[(0,L.jsx)(`p`,{className:`text-xs font-medium text-ink`,children:`Selected descriptors`}),(0,L.jsx)(M,{value:C,onChange:T})]})]})}var I,L;function R(){return(R=e((()=>{I=t(),g(),m(),y(),C(),S(),A(),O(),p(),o(),W(),L=n(),F.__docgenInfo={description:``,methods:[],displayName:`EditConditionDrawer`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}},{name:`null`}]},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}}})))()}function z({finding:e,findings:t=[],onClose:n,onSave:r}){let i=e?.kind===`condition`,a=e?.tooth!=null,o={onClose:n,onSave:r};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(P,{finding:e&&!i?e:null,findings:t,...o}),(0,H.jsx)(F,{finding:e&&i&&a?e:null,...o}),(0,H.jsx)(B,{finding:e&&i&&!a?e:null,...o})]})}function B({finding:e,onClose:t,onSave:n}){let[o,p]=(0,V.useState)(`General information`),[m,g]=(0,V.useState)({}),[y,b]=(0,V.useState)(``);(0,V.useEffect)(()=>{e&&(p(`General information`),g(e.descriptors??{}),b(e.notes))},[e]);function S(){n({descriptors:m,descriptor:j(m),notes:y}),t()}let C=e&&E(e);return(0,H.jsxs)(v,{open:!!e,onClose:t,title:`Edit finding`,footer:(0,H.jsx)(_,{onCancel:t,onSave:S}),tabs:(0,H.jsx)(h,{tabs:U,value:o,onChange:p,fullWidth:!0,size:`sm`,"aria-label":`Edit finding sections`}),children:[e&&o===`General information`&&(0,H.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,H.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,H.jsx)(l,{nombre:f(e.condition),estado:e.status,tono:u[e.status]}),(0,H.jsx)(s,{icono:(0,H.jsx)(r,{}),rotulo:`Creation date`,children:i(e.date)}),(0,H.jsx)(s,{icono:(0,H.jsx)(a,{}),rotulo:`Exams`,children:(0,H.jsx)(w,{tone:`success`,size:`sm`,children:e.examen??`Dental assessment`})}),(0,H.jsx)(s,{icono:(0,H.jsx)(c,{}),rotulo:`Provider`,children:e.provider}),C&&(0,H.jsx)(d,{area:C})]}),(0,H.jsx)(x,{label:`Notes`,placeholder:`Document questions, answers, clarifications, or additional notes`,value:y,onChange:b})]}),e&&o===`Descriptors`&&(0,H.jsxs)(`section`,{className:`flex flex-col gap-3.5`,children:[(0,H.jsx)(`p`,{className:`text-xs font-medium text-ink`,children:`Selected descriptors`}),(0,H.jsx)(M,{value:m,onChange:g})]})]})}var V,H,U;function W(){return(W=e((()=>{V=t(),g(),m(),C(),S(),A(),R(),N(),o(),T(),H=n(),U=[`General information`,`Descriptors`],z.__docgenInfo={description:``,methods:[],displayName:`EditFindingDrawer`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}},{name:`null`}]},description:``},findings:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}}],raw:`Finding[]`},description:`Todos los findings del examen: Edit Procedure los ofrece para vincular.`,defaultValue:{value:`[]`,computed:!1}},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}},B.__docgenInfo={description:``,methods:[],displayName:`EditFindingView`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}},{name:`null`}]},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  area: string
  condition: string
  descriptor: string
  date: string
  status: FindingStatus
  tooth: number | null
  provider: string
  surfaces: string[]
  notes: string
  /** Ids de los hallazgos del chart que este procedimiento resuelve. */
  linked: string[]
  diagnoses: string[]
  /** El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…). */
  examen?: string
  /** La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones. */
  problema?: string
  /** De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores. */
  kind?: 'procedure' | 'condition'
  /** La guía visual de descriptores: una opción por fila, por id de fila. \`descriptor\` sigue siendo el texto que se ve
     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados. */
  descriptors?: Record<string, string>
  /** Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe. */
  fee?: number
  /** El área de tratamiento con que se guardó: tipo y valor (CON-3700, \`findings.specs\`). null: sin área. Si falta, la
     deduce \`areaDeTratamiento\`. */
  treatmentArea?: AreaTratamiento | null
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}}})))()}export{R as a,F as i,B as n,W as r,z as t};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./DatosHallazgo-B8ZqpQRh.js";import{n as p,t as m}from"./EditProcedureDrawer-BsZ-zcdC.js";import{n as h,r as g}from"./tabs-ooSHs8i1.js";import{a as _,n as v,t as y}from"./drawer-ieRWVgZv.js";import{_ as b,x}from"./form-Br8pAGA0.js";import{i as S,r as C}from"./pill-CiKKQM4h.js";import{_ as w,h as T}from"./data-BYgTYTv6.js";import{n as E,r as D,t as O}from"./DescriptorFields-D9TF6u6E.js";import{n as k,t as A}from"./EditConditionDrawer-Ej2mOhWw.js";function j({finding:e,findings:t=[],onClose:n,onSave:r,estado:i,bloqueoEstimado:a}){let o=e?.kind===`condition`,s=e?.tooth!=null,c={onClose:n,onSave:r};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(m,{finding:e&&!o?e:null,findings:t,estado:i,bloqueoEstimado:a,...c}),(0,P.jsx)(A,{finding:e&&o&&s?e:null,...c}),(0,P.jsx)(M,{finding:e&&o&&!s?e:null,...c})]})}function M({finding:e,onClose:t,onSave:n}){let[o,p]=(0,N.useState)(`General information`),[m,g]=(0,N.useState)({}),[_,x]=(0,N.useState)(``);(0,N.useEffect)(()=>{e&&(p(`General information`),g(e.descriptors??{}),x(e.notes))},[e]);function S(){n({descriptors:m,descriptor:D(m),notes:_}),t()}let w=e&&T(e),E=!I.includes(e?.examen??``);return(0,P.jsxs)(y,{open:!!e,onClose:t,title:`Edit finding`,footer:(0,P.jsx)(v,{onCancel:t,onSave:S}),tabs:E?(0,P.jsx)(h,{tabs:F,value:o,onChange:p,fullWidth:!0,size:`sm`,"aria-label":`Edit finding sections`}):void 0,children:[e&&o===`General information`&&(0,P.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,P.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,P.jsx)(l,{nombre:f(e.condition),estado:e.status,tono:u[e.status]}),(0,P.jsx)(s,{icono:(0,P.jsx)(r,{}),rotulo:`Creation date`,children:i(e.date)}),(0,P.jsx)(s,{icono:(0,P.jsx)(a,{}),rotulo:`Exams`,children:(0,P.jsx)(C,{tone:`success`,size:`sm`,children:e.examen??`Dental assessment`})}),(0,P.jsx)(s,{icono:(0,P.jsx)(c,{}),rotulo:`Provider`,children:e.provider}),w&&(0,P.jsx)(d,{area:w})]}),(0,P.jsx)(b,{label:`Notes`,placeholder:`Document questions, answers, clarifications, or additional notes`,value:_,onChange:x})]}),e&&o===`Descriptors`&&(0,P.jsxs)(`section`,{className:`flex flex-col gap-3.5`,children:[(0,P.jsx)(`p`,{className:`text-xs font-medium text-ink`,children:`Selected descriptors`}),(0,P.jsx)(O,{value:m,onChange:g})]})]})}var N,P,F,I;function L(){return(L=e((()=>{N=t(),_(),g(),S(),x(),E(),k(),p(),o(),w(),P=n(),F=[`General information`,`Descriptors`],I=[`Physical`,`ROS`],j.__docgenInfo={description:``,methods:[],displayName:`EditFindingDrawer`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
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
  /** El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo. */
  estimado?: EstimadoProcedimiento
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded' | 'Referred'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`},{name:`literal`,value:`'Referred'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."},{key:`estimado`,value:{name:`EstimadoProcedimiento`,required:!1},description:`El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo.`}]}},{name:`null`}]},description:``},findings:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
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
  /** El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo. */
  estimado?: EstimadoProcedimiento
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded' | 'Referred'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`},{name:`literal`,value:`'Referred'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."},{key:`estimado`,value:{name:`EstimadoProcedimiento`,required:!1},description:`El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo.`}]}}],raw:`Finding[]`},description:`Todos los findings del examen: Edit Procedure los ofrece para vincular.`,defaultValue:{value:`[]`,computed:!1}},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
  /** El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo. */
  estimado?: EstimadoProcedimiento
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded' | 'Referred'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`},{name:`literal`,value:`'Referred'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."},{key:`estimado`,value:{name:`EstimadoProcedimiento`,required:!1},description:`El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo.`}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}},M.__docgenInfo={description:``,methods:[],displayName:`EditFindingView`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
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
  /** El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo. */
  estimado?: EstimadoProcedimiento
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded' | 'Referred'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`},{name:`literal`,value:`'Referred'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."},{key:`estimado`,value:{name:`EstimadoProcedimiento`,required:!1},description:`El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo.`}]}},{name:`null`}]},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
  /** El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo. */
  estimado?: EstimadoProcedimiento
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In treatment' | 'Treated' | 'Externally treated'
| 'No treatment needed' | 'Patient declined' | 'Clinic declined' | 'Discarded' | 'Referred'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally treated'`},{name:`literal`,value:`'No treatment needed'`},{name:`literal`,value:`'Patient declined'`},{name:`literal`,value:`'Clinic declined'`},{name:`literal`,value:`'Discarded'`},{name:`literal`,value:`'Referred'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`examen`,value:{name:`string`,required:!1},description:`El examen donde se cargó, con el nombre de la Problem List (Dental Assessment, Intraoral…).`},{key:`problema`,value:{name:`string`,required:!1},description:`La fila de la Problem List que es este hallazgo: de ahí salen sus procedimientos, caso y derivaciones.`},{key:`kind`,value:{name:`union`,raw:`'procedure' | 'condition'`,elements:[{name:`literal`,value:`'procedure'`},{name:`literal`,value:`'condition'`}],required:!1},description:`De qué botón se cargó (Add Procedure o Add Condition): sólo una condition lleva la guía visual de descriptores.`},{key:`descriptors`,value:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`,required:!1},description:"La guía visual de descriptores: una opción por fila, por id de fila. `descriptor` sigue siendo el texto que se ve\n     en la card -lo elegido acá, unido con coma-, para no duplicar esa lectura en todos lados."},{key:`fee`,value:{name:`number`,required:!1},description:`Lo que cuesta el procedimiento, en dólares: lo muestra Edit Procedure (Figma 5294:85084) cuando existe.`},{key:`treatmentArea`,value:{name:`union`,raw:`AreaTratamiento | null`,elements:[{name:`signature`,type:`object`,raw:`{ tipo: TipoArea; valor: string }`,signature:{properties:[{key:`tipo`,value:{name:`union`,raw:`'Tooth' | 'Range' | 'Quadrant' | 'Arch' | 'Mouth' | 'Intraoral' | 'Extraoral'`,elements:[{name:`literal`,value:`'Tooth'`},{name:`literal`,value:`'Range'`},{name:`literal`,value:`'Quadrant'`},{name:`literal`,value:`'Arch'`},{name:`literal`,value:`'Mouth'`},{name:`literal`,value:`'Intraoral'`},{name:`literal`,value:`'Extraoral'`}],required:!0}},{key:`valor`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1},description:"El área de tratamiento con que se guardó: tipo y valor (CON-3700, `findings.specs`). null: sin área. Si falta, la\n     deduce `areaDeTratamiento`."},{key:`estimado`,value:{name:`EstimadoProcedimiento`,required:!1},description:`El estimado del seguro que se editó en Edit Procedure › Estimate (CON-4211). Sin esto, se calcula solo.`}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}}})))()}export{M as n,L as r,j as t};
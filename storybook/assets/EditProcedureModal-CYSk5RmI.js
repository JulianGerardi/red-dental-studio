import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{c as r,f as i,h as a,o,p as s}from"./form-BshXdIKn.js";import{a as c,c as l}from"./data-CyEcoex9.js";import{n as u,t as d}from"./SurfaceWheel-DYVepzD3.js";function f({finding:e,onClose:t,onSave:n}){let[a,l]=(0,p.useState)(``),[u,f]=(0,p.useState)([]),[h,g]=(0,p.useState)(``);return(0,p.useEffect)(()=>{e&&(l(e.provider),f(e.surfaces),g(e.notes))},[e]),e?(0,m.jsx)(r,{title:`Edit Finding`,onClose:t,width:`max-w-[480px]`,footer:(0,m.jsx)(o,{onCancel:t,onSave:()=>{n({provider:a,surfaces:u,notes:h}),t()}}),children:(0,m.jsxs)(`div`,{className:`flex flex-col gap-5`,children:[(0,m.jsxs)(`div`,{className:`rounded-md border border-line bg-surface-subtle px-3 py-2.5`,children:[(0,m.jsx)(`p`,{className:`text-xs font-extrabold text-ink`,children:e.area}),(0,m.jsx)(`p`,{className:`text-xs text-ink-muted`,children:e.condition})]}),(0,m.jsx)(i,{label:`Provider`,required:!0,options:c,value:a,onChange:l}),e.tooth!==null&&(0,m.jsxs)(`div`,{className:`flex w-full flex-col items-center gap-2`,children:[(0,m.jsx)(`span`,{className:`w-full text-xs font-semibold text-ink-muted`,children:`Surface`}),(0,m.jsx)(d,{value:u,onChange:f,size:180})]}),(0,m.jsx)(s,{label:`Notes`,placeholder:`Document questions, answers, clarifications, or additional notes`,value:h,onChange:g})]})}):null}var p,m;function h(){return(h=e((()=>{p=t(),a(),u(),l(),m=n(),f.__docgenInfo={description:``,methods:[],displayName:`EditProcedureModal`,props:{finding:{required:!0,tsType:{name:`union`,raw:`Finding | null`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In Treatment' | 'Treated' | 'Externally Treated'
| 'No Treatment Needed' | 'Patient Declined' | 'Clinic Declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In Treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally Treated'`},{name:`literal`,value:`'No Treatment Needed'`},{name:`literal`,value:`'Patient Declined'`},{name:`literal`,value:`'Clinic Declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}},{name:`null`}]},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(patch: Partial<Finding>) => void`,signature:{arguments:[{type:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`area`,value:{name:`string`,required:!0}},{key:`condition`,value:{name:`string`,required:!0}},{key:`descriptor`,value:{name:`string`,required:!0}},{key:`date`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`| 'Active' | 'Monitoring' | 'In Treatment' | 'Treated' | 'Externally Treated'
| 'No Treatment Needed' | 'Patient Declined' | 'Clinic Declined' | 'Discarded'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Monitoring'`},{name:`literal`,value:`'In Treatment'`},{name:`literal`,value:`'Treated'`},{name:`literal`,value:`'Externally Treated'`},{name:`literal`,value:`'No Treatment Needed'`},{name:`literal`,value:`'Patient Declined'`},{name:`literal`,value:`'Clinic Declined'`},{name:`literal`,value:`'Discarded'`}],required:!0}},{key:`tooth`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`provider`,value:{name:`string`,required:!0}},{key:`surfaces`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`notes`,value:{name:`string`,required:!0}},{key:`linked`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Ids de los hallazgos del chart que este procedimiento resuelve.`},{key:`diagnoses`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}}]}}],raw:`Partial<Finding>`},name:`patch`}],return:{name:`void`}}},description:``}}}})))()}export{h as n,f as t};
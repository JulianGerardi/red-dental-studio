import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{c as a,g as o,h as s,l as c,n as l,o as u,r as d,t as f,u as p}from"./dropdown-menu-Cp_CIA51.js";import{n as m,t as h}from"./list-filter-Cd1k-3-g.js";import{n as g,t as _}from"./search-BcmXptSh.js";function v({o:e,reservar:t}){let n=e.icon;return(0,x.jsxs)(x.Fragment,{children:[e.tone?(0,x.jsx)(`span`,{"aria-hidden":!0,className:r(`size-2 shrink-0 rounded-full`,S[e.tone])}):n?(0,x.jsx)(n,{className:`size-3.5 shrink-0 text-ink-muted`,"aria-hidden":!0}):t?(0,x.jsx)(`span`,{"aria-hidden":!0,className:r(`shrink-0`,t===`punto`?`size-2`:`size-3.5`)}):null,(0,x.jsx)(`span`,{className:`min-w-0 flex-1 truncate`,children:e.label??e.value}),e.count!==void 0&&(0,x.jsx)(`span`,{className:r(`text-[11px] tabular-nums`,e.count?`text-ink-muted`:`text-ink-faint`),children:e.count})]})}function y({label:e=`Filter`,options:t,value:n,onChange:r,groups:i,search:o,result:m,size:h=`md`,align:g=`end`,tour:y,disabled:S}){let C=i??[{type:`multiple`,options:t??[],value:n??[],onChange:r??(()=>{})}],w=C.reduce((e,t)=>e+(t.type===`single`?t.value===(t.defaultValue??``)?0:1:t.value.length),0)+ +!!o?.value.trim();return(0,x.jsxs)(f,{children:[(0,x.jsx)(s,{asChild:!0,disabled:S,children:(0,x.jsx)(T,{count:w,size:h,label:e,"data-tour":y})}),(0,x.jsxs)(d,{align:g,className:`w-[248px]`,children:[(0,x.jsxs)(`div`,{className:`flex items-center justify-between gap-2 px-2 py-1.5`,children:[(0,x.jsx)(`span`,{className:`text-[12px] font-semibold text-ink`,children:`Filters`}),w>0&&(0,x.jsx)(`button`,{type:`button`,onClick:()=>{C.forEach(e=>e.type===`single`?e.onChange(e.defaultValue??``):e.onChange([])),o?.onChange(``)},className:`text-dash-blue text-[12px] font-medium hover:underline`,children:`Clear all`})]}),o&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p,{}),(0,x.jsxs)(`label`,{className:`flex flex-col gap-1.5 px-2 py-1.5`,children:[(0,x.jsx)(`span`,{className:`text-[11px] font-semibold text-ink-muted`,children:o.label}),(0,x.jsxs)(`span`,{className:`relative`,children:[(0,x.jsx)(_,{className:`pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint`}),(0,x.jsx)(`input`,{value:o.value,onChange:e=>o.onChange(e.target.value),onKeyDown:e=>e.stopPropagation(),placeholder:o.placeholder??`Search...`,className:`focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none`})]})]})]}),C.map((e,t)=>{let n=e.options.map(E),r=n.some(e=>e.tone)?`punto`:n.some(e=>e.icon)?`icono`:void 0;return(0,x.jsxs)(b.Fragment,{children:[(0,x.jsx)(p,{}),e.title&&(0,x.jsx)(u,{className:`text-[11px] font-semibold text-ink-muted`,children:e.title}),e.type===`single`?(0,x.jsx)(a,{value:e.value,onValueChange:e.onChange,children:n.map(e=>(0,x.jsx)(c,{value:e.value,disabled:e.disabled,className:`gap-2 text-[13px]`,children:(0,x.jsx)(v,{o:e,reservar:r})},e.value))}):n.map(t=>(0,x.jsx)(l,{checked:e.value.includes(t.value),disabled:t.disabled&&!e.value.includes(t.value),onCheckedChange:()=>e.onChange(e.value.includes(t.value)?e.value.filter(e=>e!==t.value):[...e.value,t.value]),onSelect:e=>e.preventDefault(),className:`gap-2 text-[13px]`,children:(0,x.jsx)(v,{o:t,reservar:r})},t.value))]},t)}),m&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p,{}),(0,x.jsx)(`p`,{className:`px-2 py-1 text-[11px] text-ink-muted tabular-nums`,children:m})]})]})]})}var b,x,S,C,w,T,E;function D(){return(D=e((()=>{b=t(),m(),g(),n(),o(),x=i(),S={success:`bg-dash-ok-fg`,info:`bg-dash-busy-fg`,warning:`bg-warn-fg`,danger:`bg-dash-bad-fg`,neutral:`bg-ink-faint`,purple:`bg-purple-fg`},C={sm:`h-7 gap-1.5 px-2.5 text-[12px] [&_svg]:size-3.5`,md:`h-9 gap-2 px-3 text-[13px] [&_svg]:size-4`},w=(e=`md`,t=!1)=>r(`focus-visible:outline-dash-blue inline-flex shrink-0 items-center rounded-md border font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors disabled:pointer-events-none disabled:opacity-50`,C[e],t?`border-dash-blue bg-info-bg text-dash-blue`:`data-[state=open]:border-dash-blue border-line bg-white text-ink hover:bg-surface-subtle`),T=(0,b.forwardRef)(({count:e=0,size:t=`md`,label:n=`Filter`,className:i,...a},o)=>(0,x.jsxs)(`button`,{ref:o,type:`button`,"aria-label":e?`${n} (${e} applied)`:n,className:r(w(t,e>0),i),...a,children:[(0,x.jsx)(h,{"aria-hidden":!0}),`Filter`,e>0&&(0,x.jsx)(`span`,{className:`bg-dash-blue flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-semibold text-white tabular-nums`,children:e})]})),T.displayName=`FilterTrigger`,E=e=>typeof e==`string`?{value:e}:e,T.__docgenInfo={description:``,methods:[],displayName:`FilterTrigger`,props:{count:{required:!1,tsType:{name:`number`},description:`Cuántos filtros hay aplicados; con 1 o más el botón se pinta de azul.`,defaultValue:{value:`0`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`keyof typeof TAMANO`,elements:[{name:`literal`,value:`sm`},{name:`literal`,value:`md`}]},description:``,defaultValue:{value:`'md'`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Nombre para lectores de pantalla ("Filter appointments").`,defaultValue:{value:`'Filter'`,computed:!1}}}},v.__docgenInfo={description:``,methods:[],displayName:`FilterOptionLabel`,props:{o:{required:!0,tsType:{name:`Exclude`,elements:[{name:`union`,raw:`string | {
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}},{key:`count`,value:{name:`number`,required:!1},description:`Cuántas filas tiene esa opción.`},{key:`tone`,value:{name:`PillTone`,required:!1},description:`Punto del color del estado (el mismo de su pill).`},{key:`icon`,value:{name:`LucideIcon`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}}]},{name:`string`}],raw:`Exclude<FilterOption, string>`},description:``},reservar:{required:!1,tsType:{name:`union`,raw:`'punto' | 'icono'`,elements:[{name:`literal`,value:`'punto'`},{name:`literal`,value:`'icono'`}]},description:`Otras opciones del grupo llevan punto o ícono: deja el lugar para que los nombres queden alineados.`}}},y.__docgenInfo={description:``,methods:[],displayName:`FilterMenu`,props:{label:{required:!1,tsType:{name:`string`},description:`Nombre para lectores de pantalla y título del menú.`,defaultValue:{value:`'Filter'`,computed:!1}},options:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`string | {
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}},{key:`count`,value:{name:`number`,required:!1},description:`Cuántas filas tiene esa opción.`},{key:`tone`,value:{name:`PillTone`,required:!1},description:`Punto del color del estado (el mismo de su pill).`},{key:`icon`,value:{name:`LucideIcon`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}}]}],raw:`FilterOption[]`},description:`Forma corta: un solo grupo de varias opciones.`},value:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(v: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`v`}],return:{name:`void`}}},description:``},groups:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`| { title?: string; type?: 'multiple'; options: FilterOption[]; value: string[]; onChange: (v: string[]) => void }
| { title?: string; type: 'single'; options: FilterOption[]; value: string; onChange: (v: string) => void; /** El valor de "sin filtro" (All, o el que abre por defecto): no cuenta y Clear all vuelve a él. */ defaultValue?: string }`,elements:[{name:`signature`,type:`object`,raw:`{ title?: string; type?: 'multiple'; options: FilterOption[]; value: string[]; onChange: (v: string[]) => void }`,signature:{properties:[{key:`title`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`literal`,value:`'multiple'`,required:!1}},{key:`options`,value:{name:`Array`,elements:[{name:`union`,raw:`string | {
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}},{key:`count`,value:{name:`number`,required:!1},description:`Cuántas filas tiene esa opción.`},{key:`tone`,value:{name:`PillTone`,required:!1},description:`Punto del color del estado (el mismo de su pill).`},{key:`icon`,value:{name:`LucideIcon`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}}]}],raw:`FilterOption[]`,required:!0}},{key:`value`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`onChange`,value:{name:`signature`,type:`function`,raw:`(v: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`v`}],return:{name:`void`}},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ title?: string; type: 'single'; options: FilterOption[]; value: string; onChange: (v: string) => void; /** El valor de "sin filtro" (All, o el que abre por defecto): no cuenta y Clear all vuelve a él. */ defaultValue?: string }`,signature:{properties:[{key:`title`,value:{name:`string`,required:!1}},{key:`type`,value:{name:`literal`,value:`'single'`,required:!0}},{key:`options`,value:{name:`Array`,elements:[{name:`union`,raw:`string | {
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,elements:[{name:`string`},{name:`signature`,type:`object`,raw:`{
  value: string
  label?: string
  /** Cuántas filas tiene esa opción. */
  count?: number
  /** Punto del color del estado (el mismo de su pill). */
  tone?: PillTone
  icon?: LucideIcon
  disabled?: boolean
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}},{key:`count`,value:{name:`number`,required:!1},description:`Cuántas filas tiene esa opción.`},{key:`tone`,value:{name:`PillTone`,required:!1},description:`Punto del color del estado (el mismo de su pill).`},{key:`icon`,value:{name:`LucideIcon`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}}]}}]}],raw:`FilterOption[]`,required:!0}},{key:`value`,value:{name:`string`,required:!0}},{key:`onChange`,value:{name:`signature`,type:`function`,raw:`(v: string) => void`,signature:{arguments:[{type:{name:`string`},name:`v`}],return:{name:`void`}},required:!0}},{key:`defaultValue`,value:{name:`string`,required:!1},description:`El valor de "sin filtro" (All, o el que abre por defecto): no cuenta y Clear all vuelve a él.`}]}}]}],raw:`FilterGroup[]`},description:``},search:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ label: string; placeholder?: string; value: string; onChange: (v: string) => void }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`placeholder`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`string`,required:!0}},{key:`onChange`,value:{name:`signature`,type:`function`,raw:`(v: string) => void`,signature:{arguments:[{type:{name:`string`},name:`v`}],return:{name:`void`}},required:!0}}]}},description:``},result:{required:!1,tsType:{name:`string`},description:`Una línea al pie con lo que queda: "4 of 6 workflows".`},size:{required:!1,tsType:{name:`union`,raw:`keyof typeof TAMANO`,elements:[{name:`literal`,value:`sm`},{name:`literal`,value:`md`}]},description:`md 36px junto a buscadores · sm 28px en encabezados de cards y paneles.`,defaultValue:{value:`'md'`,computed:!1}},align:{required:!1,tsType:{name:`union`,raw:`'start' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:``,defaultValue:{value:`'end'`,computed:!1}},tour:{required:!1,tsType:{name:`string`},description:`Ancla del tour de ayuda.`},disabled:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}export{D as a,w as i,v as n,T as r,y as t};
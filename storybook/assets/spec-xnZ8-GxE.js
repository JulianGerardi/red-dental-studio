import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{i as a,t as o}from"./Page-D6JwDZ22.js";import{a as s,n as c,s as l}from"./Recipes-CRXnmQYQ.js";function u(e,t){let n=`${e}|${t}`,r=C.get(n);if(r!==void 0)return r;S||(S=document.createElement(`div`),S.style.cssText=`position:absolute;left:-9999px;top:0;visibility:hidden`,document.body.appendChild(S));let i=document.createElement(`span`);i.className=e,i.style.display=`block`,i.style.borderStyle=`solid`,i.style.borderWidth=`1px`,S.appendChild(i);let a=getComputedStyle(i)[t]??``;return S.removeChild(i),C.set(n,a),a}function d(e){let t=e.match(/rgba?\(([\d.]+)[, ]+([\d.]+)[, ]+([\d.]+)(?:[, /]+([\d.]+))?\)/);return t?t[4]!==void 0&&parseFloat(t[4])===0?`none`:`#${[t[1],t[2],t[3]].map(e=>Math.round(parseFloat(e)).toString(16).padStart(2,`0`)).join(``)}${t[4]!==void 0&&parseFloat(t[4])<1?` (${Math.round(parseFloat(t[4])*100)}%)`:``}`:e}function f(e,t){let n=new Map;for(let r of e){let e=k(r).filter(e=>t.re.test(e)).pop();if(!e)continue;let i=t.formato(u(e,t.prop));if(!i||i===`auto`||i===`NaNpx`)continue;let a=n.get(i)??new Set;r.usos.forEach(e=>a.add(`${e.archivo}:${e.linea}`)),n.set(i,a)}return[...n].map(([e,t])=>[e,t.size]).sort((e,t)=>t[1]-e[1])}function p(e,t){let n=new Map;for(let r of e){let e=r.clases.split(/\s+/),i=t.prefijo!==``,a=e.filter(e=>t.re.test(e)&&(i||!e.includes(`:`))).filter(e=>{let n=O(e);return t.prop===`color`?!A.test(n):t.prop!==`borderTopColor`||!j.test(n)}).pop();if(!a)continue;let o=n.get(a)??new Set;r.usos.forEach(e=>o.add(`${e.archivo}:${e.linea}`)),n.set(a,o)}return[...n].map(([e,n])=>{let r=O(e);return{clase:r,hex:d(r.startsWith(`bg-`)||r.startsWith(`text-`)||r.startsWith(`border-`)?u(r,t.prop):``),n:n.size}}).sort((e,t)=>t.n-e.n)}function m({color:e}){let t=e===`none`||e===``;return(0,x.jsx)(`span`,{className:r(`inline-block size-3.5 shrink-0 rounded-[3px] border border-line`,t&&`bg-[repeating-linear-gradient(45deg,#e4e4e7_0_2px,#fff_2px_4px)]`),style:t?void 0:{background:e.replace(/ \(.*\)/,``)},"aria-hidden":!0})}function h({looks:e,total:t}){let n=(0,b.useMemo)(()=>D.map(t=>({f:t,valores:f(e,t)})).filter(e=>e.valores.length),[e]);return(0,x.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line-row bg-white text-[12px]`,children:n.map(({f:e,valores:n})=>{let r=Math.max(...n.map(([,e])=>e)),i=n.slice(6);return(0,x.jsxs)(`div`,{className:`grid grid-cols-1 gap-2 border-t border-line-row px-4 py-3 first:border-t-0 sm:grid-cols-[150px_1fr]`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,x.jsx)(`p`,{className:n.length>1?`text-warn-fg`:`text-dash-ok-fg`,children:n.length>1?`${n.length} values in use`:`1 value: consistent`})]}),(0,x.jsxs)(`ul`,{className:`flex flex-col gap-1`,children:[n.slice(0,6).map(([e,n])=>(0,x.jsxs)(`li`,{className:`flex items-center gap-2`,children:[(0,x.jsx)(`span`,{className:`w-[76px] shrink-0 font-medium tabular-nums`,children:e}),(0,x.jsx)(`span`,{className:`h-2 rounded-full bg-dash-blue`,style:{width:`${Math.max(3,n/r*220)}px`}}),(0,x.jsxs)(`span`,{className:`text-ink-muted tabular-nums`,children:[n,` `,(0,x.jsxs)(`span`,{className:`text-ink-faint`,children:[`of `,t]})]})]},e)),i.length>0&&(0,x.jsxs)(`li`,{className:`text-ink-faint`,children:[`+ `,i.length,` more values, used by `,i.reduce((e,[,t])=>e+t,0),` `,i.reduce((e,[,t])=>e+t,0)===1?`element`:`elements`,` in total`]})]})]},e.nombre)})})}function g({looks:e,roles:t=M,max:n=6}){let r=(0,b.useMemo)(()=>t.map(t=>({r:t,colores:p(e,t)})).filter(e=>e.colores.length),[e,t]);return(0,x.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line-row bg-white text-[12px]`,children:r.map(({r:e,colores:t})=>(0,x.jsxs)(`div`,{className:`grid grid-cols-1 gap-2 border-t border-line-row px-4 py-3 first:border-t-0 sm:grid-cols-[150px_1fr]`,children:[(0,x.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,x.jsxs)(`ul`,{className:`flex flex-wrap gap-x-4 gap-y-1.5`,children:[t.slice(0,n).map(e=>(0,x.jsxs)(`li`,{className:`flex items-center gap-1.5`,children:[(0,x.jsx)(m,{color:e.hex}),(0,x.jsx)(`span`,{className:`font-mono text-[11px]`,children:e.clase.replace(/^(?:bg|text|border)-/,``)}),(0,x.jsxs)(`span`,{className:`text-ink-faint tabular-nums`,children:[e.hex===`none`?``:e.hex,` · `,e.n]})]},e.clase)),t.length>n&&(0,x.jsxs)(`li`,{className:`text-ink-faint`,children:[`+ `,t.length-n,` more`]})]})]},e.nombre))})}function _(e,t,n=3){let r=new Map;for(let n of e)for(let e of new Set(n.clases.split(/\s+/).filter(e=>t.test(e)))){let t=r.get(e)??new Set;n.usos.forEach(e=>t.add(`${e.archivo}:${e.linea}`)),r.set(e,t)}return[...r].map(([e,t])=>({clase:e,n:t.size})).sort((e,t)=>t.n-e.n).slice(0,n)}function v({looks:e,total:t,filas:n}){return(0,x.jsx)(`div`,{className:`overflow-x-auto rounded-lg border border-line-row bg-white`,children:(0,x.jsxs)(`table`,{className:`w-full min-w-[720px] text-left text-[12px]`,children:[(0,x.jsx)(`thead`,{className:`bg-surface-alt text-[10px] tracking-wide text-ink-muted uppercase`,children:(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`th`,{className:`px-4 py-2.5`,children:`State`}),(0,x.jsx)(`th`,{className:`px-3 py-2.5`,children:`Defined in`}),(0,x.jsx)(`th`,{className:`px-3 py-2.5`,children:`What the code does`}),(0,x.jsx)(`th`,{className:`px-3 py-2.5`,children:`What is missing`})]})}),(0,x.jsx)(`tbody`,{children:n.map(n=>{let i=e.filter(n.define),a=s(i),c=t?Math.round(a/t*100):0,l=_(i,n.clases),u=e.filter(e=>!n.define(e));return(0,x.jsxs)(`tr`,{className:`border-t border-line-row align-top`,children:[(0,x.jsx)(`td`,{className:`px-4 py-3 text-[13px] font-semibold`,children:n.estado}),(0,x.jsxs)(`td`,{className:`px-3 py-3 whitespace-nowrap`,children:[(0,x.jsxs)(`span`,{className:r(`font-semibold tabular-nums`,c>=80?`text-dash-ok-fg`:`text-warn-fg`),children:[c,`%`]}),` `,(0,x.jsxs)(`span`,{className:`text-ink-muted tabular-nums`,children:[a,` of `,t]})]}),(0,x.jsx)(`td`,{className:`px-3 py-3`,children:l.length?(0,x.jsx)(`ul`,{className:`flex flex-wrap gap-1.5`,children:l.map(e=>(0,x.jsxs)(`li`,{children:[(0,x.jsx)(o,{children:e.clase}),` `,(0,x.jsxs)(`span`,{className:`text-ink-faint`,children:[`×`,e.n]})]},e.clase))}):(0,x.jsx)(`span`,{className:`text-ink-faint`,children:`nothing`})}),(0,x.jsx)(`td`,{className:`max-w-[320px] px-3 py-3 text-ink-medium`,children:n.faltante(Math.max(0,t-a),u)})]},n.estado)})})]})})}function y({tipo:e,familiaDe:t,cantidad:n,elementos:r}){return(0,x.jsxs)(`details`,{className:`rounded-lg border border-line-row bg-white px-4 py-3`,children:[(0,x.jsxs)(`summary`,{className:`cursor-pointer text-[13px] font-medium text-dash-blue`,children:[`Everything found in the code: `,n,` variants across `,r,` elements`]}),(0,x.jsx)(`p`,{className:`mt-2 mb-3 max-w-[70ch] text-[12.5px] text-ink-muted`,children:`Cada combinación de clases que el código dibuja, ordenada por uso. Sirve para buscar un caso puntual y para encontrar los que les falta un estado.`}),(0,x.jsx)(c,{tipo:e,familiaDe:t})]})}var b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{b=t(),a(),l(),n(),x=i(),S=null,C=new Map,w=e=>Math.round(parseFloat(e)*10)/10,T={400:`regular`,500:`medium`,600:`semibold`,700:`bold`},E=e=>w(e)>=999?`pill`:`${w(e)}px`,D=[{nombre:`Height`,re:/^(?:h|size)-(?:\d|\[)/,prop:`height`,formato:E},{nombre:`Padding (left/right)`,re:/^px-(?:\d|\[)/,prop:`paddingLeft`,formato:E},{nombre:`Text size`,re:/^text-(?:\[[\d.]+px\]|xs|sm|base|lg|xl)$/,prop:`fontSize`,formato:E},{nombre:`Weight`,re:/^font-(?:normal|medium|semibold|bold)$/,prop:`fontWeight`,formato:e=>T[e]??e},{nombre:`Radius`,re:/^rounded(?:-(?:sm|md|lg|xl|2xl|full|\[[^\]]+\]))?$/,prop:`borderTopLeftRadius`,formato:E}],O=e=>e.replace(/^(?:[^\s:]+:)+/,``),k=e=>e.clases.split(/\s+/).filter(e=>e&&!e.includes(`:`)),A=/^text-(?:\[[\d.]+px\]|xs|sm|base|lg|xl|\dxl|left|center|right|justify|start|end|balance|pretty|ellipsis|clip|wrap|nowrap)$/,j=/^border(?:-(?:0|2|4|8|[trblxyse](?:-\S+)?|solid|dashed|dotted|none|collapse|separate|spacing-\S+))?$/,M=[{nombre:`Fill`,re:/^bg-(?!\[?(?:position|size))/,prefijo:``,prop:`backgroundColor`},{nombre:`Fill on hover`,re:/^hover:bg-/,prefijo:`hover:`,prop:`backgroundColor`},{nombre:`Text`,re:/^text-/,prefijo:``,prop:`color`},{nombre:`Border`,re:/^border-/,prefijo:``,prop:`borderTopColor`},{nombre:`Border on focus`,re:/^focus(?:-visible)?:border-/,prefijo:`focus:`,prop:`borderTopColor`}],h.__docgenInfo={description:``,methods:[],displayName:`TamanosEnUso`,props:{looks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}}],raw:`Receta[]`},description:``},total:{required:!0,tsType:{name:`number`},description:``}}},g.__docgenInfo={description:``,methods:[],displayName:`ColoresEnUso`,props:{looks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}}],raw:`Receta[]`},description:``},roles:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ nombre: string; re: RegExp; prefijo: string; prop: string; variante?: string }`,signature:{properties:[{key:`nombre`,value:{name:`string`,required:!0}},{key:`re`,value:{name:`RegExp`,required:!0}},{key:`prefijo`,value:{name:`string`,required:!0}},{key:`prop`,value:{name:`string`,required:!0}},{key:`variante`,value:{name:`string`,required:!1}}]}}],raw:`Rol[]`},description:``,defaultValue:{value:`[
  { nombre: 'Fill', re: /^bg-(?!\\[?(?:position|size))/, prefijo: '', prop: 'backgroundColor' },
  { nombre: 'Fill on hover', re: /^hover:bg-/, prefijo: 'hover:', prop: 'backgroundColor' },
  { nombre: 'Text', re: /^text-/, prefijo: '', prop: 'color' },
  { nombre: 'Border', re: /^border-/, prefijo: '', prop: 'borderTopColor' },
  { nombre: 'Border on focus', re: /^focus(?:-visible)?:border-/, prefijo: 'focus:', prop: 'borderTopColor' },
]`,computed:!1}},max:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`6`,computed:!1}}}},v.__docgenInfo={description:``,methods:[],displayName:`EstadosDeLaApp`,props:{looks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}}],raw:`Receta[]`},description:``},total:{required:!0,tsType:{name:`number`},description:``},filas:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ estado: string; define: (r: Receta) => boolean; clases: RegExp; faltante: (faltan: number, sin: Receta[]) => string }`,signature:{properties:[{key:`estado`,value:{name:`string`,required:!0}},{key:`define`,value:{name:`signature`,type:`function`,raw:`(r: Receta) => boolean`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}},name:`r`}],return:{name:`boolean`}},required:!0}},{key:`clases`,value:{name:`RegExp`,required:!0}},{key:`faltante`,value:{name:`signature`,type:`function`,raw:`(faltan: number, sin: Receta[]) => string`,signature:{arguments:[{type:{name:`number`},name:`faltan`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}}],raw:`Receta[]`},name:`sin`}],return:{name:`string`}},required:!0}}]}}],raw:`FilaEstado[]`},description:``}}},y.__docgenInfo={description:``,methods:[],displayName:`TodoLoEncontrado`,props:{tipo:{required:!0,tsType:{name:`union`,raw:`Receta['tipo']`},description:``},familiaDe:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(r: Receta) => string`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  inputType?: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`tipo`,value:{name:`union`,raw:`'button' | 'field' | 'card' | 'table' | 'pill'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'field'`},{name:`literal`,value:`'card'`},{name:`literal`,value:`'table'`},{name:`literal`,value:`'pill'`}],required:!0}},{key:`tag`,value:{name:`string`,required:!0}},{key:`inputType`,value:{name:`string`,required:!1}},{key:`firma`,value:{name:`string`,required:!0}},{key:`clases`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`string`,required:!0}},{key:`cantidad`,value:{name:`number`,required:!0}},{key:`archivos`,value:{name:`number`,required:!0}},{key:`estados`,value:{name:`signature`,type:`object`,raw:`{
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}`,signature:{properties:[{key:`hover`,value:{name:`boolean`,required:!0}},{key:`hoverSinEfecto`,value:{name:`boolean`,required:!0}},{key:`hoverGrupo`,value:{name:`boolean`,required:!0}},{key:`foco`,value:{name:`union`,raw:`'definido' | 'quitado' | 'invisible' | 'navegador'`,elements:[{name:`literal`,value:`'definido'`},{name:`literal`,value:`'quitado'`},{name:`literal`,value:`'invisible'`},{name:`literal`,value:`'navegador'`}],required:!0}},{key:`activo`,value:{name:`boolean`,required:!0}},{key:`deshabilitado`,value:{name:`boolean`,required:!0}},{key:`deshabilitadoPorAtributo`,value:{name:`boolean`,required:!0}}]},required:!0}},{key:`usos`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ archivo: string; linea: number; cuando?: string }`,signature:{properties:[{key:`archivo`,value:{name:`string`,required:!0}},{key:`linea`,value:{name:`number`,required:!0}},{key:`cuando`,value:{name:`string`,required:!1}}]}}],raw:`Uso[]`,required:!0}}]}},name:`r`}],return:{name:`string`}}},description:``},cantidad:{required:!0,tsType:{name:`number`},description:``},elementos:{required:!0,tsType:{name:`number`},description:``}}}})))()}export{y as a,h as i,v as n,N as o,M as r,g as t};
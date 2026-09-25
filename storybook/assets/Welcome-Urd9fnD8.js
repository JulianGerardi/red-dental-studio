import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{c as t,m as n}from"./blocks-BVRgHfLs.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{i,r as a}from"./react-Bl2r1tuC.js";function o(e){let n={code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{title:`Welcome`}),`
`,(0,c.jsx)(n.h1,{id:`red-dental-studio-design-system`,children:`Red Dental Studio design system`}),`
`,(0,c.jsxs)(n.p,{children:[`Este design system `,(0,c.jsx)(n.strong,{children:`no es una copia`}),` de la app: lee el mismo código.`]}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Los tokens`}),` (colores, radios, sombras, tipografía) salen de `,(0,c.jsx)(n.code,{children:`src/index.css`}),`. Si cambiás un valor ahí, cambia la app y cambia esta documentación.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Los componentes`}),` de cada story se importan de `,(0,c.jsx)(n.code,{children:`src/components`}),`. Si cambiás un botón, cambia acá.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Las auditorías`}),` (colores escritos a mano, tamaños de texto, radios) se calculan leyendo el código fuente en cada build.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`qué-se-actualiza-solo-y-qué-no`,children:`Qué se actualiza solo y qué no`}),`
`,(0,c.jsxs)(n.p,{children:[`| Si vos… | El design system… |
|---|---|
| Cambiás un token en `,(0,c.jsx)(n.code,{children:`src/index.css`}),` | Se actualiza solo. |
| Cambiás un componente existente | Se actualiza solo. |
| Cambiás un color escrito a mano (`,(0,c.jsx)(n.code,{children:`text-ink`}),`) | Cambia solo ese lugar. Por eso conviene pasarlos a tokens: ver `,(0,c.jsx)(n.em,{children:`Foundations / Color audit`}),`. |
| Agregás un componente nuevo | Hay que crear su `,(0,c.jsx)(n.code,{children:`.stories.tsx`}),`. `,(0,c.jsx)(n.code,{children:`npm run ds:coverage`}),` lista los que faltan. |`]}),`
`,(0,c.jsx)(n.h2,{id:`cómo-se-usa`,children:`Cómo se usa`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm run storybook        # abre el design system en localhost:6006
npm run ds:coverage      # componentes de la app que todavía no tienen story
npm run build-storybook  # versión estática
`})})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),a(),n()})))()}l();export{s as default};
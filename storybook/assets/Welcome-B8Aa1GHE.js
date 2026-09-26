import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,m as r}from"./blocks-CADj0-un.js";import{i,r as a}from"./react-Bl2r1tuC.js";import{n as o,r as s}from"./Mapa-vm3M150P.js";function c(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...i(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Welcome`}),`
`,(0,u.jsx)(t.h1,{id:`confidentally-design-system`,children:`Confidentally design system`}),`
`,(0,u.jsxs)(t.p,{children:[`Este design system `,(0,u.jsx)(t.strong,{children:`no es una copia`}),` de la app: lee el mismo código. Si cambiás un color o un componente en la app, cambia acá.`]}),`
`,(0,u.jsx)(t.h2,{id:`ir-a`,children:`Ir a…`}),`
`,(0,u.jsx)(t.p,{children:`Todas las páginas del design system. Buscá por nombre o hacé clic para abrirla.`}),`
`,(0,u.jsx)(o,{}),`
`,(0,u.jsx)(t.h2,{id:`cómo-está-ordenado`,children:`Cómo está ordenado`}),`
`,(0,u.jsxs)(t.p,{children:[`| Sección | Qué hay | Para qué |
|---|---|---|
| `,(0,u.jsx)(t.strong,{children:`Foundations`}),` | Colores, tipografía, radios y sombras. | Los valores base, leídos de `,(0,u.jsx)(t.code,{children:`src/index.css`}),`. |
| `,(0,u.jsx)(t.strong,{children:`Elements`}),` | Buttons, Fields, Pills, Cards y Tables. | Las piezas estándar para armar pantallas. Cada una tiene un `,(0,u.jsx)(t.strong,{children:`Playground`}),` para personalizarla y probarla, sus estados, sus medidas y sus colores. |
| `,(0,u.jsx)(t.strong,{children:`Components`}),` | Las piezas de cada módulo (Dashboard, Patients, Scheduling, Clinical…). | Ver y probar cada componente de la app por separado. |
| `,(0,u.jsx)(t.strong,{children:`Pages`}),` | Las 30 pantallas de la app. | Ver cada pantalla completa, con sus rutas reales. |
| `,(0,u.jsx)(t.strong,{children:`Audit`}),` | Colores sin token, estados, duplicados, cobertura y lo que el código hace hoy. | Para quien migra código: qué se aparta del estándar. |`]}),`
`,(0,u.jsx)(t.h2,{id:`cómo-probar-un-elemento`,children:`Cómo probar un elemento`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Abrí un elemento en `,(0,u.jsx)(t.strong,{children:`Elements`}),`, por ejemplo `,(0,u.jsx)(t.em,{children:`Buttons`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[`Entrá a `,(0,u.jsx)(t.strong,{children:`Playground`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[`En el panel `,(0,u.jsx)(t.strong,{children:`Controls`}),` (abajo o a la derecha) cambiá variante, tamaño, texto, estado… El elemento cambia en vivo.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Show code`}),` muestra el código de lo que armaste, listo para copiar.`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`qué-se-actualiza-solo-y-qué-no`,children:`Qué se actualiza solo y qué no`}),`
`,(0,u.jsxs)(t.p,{children:[`| Si vos… | El design system… |
|---|---|
| Cambiás un token en `,(0,u.jsx)(t.code,{children:`src/index.css`}),` | Se actualiza solo. |
| Cambiás un componente existente | Se actualiza solo. |
| Cambiás un color escrito a mano (`,(0,u.jsx)(t.code,{children:`text-[#09090b]`}),`) | Cambia solo ese lugar. Por eso conviene pasarlos a tokens: ver `,(0,u.jsx)(t.em,{children:`Audit / Colors in code`}),`. |
| Agregás un componente nuevo | Hay que crear su `,(0,u.jsx)(t.code,{children:`.stories.tsx`}),`. `,(0,u.jsx)(t.code,{children:`npm run ds:coverage`}),` lista los que faltan. |`]}),`
`,(0,u.jsx)(t.h2,{id:`comandos`,children:`Comandos`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm run storybook        # abre el design system en localhost:6006
npm run ds:coverage      # lo que todavía no tiene story
npm run build-storybook  # versión estática
`})})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=t(),a(),r(),s()})))()}d();export{l as default};
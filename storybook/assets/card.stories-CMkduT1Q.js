import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{t as n}from"./react-BZJXY1be.js";import{n as r,t as i}from"./utils-D-bRdWGo.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{n as o,t as ee}from"./ellipsis-vertical-CPfIlQ5Q.js";import{B as s,G as te,H as ne,R as c,U as l,V as re,W as ie,z as ae}from"./iframe-eLdIjlvv.js";import{d as u,h as oe,m as se}from"./form-okBm0E1v.js";import{i as ce,r as d}from"./button-COcjaSEg.js";import{n as le,t as ue}from"./AppointmentCard.stories-Du9JHTm5.js";import{n as de,t as f}from"./OperatoryCard.stories-BARAMBqo.js";import{n as p,t as m}from"./PendingTaskCard.stories-B5gA4So6.js";import{n as h,t as fe}from"./StatCard.stories-Chnxbpem.js";import{n as pe,t as me}from"./PatientCard.stories-BYc4domO.js";import{c as he,l as ge,o as g,r as _,t as v}from"./kit-DxbGnops.js";import{a as y,i as b,n as x,o as S,r as C,s as _e,t as w}from"./card-CaiN5pSM.js";function T(){return(T=t((()=>{l(),s(),c()})))()}function ve(e,t,n,r){return M(e,t,n,globalThis.globalProjectAnnotations??F,r)}function E(e,t){return j(e,t,ve)}var D,O,k,A,j,M,N,P,F;function I(){return(I=t((()=>{T(),l(),s(),c(),te(),re(),D=e(n(),1),{global:O}=__STORYBOOK_MODULE_GLOBAL__,{window:k}=O,k&&(k.STORYBOOK_ENV=`react`),{composeConfigs:A,composeStories:j,composeStory:M,setProjectAnnotations:N,setDefaultProjectAnnotations:P}=__STORYBOOK_MODULE_PREVIEW_API__,F=A([ne,ae,{renderToCanvas:async(e,t)=>{if(e.storyContext.testingLibraryRender==null)return ie(e,t);let{storyContext:{context:n,unboundStoryFn:r,testingLibraryRender:i}}=e,{unmount:a}=i(D.createElement(r,{...n}),{container:n.canvasElement});return a}}])})))()}function L(){return(L=t((()=>{I()})))()}function ye({title:e,description:t,action:n,content:r,footer:a,state:o,width:s}){return(0,B.jsxs)(w,{style:{width:s},className:i(o===`hover`&&`hover:border-dash-blue/40 pseudo-hover cursor-pointer transition-colors`,o===`selected`&&`border-dash-blue ring-dash-blue/15 ring-2`),children:[(0,B.jsxs)(y,{children:[(0,B.jsxs)(`div`,{className:`min-w-0`,children:[(0,B.jsx)(S,{children:e}),t&&(0,B.jsx)(C,{children:t})]}),n===`button`&&(0,B.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`}),n===`menu`&&(0,B.jsx)(d,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Actions`,children:(0,B.jsx)(ee,{})})]}),(0,B.jsx)(x,{children:r}),a&&(0,B.jsxs)(b,{children:[(0,B.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,B.jsx)(d,{size:`md`,children:`Save`})]})]})}function R({nombre:e,children:t,className:n}){return(0,B.jsxs)(`div`,{className:i(`relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1`,n),children:[(0,B.jsx)(`span`,{className:`bg-dash-blue absolute -top-2 right-2 rounded px-1.5 text-[10px] leading-4 font-semibold text-white`,children:e}),t]})}function z({nombre:e,children:t,selector:n}){let{ref:r,m:i}=ge(n);return(0,B.jsxs)(`tr`,{children:[(0,B.jsx)(`td`,{className:`font-semibold`,children:e}),(0,B.jsx)(`td`,{children:(0,B.jsx)(`div`,{ref:r,children:t})}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.radio}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.borde}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.padding})]})}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{L(),o(),ce(),_e(),oe(),he(),h(),le(),de(),p(),pe(),r(),B=a(),V={title:`Elements/Cards`,component:w,parameters:{layout:`padded`,docs:{description:{component:[`Una **card** es la caja blanca que agrupa **un solo tema** sobre el fondo gris de la pantalla: los datos de contacto de un paciente, un número del día, una cita. Sirve para separar bloques y que la pantalla se lea por partes.`,``,"**Partes** (`@/components/ui/card`): `Card` (la caja) · `CardHeader` con `CardTitle` y `CardDescription` · `CardContent` · `CardFooter` para las acciones.",``,`**Probalo:** en *Playground* armá tu card desde *Controls*: título, bajada, acción, contenido, pie y estado.`].join(`
`)}}},args:{title:`Contact information`,description:`How the clinic reaches the patient.`,action:`button`,content:`sarah.stone@mail.com · (555) 010-2233`,footer:!1,state:`default`,width:380},argTypes:{title:{control:`text`,description:`Título de la card.`},description:{control:`text`,description:`Bajada debajo del título. Vacía = sin bajada.`},action:{control:`inline-radio`,options:[`none`,`button`,`menu`],description:`Acción arriba a la derecha.`},content:{control:`text`,description:`Contenido.`},footer:{control:`boolean`,description:`Pie con Cancel y Save.`},state:{control:`inline-radio`,options:[`default`,`hover`,`selected`],description:`hover: la card entera es clickeable. selected: está elegida.`},width:{control:{type:`range`,min:240,max:640,step:20},description:`Ancho en px.`}},decorators:[e=>(0,B.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,B.jsx)(e,{})})]},H={render:e=>(0,B.jsx)(ye,{...e})},U={parameters:{controls:{disable:!0}},render:()=>(0,B.jsxs)(w,{className:`w-[420px]`,children:[(0,B.jsx)(R,{nombre:`CardHeader`,children:(0,B.jsxs)(y,{className:`pb-1`,children:[(0,B.jsxs)(`div`,{children:[(0,B.jsx)(R,{nombre:`CardTitle`,className:`inline-block`,children:(0,B.jsx)(S,{children:`Contact information`})}),(0,B.jsx)(C,{children:`How the clinic reaches the patient.`})]}),(0,B.jsx)(d,{variant:`link`,size:`sm`,children:`Edit`})]})}),(0,B.jsx)(R,{nombre:`CardContent`,children:(0,B.jsx)(x,{children:`sarah.stone@mail.com · (555) 010-2233`})}),(0,B.jsx)(R,{nombre:`CardFooter`,children:(0,B.jsxs)(b,{children:[(0,B.jsx)(d,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,B.jsx)(d,{size:`md`,children:`Save`})]})})]})},{Default:W}=E(fe),{Default:G}=E(ue),{Available:K}=E(f),{Default:q}=E(m),{Active:J}=E(me),Y=[{nombre:`SectionCard`,uso:`A block of a form: groups related fields under a title.`,ancho:340,nodo:(0,B.jsx)(u,{title:`General`,children:(0,B.jsx)(se,{label:`Name`,placeholder:`Name`})})},{nombre:`StatCard`,uso:`One number of the day with its change.`,ancho:260,nodo:(0,B.jsx)(W,{})},{nombre:`AppointmentCard`,uso:`One appointment in the dashboard list.`,ancho:360,nodo:(0,B.jsx)(G,{})},{nombre:`OperatoryCard`,uso:`One room and who is in it.`,ancho:300,nodo:(0,B.jsx)(K,{})},{nombre:`PendingTaskCard`,uso:`A task that is waiting for someone.`,ancho:320,nodo:(0,B.jsx)(q,{})},{nombre:`PatientCard`,uso:`A patient in the mobile list.`,ancho:340,nodo:(0,B.jsx)(J,{})}],X={name:`Cards in the app`,parameters:{controls:{disable:!0}},render:()=>(0,B.jsx)(_,{children:(0,B.jsx)(`div`,{className:`grid grid-cols-1 gap-6 md:grid-cols-2`,children:Y.map(e=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,B.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,B.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:e.uso}),(0,B.jsx)(`div`,{style:{width:e.ancho,maxWidth:`100%`},children:e.nodo})]},e.nombre))})})},Z={parameters:{controls:{disable:!0}},render:()=>(0,B.jsxs)(_,{children:[(0,B.jsx)(v,{titulo:`Box`,nota:`Medidas leídas de la card dibujada.`,children:(0,B.jsxs)(g,{encabezado:[`Part`,`Sample`,`Radius`,`Border`,`Padding`],minimo:640,children:[(0,B.jsx)(z,{nombre:`Card`,children:(0,B.jsx)(w,{className:`h-12 w-40`})}),(0,B.jsx)(z,{nombre:`CardHeader`,selector:`:scope > div > div`,children:(0,B.jsx)(w,{className:`w-40`,children:(0,B.jsx)(y,{children:(0,B.jsx)(S,{children:`Title`})})})}),(0,B.jsx)(z,{nombre:`CardContent`,selector:`:scope > div > div`,children:(0,B.jsx)(w,{className:`w-40`,children:(0,B.jsx)(x,{children:`Content`})})}),(0,B.jsx)(z,{nombre:`CardFooter`,selector:`:scope > div > div`,children:(0,B.jsx)(w,{className:`w-40`,children:(0,B.jsx)(b,{children:(0,B.jsx)(d,{size:`sm`,children:`Save`})})})})]})}),(0,B.jsx)(v,{titulo:`Rules`,children:(0,B.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,B.jsx)(`li`,{children:`One topic per card. If it needs two titles, it is two cards.`}),(0,B.jsx)(`li`,{children:`The action that edits the card goes top right; the ones that save or cancel go in the footer.`}),(0,B.jsx)(`li`,{children:`Cards sit on the grey page background, 16–24px apart.`})]})})]})},Q=[`Playground`,`Anatomy`,`InTheApp`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <Armada {...args} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Card className="w-[420px]">
      <Parte nombre="CardHeader">
        <CardHeader className="pb-1">
          <div>
            <Parte nombre="CardTitle" className="inline-block"><CardTitle>Contact information</CardTitle></Parte>
            <CardDescription>How the clinic reaches the patient.</CardDescription>
          </div>
          <Button variant="link" size="sm">Edit</Button>
        </CardHeader>
      </Parte>
      <Parte nombre="CardContent"><CardContent>sarah.stone@mail.com · (555) 010-2233</CardContent></Parte>
      <Parte nombre="CardFooter">
        <CardFooter><Button variant="secondary" size="md">Cancel</Button><Button size="md">Save</Button></CardFooter>
      </Parte>
    </Card>
}`,...U.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Cards in the app',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {EN_LA_APP.map(c => <div key={c.nombre} className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold">{c.nombre}</p>
            <p className="text-[12px] text-ink-muted">{c.uso}</p>
            <div style={{
          width: c.ancho,
          maxWidth: '100%'
        }}>{c.nodo}</div>
          </div>)}
      </div>
    </Lienzo>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Box" nota="Medidas leídas de la card dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Radius', 'Border', 'Padding']} minimo={640}>
          <Medida nombre="Card"><Card className="h-12 w-40" /></Medida>
          <Medida nombre="CardHeader" selector=":scope > div > div"><Card className="w-40"><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card></Medida>
          <Medida nombre="CardContent" selector=":scope > div > div"><Card className="w-40"><CardContent>Content</CardContent></Card></Medida>
          <Medida nombre="CardFooter" selector=":scope > div > div"><Card className="w-40"><CardFooter><Button size="sm">Save</Button></CardFooter></Card></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One topic per card. If it needs two titles, it is two cards.</li>
          <li>The action that edits the card goes top right; the ones that save or cancel go in the footer.</li>
          <li>Cards sit on the grey page background, 16–24px apart.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{U as Anatomy,X as InTheApp,H as Playground,Z as Specs,Q as __namedExportsOrder,V as default};
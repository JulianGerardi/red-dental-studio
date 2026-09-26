import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{t as n}from"./react-BZJXY1be.js";import{n as r,t as i}from"./utils-D-bRdWGo.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{n as o,t as s}from"./ellipsis-vertical-CPfIlQ5Q.js";import{i as c,n as ee,r as te,t as ne}from"./SettingsSectionCard-BBghgjIq.js";import{B as l,G as re,H as u,R as d,U as f,V as ie,W as ae,z as oe}from"./iframe-DllVlc9d.js";import{d as se,h as ce,m as p}from"./form-O6bftQXq.js";import{a as le,r as m}from"./button-Cb-S0EUF.js";import{n as ue,t as de}from"./AppointmentCard.stories-Dxlm5P4f.js";import{n as fe,t as h}from"./OperatoryCard.stories-BARAMBqo.js";import{n as g,t as _}from"./PendingTaskCard.stories-DY6ac1Jl.js";import{n as pe,t as me}from"./StatCard.stories-Chnxbpem.js";import{n as he,t as ge}from"./PatientCard.stories-Cdmob3--.js";import{a as v,i as y,n as b,o as x,r as S,s as _e,t as C}from"./card-CaiN5pSM.js";import{c as ve,l as ye,o as be,r as w,t as T}from"./kit-DxbGnops.js";function E(){return(E=t((()=>{f(),l(),d()})))()}function D(e,t,n,r){return P(e,t,n,globalThis.globalProjectAnnotations??F,r)}function O(e,t){return N(e,t,D)}var k,A,j,M,N,P,xe,Se,F;function I(){return(I=t((()=>{E(),f(),l(),d(),re(),ie(),k=e(n(),1),{global:A}=__STORYBOOK_MODULE_GLOBAL__,{window:j}=A,j&&(j.STORYBOOK_ENV=`react`),{composeConfigs:M,composeStories:N,composeStory:P,setProjectAnnotations:xe,setDefaultProjectAnnotations:Se}=__STORYBOOK_MODULE_PREVIEW_API__,F=M([u,oe,{renderToCanvas:async(e,t)=>{if(e.storyContext.testingLibraryRender==null)return ae(e,t);let{storyContext:{context:n,unboundStoryFn:r,testingLibraryRender:i}}=e,{unmount:a}=i(k.createElement(r,{...n}),{container:n.canvasElement});return a}}])})))()}function L(){return(L=t((()=>{I()})))()}function Ce({title:e,description:t,action:n,content:r,footer:a,state:o,width:c}){return(0,B.jsxs)(C,{style:{width:c},className:i(o===`hover`&&`hover:border-dash-blue/40 pseudo-hover cursor-pointer transition-colors`,o===`selected`&&`border-dash-blue ring-dash-blue/15 ring-2`),children:[(0,B.jsxs)(v,{children:[(0,B.jsxs)(`div`,{className:`min-w-0`,children:[(0,B.jsx)(x,{children:e}),t&&(0,B.jsx)(S,{children:t})]}),n===`button`&&(0,B.jsx)(m,{variant:`link`,size:`sm`,children:`Edit`}),n===`menu`&&(0,B.jsx)(m,{variant:`ghost`,size:`sm`,iconOnly:!0,"aria-label":`Actions`,children:(0,B.jsx)(s,{})})]}),(0,B.jsx)(b,{children:r}),a&&(0,B.jsxs)(y,{children:[(0,B.jsx)(m,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,B.jsx)(m,{size:`md`,children:`Save`})]})]})}function R({nombre:e,children:t,className:n}){return(0,B.jsxs)(`div`,{className:i(`relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1`,n),children:[(0,B.jsx)(`span`,{className:`bg-dash-blue absolute -top-2 right-2 rounded px-1.5 text-[10px] leading-4 font-semibold text-white`,children:e}),t]})}function z({nombre:e,children:t,selector:n}){let{ref:r,m:i}=ye(n);return(0,B.jsxs)(`tr`,{children:[(0,B.jsx)(`td`,{className:`font-semibold`,children:e}),(0,B.jsx)(`td`,{children:(0,B.jsx)(`div`,{ref:r,children:t})}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.radio}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.borde}),(0,B.jsx)(`td`,{className:`tabular-nums`,children:i?.padding})]})}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{L(),o(),c(),le(),_e(),ce(),ve(),pe(),ue(),fe(),g(),he(),ee(),r(),B=a(),V={title:`Elements/Cards`,component:C,parameters:{layout:`padded`,docs:{description:{component:[`Una **card** es la caja blanca que agrupa **un solo tema** sobre el fondo gris de la pantalla: los datos de contacto de un paciente, un número del día, una cita. Sirve para separar bloques y que la pantalla se lea por partes.`,``,"**Partes** (`@/components/ui/card`): `Card` (la caja) · `CardHeader` con `CardTitle` y `CardDescription` · `CardContent` · `CardFooter` para las acciones.",``,`**Probalo:** en *Playground* armá tu card desde *Controls*: título, bajada, acción, contenido, pie y estado.`].join(`
`)}}},args:{title:`Contact information`,description:`How the clinic reaches the patient.`,action:`button`,content:`sarah.stone@mail.com · (555) 010-2233`,footer:!1,state:`default`,width:380},argTypes:{title:{control:`text`,description:`Título de la card.`},description:{control:`text`,description:`Bajada debajo del título. Vacía = sin bajada.`},action:{control:`inline-radio`,options:[`none`,`button`,`menu`],description:`Acción arriba a la derecha.`},content:{control:`text`,description:`Contenido.`},footer:{control:`boolean`,description:`Pie con Cancel y Save.`},state:{control:`inline-radio`,options:[`default`,`hover`,`selected`],description:`hover: la card entera es clickeable. selected: está elegida.`},width:{control:{type:`range`,min:240,max:640,step:20},description:`Ancho en px.`}},decorators:[e=>(0,B.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,B.jsx)(e,{})})]},H={render:e=>(0,B.jsx)(Ce,{...e})},U={parameters:{controls:{disable:!0}},render:()=>(0,B.jsxs)(C,{className:`w-[420px]`,children:[(0,B.jsx)(R,{nombre:`CardHeader`,children:(0,B.jsxs)(v,{className:`pb-1`,children:[(0,B.jsxs)(`div`,{children:[(0,B.jsx)(R,{nombre:`CardTitle`,className:`inline-block`,children:(0,B.jsx)(x,{children:`Contact information`})}),(0,B.jsx)(S,{children:`How the clinic reaches the patient.`})]}),(0,B.jsx)(m,{variant:`link`,size:`sm`,children:`Edit`})]})}),(0,B.jsx)(R,{nombre:`CardContent`,children:(0,B.jsx)(b,{children:`sarah.stone@mail.com · (555) 010-2233`})}),(0,B.jsx)(R,{nombre:`CardFooter`,children:(0,B.jsxs)(y,{children:[(0,B.jsx)(m,{variant:`secondary`,size:`md`,children:`Cancel`}),(0,B.jsx)(m,{size:`md`,children:`Save`})]})})]})},{Default:W}=O(me),{Default:G}=O(de),{Available:K}=O(h),{Default:q}=O(_),{Active:J}=O(ge),Y=[{nombre:`SettingsSectionCard`,uso:`One section of Settings on its home page. The whole card is the link.`,ancho:320,nodo:(0,B.jsx)(ne,{to:`/settings/accounts`,icon:te,title:`Accounts`,description:`Manage your account and their access.`})},{nombre:`SectionCard`,uso:`A block of a form: groups related fields under a title.`,ancho:340,nodo:(0,B.jsx)(se,{title:`General`,children:(0,B.jsx)(p,{label:`Name`,placeholder:`Name`})})},{nombre:`StatCard`,uso:`One number of the day with its change.`,ancho:260,nodo:(0,B.jsx)(W,{})},{nombre:`AppointmentCard`,uso:`One appointment in the dashboard list.`,ancho:360,nodo:(0,B.jsx)(G,{})},{nombre:`OperatoryCard`,uso:`One room and who is in it.`,ancho:300,nodo:(0,B.jsx)(K,{})},{nombre:`PendingTaskCard`,uso:`A task that is waiting for someone.`,ancho:320,nodo:(0,B.jsx)(q,{})},{nombre:`PatientCard`,uso:`A patient in the mobile list.`,ancho:340,nodo:(0,B.jsx)(J,{})}],X={name:`Cards in the app`,parameters:{controls:{disable:!0}},render:()=>(0,B.jsx)(w,{children:(0,B.jsx)(`div`,{className:`grid grid-cols-1 gap-6 md:grid-cols-2`,children:Y.map(e=>(0,B.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,B.jsx)(`p`,{className:`text-[13px] font-semibold`,children:e.nombre}),(0,B.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:e.uso}),(0,B.jsx)(`div`,{style:{width:e.ancho,maxWidth:`100%`},children:e.nodo})]},e.nombre))})})},Z={parameters:{controls:{disable:!0}},render:()=>(0,B.jsxs)(w,{children:[(0,B.jsx)(T,{titulo:`Box`,nota:`Medidas leídas de la card dibujada.`,children:(0,B.jsxs)(be,{encabezado:[`Part`,`Sample`,`Radius`,`Border`,`Padding`],minimo:640,children:[(0,B.jsx)(z,{nombre:`Card`,children:(0,B.jsx)(C,{className:`h-12 w-40`})}),(0,B.jsx)(z,{nombre:`CardHeader`,selector:`:scope > div > div`,children:(0,B.jsx)(C,{className:`w-40`,children:(0,B.jsx)(v,{children:(0,B.jsx)(x,{children:`Title`})})})}),(0,B.jsx)(z,{nombre:`CardContent`,selector:`:scope > div > div`,children:(0,B.jsx)(C,{className:`w-40`,children:(0,B.jsx)(b,{children:`Content`})})}),(0,B.jsx)(z,{nombre:`CardFooter`,selector:`:scope > div > div`,children:(0,B.jsx)(C,{className:`w-40`,children:(0,B.jsx)(y,{children:(0,B.jsx)(m,{size:`sm`,children:`Save`})})})})]})}),(0,B.jsx)(T,{titulo:`Rules`,children:(0,B.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,B.jsx)(`li`,{children:`One topic per card. If it needs two titles, it is two cards.`}),(0,B.jsx)(`li`,{children:`The action that edits the card goes top right; the ones that save or cancel go in the footer.`}),(0,B.jsx)(`li`,{children:`Cards sit on the grey page background, 16–24px apart.`})]})})]})},Q=[`Playground`,`Anatomy`,`InTheApp`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
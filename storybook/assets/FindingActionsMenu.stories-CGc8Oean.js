import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r}from"./toaster-D2sSwnPH.js";import{n as i,t as a}from"./FindingActionsMenu-Bbii0Jwm.js";import{n as o,r as s}from"./play-Dr1R_I1D.js";import{c,d as l,i as u,t as d,u as f}from"./kit-CWUgB5-0.js";function p({status:e,verRegistro:t}){return(0,m.jsx)(`div`,{className:`flex h-[440px] w-64 justify-end`,children:(0,m.jsx)(a,{finding:{..._,status:e},onVer:t?()=>n.info(`Opens the full record drawer.`):void 0,onEdit:()=>n.info(`Opens Edit Finding.`),onAction:e=>n.info(`Asks to confirm: ${e}.`)})})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{r(),l(),s(),i(),m=t(),{userEvent:h,within:g}=__STORYBOOK_MODULE_TEST__,_={id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Active`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`],notes:``,linked:[],diagnoses:[]},v=[`Active`,`Monitoring`,`In Treatment`,`Treated`,`Externally Treated`,`No Treatment Needed`,`Patient Declined`,`Clinic Declined`,`Discarded`],y=async e=>{await h.click(await g(e.canvasElement).findByRole(`button`,{name:/Actions for Tooth 3/}))},b={title:`Components/Clinical/Dental/FindingActionsMenu`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:480},description:{component:["El menú de los tres puntos de cada finding, en el panel de **Findings** de los exámenes (`ExamLayout`).",``,`**Qué tiene:** *View full record* abre el mismo drawer de sólo lectura que la Problem List (sus procedimientos, caso, derivaciones, órdenes y examen de origen), así parado en un examen se ve lo mismo que en la tabla sin salir de él (Julián, 2026-10-13). Después *Edit*, los cambios de estado (Start Monitoring… Discard) y *Delete*; los que cierran sin tratar van en rojo y cada uno pide confirmación. *Start Treatment* sólo sobre algo abierto (Active o Monitoring).`,``,`**Probalo:** en *Playground* cambiá el estado del finding y si el menú lleva View full record desde *Controls*, y abrí el menú.`].join(`
`)}}},args:{status:`Active`,verRegistro:!0},argTypes:{status:{control:`select`,options:v,description:`El estado del finding: Start Treatment se deshabilita fuera de Active y Monitoring.`},verRegistro:{name:`View full record`,control:`boolean`,description:"Con `onVer`: el ítem que abre el registro completo. En los exámenes va siempre."}}},x={render:e=>(0,m.jsx)(p,{...e})},S={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(u,{children:(0,m.jsx)(d,{titulo:`What each part is`,children:(0,m.jsxs)(c,{encabezado:[`Part`,`What it does`],minimo:600,arriba:!0,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Trigger`}),(0,m.jsx)(`td`,{children:`Los tres puntos en la esquina de la card del finding; su nombre accesible es "Actions for" y el área (Tooth 3, Soft Palate).`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Actions`}),(0,m.jsx)(`td`,{children:`El título del menú, como el de la Problem List.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`View full record`}),(0,m.jsx)(`td`,{children:`Primero, junto a Edit: mirar antes de cambiar. Abre el drawer de la Problem List (Components / Clinical / RecordDetail) con lo vinculado al finding; un link a otro registro cambia el drawer a ese.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Edit`}),(0,m.jsx)(`td`,{children:`Abre Edit Finding.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Status actions`}),(0,m.jsx)(`td`,{children:`Start Monitoring, Start Treatment, Mark As Treated, Mark As Externally Treated; en rojo los que cierran sin tratar y Discard. Cada uno pide confirmación.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Delete`}),(0,m.jsx)(`td`,{children:`Separado al final, en rojo. Se deshace desde el aviso.`})]})]})})})},C={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(u,{children:(0,m.jsx)(d,{titulo:`States`,nota:`Cada uno abierto en su story: Open, Treated y Without full record.`,children:(0,m.jsxs)(c,{encabezado:[`State`,`When`,`Story`],minimo:600,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Open`}),(0,m.jsx)(`td`,{children:`Un finding activo: todo habilitado, View full record primero.`}),(0,m.jsx)(`td`,{children:`Open`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Start Treatment disabled`}),(0,m.jsx)(`td`,{children:`Un finding ya tratado o cerrado: el tratamiento sólo arranca sobre algo abierto.`}),(0,m.jsx)(`td`,{children:`Treated`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Without full record`}),(0,m.jsx)(`td`,{children:"Sin `onVer`: el menú arranca en Edit."}),(0,m.jsx)(`td`,{children:`Without full record`})]})]})})})},w={render:e=>(0,m.jsx)(p,{...e}),play:async e=>{await y(e),await o(/View full record/)(e)}},T={args:{status:`Treated`},render:e=>(0,m.jsx)(p,{...e}),play:async e=>{await y(e),await o(/Start Treatment/)(e)}},E={name:`Without full record`,args:{verRegistro:!1},render:e=>(0,m.jsx)(p,{...e}),play:async e=>{await y(e),await o(/Start Monitoring/)(e)}},D={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(u,{children:(0,m.jsx)(d,{titulo:`Layout`,children:(0,m.jsxs)(c,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Trigger`}),(0,m.jsxs)(`td`,{children:[`28px, ícono de 14px, `,(0,m.jsx)(f,{nombre:`ink-muted`}),`; fondo `,(0,m.jsx)(f,{nombre:`surface-muted`}),` al pasar el mouse.`]})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Menu`}),(0,m.jsx)(`td`,{children:`248px, alineado al borde derecho del trigger. Ítems con ícono de 16px.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Groups`}),(0,m.jsx)(`td`,{children:`View full record y Edit; los estados; Delete. Una línea separa cada grupo.`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Destructive`}),(0,m.jsxs)(`td`,{children:[(0,m.jsx)(f,{nombre:`field-error`}),`: Mark As No Treat. Needed, Patient Declined, Clinic Declined, Discard y Delete.`]})]})]})})})},O=[`Playground`,`Parts`,`States`,`Open`,`Treated`,`WithoutFullRecord`,`Specs`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: a => <Menu {...a} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does']} minimo={600} arriba>
          <tr><td className="font-semibold">Trigger</td><td>Los tres puntos en la esquina de la card del finding; su nombre accesible es "Actions for" y el área (Tooth 3, Soft Palate).</td></tr>
          <tr><td className="font-semibold">Actions</td><td>El título del menú, como el de la Problem List.</td></tr>
          <tr><td className="font-semibold">View full record</td><td>Primero, junto a Edit: mirar antes de cambiar. Abre el drawer de la Problem List (Components / Clinical / RecordDetail) con lo vinculado al finding; un link a otro registro cambia el drawer a ese.</td></tr>
          <tr><td className="font-semibold">Edit</td><td>Abre Edit Finding.</td></tr>
          <tr><td className="font-semibold">Status actions</td><td>Start Monitoring, Start Treatment, Mark As Treated, Mark As Externally Treated; en rojo los que cierran sin tratar y Discard. Cada uno pide confirmación.</td></tr>
          <tr><td className="font-semibold">Delete</td><td>Separado al final, en rojo. Se deshace desde el aviso.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States" nota="Cada uno abierto en su story: Open, Treated y Without full record.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={600}>
          <tr><td className="font-semibold">Open</td><td>Un finding activo: todo habilitado, View full record primero.</td><td>Open</td></tr>
          <tr><td className="font-semibold">Start Treatment disabled</td><td>Un finding ya tratado o cerrado: el tratamiento sólo arranca sobre algo abierto.</td><td>Treated</td></tr>
          <tr><td className="font-semibold">Without full record</td><td>Sin \`onVer\`: el menú arranca en Edit.</td><td>Without full record</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: a => <Menu {...a} />,
  play: async c => {
    await abrir(c);
    await esperar(/View full record/)(c);
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'Treated'
  },
  render: a => <Menu {...a} />,
  play: async c => {
    await abrir(c);
    await esperar(/Start Treatment/)(c);
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Without full record',
  args: {
    verRegistro: false
  },
  render: a => <Menu {...a} />,
  play: async c => {
    await abrir(c);
    await esperar(/Start Monitoring/)(c);
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Trigger</td><td>28px, ícono de 14px, <Token nombre="ink-muted" />; fondo <Token nombre="surface-muted" /> al pasar el mouse.</td></tr>
          <tr><td className="font-semibold">Menu</td><td>248px, alineado al borde derecho del trigger. Ítems con ícono de 16px.</td></tr>
          <tr><td className="font-semibold">Groups</td><td>View full record y Edit; los estados; Delete. Una línea separa cada grupo.</td></tr>
          <tr><td className="font-semibold">Destructive</td><td><Token nombre="field-error" />: Mark As No Treat. Needed, Patient Declined, Clinic Declined, Discard y Delete.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}}})))()}k();export{w as Open,S as Parts,x as Playground,D as Specs,C as States,T as Treated,E as WithoutFullRecord,O as __namedExportsOrder,b as default};
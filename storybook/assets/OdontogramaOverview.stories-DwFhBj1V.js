import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-D2sSwnPH.js";import{n as a,r as o,t as s}from"./OdontogramaOverview-Bx8B9ppd.js";import{g as c,x as l}from"./clinical-mode-BfZPlioH.js";import{c as u,d,i as f,l as p,t as m,u as h}from"./kit-CWUgB5-0.js";function g({condicion:e,ampliado:t=!1}){let[n,i]=(0,_.useState)(t);return(0,v.jsx)(`div`,{className:`bg-page-background min-h-[800px] p-6`,children:(0,v.jsx)(`div`,{className:n?`max-w-[1344px]`:`max-w-[968px]`,children:(0,v.jsx)(a,{ultima:y[e],ampliado:n,onAmpliar:()=>i(e=>!e),onDetalle:t=>r.info(`Opens ${t}${t===`DentAssmt`&&y[e].pieza?` with tooth ${y[e].pieza} selected`:``}.`)})})})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{_=t(),i(),d(),l(),o(),v=n(),y={"Caries · tooth 3 (frame)":c,"Charted now · tooth 13":{condicion:`Resin-based composite crown, anterior`,actualizado:`18/10/2026`,pieza:13,examen:`Dental Assessment`},"Without a tooth":{condicion:`Mucocele`,actualizado:`21/06/2026`,pieza:null,examen:`Intraoral`},"Long name":{condicion:`Periodontal scaling and root planing – four or more teeth per quadrant`,actualizado:`18/10/2026`,pieza:19,examen:`Periodontal`}},b={title:`Components/Clinical/Overview chart`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:820},description:{component:[`El chart del Overview de Clinical Mode: **el mismo odontograma de DentAssmt, de sólo lectura**, con lo mismo cargado. No tiene controles ni se puede tocar: es para mirar el estado del paciente al entrar. La pieza de la **última condición** queda resaltada (borde azul y el número en una pastilla) y el aviso de abajo dice cuál es y cuándo se cargó.`,``,`**Cómo se usa:** la última condición es la del frame (la caries de la pieza 3) hasta que se carga otra con **Add Condition** en cualquier examen; ahí pasa a ser esa. **Show details** lleva al examen donde se cargó; si es DentAssmt, abre con la pieza ya elegida. El botón de arriba amplía el chart y esconde Treatment Plan y la Problem List.`,``,`**Probalo:** en *Playground* elegí la condición y ampliá el chart desde *Controls*; tocá *Show details* para ver adónde iría. *Parts* dice qué hace cada parte, *States* lista cada caso (cada uno es su historia) y *Specs* trae medidas y colores.`].join(`
`)}}},args:{expanded:!1,condition:`Caries · tooth 3 (frame)`},argTypes:{expanded:{control:`boolean`,description:`Ampliado: en la pantalla esconde Treatment Plan y la Problem List; el chart va de 900 a 1100px, centrado.`},condition:{control:`inline-radio`,options:Object.keys(y),description:`La última condición: la del frame, una recién cargada, una sin pieza (no resalta nada) o una con nombre largo (se corta).`}}},x={controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:820}}},S={render:({expanded:e,condition:t})=>(0,v.jsx)(g,{condicion:t,ampliado:e},`${e}-${t}`)},C={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsxs)(f,{children:[(0,v.jsx)(m,{titulo:`Parts`,nota:`Reemplaza al odontograma propio que tenía el Overview (Odontogram, que sigue en el Builder): el chart es el de DentAssmt, así se ve lo mismo en los dos lados.`,children:(0,v.jsx)(p,{partes:[[`Canvas`,`Fondo punteado del frame, en una card de la página. El chart scrollea a lo ancho adentro si no entra.`,`OdontogramaOverview`],[`Dental chart`,`La grilla de react-advanced-odontogram con readOnly: sin la ayuda "Click a tooth…", sin Status / Plan y sin los botones de vista. Lo cargado es lo de DentAssmt.`,`OdontogramaLectura`],[`Last condition tooth`,`Borde azul y fondo celeste en sus dos celdas, y el número en una pastilla azul. Sin pieza no se resalta nada.`,`OdontogramaLectura pieza`],[`Expand`,`Amplía el chart y esconde Treatment Plan y la Problem List; vuelve con el mismo botón (aria-pressed).`,`OdontogramaOverview`],[`Last Condition`,`Qué se cargó último y cuándo (Last Update). El nombre se corta en una línea; el completo va en el tooltip.`,`OdontogramaOverview`],[`Show details`,`Lleva al examen donde se cargó la condición; en DentAssmt, con la pieza elegida. Sin examen con pestaña no aparece.`,`OdontogramaOverview onDetalle`]]})}),(0,v.jsx)(m,{titulo:`Where the last condition comes from`,children:(0,v.jsxs)(u,{encabezado:[`Case`,`Last Condition`,`Tooth`,`Show details`],minimo:640,arriba:!0,children:[(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Al entrar`}),(0,v.jsx)(`td`,{children:`La del frame: Caries, 20/06/2025 (Problem List p5).`}),(0,v.jsx)(`td`,{children:`3, con la caries oclusal pintada.`}),(0,v.jsx)(`td`,{children:`DentAssmt con la 3 elegida.`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Add Condition en un examen`}),(0,v.jsx)(`td`,{children:`El procedimiento elegido y la fecha de hoy.`}),(0,v.jsx)(`td`,{children:`La del drawer; sin pieza, ninguna.`}),(0,v.jsx)(`td`,{children:`Ese examen.`})]}),(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:`Add Procedure`}),(0,v.jsx)(`td`,{children:`No cambia: es algo planeado, no una condición.`}),(0,v.jsx)(`td`,{children:`—`}),(0,v.jsx)(`td`,{children:`—`})]})]})})]})},w=[[`Default`,`Al entrar a Clinical Mode: la caries de la pieza 3.`,`Default`],[`Charted now`,`Después de Add Condition en DentAssmt sobre la 13: cambia el aviso y la pieza resaltada.`,`ChartedNow`],[`Without a tooth`,`Condición de una zona (Mucocele, Intraoral): no se resalta ninguna pieza; Show details va a Intra Oral.`,`WithoutATooth`],[`Long name`,`El nombre se corta en una línea para no tapar los números de abajo.`,`LongName`],[`Expanded`,`El chart ampliado, con el botón presionado.`,`Expanded`],[`Chart only`,`La grilla de sólo lectura sola, con la pieza 3 resaltada.`,`ChartOnly`]],T={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsx)(f,{children:(0,v.jsx)(m,{titulo:`States`,nota:`Cada estado es su propia historia, en su iframe: la librería del odontograma no puede estar dos veces en la misma página. Abrilas desde la barra lateral de Storybook.`,children:(0,v.jsx)(u,{encabezado:[`State`,`When`,`Story`],minimo:640,children:w.map(([e,t,n])=>(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,v.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,v.jsx)(`td`,{className:`font-mono text-[12px] text-ink-muted`,children:n})]},e))})})})},E={parameters:x,render:()=>(0,v.jsx)(g,{condicion:`Caries · tooth 3 (frame)`})},D={parameters:x,render:()=>(0,v.jsx)(g,{condicion:`Charted now · tooth 13`})},O={parameters:x,render:()=>(0,v.jsx)(g,{condicion:`Without a tooth`})},k={parameters:x,render:()=>(0,v.jsx)(g,{condicion:`Long name`})},A={parameters:x,render:()=>(0,v.jsx)(g,{condicion:`Caries · tooth 3 (frame)`,ampliado:!0})},j={parameters:x,render:()=>(0,v.jsx)(`div`,{className:`bg-page-background p-6`,children:(0,v.jsx)(`div`,{className:`max-w-[936px]`,children:(0,v.jsx)(s,{pieza:3})})})},M=({a:e,b:t})=>(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`td`,{className:`font-semibold`,children:e}),(0,v.jsx)(`td`,{children:t})]}),N={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsxs)(f,{children:[(0,v.jsx)(m,{titulo:`Specs`,children:(0,v.jsxs)(u,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,v.jsx)(M,{a:`Card`,b:`Card de la página (rounded-lg, shadow-panel, sin borde). Padding 16px y 64px abajo, para el aviso.`}),(0,v.jsx)(M,{a:`Canvas`,b:`Puntos de 1px cada 16px sobre el fondo de la página.`}),(0,v.jsx)(M,{a:`Chart`,b:`Mínimo 720px (debajo scrollea adentro de la card); ampliado, de 900 a 1100px y centrado.`}),(0,v.jsx)(M,{a:`Expand`,b:`32×32, radio 8, borde line; arriba a la derecha a 12px.`}),(0,v.jsx)(M,{a:`Last Condition`,b:`Abajo a la derecha a 12px, hasta 600px; en el celular, todo el ancho y en dos líneas. Padding 12×8, radio 8. Título 13px Semibold, fecha 11px.`}),(0,v.jsx)(M,{a:`Show details`,b:`11px Semibold, padding 10×4, radio 6.`}),(0,v.jsx)(M,{a:`Last condition tooth`,b:`Las dos celdas de la pieza con borde y fondo; el número en una pastilla de 36px de ancho mínimo, radio 6.`}),(0,v.jsx)(M,{a:`Caries`,b:`Rojo, también en las caras oclusal, mesial y distal (antes quedaban en el negro de la librería).`})]})}),(0,v.jsx)(m,{titulo:`Colors`,children:(0,v.jsxs)(u,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,v.jsx)(M,{a:`Last condition tooth, border and number`,b:(0,v.jsx)(h,{nombre:`dash-blue`})}),(0,v.jsx)(M,{a:`Last condition tooth, fill`,b:(0,v.jsx)(h,{nombre:`dash-count-bg`})}),(0,v.jsx)(M,{a:`Warning icon`,b:(0,v.jsx)(h,{nombre:`warn-fg`})}),(0,v.jsx)(M,{a:`Show details`,b:(0,v.jsx)(h,{nombre:`dash-blue`})}),(0,v.jsx)(M,{a:`Date`,b:(0,v.jsx)(h,{nombre:`ink-muted`})})]})}),(0,v.jsx)(m,{titulo:`Rules`,children:(0,v.jsxs)(u,{encabezado:[`Rule`,`Why`],minimo:560,children:[(0,v.jsx)(M,{a:`Sólo lectura`,b:`El Overview es para mirar; se carga en DentAssmt o con Add Condition. Tocar una pieza no hace nada.`}),(0,v.jsx)(M,{a:`Un solo odontograma`,b:`DentAssmt y el Overview muestran lo mismo: la librería borra su estado al salir, así que se guarda y se vuelve a cargar (estadoOdontograma).`}),(0,v.jsx)(M,{a:`Uno por página`,b:`La librería busca sus nodos por id: nunca dos charts montados a la vez.`})]})})]})},P=[`Playground`,`Parts`,`States`,`Default`,`ChartedNow`,`WithoutATooth`,`LongName`,`Expanded`,`ChartOnly`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: ({
    expanded,
    condition
  }) => <Demo key={\`\${expanded}-\${condition}\`} condicion={condition} ampliado={expanded} />
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
      <Bloque titulo="Parts" nota="Reemplaza al odontograma propio que tenía el Overview (Odontogram, que sigue en el Builder): el chart es el de DentAssmt, así se ve lo mismo en los dos lados.">
        <TablaPartes partes={[['Canvas', 'Fondo punteado del frame, en una card de la página. El chart scrollea a lo ancho adentro si no entra.', 'OdontogramaOverview'], ['Dental chart', 'La grilla de react-advanced-odontogram con readOnly: sin la ayuda "Click a tooth…", sin Status / Plan y sin los botones de vista. Lo cargado es lo de DentAssmt.', 'OdontogramaLectura'], ['Last condition tooth', 'Borde azul y fondo celeste en sus dos celdas, y el número en una pastilla azul. Sin pieza no se resalta nada.', 'OdontogramaLectura pieza'], ['Expand', 'Amplía el chart y esconde Treatment Plan y la Problem List; vuelve con el mismo botón (aria-pressed).', 'OdontogramaOverview'], ['Last Condition', 'Qué se cargó último y cuándo (Last Update). El nombre se corta en una línea; el completo va en el tooltip.', 'OdontogramaOverview'], ['Show details', 'Lleva al examen donde se cargó la condición; en DentAssmt, con la pieza elegida. Sin examen con pestaña no aparece.', 'OdontogramaOverview onDetalle']]} />
      </Bloque>
      <Bloque titulo="Where the last condition comes from">
        <Tabla encabezado={['Case', 'Last Condition', 'Tooth', 'Show details']} minimo={640} arriba>
          <tr><td className="font-semibold">Al entrar</td><td>La del frame: Caries, 20/06/2025 (Problem List p5).</td><td>3, con la caries oclusal pintada.</td><td>DentAssmt con la 3 elegida.</td></tr>
          <tr><td className="font-semibold">Add Condition en un examen</td><td>El procedimiento elegido y la fecha de hoy.</td><td>La del drawer; sin pieza, ninguna.</td><td>Ese examen.</td></tr>
          <tr><td className="font-semibold">Add Procedure</td><td>No cambia: es algo planeado, no una condición.</td><td>—</td><td>—</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="States" nota="Cada estado es su propia historia, en su iframe: la librería del odontograma no puede estar dos veces en la misma página. Abrilas desde la barra lateral de Storybook.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={640}>
          {ESTADOS.map(([estado, cuando, historia]) => <tr key={estado}>
              <td className="font-semibold whitespace-nowrap">{estado}</td>
              <td className="text-ink-medium">{cuando}</td>
              <td className="font-mono text-[12px] text-ink-muted">{historia}</td>
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo condicion="Caries · tooth 3 (frame)" />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo condicion="Charted now · tooth 13" />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo condicion="Without a tooth" />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo condicion="Long name" />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <Demo condicion="Caries · tooth 3 (frame)" ampliado />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <div className="bg-page-background p-6"><div className="max-w-[936px]"><OdontogramaLectura pieza={3} /></div></div>
}`,...j.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <Fila a="Card" b="Card de la página (rounded-lg, shadow-panel, sin borde). Padding 16px y 64px abajo, para el aviso." />
          <Fila a="Canvas" b="Puntos de 1px cada 16px sobre el fondo de la página." />
          <Fila a="Chart" b="Mínimo 720px (debajo scrollea adentro de la card); ampliado, de 900 a 1100px y centrado." />
          <Fila a="Expand" b="32×32, radio 8, borde line; arriba a la derecha a 12px." />
          <Fila a="Last Condition" b="Abajo a la derecha a 12px, hasta 600px; en el celular, todo el ancho y en dos líneas. Padding 12×8, radio 8. Título 13px Semibold, fecha 11px." />
          <Fila a="Show details" b="11px Semibold, padding 10×4, radio 6." />
          <Fila a="Last condition tooth" b="Las dos celdas de la pieza con borde y fondo; el número en una pastilla de 36px de ancho mínimo, radio 6." />
          <Fila a="Caries" b="Rojo, también en las caras oclusal, mesial y distal (antes quedaban en el negro de la librería)." />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <Fila a="Last condition tooth, border and number" b={<Token nombre="dash-blue" />} />
          <Fila a="Last condition tooth, fill" b={<Token nombre="dash-count-bg" />} />
          <Fila a="Warning icon" b={<Token nombre="warn-fg" />} />
          <Fila a="Show details" b={<Token nombre="dash-blue" />} />
          <Fila a="Date" b={<Token nombre="ink-muted" />} />
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <Tabla encabezado={['Rule', 'Why']} minimo={560}>
          <Fila a="Sólo lectura" b="El Overview es para mirar; se carga en DentAssmt o con Add Condition. Tocar una pieza no hace nada." />
          <Fila a="Un solo odontograma" b="DentAssmt y el Overview muestran lo mismo: la librería borra su estado al salir, así que se guarda y se vuelve a cargar (estadoOdontograma)." />
          <Fila a="Uno por página" b="La librería busca sus nodos por id: nunca dos charts montados a la vez." />
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}}})))()}F();export{j as ChartOnly,D as ChartedNow,E as Default,A as Expanded,k as LongName,C as Parts,S as Playground,N as Specs,T as States,O as WithoutATooth,P as __namedExportsOrder,b as default};
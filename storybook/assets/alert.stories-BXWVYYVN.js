import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{F as n,I as r,L as i}from"./iframe-KYWqFGm_.js";import{c as a,i as o,l as s,m as c,p as l,s as u,t as d}from"./kit-VhBMbBcY.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{i(),s(),l(),f=t(),p=Object.keys(n),m={info:`Algo para saber, sin acción: una verificación en curso.`,success:`Salió bien: se guardó, se envió.`,warning:`Hay que tenerlo en cuenta: acceso limitado, un dato que falta.`,danger:`Algo falló o se bloqueó: no se pudo guardar.`},h={title:`Elements/Alert`,component:r,parameters:{layout:`padded`,docs:{description:{component:["El aviso de la app (`@/components/ui/alert`): un mensaje dentro de la pantalla, con ícono, título y texto, en los colores de los estados. Por ejemplo, *Limited access to this treatment case* en Treatment Plan. Para algo que pasó y se va solo, el toast (`aviso`).",``,`**Probalo:** en *Playground* cambiá tono, título y texto desde *Controls*.`].join(`
`)}}},args:{tone:`warning`,title:`Limited access to this treatment case`,children:`You do not have permission to update treatment plans for this location.`},argTypes:{tone:{control:`inline-radio`,options:p,description:`Color según lo que dice.`},title:{control:`text`,description:`Qué pasa, en una línea.`},children:{control:`text`,description:`El detalle o qué hacer. Vacío, no se muestra.`},className:{table:{disable:!0}}}},g={},_={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(o,{children:(0,f.jsxs)(`div`,{className:`flex max-w-[640px] flex-col gap-3`,children:[p.map(e=>(0,f.jsx)(r,{tone:e,title:e[0].toUpperCase()+e.slice(1),children:m[e]},e)),(0,f.jsx)(r,{tone:`info`,title:`Only a title, no detail`})]})})},v={parameters:{controls:{disable:!0}},render:()=>(0,f.jsx)(o,{children:(0,f.jsx)(d,{titulo:`Colors`,nota:`Tokens de cada tono, de alert.tsx y src/index.css.`,children:(0,f.jsx)(u,{encabezado:[`Tone`,`Fill`,`Border`,`Title and icon`],minimo:560,children:p.map(e=>{let t=c(`border ${n[e].caja} ${n[e].color}`);return(0,f.jsxs)(`tr`,{children:[(0,f.jsx)(`td`,{className:`font-semibold capitalize`,children:e}),(0,f.jsx)(`td`,{children:(0,f.jsx)(a,{nombre:t.fondo})}),(0,f.jsx)(`td`,{children:(0,f.jsx)(a,{nombre:t.borde})}),(0,f.jsx)(`td`,{children:(0,f.jsx)(a,{nombre:t.texto})})]},e)})})})})},y=[`Playground`,`Tones`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <div className="flex max-w-[640px] flex-col gap-3">
        {TONOS.map(t => <Alert key={t} tone={t} title={t[0]!.toUpperCase() + t.slice(1)}>{USO[t]}</Alert>)}
        <Alert tone="info" title="Only a title, no detail" />
      </div>
    </Lienzo>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Colors" nota="Tokens de cada tono, de alert.tsx y src/index.css.">
        <Tabla encabezado={['Tone', 'Fill', 'Border', 'Title and icon']} minimo={560}>
          {TONOS.map(t => {
          const k = tokensDe(\`border \${ALERT_TONES[t].caja} \${ALERT_TONES[t].color}\`);
          return <tr key={t}>
                <td className="font-semibold capitalize">{t}</td>
                <td><Token nombre={k.fondo} /></td>
                <td><Token nombre={k.borde} /></td>
                <td><Token nombre={k.texto} /></td>
              </tr>;
        })}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...v.parameters?.docs?.source}}}})))()}b();export{g as Playground,v as Specs,_ as Tones,y as __namedExportsOrder,h as default};
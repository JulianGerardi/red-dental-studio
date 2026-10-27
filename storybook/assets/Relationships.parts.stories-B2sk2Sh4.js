import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{d as n,r}from"./kit-CWUgB5-0.js";import{a as i,n as a}from"./AddRelationshipDrawer-8BAlMZai.js";import{a as o,i as s,o as c,r as l}from"./EditRelationshipModal-CrgyGbcV.js";import{i as u,n as d,o as f,r as p,t as m}from"./Relationships-Bf3S27WM.js";var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{c(),i(),n(),f(),h=t(),g={title:`Pages/Parts/Relationships`,parameters:{layout:`padded`}},_=()=>{},v={layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:420}}},y={render:()=>(0,h.jsx)(`div`,{className:`w-[640px]`,children:(0,h.jsx)(p,{p:u[0],onEdit:_,onArchive:_})})},b={render:()=>(0,h.jsx)(`div`,{className:`w-[640px]`,children:(0,h.jsx)(p,{p:u[2],onReactivate:_})})},x={render:()=>(0,h.jsx)(`div`,{className:`w-[640px]`,children:(0,h.jsx)(p,{p:m[0]})})},S={render:()=>(0,h.jsx)(`div`,{className:`h-40`,children:(0,h.jsx)(d,{nombre:`Jessica Miller`,onEdit:_,onArchive:_})})},C={name:`Row menu — open`,render:()=>(0,h.jsx)(r,{selector:`button`,estado:`click`,className:`h-40`,children:(0,h.jsx)(d,{nombre:`Jessica Miller`,onEdit:_,onArchive:_})})},w={name:`Row menu — archived`,render:()=>(0,h.jsx)(r,{selector:`button`,estado:`click`,className:`h-32`,children:(0,h.jsx)(d,{nombre:`Michael Miller`,archivada:!0,onReactivate:_})})},T={name:`Archive — guardian`,parameters:v,render:()=>(0,h.jsx)(l,{persona:`Jessica Miller`,paciente:`John Smith`,esGuardian:!0,ultimaDeGuardian:!1,onConfirm:_,onCancel:_})},E={name:`Archive — last guardian relationship`,parameters:v,render:()=>(0,h.jsx)(l,{persona:`Jessica Miller`,paciente:`John Smith`,esGuardian:!0,ultimaDeGuardian:!0,onConfirm:_,onCancel:_})},D={name:`Archive — guarantor only`,parameters:v,render:()=>(0,h.jsx)(l,{persona:`Robert Miller`,paciente:`John Smith`,esGuardian:!1,ultimaDeGuardian:!1,onConfirm:_,onCancel:_})},O={name:`Remove Guardian access`,parameters:v,render:()=>(0,h.jsx)(o,{persona:`Michael Miller`,paciente:`John Smith`,ultimaDeGuardian:!0,onConfirm:_,onCancel:_})},k={name:`Reactivate relationship`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:640}}},render:()=>(0,h.jsx)(s,{relacion:{persona:a[0],roles:[`Legal contact`],vinculo:`Father`,archivadaEl:`Sep 30, 2026`,esGuardian:!0,sinOtraGuardian:!0},paciente:`John Smith`,onConfirm:_,onClose:_})},A=[`RelationCard`,`ArchivedCard`,`HouseholdCard`,`RowMenu`,`RowMenuOpen`,`RowMenuArchived`,`ArchiveDialog`,`ArchiveDialogLastGuardian`,`ArchiveDialogGuarantorOnly`,`RemoveGuardian`,`Reactivate`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={salir} onArchive={salir} /></div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[2]} onReactivate={salir} /></div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onArchive={salir} /></div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Row menu — open',
  render: () => <Forzar selector="button" estado="click" className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onArchive={salir} /></Forzar>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Row menu — archived',
  render: () => <Forzar selector="button" estado="click" className="h-32"><MenuAcciones nombre="Michael Miller" archivada onReactivate={salir} /></Forzar>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Archive — guardian',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Jessica Miller" paciente="John Smith" esGuardian ultimaDeGuardian={false} onConfirm={salir} onCancel={salir} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Archive — last guardian relationship',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Jessica Miller" paciente="John Smith" esGuardian ultimaDeGuardian onConfirm={salir} onCancel={salir} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Archive — guarantor only',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Robert Miller" paciente="John Smith" esGuardian={false} ultimaDeGuardian={false} onConfirm={salir} onCancel={salir} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Remove Guardian access',
  parameters: emergente,
  render: () => <RemoveGuardianDialog persona="Michael Miller" paciente="John Smith" ultimaDeGuardian onConfirm={salir} onCancel={salir} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Reactivate relationship',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 640
      }
    }
  },
  render: () => <ReactivateRelationshipDrawer relacion={{
    persona: DIRECTORIO[0]!,
    roles: ['Legal contact'],
    vinculo: 'Father',
    archivadaEl: 'Sep 30, 2026',
    esGuardian: true,
    sinOtraGuardian: true
  }} paciente="John Smith" onConfirm={salir} onClose={salir} />
}`,...k.parameters?.docs?.source}}}})))()}j();export{T as ArchiveDialog,D as ArchiveDialogGuarantorOnly,E as ArchiveDialogLastGuardian,b as ArchivedCard,x as HouseholdCard,k as Reactivate,y as RelationCard,O as RemoveGuardian,S as RowMenu,w as RowMenuArchived,C as RowMenuOpen,A as __namedExportsOrder,g as default};
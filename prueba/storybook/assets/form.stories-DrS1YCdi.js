import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,h as i,l as a,m as o,n as s,o as c,p as l,r as u,s as d,t as f,u as p,v as m,x as h,y as g}from"./form-7qv2mwLi.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{h(),_=t(),v={title:`Components/Patients/Form layout`,parameters:{layout:`padded`},decorators:[e=>(0,_.jsx)(`div`,{className:`w-[360px]`,children:(0,_.jsx)(e,{})})]},y={render:()=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsx)(u,{label:`Start date`}),(0,_.jsx)(a,{})]})},b={render:()=>(0,_.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,_.jsx)(d,{required:!0,children:`Required label`}),(0,_.jsx)(c,{children:`Help text under the field.`}),(0,_.jsx)(n,{children:`This field is required.`})]})},x={render:()=>(0,_.jsxs)(i,{title:`General`,children:[(0,_.jsx)(m,{label:`Name`,placeholder:`Name`}),(0,_.jsx)(m,{label:`Last name`,placeholder:`Last name`})]})},S={render:()=>(0,_.jsx)(r,{onCancel:()=>{},onSave:()=>{}})},C={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},render:()=>(0,_.jsx)(p,{title:`New allergy`,onClose:()=>{},footer:(0,_.jsx)(r,{onCancel:()=>{},onSave:()=>{}}),children:(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsx)(o,{label:`Allergy`,options:[`Penicillin`,`Latex`]}),(0,_.jsx)(m,{label:`Reaction`,placeholder:`Describe the reaction`})]})})},w={render:()=>(0,_.jsx)(s,{value:`(+1) United States`,onChange:()=>{}})},T={render:()=>(0,_.jsx)(f,{title:`Contact information`,required:!0,summary:`+1 (324) 359-6750`,children:(0,_.jsx)(m,{label:`Area code`,value:`324`})})},E={render:()=>(0,_.jsx)(f,{title:`Contact information`,required:!0,summary:`Not loaded yet`,defaultOpen:!0,children:(0,_.jsx)(m,{label:`Area code`,placeholder:`555`})})},D={render:()=>(0,_.jsx)(f,{title:`Contact information`,required:!0,summary:`Complete the phone number.`,error:!0,children:(0,_.jsx)(m,{label:`Area code`,placeholder:`555`,error:`Complete the phone number.`})})},O={render:()=>(0,_.jsx)(l,{nombre:`Jessica Miller`,subtitulo:`Contact`,chips:g(`05/14/1982`,`jessica.miller@gmail.com`)})},k={render:()=>(0,_.jsx)(o,{label:`Carrier name`,value:`zzz`,options:[`Aetna`,`Cigna`],emptyText:`Carrier not found.`,onChange:()=>{}})},A=[`CalendarDateAndLinkPerson`,`LabelAndError`,`Section`,`Footer`,`Modal`,`CountryCode`,`CollapsibleClosed`,`CollapsibleOpen`,`CollapsibleWithError`,`PersonRow`,`SearchEmpty`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <DateField label="Start date" />
      <LinkPersonCheckbox />
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-1">
      <FieldLabel required>Required label</FieldLabel>
      <FieldHint>Help text under the field.</FieldHint>
      <FieldError>This field is required.</FieldError>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <SectionCard title="General">
      <TextField label="Name" placeholder="Name" />
      <TextField label="Last name" placeholder="Last name" />
    </SectionCard>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <FormFooter onCancel={() => {}} onSave={() => {}} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 620
      }
    }
  },
  render: () => <ModalShell title="New allergy" onClose={() => {}} footer={<FormFooter onCancel={() => {}} onSave={() => {}} />}>
      <div className="flex flex-col gap-4">
        <SearchField label="Allergy" options={['Penicillin', 'Latex']} />
        <TextField label="Reaction" placeholder="Describe the reaction" />
      </div>
    </ModalShell>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <CountryCodeField value="(+1) United States" onChange={() => {}} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <CollapsibleFields title="Contact information" required summary="+1 (324) 359-6750"><TextField label="Area code" value="324" /></CollapsibleFields>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <CollapsibleFields title="Contact information" required summary="Not loaded yet" defaultOpen><TextField label="Area code" placeholder="555" /></CollapsibleFields>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <CollapsibleFields title="Contact information" required summary="Complete the phone number." error><TextField label="Area code" placeholder="555" error="Complete the phone number." /></CollapsibleFields>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <PersonaFila nombre="Jessica Miller" subtitulo="Contact" chips={chipsPersona('05/14/1982', 'jessica.miller@gmail.com')} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <SearchField label="Carrier name" value="zzz" options={['Aetna', 'Cigna']} emptyText="Carrier not found." onChange={() => {}} />
}`,...k.parameters?.docs?.source}}}})))()}j();export{y as CalendarDateAndLinkPerson,T as CollapsibleClosed,E as CollapsibleOpen,D as CollapsibleWithError,w as CountryCode,S as Footer,b as LabelAndError,C as Modal,O as PersonRow,k as SearchEmpty,x as Section,A as __namedExportsOrder,v as default};
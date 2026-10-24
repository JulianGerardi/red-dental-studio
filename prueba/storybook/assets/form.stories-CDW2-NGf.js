import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_ as n,a as r,c as i,d as a,f as o,h as s,i as c,o as l,r as u,s as d,t as f}from"./form-ZWKLFU75.js";var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{n(),p=t(),m={title:`Components/Patients/Form layout`,parameters:{layout:`padded`},decorators:[e=>(0,p.jsx)(`div`,{className:`w-[360px]`,children:(0,p.jsx)(e,{})})]},h={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,p.jsx)(f,{label:`Start date`}),(0,p.jsx)(d,{})]})},g={render:()=>(0,p.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,p.jsx)(r,{required:!0,children:`Required label`}),(0,p.jsx)(c,{children:`Help text under the field.`}),(0,p.jsx)(u,{children:`This field is required.`})]})},_={render:()=>(0,p.jsxs)(o,{title:`General`,children:[(0,p.jsx)(s,{label:`Name`,placeholder:`Name`}),(0,p.jsx)(s,{label:`Last name`,placeholder:`Last name`})]})},v={render:()=>(0,p.jsx)(l,{onCancel:()=>{},onSave:()=>{}})},y={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},render:()=>(0,p.jsx)(i,{title:`New Allergy`,onClose:()=>{},footer:(0,p.jsx)(l,{onCancel:()=>{},onSave:()=>{}}),children:(0,p.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,p.jsx)(a,{label:`Allergy`,options:[`Penicillin`,`Latex`]}),(0,p.jsx)(s,{label:`Reaction`,placeholder:`Describe the reaction`})]})})},b=[`CalendarDateAndLinkPerson`,`LabelAndError`,`Section`,`Footer`,`Modal`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <DateField label="Start date" />
      <LinkPersonCheckbox />
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-1">
      <FieldLabel required>Required label</FieldLabel>
      <FieldHint>Help text under the field.</FieldHint>
      <FieldError>This field is required.</FieldError>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <SectionCard title="General">
      <TextField label="Name" placeholder="Name" />
      <TextField label="Last name" placeholder="Last name" />
    </SectionCard>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <FormFooter onCancel={() => {}} onSave={() => {}} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 620
      }
    }
  },
  render: () => <ModalShell title="New Allergy" onClose={() => {}} footer={<FormFooter onCancel={() => {}} onSave={() => {}} />}>
      <div className="flex flex-col gap-4">
        <SearchField label="Allergy" options={['Penicillin', 'Latex']} />
        <TextField label="Reaction" placeholder="Describe the reaction" />
      </div>
    </ModalShell>
}`,...y.parameters?.docs?.source}}}})))()}x();export{h as CalendarDateAndLinkPerson,v as Footer,g as LabelAndError,y as Modal,_ as Section,b as __namedExportsOrder,m as default};
import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,d as a,f as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g}from"./form-BKC3PGp_.js";function _(){let[e,t]=(0,v.useState)(``),[n,r]=(0,v.useState)(``),[s,l]=(0,v.useState)(``),[p,m]=(0,v.useState)(``),[g,_]=(0,v.useState)(``);return(0,y.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,y.jsx)(f,{label:`First name`,required:!0,placeholder:`Type here`,value:e,onChange:t}),(0,y.jsx)(f,{label:`Email`,placeholder:`name@clinic.com`,error:`This field is required.`}),(0,y.jsx)(a,{label:`Gender`,options:[`Female`,`Male`,`Other`],value:n,onChange:r}),(0,y.jsx)(c,{label:`Medication`,options:[`Amoxicillin`,`Ibuprofen`,`Lidocaine`],value:s,onChange:l}),(0,y.jsx)(h,{label:`Start date`}),(0,y.jsx)(u,{label:`Birthday`,value:p,onChange:m}),(0,y.jsx)(o,{label:`Notes`,placeholder:`Add notes`,value:g,onChange:_}),(0,y.jsx)(i,{label:`Send a reminder`}),(0,y.jsx)(d,{})]})}var v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{v=t(),l(),y=n(),b={title:`Components/Patients/Form fields`,parameters:{layout:`padded`},decorators:[e=>(0,y.jsx)(`div`,{className:`w-[360px]`,children:(0,y.jsx)(e,{})})]},x={render:()=>(0,y.jsx)(_,{})},S={render:()=>(0,y.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,y.jsx)(s,{required:!0,children:`Required label`}),(0,y.jsx)(p,{children:`This field is required.`})]})},C={render:()=>(0,y.jsxs)(g,{title:`General`,children:[(0,y.jsx)(f,{label:`Name`,placeholder:`Name`}),(0,y.jsx)(f,{label:`Last name`,placeholder:`Last name`})]})},w={render:()=>(0,y.jsx)(r,{onCancel:()=>{},onSave:()=>{}})},T={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620}}},render:()=>(0,y.jsx)(m,{title:`New Allergy`,onClose:()=>{},footer:(0,y.jsx)(r,{onCancel:()=>{},onSave:()=>{}}),children:(0,y.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,y.jsx)(c,{label:`Allergy`,options:[`Penicillin`,`Latex`]}),(0,y.jsx)(f,{label:`Reaction`,placeholder:`Describe the reaction`})]})})},E={render:()=>(0,y.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,y.jsx)(i,{label:`Checked`,defaultChecked:!0}),(0,y.jsx)(i,{label:`Unchecked`,defaultChecked:!1})]})},D=[`Fields`,`LabelAndError`,`Section`,`Footer`,`Modal`,`CheckboxStates`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Campos />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-1">
      <FieldLabel required>Required label</FieldLabel>
      <FieldError>This field is required.</FieldError>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <SectionCard title="General">
      <TextField label="Name" placeholder="Name" />
      <TextField label="Last name" placeholder="Last name" />
    </SectionCard>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <FormFooter onCancel={() => {}} onSave={() => {}} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <OptionCheckbox label="Checked" defaultChecked />
      <OptionCheckbox label="Unchecked" defaultChecked={false} />
    </div>
}`,...E.parameters?.docs?.source}}}})))()}O();export{E as CheckboxStates,x as Fields,w as Footer,S as LabelAndError,T as Modal,C as Section,D as __namedExportsOrder,b as default};
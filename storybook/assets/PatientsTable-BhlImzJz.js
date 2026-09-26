import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,g as r}from"./dropdown-menu-_5pBHaJx.js";import{n as i,t as a}from"./pencil-MjfcJKGT.js";import{a as o,i as s,n as c,r as l}from"./data-table-DDkIxFHO.js";import{n as u,t as d}from"./users-DciDZrSY.js";import{i as f,r as p}from"./pill-Qo___yxt.js";function m({rows:e,onRowAction:t}){return(0,h.jsx)(c,{columns:v,rows:e,rowKey:e=>e.id,rowLabel:e=>e.name,pageSize:g,itemLabel:`patients`,empty:{icon:d,title:`No patients found`,detail:`Try a different name or last name.`},rowActions:e=>(0,h.jsxs)(n,{onSelect:()=>t?.(e),children:[(0,h.jsx)(a,{className:`size-4 shrink-0`}),` Edit`]})})}var h,g,_,v;function y(){return(y=e((()=>{i(),u(),f(),r(),o(),h=t(),g=10,_={Active:`success`,Inactive:`neutral`},v=[{key:`name`,header:`Full name`,width:220,cell:e=>(0,h.jsx)(l,{name:e.name,initials:e.initials,to:`/patients/${e.id}`})},{key:`birthday`,header:`Birthday`,width:160,cell:e=>(0,h.jsx)(s,{children:e.birthday})},{key:`email`,header:`Email`,cell:e=>(0,h.jsx)(s,{children:e.email})},{key:`status`,header:`Status`,width:140,cell:e=>(0,h.jsx)(p,{tone:_[e.status],children:e.status})}],m.__docgenInfo={description:``,methods:[],displayName:`PatientsTable`,props:{rows:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  name: string
  initials: string
  birthday: string
  email: string
  status: PatientStatus
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`birthday`,value:{name:`string`,required:!0}},{key:`email`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'Active' | 'Inactive'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Inactive'`}],required:!0}}]}}],raw:`PatientRow[]`},description:``},onRowAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(row: PatientRow) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string
  name: string
  initials: string
  birthday: string
  email: string
  status: PatientStatus
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`initials`,value:{name:`string`,required:!0}},{key:`birthday`,value:{name:`string`,required:!0}},{key:`email`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`'Active' | 'Inactive'`,elements:[{name:`literal`,value:`'Active'`},{name:`literal`,value:`'Inactive'`}],required:!0}}]}},name:`row`}],return:{name:`void`}}},description:``}}}})))()}export{_ as n,y as r,m as t};
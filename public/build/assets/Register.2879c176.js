import{l as p,o as c,i as _,w as n,a,u as s,H as w,b as r,j as d,L as g,n as V,m as v}from"./app.f8b84876.js";import{_ as b}from"./GuestLayout.9e3ef101.js";import{_ as t,a as m,b as i}from"./TextInput.6e4e088d.js";import{_ as y}from"./PrimaryButton.09d1f117.js";import"./ApplicationLogo.fb8e71f3.js";import"./_plugin-vue_export-helper.cdc0426e.js";const x=["onSubmit"],k={class:"mt-4"},q={class:"mt-4"},U={class:"mt-4"},$={class:"flex items-center justify-end mt-4"},j={__name:"Register",setup(N){const e=p({first_name:"",surname:"",email:"",password:"",password_confirmation:"",terms:!1}),u=()=>{e.post(route("register"),{onFinish:()=>e.reset("password","password_confirmation")})};return(f,o)=>(c(),_(b,null,{default:n(()=>[a(s(w),{title:"Register"}),r("form",{onSubmit:v(u,["prevent"])},[r("div",null,[a(t,{for:"first_name",value:"First Name"}),a(m,{id:"first_name",type:"text",class:"mt-1 block w-full",modelValue:s(e).first_name,"onUpdate:modelValue":o[0]||(o[0]=l=>s(e).first_name=l),required:"",autofocus:"",autocomplete:"first_name"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.first_name},null,8,["message"])]),r("div",null,[a(t,{for:"surname",value:"Surname"}),a(m,{id:"surname",type:"text",class:"mt-1 block w-full",modelValue:s(e).surname,"onUpdate:modelValue":o[1]||(o[1]=l=>s(e).surname=l),required:"",autofocus:"",autocomplete:"surname"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.surname},null,8,["message"])]),r("div",k,[a(t,{for:"email",value:"Email"}),a(m,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":o[2]||(o[2]=l=>s(e).email=l),required:"",autocomplete:"username"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),r("div",q,[a(t,{for:"password",value:"Password"}),a(m,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":o[3]||(o[3]=l=>s(e).password=l),required:"",autocomplete:"new-password"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),r("div",U,[a(t,{for:"password_confirmation",value:"Confirm Password"}),a(m,{id:"password_confirmation",type:"password",class:"mt-1 block w-full",modelValue:s(e).password_confirmation,"onUpdate:modelValue":o[4]||(o[4]=l=>s(e).password_confirmation=l),required:"",autocomplete:"new-password"},null,8,["modelValue"]),a(i,{class:"mt-2",message:s(e).errors.password_confirmation},null,8,["message"])]),r("div",$,[a(s(g),{href:f.route("login"),class:"underline text-sm text-gray-600 hover:text-gray-900"},{default:n(()=>[d(" Already registered? ")]),_:1},8,["href"]),a(y,{class:V(["ml-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:n(()=>[d(" Register ")]),_:1},8,["class","disabled"])])],40,x)]),_:1}))}};export{j as default};
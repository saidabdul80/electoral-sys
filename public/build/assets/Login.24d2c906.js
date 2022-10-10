import{f as k,h as w,p as x,u as s,o as i,c as b,q as y,l as v,i as c,w as d,a,H as V,t as $,k as u,b as r,L as B,j as p,n as C,m as L}from"./app.f8b84876.js";import{_ as q}from"./GuestLayout.9e3ef101.js";import{_ as f,a as _,b as g}from"./TextInput.6e4e088d.js";import{_ as N}from"./PrimaryButton.09d1f117.js";import"./ApplicationLogo.fb8e71f3.js";import"./_plugin-vue_export-helper.cdc0426e.js";const R=["value"],S={__name:"Checkbox",props:{checked:{type:[Array,Boolean],default:!1},value:{default:null}},emits:["update:checked"],setup(l,{emit:e}){const m=l,n=k({get(){return m.checked},set(t){e("update:checked",t)}});return(t,o)=>w((i(),b("input",{type:"checkbox",value:l.value,"onUpdate:modelValue":o[0]||(o[0]=h=>y(n)?n.value=h:null),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"},null,8,R)),[[x,s(n)]])}},U={key:0,class:"mb-4 font-medium text-sm text-green-600"},F=["onSubmit"],P={class:"mt-4"},j={class:"block mt-4"},D={class:"flex items-center"},E=r("span",{class:"ml-2 text-sm text-gray-600"},"Remember me",-1),H={class:"flex items-center justify-end mt-4"},J={__name:"Login",props:{canResetPassword:Boolean,status:String},setup(l){const e=v({email:"",password:"",remember:!1}),m=()=>{e.post(route("login"),{onFinish:()=>e.reset("password")})};return(n,t)=>(i(),c(q,null,{default:d(()=>[a(s(V),{title:"Log in"}),l.status?(i(),b("div",U,$(l.status),1)):u("",!0),r("form",{onSubmit:L(m,["prevent"])},[r("div",null,[a(f,{for:"email",value:"Email"}),a(_,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":t[0]||(t[0]=o=>s(e).email=o),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(g,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),r("div",P,[a(f,{for:"password",value:"Password"}),a(_,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":t[1]||(t[1]=o=>s(e).password=o),required:"",autocomplete:"current-password"},null,8,["modelValue"]),a(g,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),r("div",j,[r("label",D,[a(S,{name:"remember",checked:s(e).remember,"onUpdate:checked":t[2]||(t[2]=o=>s(e).remember=o)},null,8,["checked"]),E])]),r("div",H,[l.canResetPassword?(i(),c(s(B),{key:0,href:n.route("password.request"),class:"underline text-sm text-gray-600 hover:text-gray-900"},{default:d(()=>[p(" Forgot your password? ")]),_:1},8,["href"])):u("",!0),a(N,{class:C(["ml-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:d(()=>[p(" Log in ")]),_:1},8,["class","disabled"])])],40,F)]),_:1}))}};export{J as default};

import{l as u,o as i,i as d,w as m,a,u as e,H as c,c as _,t as f,k as p,b as t,j as w,n as b,m as g}from"./app.d738b156.js";import{_ as y,a as k}from"./PrimaryButton.42ced91c.js";import{_ as x,a as h,b as V}from"./TextInput.5f53b811.js";import"./ApplicationLogo.c92cf6bf.js";const v=t("div",{class:"mb-4 text-sm text-gray-600"}," Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",-1),N={key:0,class:"mb-4 font-medium text-sm text-green-600"},$=["onSubmit"],B={class:"flex items-center justify-end mt-4"},j={__name:"ForgotPassword",props:{status:String},setup(o){const s=u({email:""}),r=()=>{s.post(route("password.email"))};return(F,l)=>(i(),d(y,null,{default:m(()=>[a(e(c),{title:"Forgot Password"}),v,o.status?(i(),_("div",N,f(o.status),1)):p("",!0),t("form",{onSubmit:g(r,["prevent"])},[t("div",null,[a(x,{for:"email",value:"Email"}),a(h,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(s).email,"onUpdate:modelValue":l[0]||(l[0]=n=>e(s).email=n),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(V,{class:"mt-2",message:e(s).errors.email},null,8,["message"])]),t("div",B,[a(k,{class:b({"opacity-25":e(s).processing}),disabled:e(s).processing},{default:m(()=>[w(" Email Password Reset Link ")]),_:1},8,["class","disabled"])])],40,$)]),_:1}))}};export{j as default};

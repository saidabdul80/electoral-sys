import{m as u,o as m,i as d,w as r,a,u as e,H as c,c as _,t as f,k as p,b as t,j as w,n as g,q as b}from"./app.19fa7cd2.js";import{_ as y}from"./GuestLayout.1e86fc60.js";import{_ as k}from"./InputError.380df360.js";import{_ as x}from"./InputLabel.459530f6.js";import{_ as h}from"./PrimaryButton.e5a98aba.js";import{_ as V}from"./TextInput.7535d417.js";const v=t("div",{class:"mb-4 text-sm text-gray-600"}," Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",-1),N={key:0,class:"mb-4 font-medium text-sm text-green-600"},$=["onSubmit"],B={class:"flex items-center justify-end mt-4"},H={__name:"ForgotPassword",props:{status:String},setup(o){const s=u({email:""}),i=()=>{s.post(route("password.email"))};return(F,l)=>(m(),d(y,null,{default:r(()=>[a(e(c),{title:"Forgot Password"}),v,o.status?(m(),_("div",N,f(o.status),1)):p("",!0),t("form",{onSubmit:b(i,["prevent"])},[t("div",null,[a(x,{for:"email",value:"Email"}),a(V,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(s).email,"onUpdate:modelValue":l[0]||(l[0]=n=>e(s).email=n),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(k,{class:"mt-2",message:e(s).errors.email},null,8,["message"])]),t("div",B,[a(h,{class:g({"opacity-25":e(s).processing}),disabled:e(s).processing},{default:r(()=>[w(" Email Password Reset Link ")]),_:1},8,["class","disabled"])])],40,$)]),_:1}))}};export{H as default};

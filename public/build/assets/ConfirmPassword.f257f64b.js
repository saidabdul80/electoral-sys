import{y as n,o as l,i as d,w as t,a,u as o,H as c,b as e,j as p,n as f,p as u}from"./app.daa648c9.js";import{_}from"./GuestLayout.9aa8c6e9.js";import{_ as w}from"./InputError.b4da0b1e.js";import{_ as b}from"./InputLabel.1f10ff1a.js";import{_ as h}from"./PrimaryButton.5e6d002e.js";import{_ as x}from"./TextInput.7ff1f597.js";const g=e("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),y=["onSubmit"],V={class:"flex justify-end mt-4"},F={__name:"ConfirmPassword",setup(v){const s=n({password:""}),i=()=>{s.post(route("password.confirm"),{onFinish:()=>s.reset()})};return(C,r)=>(l(),d(_,null,{default:t(()=>[a(o(c),{title:"Confirm Password"}),g,e("form",{onSubmit:u(i,["prevent"])},[e("div",null,[a(b,{for:"password",value:"Password"}),a(x,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:o(s).password,"onUpdate:modelValue":r[0]||(r[0]=m=>o(s).password=m),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"]),a(w,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),e("div",V,[a(h,{class:f(["ml-4",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:t(()=>[p(" Confirm ")]),_:1},8,["class","disabled"])])],40,y)]),_:1}))}};export{F as default};

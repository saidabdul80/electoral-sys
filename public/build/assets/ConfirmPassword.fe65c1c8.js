import{s as n,o as l,m as d,w as t,a,u as o,H as c,b as e,p,n as f,i as u}from"./app.b88998ce.js";import{_}from"./GuestLayout.5429988d.js";import{_ as w}from"./InputError.bf15a551.js";import{_ as b}from"./InputLabel.ca77997b.js";import{_ as h}from"./PrimaryButton.f7587287.js";import{_ as x}from"./TextInput.081bdec5.js";const g=e("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),V=["onSubmit"],v={class:"flex justify-end mt-4"},H={__name:"ConfirmPassword",setup(y){const s=n({password:""}),i=()=>{s.post(route("password.confirm"),{onFinish:()=>s.reset()})};return(C,r)=>(l(),d(_,null,{default:t(()=>[a(o(c),{title:"Confirm Password"}),g,e("form",{onSubmit:u(i,["prevent"])},[e("div",null,[a(b,{for:"password",value:"Password"}),a(x,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:o(s).password,"onUpdate:modelValue":r[0]||(r[0]=m=>o(s).password=m),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"]),a(w,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),e("div",v,[a(h,{class:f(["ml-4",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:t(()=>[p(" Confirm ")]),_:1},8,["class","disabled"])])],40,V)]),_:1}))}};export{H as default};

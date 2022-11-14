import{l as y,m as g,o as u,c as _,a as r,b as s,u as e,h as a,v as b,J as v,x as c,F as h,p as S,w as k,n as V,K as M,t as f,j as C}from"./app.19fa7cd2.js";import{_ as $,a as U}from"./Sidenav.d835597c.js";import{_ as A}from"./Paginate.ec181053.js";import{_ as B}from"./PrimaryButton.e5a98aba.js";const q={class:"height-100 bg-light",id:"body-pd"},T=s("div",{class:"p-3 d-flex align-items-center"},[s("i",{class:"bi bi-stack"}),s("h4",{class:"ml-3 my-0"},"SMS")],-1),j=["disabled"],F=["disabled"],N={class:"row mt-3"},D={class:"col-md-6"},L={class:"row"},O=s("div",{class:"col-md-2 mb-2"}," SMS To: ",-1),R={class:"col-md-10 mb-2"},z=s("label",null,"All Voters",-1),E=s("label",{class:"ml-2"},"All Volunteers",-1),I={class:"row mt-3"},J=s("div",{class:"col-md-2 mb-2"}," Message ",-1),K={class:"col-md-10 mb-2"},G={class:"col-md-6"},H=s("b",null,[s("label",{class:"w-100 text-center alert alert-warning"}," Sent SMS")],-1),P={class:"w-100",style:{"overflow-x":"scroll","overflow-y":"scroll",height:"60vh"}},Q={class:"table p-3"},W={class:"text-dark"},X={class:"text-secondary"},Y={class:"col-md-4 mb-2"},Z=s("label",null,"Api Token",-1),ss={class:"col-md-4 mb-2"},es=s("label",null,"webhook",-1),ts={class:"col-md-4 mb-2"},os=s("label",null,"Sender",-1),ds={__name:"Sms",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,sentMessages:Array,config:Object,contacts:Object},setup(d){const m=d,n=y({switch:"compose"}),l=g({message_to:"",message:""}),i=g({api:m.config.api,others:m.config.others,sender:m.config.sender});async function w(){const p={to:l.message_to,message:l.message};(await axios.post(route("sendsms"),p)).data.ok?(alert("congrats! messages are on their way!"),M.Inertia.reload()):alert("oh-no! something went wrong...")}return(p,t)=>(u(),_(h,null,[r($),r(U,{active:"SMS"}),s("div",q,[T,s("button",{onClick:t[0]||(t[0]=o=>e(n).switch="compose"),disabled:e(n).switch=="compose",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Compose",8,j),s("button",{onClick:t[1]||(t[1]=o=>e(n).switch="config"),disabled:e(n).switch=="config",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Configuration",8,F),a(s("div",null,[s("div",N,[s("div",D,[s("div",L,[O,s("div",R,[z,a(s("input",{"onUpdate:modelValue":t[2]||(t[2]=o=>e(l).message_to=o),value:"voters",name:"to",type:"radio"},null,512),[[v,e(l).message_to]]),E,a(s("input",{"onUpdate:modelValue":t[3]||(t[3]=o=>e(l).message_to=o),value:"volunteers",name:"to",type:"radio"},null,512),[[v,e(l).message_to]])])]),s("div",I,[J,s("div",K,[a(s("textarea",{rows:"4",style:{height:"300px"},class:"form-control",required:"","onUpdate:modelValue":t[4]||(t[4]=o=>e(l).message=o),type:"radio"},null,512),[[c,e(l).message]]),s("button",{onClick:t[5]||(t[5]=o=>w()),class:"btn btn-dark mt-3"},"Send")])])]),s("div",G,[H,s("div",P,[s("table",Q,[s("tbody",null,[(u(!0),_(h,null,S(d.sentMessages.data,(o,x)=>(u(),_("tr",{key:x},[s("td",null,[s("div",W,[s("b",null,"All "+f(o.message_to),1)]),s("div",X,f(o.message),1)])]))),128))])])]),r(A,{next:d.sentMessages.next_page_url,prev:d.sentMessages.prev_page_url},null,8,["next","prev"])])])],512),[[b,e(n).switch=="compose"]]),a(s("div",null,[s("form",null,[s("div",Y,[Z,a(s("input",{required:"","onUpdate:modelValue":t[6]||(t[6]=o=>e(i).api=o),type:"text",class:"form-control"},null,512),[[c,e(i).api]])]),s("div",ss,[es,a(s("input",{required:"","onUpdate:modelValue":t[7]||(t[7]=o=>e(i).others=o),type:"text",class:"form-control"},null,512),[[c,e(i).others]])]),s("div",ts,[os,a(s("input",{required:"","onUpdate:modelValue":t[8]||(t[8]=o=>e(i).sender=o),type:"text",class:"form-control"},null,512),[[c,e(i).sender]])]),r(B,{class:V(["ml-4",{"opacity-25":e(l).processing}]),disabled:e(l).processing},{default:k(()=>[C(" Save")]),_:1},8,["class","disabled"])])],512),[[b,e(n).switch=="config"]])])],64))}};export{ds as default};
import{l as C,o as d,c as r,a as p,b as t,u as n,h as i,v as g,F as _,m as v,p as j,s as c,q as U,w as $,n as D,t as a,j as E,k as h,G as x}from"./app.a2fa7500.js";import{_ as A,a as B}from"./Sidenav.6d27bc9b.js";import{_ as L}from"./Paginate.8b4809a4.js";import{_ as N}from"./PrimaryButton.b606e62a.js";import{S as b}from"./sweetalert2.dd67d6cf.js";const T={class:"height-100 bg-light",id:"body-pd"},q=t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"Events")],-1),G={class:"px-3"},M={class:"table table-bordered"},O=t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Organiser"),t("td",null,"State"),t("td",null,"Location"),t("td",null,"Contact"),t("td",null,"Date"),t("td",null,"Subject"),t("td",null,"Description"),t("td",null,"Guest"),t("td")])],-1),F=["onClick"],I=["onClick"],z={key:0,class:"spinner-border text-white",role:"status"},P={class:"px-3"},R={class:"row w-100"},H={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},J={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},K={class:"col-md-4 mb-2"},Q=t("label",null,"Subject",-1),W={class:"col-md-4 mb-2"},X=t("label",null,"Organiser",-1),Y={class:"col-md-4 mb-2"},Z=t("label",null,"Location",-1),tt={class:"col-md-4 mb-2"},et=t("label",null,"contact",-1),st={class:"col-md-4 mb-2"},ot=t("label",null,"States",-1),nt=t("option",{value:"0"},"-",-1),lt=["value"],it={class:"col-md-4 mb-2"},at=t("label",null,"Description",-1),dt={class:"col-md-4 mb-2"},rt=t("label",null,"Guest",-1),ct={class:"col-md-4 mb-2"},ut=t("label",{style:{visibility:"hidden"}},"Area Description",-1),mt={key:0},ft={key:1},pt={key:2,class:"spinner-border text-white h6",role:"status"},xt={__name:"Event",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,events:Array,states:Array},setup(u){const e=C({switch:"list",states:[],saving:!1,deleting:!1,form:{organiser:"",location:"",contact:"",date:"",subject:"",description:"",guest:"",state_id:"",id:""},indexNum:0});function w(l,o){e.form.organiser=l.organiser,e.form.location=l.location,e.form.contact=l.contact,e.form.date=l.date,e.form.subject=l.subject,e.form.description=l.description,e.form.guest=l.guest,e.form.state_id=l.state_id,e.form.id=l.id,e.switch="add"}function y(){e.form.organiser="",e.form.location="",e.form.contact="",e.form.date="",e.form.subject="",e.form.description="",e.form.guest="",e.form.state_id="",e.form.id="",e.switch="add"}async function k(){e.saving=!0;let o=(await axios.post(route("save_event"),e.form)).data;e.saving=!1,o?(e.form.id==""?m("Added Successfuly"):m("Updated Successfuly"),x.Inertia.reload()):m("oh-no! something went wrong...")}async function S(l){e.deleting=!0;let s=(await axios.post(route("delete_event"),{id:l})).data;e.deleting=!1,s?(m("Deleted Successfuly"),x.Inertia.reload()):m("oh-no! something went wrong...")}function m(l,o="success"){b.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:f=>{f.addEventListener("mouseenter",b.stopTimer),f.addEventListener("mouseleave",b.resumeTimer)}}).fire({icon:o,title:l})}return(l,o)=>(d(),r(_,null,[p(A),p(B,{active:""}),t("div",T,[q,t("button",{onClick:o[0]||(o[0]=s=>y()),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add"),t("button",{onClick:o[1]||(o[1]=s=>n(e).switch="list"),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"List"),i(t("div",G,[t("table",M,[O,t("tbody",null,[(d(!0),r(_,null,v(u.events.data,(s,f)=>(d(),r("tr",{key:f},[t("td",null,a(u.events.from+f),1),t("td",null,a(s.organiser),1),t("td",null,a(s.state),1),t("td",null,a(s.location),1),t("td",null,a(s.contact),1),t("td",null,a(s.date),1),t("td",null,a(s.subject),1),t("td",null,a(s.description),1),t("td",null,a(s.guest),1),t("td",null,[t("button",{onClick:V=>w(s),class:"btn btn-sm bg-primary text-white"},"Edit",8,F),t("button",{onClick:V=>S(s.id),class:"btn btn-sm ml-2 bg-danger text-white"},[E("Delete "),n(e).deleting?(d(),r("div",z)):h("",!0)],8,I)])]))),128))])]),p(L,{next:u.events.next_page_url,prev:u.events.prev_page_url},null,8,["next","prev"])],512),[[g,n(e).switch=="list"]]),i(t("div",P,[t("form",{onSubmit:o[10]||(o[10]=j(s=>k(),["prevent"]))},[t("div",R,[t("div",H,[t("div",J,[t("div",K,[Q,i(t("input",{required:"","onUpdate:modelValue":o[2]||(o[2]=s=>n(e).form.subject=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.subject]])]),t("div",W,[X,i(t("input",{required:"","onUpdate:modelValue":o[3]||(o[3]=s=>n(e).form.organiser=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.organiser]])]),t("div",Y,[Z,i(t("input",{required:"","onUpdate:modelValue":o[4]||(o[4]=s=>n(e).form.location=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.location]])]),t("div",tt,[et,i(t("input",{"onUpdate:modelValue":o[5]||(o[5]=s=>n(e).form.contact=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.contact]])]),t("div",st,[ot,i(t("select",{"onUpdate:modelValue":o[6]||(o[6]=s=>n(e).form.state_id=s),type:"text",class:"form-control"},[nt,(d(!0),r(_,null,v(u.states,s=>(d(),r("option",{key:s.id,value:s.id},a(s.name),9,lt))),128))],512),[[U,n(e).form.state_id]])]),t("div",it,[at,i(t("input",{"onUpdate:modelValue":o[7]||(o[7]=s=>n(e).form.description=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.description]])]),t("div",dt,[rt,i(t("input",{"onUpdate:modelValue":o[8]||(o[8]=s=>n(e).form.guest=s),type:"text",class:"form-control"},null,512),[[c,n(e).form.guest]])]),i(t("input",{"onUpdate:modelValue":o[9]||(o[9]=s=>n(e).form.id=s),type:"text",class:"form-control d-none"},null,512),[[c,n(e).form.id]]),t("div",ct,[ut,p(N,{class:D(["ml-4",{"opacity-25":n(e).processing}])},{default:$(()=>[n(e).form.id==""?(d(),r("span",mt,"Add")):(d(),r("span",ft,"Update")),n(e).saving?(d(),r("div",pt)):h("",!0)]),_:1},8,["class"])])])])])],32)],512),[[g,n(e).switch=="add"]])])],64))}};export{xt as default};
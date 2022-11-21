import{f as N,o as i,c as d,a as h,b as e,u as o,g as u,v as b,e as _,F as f,h as x,i as k,j as B,k as g,n as I,t as p,p as T,B as q,C as L,E as v}from"./app.920806ef.js";import{_ as M,a as F}from"./Sidenav.25cad631.js";import{_ as C}from"./Paginate.ddae6694.js";/* empty css                      */import{S as w}from"./sweetalert2.4b97bccc.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";const a=r=>(q("data-v-00f2e3d9"),r=r(),L(),r),z={class:"height-100 bg-light",id:"body-pd"},O=a(()=>e("div",{class:"p-3 d-flex align-items-center"},[e("i",{class:"bi bi-stack"}),e("h4",{class:"ml-3 my-0"},"Expenses Management ")],-1)),P={class:"float-right"},R=["disabled"],G=["disabled"],H=["disabled"],J=["disabled"],K={key:0},Q={class:"px-3"},W={class:"table table-bordered"},X=a(()=>e("td",null,"S/N",-1)),Y=a(()=>e("td",null,"Category",-1)),Z=a(()=>e("td",null,"Amount",-1)),ee=a(()=>e("td",null,"Description",-1)),te=a(()=>e("td",null,"Date",-1)),se={key:0,class:"spinner-border text-danger",role:"status"},oe=["onClick"],ne=["onClick"],ie={class:"px-3"},de={key:0,class:"p-2"},le={key:1},ae={class:"row w-100"},re={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},ce={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},ue={class:"col-md-4 mb-2"},pe=a(()=>e("label",null,"Category",-1)),me=a(()=>e("option",{value:"0"},"-",-1)),_e=["value"],ge={class:"col-md-4 mb-2"},he=a(()=>e("label",null,"Description",-1)),be={class:"col-md-4 mb-2"},fe=a(()=>e("label",null,"Amount",-1)),ve={class:"col-md-4 mb-2"},ye=a(()=>e("label",null,"Date",-1)),xe={class:"col-md-4 mb-2"},we=a(()=>e("label",{style:{visibility:"hidden"}},"Area Description",-1)),ke=["disabled"],Ce={key:0},Se={key:1},De={key:2,class:"spinner-border text-white h6",role:"status"},$e={key:1},Ue={class:"px-3"},Ve={class:"table table-bordered"},Ae=a(()=>e("thead",null,[e("tr",null,[e("td",null,"S/N"),e("td",null,"Name"),e("td",null,"Description"),e("td")])],-1)),Ee=["onClick"],Ne=["onClick"],Be={key:0,class:"spinner-border text-white",role:"status"},Ie={class:"px-3"},Te={key:0},qe={key:1},Le={class:"row w-100"},Me={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Fe={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},je={class:"col-md-4 mb-2"},ze=a(()=>e("label",null,"Name",-1)),Oe={class:"col-md-4 mb-2"},Pe=a(()=>e("label",null,"Description",-1)),Re={class:"col-md-4 mb-2"},Ge=a(()=>e("label",{style:{visibility:"hidden"}},"Description",-1)),He=["disabled"],Je={key:0},Ke={key:1},Qe={key:2,class:"spinner-border text-white h6",role:"status"},We={__name:"Expenses",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,expenses:Array,categories:Array},setup(r){const t=N({saving:!1,switch:"list",states:[],page:"expenses",deleting:!1,category:{name:"",description:""},form:{category_id:"",date:"",description:"",amount:"",id:""}});function S(l,n){t.form.category_id=l.category_id,t.form.amount=l.amount,t.form.description=l.description,t.form.date=l.date,t.form.id=l.id,t.switch="add"}function D(l,n){t.category.name=l.name,t.category.description=l.description,t.category.id=l.id,t.switch="add"}function $(){t.form.category_id="",t.form.amount="",t.form.description="",t.form.date="",t.form.id="",t.category.name="",t.category.description="",t.category.id="",t.switch="add"}async function U(){t.saving=!0;let n=(await axios.post(route("save_expense"),t.form)).data;t.saving=!1,n?(t.form.id==""?c("Added Successfuly"):c("Updated Successfuly"),v.Inertia.reload()):c("oh-no! something went wrong...")}async function V(l){t.deleting=!0;let s=(await axios.post(route("delete_expense"),{id:l})).data;t.deleting=!1,s?(c("Deleted Successfuly"),v.Inertia.reload()):c("oh-no! something went wrong...")}async function A(){t.saving=!0;let n=(await axios.post(route("save_category"),t.category)).data;t.saving=!1,n?(t.form.id==""?c("Added Successfuly"):c("Updated Successfuly"),v.Inertia.reload()):c("oh-no! something went wrong...")}async function E(l){t.deleting=!0;let s=(await axios.post(route("delete_category"),{id:l})).data;t.deleting=!1,s?(c("Deleted Successfuly"),v.Inertia.reload()):c("oh-no! something went wrong...")}function c(l,n="success"){w.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:m=>{m.addexpenseListener("mouseenter",w.stopTimer),m.addexpenseListener("mouseleave",w.resumeTimer)}}).fire({icon:n,title:l})}return(l,n)=>(i(),d(f,null,[h(M),h(F,{active:""}),e("div",z,[O,e("div",P,[e("button",{onClick:n[0]||(n[0]=s=>o(t).page="expenses"),disabled:o(t).page=="expenses",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Expenses",8,R),e("button",{onClick:n[1]||(n[1]=s=>o(t).page="categories"),disabled:o(t).page=="categories",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Categories",8,G)]),e("button",{onClick:n[2]||(n[2]=s=>$()),disabled:o(t).switch=="add",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add",8,H),e("button",{onClick:n[3]||(n[3]=s=>o(t).switch="list"),disabled:o(t).switch=="list",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"List",8,J),o(t).page=="expenses"?(i(),d("div",K,[u(e("div",Q,[e("table",W,[e("thead",null,[e("tr",null,[X,Y,Z,ee,te,e("td",null,[o(t).deleting?(i(),d("div",se)):_("",!0)])])]),e("tbody",null,[(i(!0),d(f,null,x(r.expenses.data,(s,m)=>(i(),d("tr",{key:m},[e("td",null,p(r.expenses.from+m),1),e("td",null,p(s.category),1),e("td",null,p(s.amount),1),e("td",null,p(s.description),1),e("td",null,p(s.date),1),e("td",null,[e("button",{onClick:y=>S(s),class:"btn btn-sm bg-primary text-white"},"Edit",8,oe),e("button",{onClick:y=>V(s.id),class:"btn btn-sm ml-2 bg-danger text-white"},"Delete ",8,ne)])]))),128))])]),h(C,{next:r.expenses.next_page_url,prev:r.expenses.prev_page_url},null,8,["next","prev"])],512),[[b,o(t).switch=="list"]]),u(e("div",ie,[o(t).form.id==""?(i(),d("h5",de,"New Category ")):(i(),d("h5",le,"Update Category ")),e("form",{onSubmit:n[8]||(n[8]=k(s=>U(),["prevent"]))},[e("div",ae,[e("div",re,[e("div",ce,[e("div",ue,[pe,u(e("select",{"onUpdate:modelValue":n[4]||(n[4]=s=>o(t).form.category_id=s),type:"text",class:"form-control"},[me,(i(!0),d(f,null,x(r.categories,s=>(i(),d("option",{key:s.id,value:s.id},p(s.name),9,_e))),128))],512),[[B,o(t).form.category_id]])]),e("div",ge,[he,u(e("input",{required:"","onUpdate:modelValue":n[5]||(n[5]=s=>o(t).form.description=s),type:"text",class:"form-control"},null,512),[[g,o(t).form.description]])]),e("div",be,[fe,u(e("input",{required:"","onUpdate:modelValue":n[6]||(n[6]=s=>o(t).form.amount=s),type:"text",class:"form-control"},null,512),[[g,o(t).form.amount]])]),e("div",ve,[ye,u(e("input",{required:"","onUpdate:modelValue":n[7]||(n[7]=s=>o(t).form.date=s),type:"date",class:"form-control"},null,512),[[g,o(t).form.date]])]),e("div",xe,[we,e("button",{class:I(["ml-4 d-flex btn btn-dark",{"opacity-25":o(t).processing}]),disabled:o(t).saving==!0},[o(t).form.id==""?(i(),d("span",Ce,"Add ")):(i(),d("span",Se,"Update")),o(t).saving?(i(),d("div",De)):_("",!0)],10,ke)])])])])],32)],512),[[b,o(t).switch=="add"]])])):_("",!0),o(t).page=="categories"?(i(),d("div",$e,[u(e("div",Ue,[e("table",Ve,[Ae,e("tbody",null,[(i(!0),d(f,null,x(r.categories,(s,m)=>(i(),d("tr",{key:"c-"+m},[e("td",null,p(m+1),1),e("td",null,p(s.name),1),e("td",null,p(s.description),1),e("td",null,[e("button",{onClick:y=>D(s),class:"btn btn-sm bg-primary text-white"},"Edit",8,Ee),e("button",{onClick:y=>E(s.id),class:"btn btn-sm ml-2 bg-danger text-white"},[T("Delete "),o(t).deleting?(i(),d("div",Be)):_("",!0)],8,Ne)])]))),128))])]),h(C,{next:r.expenses.next_page_url,prev:r.expenses.prev_page_url},null,8,["next","prev"])],512),[[b,o(t).switch=="list"]]),u(e("div",Ie,[o(t).category.id==""?(i(),d("h5",Te,"New Category ")):(i(),d("h5",qe,"Update Category ")),e("form",{onSubmit:n[11]||(n[11]=k(s=>A(),["prevent"]))},[e("div",Le,[e("div",Me,[e("div",Fe,[e("div",je,[ze,u(e("input",{required:"","onUpdate:modelValue":n[9]||(n[9]=s=>o(t).category.name=s),type:"text",class:"form-control"},null,512),[[g,o(t).category.name]])]),e("div",Oe,[Pe,u(e("input",{required:"","onUpdate:modelValue":n[10]||(n[10]=s=>o(t).category.description=s),type:"text",class:"form-control"},null,512),[[g,o(t).category.description]])]),e("div",Re,[Ge,e("button",{class:"ml-4 d-flex btn btn-dark",disabled:o(t).saving==!0},[o(t).category.id==""?(i(),d("span",Je,"Add")):(i(),d("span",Ke,"Update")),o(t).saving?(i(),d("div",Qe)):_("",!0)],8,He)])])])])],32)],512),[[b,o(t).switch=="add"]])])):_("",!0)])],64))}},ot=j(We,[["__scopeId","data-v-00f2e3d9"]]);export{ot as default};

import{s as U,x as S,d as C,o,c as n,a as L,u as f,w as N,F as _,H as W,b as t,h as y,y as v,z as c,t as i,j as w,A as B,B as I}from"./app.d738b156.js";import{_ as K}from"./AuthenticatedLayout.3d4d0f8b.js";import{_ as T}from"./ApplicationLogo.c92cf6bf.js";const p=u=>(B("data-v-145f5396"),u=u(),I(),u),$={style:{display:"none"},class:"py-12"},G={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},H={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},M={class:"col-md-4"},R=p(()=>t("label",null,"States",-1)),j=p(()=>t("option",{value:"0"},"-",-1)),q=["value"],z={class:"col-md-4"},O=p(()=>t("label",null,"Lga",-1)),J=["value"],P={class:"col-md-4"},Q=p(()=>t("label",null,"Ward",-1)),X=["value"],Y={class:"py-12 row w-100"},Z={class:"col-md-4"},tt={class:"badge bg-warning"},et={class:"badge bg-warning"},st={class:"label text-center w-100"},at={style:{width:"100%",margin:"14px 0px 7px 0px","border-bottom":"2px solid #fff","font-weight":"bold"},class:"float-right"},lt=p(()=>t("table",{class:"w-100"},[t("tbody",null,[t("tr",null,[t("th",{class:"text-center",width:"50%"},"Wards"),t("th",{width:"25%"},"R Voters"),t("th",{width:"25%"},"R Supporters")])])],-1)),ot=["title"],nt={width:"50%",class:"wardTag"},dt={width:"25%"},rt=["onKeyup"],it={width:"25%"},ut=["onKeyup"],_t={__name:"DataUpload",props:{states:Array},setup(u){const g=u,a=U({ward_id:0,state_id:0,lga_id:0,lgas:[],wards:[],lga_ready:!1,ward_ready:!1,collectedData:{}}),k=S(()=>g.states.reduce((s,e)=>s+e.lgas.length,0)),D=S(()=>g.states.reduce((l,s)=>l+s.lgas.reduce((e,r)=>e+r.wards.length,0),0));function A(){a.lga_ready=!1,g.states.every(l=>l.id==a.state_id?(a.lgas=l.lgas,a.lga_ready=!0,!1):!0)}function V(){a.ward_ready=!1,a.lgas.every(l=>l.id==a.lga_id?(console.log(l),a.wards=l.wards,a.ward_ready=!0,!1):!0)}function x(l){l.target.parentElement.parentElement.firstElementChild.classList.add("highlight")}function b(l){l.target.parentElement.parentElement.firstElementChild.classList.remove("highlight")}function E(l,s,e,r){let h=r.target.parentElement.parentElement.querySelectorAll("input[type=number]");a.collectedData[l.name+s.id+e.id]={state_id:l.id,lga_id:s.id,ward_id:e.id,total_registered_voters:Array.from(h)[0].value,total_registered_supporters:Array.from(h)[1].value}}return C(()=>{}),(l,s)=>(o(),n(_,null,[L(f(W),{title:"Dashboard"}),L(K,null,{default:N(()=>[t("div",$,[t("div",G,[t("div",H,[t("div",M,[R,y(t("select",{onChange:s[0]||(s[0]=e=>A()),"onUpdate:modelValue":s[1]||(s[1]=e=>a.state_id=e),type:"text",class:"form-control"},[j,(o(!0),n(_,null,c(u.states,e=>(o(),n("option",{key:e.id,value:e.id},i(e.name),9,q))),128))],544),[[v,a.state_id]])]),t("div",z,[O,y(t("select",{onChange:s[2]||(s[2]=e=>V()),"onUpdate:modelValue":s[3]||(s[3]=e=>a.lga_id=e),type:"text",class:"form-control"},[(o(!0),n(_,null,c(a.lgas,e=>(o(),n("option",{key:"lg_"+e.id,value:e.id},i(e.name),9,J))),128))],544),[[v,a.lga_id]])]),t("div",P,[Q,y(t("select",{"onUpdate:modelValue":s[4]||(s[4]=e=>a.ward_id=e),type:"text",class:"form-control"},[(o(!0),n(_,null,c(a.wards,e=>(o(),n("option",{key:"ward_"+e.id,value:e.id},i(e.name),9,X))),128))],512),[[v,a.ward_id]])])])])]),t("div",Y,[t("div",Z,[t("span",null,"L.G.A "+i(l.lga.name),1),t("span",null,[w(" Total Lga: "),t("i",tt,i(f(k)),1),w(" Total Wards: "),t("i",et,i(f(D)),1)])]),(o(!0),n(_,null,c(u.states,e=>(o(),n("div",{class:"col-md-4",key:"s_"+e.id},[t("label",st,i(e.name)+" State",1),(o(!0),n(_,null,c(e.lgas,(r,h)=>(o(),n("div",{key:"l_"+r.id},[t("label",at,i(r.name)+" L.G.A ",1),lt,t("table",{title:r.name+", "+e.name+" State",class:"clear-float w-100"},[t("tbody",null,[(o(!0),n(_,null,c(r.wards,(m,F)=>(o(),n("tr",{key:"w"+m.id},[t("td",nt,[t("span",null,i(F+1)+".",1),w(" "+i(m.name.slice(0,15)),1)]),t("td",dt,[t("input",{title:"total registered voters",onFocusout:s[5]||(s[5]=d=>b(d)),onFocus:s[6]||(s[6]=d=>x(d)),onKeyup:d=>E(e,r,m,d),type:"number",min:"0",class:"form-control"},null,40,rt)]),t("td",it,[t("input",{title:"total supporters",onFocusout:s[7]||(s[7]=d=>b(d)),onFocus:s[8]||(s[8]=d=>x(d)),onKeyup:d=>E(e,r,m,d),type:"number",min:"0",class:"form-control"},null,40,ut)])]))),128))])],8,ot)]))),128))]))),128))])]),_:1})],64))}},gt=T(_t,[["__scopeId","data-v-145f5396"]]);export{gt as default};

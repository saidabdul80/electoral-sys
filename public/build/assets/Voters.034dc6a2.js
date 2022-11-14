import{l as U,y as A,o as r,c as u,a as h,b as t,u as d,h as i,v as y,F as c,m as p,p as S,s as _,q as b,w as $,n as N,t as a}from"./app.b5846dff.js";import{_ as C,a as D}from"./Sidenav.d4fb3efd.js";import{_ as B}from"./Paginate.a2652e2f.js";import{_ as L}from"./PrimaryButton.3c21e7a6.js";const q={class:"height-100 bg-light",id:"body-pd"},T=t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"Voters")],-1),E={class:"px-3"},F={class:"table table-bordered"},G=t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Voter's ID"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1),M=["src"],P=["onClick"],W=t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1),I={class:"px-3"},z=["onSubmit"],R={class:"row w-100"},j={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},H={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},J={class:"col-md-4 mb-2"},K=t("label",null,"Voter's ID",-1),O={class:"col-md-4 mb-2"},Q=t("label",null,"Name",-1),X={class:"col-md-4 mb-2"},Y=t("label",null,"Email",-1),Z={class:"col-md-4 mb-2"},tt=t("label",null,"Phone",-1),et={class:"col-md-4 mb-2"},st=t("label",null,"Address",-1),lt={class:"col-md-4 mb-2"},dt=t("label",null,"States",-1),ot=t("option",{value:"0"},"-",-1),nt=["value"],at={class:"col-md-4 mb-2"},it=t("label",null,"LGA",-1),rt=["value"],ut={class:"col-md-4 mb-2"},mt=t("label",null,"Ward",-1),_t=["value"],ct={class:"col-md-4 mb-2"},pt=t("label",null,"Area Name",-1),bt=["value"],ht={class:"col-md-4 mb-2"},vt=t("label",null,"Gender",-1),gt=t("option",{value:"male"},"male",-1),ft=t("option",{value:"female"},"female",-1),xt=[gt,ft],yt={class:"col-md-4 mb-2"},wt=t("label",null,"Date of Birth",-1),Vt={class:"col-md-4 mb-2"},kt=t("label",{style:{visibility:"hidden"}},"Area Description",-1),Ut={key:0},At={key:1},Bt={__name:"Voters",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,areas:Array,voters:Array,states:Array},setup(m){const v=m,n=U({switch:"list",wards:[],lgas:[],states:[],areas:[],indexNum:0});function f(){n.lga_ready=!1,n.lga_id=null,n.ward_id=null,setTimeout(function(){v.states.every(o=>o.id==e.state_id?(n.lgas=o.lgas,!1):!0)},400)}function x(){n.ward_id=null,setTimeout(function(){n.lgas.every(o=>o.id==e.lga_id?(n.wards=o.wards,!1):!0)},400)}const e=A({name:"",email:"",phone:"",address:"",state_id:"",lga_id:"",ward_id:"",area_id:"",id:"",voter_id:"",gender:"",dob:""});function w(o,l){n.indexNum=l,e.id=o.id,e.state_id=o.state_id,f(),setTimeout(()=>{e.lga_id=o.lga_id,setTimeout(()=>{x(),e.ward_id=o.ward_id},100)},100),e.name=o.name,e.email=o.email,e.phone=o.phone,e.address=o.address,e.area_id=o.area_id,e.voter_id=o.voter_id,e.gender=o.gender,e.dob=o.dob,n.switch="add"}function V(){e.name="",e.email="",e.phone="",e.address="",e.state_id="",e.lga_id="",e.ward_id="",e.area_id="",e.id="",e.voter_id="",e.gender="",e.dob="",n.switch="add"}const k=()=>{e.post(route("add_voters"),{onFinish:o=>{e.id!=""?v.voters.data[n.indexNum]=e:v.voters.data.push(e)}})};return(o,l)=>(r(),u(c,null,[h(C),h(D,{active:""}),t("div",q,[T,t("button",{onClick:l[0]||(l[0]=s=>V()),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add"),t("button",{onClick:l[1]||(l[1]=s=>d(n).switch="list"),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"List"),i(t("div",E,[t("table",F,[G,t("tbody",null,[(r(!0),u(c,null,p(m.voters.data,(s,g)=>(r(),u("tr",{key:g},[t("td",null,a(m.voters.from+g),1),t("td",null,a(s.voter_id),1),t("td",null,a(s.name),1),t("td",null,a(s.email),1),t("td",null,a(s.phone),1),t("td",null,a(s.address),1),t("td",null,a(s.state),1),t("td",null,a(s.lga),1),t("td",null,a(s.ward),1),t("td",null,a(s.area),1),t("td",null,a(s.dob),1),t("td",null,a(s.gender),1),t("td",null,[t("img",{src:s.image},null,8,M)]),t("td",null,[t("button",{onClick:St=>w(s,g),class:"btn btn-sm bg-primary text-white"},"Edit",8,P),W])]))),128))])]),h(B,{next:m.voters.next_page_url,prev:m.voters.prev_page_url},null,8,["next","prev"])],512),[[y,d(n).switch=="list"]]),i(t("div",I,[t("form",{onSubmit:S(k,["prevent"])},[t("div",R,[t("div",j,[t("div",H,[t("div",J,[K,i(t("input",{required:"","onUpdate:modelValue":l[2]||(l[2]=s=>d(e).voter_id=s),type:"text",class:"form-control"},null,512),[[_,d(e).voter_id]])]),t("div",O,[Q,i(t("input",{required:"","onUpdate:modelValue":l[3]||(l[3]=s=>d(e).name=s),type:"text",class:"form-control"},null,512),[[_,d(e).name]])]),t("div",X,[Y,i(t("input",{required:"","onUpdate:modelValue":l[4]||(l[4]=s=>d(e).email=s),type:"email",class:"form-control"},null,512),[[_,d(e).email]])]),t("div",Z,[tt,i(t("input",{required:"","onUpdate:modelValue":l[5]||(l[5]=s=>d(e).phone=s),type:"text",class:"form-control"},null,512),[[_,d(e).phone]])]),t("div",et,[st,i(t("input",{"onUpdate:modelValue":l[6]||(l[6]=s=>d(e).address=s),type:"text",class:"form-control"},null,512),[[_,d(e).address]])]),t("div",lt,[dt,i(t("select",{onChange:l[7]||(l[7]=s=>f()),"onUpdate:modelValue":l[8]||(l[8]=s=>d(e).state_id=s),type:"text",class:"form-control"},[ot,(r(!0),u(c,null,p(m.states,s=>(r(),u("option",{key:s.id,value:s.id},a(s.name),9,nt))),128))],544),[[b,d(e).state_id]])]),t("div",at,[it,i(t("select",{onChange:l[9]||(l[9]=s=>x()),"onUpdate:modelValue":l[10]||(l[10]=s=>d(e).lga_id=s),type:"text",class:"form-control"},[(r(!0),u(c,null,p(d(n).lgas,s=>(r(),u("option",{key:"lg_"+s.id,value:s.id},a(s.name),9,rt))),128))],544),[[b,d(e).lga_id]])]),t("div",ut,[mt,i(t("select",{"onUpdate:modelValue":l[11]||(l[11]=s=>d(e).ward_id=s),type:"text",class:"form-control"},[(r(!0),u(c,null,p(d(n).wards,s=>(r(),u("option",{key:"ward_"+s.id,value:s.id},a(s.name),9,_t))),128))],512),[[b,d(e).ward_id]])]),t("div",ct,[pt,i(t("select",{"onUpdate:modelValue":l[12]||(l[12]=s=>d(e).area_id=s),type:"text",class:"form-control"},[(r(!0),u(c,null,p(m.areas,s=>(r(),u("option",{key:"a_"+s.id,value:s.id},a(s.name),9,bt))),128))],512),[[b,d(e).area_id]])]),t("div",ht,[vt,i(t("select",{"onUpdate:modelValue":l[13]||(l[13]=s=>d(e).gender=s),type:"text",class:"form-control"},xt,512),[[b,d(e).gender]])]),t("div",yt,[wt,i(t("input",{"onUpdate:modelValue":l[14]||(l[14]=s=>d(e).dob=s),type:"date",class:"form-control"},null,512),[[_,d(e).dob]])]),i(t("input",{"onUpdate:modelValue":l[15]||(l[15]=s=>d(e).id=s),type:"text",class:"form-control d-none"},null,512),[[_,d(e).id]]),t("div",Vt,[kt,h(L,{class:N(["ml-4",{"opacity-25":d(e).processing}]),disabled:d(e).processing},{default:$(()=>[d(e).id==""?(r(),u("span",Ut,"Add")):(r(),u("span",At,"Update"))]),_:1},8,["class","disabled"])])])])])],40,z)],512),[[y,d(n).switch=="add"]])])],64))}};export{Bt as default};

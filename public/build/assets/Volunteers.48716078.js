import{f as S,o as i,c as r,a as y,b as t,u as s,p as G,e as g,g as _,v as w,F as p,h as b,i as N,j as h,n as T,k as f,w as W,t as n,B as F,C as j,E as C}from"./app.920806ef.js";import{_ as z,a as M}from"./Sidenav.25cad631.js";import{_ as U}from"./Paginate.ddae6694.js";import{_ as O}from"./InputLabel.01cc2ab8.js";import{_ as R}from"./PrimaryButton.c884b362.js";/* empty css                      */import{S as x}from"./sweetalert2.4b97bccc.js";import{_ as H}from"./_plugin-vue_export-helper.cdc0426e.js";const o=m=>(F("data-v-645be74f"),m=m(),j(),m),J={class:"height-100 bg-light",id:"body-pd"},K={key:0,style:{position:"fixed",display:"flex","justify-content":"center",padding:"5px",width:"100%",background:"#2223",color:"white","align-items":"center"}},Q=o(()=>t("div",{class:"spinner-border text-white",role:"status"},null,-1)),X=o(()=>t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"User Management")],-1)),Y={class:"row w-100"},Z={class:"col-md-7"},tt={class:"row w-100"},et=["disabled"],lt=["disabled"],st={class:"col-md-5 mt-1"},dt=["disabled"],nt=["disabled"],ot=["disabled"],at={key:1},it={class:"px-3"},rt={class:"table table-bordered"},ut=o(()=>t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Volunteer ID"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1)),_t=["src"],mt=["onClick"],ct=o(()=>t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1)),pt={key:2},bt={class:"px-3"},ht={class:"table table-bordered"},vt=o(()=>t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Volunteer ID"),t("td",null,"Department"),t("td",null,"Status"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1)),gt=["src"],ft=["onClick"],yt=o(()=>t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1)),xt={key:3},wt={class:"px-3"},kt={class:"table table-bordered"},Vt=o(()=>t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Member ID"),t("td",null,"Department"),t("td",null,"Status"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1)),St=["src"],Ct=["onClick"],Ut=o(()=>t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1)),At={class:"px-3"},Dt=o(()=>t("a",{class:"ml-3 mb-3 btn btn-sm bg-primary text-white w-1x",href:"template/volunteers_upload_template.csv",target:"_blank"},"Download Template",-1)),$t={class:"col-md-4 mb-4"},Pt=o(()=>t("label",null,"Select User type",-1)),qt=o(()=>t("option",{value:"Volunteer"},"Volunteer",-1)),Nt=o(()=>t("option",{value:"Party Member"},"Party Member",-1)),Tt=o(()=>t("option",{value:"Committee Member"},"Committee Member",-1)),Bt=[qt,Nt,Tt],It={key:0,class:"col-md-4 mb-2"},Et=o(()=>t("label",null,"Select Status",-1)),Lt=["value"],Gt={key:1,class:"col-md-4 mb-4"},Wt=o(()=>t("label",null,"Select Department",-1)),Ft=["value"],jt={class:"mt-4"},zt={class:"mt-4"},Mt={class:"px-3"},Ot=["onSubmit"],Rt={class:"row w-100"},Ht={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Jt={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},Kt={class:"col-md-4 mb-2"},Qt=o(()=>t("label",null,"Name",-1)),Xt={class:"col-md-4 mb-2"},Yt=o(()=>t("label",null,"Volunteer ID",-1)),Zt={class:"col-md-4 mb-2"},te=o(()=>t("label",null,"Email",-1)),ee={class:"col-md-4 mb-2"},le=o(()=>t("label",null,"Phone",-1)),se={class:"col-md-4 mb-2"},de=o(()=>t("label",null,"Address",-1)),ne={class:"col-md-4 mb-2"},oe=o(()=>t("label",null,"State",-1)),ae=o(()=>t("option",{value:"0"},"-",-1)),ie=["value"],re={class:"col-md-4 mb-2"},ue=o(()=>t("label",null,"Lga",-1)),_e=["value"],me={class:"col-md-4 mb-2"},ce=o(()=>t("label",null,"Ward",-1)),pe=["value"],be={class:"col-md-4 mb-2"},he=o(()=>t("label",null,"Area Name",-1)),ve=["value"],ge={class:"col-md-4 mb-2"},fe=o(()=>t("label",null,"User type",-1)),ye=o(()=>t("option",{value:"Volunteer"},"Volunteer",-1)),xe=o(()=>t("option",{value:"Party Member"},"Party Member",-1)),we=o(()=>t("option",{value:"Committee Member"},"Committee Member",-1)),ke=[ye,xe,we],Ve={key:0,class:"col-md-4 mb-2"},Se=o(()=>t("label",null,"Department",-1)),Ce=["value"],Ue={key:1,class:"col-md-4 mb-2"},Ae=o(()=>t("label",null,"Status",-1)),De=["value"],$e={class:"col-md-4 mb-2"},Pe=o(()=>t("label",null,"Gender",-1)),qe=o(()=>t("option",{value:"male"},"male",-1)),Ne=o(()=>t("option",{value:"female"},"female",-1)),Te=[qe,Ne],Be={class:"col-md-4 mb-2"},Ie=o(()=>t("label",null,"Date of Birth",-1)),Ee={class:"col-md-4 mb-2"},Le=o(()=>t("label",null,"Password",-1)),Ge={class:"col-md-4 mb-2"},We=o(()=>t("label",{style:{visibility:"hidden"}},"Area Description",-1)),Fe={key:0},je={key:1},ze={__name:"Volunteers",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,volunteers:Array,states:Array,departments:Array,statuses:Array,partyMembers:Array,committeeMembers:Array},setup(m){const u=S({switch:"list",wards:[],lgas:[],states:[],areas:[],page:"volunteers",indexNum:0,loading:!1}),v=S({file_to_upload:"",department_id:"",status_id:"",user_type:""}),l=S({name:"",email:"",phone:"",address:"",state_id:"",lga_id:"",ward_id:"",area_id:"",id:"",gender:"",dob:"",password:"",volunteer_id:"",status_id:"",user_type:"Volunteer",department_id:""});async function B(){u.loading=!0;let a=await axios.post("upload_volunteer_data",v,{headers:{"Content-Type":"multipart/form-data"}});u.loading=!1,a.data.ok==!0?(x.fire(a.data.msg,"success"),C.Inertia.reload()):x.fire({icon:"error",html:a.data.msg,footer:"Correct the issues from your file and Upload Again"})}async function A(){let a=await axios.get(`/lgas/${l.state_id}`);u.lgas=a.data}async function D(){let a=await axios.get(`/wards/${l.lga_id}`);u.wards=a.data}async function I(){let a=await axios.get(`/areas/${l.ward_id}`);u.areas=a.data}function k(a,d){u.indexNum=d,l.id=a.id,l.state_id=a.state_id,A(),setTimeout(()=>{l.lga_id=a.lga_id,setTimeout(()=>{D(),l.ward_id=a.ward_id},100)},100),l.name=a.name,l.email=a.email,l.phone=a.phone,l.address=a.address,l.area_id=a.area_id,l.gender=a.gender,l.dob=a.dob,l.volunteer_id=a.volunteer_id,l.department_id=a.department_id,l.status_id=a.status_id,l.user_type=a.user_type,l.password="",u.switch="add"}function E(){$(),u.switch="add"}function $(){l.name="",l.email="",l.phone="",l.address="",l.state_id="",l.lga_id="",l.ward_id="",l.area_id="",l.id="",l.gender="",l.dob="",l.volunteer_id="",l.department_id="",l.status_id="",l.user_type=""}const L=async()=>{u.addingTeamMember=!0;let a=await axios.post("add_volunteer",l);a.data.ok==!0?l.id==""?(x.fire(a.data.msg,"success"),C.Inertia.reload()):(P(a.data.msg,"success"),C.Inertia.reload()):P("try again","error"),u.addingTeamMember=!1};function P(a,d="success"){x.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:c=>{c.addexpenseListener("mouseenter",x.stopTimer),c.addexpenseListener("mouseleave",x.resumeTimer)}}).fire({icon:d,title:a})}function V(a){$(),u.switch="list",u.page=a}return(a,d)=>(i(),r(p,null,[y(z),y(M,{active:"Volunteer"}),t("div",J,[s(u).loading?(i(),r("div",K,[G(" Please Wait "),Q])):g("",!0),X,t("div",Y,[t("div",Z,[t("div",tt,[t("button",{onClick:d[0]||(d[0]=e=>s(u).switch="uploads"),disabled:s(u).switch=="uploads",class:"w-1x ml-3 mb-3 btn btn-sm bg-dark text-white"},"Upload",8,et),t("button",{onClick:d[1]||(d[1]=e=>E()),disabled:s(u).switch=="add",class:"w-1x ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add ",8,lt)])]),t("div",st,[t("div",null,[t("button",{onClick:d[2]||(d[2]=e=>V("volunteers")),disabled:s(u).page=="volunteers",class:"w-1x btn btn-sm bg-success text-white"},"Volunteers",8,dt),t("button",{onClick:d[3]||(d[3]=e=>V("party members")),disabled:s(u).page=="party members",class:"w-1x mt-0 btn btn-sm bg-success text-white"},"Party Members",8,nt),t("button",{onClick:d[4]||(d[4]=e=>V("committee members")),disabled:s(u).page=="committee members",class:"w-1x mt-0 btn btn-sm bg-success text-white"},"Committee Members",8,ot)])])]),s(u).page=="volunteers"?(i(),r("div",at,[_(t("div",it,[t("table",rt,[ut,t("tbody",null,[(i(!0),r(p,null,b(m.volunteers.data,(e,c)=>(i(),r("tr",{key:c},[t("td",null,n(m.volunteers.from+c),1),t("td",null,n(e.volunteer_id),1),t("td",null,n(e.name),1),t("td",null,n(e.email),1),t("td",null,n(e.phone),1),t("td",null,n(e.address),1),t("td",null,n(e.state),1),t("td",null,n(e.lga),1),t("td",null,n(e.ward),1),t("td",null,n(e.area),1),t("td",null,n(e.dob),1),t("td",null,n(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,_t)]),t("td",null,[t("button",{onClick:q=>k(e,c),class:"btn btn-sm bg-primary text-white"},"Edit",8,mt),ct])]))),128))])]),y(U,{next:m.volunteers.next_page_url,prev:m.volunteers.prev_page_url},null,8,["next","prev"])],512),[[w,s(u).switch=="list"]])])):g("",!0),s(u).page=="party members"?(i(),r("div",pt,[_(t("div",bt,[t("table",ht,[vt,t("tbody",null,[(i(!0),r(p,null,b(m.partyMembers.data,(e,c)=>(i(),r("tr",{key:c},[t("td",null,n(m.partyMembers.from+c),1),t("td",null,n(e.partyMember_id),1),t("td",null,n(e.department),1),t("td",null,n(e.status),1),t("td",null,n(e.name),1),t("td",null,n(e.email),1),t("td",null,n(e.phone),1),t("td",null,n(e.address),1),t("td",null,n(e.state),1),t("td",null,n(e.lga),1),t("td",null,n(e.ward),1),t("td",null,n(e.area),1),t("td",null,n(e.dob),1),t("td",null,n(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,gt)]),t("td",null,[t("button",{onClick:q=>k(e,c),class:"btn btn-sm bg-primary text-white"},"Edit",8,ft),yt])]))),128))])]),y(U,{next:m.partyMembers.next_page_url,prev:m.partyMembers.prev_page_url},null,8,["next","prev"])],512),[[w,s(u).switch=="list"]])])):g("",!0),s(u).page=="committee members"?(i(),r("div",xt,[_(t("div",wt,[t("table",kt,[Vt,t("tbody",null,[(i(!0),r(p,null,b(m.committeeMembers.data,(e,c)=>(i(),r("tr",{key:c},[t("td",null,n(m.committeeMembers.from+c),1),t("td",null,n(e.committeeMember_id),1),t("td",null,n(e.department),1),t("td",null,n(e.status),1),t("td",null,n(e.name),1),t("td",null,n(e.email),1),t("td",null,n(e.phone),1),t("td",null,n(e.address),1),t("td",null,n(e.state),1),t("td",null,n(e.lga),1),t("td",null,n(e.ward),1),t("td",null,n(e.area),1),t("td",null,n(e.dob),1),t("td",null,n(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,St)]),t("td",null,[t("button",{onClick:q=>k(e,c),class:"btn btn-sm bg-primary text-white"},"Edit",8,Ct),Ut])]))),128))])]),y(U,{next:m.committeeMembers.next_page_url,prev:m.committeeMembers.prev_page_url},null,8,["next","prev"])],512),[[w,s(u).switch=="list"]])])):g("",!0),_(t("div",At,[Dt,t("form",{onSubmit:d[9]||(d[9]=N(e=>B(),["prevent"])),class:"mt-5 ml-5",enctype:"multipart/form-data"},[t("div",$t,[Pt,_(t("select",{required:"","onUpdate:modelValue":d[5]||(d[5]=e=>s(v).user_type=e),type:"text",class:"form-control"},Bt,512),[[h,s(v).user_type]])]),s(v).user_type!="Volunteer"?(i(),r("div",It,[Et,_(t("select",{required:"","onUpdate:modelValue":d[6]||(d[6]=e=>s(v).status_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(m.statuses,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,Lt))),128))],512),[[h,s(v).status_id]])])):g("",!0),s(v).user_type!="Volunteer"?(i(),r("div",Gt,[Wt,_(t("select",{required:"","onUpdate:modelValue":d[7]||(d[7]=e=>s(v).department_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(m.departments,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,Ft))),128))],512),[[h,s(v).department_id]])])):g("",!0),t("div",jt,[y(O,{for:"file_to_upload",value:"CSV File To uplad"}),t("input",{required:"",id:"file_to_upload",onInput:d[8]||(d[8]=e=>s(v).file_to_upload=e.target.files[0]),type:"file",class:"mt-1 block"},null,32)]),t("div",zt,[t("button",{class:T(["ml-4 btn btn-dark",{"opacity-25":s(l).processing}])}," Upload Data ",2)])],32)],512),[[w,s(u).switch=="uploads"]]),_(t("div",Mt,[t("form",{onSubmit:N(L,["prevent"])},[t("div",Rt,[t("div",Ht,[t("div",Jt,[t("div",Kt,[Qt,_(t("input",{required:"","onUpdate:modelValue":d[10]||(d[10]=e=>s(l).name=e),type:"text",class:"form-control"},null,512),[[f,s(l).name]])]),t("div",Xt,[Yt,_(t("input",{required:"","onUpdate:modelValue":d[11]||(d[11]=e=>s(l).volunteer_id=e),type:"text",class:"form-control"},null,512),[[f,s(l).volunteer_id]])]),t("div",Zt,[te,_(t("input",{required:"","onUpdate:modelValue":d[12]||(d[12]=e=>s(l).email=e),type:"email",class:"form-control"},null,512),[[f,s(l).email]])]),t("div",ee,[le,_(t("input",{required:"","onUpdate:modelValue":d[13]||(d[13]=e=>s(l).phone=e),type:"text",class:"form-control"},null,512),[[f,s(l).phone]])]),t("div",se,[de,_(t("input",{"onUpdate:modelValue":d[14]||(d[14]=e=>s(l).address=e),type:"text",class:"form-control"},null,512),[[f,s(l).address]])]),t("div",ne,[oe,_(t("select",{required:"",onChange:d[15]||(d[15]=e=>A()),"onUpdate:modelValue":d[16]||(d[16]=e=>s(l).state_id=e),type:"text",class:"form-control"},[ae,(i(!0),r(p,null,b(m.states,e=>(i(),r("option",{key:e.id,value:e.id},n(e.name),9,ie))),128))],544),[[h,s(l).state_id]])]),t("div",re,[ue,_(t("select",{required:"",onChange:d[17]||(d[17]=e=>D()),"onUpdate:modelValue":d[18]||(d[18]=e=>s(l).lga_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(s(u).lgas,e=>(i(),r("option",{key:"lg_"+e.id,value:e.id},n(e.name),9,_e))),128))],544),[[h,s(l).lga_id]])]),t("div",me,[ce,_(t("select",{onChange:d[19]||(d[19]=e=>I()),required:"","onUpdate:modelValue":d[20]||(d[20]=e=>s(l).ward_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(s(u).wards,e=>(i(),r("option",{key:"ward_"+e.id,value:e.id},n(e.name),9,pe))),128))],544),[[h,s(l).ward_id]])]),t("div",be,[he,_(t("select",{"onUpdate:modelValue":d[21]||(d[21]=e=>s(l).area_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(s(u).areas,e=>(i(),r("option",{key:"a_"+e.id,value:e.id},n(e.name),9,ve))),128))],512),[[h,s(l).area_id]])]),t("div",ge,[fe,_(t("select",{required:"","onUpdate:modelValue":d[22]||(d[22]=e=>s(l).user_type=e),type:"text",class:"form-control"},ke,512),[[h,s(l).user_type]])]),s(l).user_type!="Volunteer"?(i(),r("div",Ve,[Se,_(t("select",{required:"","onUpdate:modelValue":d[23]||(d[23]=e=>s(l).department_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(m.departments,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,Ce))),128))],512),[[h,s(l).department_id]])])):g("",!0),s(l).user_type!="Volunteer"?(i(),r("div",Ue,[Ae,_(t("select",{required:"","onUpdate:modelValue":d[24]||(d[24]=e=>s(l).status_id=e),type:"text",class:"form-control"},[(i(!0),r(p,null,b(m.statuses,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,De))),128))],512),[[h,s(l).status_id]])])):g("",!0),t("div",$e,[Pe,_(t("select",{"onUpdate:modelValue":d[25]||(d[25]=e=>s(l).gender=e),type:"text",class:"form-control"},Te,512),[[h,s(l).gender]])]),t("div",Be,[Ie,_(t("input",{"onUpdate:modelValue":d[26]||(d[26]=e=>s(l).dob=e),type:"date",class:"form-control"},null,512),[[f,s(l).dob]])]),t("div",Ee,[Le,_(t("input",{"onUpdate:modelValue":d[27]||(d[27]=e=>s(l).password=e),type:"password",class:"form-control"},null,512),[[f,s(l).password]])]),_(t("input",{"onUpdate:modelValue":d[28]||(d[28]=e=>s(l).id=e),type:"text",class:"form-control d-none"},null,512),[[f,s(l).id]]),t("div",Ge,[We,y(R,{class:T(["ml-4",{"opacity-25":s(l).processing}]),disabled:s(l).processing},{default:W(()=>[s(l).id==""?(i(),r("span",Fe,"Add")):(i(),r("span",je,"Update"))]),_:1},8,["class","disabled"])])])])])],40,Ot)],512),[[w,s(u).switch=="add"]])])],64))}},Ye=H(ze,[["__scopeId","data-v-645be74f"]]);export{Ye as default};

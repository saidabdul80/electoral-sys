import{l as w,o as i,c as r,a as y,b as t,u as l,j as E,k as v,h as u,v as x,F as _,p as h,q as P,s as c,n as D,x as g,w as G,t as n,G as k}from"./app.19fa7cd2.js";import{_ as M,a as W}from"./Sidenav.d835597c.js";import{_ as q}from"./Paginate.ec181053.js";import{_ as F}from"./InputLabel.459530f6.js";import{_ as j}from"./PrimaryButton.e5a98aba.js";import{S as f}from"./sweetalert2.9d03a54e.js";const z={class:"height-100 bg-light",id:"body-pd"},O={key:0,style:{position:"fixed",display:"flex","justify-content":"center",padding:"5px",width:"100%",background:"#2223",color:"white","align-items":"center"}},R=t("div",{class:"spinner-border text-white",role:"status"},null,-1),H=t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"Volunteers")],-1),J={class:"float-right"},K={style:{border:"1px solid #ccc","border-radius":"5px",padding:"5px"}},Q=["disabled"],X=["disabled"],Y=["disabled"],Z=t("a",{class:"ml-3 mb-3 btn btn-sm bg-primary text-white",href:"template/volunteers_upload_template.csv",target:"_blank"},"Download Template",-1),tt=["disabled"],et=["disabled"],st={key:1},lt={class:"px-3"},dt={class:"table table-bordered"},ot=t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Volunteer ID"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1),nt=["src"],at=["onClick"],it=t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1),rt={key:2},ut={class:"px-3"},mt={class:"table table-bordered"},_t=t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Volunteer ID"),t("td",null,"Department"),t("td",null,"Status"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1),ct=["src"],pt=["onClick"],bt=t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1),ht={class:"px-3"},gt={class:"col-md-4 mb-4"},vt=t("label",null,"Select User type",-1),yt=t("option",{value:"Volunteer"},"Volunteer",-1),ft=t("option",{value:"Party Member"},"Party Member",-1),xt=[yt,ft],wt={key:0,class:"col-md-4 mb-2"},kt=t("label",null,"Select Status",-1),Vt=["value"],Ut={key:1,class:"col-md-4 mb-4"},St=t("label",null,"Select Department",-1),At=["value"],Ct={class:"mt-4"},$t={class:"mt-4"},Pt={class:"px-3"},Dt=["onSubmit"],qt={class:"row w-100"},Tt={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Nt={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},Bt={class:"col-md-4 mb-2"},Lt=t("label",null,"Name",-1),It={class:"col-md-4 mb-2"},Et=t("label",null,"Volunteer ID",-1),Gt={class:"col-md-4 mb-2"},Mt=t("label",null,"Email",-1),Wt={class:"col-md-4 mb-2"},Ft=t("label",null,"Phone",-1),jt={class:"col-md-4 mb-2"},zt=t("label",null,"Address",-1),Ot={class:"col-md-4 mb-2"},Rt=t("label",null,"State",-1),Ht=t("option",{value:"0"},"-",-1),Jt=["value"],Kt={class:"col-md-4 mb-2"},Qt=t("label",null,"Lga",-1),Xt=["value"],Yt={class:"col-md-4 mb-2"},Zt=t("label",null,"Ward",-1),te=["value"],ee={class:"col-md-4 mb-2"},se=t("label",null,"Area Name",-1),le=["value"],de={class:"col-md-4 mb-2"},oe=t("label",null,"User type",-1),ne=t("option",{value:"Volunteer"},"Volunteer",-1),ae=t("option",{value:"Party Member"},"Party Member",-1),ie=[ne,ae],re={key:0,class:"col-md-4 mb-2"},ue=t("label",null,"Department",-1),me=["value"],_e={key:1,class:"col-md-4 mb-2"},ce=t("label",null,"Status",-1),pe=["value"],be={class:"col-md-4 mb-2"},he=t("label",null,"Gender",-1),ge=t("option",{value:"male"},"male",-1),ve=t("option",{value:"female"},"female",-1),ye=[ge,ve],fe={class:"col-md-4 mb-2"},xe=t("label",null,"Date of Birth",-1),we={class:"col-md-4 mb-2"},ke=t("label",null,"Password",-1),Ve={class:"col-md-4 mb-2"},Ue=t("label",{style:{visibility:"hidden"}},"Area Description",-1),Se={key:0},Ae={key:1},Ne={__name:"Volunteers",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,volunteers:Array,states:Array,departments:Array,statuses:Array,partyMembers:Array},setup(m){const a=w({switch:"list",wards:[],lgas:[],states:[],areas:[],page:"volunteers",indexNum:0,loading:!1}),p=w({file_to_upload:"",department_id:"",status_id:"",user_type:""}),s=w({name:"",email:"",phone:"",address:"",state_id:"",lga_id:"",ward_id:"",area_id:"",id:"",gender:"",dob:"",password:"",volunteer_id:"",status_id:"",user_type:"Volunteer",department_id:""});async function T(){a.loading=!0;let o=await axios.post("upload_volunteer_data",p,{headers:{"Content-Type":"multipart/form-data"}});a.loading=!1,o.data.ok==!0?(f.fire(o.data.msg,"success"),k.Inertia.reload()):f.fire({icon:"error",html:o.data.msg,footer:"Correct the issues from your file and Upload Again"})}async function V(){let o=await axios.get(`/lgas/${s.state_id}`);a.lgas=o.data}async function U(){let o=await axios.get(`/wards/${s.lga_id}`);a.wards=o.data}async function N(){let o=await axios.get(`/areas/${s.ward_id}`);a.areas=o.data}function S(o,d){a.indexNum=d,s.id=o.id,s.state_id=o.state_id,V(),setTimeout(()=>{s.lga_id=o.lga_id,setTimeout(()=>{U(),s.ward_id=o.ward_id},100)},100),s.name=o.name,s.email=o.email,s.phone=o.phone,s.address=o.address,s.area_id=o.area_id,s.gender=o.gender,s.dob=o.dob,s.volunteer_id=o.volunteer_id,s.department_id=o.department_id,s.status_id=o.status_id,s.user_type=o.user_type,s.password="",a.switch="add"}function B(){A(),a.switch="add"}function A(){s.name="",s.email="",s.phone="",s.address="",s.state_id="",s.lga_id="",s.ward_id="",s.area_id="",s.id="",s.gender="",s.dob="",s.volunteer_id="",s.department_id="",s.status_id="",s.user_type=""}const L=async()=>{a.addingTeamMember=!0;let o=await axios.post("add_volunteer",s);o.data.ok==!0?s.id==""?(f.fire(o.data.msg,"success"),k.Inertia.reload({only:["teams"]})):(C(o.data.msg,"success"),k.Inertia.reload({only:["teams"]})):C("try again","error"),a.addingTeamMember=!1};function C(o,d="success"){f.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:b=>{b.addexpenseListener("mouseenter",f.stopTimer),b.addexpenseListener("mouseleave",f.resumeTimer)}}).fire({icon:d,title:o})}function $(o){A(),a.switch=="list"&&(a.switch="list"),a.page=o}return(o,d)=>(i(),r(_,null,[y(M),y(W,{active:"Volunteer"}),t("div",z,[l(a).loading?(i(),r("div",O,[E(" Please Wait "),R])):v("",!0),H,t("div",J,[t("div",K,[t("button",{onClick:d[0]||(d[0]=e=>$("volunteers")),disabled:l(a).page=="volunteers",class:"btn btn-sm bg-dark text-white"},"Volunteers",8,Q),t("button",{onClick:d[1]||(d[1]=e=>$("party members")),disabled:l(a).page=="party members",class:"ml-3 btn btn-sm bg-dark text-white"},"Party Members",8,X)])]),t("button",{onClick:d[2]||(d[2]=e=>l(a).switch="uploads"),disabled:l(a).page=="uploads",class:"ml-3 mb-3 btn btn-sm bg-primary text-white"},"Upload",8,Y),Z,t("button",{onClick:d[3]||(d[3]=e=>B()),disabled:l(a).switch=="add",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add",8,tt),t("button",{onClick:d[4]||(d[4]=e=>l(a).switch="list"),disabled:l(a).switch=="list",class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"List",8,et),l(a).page=="volunteers"?(i(),r("div",st,[u(t("div",lt,[t("table",dt,[ot,t("tbody",null,[(i(!0),r(_,null,h(m.volunteers.data,(e,b)=>(i(),r("tr",{key:b},[t("td",null,n(m.volunteers.from+b),1),t("td",null,n(e.volunteer_id),1),t("td",null,n(e.name),1),t("td",null,n(e.email),1),t("td",null,n(e.phone),1),t("td",null,n(e.address),1),t("td",null,n(e.state),1),t("td",null,n(e.lga),1),t("td",null,n(e.ward),1),t("td",null,n(e.area),1),t("td",null,n(e.dob),1),t("td",null,n(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,nt)]),t("td",null,[t("button",{onClick:I=>S(e,b),class:"btn btn-sm bg-primary text-white"},"Edit",8,at),it])]))),128))])]),y(q,{next:m.volunteers.next_page_url,prev:m.volunteers.prev_page_url},null,8,["next","prev"])],512),[[x,l(a).switch=="list"]])])):v("",!0),l(a).page=="party members"?(i(),r("div",rt,[u(t("div",ut,[t("table",mt,[_t,t("tbody",null,[(i(!0),r(_,null,h(m.partyMembers.data,(e,b)=>(i(),r("tr",{key:b},[t("td",null,n(m.partyMembers.from+b),1),t("td",null,n(e.partyMember_id),1),t("td",null,n(e.department),1),t("td",null,n(e.status),1),t("td",null,n(e.name),1),t("td",null,n(e.email),1),t("td",null,n(e.phone),1),t("td",null,n(e.address),1),t("td",null,n(e.state),1),t("td",null,n(e.lga),1),t("td",null,n(e.ward),1),t("td",null,n(e.area),1),t("td",null,n(e.dob),1),t("td",null,n(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,ct)]),t("td",null,[t("button",{onClick:I=>S(e,b),class:"btn btn-sm bg-primary text-white"},"Edit",8,pt),bt])]))),128))])]),y(q,{next:m.partyMembers.next_page_url,prev:m.partyMembers.prev_page_url},null,8,["next","prev"])],512),[[x,l(a).switch=="list"]])])):v("",!0),u(t("div",ht,[t("form",{onSubmit:d[9]||(d[9]=P(e=>T(),["prevent"])),class:"mt-5 ml-5",enctype:"multipart/form-data"},[t("div",gt,[vt,u(t("select",{required:"","onUpdate:modelValue":d[5]||(d[5]=e=>l(p).user_type=e),type:"text",class:"form-control"},xt,512),[[c,l(p).user_type]])]),l(p).user_type=="Party Member"?(i(),r("div",wt,[kt,u(t("select",{required:"","onUpdate:modelValue":d[6]||(d[6]=e=>l(p).status_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(m.statuses,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,Vt))),128))],512),[[c,l(p).status_id]])])):v("",!0),l(p).user_type=="Party Member"?(i(),r("div",Ut,[St,u(t("select",{required:"","onUpdate:modelValue":d[7]||(d[7]=e=>l(p).department_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(m.departments,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,At))),128))],512),[[c,l(p).department_id]])])):v("",!0),t("div",Ct,[y(F,{for:"file_to_upload",value:"CSV File To uplad"}),t("input",{required:"",id:"file_to_upload",onInput:d[8]||(d[8]=e=>l(p).file_to_upload=e.target.files[0]),type:"file",class:"mt-1 block"},null,32)]),t("div",$t,[t("button",{class:D(["ml-4 btn btn-dark",{"opacity-25":l(s).processing}])}," Upload Data ",2)])],32)],512),[[x,l(a).switch=="uploads"]]),u(t("div",Pt,[t("form",{onSubmit:P(L,["prevent"])},[t("div",qt,[t("div",Tt,[t("div",Nt,[t("div",Bt,[Lt,u(t("input",{required:"","onUpdate:modelValue":d[10]||(d[10]=e=>l(s).name=e),type:"text",class:"form-control"},null,512),[[g,l(s).name]])]),t("div",It,[Et,u(t("input",{required:"","onUpdate:modelValue":d[11]||(d[11]=e=>l(s).volunteer_id=e),type:"text",class:"form-control"},null,512),[[g,l(s).volunteer_id]])]),t("div",Gt,[Mt,u(t("input",{required:"","onUpdate:modelValue":d[12]||(d[12]=e=>l(s).email=e),type:"email",class:"form-control"},null,512),[[g,l(s).email]])]),t("div",Wt,[Ft,u(t("input",{required:"","onUpdate:modelValue":d[13]||(d[13]=e=>l(s).phone=e),type:"text",class:"form-control"},null,512),[[g,l(s).phone]])]),t("div",jt,[zt,u(t("input",{"onUpdate:modelValue":d[14]||(d[14]=e=>l(s).address=e),type:"text",class:"form-control"},null,512),[[g,l(s).address]])]),t("div",Ot,[Rt,u(t("select",{required:"",onChange:d[15]||(d[15]=e=>V()),"onUpdate:modelValue":d[16]||(d[16]=e=>l(s).state_id=e),type:"text",class:"form-control"},[Ht,(i(!0),r(_,null,h(m.states,e=>(i(),r("option",{key:e.id,value:e.id},n(e.name),9,Jt))),128))],544),[[c,l(s).state_id]])]),t("div",Kt,[Qt,u(t("select",{required:"",onChange:d[17]||(d[17]=e=>U()),"onUpdate:modelValue":d[18]||(d[18]=e=>l(s).lga_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(l(a).lgas,e=>(i(),r("option",{key:"lg_"+e.id,value:e.id},n(e.name),9,Xt))),128))],544),[[c,l(s).lga_id]])]),t("div",Yt,[Zt,u(t("select",{onChange:d[19]||(d[19]=e=>N()),required:"","onUpdate:modelValue":d[20]||(d[20]=e=>l(s).ward_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(l(a).wards,e=>(i(),r("option",{key:"ward_"+e.id,value:e.id},n(e.name),9,te))),128))],544),[[c,l(s).ward_id]])]),t("div",ee,[se,u(t("select",{"onUpdate:modelValue":d[21]||(d[21]=e=>l(s).area_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(l(a).areas,e=>(i(),r("option",{key:"a_"+e.id,value:e.id},n(e.name),9,le))),128))],512),[[c,l(s).area_id]])]),t("div",de,[oe,u(t("select",{required:"","onUpdate:modelValue":d[22]||(d[22]=e=>l(s).user_type=e),type:"text",class:"form-control"},ie,512),[[c,l(s).user_type]])]),l(s).user_type=="Party Member"?(i(),r("div",re,[ue,u(t("select",{required:"","onUpdate:modelValue":d[23]||(d[23]=e=>l(s).department_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(m.departments,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,me))),128))],512),[[c,l(s).department_id]])])):v("",!0),l(s).user_type=="Party Member"?(i(),r("div",_e,[ce,u(t("select",{required:"","onUpdate:modelValue":d[24]||(d[24]=e=>l(s).status_id=e),type:"text",class:"form-control"},[(i(!0),r(_,null,h(m.statuses,e=>(i(),r("option",{key:"dep_"+e.id,value:e.id},n(e.name),9,pe))),128))],512),[[c,l(s).status_id]])])):v("",!0),t("div",be,[he,u(t("select",{"onUpdate:modelValue":d[25]||(d[25]=e=>l(s).gender=e),type:"text",class:"form-control"},ye,512),[[c,l(s).gender]])]),t("div",fe,[xe,u(t("input",{"onUpdate:modelValue":d[26]||(d[26]=e=>l(s).dob=e),type:"date",class:"form-control"},null,512),[[g,l(s).dob]])]),t("div",we,[ke,u(t("input",{"onUpdate:modelValue":d[27]||(d[27]=e=>l(s).password=e),type:"date",class:"form-control"},null,512),[[g,l(s).password]])]),u(t("input",{"onUpdate:modelValue":d[28]||(d[28]=e=>l(s).id=e),type:"text",class:"form-control d-none"},null,512),[[g,l(s).id]]),t("div",Ve,[Ue,y(j,{class:D(["ml-4",{"opacity-25":l(s).processing}]),disabled:l(s).processing},{default:G(()=>[l(s).id==""?(i(),r("span",Se,"Add")):(i(),r("span",Ae,"Update"))]),_:1},8,["class","disabled"])])])])])],40,Dt)],512),[[x,l(a).switch=="add"]])])],64))}};export{Ne as default};

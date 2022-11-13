import{l as w,o as r,c as u,a as g,b as t,u as d,h as i,v as y,F as c,p,q as S,x as _,s as b,w as $,n as C,t as a,G as x}from"./app.5a281efc.js";import{_ as N,a as q}from"./Sidenav.f52510a8.js";import{_ as B}from"./Paginate.91db04cd.js";import{_ as D}from"./PrimaryButton.2d726608.js";import{S as T}from"./sweetalert2.f8f98ce2.js";const L={class:"height-100 bg-light",id:"body-pd"},M=t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"Volunteers")],-1),E={class:"px-3"},G={class:"table table-bordered"},P=t("thead",null,[t("tr",null,[t("td",null,"S/N"),t("td",null,"Volunteer ID"),t("td",null,"Name"),t("td",null,"Email"),t("td",null,"Phone"),t("td",null,"Address"),t("td",null,"State"),t("td",null,"LGA"),t("td",null,"Ward"),t("td",null,"Area"),t("td",null,"Date of Birth"),t("td",null,"Gender"),t("td",null,"Pix"),t("td")])],-1),I=["src"],W=["onClick"],F=t("button",{class:"btn btn-sm ml-2 bg-danger text-white"},"Delete",-1),z={class:"px-3"},R=["onSubmit"],j={class:"row w-100"},H={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},J={style:{padding:"20px 10px"},class:"bg-white overflow-hidden shadow-sm sm:rounded-lg row"},K={class:"col-md-4 mb-2"},O=t("label",null,"Name",-1),Q={class:"col-md-4 mb-2"},X=t("label",null,"Email",-1),Y={class:"col-md-4 mb-2"},Z=t("label",null,"Phone",-1),tt={class:"col-md-4 mb-2"},et=t("label",null,"Address",-1),st={class:"col-md-4 mb-2"},lt=t("label",null,"State",-1),dt=t("option",{value:"0"},"-",-1),ot=["value"],nt={class:"col-md-4 mb-2"},at=t("label",null,"Lga",-1),it=["value"],rt={class:"col-md-4 mb-2"},ut=t("label",null,"Ward",-1),mt=["value"],_t={class:"col-md-4 mb-2"},ct=t("label",null,"Area Name",-1),pt=["value"],bt={class:"col-md-4 mb-2"},gt=t("label",null,"Gender",-1),ht=t("option",{value:"male"},"male",-1),ft=t("option",{value:"female"},"female",-1),vt=[ht,ft],wt={class:"col-md-4 mb-2"},yt=t("label",null,"Date of Birth",-1),xt={class:"col-md-4 mb-2"},Vt=t("label",null,"Password",-1),kt={class:"col-md-4 mb-2"},At=t("label",{style:{visibility:"hidden"}},"Area Description",-1),Ut={key:0},St={key:1},Tt={__name:"Volunteers",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,areas:Array,volunteers:Array,states:Array},setup(m){const V=m,n=w({switch:"list",wards:[],lgas:[],states:[],areas:[],indexNum:0}),s=w({name:"",email:"",phone:"",address:"",state_id:"",lga_id:"",ward_id:"",area_id:"",id:"",gender:"",dob:"",password:""});function f(){n.lga_id=null,n.ward_id=null,setTimeout(function(){V.states.every(o=>o.id==s.state_id?(n.lgas=o.lgas,!1):!0)},400)}function v(){n.ward_id=null,setTimeout(function(){n.lgas.every(o=>o.id==s.lga_id?(n.wards=o.wards,!1):!0)},400)}function k(o,l){n.indexNum=l,s.id=o.id,s.state_id=o.state_id,f(),setTimeout(()=>{s.lga_id=o.lga_id,setTimeout(()=>{v(),s.ward_id=o.ward_id},100)},100),s.name=o.name,s.email=o.email,s.phone=o.phone,s.address=o.address,s.area_id=o.area_id,s.gender=o.gender,s.dob=o.dob,s.volunteer_id=o.volunteer_id,s.password="",n.switch="add"}function A(){s.name="",s.email="",s.phone="",s.address="",s.state_id="",s.lga_id="",s.ward_id="",s.area_id="",s.id="",s.gender="",s.dob="",n.switch="add"}const U=async()=>{n.addingTeamMember=!0;let o=await axios.post("add_volunteer",s);o.data.ok==!0?s.id==""?(T.fire(o.data.msg,"success"),x.Inertia.reload({only:["teams"]})):(showAlert(o.data.msg,"success"),x.Inertia.reload({only:["teams"]})):showAlert("try again","error"),n.addingTeamMember=!1};return(o,l)=>(r(),u(c,null,[g(N),g(q,{active:"Volunteer"}),t("div",L,[M,t("button",{onClick:l[0]||(l[0]=e=>A()),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"Add"),t("button",{onClick:l[1]||(l[1]=e=>d(n).switch="list"),class:"ml-3 mb-3 btn btn-sm bg-dark text-white"},"List"),i(t("div",E,[t("table",G,[P,t("tbody",null,[(r(!0),u(c,null,p(m.volunteers.data,(e,h)=>(r(),u("tr",{key:h},[t("td",null,a(m.volunteers.from+h),1),t("td",null,a(e.volunteer_id),1),t("td",null,a(e.name),1),t("td",null,a(e.email),1),t("td",null,a(e.phone),1),t("td",null,a(e.address),1),t("td",null,a(e.state),1),t("td",null,a(e.lga),1),t("td",null,a(e.ward),1),t("td",null,a(e.area),1),t("td",null,a(e.dob),1),t("td",null,a(e.gender),1),t("td",null,[t("img",{src:e.image,alt:"image"},null,8,I)]),t("td",null,[t("button",{onClick:$t=>k(e,h),class:"btn btn-sm bg-primary text-white"},"Edit",8,W),F])]))),128))])]),g(B,{next:m.volunteers.next_page_url,prev:m.volunteers.prev_page_url},null,8,["next","prev"])],512),[[y,d(n).switch=="list"]]),i(t("div",z,[t("form",{onSubmit:S(U,["prevent"])},[t("div",j,[t("div",H,[t("div",J,[t("div",K,[O,i(t("input",{required:"","onUpdate:modelValue":l[2]||(l[2]=e=>d(s).name=e),type:"text",class:"form-control"},null,512),[[_,d(s).name]])]),t("div",Q,[X,i(t("input",{required:"","onUpdate:modelValue":l[3]||(l[3]=e=>d(s).email=e),type:"email",class:"form-control"},null,512),[[_,d(s).email]])]),t("div",Y,[Z,i(t("input",{required:"","onUpdate:modelValue":l[4]||(l[4]=e=>d(s).phone=e),type:"text",class:"form-control"},null,512),[[_,d(s).phone]])]),t("div",tt,[et,i(t("input",{"onUpdate:modelValue":l[5]||(l[5]=e=>d(s).address=e),type:"text",class:"form-control"},null,512),[[_,d(s).address]])]),t("div",st,[lt,i(t("select",{required:"",onChange:l[6]||(l[6]=e=>f()),"onUpdate:modelValue":l[7]||(l[7]=e=>d(s).state_id=e),type:"text",class:"form-control"},[dt,(r(!0),u(c,null,p(m.states,e=>(r(),u("option",{key:e.id,value:e.id},a(e.name),9,ot))),128))],544),[[b,d(s).state_id]])]),t("div",nt,[at,i(t("select",{required:"",onChange:l[8]||(l[8]=e=>v()),"onUpdate:modelValue":l[9]||(l[9]=e=>d(s).lga_id=e),type:"text",class:"form-control"},[(r(!0),u(c,null,p(d(n).lgas,e=>(r(),u("option",{key:"lg_"+e.id,value:e.id},a(e.name),9,it))),128))],544),[[b,d(s).lga_id]])]),t("div",rt,[ut,i(t("select",{required:"","onUpdate:modelValue":l[10]||(l[10]=e=>d(s).ward_id=e),type:"text",class:"form-control"},[(r(!0),u(c,null,p(d(n).wards,e=>(r(),u("option",{key:"ward_"+e.id,value:e.id},a(e.name),9,mt))),128))],512),[[b,d(s).ward_id]])]),t("div",_t,[ct,i(t("select",{"onUpdate:modelValue":l[11]||(l[11]=e=>d(s).area_id=e),type:"text",class:"form-control"},[(r(!0),u(c,null,p(m.areas,e=>(r(),u("option",{key:"a_"+e.id,value:e.id},a(e.name),9,pt))),128))],512),[[b,d(s).area_id]])]),t("div",bt,[gt,i(t("select",{"onUpdate:modelValue":l[12]||(l[12]=e=>d(s).gender=e),type:"text",class:"form-control"},vt,512),[[b,d(s).gender]])]),t("div",wt,[yt,i(t("input",{"onUpdate:modelValue":l[13]||(l[13]=e=>d(s).dob=e),type:"date",class:"form-control"},null,512),[[_,d(s).dob]])]),t("div",xt,[Vt,i(t("input",{"onUpdate:modelValue":l[14]||(l[14]=e=>d(s).password=e),type:"date",class:"form-control"},null,512),[[_,d(s).password]])]),i(t("input",{"onUpdate:modelValue":l[15]||(l[15]=e=>d(s).id=e),type:"text",class:"form-control d-none"},null,512),[[_,d(s).id]]),t("div",kt,[At,g(D,{class:C(["ml-4",{"opacity-25":d(s).processing}]),disabled:d(s).processing},{default:$(()=>[d(s).id==""?(r(),u("span",Ut,"Add")):(r(),u("span",St,"Update"))]),_:1},8,["class","disabled"])])])])])],40,R)],512),[[y,d(n).switch=="add"]])])],64))}};export{Tt as default};

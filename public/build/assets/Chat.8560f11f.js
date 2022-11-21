import{f as V,s as z,o,c as a,a as m,b as e,g as E,v as j,u as d,F as f,h as x,e as _,t as c,p as g,n as p}from"./app.920806ef.js";/* empty css                      *//* empty css                                              */import{_ as I,a as N}from"./Sidenav.25cad631.js";import{_ as M}from"./Paginate.ddae6694.js";import"./sweetalert2.4b97bccc.js";const D={class:"height-100",id:"body-pd"},H=e("div",{class:"p-3 d-flex text-dark align-items-center"},[e("i",{class:"bi bi-stack"}),e("h4",{class:"ml-3 my-0"},"Chats")],-1),L={style:{height:"78vh","box-shadow":"2px 8px 27px -12px #888"},class:"chat-page row mx-auto w-100"},A={id:"chat-list",class:"position-relative px-0 col-md-3 bg-white",style:{height:"100%","overflow-y":"scroll"}},K=e("div",{class:"mt-3 px-3 mb-3 position-absolute bg-white w-100"},[e("input",{type:"text",class:"bg-light form-control w-10 rounded",placeholder:"Search or start new chat"})],-1),O=e("div",{style:{height:"75px"}},null,-1),R=["id","onClick"],q={key:0,class:"d-flex px-2 w-100 align-items-center user-x",style:{"user-select":"none"}},G={key:0},J=["src"],P={key:1,class:"bi bi-person-fill img1",style:{"font-size":"2.3em",background:"black",color:"white","border-radius":"50px",display:"flex"}},Q={class:"py-3 pl-2 w-100",style:{"border-bottom":"1px solid #ccc",height:"100%","user-select":"none"}},W={class:"name"},X={class:"name"},Y={class:"position-absolute",style:{bottom:"0px"}},Z={id:"chat-env",class:"col-md-9 p-0"},ee={class:""},te={class:"wrapper position-relative"},se={class:"chat-env-header bg-light"},ie=e("i",{class:"bi bi-arrow-left text-dark"},null,-1),ne=[ie],oe={key:0,class:"d-inline-block p-3"},ae={id:"main-chat-env",class:"main px-4",style:{height:"65vh","overflow-y":"scroll","overflow-x":"none","overflow-anchor":"none"}},le={class:"px-2"},re={class:"pstyle pb-2 d-inline-block"},ce={key:0,style:{"font-size":"0.97em"},class:"mb-0"},de={key:1,class:"mb-0"},_e=["src"],ue={key:2,class:"mb-0"},pe=["href"],he=e("br",null,null,-1),me=e("br",null,null,-1),fe=e("br",null,null,-1),ge=e("br",null,null,-1),ve=e("br",null,null,-1),ye=e("br",null,null,-1),be=e("br",null,null,-1),xe={key:0,style:{position:"absolute",left:"-4px",bottom:"-43px",width:"100%"},class:"px-4 navbar bg-light navbar-expand-sm d-flex justify-content-between"},we={class:"d-flex justify-between w-100 align-items-center"},ke={id:"upload-photo-label",for:"upload-photo"},Te=e("div",{class:"icondiv d-flex justify-content-end align-content-center text-center ml-2"},[e("i",{class:"fa fa-paperclip icon1"}),g(),e("i",{class:"fa fa-arrow-circle-right icon2"})],-1),Ve={__name:"Chat",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String,users:Array,currentUser:Object},setup(u){const r=u,s=V({chatTab:!0,loading:!1,conversations:[],conversation_with_id:0,is_typing:!1,clear_timeout:setTimeout(function(){},0)}),l=z({from_user_id:"",to_user_id:"",message:"",message_type:"",date:"..."});async function w(i,n){$(window).width()<960&&(s.chatTab=!1),$(".user-x").parent().removeClass("activex"),$("#"+i+"user").addClass("activex"),s.loading=!0,s.is_typing=!1,s.conversation_with_id=i;let t=await axios.post("/fetch_conversation",{from_user_id:r.currentUser.id,to_user_id:i});s.conversations=t.data,s.loading=!1,setTimeout(()=>{y("main-chat-env")},50)}function v(i){return r.currentUser.id==i?"float-right":"float-left"}function k(i){return r.currentUser.id==i.from_user_id?i.read?"float-right text-primary":"float-right text-secondary":"d-none"}function T(i){return r.currentUser.id==i?"bg_faint2 round1":"bg-white round2"}async function C(i){if(l.message!=""){let n=s.conversations.length;l.message_type="file",l.from_user_id=r.currentUser.id,l.to_user_id=s.conversation_with_id,l.date="...",s.conversations.push(l);let t=await axios.post("send_message",l,{headers:{"Content-Type":"multipart/form-data"}});s.conversations[n]=t.data}}function y(i){var n=document.getElementById(i);n.scrollTop=n.scrollHeight-n.clientHeight}async function b(i,n=!1){if(i.key==="Enter"||n==!0){let t=s.conversations.length,h=$("#textField").val();if(h!==""){let F={message:i.target.value,message_type:"text",from_user_id:r.currentUser.id,to_user_id:s.conversation_with_id,date:"..."};s.conversations.push(F),$("#textField").val("");let S=await axios.post("send_message",{message:h,message_type:"text",from_user_id:r.currentUser.id,to_user_id:s.conversation_with_id});s.conversations[t]=S.data}}clearTimeout(s.clear_timeout),s.clear_timeout=setTimeout(function(){axios.post("typing",{from_user_id:r.currentUser.id,to_user_id:s.conversation_with_id})},100)}window.Echo.private("chat").listen("MessageSent",i=>{i.noti==!1&&s.conversation_with_id!=0&&i.user.id==s.conversation_with_id&&(s.conversations.push(i.message),setTimeout(()=>{y("main-chat-env")},500))});function U(){setInterval(function(){s.is_typing=!1},5e3)}window.Echo.private("chat-typing").listen("ChatTyping",i=>{i.user.id==s.conversation_with_id?s.is_typing||(s.is_typing=!0):s.is_typing=!1}),U();function B(){s.chatTab=!s.chatTab}return(i,n)=>(o(),a(f,null,[m(I,{class:"bg-white text-dark"}),m(N,{active:"Chats"}),e("div",D,[H,e("div",L,[E(e("div",A,[K,O,(o(!0),a(f,null,x(u.users.data,t=>(o(),a("div",{id:t.id+"user",onClick:h=>w(t.id),key:t.id+"_c"},[t.id!==u.currentUser.id?(o(),a("div",q,[(t==null?void 0:t.image)==""?(o(),a("span",G,[e("img",{src:"/photos/"+t.image,width:"50",style:{"border-radius":"50px"},class:"img1"},null,8,J)])):(o(),a("i",P)),e("div",Q,[e("span",W,c(t.first_name)+" "+c(t.surname),1),g(" ("),e("span",X,c(t.email.slice(0,14)),1),g(") ")])])):_("",!0)],8,R))),128)),e("div",Y,[m(M,{next:u.users.next_url_page,prev:u.users.prev_url_page},null,8,["next","prev"])])],512),[[j,d(s).chatTab]]),e("div",Z,[e("div",ee,[e("div",te,[e("div",se,[e("button",{onClick:n[0]||(n[0]=t=>B()),class:"shadow btn bg-white mt-2 ml-2 mr-2"},ne),d(s).is_typing?(o(),a("span",oe,"typing ...")):_("",!0)]),e("div",ae,[e("div",le,[(o(!0),a(f,null,x(d(s).conversations,t=>(o(),a("div",{style:{clear:"both","margin-top":"4px"},key:t.id+"_ch"},[e("div",{class:p([v(t.from_user_id),"pt-2"])},[e("div",{class:p([T(t.from_user_id),"d-inline-block align-items-center pt shdowx"])},[e("div",re,[t.message_type=="text"?(o(),a("p",ce,c(t.message),1)):_("",!0),t.message_type=="image"?(o(),a("div",de,[e("img",{src:"/uploads/"+t.message,style:{width:"100px"}},null,8,_e),e("p",null,c(t.message),1)])):_("",!0),t.message_type=="file"?(o(),a("p",ue,[e("a",{href:t.message,target:"_blank"},c(t.message),9,pe)])):_("",!0),e("span",{class:p([k(t),"bi-check2-all"]),style:{"font-size":"1em"}},null,2),e("span",{class:p(v(t.from_user_id)),style:{"font-size":"0.8em"}},c(t.date),3)])],2)],2)]))),128)),he,me,fe,ge,ve,ye,be])]),d(s).conversation_with_id!=0?(o(),a("nav",xe,[e("div",we,[e("input",{onInput:n[1]||(n[1]=t=>d(l).message=t.target.files[0]),type:"file",id:"upload-photo"},null,32),e("label",ke,"Browse "+c(d(l).message.name),1),e("input",{onKeyup:n[2]||(n[2]=t=>b(t)),id:"textField",type:"text number",name:"text",class:"form-control w-50",placeholder:"Type a message..."},null,32),e("button",{onClick:n[3]||(n[3]=t=>{C(),b(t,!0)}),class:"btn btn-sm btn-success"},"Send")]),Te])):_("",!0)])])])])])],64))}};export{Ve as default};

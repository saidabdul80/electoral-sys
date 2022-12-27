import{f as ee,s as N,l as te,D as oe,o as n,c as l,a as g,b as t,m as se,e as S,w as E,F as y,p as b,t as r,h as w,g as B,j as U,i as V,u as c,n as W,B as ie,C as ne,E as L,G as le}from"./app.920806ef.js";/* empty css                      */import{_ as ae}from"./AuthenticatedLayout.5112b74e.js";import{_ as K}from"./InputError.3d91b0d1.js";import{_ as M}from"./InputLabel.01cc2ab8.js";import{_ as O}from"./PrimaryButton.c884b362.js";import{_ as re}from"./TextInput.52fbeb75.js";import{_ as de,a as ce}from"./Sidenav.25cad631.js";import{L as _e}from"./LightLoader.b487f0ac.js";import{_ as ue}from"./_plugin-vue_export-helper.cdc0426e.js";const v=d=>(ie("data-v-9571dabe"),d=d(),ne(),d),pe={class:"height-100 bg-light",id:"body-pd"},fe=v(()=>t("div",{class:"p-3 d-flex align-items-center"},[t("i",{class:"bi bi-stack"}),t("h4",{class:"ml-3 my-0"},"Data Upload")],-1)),me={class:"row w-100"},ge={class:"col-md-4 pt-2 px-4",style:{height:"82vh"}},he={class:"d-flex justify-between w-100 my-3 px-3"},ye={class:"badge bg-warning"},be={class:"badge bg-warning"},ve={key:1,disabled:"",class:"btn btn-sm px-4 bg-success text-white"},we={class:"px-3 py-3",style:{background:"#ffffffc7","border-radius":"5px",height:"95%","overflow-y":"scroll"}},xe=v(()=>t("li",{class:"label"},"Select States",-1)),ke={class:"list_state"},Se=["href"],$e=v(()=>t("li",{class:"label mt-3"}," Settings ",-1)),Ce=v(()=>t("label",null,"Election For:",-1)),Ee=["value"],Fe=v(()=>t("label",null,"Election Type:",-1)),Ie=["value"],Le={class:"col-md-4 p-0"},Te={class:"card-v px-2 pt-2"},De=["id"],Pe={class:"label text-center w-100"},Ae=["data-text"],Ne={style:{width:"100%",margin:"14px 0px 7px 0px","border-bottom":"2px solid #fff","font-weight":"bold"},class:"float-right"},Be=v(()=>t("table",{class:"w-100"},[t("tbody",null,[t("tr",null,[t("th",{class:"text-center",width:"50%"},"Wards"),t("th",{width:"25%"},"R Voters"),t("th",{width:"25%"},"R Supporters")])])],-1)),Ue=["title"],Ve=["id"],We={width:"50%",class:"wardTag"},Ke={class:"wardTagText"},Me={width:"25%"},Oe=["onKeyup"],Re={width:"25%"},Ge=["onKeyup"],je={class:"pt-2"},qe={key:1,disabled:"",class:"btn bg-light mx-1 shadow"},ze={key:3,disabled:"",class:"btn bg-light mx-1 shadow"},He={class:"col-md-4"},Je={key:0},Qe={key:0},Xe=["onSubmit"],Ye=["value"],Ze={class:"flex items-center justify-end mt-4"},et=["onSubmit"],tt=["value"],ot=v(()=>t("p",null,[t("code",null,"Note:"),b(" This record will be upload with the selected options in settings")],-1)),st={class:"flex items-center justify-end mt-2"},it={__name:"DataUpload",props:{states:Array,config:Object,msg:{type:String,default:function(){return null}}},setup(d){const f=d,s=ee({ward_id:0,state_id:0,lga_id:0,lgas:[],wards:[],lga_ready:!1,ward_ready:!1,collectedData:{},election_year_id:0,election_month_id:0,election_for_id:0,election_type_id:0,states:[],bParser:{},loading:!1,storedArray:[]}),h=N({state_lga_ward:"",terms:!1}),_=N({records:"",election_for_id:0,election_type_id:0,election_month_id:0,election_year_id:0,terms:!1});function T(i){i.target.parentElement.parentElement.firstElementChild.classList.add("highlight")}function D(i){i.target.parentElement.parentElement.firstElementChild.classList.remove("highlight")}function R(i){let o=i.target.value.toLowerCase();$(".wardTagText").each(function(){$(this).parent().parent().toggle($(this).text().toLowerCase().includes(o))}),$(".lga_container").each(function(){$(this).toggle($(this).attr("data-text").toLowerCase().includes(o))})}function x(i,o){return parseInt(parseInt(o)/parseInt(i)*100)}function G(i,o){if(x(i,o)<40)return"poor";if(x(i,o)>39&&x(i,o)<59)return"normal";if(x(i,o)>58)return"strong"}function P(i,o,u,e){let p=$(e.target).parent().parent().find(":first-child"),m=e.target.parentElement.parentElement.querySelectorAll("input[type=number]"),k=Array.from(m)[0].value,a=Array.from(m)[1].value,I=e.which?e.which:e.keyCode;if(I>31&&(I<48||I>57))return!1;let Y=G(k,a),Z=x(k,a);s.collectedData[i.name+o.id+u.id]={state_id:i.id,lga_id:o.id,ward_id:u.id,total_registered_voters:k,total_registered_supporters:a,election_year_id:f.config.election_year.id,election_month_id:f.config.election_month.id,election_for_id:s.election_for_id,election_type_id:s.election_type_id,created_by:f.config.user.id,flag:Y,percentage:Z,data_token:i.name+o.id+u.id+s.election_type_id+s.election_for_id+f.config.election_month.id+f.config.election_year.id},Array.from(m)[0].value>0&&Array.from(m)[1].value>0?p.addClass("successLight"):p.removeClass("successLight")}const j=()=>{s.loading=!0,L.Inertia.post(route("save_data_entry"),s.collectedData,{onFinish:i=>{s.loading=!1}})},q=async()=>{s.loading=!0;let o=(await le.post(route("get_saved_data"),s.bParser)).data,u="";$(".r_supports").each(function(){$(this).val("")}),$(".r_voters").each(function(){$(this).val("")}),o.forEach(e=>{u=e.state_id+"_"+e.lga_id+"_"+e.ward_id,$("#"+u).find(".r_supports").val(e.total_registered_supporters),$("#"+u).find(".r_voters").val(e.total_registered_voters)}),s.loading=!1};function nt(i){}function F(i=null,o=null){s.election_for_id!==0&&s.election_type_id!==0&&(s.bParser.election_for_id=s.election_for_id,s.bParser.election_year_id=f.config.election_year.id,s.bParser.election_month_id=f.config.election_month.id,s.bParser.election_type_id=s.election_type_id,s.bParser.user=f.config.user,q()),o=="eF"&&localStorage.setItem("election_for_id",s.election_for_id),o=="eT"&&localStorage.setItem("election_type_id",s.election_type_id)}function C(i){return localStorage.getItem(i)}function z(i,o){for(var u=[],e=0;e<i.length;e++)u.push(i[e][o]);return u}function A(i){alert(i)}te(()=>{s.election_for_id!==0&&s.election_type_id!==0&&F()});const H=async()=>{L.Inertia.visit(s.states.next_page_url,{method:"get"})},J=async()=>{L.Inertia.visit(s.states.prev_page_url,{method:"get"})},Q=()=>{h.post(route("upload_slw"),{onFinish:()=>h})},X=()=>{_.election_for_id=s.election_for_id,_.election_type_id=s.election_type_id,_.election_month_id=f.config.election_month.id,_.election_year_id=f.config.election_year.id,_.post(route("upload_records"),{onFinish:()=>_})};return s.election_for_id=C("election_for_id")==null?0:C("election_for_id"),s.election_type_id=C("election_type_id")==null?0:C("election_type_id"),s.states=f.states,(i,o)=>{const u=oe("spa");return n(),l(y,null,[g(de),g(ce,{active:"data upload"}),t("div",pe,[fe,s.loading?(n(),se(_e,{key:0})):S("",!0),g(ae,null,{default:E(()=>[t("div",me,[t("div",ge,[t("div",he,[t("span",null,[b(" Total Lga: "),t("i",ye,r(d.config.total_lgas),1),b(" Total Wards: "),t("i",be,r(d.config.total_wards),1)]),s.election_for_id!==0&&s.election_type_id!==0?(n(),l("button",{key:0,onClick:j,class:"btn btn-sm px-4 bg-success text-white"},"Save")):(n(),l("button",ve,"Save"))]),t("ul",we,[xe,t("li",null,[t("ul",ke,[(n(!0),l(y,null,w(s.states.data,e=>(n(),l("li",{key:"s_k"+e.id},[t("a",{href:"#state_"+e.id},r(e.name),9,Se)]))),128))])]),$e,t("li",null,[Ce,B(t("select",{onChange:o[0]||(o[0]=e=>F(e,"eF")),"onUpdate:modelValue":o[1]||(o[1]=e=>s.election_for_id=e),class:"form-control"},[(n(!0),l(y,null,w(d.config.election_for,e=>(n(),l("option",{key:"el"+e.id,value:e.id},r(e.name),9,Ee))),128))],544),[[U,s.election_for_id]])]),t("li",null,[Fe,B(t("select",{onChange:o[2]||(o[2]=e=>F(e,"eT")),"onUpdate:modelValue":o[3]||(o[3]=e=>s.election_type_id=e),class:"form-control"},[(n(!0),l(y,null,w(d.config.election_types,e=>(n(),l("option",{key:"tl"+e.id,value:e.id},r(e.name),9,Ie))),128))],544),[[U,s.election_type_id]])])])]),t("div",Le,[t("input",{type:"text",placeholder:"Search Wards",class:"form-control my-3",onKeyup:o[4]||(o[4]=e=>R(e))},null,32),t("div",Te,[(n(!0),l(y,null,w(s.states.data,e=>(n(),l("div",{key:"s_"+e.id,id:"state_"+e.id},[t("label",Pe,r(e.name)+" State",1),(n(!0),l(y,null,w(e.lgas,p=>(n(),l("div",{class:"lga_container",key:"l_"+p.id,"data-text":[...z(p.wards,"name")]},[t("label",Ne,r(p.name)+" L.G.A ",1),Be,t("table",{title:p.name+", "+e.name+" State",class:"clear-float w-100"},[t("tbody",null,[(n(!0),l(y,null,w(p.wards,(m,k)=>(n(),l("tr",{key:"w"+m.id,id:e.id+"_"+p.id+"_"+m.id},[b(r((e.id+""+p.id+m.id,void 0))+" ",1),t("td",We,[t("span",null,r(k+1)+".",1),t("span",Ke,r(m.name.slice(0,15)),1)]),t("td",Me,[s.election_for_id!==0&&s.election_type_id!==0?(n(),l("input",{key:0,title:"total registered voters",onFocusout:o[5]||(o[5]=a=>D(a)),onFocus:o[6]||(o[6]=a=>T(a)),onKeyup:a=>P(e,p,m,a),type:"number",min:"0",class:"form-control r_voters"},null,40,Oe)):(n(),l("input",{key:1,tabindex:"1",onClick:o[7]||(o[7]=a=>A("Select Election Type and Election For to Open this fields")),title:"total registered voters",disabled:"",type:"number",min:"0",class:"form-control"}))]),t("td",Re,[s.election_for_id!==0&&s.election_type_id!==0?(n(),l("input",{key:0,title:"total supporters",onFocusout:o[8]||(o[8]=a=>D(a)),onFocus:o[9]||(o[9]=a=>T(a)),onKeyup:a=>P(e,p,m,a),type:"number",min:"0",class:"form-control r_supports"},null,40,Ge)):(n(),l("input",{key:1,onClick:o[10]||(o[10]=a=>A("Select Election Type and Election For to Open this fields")),title:"total registered Supporters ",disabled:"",type:"number",min:"0",class:"form-control"}))])],8,Ve))),128))])],8,Ue)],8,Ae))),128))],8,De))),128))]),t("div",je,[d.states.prev_page_url!==null?(n(),l("button",{key:0,onClick:J,class:"btn bg-light mx-1 shadow"},"Prev")):(n(),l("button",qe,"Prev")),d.states.next_page_url!==null?(n(),l("button",{key:2,onClick:H,class:"btn bg-light mx-1 shadow"},"Next")):(n(),l("button",ze,"Next")),g(u,null,{default:E(()=>[b(" From State "+r(d.states.from)+" to "+r(d.states.to)+" of "+r(d.states.total),1)]),_:1})])]),t("div",He,[i.$page.props.auth.user?(n(),l("div",Je,[i.$page.props.auth.user.role=="admin"?(n(),l("div",Qe,[t("form",{onSubmit:V(Q,["prevent"]),enctype:"multipart/form-data"},[t("div",null,[g(M,{for:"state_lga_ward",value:"State Lga Ward File"}),t("input",{id:"state_lga_ward",onInput:o[11]||(o[11]=e=>c(h).state_lga_ward=e.target.files[0]),type:"file",class:"form-control mt-1 block w-full"},null,32),c(h).progress?(n(),l("progress",{key:0,value:c(h).progress.percentage,max:"100"},r(c(h).progress.percentage)+"% ",9,Ye)):S("",!0),g(K,{class:"mt-2",message:c(h).errors.state_lga_ward},null,8,["message"])]),t("div",Ze,[g(O,{class:W(["ml-4",{"opacity-25":c(h).processing}]),disabled:c(h).processing},{default:E(()=>[b(" Upload States Lgas Wards ")]),_:1},8,["class","disabled"])])],40,Xe),t("form",{class:"mt-5",onSubmit:V(X,["prevent"]),enctype:"multipart/form-data"},[t("div",null,[g(M,{for:"records",value:"State Lga Ward File"}),g(re,{id:"records",type:"file",class:"form-control mt-1 block w-full",onInput:o[12]||(o[12]=e=>c(_).records=e.target.files[0])}),c(_).progress?(n(),l("progress",{key:0,value:c(_).progress.percentage,max:"100"},r(c(_).progress.percentage)+"% ",9,tt)):S("",!0),g(K,{class:"mt-2",message:c(_).errors.records},null,8,["message"])]),ot,t("div",st,[g(O,{class:W(["ml-4",{"opacity-25":c(_).processing}]),disabled:c(h).processing},{default:E(()=>[b(" Upload Record ")]),_:1},8,["class","disabled"])])],40,et)])):S("",!0)])):S("",!0)])])]),_:1})])],64)}}},gt=ue(it,[["__scopeId","data-v-9571dabe"]]);export{gt as default};
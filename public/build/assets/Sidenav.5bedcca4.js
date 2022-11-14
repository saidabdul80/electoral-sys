import{d as u,o as n,c as g,b as a,a as h,w as e,u as t,L as s,i as c,n as i,k as d,j as f}from"./app.daa648c9.js";const b={class:"header bg_primary",id:"header"},k=a("div",{class:"header_toggle"},[a("i",{class:"bi bi-justify text-danger",id:"header-toggle"})],-1),y=a("div",{class:"header_img"},[a("i",{class:"bi bi-person-fill text-white h1 bg-dark",id:"header-toggle"})],-1),C=[k,y],ta={__name:"Header",setup(l){u(()=>{$("#header-toggle").click(function(){let _=document.getElementById("nav-bar"),v=$("#body-pd"),m=document.getElementById("header");_.classList.toggle("show"),$(".nav_name").toggleClass("hidename"),$(".nav_ico").toggleClass("ico-org"),v.toggleClass("body-pd"),m.classList.toggle("body-pdx")});const r=document.querySelectorAll(".nav_link");function p(){r&&(r.forEach(_=>_.classList.remove("active")),this.classList.add("active"))}r.forEach(_=>_.addEventListener("click",p))});var o=[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));return o.map(function(r){return new bootstrap.Tooltip(r)}),(r,p)=>(n(),g("header",b,C))}},S={class:"l-navbar bg-dark p-0",id:"nav-bar"},E={class:"nav"},L=a("i",{class:"bx bx-layer nav_logo-icon"},null,-1),x=a("span",{style:{"font-size":"1.4em"},class:"nav_logo-name"},[f("ECMS "),a("i",{class:"bi bi-megaphone-fill text-white"})],-1),V={class:"nav_list pr-2"},w=a("i",{class:"nav_ico ico-org bi-speedometer2 h5 pl-2"},null,-1),A=a("span",{class:"nav_name hidename"},"Dashboard",-1),B=a("i",{class:"nav_ico ico-org bi-stack h5 pl-2"},null,-1),M=a("span",{class:"nav_name hidename"},"Area List",-1),T=a("i",{class:"nav_ico ico-org bi-person-bounding-box h5 pl-2"},null,-1),D=a("span",{class:"nav_name hidename"},"Users Management",-1),N=a("i",{class:"nav_ico ico-org bi-people-fill h5 pl-2"},null,-1),P=a("span",{class:"nav_name hidename"},"Voter Database",-1),j=a("i",{class:"nav_ico ico-org bi-people-fill h5 pl-2"},null,-1),q=a("span",{class:"nav_name hidename"},"Team",-1),z=a("i",{class:"nav_ico ico-org bi-calendar-plus h5 pl-2"},null,-1),I=a("span",{class:"nav_name hidename"},"Event",-1),H=a("i",{class:"nav_ico ico-org bi-stack h5 pl-2"},null,-1),O=a("span",{class:"nav_name hidename"},"Campaign Analysis",-1),U=a("i",{class:"nav_ico ico-org bi-wallet-fill h5 pl-2"},null,-1),F=a("span",{class:"nav_name hidename"},"Expenses",-1),G=a("i",{class:"nav_ico ico-org bi-chat-right-dots-fill h5 pl-2"},null,-1),J=a("span",{class:"nav_name hidename"},"Chats",-1),K=a("i",{class:"nav_ico ico-org bi-envelope-fill h5 pl-2"},null,-1),Q=a("span",{class:"nav_name hidename"},"SMS",-1),R=a("i",{class:"nav_ico ico-org bi-gear h5 pl-2"},null,-1),W=a("span",{class:"nav_name hidename"},"Settings",-1),X=a("i",{class:"nav_ico ico-org bi-stack h5 pl-2"},null,-1),Y=a("span",{class:"nav_name hidename"},"Profile",-1),Z=a("i",{class:"nav_ico ico-org bi bi-box-arrow-in-right h5 pl-2 nav_icon"},null,-1),aa=a("span",{class:"nav_name hidename"},"SignOut",-1),sa={__name:"Sidenav",props:["active"],setup(l){return(o,r)=>(n(),g("div",S,[a("nav",E,[a("div",null,[h(t(s),{href:"#",class:"nav_logo bg_primary",style:{padding:"14.6px 10px"}},{default:e(()=>[L,x]),_:1}),a("div",V,[o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:0,href:"/xdashboard","data-toggle":"tooltip","data-placement":"top",title:"Dashboard",class:i(["nav_link",l.active=="Dashboard"?"active":""])},{default:e(()=>[w,A]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:1,href:"area_list","data-toggle":"tooltip","data-placement":"top",title:"Area List",class:i(["nav_link",l.active=="Area"?"active":""])},{default:e(()=>[B,M]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:2,href:"volunteer_management","data-toggle":"tooltip","data-placement":"top",title:"Volunteers",class:i(["nav_link",l.active=="Volunteer"?"active":""])},{default:e(()=>[T,D]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:3,href:"voter_database","data-toggle":"tooltip","data-placement":"top",title:"Voters",class:i(["nav_link",l.active=="Voter"?"active":""])},{default:e(()=>[N,P]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:4,href:"team","data-toggle":"tooltip","data-placement":"top",title:"Teams",class:i(["nav_link",l.active=="Team"?"active":""])},{default:e(()=>[j,q]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:5,href:"event","data-toggle":"tooltip","data-placement":"top",title:"Events",class:i(["nav_link",l.active=="Event"?"active":""])},{default:e(()=>[z,I]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:6,href:"campaign_analysis","data-toggle":"tooltip","data-placement":"top",title:"Campaign Analysis",class:i(["nav_link",l.active=="Campaign"?"active":""])},{default:e(()=>[H,O]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:7,href:"expenses","data-toggle":"tooltip","data-placement":"top",title:"Expenses",class:i(["nav_link",l.active=="Expenses"?"active":""])},{default:e(()=>[U,F]),_:1},8,["class"])):d("",!0),h(t(s),{href:"chats","data-toggle":"tooltip","data-placement":"top",title:"Chart",class:i(["nav_link",l.active=="Chats"?"active":""])},{default:e(()=>[G,J]),_:1},8,["class"]),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:8,href:"sms","data-toggle":"tooltip","data-placement":"top",title:"SMS",class:i(["nav_link",l.active=="SMS"?"active":""])},{default:e(()=>[K,Q]),_:1},8,["class"])):d("",!0),o.$page.props.auth.user.role=="admin"?(n(),c(t(s),{key:9,href:"settings","data-toggle":"tooltip","data-placement":"top",title:"Settings",class:i(["nav_link",l.active=="Settings"?"active":""])},{default:e(()=>[R,W]),_:1},8,["class"])):d("",!0),h(t(s),{href:"profile","data-toggle":"tooltip","data-placement":"top",title:"Profile",class:i(["nav_link",l.active=="Profile"?"active":""])},{default:e(()=>[X,Y]),_:1},8,["class"]),h(t(s),{href:o.route("logout"),method:"get",class:"nav_link"},{default:e(()=>[Z,aa]),_:1},8,["href"])])])])]))}};export{ta as _,sa as a};

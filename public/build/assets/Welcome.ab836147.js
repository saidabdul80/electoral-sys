import{o as e,c as a,a as c,u as s,b as o,i as d,w as n,F as g,k as l,j as r,t as h,H as p,L as i}from"./app.daa648c9.js";const y={class:"min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"},m={class:"relative flex items-top justify-center",style:{height:"70px"}},f={key:0,class:"hidden fixed top-0 right-0 px-6 py-4 sm:block"},k={key:0},_={key:0},x={class:"alert alert-success text-center"},v={key:0},b={key:1},V={__name:"Welcome",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String},setup(u){return(t,B)=>(e(),a(g,null,[c(s(p),{title:"Welcome"}),o("div",y,[o("div",m,[u.canLogin?(e(),a("div",f,[t.$page.props.auth.user?(e(),a("div",k,[t.$page.props.auth.user.role=="admin"?(e(),d(s(i),{key:0,href:t.route("dashboard"),class:"text-sm text-gray-700 dark:text-gray-500 underline"},{default:n(()=>[r("Dashboard")]),_:1},8,["href"])):(e(),d(s(i),{key:1,href:t.route("data-upload"),class:"btn-secondary btn text-sm text-gray-700 dark:text-gray-500 underline"},{default:n(()=>[r("Upload Data")]),_:1},8,["href"]))])):(e(),a(g,{key:1},[c(s(i),{href:t.route("login"),class:"text-sm text-gray-700 dark:text-gray-500 underline"},{default:n(()=>[r("Log in")]),_:1},8,["href"]),u.canRegister?(e(),d(s(i),{key:0,href:t.route("register"),class:"ml-4 text-sm text-gray-700 dark:text-gray-500 underline"},{default:n(()=>[r("Register")]),_:1},8,["href"])):l("",!0)],64))])):l("",!0)]),t.$page.props.auth.user?(e(),a("div",_,[o("div",null,[o("div",x,[r("Hi "),o("b",null,h(t.$page.props.auth.user.first_name),1),r(", You Are Currently Logged In")])]),t.$page.props.auth.user.role==="admin"?(e(),a("div",v)):(e(),a("div",b))])):l("",!0)])],64))}};export{V as default};

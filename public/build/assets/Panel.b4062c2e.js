import{o as n,c as i,a as s,u as r,b as e,p as a,t as u,w as l,e as d,F as h,H as c,L as o}from"./app.920806ef.js";/* empty css                      *//* empty css                                              */const p={class:"sm:items-center sm:pt-0"},g={class:"relative flex items-top justify-center"},f={key:0},m={key:0},_={class:"navMenu w-100"},b={class:"badge rouned alert alert-success text-center"},y={class:"menuCox"},k={key:1},L={__name:"Panel",props:{canLogin:Boolean,canRegister:Boolean,laravelVersion:String,phpVersion:String},setup(x){return(t,v)=>(n(),i(h,null,[s(r(c),{title:"Welcome"}),e("div",p,[e("div",g,[t.$page.props.auth.user?(n(),i("div",f,[t.$page.props.auth.user.role==="admin"?(n(),i("div",m,[e("ul",_,[e("li",null,[e("div",b,[a("Hi "),e("b",null,u(t.$page.props.auth.user.first_name),1),a(",")])]),e("ul",y,[e("li",null,[s(r(o),{href:t.route("dashboard"),class:"text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100"},{default:l(()=>[a("Dashboard")]),_:1},8,["href"])]),e("li",null,[s(r(o),{href:t.route("data-upload"),class:"text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100"},{default:l(()=>[a("Upload Data")]),_:1},8,["href"])]),e("li",null,[s(r(o),{href:t.route("register"),class:"text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100"},{default:l(()=>[a("Register")]),_:1},8,["href"])]),e("li",null,[s(r(o),{href:t.route("logout"),method:"post",class:"text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100"},{default:l(()=>[a("Logout")]),_:1},8,["href"])])])])])):(n(),i("div",k,[e("ul",null,[e("li",null,[s(r(o),{href:t.route("data-upload"),class:""},{default:l(()=>[a("Upload Data")]),_:1},8,["href"])]),e("li",null,[s(r(o),{href:t.route("logout"),method:"post",class:""},{default:l(()=>[a("Logout")]),_:1},8,["href"])])])]))])):d("",!0)])])],64))}};export{L as default};
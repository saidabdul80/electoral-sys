<template>
  <header class="header bg_primary" id="header">
    <div class="header_toggle">
      <i class="bi bi-justify text-danger" id="header-toggle"></i>
    </div>
    
    <a href="#" class="notification">            
        <i v-if="route().current() =='chats'" class="bi bi-envelope-paper-fill text-primary"></i>
        <i v-else class="bi bi-envelope-paper-fill text-white"></i>
        <span class="badge">{{data.count}}</span>
    </a>

    <div class="header_img " >
        <i class="bi bi-person-fill text-white h1 bg-dark" id="header-toggle"></i>
    </div>
  </header> 
</template>

<script setup>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';


const props = defineProps({
  currentUser:Object,
  selected: Number
});

const data = reactive({
  count:0
});

onMounted(() => {        
      
window.Echo.private('chat') 
  .listen('MessageSent', (e) => {              
    if(e.messageTo.id == window.authUser.id || e.user.id == window.authUser.id ){   
        updateStatus()
    }
}); 
  
$("#header-toggle").click(function(){
       let nav = document.getElementById("nav-bar"),
         bodypd = $("#body-pd"),
        headerpd = document.getElementById("header");
        nav.classList.toggle("show");
        $('.nav_name').toggleClass('hidename')
        $('.nav_ico').toggleClass('ico-org')
        //$(this).toggle("bx-x");

        // add padding to body
        bodypd.toggleClass("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pdx");        
    })    
 
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    // Your code to run since DOM is loaded and ready
  });
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
updateStatus(); 
async function updateStatus(){         
    let response =  await axios.post('/fetch_status',{from_user_id: window.authUser.id,selected:props.selected});        
    data.count = response.data;    
} 



</script>
<style>
.notification {
  
  color: white;
  text-decoration: none;
  font-size: 1.2em;
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.notification .badge {
  position: absolute;
  top: -4px;
  right: -10px;
  font-size: 0.5em;
  display: flex;
  border-radius: 50%;
  background: rgb(182, 53, 1);
  color: white;
}
</style>
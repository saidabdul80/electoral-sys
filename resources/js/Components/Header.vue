<template>
  <header class="header bg_primary" id="header">
    <div class="header_toggle">
      <i class="bi bi-justify text-danger" id="header-toggle"></i>
    </div>
    <div class="header_img">
        <i class="bi bi-person-fill text-white h1 bg-dark" id="header-toggle"></i>
    </div>
  </header>
</template>

<script setup>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
onMounted(() => {        
      
$("#header-toggle").click(function(){
       let nav = document.getElementById("nav-bar"),
         bodypd = $("#body-pd"),
        headerpd = document.getElementById("header");
        nav.classList.toggle("show");
        $('.nav_name').toggleClass('hidename')
        $('.nav_ico').toggleClass('ico-org')
        // change icon 
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
</script>
  
<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";
defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  voluteers:Number,
    voters:Number,
    events:Number,
    states:Number,
    states:Number,
    states:Number,
    unread:Number,
});
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active="Dashboard"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Main Components</h4>      
    </div>
    <div class="row">
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Voter</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{voters}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Event</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{events}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">State</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{states}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">State</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{states}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">State</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{states}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Unread Chats</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{unread}}</h5>
                <i></i>
            </div>
        </div>
       
    </div>
  </div>
</template>
<style scoped>
.h3{
    height:140px;
}
</style>
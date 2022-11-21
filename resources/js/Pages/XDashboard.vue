<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";

defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  volunteers:Number,
    voters:Number,
    events:Number,
    states:Number,
    lgas:Number,
    areas:Number,
    wards:Number,
    unread:Number,
    partyMembers:Number,
    committeeMembers:Number,    
}); 

</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active="Dashboard"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
        <Link href="/dashboard"  style="padding:14.6px 10px;">
          <i class="bx bx-layer nav_logo-icon"></i><button class="btn btn-dark">Goto Dashboard 2</button>          
      </Link>         
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
            <div class="py-3 bg-info text-white text-center h4 m-0">Volunteers</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{Volunteers}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Party Members</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{partyMembers}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2"> 
            <div class="py-3 bg-info text-white text-center h4 m-0">Party Members</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{committeeMembers}}</h5>
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
            <div class="py-3 bg-info text-white text-center h4 m-0">L.G.A</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{lgas}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Wards</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{wards}}</h5>
                <i></i>
            </div>
        </div>
        <div class="col-md-3 p-0 mt-3 px-2">
            <div class="py-3 bg-info text-white text-center h4 m-0">Areas</div>
            <div class="text-info d-flex align-items-center justify-center bg-white m-0 h3">
                <h5>{{areas}}</h5>
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
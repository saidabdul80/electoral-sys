<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import HEADER from './../Components/Header.vue';
import SIDENAV from './../Components/Sidenav.vue';
import './../../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
})
</script>
<template>
    <HEADER></HEADER>
    <SIDENAV active="Profile"></SIDENAV>
    <div class="height-100 bg-light" id="body-pd">
        <div class="p-3 d-flex align-items-center"><i class="bi bi-stack"></i><h4 class="ml-3 my-0">Profiles</h4>
    </div></div>
</template>
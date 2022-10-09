<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
})
</script>

<template>
    <Head title="Welcome" />
    <div class=" min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div class="relative flex items-top justify-center" style="height:70px;">
            <div v-if="canLogin" class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                <div v-if="$page.props.auth.user">
                    <Link v-if="$page.props.auth.user.role=='admin'" :href="route('dashboard')" class="text-sm text-gray-700 dark:text-gray-500 underline">Dashboard</Link>                
                    <Link v-else :href="route('data-upload')" class="btn-secondary btn text-sm text-gray-700 dark:text-gray-500 underline">Upload Data</Link>                
                </div>

                <template v-else>
                    <Link :href="route('login')" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</Link>

                    <Link v-if="canRegister" :href="route('register')" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</Link>
                </template>
            </div> 
        </div>
        <div v-if="$page.props.auth.user">                
            <div>
                <div class="alert alert-success text-center">Hi <b>{{$page.props.auth.user.first_name}}</b>, You Are Currently Logged In</div>
            </div>
            <div v-if="$page.props.auth.user.role==='admin'"></div>            
            <div v-else></div>            
        </div>
    </div>
</template>

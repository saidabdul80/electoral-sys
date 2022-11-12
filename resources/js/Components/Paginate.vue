<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/inertia-vue3';

const props = defineProps(['next', 'prev']);
</script>

<template>
    <div>
        <Link v-if="prev" :href="prev" class="btn btn-dark text-white px-3 py-2">Prev</Link>
        <button v-else disabled="disabled" :href="next" class="btn btn-dark text-white px-3 py-2 ml-1">Prev</button>
        <Link v-if="next" :href="next" class="btn btn-dark text-white px-3 py-2 ml-1">Next</Link>
        <button v-else disabled="disabled" :href="next" class="btn btn-dark text-white px-3 py-2 ml-1">Next</button>
    </div>    
</template>


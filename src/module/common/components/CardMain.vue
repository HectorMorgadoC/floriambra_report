<template>
    <div class="w-200 max-w-2xl h-full bg-[#3d3b46] p-6 sm:w-screen p-8 md:p-8 shadow-md hover:bg-[#575463] overflow-hidden break-words">     
        <RouterLink :to="{ name: router }" >
            <h3 
            class="mb-5 block text-4xl font-extrabolt text-[#FC3B47] mb-1"
            >{{ title }}</h3>
            <p class="text-[#EEE0D3] font-medium text-xl pb-xl">
                {{ message }}
            </p>
        </RouterLink>
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title: string,
    message: string,
    router: string
}>()

const title = ref<string>(props.title);
const message = ref<string>(props.message);
const router = ref<string>(props.router);

</script>
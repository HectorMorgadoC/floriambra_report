<template>
    <div
        class="w-[500px] h-[320px] bg-[#3d3b46] p-6 shadow-md hover:bg-[#575463] overflow-hidden break-words flex flex-col justify-between"
    >
        <RouterLink :to="{ name: router }" class="h-full">
            <h3 class="text-2xl font-extrabold text-[#FC3B47] mb-2 truncate">
                {{ title }}
            </h3>
            <p class="text-[#EEE0D3] font-medium text-base overflow-hidden text-ellipsis">
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
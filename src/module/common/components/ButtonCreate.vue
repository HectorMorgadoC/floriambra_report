<template>
    <div class="flex flex-col items-center gap-4 mb-8 lg:flex-row lg:justify-between">
        <div class="">
            <p class="text-[#EEE0D3] text-3xl lg:ml-20">{{ title }}</p>
        </div>
        <div class="bg-[#FC3B47] text-[#EEE0D3] text-xl py-4 px-5 lg:mr-20 font-semibold hover:bg-[#F2564F] transition">
            <RouterLink :to="{name: patch}">{{ titleButton }}</RouterLink>
        </div>
    </div>
    
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    title_button: string
    patch: string
}>()

const title = props.title
const titleButton = props.title_button
const patch = props.patch
</script>
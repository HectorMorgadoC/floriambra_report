<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div v-if="!isEditMode" class="flex flex-col items-center w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 class="block text-3xl font-medium text-[#F3ECDE] mb-1 pb-3">{{ props.title }}</h3>
            <div class="flex flex-rows items-center ">
                <button
                    v-if="state_aproval_production"
                    @click="routeUpdate"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"> Modificar </button>
                <button
                    @click="routeApproval"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"> Aprobar </button>
                <button 
                    v-if="state_router_delete && state_aproval_production"
                    @click="routeDelete"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition">Eliminar</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import router from '../../../router';

const props = defineProps<{
    title: string
    data:{}
    router_update: string
    router_delete: string
    router_approval: string
    state_router_delete: boolean
    state_aproval_production: boolean
}>()

let isEditMode = ref<Boolean>(false);

const routeDelete = () => {
    router.replace({name: props.router_delete})
}

const routeApproval= () => {
    router.replace({name: props.router_approval})
}

const routeUpdate = () => {
    router.replace({name: props.router_update})
}

/*
// Maneja la acción del primer botón
const handlePrimaryAction = () => {
  ;
}
<div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">


*/
</script>
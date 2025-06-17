<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div v-if="!isEditMode" class="flex flex-col items-center w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 class="block text-3xl font-medium text-[#F3ECDE] mb-1 pb-3">{{ props.title }}</h3>
            <div class="flex flex-rows items-center ">
                <button @click="" class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"> Modificar </button>
                <button @click="" class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"> Aprobar </button>
                <button @click="selectItem(props.data)" class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition">Eliminar</button>
            </div>
        </div>
        <div v-else>
            <DeleteItem 
            title="Desea Eliminar usuario" 
            :data="props.data"
            @cancel="deleteAction" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DeleteItem from '../module/common/components/DeleteItem.vue';


const props = defineProps<{
    title: String
    data:{}
}>()

let selectedItem = ref<any>({});
let isEditMode = ref<Boolean>(false);

const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
}

const deleteAction = () => {
    isEditMode.value = false
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
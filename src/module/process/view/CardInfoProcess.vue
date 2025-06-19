<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-stretch content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
        >
        <ul  class="w-full max-w-lg flex flex-col justify-start items-start p-8 text-1xl text-[#EEE0D3] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words sm:w-screen p-8 h-full min-h-[200px]">
            <button @click="selectItem(item)" class="text-left">
                <div v-for="[key, value] in Object.entries(item)" :key="key" class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">{{ key }}:</span> <span class="break-all">{{ value }}</span>
                </div>
            </button>
            
        </ul>
    </li>
    </div>
    <div v-else>
        <ActionPanel 
            :title="selectedItem.name" 
            :data="selectedItem"
            router_delete="deleteProcess"
            router_update="updateProcess"
            :state_router_delete=true
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from '../../common/components/ActionPanel.vue';
import { useProcessItemStore } from '../stores/process.store';
import type { Process } from '../interface/process.interface';


const processStore = useProcessItemStore()

const props = defineProps<{
    data_list: Process[]
}>()


const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);


const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
    processStore.setProcessItem(item)
}

</script>
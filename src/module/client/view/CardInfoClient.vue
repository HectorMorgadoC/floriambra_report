<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-stretch content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
        :key="item.id"
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
            :title="selectedItem.username" 
            :data="selectedItem"
            router_delete="deleteClient"
            router_update="updateClient"
            :state_router_delete=false
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from '../../common/components/ActionPanel.vue';
import type { Client } from '../../auth/interfaces/client.interface';
import { useClientItemStore } from '../stores/client.store';


const clientstore = useClientItemStore()

const props = defineProps<{
    data_list: Client[]
}>()


const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);


const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
    clientstore.setClientItem(item)
}

</script>
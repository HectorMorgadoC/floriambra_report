<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-stretch content-center list-none mt-10">
        <li 
        v-for="item of listOrderView" 
        :key="item.id"
        >
        <ul class="w-full max-w-lg flex flex-col justify-start items-start p-8 text-1xl text-[#EEE0D3] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words sm:w-screen p-8 h-full min-h-[200px] ">
            <button @click="selectItem(item)">
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Numero de orden: </span> 
                    <span class="break-all">{{ item.id }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Fecha de creacion: </span> 
                    <span class="break-all">{{ item.date.slice(0,10) }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Descripcion: </span> 
                    <span class="break-all">{{ item.description }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Progreso: </span> 
                    <span class="break-all">{{ progresTraslate(item.state) }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Creador: </span> 
                    <span class="break-all">{{ item.client }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Equipo: </span> 
                    <span class="break-all">{{ item.team }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Observacion: </span> 
                    <span class="break-all">{{ item.observation }}</span>
                </div>
            </button>
        </ul>
    </li>
    </div>
    <div v-else>
        <ActionPanel 
            :title="actionPanelTitle" 
            :data="selectedItem"
            router_delete="deleteOrder"
            router_update="updateOrder"
            :state_router_delete=false
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from '../../common/components/ActionPanel.vue';
import type { Order } from '../interface/orders.interface';
import { useOrderItemStore } from '../stores/order.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { OrderState } from '../interface/orderState.interface';

const client = useClientStorage()
const orderStore = useOrderItemStore()

const props = defineProps<{
    data_list: Order[]
}>()

const listOrderView = ref<Order[]>([])

if ( client.client.value?.access_level !== AccessLevel.admin ) {
    props.data_list.map( value => {
        if(value.state != OrderState.Culminado) listOrderView.value.push(value);
    })
} else {
    listOrderView.value = props.data_list;
}

const emit = defineEmits(["onStatusMenu"])
const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);
const actionPanelTitle = ref<string>('');

const progresTraslate = (item: OrderState) => {
    if(item === OrderState.Esperando) return "Esperando" 
    if(item === OrderState.Progresando) return"Progresando"
    if(item === OrderState.Culminado) return "Culminado"
}

const selectItem = (item: Order) => {
    if(client.client.value?.access_level !== AccessLevel.operator && client.client.value?.access_level !== AccessLevel.technical ) {
        selectedItem.value = item;
        actionPanelTitle.value = `Orden: ${selectedItem.value.id}`;
        isEditMode.value = true;
        orderStore.setOrderItem(item)
        emit("onStatusMenu",isEditMode.value);
    }
    
}

</script>
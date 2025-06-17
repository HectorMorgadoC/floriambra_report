<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-4 pb-2 text-center">{{ orderStore.orderItem.id}}</h3>
            
            <div class="w-full text-[#EEE0D3] text-justify text-1xl mb-6">
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Numero de orden: </span> 
                    <span class="break-all">{{ orderStore.orderItem.id }}</span>
                </div>
                <div class="my-2 pl-2 text-justify"> 
                    <span class="font-medium text-[#FC3B47]">Descripcion: </span> 
                    <span class="break-all">{{ orderStore.orderItem.description }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Creador: </span> 
                    <span class="break-all">{{ orderStore.orderItem.client }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Equipo: </span> 
                    <span class="break-all">{{ orderStore.orderItem.team }}</span>
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button
                @click="deleteOrderForId"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    Sí
                </button>
                <button
                    @click="denyOrderDeletion"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '../../../router';
import { useToast } from 'vue-toastification';
import { useOrderItemStore } from '../stores/order.store';
import { deleteOrder } from '../action/deleteOrder.action';


const orderStore = useOrderItemStore()
const orderId = orderStore.orderItem.id
const toast = useToast()


const deleteOrderForId = async() => {
    try {
        const response = await deleteOrder(orderId);

        if("code" in response) {
            if(response.code === 200) {
                toast.success("Orden eliminada con exito")
                router.replace({name: "order"})
            }
        } else {
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }
                
            if(response.statusCode === 400 ) {
                toast.warning(`Bad request ${response.message}`)
            }
                
            if(response.statusCode === 403 || response.statusCode === 401) {
                toast.error("Not authorized")
                router.replace({ name: 'login' });
            }

            if(response.statusCode === 0 || response.statusCode === 500) {
                router.replace({ name: 'ServerError' });
            }
        }
    } catch (err) {
        toast.error("Request error")
    }
}

const denyOrderDeletion = () => {
    router.replace({name: "order"})
}

</script>
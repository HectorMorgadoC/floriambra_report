<template>
    <ButtonCreate title="Clientes" title_button="Crear cliente" patch="createClient"/>
    <div v-if="!statusCard"
        class="flex flex-col items-center justify-center min-h-[200px]"   
    >
        <button 
        @click="getListClient"
    class="text-3xl text-[#EEE0D3] p-3 mt-4 font-semibold "
    >Ver clientes</button>
    </div>
    <CardInfoClient v-else :data_list=listClient title="username" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonCreate from "../../common/components/ButtonCreate.vue"
import type { Client } from "../../auth/interfaces/client.interface";
import { getClient } from "../action/getClient.action";
import { useToast } from "vue-toastification";
import router from "../../../router";
import CardInfoClient from "../view/CardInfoClient.vue";


const statusCard = ref<boolean>(false);
const listClient = ref<Client[]>([]);
const toast = useToast()

const getListClient = async () => {
    try {
        const response = await getClient();
        if (Array.isArray(response)) {
            listClient.value = response;
            statusCard.value = true;
        }
        
        if ("statusCode" in response) {
            console.log(response.statusCode)
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }

            if(response.statusCode === 403 ) {
                toast.error("Not authorized")
                router.replace({ name: 'login' });
            }
            
            if(response.statusCode === 0 || response.statusCode === 500) {
                router.replace({ name: 'ServerError' });
            }
        }

    } catch (error) {
        toast.error("Request error")
    }
    
}
</script>
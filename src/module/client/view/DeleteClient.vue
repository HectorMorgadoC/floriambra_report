<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-4 pb-2 text-center">{{ clientStore.clientItem.username }}</h3>
            <div class="w-full text-[#EEE0D3] text-justify text-lg mb-6">
                <div class="my-2 pl-2 text-left">
                    <span class="font-medium text-[#FC3B47]">ID:</span> <span class="break-all">{{ clientStore.clientItem.id }}</span>
                </div>
                <div class="my-2 pl-2 text-left">
                    <span class="font-medium text-[#FC3B47]">Cliente:</span> <span class="break-all">{{ clientStore.clientItem.username }}</span>
                </div>
                <div class="my-2 pl-2 text-left">
                    <span class="font-medium text-[#FC3B47]">Nivel de acceso:</span> <span class="break-all">{{ translatedAccessLevel(clientStore.clientItem.access_level) }}</span>
                </div>
                <div class="my-2 pl-2 text-left">
                    <span class="font-medium text-[#FC3B47]">Correo:</span> <span class="break-all">{{ clientStore.clientItem.email }}</span>
                </div>
                <div class="my-2 pl-2 text-left">
                    <span class="font-medium text-[#FC3B47]">Proceso:</span> <span class="break-all">{{ clientStore.clientItem.process }}</span>
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button
                @click="deleteClientForId"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    Sí
                </button>
                <button
                    @click="denyClientDeletion"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UUIDTypes } from 'uuid';
import { deleteClient } from '../action/deleteClient.action';
import { useClientItemStore } from '../stores/client.store';
import router from '../../../router';
import { useToast } from 'vue-toastification';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';


const clientStore = useClientItemStore()
const clientId = clientStore.clientItem.id
const toast = useToast()

const translatedAccessLevel = (access_level: AccessLevel ) => {
    switch (access_level) {
        case AccessLevel.operator:
            return "operador"
        case AccessLevel.technical:
            return "tecnico"
        case AccessLevel.production_supervisor:
            return "supervisor de produccion"
        case AccessLevel.technical_supervisor:
            return "supervisor tecnico"
        case AccessLevel.admin:
            return "adminsitrador"
        default:
            break;
    }
}

const deleteClientForId = async() => {
    try {
        const response = await deleteClient(clientId as UUIDTypes);

        if("code" in response) {
            if(response.code === 200) {
                toast.success("Cliente eliminado con exito")
                router.replace({name: "menu"})
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

const denyClientDeletion = () => {
    router.replace({name: "client"})
}

</script>
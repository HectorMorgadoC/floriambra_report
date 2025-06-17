<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-4 pb-2 text-center">{{ processStore.processItem.name }}</h3>
            
            <div class="w-full text-[#EEE0D3] text-justify text-2xl mb-6">
                <p v-for="[key, value] in Object.entries(processStore.processItem)" :key="key" class="my-2 px-8">
                    {{ key }}: {{ value }}
                </p>
            </div>

            <div class="flex justify-center gap-4">
                <button
                @click="deleteProcessForId"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    Sí
                </button>
                <button
                    @click="denyProcessDeletion"
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
import { deleteProcess } from '../action/deleteTeam.action';
import { useProcessItemStore } from '../stores/team.store';
import router from '../../../router';
import { useToast } from 'vue-toastification';
import { updateListProcess } from '../action/updateListTeam';


const processStore = useProcessItemStore()
const processId = processStore.processItem.id
const toast = useToast()


const deleteProcessForId = async() => {
    try {
        const response = await deleteProcess(processId as UUIDTypes);

        if("code" in response) {
            if(response.code === 200) {
                await updateListProcess();
                toast.success("Process successfully eliminated")
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

const denyProcessDeletion = () => {
    router.replace({name: "process"})
}

</script>
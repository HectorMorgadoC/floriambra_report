<template>
    <ButtonCreate title="Equipo" title_button="Crear equipo" patch="createTeam"/>
    <div v-if="!statusCard"
        class="flex flex-col items-center justify-center min-h-[200px]"   
    >
        <button 
        @click="getListTeam"
    class="text-3xl text-[#EEE0D3] p-3 mt-4 font-semibold "
    >Ver equipos</button>
    </div>
    <CardInfoTeam :data_list=listTeam title="team" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonCreate from "../../common/components/ButtonCreate.vue"
import CardInfoTeam from "../view/CardInfoTeam.vue";
import type { Team } from "../interface/team.interface";
import { getTeam } from "../action/getTeam.action";
import router from "../../../router";
import { useToast } from "vue-toastification";

const statusCard = ref<boolean>(false);
const listTeam = ref<Team[]>([]);
const toast = useToast()

const getListTeam = async () => {
    try {
        const response = await getTeam();
        if (Array.isArray(response)) {
            listTeam.value = response;
            statusCard.value = true;
        }
        
        if ("statusCode" in response) {
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


//listTeam.value = clientStore.client.value?.teams || []


</script>
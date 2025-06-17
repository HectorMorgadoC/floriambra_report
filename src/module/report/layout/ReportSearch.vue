<template>
    <ButtonCreate v-if="hasButtonCreate" title="Reportes" title_button="Crear reporte" patch="createReport"/>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div v-if="!onMenu">
            <form @submit.prevent="getListReport" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Busqueda de reportes de trabajo</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo
                </label>
                <select
                v-model="ReportForm.team"
                name="process" 
                id="process"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un equipo</option>
                    <option 
                    v-for="(team, index) in listTeam"
                    :key="index"
                    :value="team.id"
                    >
                        {{ team.name }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <select
                v-model="ReportForm.client"
                name="client" 
                id="client"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un cliente</option>
                    <option 
                    v-for="(client, index) in listClient"
                    :key="index"
                    :value="client.id"
                    >
                        {{ client.username }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de creacion
                </label>
                <input
                    v-model="ReportForm.date"
                    type="datetime-local"
                    id="date"
                    name="date"
                    placeholder="Ingrese la fecha de creacion"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Consultar
            </button>
        </form>
        </div>
        
        <div class="flex gap-[20px] flex-row flex-wrap justify-center items-center content-center list-none mt-10">
            <div v-if="!onStatus" >
                <h3 class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1">No hay registro</h3>
            </div>
            <CardInfoReport v-else 
            :data_list=listReport 
            title="ordenes"
            @on-status-menu="statusMenu"
            />
        </div>
    </div>

</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import type { Team } from '../../team/interface/team.interface';
import CardInfoOrder from '../view/CardInfoReport.vue';
import type{ Report } from '../interface/report.interface';
import { getReportFilters } from '../action/getReportFilter.action';
import router from '../../../router';
import { useToast } from 'vue-toastification';
import ButtonCreate from '../../common/components/ButtonCreate.vue';
import type { SubClient } from '../../auth/interfaces/subClient-interface';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import CardInfoReport from '../view/CardInfoReport.vue';

const clientStore = useClientStorage();
const listTeam = ref<Team[]>([])
const listClient = ref<SubClient[]>([]);

const toast = useToast()
listTeam.value = clientStore.client.value?.teams || []

const hasButtonCreate = ref<boolean>(false)

if(clientStore.client.value?.access_level === AccessLevel.technical ||
    clientStore.client.value?.access_level === AccessLevel.technical_supervisor ||
    clientStore.client.value?.access_level === AccessLevel.admin
) hasButtonCreate.value = true


if(clientStore.client.value?.clients ){
    clientStore.client.value?.clients.map(values => { 
        if(values.access_level) listClient.value.push(values)
    })
}

const ReportForm = reactive({
    team:"",
    client:"",
    date:"",
})

const paramsUrl = ref<String>("")
const onStatus = ref<boolean>(false)
const onMenu =ref<boolean>(false)
const listReport = ref<Report[]>([])

const getListReport = async () => {
    if(clientStore.client.value?.access_level != AccessLevel.operator){
        try {
        const response = await getReportFilters(
            ReportForm.team,
            ReportForm.client,
            ReportForm.date,
        );

        if (Array.isArray(response)) {
            if(response.length > 0) {
                listReport.value = response;
                onStatus.value = true;
            } else {
                onStatus.value = false;
            }
            resetForm()
        }
        
        if ("statusCode" in response) {
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }

            if(response.statusCode === 400 ) {
                toast.warning(`Bad Request: ${response.message}`);
            }

            if(response.statusCode === 401 ) {
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
    } else {
        toast.warning("Unauthorized charge")
    }
    
}

    const statusMenu = (onStatusMenu: boolean) => {
        onMenu.value = onStatusMenu
    }

    const resetForm = () => {
        ReportForm.team = ""
        ReportForm.client = ""
        ReportForm.date = ""
        paramsUrl.value = ""
    }
</script>

<template>
    <div class="flex gap-[20px] flex-wrap justify-center items-center content-center list-none mt-10">
        <form @submit.prevent="registerAppropriation" class="w-full flex flex-col items-center p-6 sm:p-8 md:p-10 ">
            <div 
                v-if="isStatusProduction"
                class="my-2"
                >
                <label 
                class="text-3xl font-medium text-[#EEE0D3] m-5"
                for="production">Aprobar por produccion</label>
                <input 
                v-model="myForm.aprovalProduction"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="production">
            </div>
            <div 
            v-if="isStatusTechnical"
            class="my-2"
            >
                <label
                class="text-3xl font-medium text-[#EEE0D3] m-5"
                for="maintenance">Aprobar por mantenimiento</label>
                <input
                v-model="myForm.aprovalMaintenance"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="maintenance">
            </div>
            <button class="w-full max-w-sm bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition" > Registrar </button>
        </form>
        
        <div class="p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words mx-10 my-5">
                <p  class="text-[#EEE0D3] text-justify font-medium text-2xl py-1">
                    <span class="font-medium text-[#FC3B47]">Numero de reporte: </span> 
                    <span class="break-all">{{ currentReport.reportItem.id_report }}</span>
                </p>
                <p  class="text-[#EEE0D3] text-justify font-medium text-2xl py-1">
                    <span class="font-medium text-[#FC3B47]">Equipo: </span> 
                    <span class="break-all">{{ currentReport.reportItem.team}}</span>
                </p>
                <p  class="text-[#EEE0D3] text-justify font-medium text-2xl py-1">
                    <span class="font-medium text-[#FC3B47]">Tecnico: </span> 
                    <span class="break-all">{{ currentReport.reportItem.technical }}</span>
                </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useReportItemStore } from '../../report/stores/report.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { approvalReportMaintenance, approvalReportProduction } from '../../report/action/approvalReport.action';
import router from '../../../router';
import { useToast } from 'vue-toastification';

const currentReport = useReportItemStore();
const clientStore = useClientStorage();
const idReport = currentReport.reportItem.id_report;
const currentApprovalTechnical = currentReport.reportItem.maintenance_approval;
const currentApprovalProduction = currentReport.reportItem.production_approval;
const toast = useToast()

const isStatusProduction = ref<boolean>(false);
const isStatusTechnical = ref<boolean>(false);

if(clientStore.client.value?.access_level === AccessLevel.admin || 
    clientStore.client.value?.access_level === AccessLevel.production_supervisor
){
    isStatusProduction.value = true
}

if(clientStore.client.value?.access_level === AccessLevel.admin || 
    clientStore.client.value?.access_level === AccessLevel.technical_supervisor
){
    isStatusTechnical.value = true
}

const myForm = reactive({
    aprovalProduction: currentApprovalProduction,
    aprovalMaintenance: currentApprovalTechnical
})

const registerAppropriation = async () => {
    if (clientStore.client.value?.access_level === AccessLevel.production_supervisor||
            clientStore.client.value?.access_level === AccessLevel.admin 
        ) {
            try {
                const response = await approvalReportProduction(idReport,myForm.aprovalProduction);
                if (response) {
                    if ("statusCode" in response) {
                        if(response.statusCode === 404 ) router.replace({ name: 'NotFound' });
                        if(response.statusCode === 400 ) toast.warning(`Bad request ${response.message}`)
                    
                        if(response.statusCode === 403 || response.statusCode === 401) {
                            toast.error("Not authorized")
                            router.replace({ name: 'login' });
                        }

                        if(response.statusCode === 0 || response.statusCode === 500) router.replace({ name: 'ServerError' });
                    }

                    if("production_approval" in response) {
                        toast.info("Reporte aprobado por produccion")
                        router.replace({name: "report"})
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }

        if (clientStore.client.value?.access_level === AccessLevel.technical_supervisor ||
            clientStore.client.value?.access_level === AccessLevel.admin 
        ) {
            try {
                const response = await approvalReportMaintenance(idReport,myForm.aprovalMaintenance);
                if (response) {
                    if ("statusCode" in response) {
                        if(response.statusCode === 404 ) router.replace({ name: 'NotFound' });
                        if(response.statusCode === 400 ) toast.warning(`Bad request ${response.message}`)
                    
                        if(response.statusCode === 403 || response.statusCode === 401) {
                            toast.error("Not authorized")
                            router.replace({ name: 'login' });
                        }

                        if(response.statusCode === 0 || response.statusCode === 500) router.replace({ name: 'ServerError' });
                    }

                    if("maintenance_approval" in response) {
                        toast.info("Reporte aprobado por mantenimiento")
                        router.replace({name: "report"})
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }
    
}

</script>
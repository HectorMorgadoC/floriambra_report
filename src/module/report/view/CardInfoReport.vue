<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-stretch content-center list-none mt-10">
        <li
        v-for="item of props.data_list"
        :key=item.id_report
        >
            <ul class="w-full max-w-lg flex flex-col justify-start items-start p-8 text-1xl text-[#EEE0D3] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words sm:w-screen p-8 h-full min-h-[600px]">
                <button @click="selectItem(item)">
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Numero de reporte: </span> 
                        <span class="break-all">{{ item.id_report }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Numero de orden: </span> 
                        <span class="break-all">{{ item.id_order }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Descripcion de falla: </span> 
                        <span class="break-all">{{ item.description_fault }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Orden creada por: </span> 
                        <span class="break-all">{{ item.order_creator }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Tecnico: </span> 
                        <span class="break-all">{{ item.technical }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Colaboradores: </span> 
                        <span class="break-all">{{ item.collaborators }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Equipo: </span> 
                        <span class="break-all">{{ item.team }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Fecha de creacion de orden: </span> 
                        <span class="break-all">{{ item.notice_date.slice(0,16).replace("T","; ") }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Fecha inicio de trabajo: </span> 
                        <span class="break-all">{{ item.from_date.slice(0,16).replace("T","; ") }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Fecha finalizacion de trabajo: </span> 
                        <span class="break-all">{{ item.end_date.slice(0,16).replace("T","; ") }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Tipo de falla: </span> 
                        <span class="break-all">{{ item.fault_type }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Actividades realizadas: </span> 
                        <span class="break-all">{{ item.summary_of_activities }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Respuesto usados: </span> 
                        <span class="break-all">{{ item.used_spare_parts }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Comentarios: </span> 
                        <span class="break-all">{{ item.remarks }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Aprobacion por supervisor de produccion: </span> 
                        <span class="break-all">{{ traslateStatusReport(item.production_approval) }}</span>
                    </div>
                    <div class="my-2 pl-2 text-justify">
                        <span class="font-medium text-[#FC3B47]">Aprobacion por supervisor tecnico: </span> 
                        <span class="break-all">{{ traslateStatusReport(item.maintenance_approval) }}</span>
                    </div>
                </button>
            </ul>
        </li>
    </div>
    <div v-else>
        <ActionPanelOptional
            :title="actionPanelTitle"
            :data="selectedItem"
            router_delete="deleteReport"
            router_update="updateReport"
            router_approval="approvalReport"
            :state_router_delete=false
            :state_aproval_production=stateAprovalProduction
        />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useReportItemStore } from '../stores/report.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import ActionPanelOptional from '../../common/components/ActionPanelOptional.vue';
import type { Report } from '../interface/report.interface'


const client = useClientStorage()
const reportStore = useReportItemStore()
const stateAprovalProduction = ref<boolean>(true)

const props = defineProps<{
    data_list: Report[]
}>()

const emit = defineEmits(["onStatusMenu"])
const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);
const actionPanelTitle = ref<string>('');




const selectItem = (item: Report) => {
    if(client.client.value?.access_level !== AccessLevel.operator && 
        client.client.value?.access_level !== AccessLevel.production_supervisor &&
        client.client.value?.access_level !== AccessLevel.technical
        ) {
            if(item.maintenance_approval  && item.production_approval) {
                isEditMode.value = false;
            } else {
                selectedItem.value = item;
                actionPanelTitle.value = `Report: ${selectedItem.value.id_report}`;
                isEditMode.value = true;
                reportStore.setReportItem(item)
                emit("onStatusMenu",isEditMode.value);
            }
        
    } else if(client.client.value?.access_level === AccessLevel.production_supervisor ) {
        if(item.maintenance_approval  && item.production_approval) {
            isEditMode.value = false;
        } else {
            selectedItem.value = item;
            actionPanelTitle.value = `Report: ${selectedItem.value.id_report}`;
            isEditMode.value = true;
            reportStore.setReportItem(item)
            emit("onStatusMenu",isEditMode.value);
            stateAprovalProduction.value = false
        }
    }
}


const traslateStatusReport = (isStatus: boolean) => {
    if(isStatus) {
        return "Aprobado"
    } else {
        return "No aprobado"
    }
}


</script>
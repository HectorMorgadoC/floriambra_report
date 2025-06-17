<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-4 pb-2 text-center">{{ reportStore.reportItem.id_report.slice(0,6) }}</h3>
            
            <div class="w-full text-[#EEE0D3] text-justify text-xl mb-6">
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Numero de reporte: </span> 
                    <span class="break-all">{{ reportStore.reportItem.id_report }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Equipo: </span> 
                    <span class="break-all">{{ reportStore.reportItem.team }}</span>
                </div>
                <div class="my-2 pl-2 text-justify">
                    <span class="font-medium text-[#FC3B47]">Tecnico: </span> 
                    <span class="break-all">{{ reportStore.reportItem.technical }}</span>
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button
                @click="deleteReportForId"
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    Sí
                </button>
                <button
                    @click="denyReportDeletion"
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
import { useReportItemStore } from '../stores/report.store';
import { deleteReport } from '../action/deleteReport.action';


const reportStore = useReportItemStore()
const reportId = reportStore.reportItem.id_report
const toast = useToast()


const deleteReportForId = async() => {
    try {
        const response = await deleteReport(reportId);

        if("code" in response) {
            if(response.code === 200) {
                toast.success("Registro de reporte eliminado")
                router.replace({name: "report"})
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

const denyReportDeletion = () => {
    router.replace({name: "report"})
}

</script>
import { defineStore } from "pinia";
import { ref } from "vue";
import type{ Report } from "../interface/report.interface";

export const useReportItemStore = defineStore('report', () => {

    let reportItem = ref<Report>({
        id_report: "",
        id_order: "",
        description_fault: "",
        order_creator: "",
        technical: "",
        collaborators: "",
        team: "",
        notice_date: "",
        from_date: "",
        end_date: "",
        fault_type: "",
        type_of_maintenance: "",
        summary_of_activities: "",
        used_spare_parts: "",
        remarks: "",
        maintenance_approval: false,
        production_approval: false

    })

    const setReportItem = (report: Report) => {
        reportItem.value = report;
    } 

    return {
        reportItem: reportItem,
        setReportItem
    }
})
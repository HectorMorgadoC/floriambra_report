import { defineStore } from "pinia";
import { ref } from "vue";
import type { Process } from "../interface/process.interface";

export const useProcessItemStore = defineStore('process', () => {

    let processItem = ref<Process>({
        name: "",
        description: "",
    })

    const setProcessItem = (process: Process) => {
        processItem.value = process;
    } 

    return {
        processItem: processItem,
        setProcessItem
    }
})
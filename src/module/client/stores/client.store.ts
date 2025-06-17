import { defineStore } from "pinia";
import type { Client } from "../../auth/interfaces/client.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";
import { ref } from "vue";

export const useClientItemStore = defineStore('client', () => {

    let clientItem = ref<Client>({
        username: "",
        access_level: AccessLevel.operator,
    })

    const setClientItem = (client: Client) => {
        clientItem.value = client;
    } 

    return {
        clientItem,
        setClientItem
    }
})
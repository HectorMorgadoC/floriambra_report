import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "../interface/orders.interface";
import { OrderState } from "../interface/orderState.interface";

export const useOrderItemStore = defineStore('order', () => {

    let orderItem = ref<Order>({
        id: "",
        date: "",
        description: "",
        state: OrderState.Esperando,
        client: "",
        team: "",
        observation: ""
    })

    const setOrderItem = (order: Order) => {
        orderItem.value = order;
    } 

    return {
        orderItem,
        setOrderItem
    }
})
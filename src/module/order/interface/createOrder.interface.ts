import type { OrderState } from "./orderState.interface"

export interface CreateOrder {
    team: string,
    client: string
    notice_date: string
    fault_description: string
    order_state?:OrderState,
    observation?: string
}


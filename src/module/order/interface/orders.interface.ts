import type { OrderState } from "./orderState.interface";

export interface Order {
    id: string,
    date: string,
    description: string,
    state: OrderState,
    client: string,
    team: string,
    observation: string
}
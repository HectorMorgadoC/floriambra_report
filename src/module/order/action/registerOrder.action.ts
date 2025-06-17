import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { CreateOrder } from "../interface/createOrder.interface";
import type { Order } from "../interface/orders.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const registerOrder = async (newOrder: CreateOrder): 
Promise< MessageError | Order[] > => {
    const client = useAuthStore();

    if(client.client?.access_level != AccessLevel.technical) {
        try {
            
            let response = await managementApi.post<Order[]>('/order',{
                team: newOrder.team,
                client: newOrder.client,
                notice_date: new Date(newOrder.notice_date).toISOString(),
                fault_description: newOrder.fault_description
            });

            let order: Order[] = response.data
            return order

        } catch (error) {
            return {
                    message: `${isAxiosError(error) && error.response?.data.message}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } else {
        return {
                    message: `Client not authorized`,
                    error: `Client not authorized for operation`,
                    statusCode: 403
                }
    }


}
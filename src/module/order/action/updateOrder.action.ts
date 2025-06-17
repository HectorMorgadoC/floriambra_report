import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UpdateOrder } from "../interface/updateOrder.interface";
import type { Order } from "../interface/orders.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const updateOrder = async (updatedOrder: UpdateOrder,idOrder: string): 
Promise< MessageError | Order > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.production_supervisor || 
        client.client?.access_level === AccessLevel.technical_supervisor ||
        client.client?.access_level === AccessLevel.admin
    ) {

    const body: any = {
        team: updatedOrder.team,
        client: updatedOrder.client,
        notice_date: new Date(updatedOrder.notice_date).toISOString(),
        fault_description: updatedOrder.fault_description,
        order_state: updatedOrder.order_state,
        observation: updatedOrder.observation
    };

        try {
            let response = await managementApi.patch<Order>(`/order/${idOrder}`,body);

            let order: Order = response.data
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
import { managementApi } from "../../../api/managementApi";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { Order } from "../interface/orders.interface";
import type { UUIDTypes } from "uuid";

export const getOrderFilters = async (team:string,client:string,date:string,is_actived:string): 
Promise< MessageError | Order[] > => {
    
        const params: Record<string, unknown> = {}

        if(team.length > 0) {
            params.team = team as UUIDTypes
        } 

        if(client.length >0){
            params.client = client
        }

        if(date.length > 0){
            let dateFormat = new Date(date).toISOString().slice(0, 16); 
            params.date_time = dateFormat
        }

        if(is_actived){
            params.order_state = is_actived
        }


        try {
            
            let response = await managementApi.get<Order[]>('/order',{
                params
            });

            let orders: Order[] = response.data
            return orders

        } catch (error) {
            console.log(error)
            return {
                    message: `${isAxiosError(error) && error.response?.data.message}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } 


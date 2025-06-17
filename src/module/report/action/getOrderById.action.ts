import { managementApi } from "../../../api/managementApi";
import { useClientStorage } from "../../auth/composable/useClientStorage";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { OrderForReport } from "../interface/orderForResport.interface";


export const getOrderById = async (id: string): 
Promise< MessageError | OrderForReport > => {
    const clientStorage = useClientStorage()
    if( clientStorage.client.value?.access_level === AccessLevel.admin || 
        clientStorage.client.value?.access_level === AccessLevel.technical ||
        clientStorage.client.value?.access_level === AccessLevel.technical_supervisor
    ) {
        try {
            let response = await managementApi.get<OrderForReport>(`/order/${id}`);

            let report: OrderForReport = response.data
            return report

        } catch (error) {
            return {
                    message: `${isAxiosError(error) && error.response?.data.message}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } else {
        console.error("AutorUnauthorized customer")
        return {
                    message: `AutorUnauthorized customer`,
                    error: `Unauthorized`,
                    statusCode: 403
                }
    }
        
    } 


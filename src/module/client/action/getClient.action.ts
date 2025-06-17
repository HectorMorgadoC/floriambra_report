import { managementApi } from "../../../api/managementApi";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";
import type { Client } from "../../auth/interfaces/client.interface";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";

export const getClient = async (): 
Promise< MessageError | Client[] > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.get<Client[]>('/client',{
                
            });

            let clients: Client[] = response.data
            return clients

        } catch (error) {
            console.log(error)
            return {
                    message: `${isAxiosError(error) && error.response?.data}`,
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
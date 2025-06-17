import { managementApi } from "../../../api/managementApi";
import type { Client } from "../../auth/interfaces/client.interface";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { CreateClient } from "../interface/createClient";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const registerClient = async (newCliente: CreateClient): 
Promise< MessageError | Client[] > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.post<Client[]>('/client',{
                username : newCliente.username,
                email: newCliente.email,
                password: newCliente.password,
                access_level: newCliente.access_level,
                process: newCliente.process
            });

            let clients: Client[] = response.data
            return clients

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
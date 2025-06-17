import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { Process } from "../interface/process.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const getProcess = async (): 
Promise< MessageError | Process[] > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.get<Process[]>('/process',{
                
            });

            let process: Process[] = response.data
            return process

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
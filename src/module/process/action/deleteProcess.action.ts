import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UUIDTypes } from "uuid";
import type { StatusCode } from "../../common/interface/status-code.interface";
import type { Process } from "../interface/process.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const deleteProcess = async (process_id: UUIDTypes): 

Promise< MessageError | StatusCode > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.delete<Process>(`/process/${process_id}`);

            let statusCode: StatusCode = { 
                code: response.status
            }
            
            return  statusCode 

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
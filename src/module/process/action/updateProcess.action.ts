import { managementApi } from "../../../api/managementApi";
import type { Client } from "../../auth/interfaces/client.interface";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";

import type { UUIDTypes } from "uuid";
import type { UpdateProcess } from "../interface/updateProcess.interface";
import type { Process } from "../interface/process.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const updateProcess = async (updatedProcess: UpdateProcess,idProcess: UUIDTypes): 
Promise< MessageError | Process > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {

        try {

            let response = await managementApi.patch<Process>(`/process/${idProcess}`,{
                name: updatedProcess.name,
                description: updatedProcess.description,
                is_actived: updatedProcess.is_actived
            });

            let process: Process = response.data
            return process

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
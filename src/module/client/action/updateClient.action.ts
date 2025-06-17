import { managementApi } from "../../../api/managementApi";
import type { Client } from "../../auth/interfaces/client.interface";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UpdateClient } from "../interface/updateClient";
import type { UUIDTypes } from "uuid";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const updateClient = async (updatedClient: UpdateClient,idClient: UUIDTypes): 
Promise< MessageError | Client > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {

    const body: any = {
        username: updatedClient.username,
        email: updatedClient.email,
        access_level: updatedClient.access_level,
        process: updatedClient.process
    };

    if (updatedClient.password.length > 0) {
        body.password = updatedClient.password;
    }

        try {
            console.log(body)
            let response = await managementApi.patch<Client>(`/client/${idClient}`,body);

            let client: Client = response.data
            return client

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
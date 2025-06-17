import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { Team } from "../interface/team.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const getTeam = async (): 
Promise< MessageError | Team[] > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.get<Team[]>('/team',{
                
            });

            let team: Team[] = response.data
            return team

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
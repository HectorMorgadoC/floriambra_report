import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { CreateTeam } from "../interface/createTeam.interface";
import type { Team } from "../interface/team.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const registerTeam = async (newTeam: CreateTeam): 
Promise< MessageError | Team > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {
        try {
            
            let response = await managementApi.post<Team>('/team',{
                name: newTeam.name,
                description: newTeam.description,
                march: newTeam.march,
                model: newTeam.model,
                working_voltage: newTeam.working_voltage,
                kilowatts: newTeam.kilowatts,
                process: newTeam.process
            });

            let team: Team = response.data
            return team

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
import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UUIDTypes } from "uuid";
import type { UpdateTeam } from "../interface/updateTeam.interface";
import type { Team } from "../interface/team.interface";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

export const updateTeam = async (updatedTeam: UpdateTeam,idTeam: UUIDTypes): 
Promise< MessageError | Team > => {
    const client = useAuthStore();

    if(client.client?.access_level === AccessLevel.admin) {

        try {

            let response = await managementApi.patch<Team>(`/team/${idTeam}`,{
                name: updatedTeam.name,
                description: updatedTeam.description,
                march: updatedTeam.march,
                model: updatedTeam.model,
                working_voltage: updatedTeam.working_voltage,
                kilowatts: updatedTeam.kilowatts,
                process: updatedTeam.process as UUIDTypes,
                is_actived: updatedTeam.is_actived
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
import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";
import type { CreateReport } from "../interface/createReport.interface";

export const registerReport = async (newReport: CreateReport): 
Promise< MessageError | Report > => {
    const client = useAuthStore();

    if(client.client?.access_level != AccessLevel.operator && 
        client.client?.access_level != AccessLevel.production_supervisor &&
        client.client?.access_level != undefined
    ) {
        try {
            let response = await managementApi.post<Report>('/report',{
                order: newReport.order,
                client: newReport.client,
                collaborators: newReport.collaborators,
                fault_type: newReport.fault_type,
                type_of_maintenance: newReport.type_of_maintenance,
                from_date: new Date(newReport.from_date).toISOString(),
                end_date: new Date(newReport.end_date).toISOString(),
                summary_of_activities: newReport.summary_of_activities,
                used_spare_parts: newReport.used_spare_parts,
                remarks: newReport.remarks
            });

            let report: Report = response.data
            return report

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
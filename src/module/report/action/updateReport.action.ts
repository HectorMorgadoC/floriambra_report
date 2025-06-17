import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";
import type { UpdateReport } from "../interface/updateReport.interface";

export const updateReport = async (updatedReport: UpdateReport,idReport: string): 
Promise< MessageError | Report > => {
    const client = useAuthStore();

    if( 
        client.client?.access_level === AccessLevel.technical_supervisor ||
        client.client?.access_level === AccessLevel.admin
    ) {

    const body: any = {
        order: updatedReport.order,
        client: updatedReport.client,
        collaborators: updatedReport.collaborators,
        fault_type: updatedReport.fault_type,
        type_of_maintenance: updatedReport.type_of_maintenance,
        from_date: new Date(updatedReport.from_date).toISOString(),
        end_date: new Date(updatedReport.end_date).toISOString(),
        summary_of_activities: updatedReport.summary_of_activities,
        used_spare_parts: updatedReport.used_spare_parts,
        remarks: updatedReport.remarks,
    };

        try {
            let response = await managementApi.patch<Report>(`/report/${idReport}`,body);

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
import { managementApi } from "../../../api/managementApi";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UUIDTypes } from "uuid";
import { AccessLevel } from "../../auth/interfaces/access-level.enum";

interface ResponseApproval {
    maintenance_approval: boolean,
    production_approval: boolean
}


export const approvalReportProduction = async (idReport: string,aprovalStatus: boolean): 
Promise< MessageError | ResponseApproval > => {
    const client = useAuthStore();

    if( 
        client.client?.access_level === AccessLevel.production_supervisor ||
        client.client?.access_level === AccessLevel.admin
    ) {

    
        try {
            let response = await managementApi.patch<ResponseApproval>(`/report/production_approval/${idReport}/${aprovalStatus}`);

            let report: ResponseApproval = response.data
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


export const approvalReportMaintenance = async (idReport: UUIDTypes,aprovalStatus: boolean): 
Promise< MessageError | ResponseApproval > => {
    const client = useAuthStore();

    if( 
        client.client?.access_level === AccessLevel.technical_supervisor ||
        client.client?.access_level === AccessLevel.admin
    ) {

    
        try {
            let response = await managementApi.patch<ResponseApproval>(`/report/maintenance_approval/${idReport}/${aprovalStatus}`);

            let report: ResponseApproval = response.data
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
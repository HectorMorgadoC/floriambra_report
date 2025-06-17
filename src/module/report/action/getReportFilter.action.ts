import { managementApi } from "../../../api/managementApi";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { Report } from "../interface/report.interface";
import type { UUIDTypes } from "uuid";

export const getReportFilters = async (team:string,client:string,date:string): 
Promise< MessageError | Report[] > => {
    
        const params: Record<string, unknown> = {}

        if(team.length > 0) {
            params.team = team as UUIDTypes
        } 

        if(client.length >0){
            params.client = client
        }

        if(date.length > 0){
            let dateFormat = new Date(date).toISOString().slice(0, 16); 
            params.date_time = dateFormat
        }

        try {
            let response = await managementApi.get<Report[]>('/report',{
                params
            });

            let report: Report[] = response.data
            return report

        } catch (error) {
            console.log(error)
            return {
                    message: `${isAxiosError(error) && error.response?.data.message}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } 


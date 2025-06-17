import type { UUIDTypes } from "uuid"

export interface CreateReport {
    order:UUIDTypes
    client: UUIDTypes
    collaborators?: string
    fault_type: string
    type_of_maintenance: string
    from_date: string
    end_date:string
    summary_of_activities: string
    used_spare_parts?: string
    remarks?: string
    maintenance_approval?: boolean
    production_approval?: boolean
}


export interface Report{
    id_report: string,
    id_order: string,
    description_fault: string,
    order_creator: string,
    technical: string,
    collaborators: string,
    team: string,
    notice_date: string,
    from_date: string,
    end_date: string,
    fault_type: string,
    type_of_maintenance: string,
    summary_of_activities: string,
    used_spare_parts: string,
    remarks: string,
    maintenance_approval: boolean,
    production_approval: boolean
}

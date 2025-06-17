import type { UUIDTypes } from "uuid";

export interface OrderForReport {
    id: UUIDTypes,
    team: UUIDTypes,
    client: UUIDTypes,
    fault_description: string
}


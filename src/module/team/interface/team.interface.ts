import type { UUIDTypes } from "uuid"

export interface Team {
    id?: UUIDTypes
    name: string
    description: string
    march?: string
    model?: string
    working_voltage?: number
    kilowatts?: number
    is_actived?: boolean
    process?: string
}

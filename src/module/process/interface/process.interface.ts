import type { UUIDTypes } from "uuid"

export interface Process {
    id?: UUIDTypes
    name: string,
    description: string
    is_actived?: boolean
}
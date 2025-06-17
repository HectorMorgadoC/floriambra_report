import type { AccessLevel } from "../../auth/interfaces/access-level.enum";

export interface CreateClient {
    username: string,
    email: string,
    process: string,
    access_level: AccessLevel,
    password: string,
}


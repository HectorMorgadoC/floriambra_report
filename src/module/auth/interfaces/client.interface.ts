import type { Process } from "../../process/interface/process.interface";
import type { Team } from "../../team/interface/team.interface";
import { AccessLevel } from "./access-level.enum";
import type { SubClient } from "./subClient-interface";

export interface Client {
    id: string
    username: string,
    access_level: AccessLevel,
    teams?: Team[],
    process?: Process[],
    email?: string,
    clients?: SubClient[]
}


import { defineStore } from "pinia";
import { ref } from "vue";
import type { Team } from "../interface/team.interface";

export const useTeamItemStore = defineStore('team', () => {

    let teamItem = ref<Team>({
        name: "",
        description: "",
    })

    const setTeamItem = (team: Team) => {
        teamItem.value = team;
    } 

    return {
        teamItem: teamItem,
        setTeamItem
    }
})
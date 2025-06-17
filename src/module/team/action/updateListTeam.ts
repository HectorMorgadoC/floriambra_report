import { useToast } from "vue-toastification";
import router from "../../../router";
import { useClientStorage } from "../../auth/composable/useClientStorage";
import { getTeam } from "./getTeam.action";

const toast = useToast()

export const updateListTeam = async() => {
        try {
        const response = await getTeam();
        if (Array.isArray(response)) {
            const clientStorage = useClientStorage();
            clientStorage.updateClient({teams: response})
            
        }
        
        if ("statusCode" in response) {
            console.log(response.statusCode)
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }

            if(response.statusCode === 403 ) {
                toast.error("Not authorized")
                router.replace({ name: 'login' });
            }
            
            if(response.statusCode === 0 || response.statusCode === 500) {
                router.replace({ name: 'ServerError' });
            }
        }

    } catch (error) {
        toast.error("Request error")
    }
    } 
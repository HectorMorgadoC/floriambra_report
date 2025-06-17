
/*
import Cookies from 'js-cookie';
import { ref } from 'vue';
import type { Client } from '../interfaces/client.interface';

const CLIENT_COOKIE_KEY = 'client';
const client = ref<Client | undefined>(undefined);

export function useClientCookie() {
    const loadClient = () => {
        const raw = Cookies.get(CLIENT_COOKIE_KEY);
        client.value = raw ? JSON.parse(raw) as Client : undefined;
    };

    const saveClient = (newClient: Client, expires: number ) => {
        Cookies.set(CLIENT_COOKIE_KEY, JSON.stringify(newClient), { expires,sameSite:'Strict' });
        client.value = newClient;
    };

    const clearClient = () => {
        Cookies.remove(CLIENT_COOKIE_KEY);
        client.value = undefined;
    };

    return { client, loadClient, saveClient, clearClient };
}



*/

/*
import { ref } from 'vue';
import type { Client } from '../interfaces/client.interface';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies()
const CLIENT_COOKIE_KEY = 'client';
const client = ref<Client | undefined>(undefined);

export function useClientCookie() {
    const loadClient = () =>  {
        try {
            const raw = cookies.get(CLIENT_COOKIE_KEY);
            console.log(typeof(raw))
            const decoded = raw ? decodeURIComponent(raw) : '';
            console.log(decoded)
            //client.value = JSON.parse(decodedValue) as Client;
            client.value = raw ? JSON.parse(raw) as Client : undefined;
            //client.value = raw as Client;
        } catch (err) {
        console.warn(`Error parsing cookies"${CLIENT_COOKIE_KEY}"`, err);
        cookies.remove(CLIENT_COOKIE_KEY);
        client.value = undefined;
        }
    }

    const saveClient = (newClient: Client, expire = '1d') => {
        try {
            const serialized = JSON.stringify(newClient);
            cookies.set(CLIENT_COOKIE_KEY, serialized, expire);
            client.value = newClient;
        } catch (err) {
            console.error('Error saving client to cookie', err);
        }
    }

    const clearClient = () => {
        cookies.remove(CLIENT_COOKIE_KEY);
        client.value = undefined;
    }

    
    //loadClient();

    return {
        client,
        loadClient,
        saveClient,
        clearClient,
    };
}
*/
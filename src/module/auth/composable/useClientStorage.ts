import { ref } from 'vue';
import type { Client } from '../interfaces/client.interface';
import { useCookies } from 'vue3-cookies';

const CLIENT_STORAGE_KEY = 'client';
const client = ref<Client | null>(null);
const { cookies } = useCookies();

export function useClientStorage() {

    const saveClient = (newClient: Client) => {
        try {
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(newClient));
            client.value = newClient;
        } catch (err) {
        console.error('Error al guardar en localStorage:', err);
        }
    };


    const loadClient = () => {
        try {
            const raw = localStorage.getItem(CLIENT_STORAGE_KEY);
            client.value = raw ? JSON.parse(raw) as Client : null;
        } catch (err) {
            console.error('Error al leer localStorage:', err);
            cookies.remove
            clearClient();
        }
    };

    const updateClient = (updates: Partial<Client>) => {
        if (client.value) {
            client.value = { ...client.value, ...updates };
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(client.value));
        } else {
            console.warn('No hay un cliente cargado para actualizar.');
        }
    };

    const clearClient = () => {
        localStorage.removeItem(CLIENT_STORAGE_KEY);
        client.value = null;
    };

    
    loadClient();

    return {
        client,       
        saveClient,
        loadClient,
        updateClient,
        clearClient,
    };
}
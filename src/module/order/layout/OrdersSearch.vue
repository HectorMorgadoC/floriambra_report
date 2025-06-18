<template>
    <ButtonCreate title="Ordenes" title_button="Crear orden" patch="createOrder" v-if="hasCreateOrder"/>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div v-if="!onMenu">
            <form @submit.prevent="getListOrder" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Busqueda de ordenes de trabajo</h3>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo
                </label>
                <select
                v-model="OrderForm.team"
                name="team" 
                id="team"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un equipo</option>
                    <option 
                    v-for="(team, index) in listTeam"
                    :key="index"
                    :value="team.id"
                    >
                        {{ team.name }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <select
                v-model="OrderForm.client"
                name="client" 
                id="client"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un cliente</option>
                    <option 
                    v-for="(client, index) in listClient"
                    :key="index"
                    :value="client.id"
                    >
                        {{ client.username }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de creacion
                </label>
                <input
                    v-model="OrderForm.date"
                    type="datetime-local"
                    id="date"
                    name="date"
                    placeholder="Ingrese la fecha de creacion"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div v-if="!isStateOrder" class="mb-3">
                <label 
                    for="order_state" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Estado de orden
                </label>
                <select
                v-model="OrderForm.order_state"
                name="order_state" 
                id="order_state"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un estado</option>
                    <option 
                    v-for="[key, value] in Object.entries(OrderState)"
                    :value="value"
                    >
                        {{ key }}</option>
                    
                </select>
            </div>
            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Consultar
            </button>
        </form>
        </div>
        
        <div class="flex gap-[20px] flex-row flex-wrap justify-center items-center content-center list-none mt-10">
            <div v-if="!onStatus" >
                <h3 class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1">No hay registro</h3>
            </div>
            <CardInfoOrder v-else 
            :data_list=listOrders 
            title="ordenes"
            @on-status-menu="statusMenu"
            />
        </div>
    </div>

</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import type { Team } from '../../team/interface/team.interface';
import CardInfoOrder from '../view/CardInfoOrder.vue';
import type{ Order } from '../interface/orders.interface';
import { getOrderFilters } from '../action/getOrdersFilter.action';
import router from '../../../router';
import { useToast } from 'vue-toastification';
import ButtonCreate from '../../common/components/ButtonCreate.vue';
import type { SubClient } from '../../auth/interfaces/subClient-interface';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { OrderState } from '../interface/orderState.interface';

const clientStore = useClientStorage();
const listTeam = ref<Team[]>([])
const listClient = ref<SubClient[]>([]);
const isStateOrder = ref<boolean>(false)
const hasCreateOrder = ref<boolean>(false)

if (clientStore.client.value?.access_level !== AccessLevel.technical){
    hasCreateOrder.value = true
}

const toast = useToast()
listTeam.value = clientStore.client.value?.teams || []

if(clientStore.client.value?.access_level != AccessLevel.operator && clientStore.client.value?.clients ){
    listClient.value = clientStore.client.value?.clients
} else {
    isStateOrder.value = true
    listClient.value.push({
        id: clientStore.client.value?.id || "",
        username: clientStore.client.value?.username || ""
    })
}


const OrderForm = reactive({
    team:"",
    client:"",
    date:"",
    order_state:"",
})

//const statusList = [true,false];
const paramsUrl = ref<String>("")
const onStatus = ref<boolean>(false)
const onMenu =ref<boolean>(false)
const listOrders = ref<Order[]>([])

const getListOrder = async () => {
    try {
        const response = await getOrderFilters(
            OrderForm.team,
            OrderForm.client,
            OrderForm.date,
            OrderForm.order_state
        );

        if (Array.isArray(response)) {
            if(response.length > 0) {
                listOrders.value = [...response];
                onStatus.value = true;
            } else {
                onStatus.value = false;
            }
            resetForm()
        }
        
        if ("statusCode" in response) {
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }

            if(response.statusCode === 400 ) {
                toast.warning(`Bad Request: ${response.message}`);
            }

            if(response.statusCode === 401 ) {
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

    const statusMenu = (onStatusMenu: boolean) => {
        onMenu.value = onStatusMenu
    }

    const resetForm = () => {
        OrderForm.team = ""
        OrderForm.client = ""
        OrderForm.date = ""
        OrderForm.order_state = ""
        paramsUrl.value = ""
    }
</script>

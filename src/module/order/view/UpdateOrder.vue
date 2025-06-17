<template>
   <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar orden</h3>
            <p class="block font-medium text-center text-[#EEE0D3] my-2">{{ currentOrder.id }}</p>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo: {{ currentOrder.team }}
                </label>
                <select
                v-model=team
                id="team"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentOrder.team }}</option>
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
                    Cliente: {{ currentOrder.client }}
                </label>
                <select
                v-model=client
                id="team"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentOrder.client }}</option>
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
                    for="notice_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de aviso: {{ dateConvert(currentOrder.date) }}
                </label>
                <input
                    v-model=date
                    type="datetime-local"
                    id="notice_date"
                    name="notice_date"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="fault_description" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion de la falla
                </label>
                <input
                    v-model=description
                    type="text"
                    id="fault_description"
                    name="fault_description"
                    :placeholder=currentOrder.description
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label for="order_state" class="flex items-center gap-3 text-xl font-medium text-[#EEE0D3] my-2">
                    Estado de la orden : {{ currentOrderStatus[0] }}
                </label>
                <select
                v-model="state"
                name="state" 
                id="state"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentOrderStatus[0] }}</option>
                    <option 
                    v-for="[key, value] in Object.entries(OrderState)"
                    :value="value"
                    >
                        {{ key }}</option>
                    
                </select>
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Observacion
                </label>
                <input
                    v-model="observation"
                    type="text"
                    id="observation"
                    name="observation"
                    :placeholder="currentOrder.observation"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <button
                @click="onRegister({
                    team: values.team,
                    client: values.client,
                    notice_date: values.date,
                    fault_description: values.description,
                    order_state: values.state,
                    observation: values.observation
                }, currentOrder.id)"
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Registrar
            </button>
        </form>
    </div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import router from '../../../router';
    import { useToast } from 'vue-toastification';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useOrderItemStore } from '../stores/order.store';
    import type { UpdateOrder } from '../interface/updateOrder.interface';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { updateOrder } from '../action/updateOrder.action';
    import type { UUIDTypes } from 'uuid';
    import { useClientStorage } from '../../auth/composable/useClientStorage';
    import type { Team } from '../../team/interface/team.interface';
    import type { SubClient } from '../../auth/interfaces/subClient-interface';
    import { OrderState } from '../interface/orderState.interface';

    const clientStore = useClientStorage();
    const listTeam = ref<Team[]>([])
    const listClient = ref<SubClient[]>([]);
    const toast = useToast();

    listTeam.value = clientStore.client.value?.teams || []

    if(clientStore.client.value?.access_level != AccessLevel.operator && clientStore.client.value?.clients ){
        listClient.value = clientStore.client.value?.clients
    } else {
        listClient.value.push({
            id: clientStore.client.value?.id || "",
            username: clientStore.client.value?.username || ""
        })
    }

    const currentOrder = useOrderItemStore().orderItem;
    const idTeam = ref<string>(listTeam.value.find(t => t.name === currentOrder.team)?.id?.toString() || "")
    const idClient = ref<string>(listClient.value.find(c => c.username === currentOrder.client)?.id.toString() || "")

    const schema = yup.object({
        team: yup.string(),
        client: yup.string(),
        notice_date: yup.string(),
        fault_description: yup
        .string()
        .min(10,"Minimo 10 caracteres")
        .max(200,"Maximo  200 caracteres"),
        state: yup.string(),
        observation: yup.string()

    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        team : idTeam.value,
        client: idClient.value,
        date: currentOrder.date,
        description: currentOrder.description,
        state:currentOrder.state,
        observation: currentOrder.observation
        }
    })

    const { value: team } = useField<string>('team')
    const { value: client } = useField<string>('client')
    const { value: date } = useField<string>('date')
    const { value: description } = useField<string>('description')
    const { value: state } = useField<OrderState>('state')
    const { value: observation } = useField<string>('observation')

    const onStatus = ref<boolean>(false)
    
    const currentOrderStatus = Object.entries(OrderState).find(([key, value]) => 
        value === currentOrder.state
    ) || ['', ''];

    const registerInfo = () => {
        if(errors) {
            if("team" in errors.value) toast.warning(`Team: ${errors.value.team}`)
            if("client" in errors.value) toast.warning(`Client: ${errors.value.client}`)
            if("notice_date" in errors.value) toast.warning(`Notice date: ${errors.value.notice_date}`)
            if("fault_description" in errors.value) toast.warning(`Fault description: ${errors.value.fault_description}`)
            if("order_state" in errors.value) toast.warning(`Order state: ${errors.value.order_state}`)
            onStatus.value = false
        } 

        onStatus.value = true
    }
    
    const onRegister = async (newOrder: UpdateOrder,id: string) => {
        if (clientStore.client.value?.access_level != AccessLevel.technical) {
            try {
                const response = await updateOrder(newOrder,id);
                if (response) {
                    if ("statusCode" in response) {
                        if(response.statusCode === 404 ) router.replace({ name: 'NotFound' });
                        if(response.statusCode === 400 ) toast.warning(`Bad request ${response.message}`)
                    
                        if(response.statusCode === 403 || response.statusCode === 401) {
                            toast.error("Not authorized")
                            router.replace({ name: 'login' });
                        }

                        if(response.statusCode === 0 || response.statusCode === 500) router.replace({ name: 'ServerError' });
                    }

                    if("id" in response) {
                        toast.success("Registro de orden modificado")
                        resetForm()
                        router.replace({name: "order"})
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }
    }

    const dateConvert= (date: string) => {
        const [moday, hour] = date.split("T")
        return `${moday} : ${hour.slice(0,5)}`
    }

</script>
<template>
    <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar orden</h3>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo
                </label>
                <select
                v-model=team
                id="team"
                required
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
                v-model=client
                id="client"
                :disabled="!hasClient"
                required
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
                    for="notice_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de aviso
                </label>
                <input
                    v-model=notice_date
                    type="datetime-local"
                    id="notice_date"
                    name="notice_date"
                    placeholder="Ingrese la fecha de aviso"
                    required
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
                    v-model=fault_description
                    type="text"
                    id="fault_description"
                    name="fault_description"
                    required
                    placeholder="Ingrese una descripcion de la falla"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <button
                
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Registrar
            </button>
        </form>
        <div v-else>
            <DataConfirmation 
            title="Desea realizar registro" 
            :sample_data="{
                Equipo: listTeam?.find(( t ) => {
                    return t.id === values.team
                })?.name,
                Cliente: listClient?.find(( c ) => {
                    return c.id === values.client
                })?.username,
                Fecha_de_aviso: dateConfirmationView,
                Descripcion: values.fault_description
                }"
            :data="values"
            @off-registration-status="cancelRegisterInfo"
            @on-registration-status="onRegister"
            />
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue';
    import DataConfirmation from '../../common/components/DataConfirmation.vue';
    import type { CreateOrder } from '../interface/createOrder.interface';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useToast } from 'vue-toastification';
    import { registerOrder } from '../action/registerOrder.action';
    import router from '../../../router';
    import { useClientStorage } from '../../auth/composable/useClientStorage';
    import type { Team } from '../../team/interface/team.interface';
    import type { SubClient } from '../../auth/interfaces/subClient-interface';
    import type { Process } from '../../process/interface/process.interface';

    const clientStore = useClientStorage();
    const listTeam = ref<Team[]>([])
    const listClient = ref<SubClient[]>([]);
    const listProcess = ref<Process[]>([])
    const customerProcess = ref<string>("")
    const toast = useToast();
    const hasClient = ref<boolean>(false)

    
    listTeam.value = clientStore.client.value?.teams || []
    listProcess.value = clientStore.client.value?.process || []
    const schema = yup.object({
        team: yup.string().required('Campo requerido'),
        client: yup.string().required('Campo requerido'),
        notice_date: yup.string().required('Campo requerido'),
        fault_description: yup
        .string()
        .min(10,"Minimo 10 caracteres")
        .max(200,"Maximo  200 caracteres")
        .required('Campo requerido'),
    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        team : "",
        client: "",
        notice_date: "",
        fault_description: ""
        }
    })

    const { value: team } = useField<string>('team')
    const { value: client } = useField<string>('client')
    const { value: notice_date } = useField<string>('notice_date')
    const { value: fault_description } = useField<string>('fault_description')
    

    const onStatus = ref<boolean>(false)
    const dateConfirmationView = ref<string>("");

    const registerInfo = () => {

        

        if(errors) {
            if("team" in errors.value) toast.warning(`Team: ${errors.value.team}`)
            if("client" in errors.value) toast.warning(`Client: ${errors.value.client}`)
            if("notice_date" in errors.value) toast.warning(`Notice date: ${errors.value.notice_date}`)
            if("fault_description" in errors.value) toast.warning(`Fault description: ${errors.value.fault_description}`)
            onStatus.value = false
        } 

        values.client.length <= 0 ? onStatus.value = false : onStatus.value = true
    }
    
    const onRegister = async (newOrder: CreateOrder) => {
        if (clientStore.client.value?.access_level != AccessLevel.technical) {
            try {
                const response = await registerOrder(newOrder);
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
                        toast.success("Orden de trabajo registrada")
                        resetForm()
                        onStatus.value = false
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }
    }
    
    const cancelRegisterInfo = (value: boolean) => {
        onStatus.value = value
    }

    watch(team, (newTeam) => {

        const equipmentProcess = listTeam.value.find(t => t.id === newTeam )?.process
        const listProcessName = listProcess.value.map( p => p.name );
        customerProcess.value = listProcessName.find(c => c === equipmentProcess ) || ""

        if(clientStore.client.value?.access_level != AccessLevel.operator && clientStore.client.value?.clients )  {

        listClient.value = clientStore.client.value?.clients.filter( (value) => { 
                
            if(value.process === equipmentProcess) { 
                return value
            } 
        })

        hasClient.value = true
    } else if (listClient.value.length > 0 ) {
        for (let client of listClient.value) {
            if( client.id === clientStore.client.value?.id){
                return
            } else {
                listClient.value.push({
                    id: clientStore.client.value?.id || "",
                    username: clientStore.client.value?.username || ""
                }) 
                hasClient.value = true
            }
        }
} else {
    listClient.value.push({
                    id: clientStore.client.value?.id || "",
                    username: clientStore.client.value?.username || ""
                }) 
                hasClient.value = true
}

    })

    watch(notice_date,(newNoticeDate) => {
    dateConfirmationView.value = newNoticeDate.replace("T","-")
    }) 

    
</script>
<template>
    <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="registerInfo" class="w-full max-w-xl lg:max-w-2xl bg-[#3d3b46] p-8 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Crear reporte</h3>
            <div class="mb-3">
                <label 
                    for="order" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Orden de trabajo
                </label>
                <input
                    v-model=order
                    type="text"
                    id="order"
                    name="order"
                    placeholder="Ingrese orden de trabajo"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
                <p v-if="hasOrder" class="text-[#FC3B47] text-2xl">Codigo de orden no valido </p>
            </div>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion de falla
                </label>
                <textarea
                    type="text"
                    :placeholder=orderForReport.fault_description
                    :disabled="isDisabledInput"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                ></textarea>
            </div>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo
                </label>
                <input
                    
                    type="text"
                    id="team"
                    name="team"
                    :placeholder=teamOfOrder.name
                    :disabled="isDisabledInput"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
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
                :disabled="!isDisabledInput"
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
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Colaboradores
                </label>
                <input
                    v-model=collaborators
                    type="text"
                    id="colaborators"
                    name="colaborators"
                    placeholder="Colaboradores"
                    :disabled="!isDisabledInput"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="fault_type" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Tipo de falla
                </label>
                <select
                v-model=fault_type
                id="faul_type"
                :disabled="!isDisabledInput"
                required
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione el tipo de falla</option>
                    <option 
                    v-for="[key, typeFault] in Object.entries(faultType)"
                    :value="typeFault"
                    >
                        {{ key }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="typeOfMaintenance" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Tipo de mantenimiento
                </label>
                <select
                v-model=type_of_maintenance
                id="typeOfMaintenance"
                :disabled="!isDisabledInput"
                required
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione el tipo de mantenimiento</option>
                    <option 
                    v-for="[key, typeMaintenance] in Object.entries(typeOfMaintenance)"
                    :value="typeMaintenance"
                    >
                        {{ key }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="from_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de inicio
                </label>
                <input
                    :disabled="!isDisabledInput"
                    v-model=from_date
                    type="datetime-local"
                    id="from_date"
                    name="from_date"
                    placeholder="Ingrese la fecha de inicio"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="end_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de culminacion
                </label>
                <input
                    :disabled="!isDisabledInput"
                    v-model=end_date
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
                    placeholder="Ingrese la fecha de culminacion"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="summary_of_activity" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Sumario de actividades
                </label>
                <textarea
                    :disabled="!isDisabledInput"
                    v-model=summary_of_activities
                    type="text"
                    id="summary_of_activities"
                    name="summary_of_activities"
                    required
                    placeholder="Ingrese una descripcion del trabajo realizado"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                    rows="3"
                    maxlength="300"
                    ></textarea>
            </div>

            <div class="mb-3">
                <label 
                    for="used_spare_parts" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Respuestos usados
                </label>
                <textarea
                    :disabled="!isDisabledInput"
                    v-model=used_spare_parts
                    type="text"
                    id="used_spare_parts"
                    name="used_spare_parts"
                    placeholder="Ingrese los respuestos usados"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                    rows="3"
                    maxlength="200"
                    ></textarea>
            </div>

            <div class="mb-3">
                <label 
                    for="remarks" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Comentarios(Adicional)
                </label>
                <textarea
                    :disabled="!isDisabledInput"
                    v-model=remarks
                    type="text"
                    id="remarks"
                    name="remarks"
                    placeholder="Ingrese comentarios adicionales"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                    rows="3"
                    maxlength="300"
                    ></textarea>
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
                Equipo: teamOfOrder.name,
                tecnico: userNameClient,
                Colaboradores: values.collaborators,
                Tipo_falla: values.fault_type,
                Tipo_mantenimiento: values.type_of_maintenance,
                Inicio: values.from_date.slice(0,10),
                Culminacion: values.end_date.slice(0,10),
                Actividades: values.summary_of_activities,
                Respuestos: values.used_spare_parts,
                Comentarios: values.remarks
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
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useToast } from 'vue-toastification';
    import router from '../../../router';
    import { useClientStorage } from '../../auth/composable/useClientStorage';
    import type { Team } from '../../team/interface/team.interface';
    import type { SubClient } from '../../auth/interfaces/subClient-interface';
    import { FaulType } from '../interface/faultType.enum';
    import { TypeOfMaintenance } from '../interface/typeOfMaintenance.enum';
    import { getOrderById } from '../action/getOrderById.action';
    import type { CreateReport } from '../interface/createReport.interface';
    import { registerReport } from '../action/registerReport.action';
    import type { OrderForReport } from '../interface/orderForResport.interface';



    const clientStore = useClientStorage();
    const listTeam = ref<Team[]>([])
    const listClient = ref<SubClient[]>([]);
    const orderForReport = ref<OrderForReport>({
        id: "",
        team: "",
        client: "",
        fault_description:""
    })
    const hasOrder = ref<boolean>(false);
    const isDisabledInput = ref<boolean>(false);
    const teamOfOrder = ref({
        id: "",
        name: ""
    })

    const typeOfMaintenance = TypeOfMaintenance
    const faultType = FaulType;
    const toast = useToast();

    listTeam.value = clientStore.client.value?.teams || []

    const schema = yup.object({
        order: yup.string().required('Campo requerido'),
        client: yup.string().required('Campo requerido'),
        collaborators: yup.string().max(100,"Maximo 100 caracteres"),
        fault_type: yup.string().max(30,"Maximo 30 caracteres"),
        type_of_maintenance: yup.string().max(30,"Maximo 30 caracteres"),
        from_date: yup.string(),
        end_date: yup.string(),
        summary_of_activities: yup.string().max(300,"Maximo 300 caracteres"),
        used_spare_parts: yup.string().max(300,"Maximo 200 caracteres"),
        remarks: yup.string().max(300,"Maximo 200 caracteres")
    })

    const { errors,values,resetForm,setFieldValue } = useForm({
        validationSchema: schema,
        initialValues: {
        order : "",
        team: "",
        client: "",
        collaborators: "",
        fault_type: "",
        type_of_maintenance: "",
        from_date: "",
        end_date: "",
        summary_of_activities: "",
        used_spare_parts: "",
        remarks: "",
        maintenance_approval: false,
        production_approval: false
        }
    })

    const { value: order } = useField<string>('order')
    const { value: client } = useField<string>('client')
    const { value: collaborators }= useField<string>('collaborators')
    const { value: fault_type }= useField<FaulType>('fault_type')
    const { value: type_of_maintenance }= useField<TypeOfMaintenance>('type_of_maintenance')
    const { value: from_date }= useField<string>('from_date')
    const { value: end_date }= useField<string>('end_date')
    const { value: summary_of_activities }= useField<string>('summary_of_activities')
    const { value: used_spare_parts }= useField<string>('used_spare_parts')
    const { value: remarks }= useField<string>('remarks')

    
    if(clientStore.client.value?.access_level === AccessLevel.technical  ){
        listClient.value.push({
            id: clientStore.client.value?.id || "",
            username: clientStore.client.value?.username || ""
        })
    } else clientStore.client.value?.clients?.map(client => {
        if(client.access_level !== AccessLevel.operator &&
            client.access_level !== AccessLevel.production_supervisor && 
            client.access_level !== undefined
        ){
            listClient.value.push({
            id: client.id,
            username: client.username
        })
        }
        
    })
    const onStatus = ref<boolean>(false)

    const userNameClient = ref<string>("");

    const registerInfo = () => {
        if(errors) {
            if("team" in errors.value) toast.warning(`Team: ${errors.value.team}`)
            if("client" in errors.value) toast.warning(`Client: ${errors.value.client}`)
            if("notice_date" in errors.value) toast.warning(`Notice date: ${errors.value.notice_date}`)
            if("fault_description" in errors.value) toast.warning(`Fault description: ${errors.value.fault_description}`)
            onStatus.value = false
        } 

        listClient.value.map( value => {
            if(value.id as string === values.client as string) 
                userNameClient.value = value.username
            });
        onStatus.value = true
    }
    
    const onRegister = async (newReport: CreateReport) => {
        setFieldValue('team', teamOfOrder.value.id)
        if (clientStore.client.value?.access_level != AccessLevel.operator &&
            clientStore.client.value?.access_level != AccessLevel.production_supervisor &&
            clientStore.client.value?.access_level != undefined 
        ) {
            try {
                const response = await registerReport(newReport);
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

                    if("id_report" in response) {
                        toast.success("Reporte registrado")
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

    watch(order, async (idOrder) => {
        if(order.value.length >= 12) {
            try {
                const response = await getOrderById(idOrder);
                if("id" in response) {
                    hasOrder.value = false
                    isDisabledInput.value = true
                    orderForReport.value = {
                        id: response.id,
                        team: response.team,
                        client: response.client,
                        fault_description: response.fault_description
                    }
                    listTeam.value.map(t => { 
                        if( t.id === response.team ) {
                            teamOfOrder.value = {
                                id: t.id.toString(),
                                name: t.name
                            }
                        } 

                    }) || { id: "", name: "" }
                } else {
                    isDisabledInput.value = false
                    hasOrder.value = true
                    teamOfOrder.value = {
                        id: "",
                        name: ""

                    }
                }
            } catch (error) {
                toast.error(`Error in order`)
                console.error(`Error in order: ${error}`)
                router.replace({name: "report"})
            }
            
        } else {
            hasOrder.value = false
        }

        
    })

</script>
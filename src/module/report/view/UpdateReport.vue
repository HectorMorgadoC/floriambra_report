<template>
   <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar orden</h3>
            <p class="block font-medium text-center text-[#EEE0D3] my-2">{{ currentReport.id_report }}</p>
            <div class="mb-3">
                <label 
                    for="order" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Orden de trabajo
                </label>
                <input
                    type="text"
                    id="id_order"
                    name="id_order"
                    :readonly="true"
                    :placeholder=currentReport.id_order
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="description_fault" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion de la falla
                </label>
                <input
                    type="text"
                    id="description_fault"
                    name="description_fault"
                    :placeholder= currentReport.description_fault
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Creador de orden
                </label>
                <input
                    type="text"
                    id="order_creator"
                    name="order_creator"
                    :placeholder=currentReport.order_creator
                    :readonly="true"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Tecnico
                </label>
                <select
                v-model=client
                id="client"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentReport.technical }}</option>
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
                    for="collaborators" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Colaboradores
                </label>
                <input
                    v-model=collaborators
                    type="text"
                    id="colaborators"
                    name="colaborators"
                    :placeholder=values.collaborators
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
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
                    :placeholder=currentReport.team
                    :readonly="true"
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
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ fault_type }}</option>
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
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ type_of_maintenance }}</option>
                    <option 
                    v-for="[key, typeMaintenance] in Object.entries(typeOfMaintenance)"
                    :value="typeMaintenance"
                    >
                        {{ key }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="notice_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de creacion: {{ currentReport.notice_date }}
                </label>
                <input
                    type="datetime-local"
                    id="notice_date"
                    name="notice_date"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="from_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de inicio: {{ from_date }}
                </label>
                <input
                    v-model=from_date
                    type="datetime-local"
                    id="from_date"
                    name="from_date"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="end_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de culminacion: {{ end_date }}
                </label>
                <input
                    v-model=end_date
                    type="datetime-local"
                    id="end_date"
                    name="end_date"
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
                    v-model=summary_of_activities
                    type="text"
                    id="summary_of_activities"
                    name="summary_of_activities"
                    :placeholder=values.summary_of_activities
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
                    v-model=used_spare_parts
                    type="text"
                    id="used_spare_parts"
                    name="used_spare_parts"
                    :placeholder=used_spare_parts
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
                    v-model=remarks
                    type="text"
                    id="remarks"
                    name="remarks"
                    :placeholder=remarks
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                    rows="3"
                    maxlength="300"
                    ></textarea>
            </div>
            <button
                @click="onRegister({
                    order: values.order,
                    client: values.client,
                    collaborators: values.collaborators,
                    fault_type: values.fault_type,
                    type_of_maintenance: values.type_of_maintenance,
                    from_date: values.from_date,
                    end_date: values.end_date,
                    summary_of_activities: values.summary_of_activities,
                    used_spare_parts: values.used_spare_parts,
                    remarks: values.remarks
                }, currentReport.id_report as UUIDTypes)"
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
    import { useReportItemStore } from '../stores/report.store';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import type { UUIDTypes } from 'uuid';
    import { useClientStorage } from '../../auth/composable/useClientStorage';
    import type { Team } from '../../team/interface/team.interface';
    import type { SubClient } from '../../auth/interfaces/subClient-interface';
    import { FaulType } from '../interface/faultType.enum';
    import { TypeOfMaintenance } from '../interface/typeOfMaintenance.enum';
    import type { CreateReport } from '../interface/createReport.interface';
    import { updateReport } from '../action/updateReport.action';


    const clientStore = useClientStorage();
    const listTeam = ref<Team[]>([])
    const listClient = ref<SubClient[]>([]);
    const currentReport = useReportItemStore().reportItem
    const typeOfMaintenance = TypeOfMaintenance
    const faultType = FaulType;
    const toast = useToast();

    clientStore.client.value?.clients?.map(client => {
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

    const idClient = ref<string>(listClient.value.find(c => c.username === currentReport.technical )?.id.toString() || "")
    const formatForDatetimeLocal = (isoString: string) => {
        const date = new Date(isoString)
        const offset = date.getTimezoneOffset() * 60000
        const local = new Date(date.getTime() - offset)
        return local.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
    }

    listTeam.value = clientStore.client.value?.teams || []

    const schema = yup.object({
        order: yup.string(),
        client: yup.string(),
        collaborators: yup.string().max(100,"Maximo 100 caracteres"),
        fault_type: yup.string().max(30,"Maximo 30 caracteres"),
        type_of_maintenance: yup.string().max(30,"Maximo 30 caracteres"),
        from_date: yup.string(),
        end_date: yup.string(),
        summary_of_activities: yup.string().max(300,"Maximo 300 caracteres"),
        used_spare_parts: yup.string().max(300,"Maximo 200 caracteres"),
        remarks: yup.string().max(300,"Maximo 300 caracteres")
    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        order: currentReport.id_order,
        client: idClient.value,
        collaborators: currentReport.collaborators,
        fault_type: currentReport.fault_type,
        type_of_maintenance: currentReport.type_of_maintenance,
        from_date: formatForDatetimeLocal(currentReport.from_date),
        end_date: formatForDatetimeLocal(currentReport.end_date),
        summary_of_activities: currentReport.summary_of_activities,
        used_spare_parts: currentReport.used_spare_parts,
        remarks: currentReport.remarks,
        }
    })

    const { value: client } = useField<string>('client')
    const { value: collaborators }= useField<string>('collaborators')
    const { value: fault_type }= useField<FaulType>('fault_type')
    const { value: type_of_maintenance }= useField<TypeOfMaintenance>('type_of_maintenance')
    const { value: from_date }= useField<string>('from_date')
    const { value: end_date }= useField<string>('end_date')
    const { value: summary_of_activities }= useField<string>('summary_of_activities')
    const { value: used_spare_parts }= useField<string>('used_spare_parts')
    const { value: remarks }= useField<string>('remarks')

    const onStatus = ref<boolean>(false)
    
    const registerInfo = () => {
        if(errors) {
            if("client" in errors.value) toast.warning(`Technical: ${errors.value.client}`)
            if("collaborators" in errors.value) toast.warning(`Collaborators: ${errors.value.collaborators}`)
            if("client" in errors.value) toast.warning(`Client: ${errors.value.client}`)
            if("fault_type" in errors.value) toast.warning(`Fault_type: ${errors.value.fault_type}`)
            if("type_of_maintenance" in errors.value) toast.warning(`Type_of_maintenance: ${errors.value.type_of_maintenance}`)
            if("from_date" in errors.value) toast.warning(`From_date: ${errors.value.from_date}`)
            if("end_date" in errors.value) toast.warning(`End_date: ${errors.value.end_date}`)
            if("summary_of_activities" in errors.value) toast.warning(`Summary_of_activities: ${errors.value.summary_of_activities}`)
            if("used_spare_parts" in errors.value) toast.warning(`Used_spare_parts: ${errors.value.used_spare_parts}`)
            if("remarks" in errors.value) toast.warning(`Remarks: ${errors.value.remarks}`)
            onStatus.value = false
        } 

        onStatus.value = true
    }
    
    const onRegister = async (newReport: CreateReport,id:string) => {
        if (clientStore.client.value?.access_level === AccessLevel.technical_supervisor ||
            clientStore.client.value?.access_level === AccessLevel.admin 
        ) {
            try {
                const response = await updateReport(newReport,id);
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
                        toast.success("Registro de reporte modificado")
                        resetForm()
                        router.replace({name: "report"})
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }
    }

    
</script>
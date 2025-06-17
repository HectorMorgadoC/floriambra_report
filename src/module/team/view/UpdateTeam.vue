<template>
    <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Modificar equipo</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nombre del equipo
                </label>
                <input
                    v-model="name"
                    type="text"
                    id="name"
                    name="name"
                    :placeholder=currentTeam.name
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion del equipo
                </label>
                <input
                    v-model="description"
                    type="text"
                    id="descrition"
                    name="descrition"
                    :placeholder=currentTeam.description
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Marca del equipo
                </label>
                <input
                    v-model="march"
                    type="text"
                    id="march"
                    name="march"
                    :placeholder=currentTeam.march
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Modelo del equipo
                </label>
                <input
                    v-model="model"
                    type="text"
                    id="model"
                    name="model"
                    :placeholder=currentTeam.model
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Tension de trabajo
                </label>
                <input
                    v-model="working_voltage"
                    type="number"
                    id="working_voltage"
                    name="working_voltage"
                    :placeholder=currentTeam.working_voltage?.toString()
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Potencia del equipo
                </label>
                <input
                    v-model="kilowatts"
                    type="number"
                    id="kilowatts"
                    name="kilowatts"
                    :placeholder= currentTeam.kilowatts?.toString()
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Proceso
                </label>
                <select
                v-model="process"
                name="process" 
                id="process"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{currentTeam.process }}</option>
                    <option 
                    v-for="(process, index) in listProcess"
                    :key="index"
                    :value="process.id"
                    >
                        {{ process.name }}</option>
                    
                </select>
            </div>
            <div class="mb-3">
                <label for="is_actived" class="flex items-center gap-3 text-xl font-medium text-[#EEE0D3] my-2">
                    Estado del equipo
                    <input
                        v-model="is_actived"
                        type="checkbox"
                        id="is_actived"
                        name="is_actived"
                        class="w-5 h-5 accent-[#F2564F]"
                    />
                </label>
            </div>
            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Registrar
            </button>
        </form>
</div>
    
</template>
<script setup lang="ts">
    import router from '../../../router';
    import { useToast } from 'vue-toastification';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { updateTeam } from '../action/updateTeam.action';
    import type { UUIDTypes } from 'uuid';
    import { useAuthStore } from '../../auth/stores/auth.store';
    import type { UpdateTeam } from '../interface/updateTeam.interface';
    import { useTeamItemStore } from '../stores/team.store';
    import { updateListTeam } from '../action/updateListTeam';
import { ref } from 'vue';

    const toast = useToast();
    const listProcess = useAuthStore().client?.process;
    const currentTeam = useTeamItemStore().teamItem;

    const schema = yup.object({
        name: yup.string().required('Campo requerido')
        .max(50,'Maximo 50 caracteres')
        ,
        description: yup.string().required('Campo requerido')
        .max(200,'Maximo 200 caracteres'),
        march: yup.string().required('Campo requerido')
        .max(40,'Maximo 40 caracteres'),
        model: yup.string().required('Campo requerido')
        .max(40,'Maximo 40 caracteres'),
        working_voltage: yup.number().required('Campo requerido')
        .min(1,'Minimo 1 voltio'),
        kilowatts: yup.number().required('Campo requerido'),
        process: yup.string().required('Campo requerido')
        ,
    })

    const { errors,values } = useForm({
        validationSchema: schema,
        initialValues: {
        name: currentTeam.name,
        description: currentTeam.description,
        march:currentTeam.march,
        model:currentTeam.model,
        working_voltage:currentTeam.working_voltage,
        kilowatts:currentTeam.kilowatts,
        process: currentTeam.process,
        is_actived: currentTeam.is_actived
        }
    })

    const { value: name} = useField<string>('name')
    const { value: description } = useField<string>('description')
    const { value: march } = useField<string>('march')
    const { value: model } = useField<string>('model')
    const { value: working_voltage } = useField<number>('working_voltage')
    const { value: kilowatts } = useField<number>('kilowatts')
    const { value: process } = useField<string>('process')
    const { value: is_actived } = useField<boolean>('is_actived')
    
    const idProcess = ref<string>(String(listProcess?.find(process => process.name === values.process)?.id)|| "");
    const registerInfo = async () => {

        if(errors) {
            if("name" in errors.value) {
                toast.warning(`Name: ${errors.value.name}`)
            }
        
            if("description" in errors.value) {
                toast.warning(`Description: ${errors.value.description}`)
            }

            if("march" in errors.value) {
                toast.warning(`March: ${errors.value.march}`)
            }

            if("model" in errors.value) {
                toast.warning(`Model: ${errors.value.model}`)
            }

            if("working_voltage" in errors.value) {
                toast.warning(`Working_voltage: ${errors.value.working_voltage}`)
            }

            if("kilowatts" in errors.value) {
                toast.warning(`kilowatts: ${errors.value.kilowatts}`)
            }

            if("process" in errors.value) {
                toast.warning(`kilowatts: ${errors.value.process}`)
            }
        
        } 

            let response = await onRegister({...values, process: idProcess.value }, currentTeam.id as UUIDTypes)
            if(response){
                router.replace({name: "team"})
            }
    }
    
    
    const onRegister = async (updatedTeam: UpdateTeam,idTeam: UUIDTypes): Promise<boolean> => {
        try {
            const response = await updateTeam(updatedTeam,idTeam);
            
            if (response) {
            
                if ("statusCode" in response) {
                    if(response.statusCode === 404 ) {
                        router.replace({ name: 'NotFound' });
                        return false
                    }
                
                    if(response.statusCode === 400 ) {
                        toast.warning(`Bad request ${response.message}`)
                        return false
                    }
                
                    if(response.statusCode === 403 || response.statusCode === 401) {
                        toast.error("Not authorized")
                        router.replace({ name: 'login' });
                        return false
                    }

                    if(response.statusCode === 0 || response.statusCode === 500) {
                        router.replace({ name: 'ServerError' });
                        return false
                    }
                
                }

                if("name" in response) {
                    await updateListTeam();
                    toast.success("Registro de equipo modificado")
                    router.replace({name: "team"})
                }
                
            }
            return true
        } catch (error) {
            toast.error("Request error")
            return false
        }
        
        }
</script>
<template>
    <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar equipo</h3>
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
                    required
                    placeholder="Ingrese nombre del equipo"
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
                    required
                    placeholder="Ingrese su descripcion"
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
                    required
                    placeholder="Ingrese marca del equipo"
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
                    name="mdeol"
                    required
                    placeholder="Ingrese el modelo del equipo"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Tension de trabajo: Voltios
                </label>
                <input
                    v-model="working_voltage"
                    type="number"
                    id="working_voltage"
                    name="working_voltage"
                    required
                    placeholder="Ingrese tension de trabajo"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Potencia del equipo: kilowatts
                </label>
                <input
                    v-model="kilowatts"
                    type="number"
                    id="kilowatts"
                    name="kilowatts"
                    required
                    placeholder="Ingrese potencia del equipo"
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
                    <option disabled value="">Seleccione un processo</option>
                    <option 
                    v-for="(process, index) in listProcess"
                    :key="index"
                    :value="process.id"
                    >
                        {{ process.name }}</option>
                    
                </select>
            </div>
            <button
                @click="registerInfo"
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
                Nombre: newTeam.name,
                Descripcion: newTeam.description,
                Marca: newTeam.march,
                Modelo: newTeam.model,
                Voltage: newTeam.working_voltage,
                Potencia: newTeam.kilowatts,
                Proceso: listProcess?.find(( p ) => {
                    return p.id === newTeam.process
                })?.name,
                }"
            :data="newTeam"
            @off-registration-status="cancelRegisterInfo"
            @on-registration-status="onRegister"
            />
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import DataConfirmation from '../../common/components/DataConfirmation.vue';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useToast } from 'vue-toastification';
    import { registerTeam } from '../action/registerTeam.action';
    import router from '../../../router';
    import { updateListTeam } from '../action/updateListTeam';
    import { useAuthStore } from '../../auth/stores/auth.store';
    import type { CreateTeam } from '../interface/createTeam.interface';

    const listProcess = useAuthStore().client?.process;
    const toast = useToast();

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

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        name: "",
        description: "",
        march:"",
        model:"",
        working_voltage:0,
        kilowatts:0,
        process: "",
        }
    })

    let newTeam = ref<CreateTeam>({
        name: "",
        description: "",
        march:"",
        model:"",
        working_voltage:0,
        kilowatts:0,
        process: "",
    })

    const { value: name} = useField<string>('name')
    const { value: description } = useField<string>('description')
    const { value: march } = useField<string>('march')
    const { value: model } = useField<string>('model')
    const { value: working_voltage } = useField<number>('working_voltage')
    const { value: kilowatts } = useField<number>('kilowatts')
    const { value: process } = useField<string>('process')
    
    const onStatus = ref<boolean>(false)
    
    const registerInfo = () => {
    
        newTeam.value = {
            name : values.name,
            description: values.description,
            march: values.march,
            model: values.model,
            working_voltage: values.working_voltage,
            kilowatts: values.kilowatts,
            process: values.process
        }

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

            onStatus.value = false
        } 
    
        onStatus.value = true
    }
    
    const onRegister = async (newTeam: CreateTeam) => {
            
        try {
            const response = await registerTeam(newTeam);
            if (response) {
            
                if ("statusCode" in response) {
                    if(response.statusCode === 404 ) {
                        router.replace({ name: 'NotFound' });
                    }
                
                    if(response.statusCode === 400 ) {
                        toast.warning(`Bad request ${response.message}`)
                    }
                
                    if(response.statusCode === 403 || response.statusCode === 401) {
                        toast.error("Not authorized")
                        router.replace({ name: 'login' });
                    }

                    if(response.statusCode === 0 || response.statusCode === 500) {
                        router.replace({ name: 'ServerError' });
                    }
                
                }

                if("name" in response) {
                    await updateListTeam()
                    toast.success("Nuevo equipo registrado")
                    resetForm()
                    onStatus.value = false
                }
                
            }
        } catch (error) {
            toast.error("Request error")
        }
        
        }
    
    const cancelRegisterInfo = (value: boolean) => {
        onStatus.value = value
    }
</script>
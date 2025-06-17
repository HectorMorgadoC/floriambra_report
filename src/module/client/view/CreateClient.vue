<template>
    <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar cliente</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nombre de usuario
                </label>
                <input
                    v-model="username"
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Ingrese nombre mayor a 5 caracteres"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Email
                </label>
                <input
                    v-model="email"
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Ingrese un email vigente"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nivel de acceso
                </label>
                <select
                v-model="access_level"
                name="access_level" 
                id="access_level"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un nivel de acceso</option>
                    <option :value=accessLevel.operator>Operador</option>
                    <option :value=accessLevel.production_supervisor>Supervisor de produccion</option>
                    <option :value=accessLevel.technical>Tecnico</option>
                    <option :value=accessLevel.technical_supervisor>Supervisor tecnico</option>
                </select>
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

            <div class="mb-3">
                <label 
                    for="password" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Contraseña
                </label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Debe tener mayúscula, minúscula, número, mayor a 6 caracteres.
"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
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
                Usuario: newClient.username,
                Email: newClient.email,
                Process: listProcess?.find(( p ) => {
                    return p.id === newClient.process
                })?.name,
                Acesso: newClient.access_level
                }"
            :data="newClient"
            @off-registration-status="cancelRegisterInfo"
            @on-registration-status="onRegister"
            />
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import DataConfirmation from '../../common/components/DataConfirmation.vue';
    import type { CreateClient } from '../interface/createClient';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { useAuthStore } from '../../auth/stores/auth.store';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useToast } from 'vue-toastification';
    import { registerClient } from '../action/registerClient.action';
    import router from '../../../router';

    const listProcess = useAuthStore().client?.process;
    const toast = useToast();

    const schema = yup.object({
        username: yup.string().required('Campo requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(30,'Maximo 30 caracteres')
        ,
        email: yup.string().required('Campo requerido').email('Email inválido'),
        password: yup
            .string()
            .required('Campo requerido')
            .min(6, 'Mínimo 6 caracteres')
            .max(50,'Maximo 50 caracteres')
            .matches(/[a-z]/, 'Debe tener una minúscula')
            .matches(/[A-Z]/, 'Debe tener una mayúscula')
            .matches(/[0-9]/, 'Debe tener un número'),
        access_level: yup.string().required('Seleccione un nivel de acceso'),
        process: yup.string().required('Seleccione un proceso')
    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        username: "",
        email: "",
        password: "",
        access_level: "",
        process: ""
        }
    })

    let newClient = ref<CreateClient>({
        username : "",
        email: "",
        password: "",
        access_level: AccessLevel.operator,
        process: ""
    })

    const { value: username } = useField<string>('username')
    const { value: email } = useField<string>('email')
    const { value: password } = useField<string>('password')
    const { value: access_level } = useField<AccessLevel>('access_level')
    const { value: process } = useField<string>('process')
    
    const accessLevel = AccessLevel;
    
    const onStatus = ref<boolean>(false)
    
    const registerInfo = () => {
    
        newClient.value = {
            username : values.username,
            email: values.email,
            password: values.password,
            access_level: values.access_level as AccessLevel,
            process: values.process
        }

        if(errors) {
            if("username" in errors.value) {
                toast.warning(`Usuario: ${errors.value.username}`)
            }
        
            if("email" in errors.value) {
                toast.warning(`email: ${errors.value.email}`)
            }
        
            if("password" in errors.value) {
                toast.warning(`Contraseña: ${errors.value.password}`)
            }
            onStatus.value = false
        } 
    
        onStatus.value = true
    }
    
    const onRegister = async (newCLient: CreateClient) => {
            
        try {
            const response = await registerClient(newCLient);
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

                if("username" in response) {
                    toast.success("Nuevo cliente registrado con exito")
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
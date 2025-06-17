<template>
    <div class="flex justify-center items-start min-h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Modificar cliente</h3>
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
                    :placeholder=username
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
                    :placeholder=email
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
                    <option disabled value="">{{ values.access_level }}</option>
                    <option :value=accessLevel.operator>Operador</option>
                    <option :value=accessLevel.production_supervisor>Supervisor de produccion</option>
                    <option :value=accessLevel.technical>Tecnico</option>
                    <option :value=accessLevel.technical_supervisor>Supervisor </option>
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
                    <option disabled value="">{{ process }}</option>
                    <option 
                    v-for="(process, index) in listProcess"
                    :key="index"
                    :value="process.name"
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
                    placeholder="Contraseña"
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
</div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import router from '../../../router';
    import { useAuthStore } from '../../auth/stores/auth.store';
    import { useToast } from 'vue-toastification';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useClientItemStore } from '../stores/client.store';
    import type { UpdateClient } from '../interface/updateClient';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { updateClient } from '../action/updateClient.action';
import type { UUIDTypes } from 'uuid';


    const listProcess = useAuthStore().client?.process;
    const toast = useToast();
    const currentClient = useClientItemStore().clientItem;

    const schema = yup.object({
        username: yup.string().required('Campo requerido')
        .min(5, 'Mínimo 5 caracteres')
        .max(30,'Maximo 30 caracteres')
        ,
        email: yup.string().required('Campo requerido').email('Email inválido'),
        password: yup
            .string()
            .min(6, 'Mínimo 6 caracteres')
            .max(50,'Maximo 50 caracteres')
            .matches(/[a-z]/, 'Debe tener una minúscula')
            .matches(/[A-Z]/, 'Debe tener una mayúscula')
            .matches(/[0-9]/, 'Debe tener un número'),
        access_level: yup.string().required('Seleccione un nivel de acceso'),
        process: yup.string().required('Seleccione un proceso')
    })

    const { errors,values } = useForm({
        validationSchema: schema,
        initialValues: {
        username: currentClient.username,
        email: currentClient.email,
        password: "",
        access_level: currentClient.access_level,
        process: currentClient.process
        }
    })

    let newClient = ref<UpdateClient>({
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

    const registerInfo = async () => {
    
        const selectedProcess = listProcess?.find((p) => 
            p.name === (values.process ?? '') 
        )

        newClient.value = {
            username : values.username,
            email: values.email || "",
            password: values.password,
            access_level: values.access_level as AccessLevel,
            process:  selectedProcess?.id?.toString() ?? ''
        }

        if(errors) {
            if("username" in errors.value) {
                toast.warning(`Usuario: ${errors.value.username}`)
                return
            }
        
            if("email" in errors.value) {
                toast.warning(`email: ${errors.value.email}`)
                return
            }
        
            if("password" in errors.value) {
                toast.warning(`Contraseña: ${errors.value.password}`)
                return
            }
        } 

            let response = await onRegister(newClient.value,currentClient.id as UUIDTypes)
            if(response){
                router.replace({name: "client"})
            }
    }
    
    const onRegister = async (updatedCLient: UpdateClient,idClient: UUIDTypes): Promise<boolean> => {
            
        try {
            const response = await updateClient(updatedCLient,idClient);
            
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

                if("username" in response) {
                    toast.success("Registro de cliente modificado")
                    router.replace({name: "client"})
                }
                
            }
            return true
        } catch (error) {
            toast.error("Request error")
            return false
        }
        
        }
    
</script>
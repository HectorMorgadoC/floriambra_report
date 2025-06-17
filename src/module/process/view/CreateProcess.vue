<template>
    <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar proceso</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nombre del Proceso
                </label>
                <input
                    v-model="name"
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Ingrese nombre del proceso"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion del proceso
                </label>
                <input
                    v-model="description"
                    type="descrition"
                    id="descrition"
                    name="descrition"
                    required
                    placeholder="Ingrese su descripcion"
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
                Name: newProcess.name,
                Description: newProcess.description,
                }"
            :data="newProcess"
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
    import { registerProcess } from '../action/registerProcess.action';
    import router from '../../../router';
    import type { CreateProcess } from '../interface/createProcess.interface';
    import { updateListProcess } from '../action/updateListProcess';

    const toast = useToast();

    const schema = yup.object({
        name: yup.string().required('Campo requerido')
        .max(50,'Maximo 50 caracteres')
        ,
        description: yup.string().required('Campo requerido')
        .max(200,'Maximo 200 caracteres')
    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        name: "",
        description: "",
        is_actived: false,
        }
    })

    let newProcess = ref<CreateProcess>({
        name: "",
        description: "",
    })

    const { value: name} = useField<string>('name')
    const { value: description } = useField<string>('description')
    
    const onStatus = ref<boolean>(false)
    
    const registerInfo = () => {
    
        newProcess.value = {
            name : values.name,
            description: values.description,
        }

        if(errors) {
            if("name" in errors.value) {
                toast.warning(`Name: ${errors.value.name}`)
            }
        
            if("description" in errors.value) {
                toast.warning(`Description: ${errors.value.description}`)
            }
            onStatus.value = false
        } 
    
        onStatus.value = true
    }
    
    const onRegister = async (newProcess: CreateProcess) => {
            
        try {
            const response = await registerProcess(newProcess);
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
                    await updateListProcess()
                    toast.info("Nuevo proceso registrado")
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
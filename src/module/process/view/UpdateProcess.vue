<template>
    <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Modificar proceso</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nombre del proceso
                </label>
                <input
                    v-model=name
                    type="text"
                    id="name"
                    name="name"
                    :placeholder=name
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
                    v-model=description
                    type="description"
                    id="description"
                    name="description"
                    :placeholder=description
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label for="is_actived" class="flex items-center gap-3 text-xl font-medium text-[#EEE0D3] my-2">
                    Estado del proceso
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
    import { ref } from 'vue';
    import router from '../../../router';
    import { useToast } from 'vue-toastification';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useProcessItemStore } from '../stores/process.store';
    import { updateProcess } from '../action/updateProcess.action';
    import type { UUIDTypes } from 'uuid';
    import type { UpdateProcess } from '../interface/updateProcess.interface';
    import { updateListProcess } from '../action/updateListProcess';

    const toast = useToast();
    const currentProcess = useProcessItemStore().processItem;

    const schema = yup.object({
        name: yup.string().required('Campo requerido')
        .max(50,'Maximo 50 caracteres')
        ,
        description: yup.string().required('Campo requerido')
        .max(200,'Maximo 200 caracteres')
    })

    const { errors,values } = useForm({
        validationSchema: schema,
        initialValues: {
        name: currentProcess.name,
        description: currentProcess.description,
        is_actived: currentProcess.is_actived
        }
    })

    let newProcess = ref<UpdateProcess>({
        name : "",
        description: "",
        is_actived: true
    })

    const { value: name } = useField<string>('name')
    const { value: description } = useField<string>('description')
    const { value: is_actived } = useField<boolean>('is_actived')

    const registerInfo = async () => {
    
        newProcess.value = {
            name : values.name,
            description: values.description,
            is_actived: values.is_actived
        }

        if(errors) {
            if("name" in errors.value) {
                toast.warning(`Usuario: ${errors.value.name}`)
                return
            }
        
            if("description" in errors.value) {
                toast.warning(`email: ${errors.value.description}`)
                return
            }
        
        } 

            let response = await onRegister(newProcess.value,currentProcess.id as UUIDTypes)
            if(response){
                router.replace({name: "process"})
            }
    }
    
    const onRegister = async (updatedProcess: UpdateProcess,idProcess: UUIDTypes): Promise<boolean> => {
            
        try {
            const response = await updateProcess(updatedProcess,idProcess);
            
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
                    await updateListProcess();
                    toast.success("Registro de proceso modificado")
                    router.replace({name: "process"})
                }
                
            }
            return true
        } catch (error) {
            toast.error("Request error")
            return false
        }
        
        }
</script>
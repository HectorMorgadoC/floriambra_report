<template>
    <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form v-if="!onStatus" @submit.prevent="onRegister" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Modificar producto</h3>
            <p class="block text-2xl text-center font-medium text-[#EEE0D3] mb-1">{{ user.id }}</p>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Nombre
                </label>
                <input
                    v-model="myForm.name"
                    type="text"
                    id="name"
                    name="name"
                    :placeholder="user.name"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Apellido
                </label>
                <input
                    v-model="myForm.lastname"
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    :placeholder="user.lastname"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Ciudad
                </label>
                <input
                    v-model="myForm.city"
                    type="text"
                    id="city"
                    name="city"
                    required
                    :placeholder="user.city"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de nacimiento actual: {{ user.dateInit }}
                </label>
                <input
                    v-model="myForm.dateInit"
                    type="date"
                    id="dateinit"
                    name="dateinit"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]]"
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
                title="Desea modificar datos" 
                :sample_data="myForm"
                @on-registration-status="cancelRegisterInfo"
            />
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import DataConfirmation from '../module/common/components/DataConfirmation.vue';

const user = {
    id: "jdigfiñuasgdfñiasdgñfd",
    name:"Jose", 
    lastname:"Alvarez",
    city:"Bucaramanga",
    dateInit:"21/03/2000"
    }

const myForm = reactive({
    name: "",
    lastname: "",
    city: "",
    dateInit: ""
})

const onRegister = () => {
    console.log(myForm.lastname)
}

const registerInfo = () => {
    onStatus.value = true
}

const onStatus = ref<Boolean>(false);

const cancelRegisterInfo = (value: boolean) => {
    console.log(value)
    onStatus.value = value
}

</script>
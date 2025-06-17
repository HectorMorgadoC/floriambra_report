<template>
    <div v-if="!onStatus" class="">
        <div class="w-full max-w-md bg-[#3d3b46] p-8 ">
            <h3 class="block text-3xl font-medium text-[#F3ECDE] mx-5 my-2 pb-3">{{ props.title }}</h3>
            
            <div class="my-2 pl-2 text-justify">
                <div v-for="[key, value] in Object.entries(sample_data)" :key="key" class="my-2 text-[#EEE0D3] text-justify">
                    <span class="font-medium text-[#FC3B47]">{{ key }}:</span> <span class="break-all">{{ value }}</span>
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button 
                    @click="RegisterInfo" 
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    Sí
                </button>
                <button 
                    @click="cancelAction" 
                    class="w-full max-w-md bg-[#FC3B47] text-xl text-[#EEE0D3] p-4 m-5 font-semibold hover:bg-[#F2564F] transition"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CreateClient } from '../../client/interface/createClient';

const props = defineProps<{
    title: string,
    sample_data: Record<string, any>
    data: Record<string, any>
}>()

const issueStatus = defineEmits(["offRegistrationStatus","onRegistrationStatus"])
const newCLient = props.data;

const onStatus = ref<Boolean>(false)

const RegisterInfo = () => {
    issueStatus("onRegistrationStatus",newCLient)
}

const cancelAction = () => {
    onStatus.value = true
    issueStatus("offRegistrationStatus",false)
}
</script>
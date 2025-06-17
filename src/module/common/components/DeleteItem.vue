<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-4 pb-2 text-center">{{ props.title }}</h3>
            
            <div class="w-full text-[#EEE0D3] text-justify text-2xl mb-6">
                <p v-for="[key, value] in Object.entries(data)" :key="key" class="my-2 px-8">
                    {{ key }}: {{ value }}
                </p>
            </div>

            <div class="flex justify-center gap-4">
                <button 
                    @click="deleteInfo" 
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
const props = defineProps<{
    title: string,
    data: Record<string, any>
}>()

const emit = defineEmits(['confirm', 'cancel']);

const deleteInfo = () => {
    emit('confirm', "como hago");
}

const cancelAction = () => {
    emit('cancel',false);
}
</script>
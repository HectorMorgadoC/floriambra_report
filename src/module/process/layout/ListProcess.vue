<template>
    <ButtonCreate title="Proceso" title_button="Crear proceso" patch="createProcess"/>
    <CardInfoProcess :data_list=listProcess title="username" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardInfoProcess from "../view/CardInfoProcess.vue";
import ButtonCreate from "../../common/components/ButtonCreate.vue"
import { useClientStorage } from "../../auth/composable/useClientStorage";
import type { Process } from "../interface/process.interface";



const clientStore = useClientStorage();
const listProcess = ref<Process[]>([]);
listProcess.value = clientStore.client.value?.process || []
</script>
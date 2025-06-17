<template>
    <div class="flex flex-col items-center w- gap-4 mb-8 lg:flex-row lg:justify-between">
        <div class="">
            
        </div>
        <div class="bg-[#FC3B47] text-[#EEE0D3] text-xl py-4 px-5 lg:mr-20 font-semibold hover:bg-[#F2564F] transition">
            <RouterLink to="/">salir</RouterLink>
        </div>
    </div>
    <div class="flex gap-[20px] flex-wrap justify-center items-center content-center">
        <CardMain 
            v-if="accessLevel === AccessLevel.admin" 
            title="Clientes" 
            message="Cada miembro del personal asignado a clientes tendrá una responsabilidad 
            específica que deberá cumplir conforme a las normativas establecidas por la 
            organización. El correcto cumplimiento de estas funciones garantiza un servicio 
            de calidad y alineado con los estándares internos.Cada integrante del personal 
            asignado a este módulo tiene responsabilidades claramente definidas."
            router="client"
            /> 
        <CardMain
        v-if="accessLevel === AccessLevel.admin" 
        title="Procesos" 
        message="Constituyen el conjunto de actividades sistemáticas y coordinadas que permiten 
        transformar materias primas en productos terminados o servicios. Estos procesos están 
        diseñados para ser eficientes, repetibles y alineados con los estándares de calidad, 
        seguridad y sostenibilidad de la organización y optimizar el uso de recursos 
        (materiales, humanos y tecnológicos)."
        router="process"
        />
        <CardMain
        v-if="accessLevel === AccessLevel.admin" 
        title="Equipos" 
        message="Los equipos y maquinarias son componentes esenciales en los procesos productivos 
        de una industria. Su correcto funcionamiento garantiza la eficiencia operativa, la calidad 
        del producto final y la seguridad del personal.Estos activos están diseñados para cumplir 
        funciones específicas, ya sea en la transformación de materias primas, el ensamblaje de productos 
        o el soporte de tareas logísticas y de mantenimiento."
        router="team"
        />
        <CardMain 
        title="Ordenes de trabajo" 
        message="Las órdenes de trabajo (OT) son documentos esenciales en la gestión del mantenimiento 
        industrial. A través de ellas, se planifican, ejecutan y controlan las actividades necesarias 
        para asegurar el funcionamiento continuo y seguro de equipos e instalaciones. Una OT describe 
        las tareas específicas a realizar, los recursos asignados, el tiempo estimado, los responsables 
        y cualquier observación relevante para el cumplimiento del servicio."
        router="order"
        />
        <CardMain
        v-if="accessLevel != AccessLevel.operator"
        title="Reportes de mantenimiento" 
        message="Los reportes de mantenimiento son documentos generados a partir de las órdenes de trabajo (OT) 
        ejecutadas, y su función principal es dejar constancia de todas las actividades realizadas, los resultados 
        obtenidos y las condiciones en que quedaron los equipos intervenidos. Estos reportes son fundamentales para 
        el seguimiento técnico, la toma de decisiones operativas, la gestión de recursos y la trazabilidad histórica 
        del mantenimiento industrial."
        router="report"
        />
    </div>
</template>

<script setup lang="ts">
import CardMain from '../components/CardMain.vue';
import { useAuthStore } from '../../auth/stores/auth.store';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';

const authStores = useAuthStore()
const accessLevel = authStores.client?.access_level 


</script>
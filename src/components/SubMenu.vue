<template>
    <ButtonCreate title="Usuarios" title_button="Crear usuario" patch="/home/basic"/>
    <CardInfo :data_list=userOne />
</template>

<script setup lang="ts">
import ButtonCreate from '../module/common/components/ButtonCreate.vue';
import CardInfo from './CardInfo.vue';

const userOne = [
    {
        id: "jbdskksajbjfasfsad",
        name: "Juan",
        lastname: "Calderon",
        age: 23
    },{
        id: "jbdskksajbjfasfsad",
        name: "Jose",
        lastname: "Calderon",
        age: 23
    },{
        id: "jbdskksajbjfasfsad",
        name: "Ramon",
        lastname: "Calderon",
        age: 23
    },{
        id: "jbdskksajbjfasfsad",
        name: "Jesus",
        lastname: "Calderon",
        age: 23
    },
    {
        id: "jbdskksajbjfasfsad",
        name: "Jesus",
        lastname: "Calderon",
        age: 23
    },
    {
        id: "jbdskksajbjfasfsad",
        name: "Jesus",
        lastname: "Calderon",
        age: 23
    },
    {
        id: "jbdskksajbjfasfsad",
        name: "Jesus",
        lastname: "Calderon",
        age: 23
    }
]


</script>